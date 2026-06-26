import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 300

// ─── SEO meta per collection ──────────────────────────────────────────────────
// seoPlugin adds a `meta` group to: rooms, offers, experiences, dining, journal, pages.
// Fields: meta.title (localized), meta.description (localized), meta.keywords (custom, localized).
// Lookup rooms by category (fixed enum). All others by their primary title/name field.

const ROOM_META: Record<string, { title: string; description: string; keywords: string }> = {
  'standard-double': {
    title: 'Standard Double Room — Mountain & Garden Views | Althea Resorts',
    description: 'Comfortable double room with private balcony and mountain or garden views at Althea Resorts, Xylokastro, Corinthia. 60 minutes from Athens.',
    keywords: 'standard double room, hotel room Xylokastro, Althea Resorts accommodation, Corinthia hotel',
  },
  'deluxe-double-mv-pv': {
    title: 'Deluxe Double Room — Mountain or Gulf Views | Althea Resorts',
    description: 'Spacious 27 m² Deluxe Double room with private balcony and mountain or Corinthian Gulf views at Althea Resorts, Xylokastro, Greece.',
    keywords: 'deluxe double room, hotel with gulf view, Corinthia luxury room, Althea Resorts',
  },
  'deluxe-private-pool': {
    title: 'Deluxe Double with Private Pool | Althea Resorts',
    description: 'Luxury double room with private plunge pool at Althea Resorts, Xylokastro. Exclusive resort experience 60 minutes from Athens on the Corinthian Gulf.',
    keywords: 'private pool room Greece, deluxe pool room Corinthia, luxury hotel Xylokastro, Althea Resorts',
  },
  'superior-sea-view': {
    title: 'Superior Sea View Room — Corinthian Gulf | Althea Resorts',
    description: '27 m² superior room with panoramic Corinthian Gulf views and a private sea-view veranda. Althea Resorts, Xylokastro, Corinthia, Greece.',
    keywords: 'sea view room Greece, Corinthian Gulf view hotel, superior room Xylokastro, Althea Resorts',
  },
  'junior-suite': {
    title: 'Junior Suite with Private Pool | Althea Resorts',
    description: 'Luxury junior suite with private pool, Corinthian Gulf views, and a separate living area at Althea Resorts, Xylokastro. Book direct for best rate.',
    keywords: 'junior suite private pool Greece, luxury suite Corinthia, boutique hotel suite Xylokastro, Althea Resorts',
  },
  'loft-suite': {
    title: 'Althea Loft Suite — Outdoor Jacuzzi & Gulf Views | Althea Resorts',
    description: 'Signature 45 m² two-level loft suite with panoramic Corinthian Gulf views, private rooftop terrace, and outdoor jacuzzi at Althea Resorts, Xylokastro.',
    keywords: 'loft suite jacuzzi Greece, luxury suite Corinthian Gulf, best room Xylokastro, Althea Resorts suite',
  },
}

