import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { DirectBookingReasons } from '@/components/sections/DirectBookingReasons'
import Link from 'next/link'
import { BOOKING_URL, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Προσφορές & Ειδικές Τιμές',
  description: 'Δεν υπάρχουν ενεργές προσφορές αυτή τη στιγμή. Κλείστε απευθείας με την Althea Resorts για εγγυημένα καλύτερη τιμή — χωρίς μεσάζοντες, χωρίς προμήθειες.',
  keywords: ['προσφορές Althea Resorts', 'ειδικές τιμές ξενοδοχείο Κορινθία', 'άμεση κράτηση Ελλάδα', 'καλύτερη τιμή ξενοδοχείο'],
  canonical: `${SITE_URL}/el/offers`,
})

export default function GreekOffersPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Προσφορές"
      >
        <Image
          src="https://staging.althearesorts.com/wp-content/uploads/2026/02/althea-exclusive-resorts-spa-9.png"
          alt="Althea Resorts — ειδικές προσφορές"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Προσφορές</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              Ειδικές Προσφορές<br />
              <em className="italic font-light text-white/70">στην Althea Resorts</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Δεν υπάρχουν ενεργές προσφορές */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <GoldLine className="mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body-refined text-lg leading-relaxed mb-5">
              Δεν υπάρχουν ενεργές προσφορές αυτή τη στιγμή. Επισκεφθείτε μας ξανά
              σύντομα — κατά καιρούς διαθέτουμε αποκλειστικές προσφορές και εποχιακές
              τιμές για άμεσες κρατήσεις.
            </p>
            <p className="font-editorial text-xl font-light italic text-[#102027] mb-10">
              Η άμεση κράτηση εγγυάται πάντα την καλύτερη διαθέσιμη τιμή.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-7 inline-flex items-center justify-center
                           text-xs uppercase tracking-[0.2em]
                           bg-[#102027] text-white border border-[#102027]
                           hover:bg-transparent hover:text-[#102027]
                           transition-all duration-500"
              >
                Κράτηση Τώρα
              </a>
              <Link
                href="/el/contact"
                className="h-11 px-7 inline-flex items-center justify-center
                           text-xs uppercase tracking-[0.2em]
                           bg-transparent text-[#102027] border border-[#102027]
                           hover:bg-[#102027] hover:text-white
                           transition-all duration-500"
              >
                Επικοινωνία
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DirectBookingReasons locale="el" />
    </main>
  )
}
