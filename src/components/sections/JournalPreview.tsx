import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getPage } from '@/lib/wp/api'
import { getLabels } from '@/lib/wp/site'
import { Rich } from '@/lib/wp/Rich'

type Locale = 'en' | 'el'

export async function JournalPreview({ locale = 'en' }: { locale?: Locale }) {
  const labels = await getLabels('home', locale)
  const c = (await getPage('home')).journal_preview

  return (
    <section className="section-padding bg-white" aria-label={labels.journal}>
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
              href={locale === 'el' ? '/el/journal' : '/journal'}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {c.cards.map((post, i) => (
            <ScrollReveal key={post.title[locale]} delay={i * 100}>
              <a href={post.href[locale]} className="group block">
                <div className="aspect-[16/10] overflow-hidden mb-5 relative">
                  <Image
                    src={post.image[locale]?.url ?? ''}
                    alt={post.image_alt[locale]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/10 transition-colors duration-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-label-upper text-[#ad8b27]">{post.category[locale]}</span>
                  <h3 className="font-editorial text-xl font-light text-[#102027] leading-snug group-hover:text-[#ad8b27]/80 transition-colors duration-300">
                    {post.title[locale]}
                  </h3>
                  <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">
                    {post.excerpt[locale]}
                  </p>
                  <span className="text-xs uppercase tracking-widest text-[#a0a0a0] mt-1">
                    {post.read_time[locale]}
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
