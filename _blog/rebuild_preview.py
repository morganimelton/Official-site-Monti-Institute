"""Rebuild a downloaded preview artifact locally; never write publication files.

The artifact has already been sanitized, so this checks rendering but cannot
replace validation of the original RSS identities or fields removed on import.
"""
import argparse
import json
from pathlib import Path
import shutil
import tempfile

import html5lib
import manage


def rebuild(source, output):
    if output.exists() or not source.is_dir():
        raise ValueError('Source must exist and output must be a new directory')
    slugs = json.loads((source / 'blog/generated.json').read_text())
    if len(slugs) != len(set(slugs)):
        raise ValueError('Duplicate article routes in preview')
    listing = html5lib.parse((source / 'blog/index.html').read_text(), namespaceHTMLElements=False)
    categories = {}
    for node in listing.iter('article'):
        link = next(node.iter('a'), None)
        if link is not None:
            categories[link.get('href')] = json.loads(node.get('data-categories', '[]'))
    records = {}
    for slug in slugs:
        if not manage.re.fullmatch(r'[a-z0-9-]+', slug):
            raise ValueError('Invalid article route')
        page = html5lib.parse((source / 'blog' / slug / 'index.html').read_text(), namespaceHTMLElements=False)
        schema = next(json.loads(n.text) for n in page.iter('script') if n.get('type') == 'application/ld+json')
        prose = next(n for n in page.iter('div') if n.get('class') == 'blog-prose')
        serialized = html5lib.serialize(prose, tree='etree', quote_attr_values='always', omit_optional_tags=False)
        body = serialized.split('>', 1)[1].rsplit('</div>', 1)[0]
        article = dict(title=schema['headline'], description=schema['description'],
                       author=schema.get('author', {}).get('name', ''),
                       published=schema.get('datePublished', ''), image=schema.get('image', ''),
                       categories=categories.get('/blog/' + slug + '/', []), body=body)
        records[slug] = dict(slug=slug, approved=article, approved_hash=manage.digest(article))
    # Approval-shaped records exist only in a temporary rendering directory.
    with tempfile.TemporaryDirectory() as temp:
        stage = Path(temp)
        (stage / '_blog').mkdir()
        manage.save(stage, records)
        shutil.copy2(manage.ROOT / 'index.html', stage / 'index.html')
        manage.build(stage)
        output.mkdir(parents=True)
        for path in source.glob('*.html'):
            shutil.copy2(path, output / path.name)
        for folder in ('assets', 'css', 'js'):
            shutil.copytree(manage.ROOT / folder, output / folder)
        shutil.copytree(stage / 'blog', output / 'blog')
    (output / 'PREVIEW-ONLY.txt').write_text('LOCAL REVIEW ONLY — not published or clinically approved.\nRebuilt from downloaded preview HTML, not a fresh RSS fetch.\n')
    return len(records)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    print(f'Rebuilt {rebuild(args.source, args.output)} preview articles; no publication files changed.')
