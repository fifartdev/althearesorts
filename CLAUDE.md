# Claude Code — Althea Resorts

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

---

## Project overview

Luxury hotel website for **Althea Resorts** (althearesorts.com) — a 5-star boutique resort in Ano Loutro, Xylokastro, Corinthia, Greece. 41 rooms and suites, Ocean Spa, rooftop restaurant AITHER, conference facilities.

**Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 · GSAP · Payload CMS 3.x · PostgreSQL (NEON) · Vercel

**Booking engine:** https://althearesort.reserve-online.net (all CTAs point here — never change this URL without client approval)

---

## Critical technical constraints

### Tailwind v4 CSS layering
ALL custom classes MUST be inside `@layer components` or `@layer utilities` in `globals.css`. Unlayered CSS has higher specificity than Tailwind utilities and will override them silently. Use hard-coded `clamp()` values — never `var(--spacing-*)` references inside custom classes.

```css
/* CORRECT */
@layer components {
  .section-padding { padding-top: clamp(5rem, 10vw, 10rem); }
}
/* WRONG — breaks specificity */
.section-padding { padding-top: var(--spacing-section); }
```

### Turbopack (dev server)
- No styled-jsx
- No Google Fonts `@import` in CSS — fonts loaded via `next/font/google` in layout.tsx
- `@import "tailwindcss"` must be the very first line of globals.css

### Next.js Image
- Remote images need `remotePatterns` in `next.config.ts`
- Local images (e.g. `/logos/`) need `localPatterns` in `next.config.ts`
- Currently allowed: `**.althearesorts.com`, `althearesorts.com`, `images.unsplash.com`, `/logos/**`, `/images/**`, `/api/media/file/**`

---

## Design system

| Token | Value |
|-------|-------|
| Gold | `#ad8b27` |
| Deep (dark teal) | `#102027` |
| Cream | `#faf8f4` |
| Soft blue | `#f2f8fb` |
| Stone border | `#e8e4dd` |
| Smoke text | `#6b6b6b` |
| Hero blue (Location & About hero bg) | `#35657a` |

**Fonts:** `--font-canela` (Canela/Cormorant Garamond, editorial serif) · `--font-sohne` (Söhne/DM Sans, UI sans)

**Section padding:** `.section-padding` → `clamp(5rem, 10vw, 10rem)` top/bottom
**Container:** `.container-luxury` → max-width 1600px, `clamp(1.5rem, 5vw, 6rem)` inline padding

---

## Pages built

### English (`src/app/(frontend)/`)

| Route | File | Notes |
|-------|------|-------|
| `/` | `(frontend)/page.tsx` | Hero with GSAP animation |
| `/accommodation` | `accommodation/page.tsx` | OKU Hotels-style vertical list, alternating sections per room |
| `/accommodation/[slug]` | `accommodation/[slug]/page.tsx` | Individual room — uses ROOMS from constants |
| `/experiences` | `experiences/page.tsx` | Activities, Spa teaser, Pool, Conference, Weddings |
| `/spa` | `spa/page.tsx` | Dedicated Ocean Spa page — full facilities, 3 cabins, Oceanis philosophy |
| `/gastronomy` | `gastronomy/page.tsx` | 5 venues rendered from data array |
| `/gallery` | `gallery/page.tsx` | Client component with category filter + masonry grid — **cannot export metadata** (known issue) |
| `/about` | `about/page.tsx` | |
| `/location` | `location/page.tsx` | No map (map is on contact page) |
| `/offers` | `offers/page.tsx` | 10% direct booking offer + DirectBookingReasons accordion |
| `/contact` | `contact/page.tsx` | Contact form + Google Maps embed (grayscale) |
| `/journal` | `journal/page.tsx` | Static posts — will be CMS-driven |
| `/faq` | `faq/page.tsx` | Static FAQ — will be CMS-driven |

### Greek (`src/app/(frontend-el)/el/`)

All Greek pages mirror their English counterparts at `/el/*`. The route group `(frontend-el)` has its own `layout.tsx` with `lang="el"` on `<html>`, Greek skip-link text, `locale="el"` passed to Footer/StickyBookingBar/CookieConsent.

