import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { FaqClient } from './FaqClient'
import { faqs } from './faqData'

export const metadata = genMeta({
  title: 'Συχνές Ερωτήσεις',
  description: 'Απαντήσεις στις πιο συνηθισμένες ερωτήσεις για την Althea Resorts — ώρες check-in, δωμάτια, spa, γαστρονομία, τοποθεσία και κρατήσεις. 60 λεπτά από Αθήνα, Κορινθία.',
  keywords: ['Althea Resorts FAQ', 'ερωτήσεις ξενοδοχείο Κορινθία', 'ώρα check-in Althea', 'Ocean Spa κράτηση'],
  canonical: `${SITE_URL}/el/faq`,
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

export default function GreekFAQPage() {
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
