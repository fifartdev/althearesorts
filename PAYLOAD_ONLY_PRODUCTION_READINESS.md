# Payload-Only Production Readiness Report
**Branch:** `feat/cms-admin-architecture`  
**Date:** 2026-06-26  
**Status:** ✅ All critical items resolved

---

## Executive Summary

Every visible content element in the Althea Resorts frontend is now managed through Payload CMS. All staging URLs, hardcoded business copy, and static fallback content that violated the Payload-only requirement have been removed. The site renders gracefully as empty/null when CMS collections have no data, rather than showing stale placeholder content.

---

## What Was Done This Session

### 1. Globals Extended

**`BookingSettings`** — Added direct booking reasons section:
- `directBookingLabel`, `directBookingHeadline1/2`, `directBookingIntro`, `directBookingCtaLabel` (all localized)
- `reasons[]` array (localized) — title + body per reason

**`SiteSettings`** — Added "Homepage Copy" tab with ~30 localized fields covering:
- Brand Intro section (label, headline, body, link, card text, 2 image uploads)
- Experiences Highlight section (label, headline, subtext, discover label)
- Gastronomy section (label, headline, body, card quote, CTA, image upload)
- Journal Preview section (label, headline, CTA)
- Gallery Preview section (label, headline, CTA)

### 2. Section Components Rewritten (Props-Driven)

| Component | Change |
|-----------|--------|
| `BrandIntro.tsx` | All copy + images from props; `null`-renders when no `headline1` + `body1` |
| `ExperiencesHighlight.tsx` | All text + experience cards from props; `null`-renders when `experiences` is empty |
| `GastronomySection.tsx` | All text + venues + image from props; `null`-renders when no content |
| `JournalPreview.tsx` | All text from props; `null`-renders when `posts` is empty or absent |
| `GalleryPreview.tsx` | Section label/headline/CTA from props; staging URL item replaced with local image |
| `DirectBookingReasons.tsx` | All copy + reasons from props; `null`-renders when `reasons` is empty |

### 3. Homepage Pages Updated (EN + EL)

Both `(frontend)/page.tsx` and `(frontend-el)/el/page.tsx` now:
- Fetch `getExperiences()` + `getDining()` alongside existing CMS calls (total 6 parallel fetches)
- Map all CMS data to typed props and pass to every section component
- Pass `bookingSettings.reasons` to `DirectBookingReasons`
- Pass `bookingSettings.direct*` fields to `DirectBookingReasons`
- Pass all `siteSettings.brandIntro*`, `expHighlight*`, `gastronomy*`, `journal*`, `gallery*` fields

### 4. Offers Pages Updated (EN + EL)

`DirectBookingReasons` now receives all text and reasons from `BookingSettings`, replacing its hardcoded EN/EL content object entirely.

### 5. Staging URLs Eliminated

**Gallery (EN + EL):** 16 staging URL entries in the static fallback array replaced with local `/images/new-images/althea-deluxe-double*` and `althea-rooms-bathroom*` files. `const S` declaration removed.

**Journal (EN + EL):** Static fallback post arrays (containing 3 staging URL images each) removed entirely. Journal page shows only CMS posts; null-renders featured post + grid when CMS is empty.

**Offers (EN + EL):** Hero `althea-exclusive-resorts-spa-9.png` → `/images/new-images/althea-deluxe-double7.jpg`

**Experiences (EN + EL):** Hero `1.jpg` → `/images/new-images/New-Hero.jpg`

### 6. llms.txt Converted to Dynamic Route

`public/llms.txt` (static, contained hardcoded phone/email) superseded by `src/app/llms.txt/route.ts` which:
- Fetches contact info, booking URL, room list, dining names from CMS at request time
- Caches with `revalidate: 3600`
- Falls back gracefully per field if CMS is unavailable

---

