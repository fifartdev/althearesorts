# CMS Migration Plan: hardcoded content → headless WordPress

Status: **Phase 1 (audit and proposal). Waiting for review.** No application code has been changed.
Branch: `feature/wordpress-cms`

---

## 0. Decisions needed before Phase 2

These change the content model, so they come first. Details are in the sections below.

| # | Question | My recommendation |
|---|----------|-------------------|
| D1 | **Payload is already in this repo.** `src/payload.config.ts` defines 13 collections and 6 globals (Rooms, Dining, FAQs, Gallery, Journal, Offers, Testimonials, ContactInfo, Header, Footer, SEOSettings…), and `CLAUDE.md` describes Payload as the planned CMS. No frontend page reads from Payload today. Is WordPress replacing Payload? | If yes: leave Payload untouched during the migration and remove it in a separate PR after WP is live, so this branch only changes the data source. |
| D2 | **How to store EN/EL.** WordPress has no built-in multilingual support. | **Paired fields** (`title_en` / `title_el`, etc.) on one entry for structured items. **One post per language** for blog posts, because the EN and EL post sets differ. Details in §3.1. |
| D3 | **How editors edit page section copy** (hero, intros, section headings for about 20 page templates). | **ACF (free) for page-section fields**, mu-plugin for CPTs and list items. This is the one place ACF clearly helps. See §4. |
| D4 | **Unsplash and third-party images.** 15 Unsplash photos and 2 images hotlinked from `enjoycorinthia.gr`. | Upload the Unsplash photos to WP Media (the Unsplash licence allows this). **Do not upload the enjoycorinthia.gr images**: they are probably not licensed. Keep them as external URLs until the client replaces them. |
| D5 | **Fix existing content inconsistencies during migration, or reproduce them exactly?** (see §1.9) | Reproduce exactly on this branch, since you asked for "looks and behaves exactly the same". List the fixes for a follow-up. |
| D6 | **What stays in code.** | Layout and styling values (Tailwind classes, `span`/`wide`/`bg`), JSON-LD schema *structure*, GA ID, robots policy, logos, favicons, OG default image, fonts. |

---

## 1. Audit: hardcoded content inventory

Scope: 15 EN routes, 13 EL routes plus `/el/journal/[slug]`, the shared layout, and 11 homepage sections. All content is inline TypeScript. The usual pattern is a `const content = { en: {...}, el: {...} }` object at the top of each component, or prose written directly in JSX.

### 1.1 Global / site settings — `src/lib/constants.ts`
| Item | Value / location | Notes |
|---|---|---|
| `SITE_NAME`, `SITE_TAGLINE`, `SITE_URL` | constants.ts | `SITE_URL` stays in code/env |
| `BOOKING_URL` | `https://althearesort.reserve-online.net` | Client approval is needed to change it. Make it a read-only setting, or keep it in code |
| `PHONE`, `PHONE_MOBILE`, `EMAIL`, `INFO_EMAIL`, `ADDRESS` | constants.ts | |
| `COORDINATES`, `GOOGLE_MAPS_CID_URL` | constants.ts | |
| `SOCIAL` (instagram, facebook, linkedin) | constants.ts **and duplicated as literals** in `Footer.tsx:133-145` | |
| `NAV_LINKS` / `NAV_LINKS_EL` | 10 items each | |
| `generateMetadata()` default description | `src/lib/seo.ts:23` | |
| `hotelSchema`, `organizationSchema` | `src/lib/seo.ts` | Structure stays in code; values come from settings |

### 1.2 Layout chrome (EN + EL strings inline)
- **Header.tsx**: nav labels (from constants), "Book Now", language switcher labels, social icons.
- **Footer.tsx**: column headings (Explore / Stay), "Book Now →", "View on Google Maps", Privacy / Terms labels, copyright, white logo.
- **BookingCTA.tsx**: sticky-bar tagline, CTA label, aria labels.
- **CookieConsent.tsx**: heading, body, Accept and Reject labels.
- **Layouts** (`(frontend)/layout.tsx`, `el/layout.tsx`): skip-link text, GA ID, icons. All of these stay in code.

