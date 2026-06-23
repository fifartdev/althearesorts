import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'

type Locale = 'en' | 'el'

const content = {
  en: {
    label: 'The Property',
    headlineLine1: 'Built for',
    headlineLine2: 'That Moment',
    body1: 'There is a moment, usually on the second day, when a guest at Althea stops thinking about what they left behind. The emails, the traffic, the particular weight of ordinary life.',
    body2: 'The hills of Corinthia do part of the work. The light over the Gulf does the rest. We built Althea for that moment.',
    linkLabel: 'Our Story',
    linkHref: '/about',
    cardLabel: 'Althos',
    cardQuoteLine1: 'Ancient Greek for',
    cardQuoteLine2: 'healing',
    cardSub: 'The name was not a random decision.\nIt was a statement of intent.',
  },
  el: {
    label: 'Το Κατάλυμα',
    headlineLine1: 'Χτίστηκε',
    headlineLine2: 'για μια Στιγμή',
    body1: 'Υπάρχει μια στιγμή — συνήθως τη δεύτερη μέρα — που ο επισκέπτης της Althea σταματά να μετρά ό,τι άφησε πίσω. Τα μηνύματα, η ταχύτητα, το βάρος των υπολοίπων.',
    body2: 'Οι λόφοι της Κορινθίας βοηθούν. Το φως πάνω στον Κόλπο κάνει τα υπόλοιπα. Χτίσαμε την Althea γι\' αυτή τη στιγμή.',
    linkLabel: 'Η ιστορία μας',
    linkHref: '/el/about',
    cardLabel: 'Althos',
    cardQuoteLine1: 'Αρχαία ελληνική λέξη',
    cardQuoteLine2: 'για θεραπεία',
    cardSub: 'Το όνομα δεν ήταν τυχαίο.\nΉταν δήλωση πρόθεσης.',
  },
}

export function BrandIntro({ locale = 'en' }: { locale?: Locale }) {
  const c = content[locale]

  return (
    <section className="section-padding bg-[#f2f8fb]" aria-label="About Althea Resorts">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — editorial text block */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <SectionLabel className="mb-8">{c.label}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-lg text-[#102027] mb-8">
                {c.headlineLine1}<br />
                <em className="italic font-light">{c.headlineLine2}</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <GoldLine className="mb-8" />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-body-refined leading-relaxed mb-6">
                {c.body1}
              </p>
              <p className="text-body-refined leading-relaxed mb-10">
                {c.body2}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <a
                href={c.linkHref}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#102027] hover:text-[#ad8b27] transition-colors duration-300"
              >
                {c.linkLabel}
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                  <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                </svg>
              </a>
            </ScrollReveal>
          </div>

          {/* Right — image composition */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 lg:gap-6">
            <ScrollReveal variant="image" className="col-span-1 aspect-[3/4] relative overflow-hidden">
              <Image
                src="https://staging.althearesorts.com/wp-content/uploads/2026/02/1.jpg"
                alt="Althea Resorts — pool and hillside"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </ScrollReveal>
            <div className="col-span-1 flex flex-col gap-4 lg:gap-6 pt-12">
              <ScrollReveal variant="image" className="aspect-square relative overflow-hidden">
                <Image
                  src="https://staging.althearesorts.com/wp-content/uploads/2026/02/2.jpg"
                  alt="Althea Resorts — Corinthian Gulf view"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </ScrollReveal>
              <ScrollReveal variant="fade" delay={200}>
                <div className="bg-[#102027] p-6 flex flex-col gap-3">
                  <span className="text-label-upper text-[#ad8b27]">{c.cardLabel}</span>
                  <p className="font-editorial text-lg font-light text-white/90 leading-snug">
                    {c.cardQuoteLine1}<br />
                    <em className="italic">{c.cardQuoteLine2}</em>
                  </p>
                  <p className="text-xs font-light text-white/50 whitespace-pre-line">
                    {c.cardSub}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
