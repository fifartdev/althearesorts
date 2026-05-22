'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { PHONE, EMAIL, BOOKING_URL } from '@/lib/constants'

const faqs = [
  {
    category: 'Rooms & Rates',
    items: [
      { q: 'How many rooms does Althea Resorts have?', a: 'Althea Resorts has 41 rooms and suites across six categories, from the Standard Double to the Althea Loft Suite with Outdoor Jacuzzi.' },
      { q: 'What is the best rate guarantee?', a: 'The best rate is always guaranteed when you book directly through our website or by contacting us by phone or email. We currently offer a 10% discount on all direct bookings, valid for reservations made until June 30, 2026.' },
      { q: 'Do all rooms have a view?', a: 'All rooms feature either mountain, pool, or sea views. The Superior Sea View Room and Althea Loft Suite offer uninterrupted views of the Corinthian Gulf from generous terraces.' },
    ],
  },
  {
    category: 'Check-in & Stay',
    items: [
      { q: 'What are your check-in and check-out times?', a: 'Check-in is from 15:00 and check-out is by 11:00. Early check-in and late check-out are available upon request, subject to availability.' },
      { q: 'What is the minimum age to check in?', a: 'Guests must be at least 18 years of age to make a reservation. Children are welcome and the resort is family-friendly.' },
      { q: 'Are pets allowed?', a: 'We welcome small pets in certain room categories. Please contact us in advance to make arrangements.' },
    ],
  },
  {
    category: 'Location & Transport',
    items: [
      { q: 'How far is Althea Resorts from Athens?', a: 'Althea Resorts is approximately 60 minutes from Athens by car on the Athens–Corinth motorway. We can assist with private transfer arrangements upon request.' },
      { q: 'Do you offer airport transfers?', a: 'Yes, we can arrange private transfers from Athens International Airport. Please contact us with your travel details and we will organize the rest.' },
      { q: 'How do guests get to the private beach?', a: 'Our private beach on the Corinthian Gulf is 5 minutes from the resort. A complimentary shuttle service runs throughout the day.' },
    ],
  },
  {
    category: 'Dining',
    items: [
      { q: 'Do I need to book Narrativa in advance?', a: 'We recommend making a reservation for Narrativa, our rooftop restaurant, particularly during the high season. Tables can be arranged through the resort directly.' },
      { q: 'Is breakfast included?', a: 'Breakfast is available as part of certain packages. Please check room rates at time of booking or contact us to add breakfast to your reservation.' },
      { q: 'Do you cater for dietary requirements?', a: 'Yes. Our kitchen can accommodate most dietary requirements including vegetarian, vegan, and allergen-specific needs. Please inform us at the time of booking.' },
    ],
  },
  {
    category: 'Spa & Wellness',
    items: [
      { q: 'Do I need to book spa treatments in advance?', a: 'We recommend booking treatments in advance, especially during peak season. Contact us or ask the reception team upon arrival.' },
      { q: 'What products does the Ocean Spa use?', a: 'The Ocean Spa uses Oceanis cosmetics — a Greek brand certified biodegradable, vegan, cruelty-free, and dermatologically tested. The full range is available to purchase in the spa boutique.' },
      { q: 'Is the spa open to non-resident guests?', a: 'The spa is primarily reserved for hotel guests. Please contact us in advance if you would like to enquire about day visits.' },
    ],
  },
]

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

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqs[0].category)
  const active = faqs.find((f) => f.category === activeCategory)!

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
              If you can't find what you're looking for, call us at{' '}
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
