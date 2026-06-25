import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@payload-config'
import type { ManageLocale } from '@/lib/manage-i18n'
import { getLocale } from '@/lib/manage-i18n'

export default async function ManageGallery({
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
  const { docs: images, totalDocs } = await payload.find({
    collection: 'gallery',
    limit: 60,
    sort: 'order',
    where: categoryFilter ? { category: { equals: categoryFilter } } : undefined,
    depth: 1,
  })

  const categories = [
    { value: '', label: locale === 'el' ? 'Όλα' : 'All' },
    { value: 'rooms', label: locale === 'el' ? 'Δωμάτια' : 'Rooms & Suites' },
    { value: 'dining', label: locale === 'el' ? 'Γαστρονομία' : 'Dining' },
    { value: 'spa', label: locale === 'el' ? 'Σπα' : 'Spa & Wellness' },
    { value: 'exterior', label: locale === 'el' ? 'Εξωτερικό' : 'Exterior & Views' },
    { value: 'pool', label: locale === 'el' ? 'Πισίνα' : 'Pool & Beach' },
    { value: 'events', label: locale === 'el' ? 'Εκδηλώσεις' : 'Events' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#102027]">
            {locale === 'el' ? 'Γκαλερί' : 'Gallery'}
          </h1>
          <p className="text-[#6b6b6b] text-sm mt-1">
            {locale === 'el'
              ? `${totalDocs} εικόνες — Ανεβάστε και οργανώστε τη φωτογραφική γκαλερί.`
              : `${totalDocs} images — Upload and organise the photo gallery.`}
          </p>
        </div>
        <a
          href="/admin/collections/gallery/create"
          target="_blank"
          className="bg-[#ad8b27] hover:bg-[#9a7d22] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + {locale === 'el' ? 'Νέα εικόνα' : 'Add image'}
        </a>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <a
            key={cat.value}
            href={`/manage/gallery?locale=${locale}${cat.value ? `&category=${cat.value}` : ''}`}
            className={[
              'text-sm px-3 py-1.5 rounded-lg border transition-colors',
              (categoryFilter || '') === cat.value
                ? 'bg-[#102027] text-white border-[#102027]'
                : 'bg-white text-[#6b6b6b] border-[#e8e4dd] hover:border-[#102027]/30',
            ].join(' ')}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {/* Image grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {(images as any[]).map((img) => (
            <div key={img.id} className="group relative aspect-square bg-[#e8e4dd] rounded-xl overflow-hidden">
              {img.image?.url && (
                <img
                  src={img.image.url}
                  alt={img.caption || img.image.alt || ''}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
                <div className="w-full">
                  {img.caption && (
                    <p className="text-white text-xs mb-2 line-clamp-2">{img.caption}</p>
                  )}
                  <a
                    href={`/admin/collections/gallery/${img.id}`}
                    target="_blank"
                    className="text-xs bg-white text-[#102027] font-medium px-2.5 py-1 rounded-md hover:bg-[#faf8f4] transition-colors inline-block"
                  >
                    {locale === 'el' ? 'Επεξεργασία' : 'Edit'} →
                  </a>
                </div>
              </div>
              {img.featured && (
                <div className="absolute top-2 right-2">
                  <span className="text-xs bg-[#ad8b27] text-white px-1.5 py-0.5 rounded-full">★</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e8e4dd] py-16 text-center">
          <p className="text-[#6b6b6b] text-sm">
            {locale === 'el' ? 'Δεν υπάρχουν εικόνες σε αυτή την κατηγορία.' : 'No images in this category.'}
          </p>
          <a
            href="/admin/collections/gallery/create"
            target="_blank"
            className="inline-block mt-3 text-sm text-[#ad8b27] hover:underline"
          >
            {locale === 'el' ? 'Προσθήκη εικόνας →' : 'Add an image →'}
          </a>
        </div>
      )}

      <div className="mt-6 p-4 bg-[#f2f8fb] rounded-xl text-sm text-[#35657a]">
        <strong>{locale === 'el' ? 'Συμβουλή:' : 'Tip:'}</strong>{' '}
        {locale === 'el'
          ? 'Για να αλλάξετε τη σειρά των εικόνων, ανοίξτε κάθε εικόνα στο πλήρες CMS και αλλάξτε τον αριθμό "Order".'
          : 'To reorder images, open each image in the full CMS and change the "Order" number.'}
      </div>
    </div>
  )
}
