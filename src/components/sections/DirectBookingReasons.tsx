'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Reason = { title: string; body: string }

type DirectBookingReasonsProps = {
  label?: string
  headline1?: string
  headline2?: string
  intro?: string
  ctaLabel?: string
  reasons?: Reason[]
  bookingUrl?: string
}

export function DirectBookingReasons({
  label,
  headline1,
  headline2,
  intro,
  ctaLabel,
  reasons,
  bookingUrl,
}: DirectBookingReasonsProps) {
  const [open, setOpen] = useState<number>(0)

  if (!reasons || reasons.length === 0) return null

  return (
    <section className="section-padding bg-soft" aria-label="Reasons to book directly">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            {label && (
              <ScrollReveal>
                <SectionLabel className="mb-6">{label}</SectionLabel>
              </ScrollReveal>
            )}
            {headline1 && (
              <ScrollReveal delay={100}>
                <h2 className="text-display-md text-deep mb-8">
                  {headline1}<br />
                  {headline2 && <em className="italic font-light">{headline2}</em>}
                </h2>
              </ScrollReveal>
            )}
            {intro && (
              <ScrollReveal delay={150}>
                <p className="text-body-refined mb-10">{intro}</p>
              </ScrollReveal>
            )}
            {bookingUrl && ctaLabel && (
              <ScrollReveal delay={200}>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-8 inline-flex items-center
                             text-xs uppercase tracking-[0.2em]
                             bg-deep text-white border border-deep
                             hover:bg-transparent hover:text-deep
                             transition-all duration-500"
                >
                  {ctaLabel}
                </a>
              </ScrollReveal>
            )}
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal delay={100}>
              <div className="flex flex-col divide-y divide-stone">
                {reasons.map((reason, i) => {
                  const isOpen = open === i
                  return (
                    <div key={reason.title}>
                      <button
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className={`w-full flex items-center justify-between gap-6 py-6 text-left transition-colors duration-300 ${
                          isOpen ? 'text-deep' : 'text-smoke hover:text-deep'
                        }`}
                      >
                        <span className="font-editorial text-xl font-light leading-snug">
                          {reason.title}
                        </span>
                        <span
                          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? 'border-gold bg-gold text-white'
                              : 'border-stone bg-white text-deep'
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
