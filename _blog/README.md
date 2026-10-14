# Insights & Education maintenance

The site remains static HTML. `/blog/` maps to `blog/index.html`; articles map to
`blog/<stable-title-slug>-<identity-hash>/index.html`. No browser RSS request or
server subscription is required. All approved article content is in generated HTML.

## Setup and local review

```sh
python3 -m venv /tmp/monti-blog-venv
/tmp/monti-blog-venv/bin/pip install -r _blog/requirements.txt
/tmp/monti-blog-venv/bin/python -m unittest discover -s _blog/tests
/tmp/monti-blog-venv/bin/python _blog/manage.py build
python3 -m http.server 8151 --bind 127.0.0.1
```

Use an available port. Preview `/blog/` over HTTP because the existing site uses
ES modules. The generator reuses the homepage header and footer at build time,
converting local asset/navigation paths for nested URLs. Rebuild after shared
header/footer changes. Existing HTML content is not rewritten by the generator.

No RSS articles or invented medical content are seeded. The empty blog uses an
existing Monti waiting-room photograph and links to the Care page. After approval,
the newest dated article becomes featured and all articles appear in the library.
Category filters are progressively enhanced; without JavaScript all articles show.

## Feed configuration

Set `GRANDRANKER_RSS_URL` in the environment or as a GitHub Actions repository
secret. Never paste a private URL into source, a commit, a PR, or logs. No webhook
secret is needed for this polling integration. Only HTTPS is accepted. The fetch
has a 30-second timeout and a 10 MiB limit. Fetch/parse failures exit unsuccessfully
without deleting content. A missing URL is a safe no-op.

```sh
/tmp/monti-blog-venv/bin/python _blog/manage.py import
```

For a local, non-secret fixture: `python _blog/manage.py import --file /tmp/feed.xml`.
RSS 2.0 mappings: GUID (fallback link) identifies an item; `content:encoded` supplies
the full HTML (fallback description); `dc:creator` or `author` supplies the author;
categories and valid RFC publication dates are retained. Images come from Media RSS,
image enclosures, or the first content image. Missing images use the existing Monti
waiting-room photograph. Original external image URLs are retained, not downloaded.
Confirm they are public HTTPS URLs and permitted for publication. Imported images
without alternatives get empty alt text; reviewers should supply descriptive alt
text in article bodies before approval. Hero/card images use the article title.

The sanitizer uses Bleach's HTML parser and an allowlist. Scripts, event handlers,
iframes, styles, SVG, unsafe URLs, and embedded forms are not allowed. H1 becomes H2.
Reviewers must still check clinical accuracy, image permissions, authorship, and
linked destinations. Do not treat feed claims as verified medical information.

## Medical review (required)

`_blog/articles.json` retains a pending and optionally an approved version per
hashed feed identity. The source GUID/link is not persisted. Reimports deduplicate;
title changes retain the original URL; items absent from later feeds are retained.
An updated pending version does not replace its previously approved public version.

1. Inspect `pending` in the JSON and review its full text, metadata, and imagery.
2. Correct content in the pending record if needed, then compute its current digest
   with `manage.digest(record['pending'])` (the stored pending hash describes the
   imported version; edits require a new digest).
3. Approve the exact version with the responsible reviewer's name:

```sh
python _blog/manage.py approve --id FULL_RECORD_KEY --hash PENDING_HASH --reviewer 'Reviewer name'
```

4. Preview the generated article and blog at desktop/mobile widths. Commit the
   JSON approval and generated `blog/` files together in the review PR.
5. A human merges the reviewed PR through the normal site publishing process.

There is no unrestricted auto-approve mode. To withdraw an article, remove its
`approved` and `approved_hash` fields, rebuild, and review/commit the generated
deletion. Manual edits to approved text invalidate its hash and withhold it until
reapproved. Do not edit generated HTML directly.

`_blog/` is excluded by default Jekyll underscore-directory rules, but a public
GitHub repository still exposes its tracked drafts and review names. These are
editorial drafts, NOT private clinical records. If unpublished copy is confidential,
use a private repository/review store before enabling import. A custom raw-file
deployment must explicitly exclude `_blog/` and `.github/` from its public artifact.

## Automation and deployment

The repository has root static pages, a `main` branch, and `CNAME` containing
`monti-institute.com`; no previous checked-in build/deploy workflow exists. GitHub
Pages' actual source branch/folder and permissions could not be verified using
the unauthenticated Pages API. Confirm Settings > Pages before enabling automation.
No hosting or domain settings have been changed.

`.github/workflows/blog-import.yml` checks every six hours and supports manual runs.
It is disabled unless repository variable `BLOG_IMPORT_ENABLED` equals `true`.
Configure the feed secret, enable Actions, and allow Actions to create pull requests
with contents/write and pull-requests/write permissions. The workflow imports pending
content into a new branch and opens a PR. It waits while an existing import PR is
open, avoiding competing reviews. There is no automatic merge or deployment step.
Approved versions are published through the existing process after human review.

GitHub documents that commits made with `GITHUB_TOKEN` do not trigger branch-based
Pages builds. Therefore the importer deliberately uses review PRs and a human merge;
it does not assume a bot push deploys the website. Verify the normal Pages deployment
completes after an authorized merge. Keep the current publishing source and CNAME.
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Before enabling: obtain the RSS endpoint, a representative RSS sample, the clinical
reviewer's name/workflow, and confirmation of GitHub Pages source and Actions permissions.
The sample must include full content, author, category, and image fields so any
GrandRanker-specific namespaces can be verified. No connection token belongs in chat
or the repository. Store private credentials directly in GitHub Secrets.