### 1.3 Homepage sections (`src/components/sections/`, all EN + EL)
| Section | Content |
|---|---|
| Hero | location label, 2-line headline, tagline, 2 CTAs, 3 stats, hero image |
| BrandIntro | label, headline, 2 paragraphs, link, "Althos" card (label, quote, sub), 2 images |
| RoomsShowcase | label, headline, body, CTA; room cards come from `ROOMS`, and the EL version uses its **own** copy of the Greek room text (`greekRoomData`, 3 rooms) |
| ExperiencesHighlight | label, headline, subtext, 3 experience cards (label, title, desc, href, image, alt) |
| GastronomySection | label, headline, 2 paragraphs, card quote, 4 venue names, CTA, 1 image (Unsplash) |
| GalleryPreview | 5 tiles (label EN/EL, image, grid span), heading, CTAs |
| TestimonialsSection | 3 testimonials per locale (quote, name, origin, stay), heading |
| LocationSection | label, headline, 2 paragraphs, 2 facts, CTA, image |
| JournalPreview | 3 post cards per locale, **duplicated by hand** from the journal data (not read from `JOURNAL_POSTS`) |
| DirectBookingReasons | label, headline, body, CTA, 4 reasons (title, body). Also used on `/offers` |
| FinalBookingCTA | eyebrow, headline, body, 2 CTAs. Used on most pages |

### 1.4 Repeated items (candidates for Custom Post Types)
| Content | Count | Source | Fields |
|---|---|---|---|
| **Rooms** | 6 | `ROOMS` in constants.ts + `greekRoomData` in **3 separate files** (EL list page, EL detail page, RoomsShowcase) | slug, title, tagline, size, shortDesc, features[], view, hero image, gallery images[], featured |
| **Blog posts** | 11 EN (5 full articles, 6 stubs) and 6 EL (all stubs) | `journal/journalData.ts`, `el/journal/journalData.ts` | slug, category, title, excerpt, readTime, date, image, imageAlt, image2, image2Alt, seoTitle, seoDescription, seoKeywords[], sections[] {heading, paragraphs[], bullets[], faqs[], cta} |
| **FAQs** | 14 per locale in 5 categories | `faqData.ts` × 2 | category, question, answer |
| **Gallery items** | 85 per locale in 7 categories | `GalleryClient.tsx` × 2 | src, caption, category, wide |
| **Testimonials** | 3 per locale | TestimonialsSection.tsx | quote, name, origin, stay |
| **Dining venues** | 4 (+ AITHER section) | gastronomy/page.tsx × 2 | id, label, title, desc, image, alt, `bg` (styling, stays in code) |
| **Spa facilities** | 8 | spa/page.tsx × 2 | name, desc |
| **Spa cabins** | 2 | spa/page.tsx × 2 | title, desc, image, alt |
| **Sights (location)** | 7 | location/page.tsx × 2 | name, distance, desc, category, image, objectPosition |
| **Direct booking reasons** | 4 | DirectBookingReasons.tsx | title, body |
| **Offers** | 1 active (Stay 3, Pay 2) | offers/page.tsx × 2 | title, description, booking URL with `offerid`, dates |

### 1.5 Page-level prose written directly in JSX
These pages have no data structure, only text inside markup. Each one needs a fixed section schema.

| Page | Sections (EN; EL mirrors them) | `<p>` count (EN) |
|---|---|---|
| `/about` | hero, intro, Who We Are, Where We Are, What We Stand For | 14 |
| `/experiences` | hero, Activities, Spa teaser + Oceanis box, Swimming Pool, Events intro, Corporate Events (facilities, room configurations, equipment lists), Weddings | 26 |
| `/spa` | hero, The Space, facilities, cabins, Oceanis philosophy, spa menu image | 12 |
| `/gastronomy` | hero, AITHER section, venues (data) | — |
| `/location` | hero, intro, sights (data), getting here | 7 |
| `/offers` | hero, active offer block, DirectBookingReasons | 2 |
| `/contact` | hero, Get in Touch block, form labels (ContactForm.tsx), map | — |
| `/journal` | hero/intro | — |
| `/privacy-policy`, `/terms` | long-form legal text, **EN only** | 17 / 22 |

