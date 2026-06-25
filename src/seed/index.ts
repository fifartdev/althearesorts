/**
 * Althea Resorts — CMS Seed Script
 * Run with:  npx tsx src/seed/index.ts
 *
 * Populates all collections with the current approved website content.
 * Safe to re-run — skips collections that already have documents.
 * Images are intentionally omitted; add via the admin panel after deploying.
 */

import { getPayload, type Payload } from 'payload'
import config from '../payload.config'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function para(text: string) {
  return {
    children: [{ detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 }],
    direction: 'ltr', format: '', indent: 0, type: 'paragraph', version: 1,
  }
}

function richText(...paragraphs: string[]) {
  return {
    root: {
      children: paragraphs.map(para),
      direction: 'ltr', format: '', indent: 0, type: 'root', version: 1,
    },
  }
}

function meta(title: string, description: string, keywords: string) {
  return { meta: { title, description, keywords, noIndex: false } }
}

async function slugExists(payload: Payload, collection: string, slug: string): Promise<boolean> {
  const { totalDocs } = await payload.find({
    collection: collection as any,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return totalDocs > 0
}

async function isEmpty(payload: Payload, collection: string): Promise<boolean> {
  const { totalDocs } = await payload.find({ collection: collection as any, limit: 1 })
  return totalDocs === 0
}

// ---------------------------------------------------------------------------
// Rooms
// ---------------------------------------------------------------------------

async function seedRooms(payload: Payload) {
  if (await slugExists(payload, 'rooms', 'standard-double')) { console.log('  ✓ Rooms already seeded'); return }

  const rooms = [
    {
      slug: 'standard-double',
      title: 'Standard Double',
      category: 'standard-double',
      featured: false,
      tagline: 'The Right Room in the Right Place',
      size: '22 m²',
      viewType: 'Garden view',
      bedType: 'king-twin',
      shortDescription: "Clean lines, comfortable proportions, and the natural light of Corinthia coming through every morning. The Standard Double meets good design and honest value — a room that gives you everything you need and nothing you don't.",
      description: richText(
        "Clean lines, comfortable proportions, and the natural light of Corinthia coming through every morning. The Standard Double meets good design and honest value — a room that gives you everything you need and nothing you don't.",
        'A generous balcony overlooks the gardens. The ensuite bathroom is finished with Oceanis amenities — the same certified biodegradable, vegan cosmetics used across the resort. WiFi, air conditioning, flat-screen television, and a minibar complete the room.',
      ),
      amenities: [
        { label: 'King size or twin beds' },
        { label: 'Private balcony' },
        { label: 'Ensuite bathroom' },
        { label: 'Oceanis amenities' },
        { label: 'Free WiFi' },
        { label: 'Air conditioning' },
        { label: 'Flat-screen TV' },
        { label: 'Minibar' },
        { label: 'Soundproofing' },
      ],
      ...meta(
        'Standard Double | Althea Resorts',
        'Standard Double room at Althea Resorts. 22 m², garden view, private balcony, Oceanis amenities. 60 minutes from Athens in Corinthia, Greece.',
        'standard double room Corinthia, hotel room Xylokastro, Althea Resorts accommodation',
      ),
    },
    {
      slug: 'deluxe-double-mv-pv',
      title: 'Deluxe Double M.V / P.V.',
      category: 'deluxe-double-mv-pv',
      featured: false,
      tagline: 'A Room That Earns Its View',
      size: '27 m²',
      viewType: 'Mountain or pool view',
      bedType: 'king-twin',
      shortDescription: 'Mountain or pool view from a generous private balcony. The Deluxe Double is where you spend a morning with coffee and no particular plan, watching the hills or the water below. Refined furnishings, premium Oceanis amenities, and a room that feels larger than its category suggests.',
      description: richText(
        'Mountain or pool view from a generous private balcony. The Deluxe Double is where you spend a morning with coffee and no particular plan, watching the hills or the water below.',
        'Refined furnishings, premium Oceanis amenities, and a room that feels larger than its category suggests. At 27 m² it offers the same standard of finish as the suites above it, with a view that does a great deal of the work.',
      ),
      amenities: [
        { label: 'King size or twin beds' },
        { label: 'Balcony with mountain or pool view' },
        { label: 'Ensuite bathroom' },
        { label: 'Oceanis amenities' },
        { label: 'Free WiFi' },
        { label: 'Air conditioning' },
        { label: 'Flat-screen TV' },
        { label: 'Minibar' },
        { label: 'Soundproofing' },
      ],
      ...meta(
        'Deluxe Double M.V / P.V. | Althea Resorts',
        'Deluxe Double room with mountain or pool view at Althea Resorts. 27 m², private balcony, premium Oceanis amenities, Corinthia Greece.',
        'deluxe double room Corinthia, mountain view hotel room Greece, pool view room Xylokastro',
      ),
    },
    {
      slug: 'deluxe-double-private-pool',
      title: 'Deluxe Double with Private Pool',
      category: 'deluxe-private-pool',
      featured: false,
      tagline: 'Your Own Water, Your Own Hours',
      size: '22 m²',
      viewType: 'Private pool',
      bedType: 'king-twin',
      shortDescription: 'Step outside and the pool is waiting. The Deluxe Double with Private Pool is for guests who want the resort experience without sharing it. Elegant interiors open directly to the water, and the day becomes entirely yours to arrange.',
      description: richText(
        'Step outside and the pool is waiting. The Deluxe Double with Private Pool is for guests who want the resort experience without sharing it.',
        'Elegant interiors open directly to the water, and the day becomes entirely yours to arrange. The same premium finish and Oceanis amenities as the wider Deluxe category, with the added luxury of a pool that belongs to no one else while you are here.',
      ),
      amenities: [
        { label: 'King size or twin beds' },
        { label: 'Private pool' },
        { label: 'Balcony' },
        { label: 'Ensuite bathroom' },
        { label: 'Oceanis amenities' },
        { label: 'Free WiFi' },
        { label: 'Air conditioning' },
        { label: 'Flat-screen TV' },
        { label: 'Minibar' },
        { label: 'Soundproofing' },
      ],
      ...meta(
        'Deluxe Double with Private Pool | Althea Resorts',
        'Deluxe Double room with private pool at Althea Resorts. Your own pool, elegant interiors, Oceanis amenities. Corinthia, Greece.',
        'private pool room Corinthia, deluxe room private pool Greece, Althea Resorts pool room',
      ),
    },
    {
      slug: 'superior-sea-view',
      title: 'Superior Sea View Room',
      category: 'superior-sea-view',
      featured: false,
      tagline: 'The Gulf, Uninterrupted',
      size: '27 m²',
      viewType: 'Sea view',
      bedType: 'king-twin',
      shortDescription: 'The most expansive room category at Althea, designed around one thing: the view. A generous private terrace looks out over the Corinthian Gulf with nothing in the way. This is the room for those who came here for the sea and want it always in front of them.',
      description: richText(
        'The most expansive room category at Althea, designed around one thing: the view. A generous private terrace looks out over the Corinthian Gulf with nothing in the way.',
        'This is the room for those who came here for the sea and want it always in front of them. At 27 m² with a terrace designed to be used, the Superior Sea View Room is where most guests who choose it plan to return to the following year.',
      ),
      amenities: [
        { label: 'King size or twin beds' },
        { label: 'Sea view terrace or balcony' },
        { label: 'Ensuite bathroom' },
        { label: 'Oceanis amenities' },
        { label: 'Free WiFi' },
        { label: 'Air conditioning' },
        { label: 'Flat-screen TV' },
        { label: 'Minibar' },
        { label: 'Soundproofing' },
      ],
      ...meta(
        'Superior Sea View Room | Althea Resorts',
        'Superior Sea View Room at Althea Resorts — uninterrupted Corinthian Gulf views from a private terrace. 27 m², premium amenities, Greece.',
        'sea view room Corinthia, Corinthian Gulf view hotel, superior room Greece Xylokastro',
      ),
    },
    {
      slug: 'junior-suite-private-pool',
      title: 'Junior Suite with Private Pool',
      category: 'junior-suite',
      featured: false,
      tagline: 'More Space. More Water. More Time.',
      size: '27 m²',
      viewType: 'Private pool & views',
      bedType: 'king-twin',
      shortDescription: 'The Junior Suite raises the experience in every direction. Elevated finishes, a private pool, and the kind of space that makes you rearrange your plans and stay closer to the room than you expected. One of the most requested accommodations at Althea.',
      description: richText(
        'The Junior Suite raises the experience in every direction. Elevated finishes, a private pool, and the kind of space that makes you rearrange your plans and stay closer to the room than you expected.',
        'One of the most requested accommodations at Althea. A separate living room and bedroom give the suite a sense of proportion that changes how you occupy the day. The private pool is not an afterthought — it is the room\'s defining feature.',
      ),
      amenities: [
        { label: 'King size or twin beds' },
        { label: 'Separate living room' },
        { label: 'Private pool' },
        { label: 'Balcony with views' },
        { label: 'Ensuite bathroom' },
        { label: 'Oceanis amenities' },
        { label: 'Free WiFi' },
        { label: 'Air conditioning' },
        { label: 'Flat-screen TV' },
        { label: 'Soundproofing' },
      ],
      ...meta(
        'Junior Suite with Private Pool | Althea Resorts',
        'Junior Suite with private pool at Althea Resorts. Separate living room, elevated finishes, Corinthia Greece. One of the most requested rooms at the resort.',
        'junior suite private pool Greece, luxury suite Corinthia, Althea Resorts junior suite',
      ),
    },
    {
      slug: 'althea-loft-suite',
      title: 'Althea Loft Suite Outdoor Jacuzzi',
      category: 'loft-suite',
      featured: true,
      tagline: 'The One Room That Changes Everything',
      size: '45 m²',
      viewType: 'Panoramic Gulf views',
      bedType: 'king-twin',
      shortDescription: 'Two levels. A sky-lit upper bedroom. Dramatic views of the Corinthian Gulf. And outside, a private jacuzzi that makes the evening something to look forward to all day. The Althea Loft Suite is the signature room of the resort — an architectural statement that also happens to be the most comfortable place in Corinthia to do absolutely nothing.',
      description: richText(
        'Two levels. A sky-lit upper bedroom. Dramatic views of the Corinthian Gulf. And outside, a private jacuzzi that makes the evening something to look forward to all day.',
        'The Althea Loft Suite is the signature room of the resort — an architectural statement that also happens to be the most comfortable place in Corinthia to do absolutely nothing. At 45 m², it is the largest accommodation at Althea. The upper bedroom, reached by a private staircase, looks out over the Gulf through floor-to-ceiling glass.',
        'The living room below has a sofa bed, making the Loft Suite suitable for three guests. The outdoor jacuzzi is private and heated. It faces the horizon. The evening view from the water is the reason most guests who stay here book again before they leave.',
      ),
      amenities: [
        { label: 'King size or twin beds (upper level)' },
        { label: 'Sofa bed in living room' },
        { label: 'Outdoor private jacuzzi' },
        { label: 'Panoramic balcony' },
        { label: 'Ensuite bathroom' },
        { label: 'Oceanis amenities' },
        { label: 'Free WiFi' },
        { label: 'Air conditioning' },
        { label: 'Flat-screen TV' },
        { label: 'Minibar' },
        { label: 'Soundproofing' },
      ],
      ...meta(
        'Althea Loft Suite with Outdoor Jacuzzi | Althea Resorts',
        'The signature room of Althea Resorts. 45 m², two levels, private outdoor jacuzzi, panoramic Corinthian Gulf views. The most luxurious suite in Corinthia.',
        'loft suite jacuzzi Corinthia, luxury suite panoramic view Greece, Althea Resorts signature suite',
      ),
    },
  ]

  for (const room of rooms) {
    await (payload.create as Function)({ collection: 'rooms', data: room })
    console.log(`    + Room: ${room.title}`)
  }
  console.log('  ✓ Rooms seeded')
}

// ---------------------------------------------------------------------------
// Dining
// ---------------------------------------------------------------------------

async function seedDining(payload: Payload) {
  if (await slugExists(payload, 'dining', 'aither')) { console.log('  ✓ Dining already seeded'); return }

  const venues = [
    {
      slug: 'aither',
      name: 'AITHER',
      venue: 'aither',
      tagline: 'Above the Gulf. Above Everything.',
      shortDescription: 'The signature rooftop restaurant of Althea Resorts. Mediterranean cuisine through a Greek lens, with panoramic views of the Corinthian Gulf.',
      description: richText(
        'The name comes from the ancient Greek word Αιθήρ — the pure air that exists above the clouds, the luminous upper atmosphere where the gods were said to breathe. A rooftop restaurant named after the highest reaches of the sky, sitting above the Corinthian Gulf, open to the horizon in every direction. The name earns itself every evening.',
        'The kitchen works with the Mediterranean as its reference point and Greece as its lens — ingredients that come from this land and this sea, prepared with the kind of attention that makes a simple thing remarkable. Each evening has its own character: the menu shifts, the atmosphere moves with it, and the view changes as the light does. What stays constant is the quality of what arrives at the table and the feeling that someone has thought carefully about every part of your evening, not just the food.',
        'On a clear evening, with the mountains of central Greece visible on the opposite shore and the last light moving across the water, AITHER is the best seat in Corinthia.',
      ),
      openingHours: 'Evening service — hours vary by season. Reservations recommended.',
      ...meta(
        'AITHER Rooftop Restaurant | Althea Resorts',
        'AITHER — the rooftop restaurant of Althea Resorts. Mediterranean cuisine with panoramic views of the Corinthian Gulf. Fine dining in Corinthia, Greece.',
        'AITHER restaurant Corinthia, rooftop dining Greece, Mediterranean restaurant Xylokastro, Althea Resorts dining',
      ),
    },
    {
      slug: 'all-day-dining',
      name: 'All Day Dining',
      venue: 'all-day',
      tagline: 'Something Good, Any Hour You Want It',
      shortDescription: 'Between meals, Althea keeps the kitchen open. Light plates, honest flavors, ingredients that do not need much done to them.',
      description: richText(
        "Between meals, Althea keeps the kitchen open. Light plates, honest flavors, ingredients that don't need much done to them. Whether you come in from the pool or off the beach, there is always something worth sitting down for.",
        'The all-day menu follows the same philosophy as everything else at Althea: good produce, treated with respect, served without pretense.',
      ),
      openingHours: 'All day — from breakfast through to late afternoon.',
      ...meta(
        'All Day Dining | Althea Resorts',
        'All-day dining at Althea Resorts. Light plates, honest Mediterranean flavors, fresh local ingredients available throughout the day.',
        'all day dining Corinthia, light meals hotel Greece, Althea Resorts restaurant',
      ),
    },
    {
      slug: 'breakfast',
      name: 'Breakfast',
      venue: 'breakfast',
      tagline: 'Morning, the Greek Way',
      shortDescription: 'A slow ritual. Local honey, fresh bread, cheeses from nearby villages, eggs, olives, fruit picked at the right time.',
      description: richText(
        'Breakfast at Althea is a slow ritual. The table is set with what the season offers. Local honey, fresh bread, cheeses from nearby villages, eggs, olives, fruit picked at the right time.',
        "It is a buffet, but it doesn't feel like one. It feels like someone's kitchen, scaled up with care. There is no rush here. The morning light over the Corinthian Gulf is reason enough to linger a little longer over your second cup of coffee.",
      ),
      openingHours: 'Daily 07:30 – 11:00',
      ...meta(
        'Breakfast | Althea Resorts',
        'Breakfast at Althea Resorts — a slow morning ritual with local honey, fresh bread, village cheeses, and seasonal fruit. A Mediterranean way to start the day.',
        'breakfast hotel Corinthia, Greek breakfast Xylokastro, Althea Resorts morning dining',
      ),
    },
    {
      slug: 'bar',
      name: 'Bar',
      venue: 'bar',
      tagline: 'The Bar at Althea',
      shortDescription: 'Good spirits, well-made cocktails, and the kind of quiet that makes a conversation go somewhere. Wines from Greek vineyards, spirits worth knowing.',
      description: richText(
        'Good spirits, well-made cocktails, and the kind of quiet that makes a conversation go somewhere. The selection is curated. Wines from Greek vineyards, spirits worth knowing, cocktails built with intention rather than habit.',
        'Open from late afternoon into the night, for those who are in no particular hurry and have found a good reason to stay at the table.',
      ),
      openingHours: 'Daily from late afternoon into the evening.',
      ...meta(
        'Bar | Althea Resorts',
        'The bar at Althea Resorts — Greek wines, curated spirits, cocktails built with intention. Open from late afternoon into the evening in Corinthia.',
        'hotel bar Corinthia, cocktails Xylokastro, Greek wine bar, Althea Resorts bar',
      ),
    },
    {
      slug: 'pool-bar',
      name: 'Pool Bar',
      venue: 'pool-bar',
      tagline: 'By the Water, All Day',
      shortDescription: 'Cold drinks, light bites, the sound of water. The pool bar is where the afternoon extends itself.',
      description: richText(
        'Cold drinks, light bites, the sound of water. The pool bar is where the afternoon extends itself. A coffee that becomes a cocktail, a fresh juice that turns into a long conversation.',
        'The menu is simple by design: seasonal fruit, light snacks, everything you want when you are horizontal and the sun is doing its work. No rush required. The water will wait.',
      ),
      openingHours: 'Daily during pool hours.',
      ...meta(
        'Pool Bar | Althea Resorts',
        'The pool bar at Althea Resorts — cold drinks, light bites, and the sound of the water all day long. Seasonal fruit, cocktails, and no particular hurry.',
        'pool bar Corinthia, poolside drinks Greece, Althea Resorts pool bar',
      ),
    },
  ]

  for (const venue of venues) {
    await (payload.create as Function)({ collection: 'dining', data: venue })
    console.log(`    + Dining: ${venue.name}`)
  }
  console.log('  ✓ Dining seeded')
}

// ---------------------------------------------------------------------------
// Offers
// ---------------------------------------------------------------------------

async function seedOffers(payload: Payload) {
  if (await slugExists(payload, 'offers', 'opening-offer-10-percent')) { console.log('  ✓ Offers already seeded'); return }

  await (payload.create as Function)({
    collection: 'offers',
    data: {
      slug: 'opening-offer-10-percent',
      title: '10% Off for Direct Bookings',
      badge: 'Opening Offer',
      tagline: 'A Reason to Book Now and Book Direct',
      status: 'active',
      validUntil: '2026-06-30T23:59:59.000Z',
      description: richText(
        'To mark the opening of Althea Resorts, we are offering a ten percent discount on all direct reservations made through our website or by contacting us directly.',
        'This offer is available for bookings made until the end of June 2026 and applies across all room categories — from the Standard Double to the Althea Loft Suite with Outdoor Jacuzzi.',
        'Booking direct also means you speak to us directly. Questions about your stay, requests before arrival, specific arrangements — all handled by the people who actually know the property, without a third party in between.',
        'This is how we prefer to welcome our first guests. With a real offer and a direct conversation.',
      ),
      conditions: [
        { condition: 'Valid for all room categories' },
        { condition: 'Direct bookings only via althearesorts.com or by phone and email' },
        { condition: 'Bookings made until 30 June 2026' },
        { condition: 'Cannot be combined with other promotions' },
      ],
      howToBook: 'Book online at althearesorts.com, call us at +30 211 41 84 108, or email reservations@althearesorts.com.',
      ctaLabel: 'Book Now — 10% Off',
      ctaUrl: 'https://althearesort.reserve-online.net',
      ...meta(
        '10% Off Direct Booking Offer | Althea Resorts',
        'Opening offer at Althea Resorts — 10% discount on all direct bookings made until 30 June 2026. Best rate guaranteed when you book direct.',
        'Althea Resorts offers, hotel discount Corinthia, direct booking discount Greece, opening offer hotel',
      ),
    },
  })
  console.log('  ✓ Offers seeded')
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

async function seedFAQs(payload: Payload) {
  if (!await isEmpty(payload, 'faqs')) { console.log('  ✓ FAQs already seeded'); return }

  const faqs = [
    // Rooms & Rates
    { category: 'rooms', order: 1, question: 'How many rooms does Althea Resorts have?', answer: 'Althea Resorts has 41 rooms and suites across six categories, from the Standard Double to the Althea Loft Suite with Outdoor Jacuzzi.' },
    { category: 'rooms', order: 2, question: 'What is the best rate guarantee?', answer: 'The best rate is always guaranteed when you book directly through our website or by contacting us by phone or email. We currently offer a 10% discount on all direct bookings, valid for reservations made until June 30, 2026.' },
    { category: 'rooms', order: 3, question: 'Do all rooms have a view?', answer: 'All rooms feature either mountain, pool, or sea views. The Superior Sea View Room and Althea Loft Suite offer uninterrupted views of the Corinthian Gulf from generous terraces.' },
    // Check-in
    { category: 'checkin', order: 1, question: 'What are your check-in and check-out times?', answer: 'Check-in is from 15:00 and check-out is by 11:00. Early check-in and late check-out are available upon request, subject to availability.' },
    { category: 'checkin', order: 2, question: 'What is the minimum age to check in?', answer: 'Guests must be at least 18 years of age to make a reservation. Children are welcome and the resort is family-friendly.' },
    { category: 'checkin', order: 3, question: 'Are pets allowed?', answer: 'We welcome small pets in certain room categories. Please contact us in advance to make arrangements.' },
    // Location
    { category: 'location', order: 1, question: 'How far is Althea Resorts from Athens?', answer: 'Althea Resorts is approximately 60 minutes from Athens by car on the Athens–Corinth motorway. We can assist with private transfer arrangements upon request.' },
    { category: 'location', order: 2, question: 'Do you offer airport transfers?', answer: 'Yes, we can arrange private transfers from Athens International Airport. Please contact us with your travel details and we will organize the rest.' },
    { category: 'location', order: 3, question: 'How do guests get to the private beach?', answer: 'Our private beach on the Corinthian Gulf is 5 minutes from the resort. A complimentary shuttle service runs throughout the day.' },
    // Dining
    { category: 'dining', order: 1, question: 'Do I need to book AITHER in advance?', answer: 'We recommend making a reservation for AITHER, our rooftop restaurant, particularly during the high season. Tables can be arranged by calling the resort directly.' },
    { category: 'dining', order: 2, question: 'Is breakfast included?', answer: 'Breakfast is available as part of certain packages. Please check room rates at time of booking or contact us to add breakfast to your reservation.' },
    { category: 'dining', order: 3, question: 'Do you cater for dietary requirements?', answer: 'Yes. Our kitchen can accommodate most dietary requirements including vegetarian, vegan, and allergen-specific needs. Please inform us at the time of booking.' },
    // Spa
    { category: 'spa', order: 1, question: 'Do I need to book spa treatments in advance?', answer: 'We recommend booking treatments in advance, especially during peak season. Contact us or ask the reception team upon arrival.' },
    { category: 'spa', order: 2, question: 'What products does the Ocean Spa use?', answer: 'The Ocean Spa uses Oceanis cosmetics — a Greek brand certified biodegradable, vegan, cruelty-free, and dermatologically tested. The full range is available to purchase in the spa boutique.' },
    { category: 'spa', order: 3, question: 'Is the spa open to non-resident guests?', answer: 'The spa is primarily reserved for hotel guests. Please contact us in advance if you would like to enquire about day visits.' },
  ]

  for (const faq of faqs) {
    await (payload.create as Function)({
      collection: 'faqs',
      data: {
        question: faq.question,
        answer: richText(faq.answer),
        category: faq.category,
        order: faq.order,
      },
    })
    console.log(`    + FAQ: ${faq.question.slice(0, 55)}…`)
  }
  console.log('  ✓ FAQs seeded')
}

// ---------------------------------------------------------------------------
// Journal
// ---------------------------------------------------------------------------

async function seedJournal(payload: Payload) {
  if (await slugExists(payload, 'journal', 'ancient-corinth')) { console.log('  ✓ Journal already seeded'); return }

  const posts = [
    {
      slug: 'ancient-corinth',
      title: 'Ancient Corinth: A Morning Away From Everything',
      category: 'local-guides',
      excerpt: 'One hour to one of the most powerful city-states of antiquity, still quiet enough to feel like a discovery.',
      readingTime: 5,
      featured: true,
      publishedAt: '2025-05-01',
      content: richText(
        "Ancient Corinth is forty-five minutes from Althea Resorts by car — close enough for a morning trip, distant enough that most of the tourists staying along the coast don't bother. That is what makes it worth going.",
        'The archaeological site holds the remains of one of the most powerful and wealthy cities of antiquity. At its height, Corinth controlled trade between the Aegean and the Adriatic, levying tolls on goods dragged overland across the isthmus. The wealth this produced was architectural, civic, commercial — and still visible in what remains.',
        "The Temple of Apollo is the most arresting sight: seven Doric columns from the sixth century BC still standing in their original position, older than the Parthenon. The museum is small but well-curated. The walk through the excavated agora in the early morning, before the heat arrives, is one of the more quietly affecting experiences the region offers.",
        'Acrocorinth — the fortified hill rising above the ancient city — can be climbed separately. The view from the top takes in the Corinthian Gulf, the Saronic Gulf, and on a clear day the Acropolis of Athens. The climb is an hour each way. It earns its view.',
      ),
      metaTitle: 'Ancient Corinth: A Morning Away | Althea Resorts Journal',
      metaDescription: 'A guide to visiting Ancient Corinth from Althea Resorts — 45 minutes by car, the temple of Apollo, Acrocorinth, and why it is worth going early.',
      metaKeywords: 'Ancient Corinth visit, Corinthia travel guide, day trips from Althea Resorts, ancient Greece archaeology',
    },
    {
      slug: 'oceanis-philosophy',
      title: 'The Philosophy Behind Oceanis',
      category: 'wellness',
      excerpt: 'Greek mythology, certified biodegradable formulas, and the decision that no explanation was needed.',
      readingTime: 4,
      featured: false,
      publishedAt: '2025-04-15',
      content: richText(
        'Oceanis is the Greek brand used throughout the Ocean Spa at Althea — in every treatment, every bathroom, and the boutique at the entrance to the spa. The decision to use it was not a complicated one.',
        'The products are certified biodegradable, vegan, and cruelty-free. They are dermatologically tested. They use ingredients drawn from the Greek land and sea — extracts from olive, sea fennel, mastic, sage. The formulas are developed in Greece for a climate and a skin type that knows heat, salt, and long summers.',
        'The name comes from Oceanus — the ancient Titan who, in Greek cosmology, was the great river encircling the world. It is a reference to origin, to the source of things. The spa uses the full Oceanis range across its facial and body treatments, and the products are available to take home.',
        'For guests who want to continue the treatment beyond their stay, the boutique carries the complete range. Most people, once they have tried the products, do not need much persuading.',
      ),
      metaTitle: 'The Philosophy Behind Oceanis | Althea Resorts Journal',
      metaDescription: 'Why the Ocean Spa at Althea Resorts uses Oceanis — a certified biodegradable, vegan Greek cosmetics brand. The story behind the choice.',
      metaKeywords: 'Oceanis cosmetics, Ocean Spa Althea, Greek spa products, biodegradable hotel cosmetics',
    },
    {
      slug: 'fishermen-harvest',
      title: 'What the Fishermen Bring In',
      category: 'gastronomy',
      excerpt: 'How a rooftop restaurant in Corinthia begins its evening story — at the harbor, before sunrise.',
      readingTime: 6,
      featured: false,
      publishedAt: '2025-04-01',
      content: richText(
        "The fishing boats that work the Corinthian Gulf leave before dawn and return mid-morning. What they bring depends on the season, the weather, and the particular character of the day's current. AITHER's kitchen begins before most guests are awake.",
        'The Gulf produces bass, bream, red mullet, octopus, and — in the right months — shrimp and squid of a quality that changes what you think those ingredients are capable of. The water is cooler and cleaner than the southern Aegean, and the fish shows it.',
        "The approach at AITHER is to follow what arrives rather than impose a fixed menu on it. The kitchen sets a framework for the evening — a structure of courses and a direction — and then fills it with what has come in. This means the menu genuinely changes, not as a marketing gesture, but because the harbor dictates it.",
        "Guests sometimes ask what the best thing on the menu is. The honest answer is: whatever came in this morning. The waiter can tell you.",
      ),
      metaTitle: 'What the Fishermen Bring In | AITHER Gastronomy Journal',
      metaDescription: 'How AITHER, the rooftop restaurant at Althea Resorts, sources its seafood from the Corinthian Gulf — a kitchen that follows what arrives each morning.',
      metaKeywords: 'AITHER restaurant Corinthia, fresh seafood Corinthian Gulf, Mediterranean dining Greece, farm to table hotel',
    },
    {
      slug: 'corinth-canal',
      title: 'The Corinth Canal: Closer Than You Think',
      category: 'corinthia',
      excerpt: 'One of the great feats of nineteenth-century engineering, still stopping people in their tracks.',
      readingTime: 3,
      featured: false,
      publishedAt: '2025-03-20',
      content: richText(
        "The Corinth Canal is forty minutes from Althea Resorts. Most guests who drive to it say the same thing when they arrive: I didn't expect it to be this dramatic.",
        "The canal cuts 6.3 kilometres through the isthmus of Corinth, connecting the Saronic Gulf to the Gulf of Corinth. It is 25 metres wide and its walls rise 90 metres above the water. The engineering feat it represents was impossible by the standards of the ancient world — Julius Caesar, Caligula, and Nero all considered digging it and none succeeded. The project that finally completed it ran from 1881 to 1893.",
        "The bridge at the top is worth crossing slowly. Look down. The canal is narrower than a ship's beam at its widest — large vessels cannot use it, which is part of why it was never economically decisive. But for the boats that do pass through, the experience must be extraordinary.",
        'There is a café at the tourist stop near the bridge and not much else. Two hours is enough. The canal itself is the point.',
      ),
      metaTitle: 'The Corinth Canal | Althea Resorts Travel Guide',
      metaDescription: 'The Corinth Canal is 40 minutes from Althea Resorts — a dramatic feat of 19th-century engineering worth visiting on a day trip from the resort.',
      metaKeywords: 'Corinth Canal visit, day trips Corinthia, Althea Resorts excursions, things to do near Xylokastro',
    },
    {
      slug: 'althos-meaning',
      title: 'On Althos: The Word Behind the Name',
      category: 'hotel-stories',
      excerpt: 'How an ancient Greek word for healing became a design brief, an operating philosophy, and a place.',
      readingTime: 7,
      featured: false,
      publishedAt: '2025-03-01',
      content: richText(
        "The name Althea comes from the ancient Greek word ἄλθος — althos — which means healing. It is also the name of a plant: Althaea officinalis, the marshmallow, historically used in medicine for its soothing properties. The connection between the name and the plant and the idea was not accidental.",
        'When the resort was being conceived, the owners were looking for a word that carried more than a location or a category. They wanted something that described an intention — what a stay at this place was supposed to produce in the people who came here.',
        "Althos — healing — was precise enough to be meaningful and open enough to avoid being prescriptive. It does not mean medical. It means restorative. The way a week somewhere good can restore something that a year of ordinary life has worn down.",
        "The design brief that followed took this seriously. The architecture emphasizes quiet. The spa uses products with certified natural formulations. The kitchen sources locally where it can and treats ingredients with respect rather than complication. The views — because the views here are genuinely exceptional — are given space rather than framed.",
        "The word is still in use in Greece. When Greeks say something 'altheei,' they mean it heals. It is one of the more direct words the language has. The resort's intention was to be equally direct.",
      ),
      metaTitle: 'On Althos: The Word Behind the Name | Althea Resorts',
      metaDescription: 'The story of Althea — from the ancient Greek word althos (healing) to a design brief, an operating philosophy, and a luxury resort in Corinthia.',
      metaKeywords: 'Althea Resorts story, althos meaning Greek, luxury hotel philosophy Corinthia, boutique hotel Greece concept',
    },
    {
      slug: 'pool-afternoon',
      title: 'The Case for Doing Nothing by a Pool',
      category: 'wellness',
      excerpt: 'A defense of the afternoon with no plan, no itinerary, and no particular reason to move.',
      readingTime: 3,
      featured: false,
      publishedAt: '2025-02-15',
      content: richText(
        "There is a particular quality to the second afternoon of a good holiday. The first afternoon you are still arriving — still calculating, still adjusting to the time and the light and the unfamiliar pace of the place. By the second afternoon something has shifted. You stop watching the time.",
        "At Althea, the infinity pool runs along the edge of the property and looks south over the Corinthian Gulf. The water is not cold. The loungers have the right height. Someone brings you something cold without being asked a second time.",
        "We are not making a complicated argument here. The case for doing nothing by a pool is simply that the pool is there, the afternoon is long, and you came from somewhere that does not let you sit still without a reason. The reason is the pool.",
        "Some guests plan excursions for every day. Some go once to Ancient Corinth, once to the beach, and spend the rest of the time exactly here. Both are correct answers. The second group tends to look slightly better on the last morning.",
      ),
      metaTitle: 'The Case for Doing Nothing by a Pool | Althea Resorts Journal',
      metaDescription: 'A defense of the afternoon with no plan. The infinity pool at Althea Resorts, the Corinthian Gulf, and the particular quality of the second holiday afternoon.',
      metaKeywords: 'infinity pool Corinthia, Althea Resorts pool, relaxation hotel Greece, luxury pool Xylokastro',
    },
  ]

  for (const post of posts) {
    await (payload.create as Function)({
      collection: 'journal',
      data: {
        slug: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        readingTime: post.readingTime,
        featured: post.featured,
        publishedAt: post.publishedAt,
        meta: {
          title: post.metaTitle,
          description: post.metaDescription,
          keywords: post.metaKeywords,
          noIndex: false,
        },
      },
    })
    console.log(`    + Journal: ${post.title}`)
  }
  console.log('  ✓ Journal seeded')
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

async function seedTestimonials(payload: Payload) {
  if (!await isEmpty(payload, 'testimonials')) { console.log('  ✓ Testimonials already seeded'); return }

  const items = [
    {
      quote: "The morning we left, we sat on the balcony for an extra hour because neither of us could quite bring ourselves to move. The Gulf was doing something with the light that we didn't have a name for. Althea is the kind of place that earns its name.",
      authorName: 'Sophie M.',
      authorOrigin: 'Paris, France',
      roomStayed: 'Junior Suite with Private Pool',
      rating: '5',
      featured: true,
      source: 'direct',
    },
    {
      quote: "Sixty minutes from Athens and it feels like a different world. The spa team worked with us both and by the second treatment I had genuinely forgotten what day it was. I came back three months later.",
      authorName: 'Andreas K.',
      authorOrigin: 'Athens, Greece',
      roomStayed: 'Althea Loft Suite',
      rating: '5',
      featured: true,
      source: 'direct',
    },
    {
      quote: "AITHER is the kind of restaurant that changes your expectations. The kitchen had thought carefully about every part of the evening, not just the food. The views made it impossible to be anywhere else in your mind.",
      authorName: 'Catherine R.',
      authorOrigin: 'London, United Kingdom',
      roomStayed: 'Superior Sea View Room',
      rating: '5',
      featured: true,
      source: 'direct',
    },
  ]

  for (const t of items) {
    await (payload.create as Function)({ collection: 'testimonials', data: t })
    console.log(`    + Testimonial: ${t.authorName}`)
  }
  console.log('  ✓ Testimonials seeded')
}

// ---------------------------------------------------------------------------
// Locations (nearby sights)
// ---------------------------------------------------------------------------

async function seedLocations(payload: Payload) {
  if (!await isEmpty(payload, 'locations')) { console.log('  ✓ Locations already seeded'); return }

  const sights = [
    { name: 'Ancient Corinth', distance: '45 min by car', category: 'archaeological', description: 'One of the most powerful city-states of antiquity. The archaeological site and museum hold their own against anything in Attica. The Temple of Apollo — seven sixth-century BC Doric columns still standing — is one of the most arresting sights in the Peloponnese.' },
    { name: 'Acrocorinth', distance: '45 min by car', category: 'archaeological', description: 'The fortified hill rising above the ancient city. A climb that earns its view: the Corinthian Gulf, the Saronic Gulf, and on a clear day the Acropolis of Athens visible across the water.' },
    { name: 'Corinth Canal', distance: '40 min by car', category: 'activities', description: 'One of the great feats of nineteenth-century engineering. 6.3 kilometres long, 25 metres wide, walls rising 90 metres above the water. It still stops people in their tracks when they see it for the first time.' },
    { name: 'Xylokastro', distance: '10 min by car', category: 'towns', description: 'A seafront promenade, good coffee, local fish, and the feeling of a place that has not been arranged for visitors. The Sunday market is worth going to.' },
    { name: 'Epidaurus', distance: '1.5 hr by car', category: 'day-trips', description: 'The ancient theatre of Epidaurus, set in a valley of perfect acoustics. One of the most moving ancient sites in Greece — the kind of place that makes you sit quietly for a while after you leave.' },
    { name: 'Mystras', distance: '2 hr by car', category: 'day-trips', description: 'The medieval Byzantine city rising above the Peloponnese. A UNESCO World Heritage Site and one of the most remarkable ghost towns in Europe. Worth a full day — take lunch in the village below.' },
  ]

  for (const sight of sights) {
    await (payload.create as Function)({
      collection: 'locations',
      data: {
        name: sight.name,
        distance: sight.distance,
        category: sight.category,
        description: sight.description,
      },
    })
    console.log(`    + Location: ${sight.name}`)
  }
  console.log('  ✓ Locations seeded')
}

// ---------------------------------------------------------------------------
// Experiences
// ---------------------------------------------------------------------------

async function seedExperiences(payload: Payload) {
  if (await slugExists(payload, 'experiences', 'ocean-spa')) { console.log('  ✓ Experiences already seeded'); return }

  const items = [
    {
      slug: 'ocean-spa',
      title: 'Ocean Spa',
      category: 'spa',
      tagline: 'Ancient Traditions, Contemporary Therapies',
      shortDescription: 'The Ocean Spa at Althea draws on the ancient Greek understanding of water, heat, and rest as medicine. Three treatment cabins, a steam room, and Oceanis cosmetics.',
      description: richText(
        'The Ocean Spa at Althea draws on the ancient Greek understanding of water, heat, and rest as medicine. Before pharmacology, before specialization, the Greeks built sanctuaries — Asclepeions — where people came to heal through bathing, sleep, diet, and the careful hands of practitioners who understood the body as an integrated whole.',
        'The Ocean Spa is a modern version of that idea. Three treatment cabins. A steam room. Therapies that move between the muscular and the meditative. Products by Oceanis — a Greek brand certified biodegradable, vegan, cruelty-free, and dermatologically tested — used throughout every treatment and in every room bathroom across the resort.',
        'The spa team is trained in a range of techniques: Swedish and deep tissue massage, facial treatments, body wraps, and seasonal therapies that use the plants, salts, and waters of the Greek landscape. The philosophy is not one of luxury for its own sake. It is one of restoration — of returning guests to themselves after a period of sustained depletion.',
      ),
      highlights: [
        { label: 'Treatment cabins', value: '3 private cabins' },
        { label: 'Cosmetics', value: 'Oceanis — certified biodegradable & vegan' },
        { label: 'Facilities', value: 'Steam room, relaxation lounge' },
        { label: 'Booking', value: 'Advance booking recommended' },
      ],
      ctaLabel: 'Book a Treatment',
      ctaUrl: 'tel:+302114184108',
      ...meta(
        'Ocean Spa | Althea Resorts',
        'The Ocean Spa at Althea Resorts — ancient Greek wellness traditions, contemporary therapies, Oceanis certified biodegradable cosmetics. Corinthia, Greece.',
        'Ocean Spa Corinthia, spa hotel Greece, Oceanis cosmetics, wellness retreat Xylokastro',
      ),
    },
    {
      slug: 'activities',
      title: 'Activities',
      category: 'activities',
      tagline: 'Move at Your Own Pace',
      shortDescription: 'The landscape around Althea is not a backdrop. Hiking trails, cycling routes, water sports, and curated cultural experiences in and around Corinthia.',
      description: richText(
        'The landscape around Althea is not a backdrop. It is part of what you came for. Hiking trails wind through the Corinthian hills with views that stop you mid-step. Cycling routes follow the coastline at whatever speed the day demands. The sea is available for water sports, kayaking, and sailing excursions.',
        'For guests who prefer the cultural route, we organise guided visits to Ancient Corinth, the Acrocorinth, and the Corinth Canal. Day trips to Epidaurus and Mystras can be arranged with private transportation. We are adding more experiences as the resort grows — the region has more to offer than a single season can hold.',
      ),
      highlights: [
        { label: 'Hiking', value: 'Guided and self-guided trails in the Corinthian hills' },
        { label: 'Cycling', value: 'Coastal and inland routes' },
        { label: 'Water sports', value: 'Kayaking, sailing excursions' },
        { label: 'Cultural tours', value: 'Ancient Corinth, Acrocorinth, Corinth Canal' },
      ],
      ctaLabel: 'Plan Your Stay',
      ctaUrl: 'tel:+302114184108',
      ...meta(
        'Experiences & Activities | Althea Resorts',
        'Activities at Althea Resorts — hiking, cycling, water sports, cultural excursions to Ancient Corinth and beyond. Things to do in Corinthia, Greece.',
        'activities Corinthia, things to do Xylokastro, hiking cycling Greece hotel, Althea Resorts experiences',
      ),
    },
    {
      slug: 'weddings',
      title: 'Weddings',
      category: 'events',
      tagline: 'The Occasion Deserves More Than a Venue',
      shortDescription: 'Corinthia has been a place of ceremony for three thousand years. Althea Resorts offers an intimate setting for weddings with views across the Corinthian Gulf.',
      description: richText(
        'Corinthia has been a place of ceremony for three thousand years. The temple of Apollo in Ancient Corinth presided over marriages, alliances, and the formal occasions of a civilization that understood how architecture shapes the weight of a moment. The landscape has not changed much since.',
        'Althea Resorts offers an intimate setting for weddings — a property scaled for privacy rather than volume, with views across the Corinthian Gulf that make the photographs self-explanatory. The resort accommodates private events with the full involvement of the kitchen, the bar, and the team.',
        'We work directly with couples and planners to arrange ceremony settings, catering, and accommodation for guests. The approach is bespoke: we do not run a standard package because no wedding is standard. Contact us to begin a conversation.',
      ),
      highlights: [
        { label: 'Setting', value: 'Intimate resort property with Gulf views' },
        { label: 'Catering', value: 'AITHER kitchen for ceremony and reception' },
        { label: 'Capacity', value: 'Bespoke — contact us for details' },
        { label: 'Planning', value: 'Direct coordination with resort team' },
      ],
      ctaLabel: 'Enquire About a Wedding',
      ctaUrl: 'tel:+302114184108',
      ...meta(
        'Weddings at Althea Resorts | Corinthia Greece',
        'Weddings at Althea Resorts — an intimate venue with Corinthian Gulf views, AITHER catering, and a bespoke approach. The perfect setting in Corinthia, Greece.',
        'wedding venue Corinthia, destination wedding Greece, Althea Resorts wedding, intimate wedding venue',
      ),
    },
    {
      slug: 'corporate-events',
      title: 'Corporate Events',
      category: 'corporate',
      tagline: 'The Meeting Room That Does Not Feel Like One',
      shortDescription: 'Conference facilities at Althea Resorts — fully equipped meeting rooms with natural light, surrounded by the landscape of Corinthia.',
      description: richText(
        'Althea Resorts has conference facilities for groups that require more than a room with a projector. Fully equipped meeting rooms, natural light, catering by the AITHER kitchen, and accommodation for delegates on site.',
        'The setting does something for the quality of a meeting that a city hotel cannot. When the landscape outside the window is the Corinthian hills and the Gulf, the conversation tends to go to more interesting places. Retreat formats, team sessions, and executive meetings can all be arranged.',
        'We work directly with event coordinators and companies to tailor the programme. Contact us with the size, format, and dates and we will propose a package.',
      ),
      highlights: [
        { label: 'Meeting rooms', value: 'Fully equipped with AV and natural light' },
        { label: 'Catering', value: 'AITHER kitchen — breakfast through dinner' },
        { label: 'Accommodation', value: 'All 41 rooms and suites on site' },
        { label: 'Setting', value: 'Corinthian hills and Gulf views' },
      ],
      ctaLabel: 'Request a Proposal',
      ctaUrl: 'tel:+302114184108',
      ...meta(
        'Corporate Events & Conferences | Althea Resorts',
        'Corporate events and conference facilities at Althea Resorts, Corinthia. Fully equipped meeting rooms, AITHER catering, accommodation for delegates.',
        'corporate events Corinthia, conference venue Greece, business retreat hotel, Althea Resorts meetings',
      ),
    },
  ]

  for (const item of items) {
    await (payload.create as Function)({ collection: 'experiences', data: item })
    console.log(`    + Experience: ${item.title}`)
  }
  console.log('  ✓ Experiences seeded')
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

async function seedGallery(payload: Payload) {
  if (!await isEmpty(payload, 'gallery')) { console.log('  ✓ Gallery already seeded'); return }

  const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

  const items = [
    // Pool & Exterior
    { imageUrl: '/images/new-images/althea-front.jpg',          caption: 'Althea Resorts',          category: 'exterior', featured: true,  wide: true,  order: 1 },
    { imageUrl: '/images/main-pool.jpg',                         caption: 'Main Pool',               category: 'pool',     featured: true,  wide: false, order: 2 },
    { imageUrl: `${S}/Gallery-9VZMNYN.jpg`,                     caption: 'Garden & Terraces',       category: 'exterior', featured: false, wide: false, order: 3 },
    { imageUrl: '/images/new-images/New-Hero.jpg',              caption: 'The Resort',              category: 'exterior', featured: true,  wide: false, order: 4 },
    { imageUrl: `${S}/FAQ-CKK5K7K.jpg`,                         caption: 'Althea Resorts',          category: 'exterior', featured: false, wide: false, order: 5 },
    // Rooms & Suites
    { imageUrl: `${S}/althea-exclusive-resorts-spa-1.png`,      caption: 'Standard Double',         category: 'rooms',    featured: false, wide: false, order: 10 },
    { imageUrl: `${S}/althea-exclusive-resorts-spa-2.png`,      caption: 'Room Interior',           category: 'rooms',    featured: false, wide: false, order: 11 },
    { imageUrl: `${S}/althea-exclusive-resorts-spa-3.png`,      caption: 'Room Details',            category: 'rooms',    featured: false, wide: false, order: 12 },
    { imageUrl: `${S}/althea-exclusive-resorts-spa-4.png`,      caption: 'Deluxe Double',           category: 'rooms',    featured: false, wide: true,  order: 13 },
    { imageUrl: `${S}/althea-exclusive-resorts-spa-5.png`,      caption: 'Deluxe with Pool',        category: 'rooms',    featured: false, wide: false, order: 14 },
    { imageUrl: `${S}/althea-exclusive-resorts-spa-6.png`,      caption: 'Superior Sea View',       category: 'rooms',    featured: true,  wide: false, order: 15 },
    { imageUrl: `${S}/althea-exclusive-resorts-spa-8.png`,      caption: 'Junior Suite',            category: 'rooms',    featured: false, wide: false, order: 16 },
    { imageUrl: `${S}/althea-exclusive-resorts-spa-9.png`,      caption: 'Loft Suite',              category: 'rooms',    featured: true,  wide: true,  order: 17 },
    { imageUrl: `${S}/althea-exclusive-resorts-spa-10.png`,     caption: 'Suite Living Area',       category: 'rooms',    featured: false, wide: false, order: 18 },
    { imageUrl: `${S}/althea-exclusive-resorts-spa-11.png`,     caption: 'Suite Terrace',           category: 'rooms',    featured: false, wide: false, order: 19 },
    // Views
    { imageUrl: '/images/new-images/althea-side-images1.jpg',   caption: 'Corinthian Gulf Views',   category: 'exterior', featured: false, wide: true,  order: 20 },
    { imageUrl: '/images/new-images/althea-side-images2.jpg',   caption: 'Corinthian Coast',        category: 'exterior', featured: false, wide: false, order: 21 },
    { imageUrl: '/images/new-images/althea-side-images3.jpg',   caption: 'The Surroundings',        category: 'exterior', featured: false, wide: false, order: 22 },
    { imageUrl: '/images/new-images/althea-side-images4.jpg',   caption: 'Landscape & Nature',      category: 'exterior', featured: false, wide: false, order: 23 },
    { imageUrl: `${S}/1.jpg`,                                   caption: 'The Property',            category: 'exterior', featured: false, wide: false, order: 24 },
    { imageUrl: `${S}/2.jpg`,                                   caption: 'Gulf at Dusk',            category: 'exterior', featured: false, wide: false, order: 25 },
    // Spa
    { imageUrl: '/images/oceanisphoto.jpg',                     caption: 'Oceanis — Spa Products',  category: 'spa',      featured: true,  wide: false, order: 30 },
    // Outdoor pool
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-13.jpg', caption: 'Outdoor Pool',      category: 'pool',     featured: true,  wide: true,  order: 40 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-14.jpg', caption: 'Pool at Sunset',    category: 'pool',     featured: false, wide: false, order: 41 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-15.jpg', caption: 'Pool Terrace',      category: 'pool',     featured: false, wide: false, order: 42 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-16.jpg', caption: 'The Pool',          category: 'pool',     featured: false, wide: false, order: 43 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-17.jpg', caption: 'Poolside',          category: 'pool',     featured: false, wide: false, order: 44 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-18.jpg', caption: 'Summer at the Pool',category: 'pool',     featured: false, wide: true,  order: 45 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-19.jpg', caption: 'Pool Views',        category: 'pool',     featured: false, wide: false, order: 46 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-20.jpg', caption: 'Afternoon Swim',    category: 'pool',     featured: false, wide: false, order: 47 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-21.jpg', caption: 'By the Water',      category: 'pool',     featured: false, wide: false, order: 48 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-22.jpg', caption: 'Pool & Gulf',       category: 'pool',     featured: false, wide: false, order: 49 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-23.jpg', caption: 'Pool Garden',       category: 'pool',     featured: false, wide: true,  order: 50 },
    { imageUrl: '/images/outdoor-pool/althea-indoor-outdoor-24.jpg', caption: 'Outdoor Living',    category: 'pool',     featured: false, wide: false, order: 51 },
    // Lobby & Reception
    { imageUrl: '/images/reception/althea-indoor-outdoor-1.jpg',  caption: 'Althea Lobby',         category: 'exterior', featured: false, wide: true,  order: 60 },
    { imageUrl: '/images/reception/althea-indoor-outdoor-2.jpg',  caption: 'Reception',            category: 'exterior', featured: false, wide: false, order: 61 },
    { imageUrl: '/images/reception/althea-indoor-outdoor-3.jpg',  caption: 'Hotel Interior',       category: 'exterior', featured: false, wide: false, order: 62 },
    { imageUrl: '/images/reception/althea-indoor-outdoor-4.jpg',  caption: 'Lobby Details',        category: 'exterior', featured: false, wide: false, order: 63 },
    { imageUrl: '/images/reception/althea-indoor-outdoor-5.jpg',  caption: 'The Welcome',          category: 'exterior', featured: false, wide: false, order: 64 },
    { imageUrl: '/images/reception/althea-indoor-outdoor-6.jpg',  caption: 'Arrival at Althea',    category: 'exterior', featured: false, wide: true,  order: 65 },
    { imageUrl: '/images/reception/althea-indoor-outdoor-7.jpg',  caption: 'Common Areas',         category: 'exterior', featured: false, wide: false, order: 66 },
    { imageUrl: '/images/reception/althea-indoor-outdoor-8.jpg',  caption: 'Interior Design',      category: 'exterior', featured: false, wide: false, order: 67 },
    // Dining
    { imageUrl: '/images/restaurant/althea-indoor-outdoor-9.jpg',   caption: 'Dining at Althea',   category: 'dining',   featured: true,  wide: true,  order: 70 },
    { imageUrl: '/images/restaurant/althea-indoor-outdoor-10.jpg',  caption: 'Restaurant Terrace', category: 'dining',   featured: false, wide: false, order: 71 },
    { imageUrl: '/images/restaurant/althea-indoor-outdoor-11.jpg',  caption: 'Indoor Dining',      category: 'dining',   featured: false, wide: false, order: 72 },
    { imageUrl: '/images/restaurant/althea-indoor-outdoor-12.jpg',  caption: 'The Dining Room',    category: 'dining',   featured: false, wide: false, order: 73 },
    // Breakfast
    { imageUrl: '/images/breakfast/althea-breakfast-1.jpg',   caption: 'Morning Spread',           category: 'dining',   featured: false, wide: true,  order: 80 },
    { imageUrl: '/images/breakfast/althea-breakfast-2.jpg',   caption: 'Fresh Pastries',           category: 'dining',   featured: false, wide: false, order: 81 },
    { imageUrl: '/images/breakfast/althea-breakfast-3.jpg',   caption: 'Local Honey & Cheeses',    category: 'dining',   featured: false, wide: false, order: 82 },
    { imageUrl: '/images/breakfast/althea-breakfast-4.jpg',   caption: 'Seasonal Fruit',           category: 'dining',   featured: false, wide: false, order: 83 },
    { imageUrl: '/images/breakfast/althea-breakfast-5.jpg',   caption: 'Greek Breakfast',          category: 'dining',   featured: false, wide: false, order: 84 },
    { imageUrl: '/images/breakfast/althea-breakfast-6.jpg',   caption: 'The Breakfast Table',      category: 'dining',   featured: false, wide: false, order: 85 },
    { imageUrl: '/images/breakfast/althea-breakfast-7.jpg',   caption: 'Breakfast at Althea',      category: 'dining',   featured: false, wide: true,  order: 86 },
    { imageUrl: '/images/breakfast/althea-breakfast-8.jpg',   caption: 'Morning Ritual',           category: 'dining',   featured: false, wide: false, order: 87 },
    { imageUrl: '/images/breakfast/althea-breakfast-9.jpg',   caption: 'Fresh from the Kitchen',   category: 'dining',   featured: false, wide: false, order: 88 },
    { imageUrl: '/images/breakfast/althea-breakfast-10.jpg',  caption: 'Morning Light',            category: 'dining',   featured: false, wide: false, order: 89 },
    { imageUrl: '/images/breakfast/althea-breakfast-19.jpg',  caption: 'Breakfast by the Sea',     category: 'dining',   featured: false, wide: true,  order: 90 },
    { imageUrl: '/images/breakfast/althea-breakfast-20.jpg',  caption: 'Harvest & Honey',          category: 'dining',   featured: false, wide: false, order: 91 },
    { imageUrl: '/images/breakfast/althea-breakfast-13.jpg',  caption: 'Mediterranean Morning',    category: 'dining',   featured: false, wide: true,  order: 92 },
  ]

  for (const item of items) {
    await (payload.create as Function)({
      collection: 'gallery',
      data: {
        imageUrl: item.imageUrl,
        caption: item.caption,
        category: item.category,
        featured: item.featured,
        order: item.order,
      },
    })
  }
  console.log(`  ✓ Gallery seeded (${items.length} items)`)
}

// ---------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------

async function seedGlobals(payload: Payload) {
  console.log('  Seeding globals…')

  await payload.updateGlobal({
    slug: 'contact-info',
    data: {
      address: 'Ano Loutro, Xylokastro, Corinthia, Greece',
      phone: '+30 27430 24063',
      email: 'reservations@althearesorts.com',
      reservationsEmail: 'reservations@althearesorts.com',
      coordinates: { lat: 38.0945616, lng: 22.5454614 },
      directions: '60 minutes from Athens by car. Follow the Athens–Corinth motorway toward the Peloponnese, exit at Xylokastro.',
    },
  })
  console.log('    + ContactInfo')

  await payload.updateGlobal({
    slug: 'booking-settings',
    data: {
      bookingEngineUrl: 'https://althearesort.reserve-online.net',
      stickyBarEnabled: true,
      floatingCTAEnabled: true,
      stickyBarText: 'Reserve your stay — 60 minutes from Athens',
      directBookingDiscount: 10,
      openingOfferEndDate: '2026-06-30T23:59:59.000Z',
    },
  })
  console.log('    + BookingSettings')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Althea Resorts',
      tagline: 'Redefining Hospitality With Timeless Elegance',
      maintenanceMode: false,
      cookieConsentEnabled: true,
    },
  })
  console.log('    + SiteSettings')

  await payload.updateGlobal({
    slug: 'seo-settings',
    data: {
      defaultTitle: 'Althea Resorts',
      titleSuffix: '| Althea Resorts',
      defaultDescription: 'Luxury boutique resort in Ano Loutro, Xylokastro, Corinthia. 41 rooms and suites, Ocean Spa, rooftop restaurant AITHER. 60 minutes from Athens.',
      siteUrl: 'https://althearesorts.com',
      hreflangEnabled: true,
      defaultLocale: 'en',
      googleAnalyticsId: 'G-WYCXWW127J',
      schemaEnabled: true,
      llmsEnabled: true,
    },
  })
  console.log('    + SEOSettings')

  await payload.updateGlobal({
    slug: 'geo-settings',
    data: {
      legalName: 'Althea Resorts',
      streetAddress: 'Ano Loutro',
      addressLocality: 'Xylokastro',
      addressRegion: 'Corinthia',
      postalCode: '20400',
      addressCountry: 'GR',
      coordinates: { latitude: 38.0945616, longitude: 22.5454614 },
      googleMapsUrl: 'https://maps.google.com/?q=38.0945616,22.5454614',
      telephone: '+30 27430 24063',
      email: 'reservations@althearesorts.com',
      reservationsEmail: 'reservations@althearesorts.com',
      url: 'https://althearesorts.com',
      bookingUrl: 'https://althearesort.reserve-online.net',
      reception247: true,
      checkinTime: '15:00',
      checkoutTime: '11:00',
      starRating: 5,
      numberOfRooms: 41,
      priceRange: '€€€€',
      instagram: 'https://www.instagram.com/althearesorts',
      facebook: 'https://www.facebook.com/profile.php?id=61589365637032',
      linkedin: 'https://www.linkedin.com/company/althearesorts',
    },
  })
  console.log('    + GeoSettings')

  console.log('  ✓ Globals seeded')
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Image URLs — patch existing records with fallback image URLs
// ---------------------------------------------------------------------------

async function seedImageUrls(payload: Payload) {
  const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

  const roomImages: Record<string, string> = {
    'standard-double':           '/images/standard.jpg',
    'deluxe-double-mv-pv':       '/images/deluxe%20double.jpg',
    'deluxe-double-private-pool':'/images/del.double.jpg',
    'superior-sea-view':         '/images/superior%20sea%20view.jpg',
    'junior-suite-private-pool': '/images/Junior%20suite%20.jpg',
    'althea-loft-suite':         '/images/js%20living%20room.jpg',
  }
  for (const [slug, imageUrl] of Object.entries(roomImages)) {
    const res = await payload.find({ collection: 'rooms', where: { slug: { equals: slug } }, limit: 1 }).catch(() => null)
    if (res?.docs[0]) await payload.update({ collection: 'rooms', id: res.docs[0].id, data: { imageUrl } }).catch(() => null)
  }
  console.log('    + Room imageUrls patched')

  const diningImages: Record<string, string> = {
    'aither':         '/images/restaurant/althea-indoor-outdoor-9.jpg',
    'all-day-dining': '/images/restaurant/althea-indoor-outdoor-12.jpg',
    'breakfast':      '/images/breakfast/althea-breakfast-18.jpg',
    'bar':            'https://images.unsplash.com/photo-1674654658721-ffc9c08ee1d0?auto=format&fit=crop&w=900&q=80',
    'pool-bar':       'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=900&q=80',
  }
  for (const [slug, imageUrl] of Object.entries(diningImages)) {
    const res = await payload.find({ collection: 'dining', where: { slug: { equals: slug } }, limit: 1 }).catch(() => null)
    if (res?.docs[0]) await payload.update({ collection: 'dining', id: res.docs[0].id, data: { imageUrl } }).catch(() => null)
  }
  console.log('    + Dining imageUrls patched')

  const journalImages: Record<string, string> = {
    'ancient-corinth':  'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=900&q=80',
    'oceanis-philosophy':'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    'fishermen-harvest': 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
    'corinth-canal':    `${S}/Gallery-9VZMNYN.jpg`,
    'althos-meaning':   `${S}/2.jpg`,
    'pool-afternoon':   `${S}/Gallery-MUZ36MM.jpg`,
  }
  for (const [slug, imageUrl] of Object.entries(journalImages)) {
    const res = await payload.find({ collection: 'journal', where: { slug: { equals: slug } }, limit: 1 }).catch(() => null)
    if (res?.docs[0]) await payload.update({ collection: 'journal', id: res.docs[0].id, data: { imageUrl } }).catch(() => null)
  }
  console.log('    + Journal imageUrls patched')

  console.log('  ✓ Image URLs seeded')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function seed() {
  console.log('\n🌱 Althea Resorts — seeding CMS\n')

  const payload = await getPayload({ config })

  await seedGlobals(payload)
  await seedRooms(payload)
  await seedDining(payload)
  await seedOffers(payload)
  await seedFAQs(payload)
  await seedJournal(payload)
  await seedTestimonials(payload)
  await seedLocations(payload)
  await seedExperiences(payload)
  await seedGallery(payload)
  await seedImageUrls(payload)

  console.log('\n✅ All done.\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