const DINING_META: Record<string, { title: string; description: string; keywords: string }> = {
  'AITHER': {
    title: 'AITHER Rooftop Restaurant — Mediterranean Cuisine | Althea Resorts',
    description: 'Signature rooftop restaurant at Althea Resorts, Xylokastro. Modern Mediterranean cuisine with panoramic views of the Corinthian Gulf. Reservations recommended.',
    keywords: 'rooftop restaurant Xylokastro, Mediterranean restaurant Corinthia, AITHER restaurant, Althea Resorts dining',
  },
  'All Day Dining': {
    title: 'All Day Dining — Light Mediterranean Plates | Althea Resorts',
    description: 'Light seasonal plates and fresh Mediterranean flavours served throughout the day at Althea Resorts, Xylokastro. From mid-morning to late afternoon.',
    keywords: 'all day dining Xylokastro, light lunch Corinthia, hotel restaurant Greece, Althea Resorts food',
  },
  'Breakfast': {
    title: 'Greek Breakfast at Althea Resorts | Xylokastro, Corinthia',
    description: 'Start the day with a Greek breakfast at Althea Resorts: local honey, fresh bread, regional cheeses, seasonal fruit, and Corinthian produce. Daily 07:30–11:00.',
    keywords: 'Greek breakfast hotel, breakfast Xylokastro, hotel breakfast Corinthia, Althea Resorts morning',
  },
  'Bar': {
    title: 'Bar at Althea Resorts — Cocktails & Greek Spirits',
    description: 'Curated cocktails, fine Greek spirits, and premium wines at the Althea Resorts bar. A calm, unhurried end to an evening on the Corinthian coast.',
    keywords: 'hotel bar Xylokastro, cocktail bar Corinthia, Greek spirits, Althea Resorts bar',
  },
  'Pool Bar': {
    title: 'Pool Bar at Althea Resorts — Drinks by the Infinity Pool',
    description: 'Fresh cocktails, cold juices, and light snacks served poolside at the Althea Resorts infinity pool, Xylokastro. Open daily during pool hours.',
    keywords: 'pool bar Greece, infinity pool bar Corinthia, hotel pool drinks, Althea Resorts pool',
  },
}

const EXPERIENCE_META: Record<string, { title: string; description: string; keywords: string }> = {
  'Ocean Spa': {
    title: 'Ocean Spa — Luxury Wellness in Xylokastro | Althea Resorts',
    description: 'Ocean Spa at Althea Resorts: 3 treatment cabins, steam room, and Oceanis certified biodegradable cosmetics. Luxury wellness on the Corinthian coast, Greece.',
    keywords: 'luxury spa Xylokastro, Ocean Spa Corinthia, wellness hotel Greece, Althea Resorts spa',
  },
  'Activities': {
    title: 'Activities & Excursions in Corinthia | Althea Resorts',
    description: 'Hiking, water sports, kayaking, and cultural excursions from Althea Resorts, Xylokastro. Explore Ancient Corinth, the Corinth Canal, and the Corinthian Gulf coast.',
    keywords: 'activities Corinthia, excursions Xylokastro, things to do Corinthian Gulf, water sports Greece hotel',
  },
  'Weddings': {
    title: 'Weddings in Corinthia — Luxury Venue | Althea Resorts',
    description: 'Intimate wedding venue with Corinthian Gulf views at Althea Resorts, Xylokastro. Bespoke ceremonies and receptions 60 minutes from Athens, Greece.',
    keywords: 'wedding venue Corinthia Greece, luxury wedding Xylokastro, boutique hotel wedding, Althea Resorts events',
  },
  'Corporate Events': {
    title: 'Corporate Events & Conferences in Corinthia | Althea Resorts',
    description: 'Fully equipped conference facilities with natural light, AITHER catering, and on-site accommodation at Althea Resorts, Xylokastro. 60 minutes from Athens.',
    keywords: 'conference hotel Corinthia, corporate events Xylokastro, meeting rooms Greece, Althea Resorts conferences',
  },
}

