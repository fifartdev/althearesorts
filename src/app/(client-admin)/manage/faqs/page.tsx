import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@payload-config'
import type { ManageLocale } from '@/lib/manage-i18n'
import { getLocale } from '@/lib/manage-i18n'

export default async function ManageFAQs({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string; category?: string }>
}) {
  const cookieStore = await cookies()
  const resolvedParams = await searchParams
  const locale: ManageLocale = getLocale(
    resolvedParams?.locale ?? cookieStore.get('manage-locale')?.value
  )

  const categoryFilter = resolvedParams?.category

  const payload = await getPayload({ config })
  const { docs: faqs, totalDocs } = await payload.find({
    collection: 'faqs',
    limit: 100,
    sort: 'order',
    where: categoryFilter ? { category: { equals: categoryFilter } } : undefined,
    depth: 0,
  })

  const categories = [
    { value: '', label: locale === 'el' ? 'Όλα' : 'All', en: 'All', el: 'Όλα' },
    { value: 'rooms', label: 'Rooms', en: 'Rooms & Rates', el: 'Δωμάτια & Τιμές' },
    { value: 'checkin', label: 'Check-in', en: 'Check-in & Check-out', el: 'Check-in & Check-out' },
    { value: 'dining', label: 'Dining', en: 'Dining', el: 'Γαστρονομία' },
    { value: 'spa', label: 'Spa', en: 'Spa & Wellness', el: 'Σπα' },
    { value: 'location', label: 'Location', en: 'Getting Here', el: 'Πρόσβαση' },
    { value: 'reservations', label: 'Reservations', en: 'Reservations', el: 'Κρατήσεις' },
    { value: 'general', label: 'General', en: 'General', el: 'Γενικά' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#102027]">
            {locale === 'el' ? 'Συχνές Ερωτήσεις' : 'FAQs'}
          </h1>
          <p className="text-[#6b6b6b] text-sm mt-1">
            {totalDocs} {locale === 'el' ? 'ερωτήσεις' : 'questions'}
          </p>
        </div>
        <a
          href="/admin/collections/faqs/create"
          target="_blank"
          className="bg-[#ad8b27] hover:bg-[#9a7d22] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + {locale === 'el' ? 'Νέα ερώτηση' : 'Add FAQ'}
        </a>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <a
            key={cat.value}
            href={`/manage/faqs?locale=${locale}${cat.value ? `&category=${cat.value}` : ''}`}
            className={[
              'text-sm px-3 py-1.5 rounded-lg border transition-colors',
              (categoryFilter || '') === cat.value
                ? 'bg-[#102027] text-white border-[#102027]'
                : 'bg-white text-[#6b6b6b] border-[#e8e4dd] hover:border-[#102027]/30',
            ].join(' ')}
          >
            {cat[locale]}
          </a>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#e8e4dd] divide-y divide-[#e8e4dd]">
        {(faqs as any[]).map((faq, i) => (
          <div key={faq.id} className="px-5 py-4 flex items-start gap-4">
            <span className="text-xs text-[#6b6b6b] w-5 shrink-0 pt-0.5">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#102027]">{faq.question}</p>
              <span className="text-xs text-[#6b6b6b] capitalize mt-0.5 inline-block">
                {categories.find((c) => c.value === faq.category)?.[locale] ?? faq.category ?? '—'}
              </span>
            </div>
            <a
              href={`/admin/collections/faqs/${faq.id}`}
              target="_blank"
              className="text-xs text-[#ad8b27] font-medium hover:underline shrink-0"
            >
              {locale === 'el' ? 'Επεξεργασία' : 'Edit'} →
            </a>
          </div>
        ))}
        {faqs.length === 0 && (
          <div className="py-12 text-center text-[#6b6b6b] text-sm">
            {locale === 'el' ? 'Δεν υπάρχουν ερωτήσεις.' : 'No FAQs yet.'}
          </div>
        )}
      </div>

      <p className="text-xs text-[#6b6b6b] mt-4">
        {locale === 'el'
          ? 'Για να αλλάξετε τη σειρά, αλλάξτε τον αριθμό "Order" σε κάθε ερώτηση στο CMS.'
          : 'To reorder FAQs, change the "Order" number on each FAQ in the full CMS.'}
      </p>
    </div>
  )
}
