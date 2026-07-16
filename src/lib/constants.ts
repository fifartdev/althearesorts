export const BOOKING_URL = 'https://althearesort.reserve-online.net'
export const SITE_URL = 'https://althearesorts.com'
export const SITE_NAME = 'Althea Resorts'
export const SITE_TAGLINE = 'Boutique Hotel in Corinthia, Greece'
export const PHONE = '+30 27430 24063'
export const PHONE_MOBILE = '+30 211 41 84 108'
export const EMAIL = 'reservations@althearesorts.com'
export const INFO_EMAIL = 'info@althearesorts.com'
export const ADDRESS = 'Ano Loutro, Xylokastro, Corinthia, Greece'
export const COORDINATES = { lat: 38.0945616, lng: 22.5454614 }
// Google Maps Business Profile — CID-based canonical URL
export const GOOGLE_MAPS_CID_URL = 'https://maps.google.com/?cid=16064789505503046924'
export const SOCIAL = {
  instagram: 'https://www.instagram.com/althearesorts',
  facebook: 'https://www.facebook.com/profile.php?id=61589365637032',
  linkedin: 'https://www.linkedin.com/company/althearesorts',
  // Add X (Twitter) and YouTube URLs here when accounts are created:
  // x: 'https://x.com/althearesorts',
  // youtube: 'https://www.youtube.com/@althearesorts',
}

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Accommodation', href: '/accommodation' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Spa', href: '/spa' },
  { label: 'Gastronomy', href: '/gastronomy' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Location', href: '/location' },
  { label: 'Offers', href: '/offers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/journal' },
]

export const NAV_LINKS_EL = [
  { label: 'Σχετικά', href: '/el/about' },
  { label: 'Διαμονή', href: '/el/accommodation' },
  { label: 'Εμπειρίες', href: '/el/experiences' },
  { label: 'Σπα', href: '/el/spa' },
  { label: 'Γαστρονομία', href: '/el/gastronomy' },
  { label: 'Γκαλερί', href: '/el/gallery' },
  { label: 'Τοποθεσία', href: '/el/location' },
  { label: 'Προσφορές', href: '/el/offers' },
  { label: 'Επικοινωνία', href: '/el/contact' },
  { label: 'Blog', href: '/el/journal' },
]

const BATHROOM_IMAGES = [
  '/images/new-images/althea-rooms-bathroom1.jpg',
  '/images/new-images/althea-rooms-bathroom2.jpg',
  '/images/new-images/althea-rooms-bathroom3.jpg',
  '/images/new-images/althea-rooms-bathroom4.jpg',
  '/images/new-images/althea-rooms-bathroom5.jpg',
]

const DELUXE_DOUBLE_IMAGES = [
  '/images/new-images/althea-deluxe-double1.jpg',
  '/images/new-images/althea-deluxe-double2.jpg',
  '/images/new-images/althea-deluxe-double3.jpg',
  '/images/new-images/althea-deluxe-double4.jpg',
  '/images/new-images/althea-deluxe-double5.jpg',
  '/images/new-images/althea-deluxe-double6.jpg',
  '/images/new-images/althea-deluxe-double7.jpg',
  '/images/new-images/althea-deluxe-double8.jpg',
  '/images/new-images/althea-deluxe-double9.jpg',
  '/images/new-images/althea-deluxe-double10.jpg',
  '/images/new-images/althea-deluxe-double11.jpg',
  '/images/new-images/althea-deluxe-double12.jpg',
  '/images/new-images/althea-deluxe-double13.jpg',
  '/images/new-images/althea-deluxe-double14.jpg',
  '/images/new-images/althea-deluxe-double15.jpg',
  '/images/new-images/althea-deluxe-double16.jpg',
  ...BATHROOM_IMAGES,
]

