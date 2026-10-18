/**
 * Builds src/lib/wp/fallback/content.json from the content that is hardcoded in the site today.
 *
 * The output has the same shape as the WordPress read API (althea/v1), with images as
 * { url } pointing at the current local/remote files. It is:
 *   - the source for scripts/migrate-to-wp.ts (WordPress import)
 *   - the fallback the data layer serves when WordPress is unreachable
 *
 * Run: npx tsx scripts/content/build-content.ts
 * Existing inconsistencies are reproduced on purpose (docs/cms-migration-plan.md, D5).
 */
import fs from 'node:fs'
import path from 'node:path'
import { Source, Section, decodeEntities, escapeHtml } from './jsx'
import * as C from '../../src/lib/constants'
import { joinLines, joinParagraphs, serializeBlocks, sectionsToBlocks, type Block } from '../../src/lib/wp/text'
import { JOURNAL_POSTS } from '../../src/app/(frontend)/journal/journalData'
import { JOURNAL_POSTS_EL } from '../../src/app/(frontend-el)/el/journal/journalData'
import { faqs as FAQS_EN } from '../../src/app/(frontend)/faq/faqData'
import { faqs as FAQS_EL } from '../../src/app/(frontend-el)/el/faq/faqData'

const ROOT = path.resolve(import.meta.dirname, '../..')
const OUT = path.join(ROOT, 'src/lib/wp/fallback/content.json')

type L<T = string> = { en: T; el: T }
type Img = { url: string } | null

const L = <T>(en: T, el: T): L<T> => ({ en, el })
const img = (url: string | undefined | null): Img => (url ? { url } : null)
/** Plain text from extracted HTML (decodes entities, rejects markup). */
const t = (html: string | null | undefined): string => {
  if (html == null) return ''
  if (/<(?!br>)/.test(html)) throw new Error(`expected plain text: ${html}`)
  return decodeEntities(html.replace(/<br>/g, '\n'))
}
/** Two-line heading as rendered by the homepage components. */
const h2 = (l1: string, l2: string, em = true) => `${escapeHtml(l1)}<br>${em ? `<em>${escapeHtml(l2)}</em>` : escapeHtml(l2)}`
const resolve = { PHONE: C.PHONE, EMAIL: C.EMAIL, INFO_EMAIL: C.INFO_EMAIL, ADDRESS: C.ADDRESS, BOOKING_URL: C.BOOKING_URL, SITE_URL: C.SITE_URL }
const src = (file: string) => new Source(file, { ...C })
const en = (p: string) => src(`src/app/(frontend)/${p}`)
const el = (p: string) => src(`src/app/(frontend-el)/el/${p}`)
const comp = (p: string) => src(`src/components/${p}`)
const bySlug = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function expect(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`build-content: ${msg}`)
}

/** Section whose first SectionLabel is `label`. */
function sec(sections: Section[], label: string): Section {
  const s = sections.find((x) => x.labels[0] === label)
  expect(s, `no section labelled "${label}"`)
  return s
}
const ps = (s: Section) => s.ps(resolve)
const psWhere = (s: Section, test: (cls: string) => boolean) => s.flow(resolve).filter((f) => f.tag === 'p' && f.html !== null && test(f.cls)).map((f) => f.html!)
const firstImage = (s: Section) => s.images[0] ?? { src: undefined, alt: '' }
const seoOf = (enSrc: Source, elSrc: Source) => {
  const a = enSrc.metadata()
  const b = elSrc.metadata()
  return { title: L(a.title ?? '', b.title ?? ''), description: L(a.description ?? '', b.description ?? ''), keywords: L(joinLines(a.keywords ?? []), joinLines(b.keywords ?? [])) }
}
const seoEnOnly = (enSrc: Source) => {
  const a = enSrc.metadata()
  return { title: { en: a.title ?? '' }, description: { en: a.description ?? '' }, keywords: { en: joinLines(a.keywords ?? []) } }
}

/* ---------------------------------------------------------------------------------------------
 * Settings
 * ------------------------------------------------------------------------------------------- */

