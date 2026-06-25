import { getPayload } from 'payload'
import { headers, cookies } from 'next/headers'
import config from '@payload-config'
import type { ManageLocale } from '@/lib/manage-i18n'
import { useTranslations, getLocale } from '@/lib/manage-i18n'

export default async function ManageDashboard({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string }>
}) {
  const cookieStore = await cookies()
  const resolvedParams = await searchParams
  const locale: ManageLocale = getLocale(
    resolvedParams?.locale ?? cookieStore.get('manage-locale')?.value
  )
  const tr = useTranslations(locale)

  const payload = await getPayload({ config })

  const [rooms, offers, journal, faqs, gallery, enquiries, testimonials] = await Promise.all([
    payload.find({ collection: 'rooms', limit: 0 }),
    payload.find({ collection: 'offers', limit: 0 }),
    payload.find({ collection: 'journal', limit: 0 }),
    payload.find({ collection: 'faqs', limit: 0 }),
    payload.find({ collection: 'gallery', limit: 0 }),
    payload.find({ collection: 'form-submissions', limit: 5, sort: '-createdAt' }),
    payload.find({ collection: 'testimonials', limit: 0 }),
  ])

  const newEnquiries = await payload.find({
    collection: 'form-submissions',
    where: { status: { equals: 'new' } },
    limit: 0,
  })

  const stats = [
    { label: tr.nav.rooms, count: rooms.totalDocs, href: '/manage/rooms', color: 'bg-[#102027]' },
    { label: tr.nav.gallery, count: gallery.totalDocs, href: '/manage/gallery', color: 'bg-[#35657a]' },
    { label: tr.nav.offers, count: offers.totalDocs, href: '/manage/offers', color: 'bg-[#ad8b27]' },
    { label: tr.nav.journal, count: journal.totalDocs, href: '/manage/journal', color: 'bg-[#102027]' },
    { label: tr.nav.faqs, count: faqs.totalDocs, href: '/manage/faqs', color: 'bg-[#35657a]' },
    { label: tr.nav.testimonials, count: testimonials.totalDocs, href: '/manage/testimonials', color: 'bg-[#6b6b6b]' },
    {
      label: tr.nav.enquiries,
      count: enquiries.totalDocs,
      badge: newEnquiries.totalDocs > 0 ? newEnquiries.totalDocs : undefined,
      href: '/manage/enquiries',
      color: 'bg-[#ad8b27]',
    },
  ]

  const recentEnquiries = enquiries.docs as any[]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#102027]">{tr.dashboard.title}</h1>
        <p className="text-[#6b6b6b] text-sm mt-1">{tr.dashboard.subtitle}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <a
            key={s.href}
            href={`${s.href}?locale=${locale}`}
            className="group bg-white rounded-xl border border-[#e8e4dd] p-5 hover:border-[#ad8b27]/40 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-2 h-2 rounded-full ${s.color} mt-1`} />
              {s.badge !== undefined && (
                <span className="bg-[#ad8b27] text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                  {s.badge} new
                </span>
              )}
            </div>
            <p className="text-3xl font-semibold text-[#102027]">{s.count}</p>
            <p className="text-[#6b6b6b] text-sm mt-0.5">{s.label}</p>
          </a>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <QuickAction
          title={locale === 'el' ? 'Άνοιγμα πλήρους CMS' : 'Open full CMS'}
          description={
            locale === 'el'
              ? 'Πλήρης πρόσβαση για σύνθετη επεξεργασία περιεχομένου, ρυθμίσεις SEO, και διαχείριση πολυμέσων.'
              : 'Full access for advanced content editing, SEO settings, and media management.'
          }
          href="/admin"
          external
          cta={locale === 'el' ? 'Άνοιγμα CMS ↗' : 'Open CMS ↗'}
        />
        <QuickAction
          title={locale === 'el' ? 'Προβολή ιστοσελίδας' : 'View live site'}
          description={
            locale === 'el'
              ? 'Δείτε την ιστοσελίδα όπως την βλέπουν οι επισκέπτες.'
              : 'See the website exactly as guests see it.'
          }
          href="https://althearesorts.com"
          external
          cta={locale === 'el' ? 'Άνοιγμα ιστοσελίδας ↗' : 'View site ↗'}
        />
      </div>

      {/* Recent enquiries */}
      {recentEnquiries.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#102027]">
              {locale === 'el' ? 'Πρόσφατα αιτήματα' : 'Recent enquiries'}
            </h2>
            <a
              href={`/manage/enquiries?locale=${locale}`}
              className="text-sm text-[#ad8b27] hover:underline"
            >
              {locale === 'el' ? 'Προβολή όλων →' : 'View all →'}
            </a>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e4dd] divide-y divide-[#e8e4dd]">
            {recentEnquiries.map((enq) => (
              <div key={enq.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#102027] truncate">{enq.name}</p>
                  <p className="text-xs text-[#6b6b6b] truncate">{enq.email}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={enq.status} locale={locale} />
                  <span className="text-xs text-[#6b6b6b]">
                    {new Date(enq.createdAt).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-GB')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function QuickAction({
  title,
  description,
  href,
  cta,
  external,
}: {
  title: string
  description: string
  href: string
  cta: string
  external?: boolean
}) {
  return (
    <div className="bg-white rounded-xl border border-[#e8e4dd] p-6">
      <h3 className="font-semibold text-[#102027] mb-1">{title}</h3>
      <p className="text-sm text-[#6b6b6b] mb-4">{description}</p>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-sm text-[#ad8b27] font-medium hover:underline"
      >
        {cta}
      </a>
    </div>
  )
}

function StatusBadge({ status, locale }: { status: string; locale: ManageLocale }) {
  const styles: Record<string, string> = {
    new: 'bg-blue-50 text-blue-700',
    read: 'bg-gray-100 text-gray-600',
    replied: 'bg-green-50 text-green-700',
    archived: 'bg-gray-50 text-gray-400',
  }
  const labels: Record<string, Record<string, string>> = {
    new: { en: 'New', el: 'Νέο' },
    read: { en: 'Read', el: 'Αναγνωσμένο' },
    replied: { en: 'Replied', el: 'Απαντήθηκε' },
    archived: { en: 'Archived', el: 'Αρχείο' },
  }
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[status] || 'bg-gray-100 text-gray-600'}`}
    >
      {labels[status]?.[locale] ?? status}
    </span>
  )
}
