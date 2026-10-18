'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Rich } from '@/lib/wp/Rich'
import type { SharedPage } from '@/lib/wp/schema-types'

type Locale = 'en' | 'el'

export type Reason = { title: string; body: string }

export function DirectBookingReasonsView({ locale = 'en', c, reasons, bookingUrl }: { locale?: Locale; c: SharedPage['direct_booking']; reasons: Reason[]; bookingUrl: string }) {
  const [open, setOpen] = useState<number>(0)

  return (
    <section className="section-padding bg-[#f2f8fb]" aria-label="Reasons to book directly">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <ScrollReveal>
              <SectionLabel className="mb-6">{c.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-[#102027] mb-8">
                <Rich html={c.heading[locale]} classes={{ em: 'italic font-light' }} />
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="text-body-refined mb-10">{c.body[locale]}</p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-8 inline-flex items-center
                           text-xs uppercase tracking-[0.2em]
                           bg-[#102027] text-white border border-[#102027]
                           hover:bg-transparent hover:text-[#102027]
                           transition-all duration-500"
              >
                {c.cta[locale]}
              </a>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal delay={100}>
              <div className="flex flex-col divide-y divide-[#e8e4dd]">
                {reasons.map((reason, i) => {
                  const isOpen = open === i
                  return (
                    <div key={reason.title}>
                      <button
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className={`w-full flex items-center justify-between gap-6 py-6 text-left transition-colors duration-300 ${
                          isOpen ? 'text-[#102027]' : 'text-[#6b6b6b] hover:text-[#102027]'
                        }`}
                      >
                        <span className="font-editorial text-xl font-light leading-snug">
                          {reason.title}
                        </span>
                        <span
                          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? 'border-[#ad8b27] bg-[#ad8b27] text-white'
                              : 'border-[#e8e4dd] bg-white text-[#102027]'
                          }`}
                          aria-hidden="true"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            {isOpen ? (
                              <path d="M2 6h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                            ) : (
                              <>
                                <path d="M6 2v8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                                <path d="M2 6h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                              </>
                            )}
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen ? 'max-h-48 pb-6' : 'max-h-0'
                        }`}
                      >
                        <p className="text-body-refined leading-relaxed pr-14">
                          {reason.body}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