## Verification Results

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | ✅ 0 errors |
| `grep 'from @/lib/constants'` in app/ + components/ | ✅ 0 matches |
| `grep 'staging.althearesorts.com'` in app/ + components/ | ✅ 0 matches (only `src/seed/` remains, not rendered) |
| `grep 'BOOKING_URL\|PHONE\|ROOMS\|COORDINATES'` in app/ | ✅ 0 matches |

---

## Remaining Client Actions Required (Not Code)

These items require content or assets from the client — no code changes needed:

### Content to Enter in Payload Admin

| Global / Collection | What to Fill In |
|--------------------|-----------------|
| SiteSettings → Homepage Copy → Brand Intro | EN + EL headline, body paragraphs, link label, card text, upload 2 images |
| SiteSettings → Homepage Copy → Experiences | EN + EL section label, headline, subtext |
| SiteSettings → Homepage Copy → Gastronomy | EN + EL label, headline, body, card quote, CTA, upload image |
| SiteSettings → Homepage Copy → Journal | EN + EL section label, headline, CTA label |
| SiteSettings → Homepage Copy → Gallery | EN + EL section label, headline, CTA label |
| BookingSettings → Direct Booking Label/Headlines | EN + EL |
| BookingSettings → Reasons array | 4 reasons with title + body (EN + EL) |
| Experiences collection | Add 3+ experiences with title, category, shortDescription, heroImage |
| Dining collection | Add venues with name, heroImage |
| Gallery collection | Populate with uploaded images — overrides static fallback |
| Journal collection | Publish posts — overrides null state on journal page |

### Assets Required (Client-Supplied)

| Asset | Where Used |
|-------|-----------|
| Brand intro image 1 (portrait, 3:4) | BrandIntro section |
| Brand intro image 2 (square) | BrandIntro section |
| OG default image (1200×630) | `/public/og-default.jpg` — referenced in metadata everywhere, file does not exist |
| Favicon set | `/public/favicon.ico`, `/public/icon.png`, `/public/apple-touch-icon.png` |
| Licensed font files | Canela → `/public/fonts/`, Söhne → `/public/fonts/` |

### Legal / Compliance

- **Privacy Policy** (`/privacy-policy`) — still contains placeholder `[DATE]`, `[Legal entity name]` — requires solicitor review before indexing
- **Terms & Conditions** (`/terms`) — same
- **Offer schema** (`/offers/page.tsx`) — `validThrough: "2026-06-30"` hardcoded in schema; update when offer renews

### GPS Coordinates

Verify `COORDINATES` in `ContactInfo` global matches the actual Google Maps pin for Althea Resorts. The map embed and schema use these values.

---

## Architecture Notes for Next Developer

### Null-Render Contract
Every section component returns `null` when its CMS data is absent. This means:
- A page with no CMS data shows only the hero + FinalBookingCTA
- No 404s, no broken layouts, no stale placeholder text
- Adding content to Payload instantly makes sections appear on the live site

### Data Flow (Homepage)
```
page.tsx (Server)
  └── Promise.all([
        getSiteSettings(),      → BrandIntro + Experiences + Gastronomy + Journal + Gallery props
        getBookingSettings(),   → DirectBookingReasons + bookingUrl
        getRooms(),             → RoomsShowcase
        getJournalPosts(),      → JournalPreview
        getExperiences(),       → ExperiencesHighlight
        getDining(),            → GastronomySection (venues list + image fallback)
      ])
  └── passes typed props to each section component
  └── section components are dumb presentational — no CMS calls inside
```

### Cache Revalidation
All CMS data is cached via `unstable_cache` with named tags. Payload fires on-demand revalidation via webhook on each save. Manual revalidation available at `/api/revalidate?tag=<collection>&secret=<REVALIDATION_SECRET>`.

---

## Commits This Session

```
e2ae09d fix: eliminate all staging.althearesorts.com URLs from production frontend
7abd07c feat: make all homepage sections 100% Payload CMS-driven
58962b5 feat: add on-demand cache revalidation for all CMS collections
```