### 1.6 SEO metadata
Every page has a static `genMeta({ title, description, keywords, canonical })` call: 15 EN and 13 EL. Dynamic routes build their metadata from room and post data. JSON-LD blocks: `Restaurant` (gastronomy), `HealthAndBeautyBusiness` (spa, with 3 treatment names), `Offer` (offers), `FAQPage` (built from faqData), `HotelRoom` (built from ROOMS). `public/llms.txt` is a hand-written site summary.

### 1.7 Images
- **129 files** in `public/images` and `public/oldimages` (36 MB). **116 unique local paths are referenced** from code. All of them exist. 16 files are not referenced anywhere.
- **15 Unsplash URLs** and **2 hotlinked enjoycorinthia.gr images** (location page, Acrocorinth / Ancient Corinth).
- `public/logos/*`, `favicon.ico`, `og-default.jpg`, `src/app/icon.png`, `apple-icon.png`: app assets. **Recommend keeping these in `/public`.**
- Spa menu: `/images/spa/spa-menu.jpg` (lightbox and download).
- Several file names contain spaces (`/images/superior%20sea%20view.jpg`, `Junior%20suite%20.jpg`). The migration script must decode these before uploading.

### 1.8 Things that read content and must switch to WP
- `src/app/sitemap.ts` reads `ROOMS`. **It does not list journal posts** (`/journal/*`), so the "38 URLs" in CLAUDE.md excludes the blog.
- `generateStaticParams` in both `[slug]` route pairs.
- The FAQ `page.tsx` files build the FAQPage schema from `faqData`.

### 1.9 Existing inconsistencies found during the audit
These are preserved as-is unless you choose otherwise in D5.
1. **`/el/accommodation/junior-suite-private-pool` shows English text.** The EL detail page keys its data as `'junior-suite'`, not `'junior-suite-private-pool'`, so the lookup misses and the page falls back to English.
2. **The Greek room text exists in three different versions**: the EL list page, the EL detail page, and RoomsShowcase. The descriptions and feature lists differ between the EL list page and the EL detail page. One room needs one Greek description.
3. JournalPreview duplicates post titles and excerpts. The EN preview title for the August post differs slightly from the post's own title.
4. The Footer hardcodes social URLs instead of using `SOCIAL`.
5. Offer and blog CTAs hardcode booking URLs with fixed `checkin` dates and `offerid`s (`offerid=59803`, `59715`).
6. Privacy and Terms have no EL version, and the EL footer links to the EN pages.

---

## 2. Content model proposal

### 2.1 Global settings (one options record, exposed over REST)
**`althea_settings`** (one settings group; single REST endpoint `GET /althea/v1/settings`)
- Identity: `site_name`, `site_tagline_{en,el}`, `default_meta_description_{en,el}`
- Contact: `phone`, `phone_mobile`, `email_reservations`, `email_info`, `address_{en,el}`, `lat`, `lng`, `google_maps_url`
- Booking: `booking_url` (client approval required to change, see §1.1), `booking_tagline_{en,el}`, `book_now_label_{en,el}`
- Social: `instagram_url`, `facebook_url`, `linkedin_url` (plus optional `x_url`, `youtube_url`)
- Navigation: `nav_{en,el}`: an ordered list of {label, href}. In WP this can be a **native WP Menu** per locale (`primary-en`, `primary-el`), exposed through a small REST route.
- Footer: column headings, privacy/terms labels, copyright text, `{en,el}`
- Cookie banner: heading, body, accept, reject, `{en,el}`
- Schema extras: price range, cuisines, check-in/out times, amenities list