const JOURNAL_META: Record<string, { title: string; description: string; keywords: string }> = {
  'Ancient Corinth: A Morning Away From Everything': {
    title: 'Ancient Corinth: A Half-Day Trip from Althea Resorts',
    description: 'Visit Ancient Corinth from Althea Resorts in Xylokastro — 45 minutes away. The Temple of Apollo, Acrocorinth, and the museum. A half-day worth taking.',
    keywords: 'Ancient Corinth day trip, things to do Corinthia, Acrocorinth visit, travel from Xylokastro',
  },
  'The Philosophy Behind Oceanis': {
    title: 'The Philosophy Behind Oceanis Cosmetics | Althea Resorts',
    description: 'Why Althea Resorts chose Oceanis: a Greek certified biodegradable, vegan spa cosmetics brand rooted in mythology and sustainability. Used in the Ocean Spa.',
    keywords: 'Oceanis cosmetics, vegan spa products Greece, biodegradable hotel cosmetics, Ocean Spa Althea',
  },
  'What the Fishermen Bring In': {
    title: 'What the Fishermen Bring In — AITHER Kitchen',
    description: 'How AITHER sources its daily catch from Corinthian Gulf fishermen and lets the season guide its Mediterranean menu. Farm-to-table on the Greek coast.',
    keywords: 'AITHER restaurant sourcing, fresh fish Corinthian Gulf, Mediterranean seasonal menu, Xylokastro seafood',
  },
  'The Corinth Canal: Closer Than You Think': {
    title: 'The Corinth Canal: 40 Minutes from Althea Resorts',
    description: 'A guide to visiting the Corinth Canal from Xylokastro — one of the 19th century\'s great engineering achievements. 40 minutes from Althea Resorts.',
    keywords: 'Corinth Canal visit, day trip from Xylokastro, Corinthia attractions, things to do near Athens',
  },
  'On Althos: The Word Behind the Name': {
    title: 'On Althos: The Ancient Greek Word Behind Althea Resorts',
    description: 'The ancient Greek word ἄλθος means healing. How this single word became the philosophy, architecture, and identity behind Althea Resorts in Corinthia.',
    keywords: 'Althea Resorts meaning, Althos etymology, luxury hotel philosophy Greece, boutique resort Corinthia',
  },
  'The Case for Doing Nothing by a Pool': {
    title: 'The Case for Doing Nothing by a Pool | Althea Resorts',
    description: 'A quiet defence of unhurried afternoons, long poolside hours, and the particular pleasure of the second day of a well-chosen holiday at Althea Resorts.',
    keywords: 'relaxation holiday Greece, infinity pool hotel Corinthia, slow travel Xylokastro, Althea Resorts pool',
  },
}

// ─── Required localized arrays (English) ─────────────────────────────────────
// amenities.label, highlights.label/value, conditions.condition are all
// required+localized. If the Greek seed corrupted or replaced these arrays,
// updating with locale:'en' will fail validation unless we re-supply them.
// Include them alongside meta in every room/experience/offer update.

const ROOM_AMENITIES_EN: Record<string, { label: string }[]> = {
  'standard-double': [
    { label: 'King size bed or two singles' }, { label: 'Private balcony' },
    { label: 'Private bathroom' }, { label: 'Oceanis toiletries' },
    { label: 'Free WiFi' }, { label: 'Air conditioning' },
    { label: 'Flat-screen TV' }, { label: 'Minibar' }, { label: 'Soundproofing' },
  ],
  'deluxe-double-mv-pv': [
    { label: 'King size bed or two singles' }, { label: 'Balcony with mountain or pool view' },
    { label: 'Private bathroom' }, { label: 'Oceanis toiletries' },
    { label: 'Free WiFi' }, { label: 'Air conditioning' },
    { label: 'Flat-screen TV' }, { label: 'Minibar' }, { label: 'Soundproofing' },
  ],
  'deluxe-private-pool': [
    { label: 'King size bed or two singles' }, { label: 'Private pool' },
    { label: 'Balcony' }, { label: 'Private bathroom' }, { label: 'Oceanis toiletries' },
    { label: 'Free WiFi' }, { label: 'Air conditioning' },
    { label: 'Flat-screen TV' }, { label: 'Minibar' }, { label: 'Soundproofing' },
  ],
  'superior-sea-view': [
    { label: 'King size bed or two singles' }, { label: 'Sea-view veranda' },
    { label: 'Private bathroom' }, { label: 'Oceanis toiletries' },
    { label: 'Free WiFi' }, { label: 'Air conditioning' },
    { label: 'Flat-screen TV' }, { label: 'Minibar' }, { label: 'Soundproofing' },
  ],
  'junior-suite': [
    { label: 'King size bed or two singles' }, { label: 'Separate living area' },
    { label: 'Private pool' }, { label: 'Balcony with view' },
    { label: 'Private bathroom' }, { label: 'Oceanis toiletries' },
    { label: 'Free WiFi' }, { label: 'Air conditioning' },
    { label: 'Flat-screen TV' }, { label: 'Soundproofing' },
  ],
  'loft-suite': [
    { label: 'King size bed (upper level)' }, { label: 'Sofa bed in living area' },
    { label: 'Private outdoor jacuzzi' }, { label: 'Panoramic balcony' },
    { label: 'Private bathroom' }, { label: 'Oceanis toiletries' },
    { label: 'Free WiFi' }, { label: 'Air conditioning' },
    { label: 'Flat-screen TV' }, { label: 'Minibar' }, { label: 'Soundproofing' },
  ],
}

