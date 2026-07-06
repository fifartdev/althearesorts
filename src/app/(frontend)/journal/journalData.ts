const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

export type JournalSection = {
  heading?: string
  paragraphs: string[]
}

export type JournalPost = {
  slug: string
  category: string
  title: string
  excerpt: string
  readTime: string
  date: string
  image: string
  imageAlt: string
  image2?: string
  image2Alt?: string
  sections?: JournalSection[]
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: 'sixty-minute-shift-corinthia',
    category: 'Destination',
    title: 'The Sixty-Minute Shift: Why Savvy Travelers Are Choosing Corinthia Over the Cyclades',
    excerpt: 'As travel to the popular Aegean islands becomes increasingly congested, a growing number of deliberate travelers are turning their attention to Corinthia — one hour from Athens, no ferry required.',
    readTime: '6 min read',
    date: 'July 2026',
    image: `${S}/2.jpg`,
    imageAlt: 'Gulf at dusk viewed from Althea Resorts, Ano Loutro, Xylokastro, Corinthia, Greece',
    image2: '/images/new-images/althea-side-images1.jpg',
    image2Alt: 'Panoramic views of the Corinthian Gulf and Peloponnese mountains from Althea Resorts, Xylokastro',
    sections: [
      {
        paragraphs: [
          'There is a distinct point during the drive from Athens when the landscape shifts. The dense, sun-baked concrete of the capital gives way to the open, dramatic coastline of the Peloponnese. For those who know where they are going, the journey does not involve long ferry queues at Piraeus or delayed domestic flights. It requires exactly one hour in a car.',
          'As travel to the popular Aegean islands becomes increasingly congested, a growing number of deliberate travelers are turning their attention to Corinthia. Specifically, they are heading to the quiet hills of Ano Loutro. Here, positioned just above the waterline, Althea Resorts offers an alternative to the typical Greek holiday: immediate accessibility paired with total seclusion.',
        ],
      },
      {
        heading: 'The Luxury of Frictionless Travel',
        paragraphs: [
          'For decades, the standard formula for a Greek getaway involved a multi-step transit plan. However, the modern definition of luxury is increasingly tied to time and ease. Spending half a day in transit to reach an island loses its appeal when a pristine marine horizon is available just sixty minutes from the Athens airport.',
          'Choosing a mainland boutique escape allows you to bypass the logistical friction of island travel. There are no ferry schedules to track, no luggage restrictions to navigate, and no crowded ports. It is a seamless transition from the urban energy of Athens to the quiet paths of the Corinthian hills. You can comfortably finish a morning meeting in the city center and be stepping onto a private terrace overlooking the gulf before the afternoon heat begins to fade.',
        ],
      },
      {
        heading: 'A Different Perspective on the Corinthian Gulf',
        paragraphs: [
          'The hillsides around Xylokastro and Ano Loutro possess a microclimate and an aesthetic that feel entirely distinct from the rest of Greece. The light over the Corinthian Gulf is softer, bouncing off deep, calm waters framed by distant mountain ranges.',
          'At Althea Resorts, the architecture is intentionally designed to frame this specific view. Whether you are staying in a Superior Sea View room or a multi-level Loft Suite, the focus remains on the horizon. The design emphasizes open space, natural local stone, and panoramic terraces that encourage you to slow down. Unlike the high-traffic island destinations where privacy is hard to find, the atmosphere here is defined by quiet space.',
        ],
      },
      {
        heading: 'Culturally Connected, Entirely Removed',
        paragraphs: [
          'While the immediate draw of Ano Loutro is the stillness, the location serves as an exceptional base camp for exploring the roots of classical Greece.',
          'Staying on the mainland means you are uniquely positioned to experience historical landmarks without the crowds. The ancient city-state of Corinth and the iconic Temple of Apollo are a brief forty-five-minute drive from the resort. You can spend a morning walking through ancient stone columns and return to the resort in time for a late lunch at AITHER, our rooftop restaurant, where the menu relies heavily on the surrounding olive groves and the morning catch from local fishermen.',
        ],
      },
      {
        heading: 'Redefining the Weekend Getaway',
        paragraphs: [
          'The proximity to Athens transforms how we think about a weekend reset. It changes a vacation from a major logistical undertaking into a spontaneous decision.',
          'When a destination offers a full-service wellness spa, private infinity pools, and elevated Mediterranean gastronomy just an hour from the capital, the traditional island commute begins to feel unnecessary. Corinthia is no longer just a region you drive through to get somewhere else. It is the destination itself.',
        ],
      },
    ],
  },
  {
    slug: 'aither-rooftop-restaurant-corinthia',
    category: 'Gastronomy',
    title: 'From the Gulf to the Horizon: Culinary Storytelling at AITHER Rooftop Restaurant',
    excerpt: 'At AITHER, the rooftop dining destination at Althea Resorts, the menu is a direct reflection of the Corinthian landscape — sourced within sight of the tables, guided by the morning catch from the gulf.',
    readTime: '6 min read',
    date: 'July 2026',
    image: '/images/restaurant/althea-indoor-outdoor-9.jpg',
    imageAlt: 'Dining at AITHER rooftop restaurant at Althea Resorts, Xylokastro, Corinthia, Greece',
    image2: '/images/restaurant/althea-indoor-outdoor-10.jpg',
    image2Alt: 'AITHER rooftop restaurant terrace with Corinthian Gulf views at Althea Resorts, Xylokastro',
    sections: [
      {
        paragraphs: [
          'True Mediterranean dining is rarely about complex techniques. Instead, it relies on geography, timing, and an absolute respect for the raw ingredient. At AITHER, the rooftop dining destination at Althea Resorts, the menu functions as a direct reflection of the surrounding Corinthian landscape.',
          'Perched on the hills of Ano Loutro, just outside Xylokastro, the restaurant sits in a unique position between the mountains of the Peloponnese and the deep waters of the Corinthian Gulf. This specific geography does more than provide a panoramic backdrop for an evening meal. It dictates exactly what arrives on your plate.',
        ],
      },
      {
        heading: 'Sourced Within Sight of the Tables',
        paragraphs: [
          'The culinary philosophy at AITHER is anchored in hyper-local sourcing. When we look out from the rooftop terrace, we can physically see the origins of our ingredients.',
          'The olive oil drizzled over morning wild greens comes from the ancient groves growing along the slopes of Corinthia. The wild herbs, including mountain tea and rosemary, are gathered from the high-altitude ridges of Ano Loutro. Rather than relying on distant distribution networks, our kitchen operates on a micro-regional scale, sourcing cheese, honey, and organic produce from farmers who have worked this specific soil for generations.',
        ],
      },
      {
        heading: 'Guided by the Morning Catch',
        paragraphs: [
          'The centerpiece of the evening menu depends entirely on the unpredictable nature of the sea. Long before guests arrive for dinner, our kitchen team connects with local fishermen at the small harbors along the Corinthian coast.',
          'Because we do not rely on mass-imported seafood, our daily offerings change based on what the gulf yields each morning. A dish served at dusk might feature red mullet, sea bream, or deep-water shrimp caught just hours prior. This commitment to seasonal, wild-caught seafood ensures that every meal reflects the immediate state of the marine ecosystem right below the resort.',
        ],
      },
      {
        heading: 'Modern Greek Lens, Ancient Roots',
        paragraphs: [
          'While the ingredients are deeply traditional, the execution at AITHER is distinctly contemporary. The kitchen takes classic flavor profiles from the Peloponnese and refines them for a modern palate.',
          'We avoid heavy, masking sauces in favor of clean finishes like cold-pressed lemon juice, sea salt harvested from nearby rocky shores, and fresh local herbs. It is a style of cooking that requires absolute freshness, as there is nowhere for a subpar ingredient to hide. Dining here becomes an exploration of regional history, where traditional Greek hospitality meets sophisticated culinary execution.',
        ],
      },
      {
        heading: 'An Evening Above the Gulf',
        paragraphs: [
          'As the afternoon sun dips behind the mountains, the atmosphere on the rooftop shifts. The light over the water changes from a bright midday glare to a deep, soft gold, creating an environment where dinner is meant to be a slow, deliberate experience.',
          'Whether you are starting the evening with a glass of crisp, indigenous Assyrtiko wine at the pool bar or settling in for a multi-course dinner under the stars, AITHER offers a sense of place that cannot be replicated. It is a celebration of Corinthia, served one plate at a time.',
        ],
      },
    ],
  },
  {
    slug: 'ancient-corinth',
    category: 'Local Guides',
    title: 'Ancient Corinth: A Morning Away From Everything',
    excerpt: 'One hour to one of the most powerful city-states of antiquity, still quiet enough to feel like a discovery.',
    readTime: '5 min read',
    date: 'May 2025',
    image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Ancient stone columns at the Temple of Apollo, Corinth, Greece',
  },
  {
    slug: 'oceanis-philosophy',
    category: 'Wellness',
    title: 'The Philosophy Behind Oceanis',
    excerpt: 'Greek mythology, certified biodegradable formulas, and the decision that no explanation was needed.',
    readTime: '4 min read',
    date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Oceanis spa wellness ritual at Althea Resorts Ocean Spa, Corinthia',
  },
  {
    slug: 'fishermen-harvest',
    category: 'Gastronomy',
    title: 'What the Fishermen Bring In',
    excerpt: 'How a rooftop restaurant in Corinthia begins its evening story — at the harbor, before sunrise.',
    readTime: '6 min read',
    date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Fresh seafood from the Corinthian Gulf for AITHER restaurant, Althea Resorts',
  },
  {
    slug: 'corinth-canal',
    category: 'Corinthia',
    title: 'The Corinth Canal: Closer Than You Think',
    excerpt: 'One of the great feats of nineteenth-century engineering, still stopping people in their tracks.',
    readTime: '3 min read',
    date: 'March 2025',
    image: `${S}/Gallery-9VZMNYN.jpg`,
    imageAlt: 'Corinthia landscape and coastline near Xylokastro',
  },
  {
    slug: 'althos-meaning',
    category: 'Hotel Stories',
    title: 'On Althos: The Word Behind the Name',
    excerpt: 'How an ancient Greek word for healing became a design brief, an operating philosophy, and a place.',
    readTime: '7 min read',
    date: 'March 2025',
    image: `${S}/1.jpg`,
    imageAlt: 'Althea Resorts — the property in Ano Loutro, Xylokastro, Corinthia',
  },
  {
    slug: 'pool-afternoon',
    category: 'Wellness',
    title: 'The Case for Doing Nothing by a Pool',
    excerpt: 'A defense of the afternoon with no plan, no itinerary, and no particular reason to move.',
    readTime: '3 min read',
    date: 'February 2025',
    image: `${S}/Gallery-MUZ36MM.jpg`,
    imageAlt: 'Pool and Corinthian Gulf views at Althea Resorts, Xylokastro',
  },
]