### 2.2 Custom Post Types
| CPT | Slug strategy | Fields (`_en`/`_el` = paired) | Images |
|---|---|---|---|
| `althea_room` | `post_name` = existing slug | `tagline`, `short_desc`, `view`, `features[]` (one per line), all `_en/_el`; `size`, `sort_order`, `featured` | featured image = hero; `gallery_ids[]` |
| `althea_post` (blog) | **one post per language**; `post_name` = slug; `locale` meta (`en`/`el`); `translation_key` to link EN↔EL | `category`, `excerpt`, `read_time`, `display_date`, `seo_title`, `seo_description`, `seo_keywords[]`, `sections` (JSON, see note) | featured image; `image2_id` |
| `althea_faq` | auto | `category_{en,el}`, `question_{en,el}`, `answer_{en,el}`, `sort_order` | — |
| `althea_gallery_item` | auto | `caption_{en,el}`, `category` (taxonomy `althea_gallery_cat` with EN/EL term names), `wide` (bool), `sort_order` | attachment |
| `althea_testimonial` | auto | `quote_{en,el}`, `name_{en,el}`, `origin_{en,el}`, `stay_{en,el}`, `sort_order` | — |
| `althea_venue` | `post_name` = `all-day`, `breakfast`, `bar`, `pool-bar` | `label`, `title`, `desc` (`_en/_el`), `sort_order` | featured image + alt |
| `althea_spa_item` | auto | `kind` (`facility`/`cabin`), `name_{en,el}`, `desc_{en,el}`, `sort_order` | featured image (cabins only) |
| `althea_sight` | auto | `name_{en,el}`, `distance_{en,el}`, `desc_{en,el}`, `category_{en,el}`, `object_position`, `external_image_url` (for D4), `sort_order` | featured image |
| `althea_offer` | `post_name` | `title`, `body`, `cta_label` (`_en/_el`), `booking_url`, `active` (bool), `valid_from`, `valid_to` | featured image |
| `althea_booking_reason` | auto | `title_{en,el}`, `body_{en,el}`, `sort_order` | — |

**Blog `sections` field**: the article body is structured (heading, paragraphs, bullets, an inline FAQ list, CTA), and the article template renders each part with specific classes. Converting it to Gutenberg HTML would change the markup. I recommend storing `sections` as a JSON array in post meta, validated by a REST schema. The editor UX for this is covered in §4.

### 2.3 Pages (WP `page`), one per template per locale, or paired fields
Each frontend route maps to one WP Page with a **fixed field group** that matches its sections, for example:
- `home`: hero {location_label, headline_1, headline_2, tagline, cta1, cta2, stats[3], image}, brand_intro {…}, rooms_showcase {…}, experiences_highlight {cards[3]}, gastronomy {…}, gallery_preview {tiles[5]}, location {…, facts[2]}, journal_preview {label, headline, cta}, final_cta {…}
- `about`, `experiences`, `spa`, `gastronomy`, `location`, `offers`, `contact`, `journal`, `faq`, `gallery`, `accommodation`: hero + named sections, each with label/headline/paragraphs[]/image
- `privacy-policy`, `terms`: `sections[]` {heading, paragraphs[]}, EN only
- Every page: `seo_title`, `seo_description`, `seo_keywords[]` (`_en/_el`)

Homepage JournalPreview cards would be **queried** (the latest 3 posts per locale) instead of duplicated. That would change which posts appear (D5), so this branch pins the current 3 posts with a `pinned_posts` relationship field.

---

## 3. Key design choices

### 3.1 Bilingual storage (D2)
| Option | Pros | Cons |
|---|---|---|
| **A. Paired meta fields (`_en`/`_el`)** | No plugin. One edit screen shows both languages. Slugs stay identical across locales, which matches the current routing (`/accommodation/x` ↔ `/el/accommodation/x`). Simple REST. | Core `title`/`content` are single-language (use them as the EN admin label only). Adding French (`/fr/`) later means a third set of fields. |
| B. Polylang / WPML | Standard multilingual workflow, per-language posts | Polylang's REST support for language filtering is limited in the free version (needs verification against the version you install). It adds a plugin dependency and duplicates media/meta per language. |
| C. One post per language + `locale` + `translation_key` meta | No plugin, independent content per language | Twice as many entries, and editors must keep them in sync |

**Recommendation:** use **A** for everything except blog posts, and **C** for blog posts, because the EN and EL post lists differ (5 EN-only articles today).

