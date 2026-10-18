import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getPage } from '@/lib/wp/api'
import { Rich } from '@/lib/wp/Rich'

type Locale = 'en' | 'el'

export async function ExperiencesHighlight({ locale = 'en' }: { locale?: Locale }) {
  const c = (await getPage('home')).experiences

  return (
    <section
      className="section-padding bg-[#102027]"
      aria-label="Experiences at Althea Resorts"
    >
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <ScrollReveal>
              <SectionLabel light className="mb-6">{c.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-white">
                <Rich html={c.heading[locale]} classes={{ em: 'italic font-light text-white/70' }} />
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/50 max-w-xs leading-relaxed whitespace-pre-line">
              {c.subtext[locale]}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {c.cards.map((exp, i) => (
            <ScrollReveal key={exp.title[locale]} delay={i * 120}>
              <a
                href={exp.href[locale]}
                className="group block overflow-hidden border border-white/10 hover:border-[#ad8b27]/40 transition-colors duration-500"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={exp.image?.url ?? ''}
                    alt={exp.image_alt[locale]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/20 transition-colors duration-500" />
                </div>

                <div className="p-6 bg-[#102027]">
                  <span className="text-label-upper text-[#ad8b27] mb-3 block">
                    {exp.label[locale]}
                  </span>
                  <h3 className="font-editorial text-xl font-light text-white mb-3">
                    {exp.title[locale]}
                  </h3>
                  <p className="text-sm font-light text-white/50 leading-relaxed mb-5">
                    {exp.desc[locale]}
                  </p>
                  <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-[#ad8b27] transition-colors duration-300 flex items-center gap-2">
                    {c.discover_label[locale]}
                    <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                      <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                    </svg>
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