const EXPERIENCE_HIGHLIGHTS_EN: Record<string, { label: string; value: string }[]> = {
  'Ocean Spa': [
    { label: '3 Treatment Cabins', value: 'Fully private, equipped treatment rooms' },
    { label: 'Steam Room', value: 'Hammam-style steam bath' },
    { label: 'Oceanis Products', value: 'Certified biodegradable, vegan cosmetics' },
    { label: 'Couples Treatments', value: 'Side-by-side bookings available' },
  ],
  'Activities': [
    { label: 'Water Sports', value: 'Kayaking, windsurfing, and sailing excursions' },
    { label: 'Hiking & Cycling', value: 'Guided trails through the Corinthian hills' },
    { label: 'Cultural Excursions', value: 'Ancient Corinth, Acrocorinth, Corinth Canal' },
    { label: 'Guided Tours', value: 'Organised excursions arranged from the resort' },
  ],
  'Weddings': [
    { label: 'Ceremony Venue', value: 'Gulf-view terrace for ceremonies and receptions' },
    { label: 'AITHER Catering', value: 'Custom menus by the resort kitchen' },
    { label: 'On-site Accommodation', value: '41 rooms and suites for guests' },
    { label: 'Event Coordinator', value: 'Dedicated planning from enquiry to day-of' },
  ],
  'Corporate Events': [
    { label: 'Conference Rooms', value: 'Fully equipped with AV technology and natural light' },
    { label: 'Dedicated Coordinator', value: 'Event planning from enquiry to day-of' },
    { label: 'AITHER Catering', value: 'Mediterranean menus by the resort kitchen' },
    { label: 'On-site Accommodation', value: '41 rooms and suites for delegates' },
  ],
}

const OFFER_CONDITIONS_EN = [
  { condition: 'Valid for direct bookings only' },
  { condition: 'Subject to availability' },
  { condition: 'Cannot be combined with other offers' },
  { condition: 'Valid through 30 June 2026' },
]

// ─── Globals ──────────────────────────────────────────────────────────────────

type P = Awaited<ReturnType<typeof getPayload>>
let updated: string[] = []
let notFound: string[] = []
let errors: string[] = []

async function seedRoomMeta(payload: P) {
  const res = await (payload.find as Function)({ collection: 'rooms', limit: 50, locale: 'en' })
  for (const doc of res.docs) {
    const cat = doc.category as string
    const m = ROOM_META[cat]
    if (!m) { notFound.push(`room meta "${cat}"`); continue }
    const amenities = ROOM_AMENITIES_EN[cat] ?? []
    try {
      await (payload.update as Function)({
        collection: 'rooms', id: doc.id, locale: 'en',
        data: { meta: { title: m.title, description: m.description, keywords: m.keywords }, amenities },
      })
      updated.push(`room meta en: "${cat}"`)
    } catch (e: any) { errors.push(`room meta "${cat}": ${e?.message}`) }
  }
}

