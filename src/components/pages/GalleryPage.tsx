import React from 'react'
import { getItems, getPage, getTerms, src } from '@/lib/wp/api'
import type { Locale } from '@/lib/wp/schema-types'
import { GalleryView } from './GalleryView'

/** Gallery page: content resolved on the server; filtering runs in GalleryView (client). */
export async function GalleryPage({ locale }: { locale: Locale }) {
  const [c, items, terms] = await Promise.all([getPage('gallery'), getItems('althea_gallery'), getTerms('althea_gallery_cat', 'althea_gallery')])
  const catName = (t: { name: string; name_el: string }) => (locale === 'el' ? t.name_el : t.name)
  return (
    <GalleryView
      label={c.hero.label[locale]}
      heading={c.hero.heading[locale]}
      heroImage={src(c.hero.image)}
      heroAlt={c.hero.image_alt[locale]}
      allLabel={c.filter.all_label[locale]}
      categories={terms.map(catName)}
      ariaLabel={locale === 'el' ? 'Γκαλερί' : 'Gallery'}
      items={items.map((i) => ({
        src: src(i.image),
        caption: i.fields.caption[locale],
        category: i.terms.althea_gallery_cat[0] ? catName(i.terms.althea_gallery_cat[0]) : '',
        wide: i.fields.wide,
      }))}
    />
  )
}
