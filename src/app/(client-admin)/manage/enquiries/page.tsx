import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@payload-config'
import type { ManageLocale } from '@/lib/manage-i18n'
import { getLocale } from '@/lib/manage-i18n'

export default async function ManageEnquiries({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string; status?: string; page?: string }>
}) {
  const cookieStore = await cookies()
  const resolvedParams = await searchParams
  const locale: ManageLocale = getLocale(
    resolvedParams?.locale ?? cookieStore.get('manage-locale')?.value
  )

  const statusFilter = resolvedParams?.status
  const page = parseInt(resolvedParams?.page || '1', 10)

  const payload = await getPayload({ config })
  const { docs: enquiries, totalDocs, totalPages } = await payload.find({
    collection: 'form-submissions',
    limit: 20,
    page,
    sort: '-createdAt',
    where: statusFilter ? { status: { equals: statusFilter } } : undefined,
    depth: 0,
  })

  const newCount = await payload.find({
    collection: 'form-submissions',
    where: { status: { equals: 'new' } },
    limit: 0,
  })

  const statuses = [
    { value: '', label: locale === 'el' ? 'Όλα' : 'All', count: totalDocs },
    { value: 'new', label: locale === 'el' ? 'Νέα' : 'New', count: newCount.totalDocs },
  ]

  const labels = {
    en: {
      title: 'Enquiries',
      sub: 'All contact form submissions and guest enquiries.',
      from: 'From',
      type: 'Type',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      viewDetails: 'View in CMS',
      noItems: 'No enquiries yet.',
      new: 'New',
      read: 'Read',
      replied: 'Replied',
      archived: 'Archived',
    },
    el: {
      title: 'Αιτήματα',
      sub: 'Όλες οι υποβολές φορμών επικοινωνίας.',
      from: 'Από',
      type: 'Τύπος',
      status: 'Κατάσταση',
      date: 'Ημερομηνία',
      actions: 'Ενέργειες',
      viewDetails: 'Προβολή στο CMS',
      noItems: 'Δεν υπάρχουν αιτήματα.',
      new: 'Νέο',
      read: 'Αναγνωσμένο',
      replied: 'Απαντήθηκε',
      archived: 'Αρχείο',
    },
  }[locale]

  const formTypeLabel: Record<string, Record<string, string>> = {
    contact: { en: 'Contact', el: 'Επικοινωνία' },
    reservation: { en: 'Reservation', el: 'Κράτηση' },
    wedding: { en: 'Wedding', el: 'Γάμος' },
    corporate: { en: 'Corporate', el: 'Εταιρικό' },
    restaurant: { en: 'Restaurant', el: 'Εστιατόριο' },
    general: { en: 'General', el: 'Γενικό' },
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#102027]">{labels.title}</h1>
          <p className="text-[#6b6b6b] text-sm mt-1">{labels.sub}</p>
        </div>
        {newCount.totalDocs > 0 && (
          <span className="bg-[#ad8b27] text-white text-sm font-medium px-3 py-1 rounded-full">
            {newCount.totalDocs} {labels.new}
          </span>
        )}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6">
        {statuses.map((s) => (
          <a
            key={s.value}
            href={`/manage/enquiries?locale=${locale}${s.value ? `&status=${s.value}` : ''}`}
            className={[
              'text-sm px-3 py-1.5 rounded-lg border transition-colors',
              (statusFilter || '') === s.value
                ? 'bg-[#102027] text-white border-[#102027]'
                : 'bg-white text-[#6b6b6b] border-[#e8e4dd] hover:border-[#102027]/30',
            ].join(' ')}
          >
            {s.label}
          </a>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#e8e4dd] overflow-hidden">
        <div className="divide-y divide-[#e8e4dd]">
          {(enquiries as any[]).map((enq) => (
            <div key={enq.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-[#102027]">{enq.name}</span>
                    <span className="text-xs text-[#6b6b6b]">·</span>
                    <span className="text-xs text-[#6b6b6b]">{enq.email}</span>
                    {enq.phone && (
                      <>
                        <span className="text-xs text-[#6b6b6b]">·</span>
                        <span className="text-xs text-[#6b6b6b]">{enq.phone}</span>
                      </>
                    )}
                  </div>
                  {enq.subject && (
                    <p className="text-sm text-[#102027] mb-1">{enq.subject}</p>
                  )}
                  <p className="text-sm text-[#6b6b6b] line-clamp-2">{enq.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <StatusBadge status={enq.status} locale={locale} />
                  <span className="text-xs text-[#6b6b6b]">
                    {new Date(enq.createdAt).toLocaleDateString(
                      locale === 'el' ? 'el-GR' : 'en-GB',
                      { day: 'numeric', month: 'short', year: 'numeric' }
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs bg-[#f2f8fb] text-[#35657a] px-2 py-0.5 rounded-full">
                  {formTypeLabel[enq.formType]?.[locale] ?? enq.formType}
                </span>
                <a
                  href={`/admin/collections/form-submissions/${enq.id}`}
                  target="_blank"
                  className="text-xs text-[#ad8b27] font-medium hover:underline"
                >
                  {labels.viewDetails} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {enquiries.length === 0 && (
          <div className="py-12 text-center text-[#6b6b6b] text-sm">{labels.noItems}</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-[#6b6b6b]">
            {locale === 'el' ? `${totalDocs} αιτήματα` : `${totalDocs} enquiries`}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <a
                href={`/manage/enquiries?locale=${locale}&page=${page - 1}${statusFilter ? `&status=${statusFilter}` : ''}`}
                className="px-3 py-1.5 border border-[#e8e4dd] rounded-lg hover:bg-[#faf8f4] text-[#102027]"
              >
                ← {locale === 'el' ? 'Προηγούμενη' : 'Previous'}
              </a>
            )}
            {page < totalPages && (
              <a
                href={`/manage/enquiries?locale=${locale}&page=${page + 1}${statusFilter ? `&status=${statusFilter}` : ''}`}
                className="px-3 py-1.5 border border-[#e8e4dd] rounded-lg hover:bg-[#faf8f4] text-[#102027]"
              >
                {locale === 'el' ? 'Επόμενη' : 'Next'} →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status, locale }: { status: string; locale: ManageLocale }) {
  const config: Record<string, { style: string; en: string; el: string }> = {
    new: { style: 'bg-blue-50 text-blue-700', en: 'New', el: 'Νέο' },
    read: { style: 'bg-gray-100 text-gray-600', en: 'Read', el: 'Αναγνωσμένο' },
    replied: { style: 'bg-green-50 text-green-700', en: 'Replied', el: 'Απαντήθηκε' },
    archived: { style: 'bg-gray-50 text-gray-400', en: 'Archived', el: 'Αρχείο' },
  }
  const c = config[status] || config.read
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.style}`}>
      {c[locale]}
    </span>
  )
}
