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
- Gastronomy venue photos must NOT look like identifiable hotels or resorts — use close-ups, atmospheric mood shots, or abstract poolside/food/drink images. Current verified CDN IDs: BAR → `photo-1674654658721-ffc9c08ee1d0`, Pool Bar → `photo-1532347922424-c652d9b7208e`
- Spa page: `/images/oceanisphoto.jpg` goes in "The Space" intro section (right column). The "Oceanis Philosophy" section uses `photo-1608571423902-eed4a5ad8108` to avoid duplicating the same image on the same page. Do not swap these.

### Hero backgrounds
- Interior pages with a full-bleed image hero: dark gradient overlay on top of the photo — do not add a solid bg color
- Text-only hero sections: Location = `bg-[#35657a]`, About = `bg-[#35657a]`, all others = `bg-[#102027]` (unless client instructs otherwise)

### Social links
Correct URLs (confirmed by client):
- Instagram: `https://www.instagram.com/althearesorts`
- Facebook: `https://www.facebook.com/profile.php?id=61589365637032`
- LinkedIn: `https://www.linkedin.com/company/althearesorts`

These appear in three places: Header (SVG icons, desktop), Footer copyright bar (SVG icons), mobile menu (text abbreviations). Keep all three in sync when updating.

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
The IDE suggests canonical aliases (`text-deep` for `text-[#102027]`, etc.). These are **warnings only** — the existing codebase uses hex values throughout. Do not refactor unless explicitly asked.

### `gallery/page.tsx` — no metadata export
This file is `'use client'` and cannot export `metadata`. SEO for gallery is currently missing. Known issue — do not attempt to add `export const metadata` to this file; it will break the build.

### Xylokastro sightseeing image
The `sights` array entry for Xylokastro has `objectPosition: 'center bottom'` to avoid showing only sky. The Image component applies it via inline `style`. Any future sight entries that need a custom crop should follow the same pattern.

---

## Quick reference — file locations for common tasks

| Task | File |
|------|------|
| Change nav links | `src/lib/constants.ts` → `NAV_LINKS` |
| Change booking URL | `src/lib/constants.ts` → `BOOKING_URL` |
| Change social URLs | `src/lib/constants.ts` → `SOCIAL` + Header.tsx + Footer.tsx |
| Add/edit a room | `src/lib/constants.ts` → `ROOMS` + `src/app/(frontend)/accommodation/` |
| Add a gallery image | `src/app/(frontend)/gallery/page.tsx` → `galleryItems` array |
| Add a sightseeing card | `src/app/(frontend)/location/page.tsx` → `sights` array |
| Change contact info | `src/lib/constants.ts` → `PHONE`, `EMAIL`, `ADDRESS` |
| Change hero colors | Individual `page.tsx` hero section className |
| Edit footer layout | `src/components/layout/Footer.tsx` |
| Edit header layout | `src/components/layout/Header.tsx` |
