import unittest
import html5lib
from test_blog import blog, feed
import test_blog as fixtures


class ArticleFormatTests(unittest.TestCase):
    def tree(self, body):
        return html5lib.parseFragment(blog.clean_body(body), namespaceHTMLElements=False)

    def test_toc_preserves_targets_and_recovers_stripped_links(self):
        tree = self.tree('<ul><li><a href="#custom">First</a></li><li><a>Second &amp; More</a></li></ul>'
                         '<h2 id="custom">First</h2><h3>Second &amp; More</h3>')
        ids = {n.get('id') for n in tree.iter() if n.tag in {'h2', 'h3'}}
        for a in tree.iter('a'):
            self.assertIn(a.get('href')[1:], ids)

    def test_ids_unique_safe_and_idempotent(self):
        body = '<h2 id="main">One</h2><h2 id="main">Two</h2><h3>Two</h3>'
        clean = blog.clean_body(body)
        tree = self.tree(clean)
        ids = [n.get('id') for n in tree.iter() if n.tag in {'h2', 'h3'}]
        self.assertEqual(len(ids), len(set(ids)))
        self.assertNotIn('main', ids)
        self.assertEqual(clean, blog.clean_body(clean))
        self.assertNotIn('onclick', blog.clean_body('<h2 id="x" onclick="bad()">Title</h2>'))

    def test_booking_only_changes_destination_and_retains_other_links(self):
        tree = self.tree('<a href="https://monti-institute.com"><strong>Request Appointment</strong></a>'
                         '<a href="/care.html">Care</a><a href="https://example.org">Source</a>')
        self.assertEqual([a.get('href') for a in tree.iter('a')], [blog.BOOK, '/care.html', 'https://example.org'])
        self.assertIn('<strong>Request Appointment</strong>', blog.clean_body('<a> <strong>Request Appointment</strong></a>'))

    def test_categories(self):
        self.assertEqual(blog.category_label('how-to'), 'Practical Guidance')
        self.assertEqual(blog.category_label('ultimate-guide'), 'Comprehensive Guide')
        self.assertEqual(blog.category_label('Migraine Care'), 'Migraine Care')


class DuplicateFeedTests(unittest.TestCase):
    setUp = fixtures.BlogTests.setUp
    tearDown = fixtures.BlogTests.tearDown

    def test_duplicate_items_and_reimports_generate_one_route(self):
        raw = feed()
        item = raw[raw.index(b'<item>'):raw.index(b'</item>') + len(b'</item>')]
        raw = raw.replace(b'</channel>', item + b'</channel>')
        self.assertEqual(blog.import_feed(self.root, raw), 1)
        blog.import_feed(self.root, raw)
        data = blog.load(self.root)
        self.assertEqual(len(data), 1)
        key = next(iter(data))
        blog.approve(self.root, key, data[key]['pending_hash'], 'Test reviewer')
        blog.build(self.root)
        import json
        self.assertEqual(len(json.loads((self.root / 'blog/generated.json').read_text())), 1)

    def test_downloaded_preview_rebuild_preserves_body_and_source(self):
        from unittest.mock import patch
        import sys
        sys.path.insert(0, str(blog.ROOT / '_blog'))
        import rebuild_preview
        body = '<p>Clinical text.</p><strong>Heading</strong>Important plain text.<a>Request Appointment</a>'
        blog.import_feed(self.root, feed(body=body))
        data = blog.load(self.root)
        key = next(iter(data))
        blog.approve(self.root, key, data[key]['pending_hash'], 'Test reviewer')
        blog.build(self.root)
        for folder in ('assets', 'css', 'js'):
            (self.root / folder).mkdir()
        before = (self.root / '_blog/articles.json').read_bytes()
        output = self.root / 'preview'
        with patch.object(rebuild_preview.manage, 'ROOT', self.root):
            self.assertEqual(rebuild_preview.rebuild(self.root, output), 1)
        def prose(path):
            tree = html5lib.parse(path.read_text(), namespaceHTMLElements=False)
            return ''.join(next(n for n in tree.iter('div') if n.get('class') == 'blog-prose').itertext())
        route = 'blog/' + data[key]['slug'] + '/index.html'
        self.assertEqual(prose(self.root / route), prose(output / route))
        self.assertEqual(before, (self.root / '_blog/articles.json').read_bytes())
        self.assertFalse((output / '_blog').exists())
        with self.assertRaises(ValueError):
            rebuild_preview.rebuild(self.root, output)
