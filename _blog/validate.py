"""Read-only RSS validation; output contains only fixed labels and counts."""
import os
import sys
from urllib.request import HTTPRedirectHandler, Request, build_opener

import manage

LIMIT = 10 * 1024 * 1024


class HTTPSRedirects(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        if not newurl.startswith('https://'):
            raise ValueError('HTTPS required')
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url):
    if not url.startswith('https://'):
        raise ValueError('HTTPS required')
    request = Request(url, headers={'User-Agent': 'MontiRSS/1.0'})
    with build_opener(HTTPSRedirects()).open(request, timeout=30) as response:
        raw = response.read(LIMIT + 1)
    if len(raw) > LIMIT:
        raise ValueError('Feed too large')
    return raw


def validate(raw):
    tree = manage.ET.fromstring(raw)
    if tree.tag != 'rss' or tree.get('version') != '2.0' or tree.find('channel') is None:
        raise ValueError('Expected RSS 2.0 channel')
    items = tree.findall('./channel/item')
    counts = {'Identity (guid or link)': 0, 'Title': 0, 'Body (content or description)': 0,
              'Full-content field': 0}
    eligible = 0
    for item in items:
        def text(name):
            return item.findtext(name, default='', namespaces=manage.NS).strip()
        fields = [bool(text('guid') or text('link')), bool(manage.plain(text('title'))),
                  bool(manage.plain(text('content:encoded') or text('description')))]
        for label, present in zip(list(counts)[:3], fields):
            counts[label] += int(present)
        counts['Full-content field'] += int(bool(manage.plain(text('content:encoded'))))
        eligible += int(all(fields))
    articles = manage.parse_feed(raw)
    lines = ['XML / RSS 2.0 structure: PASS', 'Existing importer parsing: PASS',
             f'Feed items: {len(items)}', f'Eligible items: {eligible}',
             f'Unique parsed articles: {len(articles)}',
             f'Duplicate eligible identities: {eligible - len(articles)}']
    lines += [f'{label}: {count}/{len(items)} items' for label, count in counts.items()]
    for field in ('author', 'categories', 'published', 'image'):
        count = sum(bool(article[field]) for article in articles.values())
        lines.append(f'Optional {field}: {count}/{len(articles)} unique articles')
    if not items:
        lines.append('WARNING: Feed is valid but empty; article compatibility remains unverified.')
    elif eligible != len(items):
        lines.append('FAIL: Some items lack required fields and would be skipped by the importer.')
    else:
        lines.append('Required article fields: PASS')
    if counts['Full-content field'] < len(items):
        lines.append('WARNING: Some items lack full-content fields; description fallback may be only an excerpt.')
    return lines, eligible == len(items)


def main():
    url = os.environ.get('GRANDRANKER_RSS_URL', '').strip()
    if not url:
        print('FAIL: GRANDRANKER_RSS_URL secret is missing or empty.')
        return 1
    try:
        raw = fetch(url)
    except Exception:
        # Exception messages may contain the private URL or response content.
        print('FAIL: Feed fetch failed. Check secret, HTTPS endpoint, access, timeout, and size limit.')
        return 1
    print('Feed access: PASS')
    try:
        lines, passed = validate(raw)
    except Exception:
        print('FAIL: XML structure or importer parsing failed. No feed details logged.')
        return 1
    print('\n'.join(lines))
    print('Read-only validation complete. No articles saved, approved, or published.')
    return 0 if passed else 1


if __name__ == '__main__':
    sys.exit(main())
