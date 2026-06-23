import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'

type Locale = 'en' | 'el'

const content = {
  en: {
    label: 'Gastronomy',
    headlineLine1: 'Food Here Is Not',
    headlineLine2: 'an Afterthought',
    cardQuote: '"Above the Gulf.\nAbove Everything."',
    cardLabel: 'AITHER',
    body1: 'Every meal begins with the land around it. The olive groves of Corinthia, the fishermen of the Corinthian Gulf, the farmers who have worked this soil for generations.',
    body2: 'AITHER, the resort\'s rooftop restaurant, sits above the Corinthian Gulf, open to the horizon in every direction. The kitchen works with the Mediterranean as its reference point and Greece as its lens. The panoramic views are not decoration. They are part of the meal.',
    venues: ['AITHER Rooftop', 'Morning Breakfast', 'All-Day Dining', 'Bar & Pool Bar'],
    cta: 'Explore Gastronomy',
    ctaHref: '/gastronomy',
  },
  el: {
    label: 'Γαστρονομία',
    headlineLine1: 'Το φαγητό εδώ',
    headlineLine2: 'έχει τη δική του ιστορία',
    cardQuote: '«Πάνω από τον Κόλπο.\nΠάνω από όλα.»',
    cardLabel: 'AITHER',
    body1: 'Κάθε πιάτο ξεκινά από τη γη γύρω μας. Τα ελαιόδεντρα της Κορινθίας, οι ψαράδες του Κόλπου, οι παραγωγοί που καλλιεργούν αυτό το χώμα εδώ και γενιές.',
    body2: 'Το AITHER, το εστιατόριο ταράτσας του resort, υψώνεται πάνω από τον Κορινθιακό Κόλπο, ανοιχτό στον ορίζοντα από παντού. Η κουζίνα μιλά για τη Μεσόγειο μέσα από ελληνική ματιά. Η θέα δεν είναι απλά διακόσμηση — είναι κομμάτι του δείπνου.',
    venues: ['AITHER Ταράτσα', 'Πρωινό', 'Όλη την Ημέρα', 'Bar & Pool Bar'],
    cta: 'Ανακαλύψτε τη Γαστρονομία',
    ctaHref: '/el/gastronomy',
  },
}

export function GastronomySection({ locale = 'en' }: { locale?: Locale }) {
  const c = content[locale]

  return (
    <section className="section-padding bg-[#faf8f4]" aria-label="Gastronomy at Althea Resorts">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="order-2 lg:order-1">
            <ScrollReveal variant="image" className="aspect-[3/4] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80"
                alt="AITHER — Althea Resorts rooftop restaurant"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute -right-6 -bottom-6 bg-[#102027] p-6 w-56 hidden lg:block z-10">
                <p className="font-editorial text-lg font-light text-white/90 leading-snug mb-2 whitespace-pre-line">
                  {c.cardQuote}
                </p>
                <span className="text-label-upper text-[#ad8b27]">{c.cardLabel}</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <SectionLabel className="mb-8">{c.label}</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-[#102027] mb-8">
                {c.headlineLine1}<br />
                <em className="italic font-light">{c.headlineLine2}</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <GoldLine className="mb-8" />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-body-refined mb-6">{c.body1}</p>
              <p className="text-body-refined mb-10">{c.body2}</p>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="flex flex-col gap-4 mb-10">
                {c.venues.map((v) => (
                  <div key={v} className="flex items-center gap-4 py-3 border-b border-[#e8e4dd]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27]" aria-hidden="true" />
                    <span className="text-sm uppercase tracking-widest text-[#102027] font-light">{v}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <a
                href={c.ctaHref}
                className="inline-flex items-center gap-3
                           text-xs uppercase tracking-[0.2em] text-[#102027]
                           border-b border-[#102027] pb-1
                           hover:text-[#ad8b27] hover:border-[#ad8b27]
                           transition-colors duration-300"
              >
                {c.cta}
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                  <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                </svg>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
