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

## Medical review (default mode)

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

To withdraw an article permanently, use `python _blog/automatic.py withdraw --id RECORD_KEY`
and review/commit the JSON and generated deletion together. The `withdrawn` flag
prevents automatic re-publication; do not delete the record itself.
Manual edits to approved text invalidate its hash and withhold it until
reapproved. Do not edit generated HTML directly.

`_blog/` is excluded by default Jekyll underscore-directory rules, but a public
GitHub repository still exposes its tracked drafts and review names. These are
editorial drafts, NOT private clinical records. If unpublished copy is confidential,
use a private repository/review store before enabling import. A custom raw-file
deployment must explicitly exclude `_blog/` and `.github/` from its public artifact.

## Automation and deployment

### Manual read-only validation

The separate `.github/workflows/blog-validate.yml` workflow runs only through
`workflow_dispatch`, with `contents: read` and no persisted checkout credentials.
It does not depend on or change `BLOG_IMPORT_ENABLED`; leave that variable unset
or `false`. The existing import workflow is unchanged.

After the validation files are reviewed and merged onto the default branch, open
Actions > Validate GrandRanker RSS (read-only) > Run workflow, select `main`, and
run it. No write permissions or PR-creation setting are needed for this check.
The `Validate feed without saving articles` step securely uses the existing
`GRANDRANKER_RSS_URL` secret. It fetches at most 10 MiB over HTTPS, validates RSS 2.0
XML, and calls the existing importer parser entirely in memory.

Look for Feed access, XML structure, importer parsing, and required-field PASS
results. Counts cover raw items, eligible items, unique articles, duplicates,
required fields, full-content fields, and optional author/category/date/image
availability. Missing required fields fail the run. An empty valid feed produces
a warning: parsing works, but article compatibility still needs a populated feed.
A missing full-content field warns that description fallback may be an excerpt.
Optional-field counts below the article total deserve review but do not fail.

Failures report only fixed diagnostic messages, never exception details, URLs,
titles, or article bodies. No articles, artifacts, commits, branches, PRs,
approvals, or deployments are created. This checks feed structure and importer
compatibility, not clinical accuracy or accessibility of remote image URLs.

The owner has confirmed Pages uses Deploy from a branch, `main`, `/` (root).
Validation does not change that publishing configuration.

The repository has root static pages, a `main` branch, and `CNAME` containing
`monti-institute.com`; no separate checked-in deploy workflow exists. The owner
confirmed the Pages source above; remote Actions permissions have not been
independently verified. No hosting or domain settings have been changed.

`.github/workflows/blog-import.yml` checks every six hours and supports manual runs.
It is disabled unless repository variable `BLOG_IMPORT_ENABLED` equals `true`.
Configure the feed secret, enable Actions, and allow Actions to create pull requests
with contents/write and pull-requests/write permissions. The workflow imports pending
content into a new branch and opens a PR. It waits while an existing import PR is
open, avoiding competing reviews. In default review mode there is no automatic merge or deployment step.
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

## Optional automatic publication (disabled until explicitly enabled)

No repository variables or remote settings are changed by these files.
Two variables are required: `BLOG_IMPORT_ENABLED=true` and
`BLOG_PUBLICATION_MODE=automatic`. Any other publication mode keeps the existing
review-PR workflow. Imports run at 00:23, 06:23, 12:23 and 18:23 UTC, best-effort.

The automatic job validates the configured secret feed, stages sanitized content
and HTML in a temporary copy, and promotes versions without individual review.
The reviewer field explicitly says this is automatic publication, not clinical
review. Previous approved versions are retained in each record's `history`.
Stable identities deduplicate entries and retain URLs; articles missing from the
feed remain published. Malformed or empty feeds stop before publication files
change. Validation is structural, not a guarantee of medical accuracy or complete
article text: a description fallback may be an excerpt.

Only `_blog/articles.json` and generated `blog/` files are committed to `main`.
The job has `contents: write` and `pages: write`, not PR or administration rights.
It verifies Pages still uses legacy branch publishing from `main` root, then
requests `POST /repos/{owner}/{repo}/pages/builds` after pushing. This explicit
request handles the fact that GITHUB_TOKEN pushes do not trigger Pages builds.
It also retries the build request on unchanged runs, allowing recovery from a
prior build-request failure. No Pages source, domain, or hosting setting changes.
API reference: https://docs.github.com/en/rest/pages/pages#request-a-github-pages-build

The remote push/API permissions and actual live build cannot be proven without
a confirmed live run. Branch rules may block bot pushes; do not weaken protections
silently. Resolve permissions with the repository owner before enabling automatic
mode, or retain review mode. No additional token or service is assumed.

### First real article preview

1. Keep `BLOG_IMPORT_ENABLED` false or unset. After these files are reviewed and
   merged, run the existing read-only validation when the feed has an article.
2. Run Actions > Preview GrandRanker articles (no publishing) > Run workflow on
   `main`. It uses the exact staging/generation pipeline used by automatic mode,
   but has only `contents: read`, never commits or deploys, and ignores enable flags.
3. Download the `monti-journal-preview` artifact (retained for three days). Extract
   it locally, run `python3 -m http.server 8153` from that directory, and visit
   `http://localhost:8153/blog/`. No sample articles are created. An empty feed stops
   the run without producing an artifact. The artifact contains actual unpublished
   article content; repository users with artifact access can download it.
4. Review complete body, formatting, author, date, categories, images, and every
   destination link on desktop/mobile. Inspect page source for title, description,
   canonical URL, and Article JSON-LD. Canonicals intentionally target the live domain.
   Image/link destinations are not automatically fetched by validation.
5. This tests generation and packaging without live writes. It does not test a real
   Pages deployment; that requires separate confirmation. After approval to proceed,
   set `BLOG_PUBLICATION_MODE=automatic`, then `BLOG_IMPORT_ENABLED=true`, and manually
   run Import Insights for review (the shared workflow name). Check the automatic
   job, bot commit, build request and Pages deployment for success.

To stop future runs, set `BLOG_IMPORT_ENABLED=false`; cancel any already-running
import workflow as well. Existing articles remain live. To return to manual review,
set `BLOG_PUBLICATION_MODE=review`. Resolve stale review PRs before changing modes.
To remove an article, disable imports first, run the withdrawal command above,
review/merge its deletion, and then resume only with authorization.
