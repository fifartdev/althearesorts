'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { PHONE, EMAIL, BOOKING_URL } from '@/lib/constants'
import { faqs as staticFaqs, type FaqCategory } from './faqData'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#e8e4dd]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-light text-[#102027] leading-relaxed">{q}</span>
        <span className={`text-[#ad8b27] text-xl font-light shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export function FaqClient({ categories }: { categories?: FaqCategory[] }) {
  const faqs = categories && categories.length > 0 ? categories : staticFaqs
  const [activeCategory, setActiveCategory] = useState(faqs[0].category)
  const active = faqs.find((f) => f.category === activeCategory) ?? faqs[0]

  return (
    <main id="main-content">
      {/* Header */}
      <section className="pt-40 pb-16 lg:pt-56 lg:pb-20 bg-[#f2f8fb]" aria-label="FAQ">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionLabel className="mb-6">FAQ</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-[#102027] max-w-2xl mb-8">
              Frequently Asked<br />
              <em className="italic font-light">Questions</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-body-refined max-w-md">
              If you can&apos;t find what you&apos;re looking for, call us at{' '}
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-[#102027] hover:text-[#ad8b27] transition-colors duration-200">{PHONE}</a>
              {' '}or write to{' '}
              <a href={`mailto:${EMAIL}`} className="text-[#102027] hover:text-[#ad8b27] transition-colors duration-200">{EMAIL}</a>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ content */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Category tabs */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="flex flex-col gap-1">
                  {faqs.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => setActiveCategory(f.category)}
                      className={`text-left py-3 px-4 text-xs uppercase tracking-wider font-light transition-all duration-200 ${
                        activeCategory === f.category
                          ? 'bg-[#102027] text-white'
                          : 'text-[#6b6b6b] hover:text-[#102027]'
                      }`}
                    >
                      {f.category}
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Questions */}
            <div className="lg:col-span-8 lg:col-start-5">
              <ScrollReveal>
                <h2 className="text-display-sm text-[#102027] mb-8">{activeCategory}</h2>
                <div className="flex flex-col">
                  {active.items.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>

                <div className="mt-12 p-8 bg-[#f2f8fb] flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div>
                    <p className="text-sm font-light text-[#102027] mb-1">Still have questions?</p>
                    <p className="text-xs font-light text-[#6b6b6b]">Our team is available to assist with any enquiries.</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a
                      href={`tel:${PHONE.replace(/\s/g, '')}`}
                      className="h-9 px-5 inline-flex items-center text-xs uppercase tracking-[0.18em] bg-transparent text-[#102027] border border-[#102027] hover:bg-[#102027] hover:text-white transition-all duration-400"
                    >
                      Call Us
                    </a>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-5 inline-flex items-center text-xs uppercase tracking-[0.18em] bg-[#102027] text-white border border-[#102027] hover:bg-transparent hover:text-[#102027] transition-all duration-400"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <FinalBookingCTA />
    </main>
  )
}
