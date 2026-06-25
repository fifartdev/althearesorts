import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@payload-config'
import type { ManageLocale } from '@/lib/manage-i18n'
import { getLocale } from '@/lib/manage-i18n'

export default async function ManageTestimonials({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string }>
}) {
  const cookieStore = await cookies()
  const resolvedParams = await searchParams
  const locale: ManageLocale = getLocale(
    resolvedParams?.locale ?? cookieStore.get('manage-locale')?.value
  )

  const payload = await getPayload({ config })
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    limit: 50,
    sort: '-updatedAt',
    depth: 0,
  })

  const sourceLabels: Record<string, string> = {
    google: 'Google',
    booking: 'Booking.com',
    tripadvisor: 'TripAdvisor',
    direct: locale === 'el' ? 'Απευθείας' : 'Direct',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#102027]">
            {locale === 'el' ? 'Αξιολογήσεις Επισκεπτών' : 'Guest Testimonials'}
          </h1>
          <p className="text-[#6b6b6b] text-sm mt-1">
            {locale === 'el'
              ? 'Διαχειριστείτε και προβάλλετε κριτικές επισκεπτών.'
              : 'Manage and curate guest reviews.'}
          </p>
        </div>
        <a
          href="/admin/collections/testimonials/create"
          target="_blank"
          className="bg-[#ad8b27] hover:bg-[#9a7d22] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + {locale === 'el' ? 'Νέα αξιολόγηση' : 'Add testimonial'}
        </a>
      </div>

      <div className="grid gap-4">
        {(testimonials as any[]).map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-[#e8e4dd] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          parseInt(t.rating) >= star ? 'text-[#ad8b27]' : 'text-[#e8e4dd]'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {t.featured && (
                    <span className="text-xs bg-[#ad8b27]/10 text-[#ad8b27] px-2 py-0.5 rounded-full">
                      {locale === 'el' ? 'Προτεινόμενο' : 'Featured'}
                    </span>
                  )}
                  {t.source && (
                    <span className="text-xs text-[#6b6b6b] bg-[#faf8f4] px-2 py-0.5 rounded-full">
                      {sourceLabels[t.source] ?? t.source}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#102027] italic mb-3 line-clamp-3">"{t.quote}"</p>
                <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                  <span className="font-medium text-[#102027]">{t.authorName}</span>
                  {t.authorOrigin && <span>· {t.authorOrigin}</span>}
                  {t.roomStayed && <span>· {t.roomStayed}</span>}
                  {t.stayDate && <span>· {t.stayDate}</span>}
                </div>
              </div>
              <a
                href={`/admin/collections/testimonials/${t.id}`}
                target="_blank"
                className="text-xs text-[#ad8b27] font-medium hover:underline shrink-0"
              >
                {locale === 'el' ? 'Επεξεργασία' : 'Edit'} →
              </a>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="bg-white rounded-xl border border-[#e8e4dd] py-12 text-center text-sm text-[#6b6b6b]">
            {locale === 'el' ? 'Δεν υπάρχουν αξιολογήσεις.' : 'No testimonials yet.'}
          </div>
        )}
      </div>
    </div>
  )
}
