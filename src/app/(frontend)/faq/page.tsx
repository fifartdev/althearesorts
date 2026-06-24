import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { FaqClient } from './FaqClient'
import { faqs } from './faqData'

export const metadata = genMeta({
  title: 'Frequently Asked Questions',
  description: 'Answers to the most common questions about Althea Resorts — check-in times, rooms, spa, dining, location, and bookings. 60 minutes from Athens, Corinthia, Greece.',
  keywords: ['Althea Resorts FAQ', 'hotel questions Corinthia', 'check-in time Althea', 'Ocean Spa booking'],
  canonical: `${SITE_URL}/faq`,
})

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap((category) =>
    category.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    }))
  ),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  )
}
