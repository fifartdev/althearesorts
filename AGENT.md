# Agent Guidelines — Althea Resorts

Companion to [CLAUDE.md](CLAUDE.md). Read CLAUDE.md first — this file adds agent-specific working rules on top of it.

---

## How to approach work on this project

### Client communication style
All copy is written in a precise, understated luxury voice — no exclamation points in body text (only where the client explicitly requests, e.g. "The rest is up to you!"), no marketing filler phrases, no emoji. Content decisions visible to guests must not be changed without client instruction.

### Text corrections
When the client provides Greek-language corrections to English copy, translate the instruction carefully:
- "παύλες" = em-dashes (—) — they prefer commas or no punctuation
- "τελίτσες" = dots/periods — doubling means two dots (`..`), not an ellipsis (`…`)
- "φάει μια πρόταση" = a sentence was dropped/missing — restore it
- "κόμμα" = comma — add it in the specified position

### Image rules
- Never change a working image URL without a clear client instruction or a broken-image report
- When searching Unsplash for a replacement image, always verify the CDN URL via WebFetch on the Unsplash photo page before writing it to code — new alphanumeric IDs need confirmation
- Client-supplied images (e.g. `/images/oceanisphoto.jpg`) take priority over any stock photo in the same context
- Accommodation hero must use an actual room photo from the project's `/public/images/` folder, not a generic stock image
- Each room in `ROOMS` (constants.ts) has both `image` (single hero) and `images: string[]` (photo gallery shown on the room detail page). When adding new client room photos, append to `images[]` — do not overwrite `image` unless explicitly instructed
- Gastronomy venue photos must NOT look like identifiable hotels or resorts — use close-ups, atmospheric mood shots, or abstract poolside/food/drink images. Current verified CDN IDs: BAR → `photo-1674654658721-ffc9c08ee1d0`, Pool Bar → `photo-1532347922424-c652d9b7208e`
- Spa page: `/images/oceanisphoto.jpg` goes in "The Space" intro section (right column). The "Oceanis Philosophy" section uses `photo-1608571423902-eed4a5ad8108` to avoid duplicating the same image on the same page. Do not swap these.

### Hero backgrounds
- Interior pages with a full-bleed image hero: dark gradient overlay on top of the photo — do not add a solid bg color
- Text-only hero sections: Location = `bg-[#35657a]`, About = `bg-[#35657a]`, all others = `bg-[#102027]` (unless client instructs otherwise)
- This applies to BOTH the English and Greek versions of every page

### Social links
Correct URLs (confirmed by client):
- Instagram: `https://www.instagram.com/althearesorts`
- Facebook: `https://www.facebook.com/profile.php?id=61589365637032`
- LinkedIn: `https://www.linkedin.com/company/althearesorts`

These appear in three places: Header (SVG icons, desktop), Footer copyright bar (SVG icons), mobile menu footer (text abbreviations). Keep all three in sync when updating.

---

## Greek locale — working rules

### File structure
Greek pages live at `src/app/(frontend-el)/el/<page>/page.tsx`. The route group uses its own `layout.tsx` which sets `lang="el"` and passes `locale="el"` to Footer, StickyBookingBar, and CookieConsent.

When adding a new page to the site, create **both** the English version under `(frontend)/` and the Greek version under `(frontend-el)/el/`.

### Greek strings — apostrophe rule
Greek text often contains the elision apostrophe (e.g. `απ'`, `στ'`, `κι'`). This character is U+2019 (right single quotation mark) but in practice files use U+0027 (plain apostrophe), which **breaks single-quoted JS strings**.

