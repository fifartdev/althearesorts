'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

export type Testimonial = { quote: string; name: string; origin: string; stay: string }

export function TestimonialsSectionView({ heading, label, list, ariaLabel }: { heading: string; label: string; list: Testimonial[]; ariaLabel: string }) {
  const [active, setActive] = useState(0)
  const t = list[active]

  return (
    <section className="section-padding bg-[#f2f8fb]" aria-label={ariaLabel}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-3">
            <ScrollReveal>
              <SectionLabel className="mb-8">{label}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027] mb-10 whitespace-pre-line">
                {heading}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex flex-col gap-3">
                {list.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`text-left text-xs uppercase tracking-widest font-light transition-all duration-300 flex items-center gap-3 ${
                      active === i ? 'text-[#102027]' : 'text-[#a0a0a0]'
                    }`}
                  >
                    <span className={`block h-px transition-all duration-300 ${active === i ? 'bg-[#ad8b27] w-6' : 'bg-[#a0a0a0] w-4'}`} />
                    {item.name}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-9">
            <ScrollReveal>
              <blockquote className="relative">
                <span className="absolute -top-6 -left-4 font-editorial text-8xl text-[#ad8b27]/20 leading-none select-none" aria-hidden="true">{'"'}</span>
                <p className="font-editorial text-2xl lg:text-3xl font-light text-[#102027] leading-relaxed mb-8 relative z-10">
                  {t.quote}
                </p>
                <footer className="flex items-center gap-4">
                  <span className="block w-8 h-px bg-[#ad8b27]" />
                  <div>
                    <cite className="not-italic text-sm font-light text-[#102027] uppercase tracking-wider">
                      {t.name}
                    </cite>
                    <span className="block text-xs font-light text-[#6b6b6b] uppercase tracking-wider mt-0.5">
                      {t.origin} · {t.stay}
                    </span>
                  </div>
                </footer>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