| Route | File |
|-------|------|
| `/el` | `el/page.tsx` |
| `/el/about` | `el/about/page.tsx` |
| `/el/accommodation` | `el/accommodation/page.tsx` |
| `/el/accommodation/[slug]` | `el/accommodation/[slug]/page.tsx` |
| `/el/experiences` | `el/experiences/page.tsx` |
| `/el/spa` | `el/spa/page.tsx` |
| `/el/gastronomy` | `el/gastronomy/page.tsx` |
| `/el/gallery` | `el/gallery/page.tsx` |
| `/el/location` | `el/location/page.tsx` |
| `/el/offers` | `el/offers/page.tsx` |
| `/el/contact` | `el/contact/page.tsx` |
| `/el/journal` | `el/journal/page.tsx` |
| `/el/faq` | `el/faq/page.tsx` |

---

## Key files

```
src/lib/constants.ts        — ROOMS[], NAV_LINKS, NAV_LINKS_EL, BOOKING_URL, PHONE, EMAIL, ADDRESS, COORDINATES, SITE_URL, SOCIAL
src/lib/seo.ts              — generateMetadata(), hotelSchema, organizationSchema
src/app/(frontend)/
  layout.tsx                — fonts, JSON-LD schemas, GA4, skip-to-content (English)
  globals.css               — Tailwind v4 design system, all custom classes in @layer
  robots.ts                 — crawl rules including AI bot blocklist
  sitemap.ts                — all static routes (EN + EL) + dynamic room slugs
src/app/(frontend-el)/
  el/layout.tsx             — same as frontend layout but lang="el", locale="el" props
src/components/
  layout/Header.tsx         — fixed, always dark; detects isGreek from pathname; switchHref toggles EN↔EL
  layout/Footer.tsx         — locale prop ("en"|"el"), dark background, white logo image
  layout/BookingCTA.tsx     — StickyBookingBar (locale prop) + FloatingBookingButton
  layout/CookieConsent.tsx  — cookie banner, locale prop ("en"|"el"), client component
  animations/ScrollReveal.tsx
  animations/CustomCursor.tsx — hidden on touch devices via @media (hover: none)
  sections/Hero.tsx         — homepage hero with GSAP timeline, locale-aware
  sections/DirectBookingReasons.tsx — 'use client' accordion
  sections/FinalBookingCTA.tsx
  ui/RoomCard.tsx, SectionLabel.tsx, GoldLine.tsx, StatBar.tsx
```

---

## Language switching

`Header.tsx` reads `pathname` to detect locale:
```ts
const isGreek = pathname.startsWith('/el')
const links = isGreek ? NAV_LINKS_EL : NAV_LINKS
const switchHref = isGreek
  ? (pathname === '/el' ? '/' : pathname.replace(/^\/el/, ''))
  : (pathname === '/' ? '/el' : `/el${pathname}`)
```

The language switcher (`EN` / `ΕΛ`) appears:
- **Desktop header** — text link left of the Book Now button
- **Mobile menu** — bordered button next to the Book Now button in the scrollable body (added 2026-06-24)

`NAV_LINKS_EL` is defined in `constants.ts` with `/el/` prefixes on all hrefs.

---

## Mobile menu — z-index stack

| Element | z-index | Notes |
|---------|---------|-------|
| Header bar (burger + close button) | `z-50` | Always on top |
| Mobile menu overlay | `z-45` | Above floating button, below header bar |
| FloatingBookingButton | `z-40` | Hidden behind overlay when menu is open |
| StickyBookingBar | `z-40` | Desktop only (`hidden lg:flex`) |

**Critical:** Do not change overlay to `z-50` — it would cover the close button. Do not drop it to `z-40` — the FloatingBookingButton would bleed through.

Mobile menu is `overflow-y-auto` with `pt-28 pb-6` to clear the header and allow scrolling all 9 nav items + Book/Language buttons on small screens.

---

## Logo

White logo only: `/public/logos/althea_logo_white-f.png`
Used in Header (always dark header, no filter needed) and Footer.
A dark logo variant does not exist yet — if a white-background context needs one, ask client or use CSS filter.

