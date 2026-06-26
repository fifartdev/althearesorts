import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Locale = 'en' | 'el'

type GalleryPreviewProps = {
  locale?: Locale
  label?: string
  headline?: string
  ctaLabel?: string
}

const galleryItems = [
  {
    span: 'col-span-2 row-span-2',
    label: { en: 'Pool & Gulf Views', el: 'Πισίνα & Θέα Κόλπου' },
    image: '/images/new-images/New-Hero.jpg',
  },
  {
    span: 'col-span-1',
    label: { en: 'Loft Suite', el: 'Loft Σουίτα' },
    image: '/images/new-images/althea-deluxe-double1.jpg',
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

export function GalleryPreview({ locale = 'en', label, headline, ctaLabel }: GalleryPreviewProps) {
  if (!headline) return null

  const galleryHref = locale === 'el' ? '/el/gallery' : '/gallery'

  return (
    <section className="section-padding bg-white" aria-label="Gallery preview">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-12">
          <div>
            {label && (
              <ScrollReveal>
                <SectionLabel className="mb-4">{label}</SectionLabel>
              </ScrollReveal>
            )}
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-deep">
                {headline}
              </h2>
            </ScrollReveal>
          </div>
          {ctaLabel && (
            <ScrollReveal delay={150}>
              <a
                href={galleryHref}
                className="hidden lg:inline-flex items-center gap-2
                           text-xs uppercase tracking-[0.2em] text-smoke
                           hover:text-deep transition-colors duration-300"
              >
                {ctaLabel}
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                  <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                </svg>
              </a>
            </ScrollReveal>
          )}
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-140 lg:h-160">
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
              <div className="absolute inset-0 bg-deep/0 group-hover:bg-deep/30 transition-colors duration-500 flex items-end p-4">
                <span className="text-xs uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
                  {item.label[locale]}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {ctaLabel && (
          <div className="flex justify-center mt-8 lg:hidden">
            <a href={galleryHref} className="text-xs uppercase tracking-[0.2em] text-deep border-b border-deep pb-1">
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
