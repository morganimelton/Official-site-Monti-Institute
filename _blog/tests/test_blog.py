import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

MODULE = Path(__file__).resolve().parents[1] / 'manage.py'
spec = importlib.util.spec_from_file_location('blog', MODULE)
blog = importlib.util.module_from_spec(spec)
spec.loader.exec_module(blog)


def feed(title='A test article', body='<p>Test content only.</p>', guid='test-1'):
    return f'''<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>Test</title><item><guid>{guid}</guid><title>{title}</title><description>Test description</description><content:encoded><![CDATA[{body}]]></content:encoded><dc:creator>Test Author</dc:creator><category>Skin Health</category><pubDate>Wed, 14 Oct 2026 10:00:00 GMT</pubDate><media:content medium="image" url="https://example.org/test.jpg" /></item></channel></rss>'''.encode()


class BlogTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        (self.root / '_blog').mkdir()
        (self.root / '_blog/articles.json').write_text('{}')
        (self.root / 'index.html').write_text((blog.ROOT / 'index.html').read_text())

    def tearDown(self):
        self.temp.cleanup()

    def test_review_stable_url_and_changed_content(self):
        blog.import_feed(self.root, feed())
        data = blog.load(self.root)
        key = next(iter(data))
        slug = data[key]['slug']
        blog.build(self.root)
        self.assertFalse((self.root / 'blog' / slug).exists())
        blog.approve(self.root, key, data[key]['pending_hash'], 'Medical reviewer')
        blog.build(self.root)
        page = (self.root / 'blog' / slug / 'index.html').read_text()
        self.assertIn('Test content only.', page)
        self.assertIn('application/ld+json', page)
        self.assertIn('rel="canonical"', page)
        self.assertIn('Test Author', page)
        blog.import_feed(self.root, feed(title='Changed title', body='<p>New content.</p>'))
        blog.build(self.root)
        self.assertEqual(slug, blog.load(self.root)[key]['slug'])
        self.assertEqual(page, (self.root / 'blog' / slug / 'index.html').read_text())
        with self.assertRaises(ValueError):
            blog.approve(self.root, key, data[key]['pending_hash'], 'Medical reviewer')

    def test_duplicate_import_and_missing_optional_fields(self):
        raw = b'<rss version="2.0"><channel><item><guid>x</guid><title>Title</title><description>Body</description></item></channel></rss>'
        blog.import_feed(self.root, raw)
        blog.import_feed(self.root, raw)
        self.assertEqual(len(blog.load(self.root)), 1)
        record = next(iter(blog.load(self.root).values()))['pending']
        self.assertEqual(record['published'], '')
        self.assertEqual(record['categories'], [])

    def test_bad_feed_preserves_data(self):
        blog.import_feed(self.root, feed())
        before = blog.load(self.root)
        for raw in [b'not xml', b'<html/>', b'<!DOCTYPE rss [<!ENTITY e SYSTEM "file:///etc/passwd">]><rss><channel>&e;</channel></rss>']:
            with self.assertRaises(Exception):
                blog.import_feed(self.root, raw)
            self.assertEqual(blog.load(self.root), before)

    def test_html_sanitizer(self):
        result = blog.clean_body('<h1>Heading</h1><script>alert(1)</script><iframe src="https://evil.org"></iframe><img src="https://example.org/a.png" onerror="alert(1)"><a href="javascript:alert(1)">bad</a><a href="https://example.org">good</a><svg onload="alert(1)"></svg>')
        for unsafe in ['<script', '<iframe', 'onerror', 'javascript:', '<svg', '<h1']:
            self.assertNotIn(unsafe, result)
        self.assertIn('<h2>', result)
        self.assertIn('alt=""', result)
        self.assertIn('href="https://example.org"', result)

    def test_no_feed_credentials_persisted(self):
        with self.assertRaises(ValueError):
            blog.import_feed(self.root, feed(body='<p>private-token-12345</p>'), 'https://example.org/rss?key=private-token-12345')
        self.assertEqual(blog.load(self.root), {})

    def test_unapprove_removes_generated_page(self):
        blog.import_feed(self.root, feed())
        data = blog.load(self.root)
        key = next(iter(data))
        blog.approve(self.root, key, data[key]['pending_hash'], 'Reviewer')
        blog.build(self.root)
        data = blog.load(self.root)
        del data[key]['approved_hash']
        blog.save(self.root, data)
        blog.build(self.root)
        self.assertFalse((self.root / 'blog' / data[key]['slug']).exists())


if __name__ == '__main__':
    unittest.main()
