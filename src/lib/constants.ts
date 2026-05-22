export const BOOKING_URL = 'https://althearesort.reserve-online.net'
export const SITE_URL = 'https://althearesorts.com'
export const SITE_NAME = 'Althea Resorts'
export const SITE_TAGLINE = 'Redefining Hospitality With Timeless Elegance'
export const PHONE = '+30 211 41 84 108'
export const EMAIL = 'reservations@althearesorts.com'
export const ADDRESS = 'Ano Loutro, Xylokastro, Corinthia, Greece'
export const COORDINATES = { lat: 38.076875, lng: 22.635913 }
export const SOCIAL = {
  instagram: 'https://instagram.com/althearesorts',
  facebook: 'https://facebook.com/althearesorts',
}

export const NAV_LINKS = [
  { label: 'Accommodation', href: '/accommodation' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Spa', href: '/spa' },
  { label: 'Gastronomy', href: '/gastronomy' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Location', href: '/location' },
  { label: 'Offers', href: '/offers' },
  { label: 'Contact', href: '/contact' },
]

const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

export const ROOMS = [
  {
    slug: 'standard-double',
    title: 'Standard Double',
    size: '22 m²',
    shortDesc: 'Clean lines, comfortable proportions, and the natural light of Corinthia coming through every morning.',
    features: ['King size or twin beds', 'Balcony', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Garden view',
    image: `${S}/althea-exclusive-resorts-spa-1.png`,
  },
  {
    slug: 'deluxe-double-mv-pv',
    title: 'Deluxe Double M.V / P.V.',
    size: '27 m²',
    shortDesc: 'Mountain or pool view from a generous private balcony. A room that feels larger than its category suggests.',
    features: ['King size or twin beds', 'Balcony with view', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Mountain or pool view',
    image: `${S}/althea-exclusive-resorts-spa-4.png`,
  },
  {
    slug: 'deluxe-double-sharing-pool',
    title: 'Deluxe Double with Sharing Pool',
    size: '22 m²',
    shortDesc: 'Step outside and the pool is waiting. Elegant interiors open directly to the water.',
    features: ['King size or twin beds', 'Sharing pool', 'Balcony', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Pool access',
    image: `${S}/althea-exclusive-resorts-spa-5.png`,
  },
  {
    slug: 'superior-sea-view',
    title: 'Superior Sea View Room',
    size: '27 m²',
    shortDesc: 'A generous private terrace looks out over the Corinthian Gulf with nothing in the way.',
    features: ['King size or twin beds', 'Sea view', 'Terrace or Balcony', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Sea view',
    image: `${S}/althea-exclusive-resorts-spa-6.png`,
  },
  {
    slug: 'junior-suite-private-pool',
    title: 'Junior Suite with Private Pool',
    size: '27 m²',
    shortDesc: 'Elevated finishes, a private pool, and the kind of space that makes you rearrange your plans.',
    features: ['King size or twin beds', '1 bedroom', 'Living room', 'Private pool', 'Balcony with view', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Private pool & views',
    image: `${S}/althea-exclusive-resorts-spa-8.png`,
  },
  {
    slug: 'althea-loft-suite',
    title: 'Althea Loft Suite Outdoor Jacuzzi',
    size: '45 m²',
    shortDesc: 'Two levels. A sky-lit upper bedroom. Dramatic views of the Corinthian Gulf. And outside, a private jacuzzi.',
    features: ['King size or twin beds', '1 bedroom', '1 living room with sofa bed', 'Outdoor Jacuzzi', 'Balcony with view', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Panoramic Gulf views',
    image: `${S}/althea-exclusive-resorts-spa-9.png`,
    featured: true,
  },
]
