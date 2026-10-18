import React from 'react'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { getItems, getPage, getSettings, getTerms } from '@/lib/wp/api'
import type { Locale } from '@/lib/wp/schema-types'
import { FaqView, type FaqViewCategory } from './FaqView'

/** FAQ page: FAQPage JSON-LD + content resolved on the server; tabs/accordion in FaqView (client). */
export async function FaqPage({ locale }: { locale: Locale }) {
  const [c, faqs, terms, settings] = await Promise.all([
    getPage('faq'),
    getItems('althea_faq'),
    getTerms('althea_faq_cat', 'althea_faq'),
    getSettings(),
  ])
  const categories: FaqViewCategory[] = terms
    .map((t) => ({
      category: locale === 'el' ? t.name_el : t.name,
      items: faqs
        .filter((f) => f.terms.althea_faq_cat.some((x) => x.slug === t.slug))
        .map((f) => ({ q: f.fields.question[locale], a: f.fields.answer[locale] })),
    }))
    .filter((cat) => cat.items.length > 0)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((category) =>
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqView
        ariaLabel={locale === 'el' ? 'Συχνές Ερωτήσεις' : 'FAQ'}
        label={c.hero.label[locale]}
        heading={c.hero.heading[locale]}
        intro={c.hero.intro[locale]}
        phone={settings.phone}
        email={settings.email_reservations}
        bookingUrl={settings.booking_url}
        categories={categories}
        footer={{ heading: c.footer.heading[locale], body: c.footer.body[locale], call: c.footer.call_label[locale], book: c.footer.book_label[locale] }}
        finalCta={<FinalBookingCTA locale={locale} />}
      />
    </>
  )
}
