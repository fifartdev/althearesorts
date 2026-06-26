'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { faqs as staticFaqs, type FaqCategory } from './faqData'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-stone">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-light text-deep leading-relaxed">{q}</span>
        <span className={`text-gold text-xl font-light shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm font-light text-smoke leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export function FaqClient({ categories, phone, email, bookingUrl }: { categories?: FaqCategory[]; phone?: string; email?: string; bookingUrl?: string }) {
  const faqs = categories && categories.length > 0 ? categories : staticFaqs
  const [activeCategory, setActiveCategory] = useState(faqs[0].category)
  const active = faqs.find((f) => f.category === activeCategory) ?? faqs[0]

  return (
    <main id="main-content">
      {/* Header */}
      <section className="pt-40 pb-16 lg:pt-56 lg:pb-20 bg-soft" aria-label="Συχνές Ερωτήσεις">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionLabel className="mb-6">FAQ</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-deep max-w-2xl mb-8">
              Συχνές<br />
              <em className="italic font-light">Ερωτήσεις</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            {(phone || email) && (
              <p className="text-body-refined max-w-md">
                Αν δεν βρείτε αυτό που ψάχνετε,{' '}
                {phone && <>καλέστε μας στο <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-deep hover:text-gold transition-colors duration-200">{phone}</a></>}
                {phone && email && ' ή γράψτε στο '}
                {email && <a href={`mailto:${email}`} className="text-deep hover:text-gold transition-colors duration-200">{email}</a>}.
              </p>
            )}
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
                          ? 'bg-deep text-white'
                          : 'text-smoke hover:text-deep'
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
                <h2 className="text-display-sm text-deep mb-8">{activeCategory}</h2>
                <div className="flex flex-col">
                  {active.items.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>

                <div className="mt-12 p-8 bg-soft flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div>
                    <p className="text-sm font-light text-deep mb-1">Έχετε ακόμα ερωτήσεις;</p>
                    <p className="text-xs font-light text-smoke">Η ομάδα μας είναι διαθέσιμη για οποιαδήποτε απορία.</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    {phone && (
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="h-9 px-5 inline-flex items-center text-xs uppercase tracking-[0.18em] bg-transparent text-deep border border-deep hover:bg-deep hover:text-white transition-all duration-400"
                      >
                        Καλέστε μας
                      </a>
                    )}
                    {bookingUrl && (
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 px-5 inline-flex items-center text-xs uppercase tracking-[0.18em] bg-deep text-white border border-deep hover:bg-transparent hover:text-deep transition-all duration-400"
                      >
                        Κράτηση
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <FinalBookingCTA locale="el" />
    </main>
  )
}
