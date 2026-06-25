import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@payload-config'
import type { ManageLocale } from '@/lib/manage-i18n'
import { getLocale } from '@/lib/manage-i18n'

export default async function ManageOffers({
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
  const { docs: offers } = await payload.find({
    collection: 'offers',
    limit: 50,
    sort: '-createdAt',
    depth: 0,
  })

  const labels = {
    en: {
      title: 'Special Offers',
      sub: 'Manage promotional offers and discount campaigns.',
      add: 'Add offer',
      offer: 'Offer',
      validUntil: 'Valid until',
      status: 'Status',
      edit: 'Edit in CMS',
    },
    el: {
      title: 'Ειδικές Προσφορές',
      sub: 'Διαχειριστείτε προωθητικές προσφορές και εκπτωτικές καμπάνιες.',
      add: 'Νέα προσφορά',
      offer: 'Προσφορά',
      validUntil: 'Ισχύει έως',
      status: 'Κατάσταση',
      edit: 'Επεξεργασία στο CMS',
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
          href="/admin/collections/offers/create"
          target="_blank"
          className="bg-[#ad8b27] hover:bg-[#9a7d22] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + {labels.add}
        </a>
      </div>

      <div className="bg-white rounded-xl border border-[#e8e4dd] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e4dd] bg-[#faf8f4]">
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b]">{labels.offer}</th>
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b] hidden sm:table-cell">{labels.validUntil}</th>
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b]">{labels.status}</th>
              <th className="text-right px-5 py-3 font-medium text-[#6b6b6b]">{locale === 'el' ? 'Ενέργειες' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e4dd]">
            {(offers as any[]).map((offer) => (
              <tr key={offer.id} className="hover:bg-[#faf8f4] transition-colors">
                <td className="px-5 py-4">
                  <p className="font-medium text-[#102027]">{offer.title}</p>
                  {offer.badge && (
                    <span className="text-xs bg-[#ad8b27]/10 text-[#ad8b27] px-2 py-0.5 rounded-full mt-1 inline-block">
                      {offer.badge}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-[#6b6b6b] hidden sm:table-cell">
                  {offer.validUntil
                    ? new Date(offer.validUntil).toLocaleDateString(
                        locale === 'el' ? 'el-GR' : 'en-GB'
                      )
                    : '—'}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      offer._status === 'published'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}
                  >
                    {offer._status === 'published'
                      ? locale === 'el' ? 'Δημοσιευμένο' : 'Published'
                      : locale === 'el' ? 'Πρόχειρο' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <a
                    href={`/admin/collections/offers/${offer.id}`}
                    target="_blank"
                    className="text-xs text-[#ad8b27] font-medium hover:underline"
                  >
                    {labels.edit} →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {offers.length === 0 && (
          <div className="py-12 text-center text-[#6b6b6b] text-sm">
            {locale === 'el' ? 'Δεν υπάρχουν προσφορές.' : 'No offers yet.'}
          </div>
        )}
      </div>
    </div>
  )
}
