import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Locale = 'en' | 'el'

const galleryItems = [
  {
    span: 'col-span-2 row-span-2',
    label: { en: 'Pool & Gulf Views', el: 'Πισίνα & Θέα Κόλπου' },
    image: '/images/new-images/New-Hero.jpg',
  },
  {
    span: 'col-span-1',
    label: { en: 'Loft Suite', el: 'Loft Σουίτα' },
    image: 'https://staging.althearesorts.com/wp-content/uploads/2026/02/althea-exclusive-resorts-spa-9.png',
  },
  {
    span: 'col-span-1',
    label: { en: 'Ocean Spa', el: 'Ocean Spa' },
    image: '/images/oceanisphoto.jpg',
  },
  {
    span: 'col-span-1',
    label: { en: 'Main Pool', el: 'Κεντρική Πισίνα' },
    image: '/images/main-pool.jpg',
  },
  {
    span: 'col-span-1',
    label: { en: 'Corinthian Coast', el: 'Κορινθιακή Ακτή' },
    image: '/images/new-images/althea-side-images2.jpg',
  },
]

const content = {
  en: {
    sectionLabel: 'Gallery',
    headline: 'The View From Here',
    cta: 'View Full Gallery',
    ctaHref: '/gallery',
    mobileCta: 'View Full Gallery',
  },
  el: {
    sectionLabel: 'Γκαλερί',
    headline: 'Η Θέα από Εδώ',
    cta: 'Πλήρης Γκαλερί',
    ctaHref: '/el/gallery',
    mobileCta: 'Δείτε τη Γκαλερί',
  },
}

export function GalleryPreview({ locale = 'en' }: { locale?: Locale }) {
  const c = content[locale]

  return (
    <section className="section-padding bg-white" aria-label="Gallery preview">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-12">
          <div>
            <ScrollReveal>
              <SectionLabel className="mb-4">{c.sectionLabel}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027]">
                {c.headline}
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={150}>
            <a
              href={c.ctaHref}
              className="hidden lg:inline-flex items-center gap-2
                         text-xs uppercase tracking-[0.2em] text-[#6b6b6b]
                         hover:text-[#102027] transition-colors duration-300"
            >
              {c.cta}
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[560px] lg:h-[640px]">
          {galleryItems.map((item, i) => (
            <ScrollReveal
              key={item.label.en}
              delay={i * 80}
              className={`${item.span} overflow-hidden group cursor-pointer relative`}
            >
              <Image
                src={item.image}
                alt={item.label[locale]}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/30 transition-colors duration-500 flex items-end p-4">
                <span className="text-xs uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
                  {item.label[locale]}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex justify-center mt-8 lg:hidden">
          <a href={c.ctaHref} className="text-xs uppercase tracking-[0.2em] text-[#102027] border-b border-[#102027] pb-1">
            {c.mobileCta}
          </a>
        </div>
      </div>
    </section>
  )
}
