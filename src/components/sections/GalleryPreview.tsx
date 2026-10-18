import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getPage } from '@/lib/wp/api'
import { Rich } from '@/lib/wp/Rich'

type Locale = 'en' | 'el'

// Grid layout of the five tiles (layout stays in code; images and labels come from the CMS).
const TILE_SPANS = ['col-span-2 row-span-2', 'col-span-1', 'col-span-1', 'col-span-1', 'col-span-1']

export async function GalleryPreview({ locale = 'en' }: { locale?: Locale }) {
  const c = (await getPage('home')).gallery_preview
  const ctaHref = locale === 'el' ? '/el/gallery' : '/gallery'

  return (
    <section className="section-padding bg-white" aria-label="Gallery preview">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-12">
          <div>
            <ScrollReveal>
              <SectionLabel className="mb-4">{c.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027]">
                <Rich html={c.heading[locale]} />
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={150}>
            <a
              href={ctaHref}
              className="hidden lg:inline-flex items-center gap-2
                         text-xs uppercase tracking-[0.2em] text-[#6b6b6b]
                         hover:text-[#102027] transition-colors duration-300"
            >
              {c.cta[locale]}
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[560px] lg:h-[640px]">
          {c.tiles.map((item, i) => (
            <ScrollReveal
              key={item.label.en}
              delay={i * 80}
              className={`${TILE_SPANS[i] ?? 'col-span-1'} overflow-hidden group cursor-pointer relative`}
            >
              <Image
                src={item.image?.url ?? ''}
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
          <a href={ctaHref} className="text-xs uppercase tracking-[0.2em] text-[#102027] border-b border-[#102027] pb-1">
            {c.mobile_cta[locale]}
          </a>
        </div>
      </div>
    </section>
  )
}