**Always use template literals for any Greek string that contains an apostrophe:**
```ts
// WRONG — Turbopack parse error
title: 'Πιο Κοντά απ' όσο Νομίζετε',

// CORRECT
title: `Πιο Κοντά απ' όσο Νομίζετε`,
```

This is a build-time error, not a runtime warning. Check the `el/journal/page.tsx` history for the exact failure mode.

### Long Greek words — overflow
All `.text-display-*` classes already have `overflow-wrap: break-word` in globals.css (added 2026-06-24). Do not add it manually to individual elements — it is inherited. If a new display class is ever added to globals.css, include `overflow-wrap: break-word` in it.

### Language switcher
The Header auto-detects locale from `pathname.startsWith('/el')` and builds `switchHref` to toggle between EN and EL. The switcher appears:
- Desktop: text link (`EN` / `ΕΛ`) left of Book Now
- Mobile menu: bordered button next to Book Now button inside the scrollable nav area

When adding nav links to either locale, update **both** `NAV_LINKS` and `NAV_LINKS_EL` in `constants.ts`.

### CookieConsent
`CookieConsent.tsx` accepts a `locale` prop (`"en"` | `"el"`). It is already wired into both layout files. If the cookie text needs updating, edit `CookieConsent.tsx` directly — do not add a second instance.

---

## Analytics
Google Analytics 4 (`G-WYCXWW127J`) is live in **both** layout files:
- `src/app/(frontend)/layout.tsx`
- `src/app/(frontend-el)/el/layout.tsx`

Both use `next/script strategy="afterInteractive"`. The `GA_ID` constant is defined at the top of each layout file. Update both if the property ever changes. Do not add a second analytics script.

---

## Mobile menu — z-index rules

| Layer | Class | Reason |
|-------|-------|--------|
| Header bar (burger/close button) | `z-50` | Must always be on top |
| Mobile menu overlay | `z-45` | Above FloatingBookingButton, below header bar |
| FloatingBookingButton | `z-40` | Disappears behind overlay when menu opens |

**Do not** set the overlay to `z-50` — it will cover the header and hide the close button (same z-level, later in DOM wins). **Do not** drop it to `z-40` — the FloatingBookingButton will bleed through.

---

## What NOT to change without client approval

- `BOOKING_URL` in constants.ts — the booking engine URL
- Social media URLs above
- The Oceanis brand name, product descriptions, or sustainability claims
- Any copy in the hero `<h1>` or section headings
- GPS `COORDINATES` in constants.ts — client needs to verify against actual pin

---

## Common pitfalls

### Em-dashes in JSX
Em-dashes (U+2014) in `.tsx` files can fail string matching in the Edit tool. Use Python via Bash for replacements:
```bash
python3 -c "
with open('path/to/file.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('old — text', 'new text')
with open('path/to/file.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
"
```

### Tailwind canonical class warnings
The IDE suggests canonical aliases (`text-deep` for `text-[#102027]`, `bg-gold` for `bg-[#ad8b27]`, etc.). These are **warnings only** — the existing codebase uses hex values throughout. Do not refactor unless explicitly asked.

### Server/client split — FAQ and Gallery (resolved 2026-06-24)
Both Gallery and FAQ pages previously had `'use client'` on `page.tsx`, blocking metadata export. This is now fixed. The pattern:

- `page.tsx` — server component: `export const metadata`, JSON-LD schema injection, renders the client component
- `GalleryClient.tsx` / `FaqClient.tsx` — `'use client'`: all state and interactive logic
- `faqData.ts` — no directive: data-only file, safe to import from both server and client

**Never add `'use client'` to a `page.tsx`** — it permanently disables `export const metadata`. If a page needs both, apply this split pattern.

### Xylokastro sightseeing image
The `sights` array entry for Xylokastro has `objectPosition: 'center bottom'` to avoid showing only sky. The Image component applies it via inline `style`. Any future sight entries that need a custom crop should follow the same pattern.

### Custom cursor on mobile
The `CustomCursor` component correctly skips JS on touch devices, but the DOM elements are always rendered. Hiding is handled by `@media (hover: none) { .cursor, .cursor-follower { display: none } }` in globals.css. Do not remove this rule.

---

## Quick reference — file locations for common tasks

| Task | File |
|------|------|
| Change nav links (English) | `src/lib/constants.ts` → `NAV_LINKS` |
| Change nav links (Greek) | `src/lib/constants.ts` → `NAV_LINKS_EL` |
| Change booking URL | `src/lib/constants.ts` → `BOOKING_URL` |
| Change social URLs | `src/lib/constants.ts` → `SOCIAL` + Header.tsx + Footer.tsx |
| Add/edit a room | `src/lib/constants.ts` → `ROOMS` (primary `image` + `images[]` gallery) + `src/app/(frontend)/accommodation/` |
| Add room gallery photos | `src/lib/constants.ts` → `BATHROOM_IMAGES` / `DELUXE_DOUBLE_IMAGES` or room's `images[]` directly |
| Add a gallery image (EN) | `src/app/(frontend)/gallery/GalleryClient.tsx` → `galleryItems` array |
| Add a gallery image (EL) | `src/app/(frontend-el)/el/gallery/GalleryClient.tsx` → `galleryItems` array |
| Edit FAQ content (EN) | `src/app/(frontend)/faq/faqData.ts` → `FaqCategory[]` array |
| Edit FAQ content (EL) | `src/app/(frontend-el)/el/faq/faqData.ts` → Greek `FaqCategory[]` array |
| Edit privacy policy | `src/app/(frontend)/privacy-policy/page.tsx` |
| Edit terms | `src/app/(frontend)/terms/page.tsx` |
| Add a sightseeing card | `src/app/(frontend)/location/page.tsx` → `sights` array |
| Change contact info | `src/lib/constants.ts` → `PHONE`, `EMAIL`, `ADDRESS` |
| Change hero colors | Individual `page.tsx` hero section className |
| Edit footer layout | `src/components/layout/Footer.tsx` |
| Edit header / language switcher | `src/components/layout/Header.tsx` |
| Edit cookie banner | `src/components/layout/CookieConsent.tsx` |
| Edit mobile menu z-index | `src/components/layout/Header.tsx` overlay div (keep at `z-45`) |
| Edit display text overflow | `src/app/(frontend)/globals.css` → `.text-display-*` classes |
| Add sitemap route | `src/app/(frontend)/sitemap.ts` |
