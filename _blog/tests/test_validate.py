import contextlib
import io
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import validate
from test_blog import feed


class ValidationTests(unittest.TestCase):
    def test_valid_and_duplicate_counts(self):
        raw = feed()
        tree = validate.manage.ET.fromstring(raw)
        channel = tree.find('channel')
        channel.append(channel.find('item'))
        lines, passed = validate.validate(validate.manage.ET.tostring(tree))
        self.assertTrue(passed)
        self.assertIn('Feed items: 2', lines)
        self.assertIn('Unique parsed articles: 1', lines)
        self.assertIn('Optional image: 1/1 unique articles', lines)

    def test_missing_required_fields(self):
        lines, passed = validate.validate(b'<rss version="2.0"><channel><item><title>Test</title></item></channel></rss>')
        self.assertFalse(passed)
        self.assertIn('Eligible items: 0', lines)

    def test_empty_and_invalid_feeds(self):
        lines, passed = validate.validate(b'<rss version="2.0"><channel/></rss>')
        self.assertTrue(passed)
        self.assertTrue(any('empty' in line for line in lines))
        for raw in (b'bad XML', b'<html/>', b'<rss version="1.0"><channel/></rss>'):
            with self.assertRaises(Exception):
                validate.validate(raw)

    def test_no_writes_or_sensitive_output(self):
        secret = 'https://example.org/private?token=secret-value'
        with patch.dict('os.environ', {'GRANDRANKER_RSS_URL': secret}), \
                patch.object(validate, 'fetch', return_value=feed(title='PRIVATE TITLE')), \
                patch.object(validate.manage, 'save') as save, \
                patch.object(validate.manage, 'build') as build, \
                contextlib.redirect_stdout(io.StringIO()) as output:
            self.assertEqual(validate.main(), 0)
            save.assert_not_called()
            build.assert_not_called()
            self.assertNotIn(secret, output.getvalue())
            self.assertNotIn('PRIVATE TITLE', output.getvalue())

    def test_fetch_failure_and_missing_secret(self):
        with patch.dict('os.environ', {'GRANDRANKER_RSS_URL': 'https://example.org/secret'}), \
                patch.object(validate, 'fetch', side_effect=ValueError('private-credential')), \
                contextlib.redirect_stdout(io.StringIO()) as output:
            self.assertEqual(validate.main(), 1)
            self.assertNotIn('private-credential', output.getvalue())
        with patch.dict('os.environ', {'GRANDRANKER_RSS_URL': ''}), \
                contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(validate.main(), 1)