export const ROOMS = [
  {
    slug: 'standard-double',
    title: 'Standard Double',
    tagline: 'The Right Room in the Right Place',
    size: '22 m²',
    shortDesc: 'Clean lines, comfortable proportions, and the natural light of Corinthia coming through every morning. The Standard Double meets good design and honest value — a room that gives you everything you need and nothing you don\'t.',
    features: ['King size or twin beds', 'Balcony', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Garden view',
    image: '/images/standard.jpg',
    images: ['/images/gallery/stand.double.jpg', ...BATHROOM_IMAGES],
  },
  {
    slug: 'deluxe-double-mv-pv',
    title: 'Deluxe Double',
    tagline: 'A Room That Earns Its View',
    size: '27 m²',
    shortDesc: 'Mountain or pool view from a generous private balcony. The Deluxe Double is where you spend a morning with coffee and no particular plan, watching the hills or the water below. Refined furnishings, premium Oceanis amenities, and a room that feels larger than its category suggests.',
    features: ['King size or twin beds', 'Balcony with view', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Mountain or pool view',
    image: '/images/deluxe%20double.jpg',
    images: ['/images/gallery/deluxe%20doubl.jpg', ...DELUXE_DOUBLE_IMAGES],
  },
  {
    slug: 'deluxe-double-private-pool',
    title: 'Deluxe Double with Sharing Pool',
    tagline: 'Your Own Water, Your Own Hours',
    size: '22 m²',
    shortDesc: 'Step outside and the pool is waiting. Ideal for guests who want the resort experience at its most exclusive, with seamless access to a shared pool. Elegant interiors open directly to the water, and the day becomes entirely yours to arrange.',
    features: ['King size or twin beds', 'Sharing pool', 'Balcony', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Sharing pool',
    image: '/images/del.double.jpg',
    images: ['/images/gallery/deluxe%20doubl.jpg', ...DELUXE_DOUBLE_IMAGES],
  },
  {
    slug: 'superior-sea-view',
    title: 'Superior Sea View',
    tagline: 'The Gulf, Uninterrupted',
    size: '27 m²',
    shortDesc: 'The most expansive room category at Althea, designed around one thing: the view. A generous private terrace looks out over the Corinthian Gulf with nothing in the way. This is the room for those who came here for the sea and want it always in front of them.',
    features: ['King size or twin beds', 'Sea view', 'Terrace or Balcony', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Sea view',
    image: '/images/superior%20sea%20view.jpg',
    images: ['/images/gallery/Superior%20sv.jpg', ...BATHROOM_IMAGES],
  },
  {
    slug: 'junior-suite-private-pool',
    title: 'Junior Suite with Private Pool',
    tagline: 'More Space. More Water. More Time.',
    size: '27 m²',
    shortDesc: 'The Junior Suite raises the experience in every direction. Elevated finishes, a private pool, and the kind of space that makes you rearrange your plans and stay closer to the room than you expected. One of the most requested accommodations at Althea, and it\'s easy to understand why.',
    features: ['King size or twin beds', '1 bedroom', '1 living room', 'Private pool', 'Balcony with view', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Soundproofing'],
    view: 'Private pool & views',
    image: '/images/Junior%20suite%20.jpg',
    images: ['/images/gallery/JSPOOL.jpg', ...BATHROOM_IMAGES],
  },
  {
    slug: 'althea-loft-suite',
    title: 'Althea Loft Suite Outdoor Jacuzzi',
    tagline: 'The One Room That Changes Everything',
    size: '45 m²',
    shortDesc: 'Two levels. A sky-lit upper bedroom. Dramatic views of the Corinthian Gulf. And outside, a private jacuzzi that makes the evening something to look forward to all day. The Althea Loft Suite is the signature room of the resort — an architectural statement that also happens to be the most comfortable place in Corinthia to do absolutely nothing.',
    features: ['King size or twin beds', '1 bedroom', '1 living room with sofa bed', 'Outdoor Jacuzzi', 'Balcony with view', 'Ensuite bathroom', 'Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Soundproofing'],
    view: 'Panoramic Gulf views',
    image: '/images/js%20living%20room.jpg',
    images: [
      '/images/gallery/loft%20for%202..jpg',
      '/images/gallery/loft%20for%202....jpg',
      '/images/gallery/loft%20for%204.jpg',
      '/images/gallery/loft%20for%204-.jpg',
      ...BATHROOM_IMAGES,
    ],
    featured: true,
  },
]