### 3.2 Registration: mu-plugin vs ACF (D3)
- **CPTs, taxonomies, scalar and list meta**: a mu-plugin (`wordpress/mu-plugins/althea-cms.php`) using `register_post_type`, `register_taxonomy`, and `register_post_meta(..., ['show_in_rest' => true, 'single' => true, 'type' => …, 'schema' => …])`. List fields (`features`, `gallery_ids`, `seo_keywords`) are typed `array` with an item schema. No dependencies.
- **The catch:** `register_meta` only exposes fields to REST. **It provides no edit UI.** Editors would see nothing in wp-admin unless we also build meta boxes or a Gutenberg sidebar panel for every field. With about 10 CPTs and about 15 page templates, many of them with nested and repeating groups (stats, cards, sections with paragraphs), that is a lot of custom admin UI code.
- **ACF (free version)** gives text, textarea, image, gallery, true/false, and group fields with a proper UI, and supports `show_in_rest`. Repeaters and Flexible Content need **ACF Pro**, which is a paid licence. Without Pro, repeating items are modelled as fixed groups (e.g. `stat_1`, `stat_2`, `stat_3`) or JSON.
- **Recommendation:** mu-plugin for CPTs, taxonomies, the REST routes (`/althea/v1/settings`, menus, revalidate hook) and the meta schema. **ACF field groups defined in PHP code** (`acf_add_local_field_group`, versioned in `wordpress/`) for the edit UI. If ACF Pro is available, use repeaters for lists (features, paragraphs, blog sections). If not, I'll build a small textarea-based UI for lists (one item per line) and a JSON editor box for blog sections.
- If you would rather avoid ACF entirely: I'll write compact generic meta boxes in the mu-plugin, roughly 300–500 lines of PHP. It works, but editing is plainer.

---

## 4. Next.js side (preview of Phase 4)

- `src/lib/wp/`: `client.ts` (fetch wrapper: Basic auth from server env only, timeout, typed errors, `next: { revalidate, tags }`), `types.ts`, and one module per content type (`rooms.ts`, `posts.ts`, `settings.ts`, …) that map WP REST shapes to the shapes the components already take (`Room`, `JournalPost`, `FaqCategory`, …). That way **component markup does not change**. Only the data source changes.
- **Fallback strategy:** during migration the current hardcoded data is moved into `src/lib/wp/fallback/` and used whenever WP is unreachable or returns an error, so builds never fail. In Phase 5 you decide whether to keep a last-known-good snapshot or remove it.
- Client components (Hero, Testimonials, DirectBookingReasons, FAQ, Gallery) receive content as **props** from their server parent. Credentials stay on the server.
- ISR: default `revalidate: 3600`, with tags per type (`wp:rooms`, `wp:posts`, `wp:settings`, …). `POST /api/revalidate` checks `REVALIDATE_SECRET` (constant-time comparison) and calls `revalidateTag`. The WP side uses a `save_post`/`updated_option` hook that POSTs `{type, slug}` with the secret.
- `next.config.ts`: add the WP media host to `images.remotePatterns`.
- Uses Next 16 APIs (`revalidateTag` / cache tags). I'll check the installed `next` docs in `node_modules/next/dist/docs/` before writing this code.

## 5. Migration script (preview of Phase 3)
`scripts/migrate-to-wp.ts` (run with `tsx`, which is already a dependency):
- Imports the current TS data modules directly, so content is not copied by hand.
- Media: decodes the path, hashes the file contents (SHA-1), and looks it up in `scripts/media-map.json` and then by `_althea_source_hash` meta in WP before uploading. Sets `alt_text` from the existing alt strings, or from the caption when there is none.
- Entries: upserts by `post_name` + type (blog: `post_name` + `locale`), with an `_althea_migrated` meta key. Re-running updates entries and never duplicates them.
- `--dry-run` prints a plan (create / update / skip per item) and makes no write calls.
- Prints a final report of created / updated / skipped / failed counts per type.

## 6. Environment variables
Existing: `WP_API_URL`, `WP_USERNAME`, `WP_APP_PASSWORD`, `NTFY_URL`, `NTFY_TOPIC`. New: `REVALIDATE_SECRET`, `WP_MEDIA_HOST` (or derive it from `WP_API_URL`).
`.env.local` is ignored by git (`.gitignore:32` `.env*.local`), which is confirmed. A `.env.example` **already exists** with Payload variables. I'll add the new names to it with no values.

## 7. Risks
- **Visual parity:** Greek strings with apostrophes, `whitespace-pre-line` newlines (`\n` in headlines), and `<br />`/`<em>` splits in headlines all have to survive a round trip through WP. That is why headlines are stored as `line_1`/`line_2` fields rather than rich text.
- **Build-time fetch:** `generateStaticParams` and `sitemap.ts` hit WP during the build. They need fallbacks, which are planned.
- **The ntfy hook (Phase 6)** edits `.claude/settings.json`, which already has uncommitted local changes. I'll show you the diff before touching it.
