import { getContactInfo, getBookingSettings, getRooms, getDining, getSiteSettings } from '@/lib/cms'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const [contactInfo, bookingSettings, rooms, dining, siteSettings] = await Promise.all([
    getContactInfo().catch(() => null),
    getBookingSettings().catch(() => null),
    getRooms('en').catch(() => []),
    getDining('en').catch(() => []),
    getSiteSettings().catch(() => null),
  ])

  const c = contactInfo as any
  const b = bookingSettings as any
  const s = siteSettings as any

  const siteName = s?.siteName || 'Althea Resorts'
  const bookingUrl = b?.bookingEngineUrl || 'https://althearesort.reserve-online.net'
  const phone: string = c?.phone || ''
  const email: string = c?.email || ''
  const address: string = c?.address || 'Ano Loutro, Xylokastro 20400, Corinthia, Greece'

  const roomLines = (rooms as any[]).length > 0
    ? (rooms as any[]).map((r: any) => `- [${r.title}](${SITE_URL}/accommodation/${r.slug})`).join('\n')
    : [
        `- [Standard Double](${SITE_URL}/accommodation/standard-double)`,
        `- [Deluxe Double](${SITE_URL}/accommodation/deluxe-double-mv-pv)`,
        `- [Deluxe Double with Sharing Pool](${SITE_URL}/accommodation/deluxe-double-private-pool)`,
        `- [Superior Sea View](${SITE_URL}/accommodation/superior-sea-view)`,
        `- [Junior Suite with Private Pool](${SITE_URL}/accommodation/junior-suite-private-pool)`,
        `- [Althea Loft Suite Outdoor Jacuzzi](${SITE_URL}/accommodation/althea-loft-suite)`,
      ].join('\n')

  const diningLines = (dining as any[]).length > 0
    ? (dining as any[]).map((d: any) => d.name || d.title).filter(Boolean).join(', ')
    : 'AITHER rooftop restaurant, Lobby Bar, Pool Bar, Beach Bar, Main Restaurant'

  const contactLine = [phone, email, address].filter(Boolean).join(' · ')

  const body = `# ${siteName}

> ${siteName} is a 5-star luxury boutique hotel in Ano Loutro, Xylokastro, Corinthia, Greece — 60 minutes from Athens. The property features 41 rooms and suites with Corinthian Gulf views, the Ocean Spa by Oceanis, and rooftop restaurant AITHER. Direct bookings: ${bookingUrl}

## Rooms & Suites

${roomLines}

## Experiences & Facilities

- [Experiences](${SITE_URL}/experiences): Swimming pool, spa, weddings, conferences, outdoor activities
- [Ocean Spa](${SITE_URL}/spa): Oceanis wellness treatments, hammam, 3 treatment cabins
- [Gastronomy](${SITE_URL}/gastronomy): ${diningLines}

## Information

- [About ${siteName}](${SITE_URL}/about)
- [Location](${SITE_URL}/location): Ano Loutro, Xylokastro, Corinthia — 60 min from Athens, near Ancient Corinth and the Corinthian Gulf
- [Photo Gallery](${SITE_URL}/gallery)
- [Special Offers](${SITE_URL}/offers): ${b?.directBookingDiscount ? `${b.directBookingDiscount}%` : '10%'} direct booking discount
- [Frequently Asked Questions](${SITE_URL}/faq)
- [Journal](${SITE_URL}/journal)${contactLine ? `\n- [Contact](${SITE_URL}/contact): ${contactLine}` : ''}

## Greek Language Version

- [Αρχική (Home)](${SITE_URL}/el)
- [Διαμονή (Accommodation)](${SITE_URL}/el/accommodation)
- [Εμπειρίες (Experiences)](${SITE_URL}/el/experiences)
- [Ocean Spa](${SITE_URL}/el/spa)
- [Γαστρονομία (Gastronomy)](${SITE_URL}/el/gastronomy)
- [Συλλογή (Gallery)](${SITE_URL}/el/gallery)
- [Σχετικά (About)](${SITE_URL}/el/about)
- [Τοποθεσία (Location)](${SITE_URL}/el/location)
- [Προσφορές (Offers)](${SITE_URL}/el/offers)
- [Επικοινωνία (Contact)](${SITE_URL}/el/contact)
- [Συχνές Ερωτήσεις (FAQ)](${SITE_URL}/el/faq)

## Optional

- [Privacy Policy](${SITE_URL}/privacy-policy)
- [Terms & Conditions](${SITE_URL}/terms)
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