async function seedDiningMeta(payload: P) {
  const res = await (payload.find as Function)({ collection: 'dining', limit: 20, locale: 'en' })
  for (const doc of res.docs) {
    const key = doc.name as string
    const m = DINING_META[key]
    if (!m) { notFound.push(`dining meta "${key}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'dining', id: doc.id, locale: 'en', data: { meta: { title: m.title, description: m.description, keywords: m.keywords } } })
      updated.push(`dining meta en: "${key}"`)
    } catch (e: any) { errors.push(`dining meta "${key}": ${e?.message}`) }
  }
}

async function seedExperienceMeta(payload: P) {
  const res = await (payload.find as Function)({ collection: 'experiences', limit: 20, locale: 'en' })
  for (const doc of res.docs) {
    const key = doc.title as string
    const m = EXPERIENCE_META[key]
    if (!m) { notFound.push(`experience meta "${key}"`); continue }
    const highlights = EXPERIENCE_HIGHLIGHTS_EN[key] ?? []
    try {
      await (payload.update as Function)({
        collection: 'experiences', id: doc.id, locale: 'en',
        data: { meta: { title: m.title, description: m.description, keywords: m.keywords }, ...(highlights.length ? { highlights } : {}) },
      })
      updated.push(`experience meta en: "${key}"`)
    } catch (e: any) { errors.push(`experience meta "${key}": ${e?.message}`) }
  }
}

async function seedJournalMeta(payload: P) {
  const res = await (payload.find as Function)({ collection: 'journal', limit: 20, locale: 'en' })
  for (const doc of res.docs) {
    const key = doc.title as string
    const m = JOURNAL_META[key]
    if (!m) { notFound.push(`journal meta "${key}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'journal', id: doc.id, locale: 'en', data: { meta: { title: m.title, description: m.description, keywords: m.keywords } } })
      updated.push(`journal meta en: "${key}"`)
    } catch (e: any) { errors.push(`journal meta "${key}": ${e?.message}`) }
  }
}

async function seedOfferMeta(payload: P) {
  const res = await (payload.find as Function)({ collection: 'offers', limit: 10, locale: 'en' })
  for (const doc of res.docs) {
    try {
      await (payload.update as Function)({
        collection: 'offers', id: doc.id, locale: 'en',
        data: {
          meta: {
            title: '10% Direct Booking Discount | Althea Resorts Official',
            description: 'Book directly at Althea Resorts and save 10%. Best rate guaranteed on our official website. Offer valid through June 2026 — no code required.',
            keywords: 'direct booking discount hotel Greece, best rate guarantee Althea Resorts, hotel deal Corinthia',
          },
          conditions: OFFER_CONDITIONS_EN,
        },
      })
      updated.push(`offer meta en: "${doc.title}"`)
    } catch (e: any) { errors.push(`offer meta: ${e?.message}`) }
  }
}

async function seedSEOSettings(payload: P) {
  try {
    await (payload.updateGlobal as Function)({
      slug: 'seo-settings',
      locale: 'en',
      data: {
        defaultTitle: 'Althea Resorts — 5-Star Boutique Hotel in Corinthia, Greece',
        titleSuffix: '| Althea Resorts',
        defaultDescription: 'A 5-star luxury boutique resort in Ano Loutro, Xylokastro, Corinthia, on the northern Peloponnese coast. 41 rooms and suites, Ocean Spa, rooftop restaurant AITHER, infinity pool, and private beach shuttle. 60 minutes from Athens.',
        defaultKeywords: 'luxury hotel Greece, boutique resort Corinthia, hotel Xylokastro, Althea Resorts, 5 star hotel Peloponnese, luxury accommodation near Athens',
        twitterCardType: 'summary_large_image',
        siteUrl: 'https://althearesorts.com',
        hreflangEnabled: true,
        defaultLocale: 'en',
        noIndexSitewide: false,
        sitemapEnabled: true,
        googleAnalyticsId: 'G-WYCXWW127J',
        schemaEnabled: true,
        breadcrumbEnabled: true,
        llmsEnabled: true,
        aiTrainingOptOut: true,
        entityDescription: 'Althea Resorts is a 5-star luxury boutique hotel in Ano Loutro, Xylokastro, Corinthia, Greece, on the northern Peloponnese coast. The property features 41 rooms and suites with Corinthian Gulf views, the Ocean Spa using Oceanis certified biodegradable cosmetics, the signature rooftop restaurant AITHER serving modern Mediterranean cuisine, an infinity pool, full conference facilities, wedding venue, and a private beach shuttle. It is 60 minutes from Athens by car via the Athens–Corinth motorway.',
        sameAsProfiles: [
          { platform: 'instagram', url: 'https://www.instagram.com/althearesorts' },
          { platform: 'facebook',  url: 'https://www.facebook.com/profile.php?id=61589365637032' },
          { platform: 'linkedin',  url: 'https://www.linkedin.com/company/althearesorts' },
        ],
      },
    })
    updated.push('global: seo-settings (en)')
  } catch (e: any) { errors.push(`seo-settings: ${e?.message}`) }
}

async function seedGeoSettings(payload: P) {
  try {
    await (payload.updateGlobal as Function)({
      slug: 'geo-settings',
      data: {
        legalName: 'Althea Resorts',
        brandName: 'Althea Resorts',
        alternateName: 'Althea Exclusive Resorts & Spa',
        description: 'A luxury boutique resort on the hillside of Ano Loutro, near Xylokastro, Corinthia, Greece. 60 minutes from Athens. 41 rooms and suites, Ocean Spa, rooftop restaurant AITHER, infinity pool, conference facilities, and private beach shuttle.',
        streetAddress: 'Ano Loutro',
        addressLocality: 'Xylokastro',
        addressRegion: 'Corinthia',
        postalCode: '20400',
        addressCountry: 'GR',
        coordinates: { latitude: 38.0945616, longitude: 22.5454614 },
        telephone: '+30 27430 24063',
        mobilePhone: '+30 211 41 84 108',
        email: 'reservations@althearesorts.com',
        reservationsEmail: 'reservations@althearesorts.com',
        infoEmail: 'info@althearesorts.com',
        url: 'https://althearesorts.com',
        bookingUrl: 'https://althearesort.reserve-online.net',
        reception247: true,
        checkinTime: '15:00',
        checkoutTime: '11:00',
        starRating: 5,
        numberOfRooms: 41,
        priceRange: '€€€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Cash, Credit Card, Debit Card',
        availableLanguages: [
          { language: 'English' },
          { language: 'Greek' },
          { language: 'French' },
        ],
        amenityFeatures: [
          { name: 'Ocean Spa', value: true },
          { name: 'Sauna', value: true },
          { name: 'Hammam', value: true },
          { name: 'Swimming Pool', value: true },
          { name: 'Rooftop Restaurant', value: true },
          { name: 'Pool Bar', value: true },
          { name: 'Free WiFi', value: true },
          { name: 'Conference Room', value: true },
          { name: 'Air Conditioning', value: true },
          { name: 'Parking', value: true },
          { name: 'Beach Shuttle', value: true },
        ],
        nestedPlaces: [
          {
            schemaType: 'Restaurant',
            id: 'https://althearesorts.com/gastronomy#aither',
            name: 'AITHER',
            description: 'Signature rooftop restaurant serving modern Mediterranean cuisine with panoramic views of the Corinthian Gulf.',
            servesCuisine: 'Greek, Mediterranean',
            priceRange: '€€€',
            url: 'https://althearesorts.com/gastronomy',
          },
          {
            schemaType: 'HealthAndBeautyBusiness',
            id: 'https://althearesorts.com/spa#ocean-spa',
            name: 'Ocean Spa',
            description: 'Full-service wellness spa with 3 treatment cabins, steam room, and Oceanis certified biodegradable cosmetics.',
            url: 'https://althearesorts.com/spa',
          },
        ],
        instagram: 'https://www.instagram.com/althearesorts',
        facebook: 'https://www.facebook.com/profile.php?id=61589365637032',
        linkedin: 'https://www.linkedin.com/company/althearesorts',
      },
    })
    updated.push('global: geo-settings')
  } catch (e: any) { errors.push(`geo-settings: ${e?.message}`) }

  // Localized fields need a separate call with locale
  try {
    await (payload.updateGlobal as Function)({
      slug: 'geo-settings',
      locale: 'en',
      data: {
        brandName: 'Althea Resorts',
        description: 'A luxury boutique resort on the hillside of Ano Loutro, near Xylokastro, Corinthia, Greece. 60 minutes from Athens. 41 rooms and suites, Ocean Spa, rooftop restaurant AITHER, infinity pool, conference facilities, and private beach shuttle.',
        seasonalNote: 'Open year-round. Pool and beach shuttle available May–October.',
      },
    })
    updated.push('global: geo-settings (en localized)')
  } catch (e: any) { errors.push(`geo-settings localized: ${e?.message}`) }
}

async function seedContactInfo(payload: P) {
  try {
    await (payload.updateGlobal as Function)({
      slug: 'contact-info',
      data: {
        address: 'Ano Loutro, Xylokastro, Corinthia, Greece',
        phone: '+30 27430 24063',
        email: 'reservations@althearesorts.com',
        reservationsEmail: 'reservations@althearesorts.com',
        coordinates: { lat: 38.0945616, lng: 22.5454614 },
      },
    })
    updated.push('global: contact-info')
  } catch (e: any) { errors.push(`contact-info: ${e?.message}`) }

  try {
    await (payload.updateGlobal as Function)({
      slug: 'contact-info',
      locale: 'en',
      data: { directions: '60 minutes from Athens by car. Take the Athens–Corinth motorway toward the Peloponnese, exit at Xylokastro. Follow signs toward Ano Loutro.' },
    })
    updated.push('global: contact-info (en localized)')
  } catch (e: any) { errors.push(`contact-info localized: ${e?.message}`) }
}

async function seedBookingSettings(payload: P) {
  try {
    await (payload.updateGlobal as Function)({
      slug: 'booking-settings',
      data: {
        bookingEngineUrl: 'https://althearesort.reserve-online.net',
        stickyBarEnabled: true,
        floatingCTAEnabled: true,
        directBookingDiscount: 10,
      },
    })
    updated.push('global: booking-settings')
  } catch (e: any) { errors.push(`booking-settings: ${e?.message}`) }

  try {
    await (payload.updateGlobal as Function)({
      slug: 'booking-settings',
      locale: 'en',
      data: { stickyBarText: 'Reserve your stay — 60 minutes from Athens' },
    })
    updated.push('global: booking-settings (en localized)')
  } catch (e: any) { errors.push(`booking-settings localized: ${e?.message}`) }
}

async function seedSiteSettings(payload: P) {
  try {
    await (payload.updateGlobal as Function)({
      slug: 'site-settings',
      locale: 'en',
      data: { tagline: 'Redefining Hospitality With Timeless Elegance' },
    })
    updated.push('global: site-settings (en)')
  } catch (e: any) { errors.push(`site-settings: ${e?.message}`) }
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('secret') !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  updated = []; notFound = []; errors = []
  const payload = await getPayload({ config })

  await seedRoomMeta(payload)
  await seedDiningMeta(payload)
  await seedExperienceMeta(payload)
  await seedJournalMeta(payload)
  await seedOfferMeta(payload)
  await seedSiteSettings(payload)
  await seedSEOSettings(payload)
  await seedGeoSettings(payload)
  await seedContactInfo(payload)
  await seedBookingSettings(payload)

  return NextResponse.json({
    message: 'English SEO + globals seed complete',
    summary: { updated: updated.length, notFound: notFound.length, errors: errors.length },
    detail: { updated, notFound, errors },
  })
}
