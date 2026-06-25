import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@payload-config'
import type { ManageLocale } from '@/lib/manage-i18n'
import { getLocale } from '@/lib/manage-i18n'

export default async function ManageJournal({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string; page?: string }>
}) {
  const cookieStore = await cookies()
  const resolvedParams = await searchParams
  const locale: ManageLocale = getLocale(
    resolvedParams?.locale ?? cookieStore.get('manage-locale')?.value
  )
  const page = parseInt(resolvedParams?.page || '1', 10)

  const payload = await getPayload({ config })
  const { docs: posts, totalDocs, totalPages } = await payload.find({
    collection: 'journal',
    limit: 20,
    page,
    sort: '-publishedAt',
    depth: 0,
  })

  const labels = {
    en: {
      title: 'Journal',
      sub: 'Hotel stories, local guides, and editorial content.',
      add: 'New post',
      post: 'Post',
      category: 'Category',
      published: 'Published',
      status: 'Status',
      edit: 'Edit in CMS',
    },
    el: {
      title: 'Ημερολόγιο',
      sub: 'Ιστορίες ξενοδοχείου, τοπικοί οδηγοί και εκδοτικό περιεχόμενο.',
      add: 'Νέο άρθρο',
      post: 'Άρθρο',
      category: 'Κατηγορία',
      published: 'Δημοσιεύτηκε',
      status: 'Κατάσταση',
      edit: 'Επεξεργασία στο CMS',
    },
  }[locale]

  const categoryLabels: Record<string, Record<string, string>> = {
    'local-guides': { en: 'Local Guides', el: 'Τοπικοί Οδηγοί' },
    'hotel-stories': { en: 'Hotel Stories', el: 'Ιστορίες' },
    gastronomy: { en: 'Gastronomy', el: 'Γαστρονομία' },
    wellness: { en: 'Wellness', el: 'Ευεξία' },
    events: { en: 'Events', el: 'Εκδηλώσεις' },
    corinthia: { en: 'Corinthia', el: 'Κορινθία' },
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#102027]">{labels.title}</h1>
          <p className="text-[#6b6b6b] text-sm mt-1">{labels.sub}</p>
        </div>
        <a
          href="/admin/collections/journal/create"
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
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b]">{labels.post}</th>
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b] hidden sm:table-cell">{labels.category}</th>
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b] hidden md:table-cell">{labels.published}</th>
              <th className="text-left px-5 py-3 font-medium text-[#6b6b6b]">{labels.status}</th>
              <th className="text-right px-5 py-3 font-medium text-[#6b6b6b]">{locale === 'el' ? 'Ενέργειες' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e4dd]">
            {(posts as any[]).map((post) => (
              <tr key={post.id} className="hover:bg-[#faf8f4] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#102027]">{post.title}</span>
                    {post.featured && (
                      <span className="text-xs bg-[#ad8b27]/10 text-[#ad8b27] px-2 py-0.5 rounded-full">
                        {locale === 'el' ? 'Προτεινόμενο' : 'Featured'}
                      </span>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="text-xs text-[#6b6b6b] mt-0.5 line-clamp-1 hidden sm:block">{post.excerpt}</p>
                  )}
                </td>
                <td className="px-5 py-4 text-[#6b6b6b] hidden sm:table-cell">
                  {categoryLabels[post.category]?.[locale] ?? post.category ?? '—'}
                </td>
                <td className="px-5 py-4 text-[#6b6b6b] hidden md:table-cell">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString(
                        locale === 'el' ? 'el-GR' : 'en-GB'
                      )
                    : '—'}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      post._status === 'published'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}
                  >
                    {post._status === 'published'
                      ? locale === 'el' ? 'Δημοσιευμένο' : 'Published'
                      : locale === 'el' ? 'Πρόχειρο' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <a
                    href={`/admin/collections/journal/${post.id}`}
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
        {posts.length === 0 && (
          <div className="py-12 text-center text-[#6b6b6b] text-sm">
            {locale === 'el' ? 'Δεν υπάρχουν άρθρα.' : 'No journal posts yet.'}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-[#6b6b6b]">
            {locale === 'el' ? `${totalDocs} άρθρα` : `${totalDocs} posts`}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <a href={`/manage/journal?locale=${locale}&page=${page - 1}`} className="px-3 py-1.5 border border-[#e8e4dd] rounded-lg hover:bg-[#faf8f4]">
                ← {locale === 'el' ? 'Προηγούμενη' : 'Previous'}
              </a>
            )}
            {page < totalPages && (
              <a href={`/manage/journal?locale=${locale}&page=${page + 1}`} className="px-3 py-1.5 border border-[#e8e4dd] rounded-lg hover:bg-[#faf8f4]">
                {locale === 'el' ? 'Επόμενη' : 'Next'} →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
