import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@payload-config'
import type { ManageLocale } from '@/lib/manage-i18n'
import { getLocale } from '@/lib/manage-i18n'

export default async function ManageRooms({
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
  const { docs: rooms } = await payload.find({
    collection: 'rooms',
    limit: 50,
    sort: 'title',
    depth: 0,
  })

  const labels = {
    en: {
      title: 'Rooms & Suites',
      sub: 'Manage your room listings, descriptions, and availability.',
      name: 'Room',
      size: 'Size',
      category: 'Category',
      status: 'Status',
      edit: 'Edit in CMS',
      viewPage: 'View page',
      featured: 'Featured',
    },
    el: {
      title: 'Δωμάτια & Σουίτες',
      sub: 'Διαχειριστείτε τις καταχωρίσεις, περιγραφές και διαθεσιμότητα των δωματίων.',
      name: 'Δωμάτιο',
      size: 'Μέγεθος',
      category: 'Κατηγορία',
      status: 'Κατάσταση',
      edit: 'Επεξεργασία στο CMS',
      viewPage: 'Προβολή σελίδας',
      featured: 'Προτεινόμενο',
    },
  }[locale]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#102027]">{labels.title}</h1>
          <p className="text-[#6b6b6b] text-sm mt-1">{labels.sub}</p>
        </div>
        <a
          href="/admin/collections/rooms/create"
          target="_blank"
          className="bg-[#ad8b27] hover:bg-[#9a7d22] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + {locale === 'el' ? 'Νέο δωμάτιο' : 'Add room'}
        </a>
      </div>

      <div className="bg-white rounded-xl border border-[#e8e4dd] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e4dd] bg-[#faf8f4]">
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b]">{labels.name}</th>
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b] hidden sm:table-cell">{labels.size}</th>
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b] hidden md:table-cell">{labels.status}</th>
              <th className="text-right px-5 py-3 font-medium text-[#6b6b6b]">{locale === 'el' ? 'Ενέργειες' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e4dd]">
            {(rooms as any[]).map((room) => (
              <tr key={room.id} className="hover:bg-[#faf8f4] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#102027]">{room.title}</span>
                    {room.featured && (
                      <span className="text-xs bg-[#ad8b27]/10 text-[#ad8b27] px-2 py-0.5 rounded-full">
                        {labels.featured}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6b6b6b] mt-0.5 hidden sm:block">{room.tagline}</p>
                </td>
                <td className="px-5 py-4 text-[#6b6b6b] hidden sm:table-cell">{room.size || '—'}</td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <StatusPill status={room._status} locale={locale} />
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <a
                      href={`/accommodation/${room.slug}`}
                      target="_blank"
                      className="text-xs text-[#6b6b6b] hover:text-[#102027] transition-colors"
                    >
                      {labels.viewPage} ↗
                    </a>
                    <a
                      href={`/admin/collections/rooms/${room.id}`}
                      target="_blank"
                      className="text-xs text-[#ad8b27] font-medium hover:underline"
                    >
                      {labels.edit} →
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rooms.length === 0 && (
          <div className="py-12 text-center text-[#6b6b6b] text-sm">
            {locale === 'el' ? 'Δεν υπάρχουν δωμάτια.' : 'No rooms yet.'}
          </div>
        )}
      </div>
    </div>
  )
}

function StatusPill({ status, locale }: { status: string; locale: ManageLocale }) {
  const isPublished = status === 'published'
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
        isPublished
          ? 'bg-green-50 text-green-700'
          : 'bg-yellow-50 text-yellow-700'
      }`}
    >
      {isPublished
        ? locale === 'el' ? 'Δημοσιευμένο' : 'Published'
        : locale === 'el' ? 'Πρόχειρο' : 'Draft'}
    </span>
  )
}
