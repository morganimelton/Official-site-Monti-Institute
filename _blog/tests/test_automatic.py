import contextlib
import io
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import automatic
import test_blog as fixtures
from test_blog import feed, blog


class AutomaticTests(unittest.TestCase):
    setUp = fixtures.BlogTests.setUp
    tearDown = fixtures.BlogTests.tearDown

    def test_promotion_history_and_withdrawal(self):
        blog.import_feed(self.root, feed())
        automatic.promote(self.root)
        data = blog.load(self.root)
        key = next(iter(data))
        original = data[key]['approved']
        blog.import_feed(self.root, feed(body='<p>Updated content.</p>'))
        automatic.promote(self.root)
        automatic.promote(self.root)
        data = blog.load(self.root)
        self.assertEqual(data[key]['history'], [original])
        data[key]['withdrawn'] = True
        blog.save(self.root, data)
        blog.import_feed(self.root, feed(body='<p>Another version.</p>'))
        automatic.promote(self.root)
        blog.build(self.root)
        self.assertFalse((self.root / 'blog' / data[key]['slug']).exists())

    def test_staging_does_not_mutate_source(self):
        destination = self.root.parent / (self.root.name + '-stage')
        try:
            with contextlib.redirect_stdout(io.StringIO()):
                automatic.stage(self.root, feed(), '', destination)
            self.assertEqual(blog.load(self.root), {})
            self.assertTrue((destination / 'blog/index.html').exists())
            self.assertEqual(len(blog.load(destination)), 1)
        finally:
            automatic.shutil.rmtree(destination, ignore_errors=True)

    def test_invalid_and_empty_feed_do_not_stage(self):
        for raw in (b'<rss version="2.0"><channel/></rss>', b'<rss version="2.0"><channel><item><title>Missing fields</title></item></channel></rss>'):
            destination = self.root / 'unused'
            with contextlib.redirect_stdout(io.StringIO()), self.assertRaises(ValueError):
                automatic.stage(self.root, raw, '', destination)
            self.assertFalse(destination.exists())
            self.assertEqual(blog.load(self.root), {})

    def test_publish_requires_both_switches(self):
        with patch.object(sys, 'argv', ['automatic.py', 'publish']), \
                patch.dict('os.environ', {'BLOG_IMPORT_ENABLED': 'false', 'BLOG_PUBLICATION_MODE': 'automatic'}), \
                patch.object(automatic.validate, 'fetch') as fetch, \
                contextlib.redirect_stderr(io.StringIO()):
            self.assertEqual(automatic.main(), 1)
            fetch.assert_not_called()