---

## Images

All content images are temporary placeholders — **will be replaced by Payload CMS media** once client approves content.

- Staging site images: `https://staging.althearesorts.com/wp-content/uploads/2026/02/` and `/2025/11/`
- Fallback: Unsplash URLs with `?auto=format&fit=crop&w=900&q=80`
- Homepage hero: `/images/new-images/althea-front.jpg` (client-supplied hotel entrance shot)
- Room images: defined in `ROOMS` array in constants.ts — each room has a primary `image` (hero) and an `images: string[]` gallery array
- Accommodation hero: `/images/superior%20sea%20view.jpg` (actual room photo, not stock)
- Oceanis product photo: `/public/images/oceanisphoto.jpg` — client-supplied. Used in: (1) Spa "The Space" intro section (replaces generic white pump-bottle Unsplash photo); (2) Gallery Spa & Wellness category. The Spa "Oceanis Philosophy" section uses a separate Unsplash image (`photo-1608571423902-eed4a5ad8108`) to avoid repeating the same photo on the same page.
- BAR venue photo: Unsplash `photo-1674654658721-ffc9c08ee1d0` — man in suit with martini
- Pool Bar venue photo: Unsplash `photo-1532347922424-c652d9b7208e` — woman sitting poolside feet in water (replaces palm-tree resort stock that looked like a different hotel)

### Room gallery images (`/public/images/new-images/`)
- `althea-deluxe-double1–16.jpg` — assigned to both Deluxe Double room types (`deluxe-double-mv-pv`, `deluxe-double-private-pool`)
- `althea-rooms-bathroom1–5.jpg` — assigned to ALL six room types
- Stored in `BATHROOM_IMAGES` and `DELUXE_DOUBLE_IMAGES` constants in `constants.ts`, spread into each room's `images[]`
- Room detail page (`accommodation/[slug]/page.tsx`) renders a **"Photo Gallery"** grid section when `room.images` is populated (between description and amenities sections)

### Homepage GalleryPreview (`components/sections/GalleryPreview.tsx`)
- Large left cell (Pool & Gulf Views): `/images/new-images/New-Hero.jpg`
- Top-right cell 2 (Ocean Spa label): `/images/oceanisphoto.jpg`
- Bottom-right cell 1 (Main Pool label): `/images/main-pool.jpg`
- Bottom-right cell 2 (Corinthian Coast label): `/images/new-images/althea-side-images2.jpg`

---

## SEO architecture

Every page uses `generateMetadata()` from `src/lib/seo.ts`. Required fields for every new page:

```ts
export const metadata = genMeta({
  title: 'Page Title',             // becomes "Page Title | Althea Resorts"
  description: '...',              // 120–160 chars
  keywords: ['term 1', 'term 2'],  // 3–6 terms
  canonical: `${SITE_URL}/path`,   // ALWAYS the page's own URL — never omit this
  // image: room.image,            // for pages with a distinct hero image
})

// For dynamic routes ([slug]):
export async function generateMetadata({ params }) {
  return genMeta({
    ...
    canonical: `${SITE_URL}/collection/${params.slug}`,
    image: doc.image,
  })
}
```

**robots.ts** — AI training bots blocked (GPTBot, ChatGPT-User, CCBot, anthropic-ai, Claude-Web). Social crawlers allowed (FacebookBot, Twitterbot).

**hotelSchema** — `LodgingBusiness` with correct coordinates from `COORDINATES`, check-in/out times, languages, amenities, nested Restaurant (AITHER) and HealthAndBeautyBusiness (Ocean Spa).

**sitemap.ts** — includes all static routes for both EN and EL locales + dynamic room slugs.

---

## Missing before launch (client action required)

