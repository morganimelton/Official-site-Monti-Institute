"""Stage a validated feed and generated site before changing publication files."""
import argparse
import json
import os
from pathlib import Path
import shutil
import sys
import tempfile

import manage
import validate


def promote(root):
    data = manage.load(root)
    for record in data.values():
        if record.get('withdrawn') or 'pending' not in record:
            continue
        version = manage.digest(record['pending'])
        if record.get('approved_hash') == version:
            continue
        if 'approved' in record:
            record.setdefault('history', []).append(record['approved'])
        record['approved'] = record['pending'].copy()
        record['approved_hash'] = version
        record['reviewer'] = 'Automatic feed publication (not clinical review)'
    manage.save(root, data)


def stage(root, raw, url, destination):
    lines, valid = validate.validate(raw)
    print('\n'.join(lines))
    if not valid:
        raise ValueError('Invalid article fields')
    if not manage.parse_feed(raw):
        raise ValueError('No articles available to preview or publish')
    shutil.copytree(root, destination, ignore=shutil.ignore_patterns('.git', '__pycache__', '.venv'))
    manage.import_feed(destination, raw, url)
    promote(destination)
    manage.build(destination)
    # Verify every generated route contains static article content and SEO markup.
    for slug in json.loads((destination / 'blog/generated.json').read_text()):
        page = (destination / 'blog' / slug / 'index.html').read_text()
        for marker in ('rel="canonical"', 'application/ld+json', 'class="blog-prose"', '<h1>'):
            if marker not in page:
                raise ValueError('Generated article incomplete')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['preview', 'publish', 'withdraw'])
    parser.add_argument('--output', type=Path)
    parser.add_argument('--id')
    args = parser.parse_args()
    try:
        if args.mode == 'withdraw':
            data = manage.load(manage.ROOT)
            data[args.id]['withdrawn'] = True
            manage.save(manage.ROOT, data)
            manage.build(manage.ROOT)
            print('Article withdrawn locally; review and commit the generated removal.')
            return 0
        if args.mode == 'publish' and not (
                os.environ.get('BLOG_IMPORT_ENABLED') == 'true' and
                os.environ.get('BLOG_PUBLICATION_MODE') == 'automatic'):
            raise ValueError('Automatic publication disabled')
        url = os.environ.get('GRANDRANKER_RSS_URL', '')
        if not url:
            raise ValueError('Missing feed secret')
        raw = validate.fetch(url)
        if args.mode == 'preview' and (not args.output or args.output.exists()):
            raise ValueError('Preview requires a new output directory')
        with tempfile.TemporaryDirectory() as temporary:
            staged = Path(temporary) / 'site'
            stage(manage.ROOT, raw, url, staged)
            if args.mode == 'preview':
                # Export only public site files, never draft JSON, credentials or workflows.
                args.output.mkdir(parents=True)
                for source in staged.glob('*.html'):
                    shutil.copy2(source, args.output / source.name)
                for folder in ('assets', 'css', 'js', 'blog'):
                    shutil.copytree(staged / folder, args.output / folder)
                print('Preview generated. No repository or live-site files changed.')
            else:
                shutil.copy2(staged / '_blog/articles.json', manage.ROOT / '_blog/articles.json')
                shutil.rmtree(manage.ROOT / 'blog')
                shutil.copytree(staged / 'blog', manage.ROOT / 'blog')
                print('Validated publication files generated locally; no deployment performed by this script.')
        return 0
    except Exception:
        print('Operation stopped. Check feed availability, validation counts, mode settings, and output path. Private details suppressed.', file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
