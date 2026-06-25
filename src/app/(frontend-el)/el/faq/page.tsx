import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { getFAQs } from '@/lib/cms'
import { FaqClient } from './FaqClient'
import { faqs as staticFaqs, type FaqCategory } from './faqData'

export const metadata = genMeta({
  title: 'Συχνές Ερωτήσεις',
  description: 'Απαντήσεις στις πιο συνηθισμένες ερωτήσεις για την Althea Resorts — ώρες check-in, δωμάτια, spa, γαστρονομία, τοποθεσία και κρατήσεις. 60 λεπτά από Αθήνα, Κορινθία.',
  keywords: ['Althea Resorts FAQ', 'ερωτήσεις ξενοδοχείο Κορινθία', 'ώρα check-in Althea', 'Ocean Spa κράτηση'],
  canonical: `${SITE_URL}/el/faq`,
})

const CATEGORY_LABELS: Record<string, string> = {
  'check-in-out':   'Check-in & Check-out',
  'rooms':          'Δωμάτια',
  'spa':            'Ocean Spa',
  'gastronomy':     'Γαστρονομία',
  'location':       'Τοποθεσία',
  'bookings':       'Κρατήσεις',
}

export default async function GreekFAQPage() {
  const docs = await getFAQs('el')

  const categories: FaqCategory[] = docs.length > 0
    ? Object.entries(
        docs.reduce((acc: Record<string, { q: string; a: string }[]>, item: any) => {
          const cat = CATEGORY_LABELS[item.category] ?? item.category ?? 'Γενικά'
          if (!acc[cat]) acc[cat] = []
          acc[cat].push({ q: item.question ?? '', a: item.answer ?? '' })
          return acc
        }, {})
      ).map(([category, items]) => ({ category, items }))
    : staticFaqs

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((category) =>
      category.items.map((item) => ({
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
      <FaqClient categories={categories} />
    </>
  )
}