1. **OG image** — create `/public/og-default.jpg` at 1200×630px (logo + hero image). Referenced everywhere, file does not exist.
2. **Favicon** — `/public/favicon.ico` (32×32), `/public/icon.png` (512×512), `/public/apple-touch-icon.png` (180×180)
3. **Google Analytics** — ✅ added. GA4 property `G-WYCXWW127J` wired via `next/script` `afterInteractive` in both `layout.tsx` files. Constant `GA_ID` defined at top of each file.
4. **Cookie consent** — ✅ `CookieConsent.tsx` added to both layouts (EN + EL). Appears on first visit, stores acceptance in `localStorage`.
5. **Meta Pixel** — get Pixel ID → add via GTM, add Facebook domain verification meta tag
6. **Google Search Console** — verify domain, submit sitemap
7. **Font files** — Canela (commercialtype.com) + Söhne (klim.co.nz) → place in `/public/fonts/`
8. **Correct GPS coordinates** — verify `COORDINATES` in constants.ts against actual Google Maps pin

---

## CMS migration (when Payload is connected)

All hardcoded content (text, images, metadata, contact details, room data) is intentionally placeholder. On CMS connection:

- Install `@payloadcms/plugin-seo` → adds meta fields to collections/globals, generates OG images
- `ROOMS` array → Rooms collection (already defined in Payload config)
- `hotelSchema` data → SiteSettings global
- `COORDINATES`, `PHONE`, `EMAIL`, `ADDRESS` → ContactInfo global
- Journal posts → Posts collection
- Sitemap dynamic routes → query Payload REST API at build time
- Hreflang (`en`/`el`/`fr`) → add back to `generateMetadata()` once locale routing is built

**Localization:** Greek (`/el/`) locale is fully built with static pages mirroring all EN routes. French (`/fr/`) not yet started. Payload CMS already configured for `en`, `el`, `fr`.

---

## Gallery page known issue

`gallery/page.tsx` AND `el/gallery/page.tsx` are both `'use client'` components and cannot export `metadata`. SEO for both gallery pages is currently invisible to Google. Fix: split each into a server `page.tsx` that exports metadata and a `GalleryClient.tsx` for the filter state.

---

## UI/Layout notes

### Header social icons
Desktop header shows compact SVG icons (Instagram · Facebook · LinkedIn) to the left of the Book Now button. Mobile menu retains text abbreviations (IG / FB). Icons use `text-white/40 hover:text-white`.

### Footer copyright bar
Three-column grid: left = © copyright text · center = Privacy Policy + Terms links · right = social icon links (SVG, gold on hover). Was previously one right-aligned block — centered legal links to improve social visibility.

### Hero backgrounds — Location & About pages
Both `/location` and `/about` (and their `/el/` counterparts) hero sections use `bg-[#35657a]` (lighter teal-blue) instead of the standard deep `#102027`. All other interior page heroes with an image overlay are unchanged.

### Xylokastro sightseeing card
The Xylokastro entry in the `sights` array has `objectPosition: 'center bottom'` to prevent the image cropping to sky-only. The Image component applies this via an inline `style` prop when `objectPosition` is present in the sight data.

### Gallery — Spa & Wellness category
The category exists in the filter UI but had zero items. The Oceanis product photo (`/images/oceanisphoto.jpg`) is now the first entry in this category.

### Gallery — client images added (2026-06-11)
Six client-supplied images added to `galleryItems` in `gallery/page.tsx`:
- `althea-front.jpg` → "Pool & Exterior" (wide, first item — hotel entrance)
- `New-Hero.jpg` → "Pool & Exterior" (the resort exterior)
- `althea-side-images1.jpg` → "Views" (wide)
- `althea-side-images2.jpg` → "Views"
- `althea-side-images3.jpg` → "Views"
- `althea-side-images4.jpg` → "Views"

### Custom cursor — mobile
`CustomCursor.tsx` checks `window.matchMedia('(hover: none)')` to skip JS on touch devices. Additionally, `.cursor` and `.cursor-follower` are hidden via `@media (hover: none) { display: none }` in globals.css — this prevents the elements from rendering at 0,0 on mobile even before JS runs.

### Display text overflow — Greek long words
All `.text-display-*` classes (`2xl`, `xl`, `lg`, `md`) have `overflow-wrap: break-word` set in globals.css. This prevents long Greek compound words (e.g. "Επαναπροσδιορίζοντας") from overflowing their container on narrow viewports.
