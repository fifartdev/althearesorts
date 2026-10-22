# Althea Resorts — website

Next.js 16 (App Router) site for [althearesorts.com](https://www.althearesorts.com), with all content managed in **WordPress as a headless CMS**.

```
WordPress (cms.althearesorts.com)               Next.js (Vercel, www.althearesorts.com)
  Althea CMS must-use plugin                     src/lib/wp/  ← all WordPress access
  ├─ content types, fields, wp-admin forms  ───▶  api.ts      read API (server only, cached, tagged)
  ├─ read API  /wp-json/althea/v1/*              fallback/   offline snapshot if WordPress is down
  └─ on save → POST /api/revalidate  ─────────▶  app/api/revalidate  expires the changed tags at once
```

- **Editing:** wp-admin → **Althea**. English and Greek fields are side by side. Saving updates the website within about a second.
- **Everything is editable**, including SEO and GEO: per-page titles, descriptions, keywords and share images; the hotel/restaurant/spa structured data; robots.txt; llms.txt; screen-reader labels (Althea → Site pages → *SEO & GEO* and *Screen-reader labels*). Only layout, styling, animations and URLs are code.
- **The WordPress site has no public front end.** Its public URLs show a blank `noindex` page with a button to the website.
- **Contact form:** enquiries are saved in WordPress (**Althea → Form submissions**, private) and emailed via Resend. The visitor only sees an error if both fail.

## Setup

```sh
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

| Variable | Used by | Purpose |
|---|---|---|
| `WP_API_URL` | site, scripts | WordPress REST root, `https://cms.althearesorts.com/wp-json` (HTTPS only) |
| `WP_USERNAME`, `WP_APP_PASSWORD` | scripts | WordPress user + [application password](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/) for the migration (writes). The site itself only reads public endpoints. |
| `REVALIDATE_SECRET` | site | Shared secret for `POST /api/revalidate`. Must equal `ALTHEA_REVALIDATE_SECRET` in `wp-config.php`. |
| `VERCEL_BYPASS` | scripts/tests | Vercel *Protection Bypass for Automation* secret (lets WordPress reach protected preview deployments). |
| `FTP_USER`, `FTP_PASSWORD` | `cms:deploy-plugin` | FTPS access to the WordPress server (host `server98.cretaforce.gr`). |
| `WP_FORMS_USER`, `WP_FORMS_APP_PASSWORD` | contact form | WordPress user with the *Althea website (form submissions)* role (can only create submissions) + its application password |
| `RESEND_API_KEY`, `RESEND_TO`, `RESEND_FROM` | contact form | Notification email |

Never commit `.env*` files except `.env.example`. On Vercel, the WordPress variables are set for **Production** and **Preview**; both read cms. The migration login (`WP_USERNAME`, `WP_APP_PASSWORD`) is only in `.env.local`, for the scripts. Plugin changes are tested on a throwaway local WordPress (`wordpress/tests/run-local.sh`); the live editability test refuses to run against production.

## How content is read

- Every page reads through `src/lib/wp/api.ts` (`getSettings`, `getPage`, `getItems`, `getTerms`, `getPosts`). It only runs on the server, so no credentials or API calls reach the browser.
- Responses are cached by Next.js with tags: `wp`, `wp:settings`, `wp:page:<slug>`, `wp:<post_type>`. When content is saved, the plugin calls `/api/revalidate` with the affected tags. These are expired immediately (`revalidateTag(tag, { expire: 0 })`), so the very next visitor gets the new content. A 1-hour revalidation is only a safety net for a missed webhook.
- Builds are gentle on WordPress: identical concurrent requests are shared, at most 4 run in parallel, and 429/5xx responses are retried.
- **Fallback:** if WordPress is unreachable, the snapshot in `src/lib/wp/fallback/content.json` is served instead, so builds and pages never fail. It references the original images in `/public/images`, which therefore stay in the repo.
- Stored text formats (`src/lib/wp/text.ts`): paragraphs separated by an empty line; lists one item per line; article bodies use a small markdown-like format (`## Heading`, `- item`, `Q:`/`A:`, `[cta] Label | /href`, `---`, `[address]`). Inline HTML (`a`, `em`, `strong`, `br`) is rendered by `Rich` without `dangerouslySetInnerHTML`.
- Field definitions live in **one file**, `wordpress/mu-plugins/althea-cms/schema.json`. The plugin, the TypeScript types (`npm run cms:types`), the migration and the validators all read it.

## Scripts

| Command | What it does |
|---|---|
| `npm run cms:migrate -- --dry-run` | Shows what the migration would create, update or skip (read-only) |
| `npm run cms:migrate` | Imports `content.json` and all images into WordPress. Idempotent: images are matched by source and hash; entries by slug, and only updated when their content in the repo changed (`--force` to update all, `--only=media,terms,items,pages,settings`). Prints a created/updated/skipped/failed report and writes `scripts/media-map.json`. |
| `npm run cms:verify` | Reads everything back through the public API and checks it matches `content.json` |
| `npm run cms:pull-fallback` | Refreshes `content.json` from WordPress so the outage fallback has the latest edits (`-- --check` only reports) |
| `npm run cms:types` | Regenerates `src/lib/wp/schema-types.ts` after editing `schema.json` |
| `npm run cms:deploy-plugin` | Uploads the plugin to `wp-content/mu-plugins/` over FTPS (`-- althea-cms/schema.json` for one file) |
| `npm run cms:audit -- <snapshot dir> src/lib/wp/fallback/content.json` | Checks that every visible, screen-reader, SEO and structured-data string on every page comes from WordPress content (lists any that don't) |
| `npm run cms:editability-test -- <site url> --yes` | Live proof on a non-public deployment: changes, creates and deletes content of every kind in WordPress and checks the site shows it within seconds; restores everything. Result in `scripts/content/editability-report.json` |
| `npm run cms:check-tags` | After `npm run build`: every prerendered page must carry the WordPress cache tags (otherwise saving in WordPress could not refresh it) |
| `npx tsx scripts/compare/snapshot.ts <url> <dir>` + `compare.ts <a> <b>` | Saves and compares every page (body, meta, canonical/hreflang, JSON-LD) between two running builds |

### Changing a field

1. Edit `wordpress/mu-plugins/althea-cms/schema.json`.
2. `npm run cms:types`, then use the field in the page component.
3. `npm run cms:deploy-plugin -- althea-cms/schema.json`.
4. Fill in the new field in wp-admin (or in `content.json` and run `npm run cms:migrate`).

## WordPress plugin

See [wordpress/README.md](wordpress/README.md): installation, `wp-config.php` constants (`ALTHEA_REVALIDATE_URL`, which may hold several URLs separated by commas, plus `ALTHEA_REVALIDATE_SECRET`, `ALTHEA_VERCEL_BYPASS` and `ALTHEA_FRONTEND_URL`), the read API, and the local integration tests (`wordpress/tests/run-local.sh`).

## Verifying a change

```sh
npm run lint && npx tsc --noEmit && npm run test:int
npm run build
```

The migration was verified by building `main` and this branch and comparing all 59 public URLs (EN and EL pages, blog posts, robots.txt, sitemap.xml, llms.txt, a 404 page): identical body, meta, hreflang and structured data, both with WordPress available and with WordPress unreachable. The only intended difference is that `og:image` and room JSON-LD photos now point to the WordPress copy of the same image.

More background: [docs/cms-migration-plan.md](docs/cms-migration-plan.md).