const seoTs = fs.readFileSync(path.join(ROOT, 'src/lib/seo.ts'), 'utf8')
const defaultDesc = /const defaultDesc = `([^`]+)`/.exec(seoTs)?.[1]
expect(defaultDesc, 'default meta description')

const settings = {
  site_name: C.SITE_NAME,
  site_tagline: L(C.SITE_TAGLINE, ''),
  default_meta_description: L(defaultDesc, ''),
  phone: C.PHONE,
  phone_mobile: C.PHONE_MOBILE,
  email_reservations: C.EMAIL,
  email_info: C.INFO_EMAIL,
  address: L(C.ADDRESS, 'Άνω Λουτρό, Ξυλόκαστρο, Κορινθία, Ελλάδα'),
  lat: String(C.COORDINATES.lat),
  lng: String(C.COORDINATES.lng),
  google_maps_url: C.GOOGLE_MAPS_CID_URL,
  booking_url: C.BOOKING_URL,
  instagram_url: C.SOCIAL.instagram,
  facebook_url: C.SOCIAL.facebook,
  linkedin_url: C.SOCIAL.linkedin,
  nav: L(joinLines(C.NAV_LINKS.map((l) => `${l.label} | ${l.href}`)), joinLines(C.NAV_LINKS_EL.map((l) => `${l.label} | ${l.href}`))),
}

/* ---------------------------------------------------------------------------------------------
 * Shared components
 * ------------------------------------------------------------------------------------------- */

const footer = comp('layout/Footer.tsx').const('footerContent')
const bar = comp('layout/BookingCTA.tsx').const('barContent')
const cookie = comp('layout/CookieConsent.tsx').const('content')
const finalCta = comp('sections/FinalBookingCTA.tsx')
const fc = finalCta.const('content')
const dbr = comp('sections/DirectBookingReasons.tsx').const('content')
const floating = comp('layout/BookingCTA.tsx')

const shared = {
  sections: {
    header: {
      book_label: L('Book Now', 'Κράτηση'),
      menu_location: L('Corinthia, Greece', 'Κορινθία, Ελλάδα'),
    },
    footer: {
      description: L(footer.en.desc, footer.el.desc),
      explore: L(footer.en.explore, footer.el.explore),
      stay: L(footer.en.stay, footer.el.stay),
      book_now: L(footer.en.bookNow, footer.el.bookNow),
      google_maps: L(footer.en.googleMaps, footer.el.googleMaps),
      copyright: L(footer.en.copyright('{year}'), footer.el.copyright('{year}')),
      privacy: L(footer.en.privacy, footer.el.privacy),
      terms: L(footer.en.terms, footer.el.terms),
    },
    booking_bar: {
      tagline: L(bar.en.tagline, bar.el.tagline),
      cta: L(bar.en.cta, bar.el.cta),
      // The floating mobile button has no Greek version today: it says "Book Now" on Greek pages too.
      floating_label: L(floating.textAt(86), floating.textAt(86)),
    },
    cookie: {
      heading: L(cookie.en.heading, cookie.el.heading),
      body: L(cookie.en.body, cookie.el.body),
      accept: L(cookie.en.accept, cookie.el.accept),
      reject: L(cookie.en.reject, cookie.el.reject),
    },
    final_cta: {
      eyebrow: L(fc.en.eyebrow, fc.el.eyebrow),
      heading: L(h2(fc.en.headlineLine1, fc.en.headlineLine2, false), h2(fc.el.headlineLine1, fc.el.headlineLine2, false)),
      body: L(fc.en.body, fc.el.body),
      cta1: L(fc.en.cta1, fc.el.cta1),
      cta2: L(fc.en.cta2, fc.el.cta2),
      watermark: finalCta.textAt(42),
    },
    direct_booking: {
      label: L(dbr.en.label, dbr.el.label),
      heading: L(h2(dbr.en.headlineLine1, dbr.en.headlineLine2), h2(dbr.el.headlineLine1, dbr.el.headlineLine2)),
      body: L(dbr.en.body, dbr.el.body),
      cta: L(dbr.en.cta, dbr.el.cta),
    },
    room_card: { discover: L('Discover', 'Ανακαλύψτε') },
  },
}
// These labels are ternaries in the components; check the typed values above still match the source.
expect(/const bookLabel = isGreek \? 'Κράτηση' : 'Book Now'/.test(fs.readFileSync(path.join(ROOT, 'src/components/layout/Header.tsx'), 'utf8')), 'Header book label')
expect(/\{isGreek \? 'Κορινθία, Ελλάδα' : 'Corinthia, Greece'\}/.test(fs.readFileSync(path.join(ROOT, 'src/components/layout/Header.tsx'), 'utf8')), 'Header menu location')
expect(/\{locale === 'el' \? 'Ανακαλύψτε' : 'Discover'\}/.test(fs.readFileSync(path.join(ROOT, 'src/components/ui/RoomCard.tsx'), 'utf8')), 'RoomCard discover')

/* ---------------------------------------------------------------------------------------------
 * Homepage
 * ------------------------------------------------------------------------------------------- */

const heroSrc = comp('sections/Hero.tsx')
const hero = heroSrc.const('content')
const heroImg = heroSrc.elements('Image')[0]
const brandSrc = comp('sections/BrandIntro.tsx')
const brand = brandSrc.const('content')
const brandImgs = brandSrc.elements('Image')
const rooms = comp('sections/RoomsShowcase.tsx').const('content')
const xp = comp('sections/ExperiencesHighlight.tsx').const('content')
const gastroSrc = comp('sections/GastronomySection.tsx')
const gastro = gastroSrc.const('content')
const galSrc = comp('sections/GalleryPreview.tsx')
const gal = galSrc.const('content')
const galItems = galSrc.const('galleryItems')
const testiSrc = comp('sections/TestimonialsSection.tsx')
const testiSection = testiSrc.const('sectionContent')
const locSrc = comp('sections/LocationSection.tsx')
const loc = locSrc.const('content')
const jp = comp('sections/JournalPreview.tsx').const('content')
const homeSeoEn = en('page.tsx').metadata()
const homeSeoEl = el('page.tsx').metadata()

const home = {
  sections: {
    hero: {
      location_label: L(hero.en.locationLabel, hero.el.locationLabel),
      heading: L(`${escapeHtml(hero.en.headlineLine1)}<br><em>${escapeHtml(hero.en.headlineLine2)}</em>`, `${escapeHtml(hero.el.headlineLine1)}<br><em>${escapeHtml(hero.el.headlineLine2)}</em>`),
      tagline: L(hero.en.tagline, hero.el.tagline),
      cta1: L(hero.en.cta1, hero.el.cta1),
      cta2: L(hero.en.cta2, hero.el.cta2),
      scroll_label: L(hero.en.scrollLabel, hero.el.scrollLabel),
      stats: hero.en.stats.map((s: any, i: number) => ({ value: s.value, label: L(s.label, hero.el.stats[i].label) })),
      image: img(heroSrc.attr(heroImg, 'src')),
      image_alt: L(heroSrc.attr(heroImg, 'alt'), heroSrc.attr(heroImg, 'alt')),
    },
    brand_intro: {
      label: L(brand.en.label, brand.el.label),
      heading: L(h2(brand.en.headlineLine1, brand.en.headlineLine2), h2(brand.el.headlineLine1, brand.el.headlineLine2)),
      paragraphs: L(joinParagraphs([escapeHtml(brand.en.body1), escapeHtml(brand.en.body2)]), joinParagraphs([escapeHtml(brand.el.body1), escapeHtml(brand.el.body2)])),
      link_label: L(brand.en.linkLabel, brand.el.linkLabel),
      card_label: L(brand.en.cardLabel, brand.el.cardLabel),
      card_quote: L(h2(brand.en.cardQuoteLine1, brand.en.cardQuoteLine2), h2(brand.el.cardQuoteLine1, brand.el.cardQuoteLine2)),
      card_sub: L(brand.en.cardSub, brand.el.cardSub),
      image: img(brandSrc.attr(brandImgs[0], 'src')),
      image_alt: L(brandSrc.attr(brandImgs[0], 'alt'), brandSrc.attr(brandImgs[0], 'alt')),
      image2: img(brandSrc.attr(brandImgs[1], 'src')),
      image2_alt: L(brandSrc.attr(brandImgs[1], 'alt'), brandSrc.attr(brandImgs[1], 'alt')),
    },
    rooms_showcase: {
      label: L(rooms.en.label, rooms.el.label),
      heading: L(h2(rooms.en.headlineLine1, rooms.en.headlineLine2, false), h2(rooms.el.headlineLine1, rooms.el.headlineLine2, false)),
      body: L(rooms.en.body, rooms.el.body),
      cta: L(rooms.en.cta, rooms.el.cta),
    },
    experiences: {
      label: L(xp.en.label, xp.el.label),
      heading: L(h2(xp.en.headlineLine1, xp.en.headlineLine2), h2(xp.el.headlineLine1, xp.el.headlineLine2)),
      subtext: L(xp.en.subtext, xp.el.subtext),
      discover_label: L(xp.en.discoverLabel, xp.el.discoverLabel),
      cards: xp.en.experiences.map((c: any, i: number) => {
        const g = xp.el.experiences[i]
        return { label: L(c.label, g.label), title: L(c.title, g.title), desc: L(c.desc, g.desc), href: L(c.href, g.href), image: img(c.image), image_alt: L(c.imageAlt, g.imageAlt) }
      }),
    },
    gastronomy: {
      label: L(gastro.en.label, gastro.el.label),
      heading: L(h2(gastro.en.headlineLine1, gastro.en.headlineLine2), h2(gastro.el.headlineLine1, gastro.el.headlineLine2)),
      paragraphs: L(joinParagraphs([escapeHtml(gastro.en.body1), escapeHtml(gastro.en.body2)]), joinParagraphs([escapeHtml(gastro.el.body1), escapeHtml(gastro.el.body2)])),
      card_quote: L(gastro.en.cardQuote, gastro.el.cardQuote),
      card_label: L(gastro.en.cardLabel, gastro.el.cardLabel),
      venues: L(joinLines(gastro.en.venues), joinLines(gastro.el.venues)),
      cta: L(gastro.en.cta, gastro.el.cta),
      image: img(gastroSrc.attr(gastroSrc.elements('Image')[0], 'src')),
      image_alt: L(gastroSrc.attr(gastroSrc.elements('Image')[0], 'alt'), gastroSrc.attr(gastroSrc.elements('Image')[0], 'alt')),
    },
    gallery_preview: {
      label: L(gal.en.sectionLabel, gal.el.sectionLabel),
      heading: L(escapeHtml(gal.en.headline), escapeHtml(gal.el.headline)),
      cta: L(gal.en.cta, gal.el.cta),
      mobile_cta: L(gal.en.mobileCta, gal.el.mobileCta),
      tiles: galItems.map((g: any) => ({ label: L(g.label.en, g.label.el), image: img(g.image) })),
    },
    testimonials: {
      label: L(testiSection.en.label, testiSection.el.label),
      heading: L(testiSection.en.headline, testiSection.el.headline),
    },
    location: {
      label: L(loc.en.label, loc.el.label),
      heading: L(h2(loc.en.headlineLine1, loc.en.headlineLine2), h2(loc.el.headlineLine1, loc.el.headlineLine2)),
      paragraphs: L(joinParagraphs([escapeHtml(loc.en.body1), escapeHtml(loc.en.body2)]), joinParagraphs([escapeHtml(loc.el.body1), escapeHtml(loc.el.body2)])),
      facts: loc.en.facts.map((f: any, i: number) => ({ value: f.value, label: L(f.label, loc.el.facts[i].label) })),
      cta: L(loc.en.cta, loc.el.cta),
      watermark: locSrc.textAt(49),
      image_caption: L(loc.en.imageLocation, loc.el.imageLocation),
      image: img(locSrc.attr(locSrc.elements('Image')[0], 'src')),
      image_alt: L(locSrc.attr(locSrc.elements('Image')[0], 'alt'), locSrc.attr(locSrc.elements('Image')[0], 'alt')),
    },
    journal_preview: {
      label: L(jp.en.label, jp.el.label),
      heading: L(h2(jp.en.headlineLine1, jp.en.headlineLine2, false), h2(jp.el.headlineLine1, jp.el.headlineLine2, false)),
      cta: L(jp.en.allStoriesCta, jp.el.allStoriesCta),
      cards: jp.en.posts.map((p: any, i: number) => {
        const g = jp.el.posts[i]
        return { category: L(p.category, g.category), title: L(p.title, g.title), excerpt: L(p.excerpt, g.excerpt), read_time: L(p.readTime, g.readTime), href: L(p.href, g.href), image: L(img(p.image), img(g.image)), image_alt: L(p.imageAlt, g.imageAlt) }
      }),
    },
    seo: {
      title: L(homeSeoEn.title ?? '', homeSeoEl.title ?? ''),
      description: L(homeSeoEn.description ?? '', homeSeoEl.description ?? ''),
      keywords: L(joinLines(homeSeoEn.keywords ?? []), joinLines(homeSeoEl.keywords ?? [])),
    },
  },
}

/* ---------------------------------------------------------------------------------------------
 * About
 * ------------------------------------------------------------------------------------------- */

function aboutPage() {
  const a = en('about/page.tsx'), b = el('about/page.tsx')
  const [a0, a1, a2, a3, a4] = a.sections(), [b0, b1, b2, b3, b4] = b.sections()
  const lead = (s: Section) => psWhere(s, (c) => c.includes('font-editorial'))
  const body = (s: Section) => psWhere(s, (c) => !c.includes('font-editorial'))
  const enStats = a.attr(a.elements('StatBar')[0], 'stats')
  expect(b.elements('StatBar').length === 0, 'EL about has no StatBar')
  return {
    sections: {
      hero: { watermark: a0.divTexts()[0], label: L(a0.labels[0], b0.labels[0]), heading: L(a0.headings()[0], b0.headings()[0]) },
      intro: {
        lead: L(lead(a1)[0] ?? '', lead(b1)[0] ?? ''),
        paragraphs: L(joinParagraphs(body(a1)), joinParagraphs(body(b1))),
        stats: enStats.map((s: any) => ({ value: s.value, label: L(s.label, '') })),
      },
      who: { label: L(a2.labels[0], b2.labels[0]), heading: L(a2.headings()[0] ?? '', b2.headings()[0] ?? ''), paragraphs: L(joinParagraphs(ps(a2)), joinParagraphs(ps(b2))), image: img(a2.images[0].src), image_alt: L(a2.images[0].alt, b2.images[0].alt) },
      where: { label: L(a3.labels[0], b3.labels[0]), heading: L(a3.headings()[0], b3.headings()[0]), paragraphs: L(joinParagraphs(ps(a3)), joinParagraphs(ps(b3))), image: img(a3.images[0].src), image_alt: L(a3.images[0].alt, b3.images[0].alt) },
      values: {
        label: L(a4.labels[0], b4.labels[0]),
        heading: L(a4.headings()[0], b4.headings()[0]),
        paragraphs: L(joinParagraphs(body(a4)), joinParagraphs(body(b4))),
        quote: L(lead(a4)[0] ?? '', lead(b4)[0] ?? ''),
        stats: { el: joinLines(b4.arrays[0]) },
      },
      seo: seoOf(a, b),
    },
  }
}

/* ---------------------------------------------------------------------------------------------
 * Experiences
 * ------------------------------------------------------------------------------------------- */

function experiencesPage() {
  const a = en('experiences/page.tsx'), b = el('experiences/page.tsx')
  const A = a.sections(), B = b.sections()
  const both = (fn: (s: Section, side: 'en' | 'el') => string, ia: Section, ib: Section) => L(fn(ia, 'en'), fn(ib, 'el'))
  const lbl = (s: Section) => s.labels[0] ?? ''
  const hd = (s: Section) => s.headings(resolve)[0] ?? ''
  const pp = (s: Section, test: (c: string) => boolean = () => true) => joinParagraphs(psWhere(s, test))
  const im = (s: Section) => firstImage(s)

  // Corporate: paragraphs before the first <h3> are the intro; after it, the facilities block.
  const corporate = (s: Section) => {
    const flow = s.flow(resolve)
    const h3 = flow.findIndex((f) => f.tag === 'h3')
    const before = flow.slice(0, h3).filter((f) => f.tag === 'p').map((f) => f.html!)
    const after = flow.slice(h3).filter((f) => f.tag === 'p' && f.html !== null)
    const sub = after.find((f) => f.cls.includes('font-editorial'))
    const facilities = after.find((f) => !f.cls.includes('font-editorial'))
    const h3s = s.h3(resolve)
    return { before, sub: sub ? t(sub.html) : '', facilities: facilities?.html ?? '', h3s }
  }
  const ca = corporate(A[6]), cb = corporate(B[6])
  const link = (s: Section) => t(s.links(resolve)[0]?.html)

  return {
    sections: {
      hero: { label: both(lbl, A[0], B[0]), heading: both(hd, A[0], B[0]), subtitle: L(t(ps(A[0])[0]), t(ps(B[0])[0])), image: img(im(A[0]).src), image_alt: L(im(A[0]).alt, im(B[0]).alt) },
      intro: { paragraphs: L(pp(A[1]), pp(B[1])) },
      activities: {
        label: both(lbl, A[2], B[2]),
        heading: both(hd, A[2], B[2]),
        paragraphs: L(pp(A[2], (c) => !c.includes('italic')), pp(B[2], (c) => !c.includes('italic'))),
        note: L(psWhere(A[2], (c) => c.includes('italic'))[0] ?? '', psWhere(B[2], (c) => c.includes('italic'))[0] ?? ''),
        image: img(im(A[2]).src),
        image_alt: L(im(A[2]).alt, im(B[2]).alt),
      },
      spa: {
        label: both(lbl, A[3], B[3]),
        heading: both(hd, A[3], B[3]),
        paragraphs: L(pp(A[3], (c) => c.includes('text-white/60')), pp(B[3], (c) => c.includes('text-white/60'))),
        oceanis_heading: L(t(A[3].h3(resolve)[0]), t(B[3].h3(resolve)[0])),
        oceanis_paragraphs: L(pp(A[3], (c) => c.includes('text-white/50')), pp(B[3], (c) => c.includes('text-white/50'))),
        oceanis_note: L(psWhere(A[3], (c) => c.includes('text-white/40'))[0] ?? '', psWhere(B[3], (c) => c.includes('text-white/40'))[0] ?? ''),
        cta: L(link(A[3]), link(B[3])),
        image: img(im(A[3]).src),
        image_alt: L(im(A[3]).alt, im(B[3]).alt),
      },
      pool: { label: both(lbl, A[4], B[4]), heading: both(hd, A[4], B[4]), paragraphs: L(pp(A[4]), pp(B[4])), image: img(im(A[4]).src), image_alt: L(im(A[4]).alt, im(B[4]).alt) },
      events: { label: both(lbl, A[5], B[5]), heading: both(hd, A[5], B[5]) },
      corporate: {
        label: both(lbl, A[6], B[6]),
        heading: both(hd, A[6], B[6]),
        paragraphs: L(joinParagraphs(ca.before), joinParagraphs(cb.before)),
        facilities_heading: L(t(ca.h3s[0]), t(cb.h3s[0])),
        facilities_subheading: L(ca.sub, cb.sub),
        facilities_body: L(ca.facilities, cb.facilities),
        configs_heading: L(t(ca.h3s[1]), t(cb.h3s[1])),
        configs: A[6].arrays[0].map((c: any, i: number) => ({ layout: L(c.layout, B[6].arrays[0][i].layout), capacity: L(c.capacity, B[6].arrays[0][i].capacity) })),
        equipment_heading: L(t(ca.h3s[2]), t(cb.h3s[2])),
        equipment: L(joinLines(A[6].arrays[1]), joinLines(B[6].arrays[1])),
        cta: L(link(A[6]), link(B[6])),
        image: img(im(A[6]).src),
        image_alt: L(im(A[6]).alt, im(B[6]).alt),
      },
      weddings: { label: both(lbl, A[7], B[7]), heading: both(hd, A[7], B[7]), paragraphs: L(pp(A[7]), pp(B[7])), cta: L(link(A[7]), link(B[7])), image: img(im(A[7]).src), image_alt: L(im(A[7]).alt, im(B[7]).alt) },
      seo: seoOf(a, b),
    },
  }
}

/* ---------------------------------------------------------------------------------------------
 * Spa (page sections; facilities and cabins are althea_spa_item entries)
 * ------------------------------------------------------------------------------------------- */

function spaPage() {
  const a = en('spa/page.tsx'), b = el('spa/page.tsx')
  const A = a.sections(), B = b.sections()
  const staticPs = (s: Section) => s.psSafe(resolve).filter((x): x is string => x !== null)
  const menu = (s: Source) => s.elements('SpaMenuLightbox')[0]
  return {
    sections: {
      hero: { label: L(A[0].labels[0], B[0].labels[0]), heading: L(A[0].headings()[0], B[0].headings()[0]), image: img(A[0].images[0].src), image_alt: L(A[0].images[0].alt, B[0].images[0].alt) },
      space: { label: L(A[1].labels[0], B[1].labels[0]), heading: L(A[1].headings()[0], B[1].headings()[0]), paragraphs: L(joinParagraphs(ps(A[1])), joinParagraphs(ps(B[1]))), image: img(A[1].images[0].src), image_alt: L(A[1].images[0].alt, B[1].images[0].alt) },
      facilities: { label: L(A[2].labels[0], B[2].labels[0]), heading: L(A[2].headings()[0], B[2].headings()[0]) },
      pool_break: { image: img(A[3].images[0].src), image_alt: L(A[3].images[0].alt, B[3].images[0].alt) },
      treatments: {
        label: L(A[4].labels[0], B[4].labels[0]),
        heading: L(A[4].headings()[0], B[4].headings()[0]),
        body: L(staticPs(A[4])[0], staticPs(B[4])[0]),
        cabin_cta: L(t(A[4].links(resolve)[0].html), t(B[4].links(resolve)[0].html)),
        cta: L(t(A[4].links(resolve)[1].html), t(B[4].links(resolve)[1].html)),
      },
      menu: {
        label: L(A[5].labels[0], B[5].labels[0]),
        heading: L(A[5].headings()[0], B[5].headings()[0]),
        body: L(ps(A[5])[0], ps(B[5])[0]),
        trigger_label: L(a.attr(menu(a), 'triggerLabel'), b.attr(menu(b), 'triggerLabel')),
        image: img(a.attr(menu(a), 'src')),
        image_alt: L(a.attr(menu(a), 'alt'), b.attr(menu(b), 'alt')),
      },
      philosophy: { label: L(A[6].labels[0], B[6].labels[0]), heading: L(A[6].headings()[0], B[6].headings()[0]), paragraphs: L(joinParagraphs(ps(A[6])), joinParagraphs(ps(B[6]))), image: img(A[6].images[0].src), image_alt: L(A[6].images[0].alt, B[6].images[0].alt) },
      crosslink: { body: L(ps(A[7])[0], ps(B[7])[0]) },
      seo: seoOf(a, b),
    },
  }
}

/* ---------------------------------------------------------------------------------------------
 * Gastronomy (page sections; the four other venues are althea_venue entries)
 * ------------------------------------------------------------------------------------------- */

function gastronomyPage() {
  const a = en('gastronomy/page.tsx'), b = el('gastronomy/page.tsx')
  const A = a.sections(), B = b.sections()
  const phoneNote = (s: Section) => t(psWhere(s, (c) => c.startsWith('mt-3'))[0]).replace(C.PHONE, '{phone}')
  return {
    sections: {
      hero: { label: L(A[0].labels[0], B[0].labels[0]), heading: L(A[0].headings()[0], B[0].headings()[0]), subtitle: L(t(ps(A[0])[0]), t(ps(B[0])[0])), image: img(A[0].images[0].src), image_alt: L(A[0].images[0].alt, B[0].images[0].alt) },
      aither: {
        label: L(A[1].labels[0], B[1].labels[0]),
        heading: L(A[1].headings()[0], B[1].headings()[0]),
        paragraphs: L(joinParagraphs(psWhere(A[1], (c) => c.startsWith('text-body-refined'))), joinParagraphs(psWhere(B[1], (c) => c.startsWith('text-body-refined')))),
        quote: L(psWhere(A[1], (c) => c.includes('font-editorial'))[0] ?? '', psWhere(B[1], (c) => c.includes('font-editorial'))[0] ?? ''),
        cta: L(t(A[1].links(resolve)[0].html), t(B[1].links(resolve)[0].html)),
        phone_note: L(phoneNote(A[1]), phoneNote(B[1])),
        image: img(A[1].images[0].src),
        image_alt: L(A[1].images[0].alt, B[1].images[0].alt),
      },
      seo: seoOf(a, b),
    },
  }
}

/* ---------------------------------------------------------------------------------------------
 * Location (page sections; sights are althea_sight entries)
 * ------------------------------------------------------------------------------------------- */

function locationPage() {
  const a = en('location/page.tsx'), b = el('location/page.tsx')
  const A = a.sections(), B = b.sections()
  const sightsA = sec(A, 'Sightseeing'), sightsB = sec(B, 'Αξιοθέατα')
  const intro = (s: Section) => s.psSafe(resolve).find((x) => x !== null)!
  const lead = (s: Section) => psWhere(s, (c) => c.includes('font-editorial'))[0] ?? ''
  const body = (s: Section) => joinParagraphs(psWhere(s, (c) => !c.includes('font-editorial')))
  const beaches = sec(B, 'Παραλίες')
  return {
    sections: {
      hero: { watermark: A[0].divTexts()[0], label: L(A[0].labels[0], B[0].labels[0]), heading: L(A[0].headings()[0], B[0].headings()[0]), subtitle: L(t(ps(A[0])[0]), t(ps(B[0])[0])) },
      intro: { lead: L(lead(A[1]), lead(B[1])), paragraphs: L(body(A[1]), body(B[1])), facts: A[1].arrays[0].map((f: any, i: number) => ({ value: f.value, label: L(f.label, B[1].arrays[0][i].label) })) },
      beaches: { label: { el: beaches.labels[0] }, body: { el: ps(beaches)[0] } },
      sights: { label: L(sightsA.labels[0], sightsB.labels[0]), heading: L(sightsA.headings()[0], sightsB.headings()[0]), intro: L(intro(sightsA), intro(sightsB)) },
      seo: seoOf(a, b),
    },
  }
}

/* ---------------------------------------------------------------------------------------------
 * Offers, Contact, Accommodation, Room, Journal, Gallery, FAQ
 * ------------------------------------------------------------------------------------------- */

function offersPage() {
  const a = en('offers/page.tsx'), b = el('offers/page.tsx')
  const A = a.sections(), B = b.sections()
  return {
    sections: {
      hero: { label: L(A[0].labels[0], B[0].labels[0]), heading: L(A[0].headings()[0], B[0].headings()[0]), image: img(A[0].images[0].src), image_alt: L(A[0].images[0].alt, B[0].images[0].alt) },
      offer: { label: L(A[1].labels[0], B[1].labels[0]) },
      seo: seoOf(a, b),
    },
  }
}

function offerItem() {
  const a = en('offers/page.tsx').sections()[1], b = el('offers/page.tsx').sections()[1]
  const la = a.links(resolve), lb = b.links(resolve)
  expect(la[0].href === lb[0].href, 'offer booking URL same in EN/EL')
  return {
    slug: 'stay-3-pay-2',
    title: t(a.headings()[0].split('<br>')[0]),
    excerpt: '',
    menuOrder: 0,
    image: img(a.images[0].src),
    fields: {
      active: true,
      booking_url: la[0].href,
      eyebrow: L(t(a.spans()[0]), t(b.spans()[0])),
      heading: L(a.headings()[0], b.headings()[0]),
      body: L(ps(a)[0], ps(b)[0]),
      cta_label: L(t(la[0].html), t(lb[0].html)),
      read_more_label: L(t(la[1].html), t(lb[1].html)),
      read_more_href: L(la[1].href, lb[1].href),
      image_alt: L(a.images[0].alt, b.images[0].alt),
    },
  }
}

function contactPage() {
  const a = en('contact/page.tsx'), b = el('contact/page.tsx')
  const A = a.sections(), B = b.sections()
  const info = (s: Section) => {
    const sp = s.spans(resolve).map(t), ln = s.links(resolve)
    return { address_label: sp[0], contact_label: sp[1], getting_here_label: sp[2], book_label: sp[3], general_label: t(ln[1].html), reservations_label: t(ln[2].html), getting_here: t(ps(s)[1]), book_cta: t(ln[3].html), heading: t(s.headings()[0]) }
  }
  const ia = info(A[1]), ib = info(B[1])
  const pick = <K extends keyof typeof ia>(k: K) => L(ia[k], ib[k])
  const iframeTitle = (s: Source) => s.attr(s.elements('iframe')[0], 'title')
  expect(t(ps(A[1])[0]) === C.ADDRESS && t(ps(B[1])[0]) === C.ADDRESS, 'contact info address is ADDRESS in both locales')
  return {
    sections: {
      hero: { label: L(A[0].labels[0], B[0].labels[0]), heading: L(A[0].headings()[0], B[0].headings()[0]), image: img(A[0].images[0].src), image_alt: L(A[0].images[0].alt, B[0].images[0].alt) },
      info: { heading: pick('heading'), address_label: pick('address_label'), contact_label: pick('contact_label'), general_label: pick('general_label'), reservations_label: pick('reservations_label'), getting_here_label: pick('getting_here_label'), getting_here: pick('getting_here'), book_label: pick('book_label'), book_cta: pick('book_cta') },
      map: { name: L(t(A[2].spans()[0]), t(B[2].spans()[0])), address: L(t(ps(A[2])[0]), t(ps(B[2])[0])), directions: L(t(A[2].links(resolve)[0].html), t(B[2].links(resolve)[0].html)), iframe_title: L(iframeTitle(a), iframeTitle(b)) },
      seo: seoOf(a, b),
    },
  }
}

function accommodationPage() {
  const a = en('accommodation/page.tsx'), b = el('accommodation/page.tsx')
  const A = a.sections(), B = b.sections()
  return {
    sections: {
      hero: { label: L(A[0].labels[0], B[0].labels[0]), heading: L(A[0].headings()[0], B[0].headings()[0]), image: img(A[0].images[0].src), image_alt: L(A[0].images[0].alt, B[0].images[0].alt) },
      intro: { paragraphs: L(joinParagraphs(ps(A[1])), joinParagraphs(ps(B[1]))), stats: A[1].arrays[0].map((s: any, i: number) => ({ value: s.value, label: L(s.label, B[1].arrays[0][i].label) })) },
      list: { signature_label: L(a.textAt(113), b.textAt(154)), config_label: L(a.textAt(142), b.textAt(183)), reserve: L(a.textAt(182), b.textAt(223)), details: L(a.textAt(194), b.textAt(235)) },
      included: { label: L(A[3].labels[0], B[3].labels[0]), heading: L(A[3].headings()[0], B[3].headings()[0]), items: L(joinLines(A[3].arrays[0]), joinLines(B[3].arrays[0])) },
      seo: seoOf(a, b),
    },
  }
}

function roomPage() {
  const a = en('accommodation/[slug]/page.tsx'), b = el('accommodation/[slug]/page.tsx')
  const x = (la: number, lb: number) => L(a.textAt(la), b.textAt(lb))
  return {
    sections: {
      hero: { label: L(a.textAt(85), b.textAt(93)), guests: x(96, 104), cta: x(110, 118) },
      description: { label: x(122, 130) },
      specs: { heading: x(143, 151), size: x(146, 154), view: x(150, 158), bed: x(154, 162), bed_value: x(155, 163), occupancy: x(158, 166), occupancy_value: x(159, 167), cta: x(172, 180) },
      gallery: { label: x(186, 194), heading: L(escapeHtml(a.textAt(189)), escapeHtml(b.textAt(197))), photo_alt: L('{room} — photo {n}', '{room} — φωτογραφία {n}') },
      amenities: { heading: x(212, 220) },
      similar: { heading: x(234, 242) },
    },
  }
}

function journalPage() {
  const a = en('journal/page.tsx'), b = el('journal/page.tsx')
  const sa = en('journal/[slug]/page.tsx'), sb = el('journal/[slug]/page.tsx')
  const x = (la: number, lb: number) => L(sa.textAt(la), sb.textAt(lb))
  return {
    sections: {
      list: { label: L(a.textAt(27), b.textAt(27)), heading: L(escapeHtml(a.textAt(30)), escapeHtml(b.textAt(30))) },
      article: { back_label: x(55, 55), coming_soon_title: x(151, 111), coming_soon_body: x(153, 113), browse_cta: x(163, 123), more_heading: x(175, 135), view_all: x(211, 171) },
      seo: seoOf(a, b),
    },
  }
}

function galleryPage() {
  const a = en('gallery/GalleryClient.tsx'), b = el('gallery/GalleryClient.tsx')
  const A = a.sections(), B = b.sections()
  return {
    sections: {
      hero: { label: L(A[0].labels[0], B[0].labels[0]), heading: L(A[0].headings()[0], B[0].headings()[0]), image: img(A[0].images[0].src), image_alt: L(A[0].images[0].alt, B[0].images[0].alt) },
      filter: { all_label: L(a.const('categories')[0], b.const('categories')[0]) },
      seo: seoOf(en('gallery/page.tsx'), el('gallery/page.tsx')),
    },
  }
}

function faqPage() {
  const a = en('faq/FaqClient.tsx'), b = el('faq/FaqClient.tsx')
  const A = a.sections(), B = b.sections()
  const tel = `<a href="tel:${C.PHONE.replace(/\s/g, '')}">${C.PHONE}</a>`
  const mail = `<a href="mailto:${C.EMAIL}">${C.EMAIL}</a>`
  const intro = (s: Section) => {
    const html = ps(s)[0]
    expect(html.includes(tel) && html.includes(mail), 'faq intro phone/email links')
    return html.replace(tel, '{phone}').replace(mail, '{email}')
  }
  return {
    sections: {
      hero: { label: L(A[0].labels[0], B[0].labels[0]), heading: L(A[0].headings()[0], B[0].headings()[0]), intro: L(intro(A[0]), intro(B[0])) },
      footer: { heading: L(t(ps(A[1])[0]), t(ps(B[1])[0])), body: L(t(ps(A[1])[1]), t(ps(B[1])[1])), call_label: L(t(A[1].links(resolve)[0].html), t(B[1].links(resolve)[0].html)), book_label: L(t(A[1].links(resolve)[1].html), t(B[1].links(resolve)[1].html)) },
      seo: seoOf(en('faq/page.tsx'), el('faq/page.tsx')),
    },
  }
}

/* ---------------------------------------------------------------------------------------------
 * Legal pages (EN only) → blocks
 * ------------------------------------------------------------------------------------------- */

function legalPage(file: string) {
  const s = en(file)
  const main = s.defaultExport()
  const notice = s.elements('p', main).slice(0, 2).map((e) => s.html(e, resolve))
  const title = t(s.html(s.elements('h1', main)[0]))
  const updated = t(s.html(s.elements('p', main)[2]))
  const blocks: Block[] = []
  for (const section of s.elements('section', main)) {
    const kids = (section as any).children as any[]
    for (const k of kids) {
      const tag = k.openingElement?.tagName?.getText?.() ?? k.tagName?.getText?.()
      if (!tag) continue
      if (tag === 'h2') blocks.push({ type: 'heading', text: s.html(k, resolve) })
      else if (tag === 'p') blocks.push({ type: 'paragraph', html: s.html(k, resolve) })
      else if (tag === 'address') blocks.push({ type: 'address', html: s.html(k, resolve) })
      else if (tag === 'ul') {
        const items = s.elements('li', k).map((li) => {
          // Each <li> starts with a decorative <span>—</span>; the rest is inline content.
          const clone = { ...li, children: (li as any).children.filter((c: any) => !(c.openingElement?.tagName?.getText?.() === 'span')) }
          return s.html(clone as any, resolve)
        })
        blocks.push({ type: 'list', items })
      } else throw new Error(`${file}: unexpected <${tag}> in legal section`)
    }
  }
  return {
    sections: {
      notice: { title: { en: t(notice[0]) }, body: { en: notice[1] } },
      main: { title: { en: title }, updated: { en: updated }, body: { en: serializeBlocks(blocks) } },
      seo: seoEnOnly(s),
    },
  }
}

/* ---------------------------------------------------------------------------------------------
 * Content types
 * ------------------------------------------------------------------------------------------- */

function roomItems() {
  const list = el('accommodation/page.tsx').const('greekRoomData')
  const detail = el('accommodation/[slug]/page.tsx').const('greekRoomData')
  const card = comp('sections/RoomsShowcase.tsx').const('greekRoomData')
  return C.ROOMS.map((r: any, i) => {
    const l = list[r.slug], d = detail[r.slug], c = card[r.slug]
    return {
      slug: r.slug,
      title: r.title,
      excerpt: '',
      menuOrder: i,
      image: img(r.image),
      fields: {
        size: r.size,
        featured: r.featured === true,
        gallery: r.images.map((u: string) => img(u)),
        tagline: { en: r.tagline ?? '' },
        view: { en: r.view },
        short_desc: { en: r.shortDesc },
        features: { en: joinLines(r.features) },
        list_view: { el: l?.view ?? '' },
        list_tagline: { el: l?.tagline ?? '' },
        list_short_desc: { el: l?.shortDesc ?? '' },
        list_features: { el: joinLines(l?.features ?? []) },
        // D5: the EL room page keys junior suite as 'junior-suite', so this room has no Greek detail text.
        detail_view: { el: d?.view ?? '' },
        detail_short_desc: { el: d?.shortDesc ?? '' },
        detail_features: { el: joinLines(d?.features ?? []) },
        card_view: { el: c?.view ?? '' },
        card_short_desc: { el: c?.shortDesc ?? '' },
      },
      _cardTitleEl: c?.title,
    }
  })
}

function postItems() {
  const one = (p: any, locale: 'en' | 'el', i: number) => {
    const sections = (p.sections ?? []).map((s: any) => ({
      ...(s.heading ? { heading: escapeHtml(s.heading) } : {}),
      paragraphs: s.paragraphs.map(escapeHtml),
      ...(s.bullets ? { bullets: s.bullets.map(escapeHtml) } : {}),
      ...(s.faqs ? { faqs: s.faqs.map((f: any) => ({ q: escapeHtml(f.q), a: escapeHtml(f.a) })) } : {}),
      // Article bodies are HTML: escape the URL too (WordPress' kses stores & as &amp;).
      ...(s.cta ? { cta: { label: escapeHtml(s.cta.label), href: escapeHtml(s.cta.href) } } : {}),
    }))
    return {
      slug: `${locale}-${p.slug}`,
      title: p.title,
      excerpt: p.excerpt,
      menuOrder: i,
      image: img(p.image),
      fields: {
        locale,
        route_slug: p.slug,
        translation_key: p.slug,
        category: p.category,
        read_time: p.readTime,
        display_date: p.date,
        image_alt: p.imageAlt,
        image2: img(p.image2),
        image2_alt: p.image2Alt ?? '',
        seo_title: p.seoTitle ?? '',
        seo_description: p.seoDescription ?? '',
        seo_keywords: joinLines(p.seoKeywords ?? []),
        body: sections.length ? serializeBlocks(sectionsToBlocks(sections)) : '',
      },
    }
  }
  return [...JOURNAL_POSTS.map((p, i) => one(p, 'en', i)), ...JOURNAL_POSTS_EL.map((p, i) => one(p, 'el', i))]
}

function faqItemsAndTerms() {
  expect(FAQS_EN.length === FAQS_EL.length, 'FAQ categories aligned')
  const terms = FAQS_EN.map((c, i) => ({ slug: bySlug(c.category), name: c.category, name_el: FAQS_EL[i].category, sort_order: i + 1 }))
  const items: any[] = []
  FAQS_EN.forEach((c, ci) => {
    expect(c.items.length === FAQS_EL[ci].items.length, `FAQ items aligned in ${c.category}`)
    c.items.forEach((q, qi) => {
      const g = FAQS_EL[ci].items[qi]
      items.push({ slug: `faq-${items.length + 1}`, title: q.q, excerpt: '', menuOrder: items.length, image: null, fields: { question: L(q.q, g.q), answer: L(q.a, g.a) }, terms: { althea_faq_cat: [terms[ci].slug] } })
    })
  })
  return { items, terms }
}

function galleryItemsAndTerms() {
  const a = en('gallery/GalleryClient.tsx'), b = el('gallery/GalleryClient.tsx')
  const A = a.const('galleryItems'), B = b.const('galleryItems')
  const catsA: string[] = a.const('categories').slice(1), catsB: string[] = b.const('categories').slice(1)
  expect(A.length === B.length, 'gallery aligned')
  const terms = catsA.map((name, i) => ({ slug: bySlug(name), name, name_el: catsB[i], sort_order: i + 1 }))
  const items = A.map((g: any, i: number) => {
    expect(g.src === B[i].src && g.wide === B[i].wide && catsB[catsA.indexOf(g.category)] === B[i].category, `gallery item ${i} aligned`)
    return { slug: `gallery-${i + 1}`, title: g.caption, excerpt: '', menuOrder: i, image: img(g.src), fields: { caption: L(g.caption, B[i].caption), wide: g.wide === true }, terms: { althea_gallery_cat: [bySlug(g.category)] } }
  })
  return { items, terms }
}

function testimonialItems() {
  const t2 = comp('sections/TestimonialsSection.tsx').const('testimonials')
  return t2.en.map((x: any, i: number) => {
    const g = t2.el[i]
    return { slug: `testimonial-${i + 1}`, title: x.name, excerpt: '', menuOrder: i, image: null, fields: { quote: L(x.quote, g.quote), name: L(x.name, g.name), origin: L(x.origin, g.origin), stay: L(x.stay, g.stay) } }
  })
}

function venueItems() {
  const A = en('gastronomy/page.tsx').const('venues'), B = el('gastronomy/page.tsx').const('venues')
  return A.map((v: any, i: number) => {
    const g = B.find((x: any) => x.id === v.id)
    expect(g, `EL venue ${v.id}`)
    return { slug: v.id, title: v.title, excerpt: '', menuOrder: i, image: img(v.image), fields: { label: L(v.label, g.label), title: L(v.title, g.title), desc: L(v.desc, g.desc), image_alt: L(v.imageAlt, g.imageAlt) } }
  })
}

function spaItems() {
  const a = en('spa/page.tsx'), b = el('spa/page.tsx')
  const fa = a.const('facilities'), fb = b.const('facilities'), ca = a.const('cabins'), cb = b.const('cabins')
  const facilities = fa.map((f: any, i: number) => ({ slug: `facility-${i + 1}`, title: f.name, excerpt: '', menuOrder: i, image: null, fields: { kind: 'facility', name: L(f.name, fb[i].name), desc: L(f.desc, fb[i].desc), image_alt: L('', '') } }))
  const cabins = ca.map((c: any, i: number) => ({ slug: `cabin-${i + 1}`, title: c.title, excerpt: '', menuOrder: fa.length + i, image: img(c.image), fields: { kind: 'cabin', name: L(c.title, cb[i].title), desc: L(c.desc, cb[i].desc), image_alt: L(c.imageAlt, cb[i].imageAlt) } }))
  return [...facilities, ...cabins]
}

function sightItems() {
  const A = en('location/page.tsx').const('sights'), B = el('location/page.tsx').const('sights')
  return A.map((s: any, i: number) => ({
    slug: bySlug(s.name),
    title: s.name,
    excerpt: '',
    menuOrder: i,
    image: img(s.image),
    fields: { name: L(s.name, B[i].name), distance: L(s.distance, B[i].distance), desc: L(s.desc, B[i].desc), category: L(s.category, B[i].category), object_position: s.objectPosition ?? '' },
  }))
}

function reasonItems() {
  return dbr.en.reasons.map((r: any, i: number) => ({ slug: `reason-${i + 1}`, title: r.title, excerpt: '', menuOrder: i, image: null, fields: { title: L(r.title, dbr.el.reasons[i].title), body: L(r.body, dbr.el.reasons[i].body) } }))
}

/* ---------------------------------------------------------------------------------------------
 * Assemble
 * ------------------------------------------------------------------------------------------- */

const roomList = roomItems()
// The homepage cards use the room title from RoomsShowcase's Greek data; it must equal the room title.
for (const r of roomList) expect(!r._cardTitleEl || r._cardTitleEl === r.title, `RoomsShowcase EL title for ${r.slug}`)
const faq = faqItemsAndTerms()
const gallery = galleryItemsAndTerms()

const content = {
  generated: 'scripts/content/build-content.ts — do not edit by hand',
  settings,
  pages: {
    shared,
    home,
    about: aboutPage(),
    experiences: experiencesPage(),
    spa: spaPage(),
    gastronomy: gastronomyPage(),
    location: locationPage(),
    offers: offersPage(),
    contact: contactPage(),
    accommodation: accommodationPage(),
    room: roomPage(),
    journal: journalPage(),
    gallery: galleryPage(),
    faq: faqPage(),
    'privacy-policy': legalPage('privacy-policy/page.tsx'),
    terms: legalPage('terms/page.tsx'),
  },
  items: {
    althea_room: roomList.map(({ _cardTitleEl, ...r }) => r),
    althea_post: postItems(),
    althea_faq: faq.items,
    althea_gallery: gallery.items,
    althea_testimonial: testimonialItems(),
    althea_venue: venueItems(),
    althea_spa_item: spaItems(),
    althea_sight: sightItems(),
    althea_offer: [offerItem()],
    althea_reason: reasonItems(),
  },
  terms: { althea_faq_cat: faq.terms, althea_gallery_cat: gallery.terms },
}

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(content, null, 2) + '\n')
const count = (o: Record<string, unknown[]>) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v.length]))
console.log(`Wrote ${path.relative(ROOT, OUT)}`)
console.log('pages:', Object.keys(content.pages).length, '| items:', count(content.items), '| terms:', count(content.terms))
