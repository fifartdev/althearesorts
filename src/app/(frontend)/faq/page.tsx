import { generateMetadata as genMeta, SITE_URL } from '@/lib/seo'
import { getFAQs, getContactInfo, getBookingSettings } from '@/lib/cms'
import { FaqClient } from './FaqClient'
import { faqs as staticFaqs, type FaqCategory } from './faqData'

export const metadata = genMeta({
  title: 'Frequently Asked Questions',
  description: 'Answers to the most common questions about Althea Resorts — check-in times, rooms, spa, dining, location, and bookings. 60 minutes from Athens, Corinthia, Greece.',
  keywords: ['Althea Resorts FAQ', 'hotel questions Corinthia', 'check-in time Althea', 'Ocean Spa booking'],
  canonical: `${SITE_URL}/faq`,
})

const CATEGORY_LABELS: Record<string, string> = {
  rooms: 'Rooms & Rates',
  checkin: 'Check-in & Check-out',
  dining: 'Dining',
  spa: 'Spa & Wellness',
  family: 'Pets & Children',
  location: 'Getting Here',
  reservations: 'Reservations',
  general: 'General',
}

export default async function FAQPage() {
  const [docs, contactInfo, bookingSettings] = await Promise.all([
    getFAQs('en'),
    getContactInfo(),
    getBookingSettings(),
  ])
  const phone: string | undefined = (contactInfo as any)?.phone || undefined
  const email: string | undefined = (contactInfo as any)?.email || undefined
  const bookingUrl: string | undefined = (bookingSettings as any)?.bookingEngineUrl || undefined

  const categories: FaqCategory[] = docs.length > 0
    ? Object.entries(
        docs.reduce((acc: Record<string, { q: string; a: string }[]>, item: any) => {
          const cat = CATEGORY_LABELS[item.category] ?? item.category ?? 'General'
          if (!acc[cat]) acc[cat] = []
          acc[cat].push({ q: item.question ?? '', a: item.answer ?? '' })
          return acc
        }, {})
      ).map(([category, items]) => ({ category, items }))
    : staticFaqs

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient categories={categories} phone={phone} email={email} bookingUrl={bookingUrl} />
    </>
  )
}
