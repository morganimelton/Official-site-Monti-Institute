"""RSS import, explicit version approval, and static blog generation."""
import argparse
import hashlib
import html
import json
import os
from pathlib import Path
import re
import shutil
import sys
from datetime import timezone
from email.utils import parsedate_to_datetime
from urllib.parse import urlparse, parse_qs, urljoin
from urllib.request import Request, urlopen

import bleach
from defusedxml import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://www.monti-institute.com'
BOOK = 'https://www.joinblvd.com/b/monti-institute-of-neuro-aesthetics/widget#/visit-type'
NS = {'content': 'http://purl.org/rss/1.0/modules/content/',
      'dc': 'http://purl.org/dc/elements/1.1/', 'media': 'http://search.yahoo.com/mrss/'}
TAGS = {'p', 'br', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i',
        'a', 'blockquote', 'figure', 'figcaption', 'img', 'table', 'thead', 'tbody',
        'tr', 'th', 'td', 'hr', 'sup', 'sub', 'code', 'pre'}


def safe_url(value):
    value = value.strip()
    parsed = urlparse(value)
    if parsed.scheme == 'https' and parsed.hostname and not parsed.username and not parsed.password:
        return value
    if value.startswith('/') and not value.startswith('//') and '\\' not in value:
        return value
    return ''


def clean_body(value):
    # Article pages own the H1; imported headings begin at H2.
    value = re.sub(r'<(/?)h1\b', r'<\1h2', value, flags=re.I)
    def attribute(tag, name, val):
        if tag == 'a' and name == 'href':
            return bool(safe_url(val))
        if tag == 'img' and name == 'src':
            return bool(safe_url(val))
        return (tag == 'img' and name == 'alt') or (tag == 'th' and name == 'scope')
    result = bleach.clean(value, tags=TAGS, attributes=attribute, protocols={'https'}, strip=True, strip_comments=True)
    # Missing feed alt text gets an empty alternative rather than an invented claim.
    result = re.sub(r'<img\b([^>]*)>', lambda m: '<img' + m[1] +
                    ('' if re.search(r'\balt=', m[1]) else ' alt=""') +
                    ' loading="lazy" decoding="async">', result)
    return result


def plain(value):
    return ' '.join(html.unescape(bleach.clean(value, tags=[], strip=True)).split())


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def load(root):
    return json.loads((root / '_blog/articles.json').read_text())


def save(root, data):
    path = root / '_blog/articles.json'
    temp = path.with_suffix('.tmp')
    temp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
    temp.replace(path)


def parse_feed(raw):
    tree = ET.fromstring(raw)
    if tree.tag != 'rss' or tree.find('channel') is None:
        raise ValueError('Expected RSS 2.0 channel')
    articles = {}
    for item in tree.findall('./channel/item'):
        def text(name):
            return item.findtext(name, default='', namespaces=NS).strip()
        identity = text('guid') or text('link')
        title = plain(text('title'))
        body = text('content:encoded') or text('description')
        if not identity or not title or not plain(body):
            continue
        key = hashlib.sha256(identity.encode()).hexdigest()
        image = ''
        for node in item.findall('media:content', NS) + item.findall('media:thumbnail', NS) + item.findall('enclosure'):
            if node.tag.endswith('thumbnail') or node.get('medium') == 'image' or node.get('type', '').startswith('image/'):
                image = safe_url(node.get('url', ''))
                if image:
                    break
        if not image:
            match = re.search(r'<img[^>]+src=[\"\']([^\"\']+)', body, re.I)
            image = safe_url(html.unescape(match[1])) if match else ''
        published = ''
        try:
            date = parsedate_to_datetime(text('pubDate'))
            if date.tzinfo is None:
                date = date.replace(tzinfo=timezone.utc)
            published = date.isoformat()
        except (ValueError, TypeError, OverflowError):
            pass
        articles[key] = {
            'title': title, 'description': plain(text('description')) or plain(body)[:240],
            'author': plain(text('dc:creator') or text('author')),
            'categories': sorted(set(plain(n.text or '') for n in item.findall('category') if plain(n.text or ''))),
            'published': published, 'image': image, 'body': clean_body(body),
        }
    return articles


