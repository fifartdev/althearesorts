import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { ContactForm } from '@/components/contact/ContactForm'
import { PHONE, EMAIL, INFO_EMAIL, ADDRESS, BOOKING_URL, COORDINATES, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Επικοινωνία',
  description: 'Επικοινωνήστε με την Althea Resorts. Άνω Λουτρό, Ξυλόκαστρο, Κορινθία, Ελλάδα. Τηλ: +30 211 41 84 108. Email: reservations@althearesorts.com.',
  keywords: ['επικοινωνία Althea Resorts', 'τηλέφωνο ξενοδοχείο Κορινθία', 'κρατήσεις Ελλάδα'],
  canonical: `${SITE_URL}/el/contact`,
})

export default function GreekContactPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Επικοινωνία"
      >
        <Image
          src="/images/althea-contact.jpg"
          alt="Althea Resorts — επικοινωνήστε μαζί μας"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Επικοινωνία</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              Επικοινωνήστε<br />
              <em className="italic font-light text-white/70">Μαζί Μας</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <h2 className="text-display-sm text-[#102027] mb-8">Στείλτε μας Μήνυμα</h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <GoldLine className="mb-10" />
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">Διεύθυνση</span>
                    <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">{ADDRESS}</p>
                  </div>
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">Επικοινωνία</span>
                    <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-sm font-light text-[#102027] hover:text-[#ad8b27] transition-colors duration-200 block mb-1">
                      {PHONE}
                    </a>
                    <a href={`mailto:${INFO_EMAIL}`} className="text-sm font-light text-[#102027] hover:text-[#ad8b27] transition-colors duration-200 block mb-1">
                      {INFO_EMAIL}
                    </a>
                    <a href={`mailto:${EMAIL}`} className="text-sm font-light text-[#102027] hover:text-[#ad8b27] transition-colors duration-200">
                      {EMAIL}
                    </a>
                  </div>
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">Οδηγίες</span>
                    <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">
                      60 λεπτά από Αθήνα με αυτοκίνητο. Ακολουθήστε τον αυτοκινητόδρομο
                      Αθηνών–Κορίνθου προς Πελοπόννησο, έξοδος Ξυλοκάστρου. Διαθέσιμη
                      μεταφορά από το κέντρο του Ξυλοκάστρου.
                    </p>
                  </div>
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-4">Κλείστε τη Διαμονή σας</span>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-7 inline-flex items-center
                                 text-xs uppercase tracking-[0.2em]
                                 bg-[#102027] text-white border border-[#102027]
                                 hover:bg-transparent hover:text-[#102027]
                                 transition-all duration-500"
                    >
                      Online Κράτηση
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollReveal delay={100}>
                <ContactForm locale="el" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative h-[500px] overflow-hidden" aria-label="Χάρτης — Τοποθεσία Althea Resorts">
        <iframe
          src={`https://maps.google.com/maps?q=${COORDINATES.lat},${COORDINATES.lng}&z=15&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Althea Resorts — Άνω Λουτρό, Ξυλόκαστρο, Κορινθία, Ελλάδα"
          className="grayscale opacity-90"
        />
        {/* Address bar overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#102027]/90 backdrop-blur-sm px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-label-upper text-[#ad8b27] block mb-1">Althea Resorts</span>
            <p className="text-sm font-light text-white/70">Άνω Λουτρό, Ξυλόκαστρο, Κορινθία, Ελλάδα</p>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${COORDINATES.lat},${COORDINATES.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[#ad8b27] transition-colors duration-300 shrink-0"
          >
            Οδηγίες
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
              <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  )
}
