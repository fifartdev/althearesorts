import React from 'react'
import { getItems, getPage } from '@/lib/wp/api'
import { getLabels } from '@/lib/wp/site'
import { TestimonialsSectionView } from './TestimonialsSectionView'

/** Guest testimonials: content from the CMS, the selector runs in the client view. */
export async function TestimonialsSection({ locale = 'en' }: { locale?: 'en' | 'el' }) {
  const [home, items, labels] = await Promise.all([getPage('home'), getItems('althea_testimonial'), getLabels('home', locale)])
  const f = (key: 'quote' | 'name' | 'origin' | 'stay', i: (typeof items)[number]) => i.fields[key][locale]
  return (
    <TestimonialsSectionView
      ariaLabel={labels.testimonials}
      label={home.testimonials.label[locale]}
      heading={home.testimonials.heading[locale]}
      list={items.map((i) => ({ quote: f('quote', i), name: f('name', i), origin: f('origin', i), stay: f('stay', i) }))}
    />
  )
}