def import_feed(root, raw, secret_url=''):
    incoming = parse_feed(raw)  # Validate everything before touching persisted content.
    if secret_url:
        secrets = [secret_url] + [v for values in parse_qs(urlparse(secret_url).query).values() for v in values if len(v) >= 8]
        if any(s in json.dumps(incoming) for s in secrets):
            raise ValueError('Feed contains connection credentials')
    data = load(root)
    for key, article in incoming.items():
        slug = re.sub(r'[^a-z0-9]+', '-', article['title'].lower()).strip('-')[:70] or 'article'
        record = data.setdefault(key, {'slug': slug + '-' + key[:12]})
        record['pending'] = article
        record['pending_hash'] = digest(article)
    save(root, data)
    return len(incoming)


def approve(root, key, version, reviewer):
    data = load(root)
    record = data[key]
    if not reviewer.strip() or version != digest(record['pending']):
        raise ValueError('Reviewer and exact current pending hash are required')
    record['approved'] = record['pending'].copy()
    record['approved_hash'] = version
    record['reviewer'] = reviewer.strip()
    save(root, data)


def esc(value):
    return html.escape(str(value), quote=True)


def shell(root, title, description, route, content, schema=None):
    source = (root / 'index.html').read_text()
    header = re.search(r'<header\b.*?</header>', source, re.S)[0]
    footer = re.search(r'<footer\b.*?</footer>', source, re.S)[0]
    def links(match):
        name, value = match.groups()
        if not value.startswith(('https:', 'http:', '#', '/', 'mailto:', 'tel:')):
            value = '/' + value
        return f'{name}="{value}"'
    header = re.sub(r'(href|src)="([^"]+)"', links, header)
    footer = re.sub(r'(href|src)="([^"]+)"', links, footer)
    header = header.replace('href="/blog/"', 'href="/blog/" aria-current="page"')
    structured = '<script type="application/ld+json">' + json.dumps(schema).replace('<', '\\u003c') + '</script>' if schema else ''
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)} | Monti Institute</title><meta name="description" content="{esc(description[:300])}">
<link rel="canonical" href="{SITE}{route}"><meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(description[:300])}"><meta property="og:url" content="{SITE}{route}">
<link rel="stylesheet" href="/css/pages.css"><link rel="stylesheet" href="/css/blog.css">{structured}</head>
<body class="blog-page"><a class="skip-link" href="#main">Skip to content</a><div class="page">{header}
<main id="main">{content}</main>{footer}</div><script type="module" src="/js/site.js"></script><script src="/js/blog.js" defer></script></body></html>'''


def image_html(article):
    src = safe_url(article.get('image', '')) or '/assets/images/about-gallery-waiting-room.jpg'
    alt = article['title'] if article.get('image') else 'Monti Institute waiting room with leather seating and greenery'
    return f'<img src="{esc(src)}" alt="{esc(alt)}" loading="lazy" decoding="async">'


def metadata(article):
    category = ' / '.join(article['categories']) or 'Insights'
    date = article['published']
    stamp = f'<time datetime="{esc(date)}">{esc(date[:10])}</time>' if date else ''
    return f'<div class="blog-meta"><span>{esc(category)}</span>{stamp}</div>'


def build(root):
    records = load(root)
    approved = [(r['slug'], r['approved']) for r in records.values()
                if not r.get('withdrawn') and 'approved' in r and r.get('approved_hash') == digest(r['approved'])]
    approved.sort(key=lambda pair: (pair[1]['published'], pair[0]), reverse=True)
    output = root / 'blog'
    output.mkdir(exist_ok=True)
    # Delete only previously generated article directories when approval is withdrawn.
    manifest = output / 'generated.json'
    old = json.loads(manifest.read_text()) if manifest.exists() else []
    slugs = [slug for slug, _ in approved]
    for slug in set(old) - set(slugs):
        if re.fullmatch(r'[a-z0-9-]+', slug):
            shutil.rmtree(output / slug, ignore_errors=True)
    cta = f'<aside class="blog-cta container"><p>Care begins with a conversation.</p><a class="text-link" href="{BOOK}">Request Appointment</a></aside>'
    intro = '<header class="blog-intro container"><p class="eyebrow">The Monti Journal</p><h1>Insights &amp; Education.</h1><p class="blog-deck">Explore expert perspectives on neurology, aesthetic medicine, skin health, and wellness.</p></header>'
    cards = []
    for slug, article in approved:
        route = '/blog/' + slug + '/'
        card = f'<article class="blog-card" data-categories="{esc(json.dumps(article["categories"]))}"><a href="{route}">{image_html(article)}{metadata(article)}<h2>{esc(article["title"])}</h2><p>{esc(article["description"][:240])}</p><span class="text-link">Read article</span></a></article>'
        cards.append(card)
        byline = f'<p class="blog-byline">By {esc(article["author"])}</p>' if article['author'] else ''
        content = f'<article class="blog-article container"><a class="text-link" href="/blog/">Back to Insights &amp; Education</a><header>{metadata(article)}<h1>{esc(article["title"])}</h1>{byline}<p class="blog-deck">{esc(article["description"][:300])}</p></header><figure>{image_html(article)}</figure><div class="blog-prose">{clean_body(article["body"])}</div></article>{cta}'
        schema = {'@context': 'https://schema.org', '@type': 'Article', 'headline': article['title'], 'description': article['description'][:300], 'mainEntityOfPage': SITE + route, 'publisher': {'@type': 'Organization', 'name': 'Monti Institute of Neuro Aesthetics'}}
        if article['author']:
            schema['author'] = {'@type': 'Person', 'name': article['author']}
        if article['published']:
            schema['datePublished'] = article['published']
        if article['image']:
            schema['image'] = urljoin(SITE, article['image'])
        folder = output / slug
        folder.mkdir(exist_ok=True)
        (folder / 'index.html').write_text(shell(root, article['title'], article['description'], route, content, schema))
    if cards:
        featured = '<section class="blog-feature container" aria-label="Featured article"><p class="eyebrow">Featured perspective</p>' + cards[0] + '</section>'
        categories = sorted({c for _, a in approved for c in a['categories']})
        filters = '<div class="blog-filters" role="group" aria-label="Filter articles" hidden><button type="button" data-category="" aria-pressed="true">All insights</button>' + ''.join(f'<button type="button" data-category="{esc(c)}" aria-pressed="false">{esc(c)}</button>' for c in categories) + '</div>' if categories else ''
        grid = '<section class="blog-library container" aria-label="All articles">' + filters + '<p class="blog-count" aria-live="polite"></p><div class="blog-grid">' + ''.join(cards) + '</div></section>'
    else:
        featured = '<section class="blog-welcome container"><img src="/assets/images/about-gallery-waiting-room.jpg" alt="Monti Institute waiting room with leather seating and greenery"><div><p class="eyebrow">An introduction to Monti</p><h2>Thoughtful care.<br>Informed perspectives.</h2><p>Our journal is coming soon. In the meantime, explore the care available at Monti Institute.</p><a class="text-link" href="/care.html">Explore our care</a></div></section>'
        grid = ''
    (output / 'index.html').write_text(shell(root, 'Insights & Education', 'Explore expert perspectives on neurology, aesthetic medicine, skin health, and wellness.', '/blog/', intro + featured + grid + cta))
    manifest.write_text(json.dumps(slugs, indent=2) + '\n')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('command', choices=['import', 'build', 'approve'])
    parser.add_argument('--file', type=Path)
    parser.add_argument('--id')
    parser.add_argument('--hash')
    parser.add_argument('--reviewer')
    args = parser.parse_args()
    try:
        if args.command == 'import':
            url = os.environ.get('GRANDRANKER_RSS_URL', '')
            if args.file:
                raw = args.file.read_bytes()
            elif not url:
                print('Feed not configured; existing content retained.')
                return
            else:
                if not url.startswith('https://'):
                    raise ValueError('HTTPS required')
                with urlopen(Request(url, headers={'User-Agent': 'MontiRSS/1.0'}), timeout=30) as response:
                    if not response.geturl().startswith('https://'):
                        raise ValueError('HTTPS required')
                    raw = response.read(10 * 1024 * 1024 + 1)
            if len(raw) > 10 * 1024 * 1024:
                raise ValueError('Feed exceeds size limit')
            print(f'Imported {import_feed(ROOT, raw, url)} entries for review.')
        elif args.command == 'approve':
            approve(ROOT, args.id, args.hash, args.reviewer or '')
            build(ROOT)
        else:
            build(ROOT)
    except Exception:
        # Never print feed URLs, response bodies, or exception details containing secrets.
        print('Blog operation failed. Check configuration or input; no feed error details logged.', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
