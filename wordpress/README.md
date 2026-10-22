# Althea CMS — WordPress plugin

A must-use plugin that turns a WordPress site into the headless CMS for the Althea Resorts Next.js website. It adds the content types, the edit screens, and a read API. No theme or page builder is involved, and it does not touch existing pages, posts or media.

## What it adds

All of it lives under a single **Althea** menu in wp-admin.

| Menu item | Content |
|---|---|
| Overview | Links to every site page, and a "Refresh all content now" button |
| Settings | Contact details, booking URL, social links, navigation menus |
| Site pages | One entry per website page (`home`, `about`, `spa`, …) with that page's texts and images. The slug decides which page it is. |
| Rooms, Blog posts, FAQs, Gallery, Testimonials, Dining venues, Spa items, Sights, Offers, Booking reasons | Repeating content |
| FAQ categories, Gallery categories | With a Greek name and an order |

Translated fields show **English and Ελληνικά side by side**. Blog posts are the exception: there is one post per language, linked by a shared *Translation key*.

Every field is defined in [`mu-plugins/althea-cms/schema.json`](mu-plugins/althea-cms/schema.json). The Next.js data layer and the migration script read the same file, so a field change means editing `schema.json` and re-uploading that one file.

## Form submissions

The website's contact form stores each enquiry as a private **Form submission** (`althea_submission`, under Althea in wp-admin). It is not website content: it is never in the read API, never triggers revalidation, and has its own capabilities. Administrators and editors can read, edit (set *Status* to in progress/done) and delete them.

The website writes them as a dedicated user with the **Althea website (form submissions)** role (`althea_forms`), which can only create submissions. Create that user once (any email), add an application password, and set `WP_FORMS_USER` / `WP_FORMS_APP_PASSWORD` on Vercel. On cms this user is `althea-forms`.

## Roles

- **Administrator**: everything.
- **Althea content manager** (`althea_manager`): everything the website shows (all Althea content, site pages, Althea → Settings, media, categories, form submissions). No plugins, themes, users or WordPress settings; the unused core Posts, Comments and Tools are hidden and redirect to Althea. Althea settings use their own capability, `althea_manage_settings`.
- **Althea website (form submissions)** (`althea_forms`): only creates form submissions (used by the website).

Contact form notifications go to **Althea → Settings → Contact → Contact form notifications to** (comma-separated for several addresses), else `RESEND_TO`.

## Headless mode

WordPress is only the backend. Every public page of the WordPress site (home, posts, archives, feeds, 404s) shows a blank white page with one **Visit althearesorts.com** button, served with `noindex, nofollow`. `robots.txt` disallows everything and the WordPress sitemap is disabled. wp-admin, wp-login.php, the REST API and media files are unaffected. The button target can be changed with `define( 'ALTHEA_FRONTEND_URL', '…' );` in `wp-config.php`.

## Install

**Staging is already installed** (2026-10-18, via `wordpress/deploy-ftp.sh`). To push plugin changes, run `wordpress/deploy-ftp.sh` (all files) or `wordpress/deploy-ftp.sh althea-cms/schema.json` (one file). It needs `FTP_USER`/`FTP_PASSWORD` in `.env.local`.

Manual install:

1. Upload the **contents** of `wordpress/mu-plugins/` to `wp-content/mu-plugins/` on the WordPress server. Create that folder if it doesn't exist. You should end up with:
   ```
   wp-content/mu-plugins/althea-cms.php
   wp-content/mu-plugins/althea-cms/schema.json
   wp-content/mu-plugins/althea-cms/admin.js
   wp-content/mu-plugins/althea-cms/admin.css
   wp-content/mu-plugins/althea-cms/includes/*.php
   ```
2. Must-use plugins are active immediately, with nothing to activate. Check **Plugins → Must-Use** for "Althea CMS".
3. For instant website updates, add to `wp-config.php` above "That's all, stop editing":
   ```php
   // One URL, or several separated by commas (e.g. preview, production).
   define( 'ALTHEA_REVALIDATE_URL', 'https://www.althearesorts.com/api/revalidate' );
   define( 'ALTHEA_REVALIDATE_SECRET', '…same value as REVALIDATE_SECRET in the Next.js environment…' );
   // Only to reach Vercel preview deployments behind Vercel Authentication:
   define( 'ALTHEA_VERCEL_BYPASS', '…Protection Bypass for Automation secret…' );
   ```
   Add these **after** the initial content migration. Otherwise every migrated item triggers its own refresh request.

   **Production** (cms.althearesorts.com, since 2026-10-22) points at `https://www.althearesorts.com/api/revalidate`. Preview deployments are not notified (they refresh within the hour); to notify one too, add its URL comma-separated and set `ALTHEA_VERCEL_BYPASS`.

Requirements: WordPress 6.5+ and PHP 7.4+. Tested on WordPress 7.1.3 / PHP 8.2. No other plugins or page builders are needed.

To uninstall, delete the two items from `wp-content/mu-plugins/`. The content stays in the database.

## Read API (public, published content only)

| Route | Returns |
|---|---|
| `GET /wp-json/althea/v1/settings` | Settings. Translated values as `{ en, el }` |
| `GET /wp-json/althea/v1/pages/<slug>` | A site page: `sections.<section>.<field>`. Images as `{ id, url, width, height, alt }`, repeated groups as arrays |
| `GET /wp-json/althea/v1/items/<post_type>` | All published items of a type, in menu order, with `fields`, `image` and `terms` |
| `GET /wp-json/althea/v1/terms/<taxonomy>` | Terms with `name_el` and `sort_order` |
| `GET /wp-json/althea/v1/schema` | `schema.json` and the plugin version |
| `GET /wp-json/althea/v1/media-index` | *(auth)* Media uploaded by the migration script, keyed by source path and hash |

Responses are sent with `Cache-Control: no-store` and `X-Accel-Expires: 0`. The hosting's nginx micro-cache (~10 s) would otherwise serve the old content back to Next.js right after a save.

Writes use the core endpoints (`/wp/v2/althea-rooms`, `/wp/v2/settings`, `/wp/v2/media`, …) with an application password.

## Field storage

Text-like fields are stored as plain strings, and the Next.js data layer splits them:

- **paragraphs**: paragraphs separated by an empty line
- **lines**: one item per line (navigation: `Label | /path`)
- **html / paragraphs / blocks**: may contain `<em>`, `<strong>`, `<br>` and `<a href>`. Anything else is removed.
- **blocks** (article bodies, legal pages): `## Heading`; empty-line-separated paragraphs; `- item` lists; `Q: …` followed by `A: …`; `[cta] Label | /link`

## Testing changes locally

`wordpress/tests/` contains the integration test that was run against a throwaway local WordPress (PHP built-in server + SQLite). See [`tests/README.md`](tests/README.md).
