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

**Fonts:** `--font-canela` (Canela/Cormorant Garamond, editorial serif) · `--font-sohne` (Söhne/DM Sans, UI sans)

**Section padding:** `.section-padding` → `clamp(5rem, 10vw, 10rem)` top/bottom
**Container:** `.container-luxury` → max-width 1600px, `clamp(1.5rem, 5vw, 6rem)` inline padding

---

## Pages built

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

---

## Key files

```
src/lib/constants.ts        — ROOMS[], NAV_LINKS, BOOKING_URL, PHONE, EMAIL, ADDRESS, COORDINATES, SITE_URL, SOCIAL
src/lib/seo.ts              — generateMetadata(), hotelSchema, organizationSchema
src/app/(frontend)/
  layout.tsx                — fonts, JSON-LD schemas injected, skip-to-content
  globals.css               — Tailwind v4 design system, all custom classes in @layer
  robots.ts                 — crawl rules including AI bot blocklist
  sitemap.ts                — all static routes + dynamic room slugs
src/components/
  layout/Header.tsx         — fixed, always dark #102027/95, white logo image
  layout/Footer.tsx         — dark background, white logo image
  layout/BookingCTA.tsx     — StickyBookingBar + FloatingBookingButton
  animations/ScrollReveal.tsx
  animations/CustomCursor.tsx
  sections/Hero.tsx         — homepage hero with GSAP timeline
  sections/DirectBookingReasons.tsx — 'use client' accordion
  sections/FinalBookingCTA.tsx
  ui/RoomCard.tsx, SectionLabel.tsx, GoldLine.tsx, StatBar.tsx
```

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
- Homepage hero: `Althea-Pool-Infinity-Color.jpg` (2025/11 path)
- Room images: defined in `ROOMS` array in constants.ts

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

**sitemap.ts** — add every new static route. Dynamic routes (future journal slugs, future room types) must be fetched from Payload and mapped at build time.

---

## Missing before launch (client action required)

1. **OG image** — create `/public/og-default.jpg` at 1200×630px (logo + hero image). Referenced everywhere, file does not exist.
2. **Favicon** — `/public/favicon.ico` (32×32), `/public/icon.png` (512×512), `/public/apple-touch-icon.png` (180×180)
3. **Google Tag Manager** — get GTM container ID → add one script to layout.tsx
4. **Meta Pixel** — get Pixel ID → add via GTM, add Facebook domain verification meta tag
5. **Google Search Console** — verify domain, submit sitemap
6. **Font files** — Canela (commercialtype.com) + Söhne (klim.co.nz) → place in `/public/fonts/`
7. **Correct GPS coordinates** — verify `COORDINATES` in constants.ts against actual Google Maps pin

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

**Localization:** Payload CMS already configured for `en`, `el`, `fr`. Next.js locale routing not yet built — ready to add when needed.

---

## Gallery page known issue

`gallery/page.tsx` is a `'use client'` component and cannot export `metadata` in Next.js App Router. Its SEO metadata is invisible to Google. Fix: split into a server `page.tsx` that exports metadata and a `GalleryClient.tsx` for the filter state.
