'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Rich } from '@/lib/wp/Rich'

export type FaqViewCategory = { category: string; items: Array<{ q: string; a: string }> }

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

const CONTACT_LINK = 'text-[#102027] hover:text-[#ad8b27] transition-colors duration-200'

/** Intro text where {phone} and {email} become links. */
function Intro({ html, phone, email }: { html: string; phone: string; email: string }) {
  return (
    <>
      {html.split(/(\{phone\}|\{email\})/).map((part, i) =>
        part === '{phone}' ? (
          <a key={i} href={`tel:${phone.replace(/\s/g, '')}`} className={CONTACT_LINK}>{phone}</a>
        ) : part === '{email}' ? (
          <a key={i} href={`mailto:${email}`} className={CONTACT_LINK}>{email}</a>
        ) : (
          <Rich key={i} html={part} />
        ),
      )}
    </>
  )
}

export function FaqView({
  ariaLabel,
  label,
  heading,
  intro,
  phone,
  email,
  bookingUrl,
  categories,
  footer,
  finalCta,
}: {
  ariaLabel: string
  label: string
  heading: string
  intro: string
  phone: string
  email: string
  bookingUrl: string
  categories: FaqViewCategory[]
  footer: { heading: string; body: string; call: string; book: string }
  finalCta: React.ReactNode
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.category ?? '')
  const active = categories.find((f) => f.category === activeCategory) ?? { category: '', items: [] }

  return (
    <main id="main-content">
      {/* Header */}
      <section className="pt-40 pb-16 lg:pt-56 lg:pb-20 bg-[#f2f8fb]" aria-label={ariaLabel}>
        <div className="container-luxury">
          <ScrollReveal>
            <SectionLabel className="mb-6">{label}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-[#102027] max-w-2xl mb-8">
              <Rich html={heading} classes={{ em: 'italic font-light' }} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-body-refined max-w-md">
              <Intro html={intro} phone={phone} email={email} />
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
                  {categories.map((f) => (
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
                    <p className="text-sm font-light text-[#102027] mb-1">{footer.heading}</p>
                    <p className="text-xs font-light text-[#6b6b6b]">{footer.body}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="h-9 px-5 inline-flex items-center text-xs uppercase tracking-[0.18em] bg-transparent text-[#102027] border border-[#102027] hover:bg-[#102027] hover:text-white transition-all duration-400"
                    >
                      {footer.call}
                    </a>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-5 inline-flex items-center text-xs uppercase tracking-[0.18em] bg-[#102027] text-white border border-[#102027] hover:bg-transparent hover:text-[#102027] transition-all duration-400"
                    >
                      {footer.book}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {finalCta}
    </main>
  )
}
