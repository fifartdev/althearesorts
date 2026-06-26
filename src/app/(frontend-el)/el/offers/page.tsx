import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { DirectBookingReasons } from '@/components/sections/DirectBookingReasons'
import { SITE_URL } from '@/lib/seo'
import { getOffers, getContactInfo, getBookingSettings } from '@/lib/cms'

export const metadata = genMeta({
  title: 'Προσφορές & Ειδικές Τιμές',
  description: '10% έκπτωση για όλες τις άμεσες κρατήσεις στην Althea Resorts. Προσφορά ανοίγματος ισχύει έως 30 Ιουνίου 2026. Κλείστε απευθείας μέσω ιστοσελίδας, τηλεφώνου ή email.',
  keywords: ['προσφορές Althea Resorts', 'έκπτωση ξενοδοχείο Κορινθία', 'άμεση κράτηση Ελλάδα', 'προσφορά ανοίγματος ξενοδοχείο'],
  canonical: `${SITE_URL}/el/offers`,
})

export default async function GreekOffersPage() {
  const [contactInfo, bookingSettings] = await Promise.all([
    getContactInfo(),
    getBookingSettings(),
  ])
  const phone: string | undefined = (contactInfo as any)?.phone || undefined
  const email: string | undefined = (contactInfo as any)?.email || undefined
  const bookingUrl: string | undefined = (bookingSettings as any)?.bookingEngineUrl || undefined
  const b = bookingSettings as any
  const directReasons = b?.reasons?.length > 0
    ? (b.reasons as any[]).map((r: any) => ({ title: r.title ?? '', body: r.body ?? '' })).filter((r: any) => r.title)
    : undefined
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-130 flex items-end overflow-hidden"
        aria-label="Προσφορές"
      >
        <Image
          src="/images/new-images/althea-deluxe-double7.jpg"
          alt="Althea Resorts — ειδικές προσφορές"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep/90 via-deep/30 to-transparent" />
        {/* Large decorative "10%" */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 font-editorial text-[18vw] font-light text-white/6 leading-none select-none pointer-events-none" aria-hidden="true">
          10%
        </div>
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Προσφορές</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              Λόγοι για να Κάνετε Κράτηση<br />
              <em className="italic font-light text-white/70">Απευθείας Μαζί Μας!</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Page Intro */}
      <section className="section-padding bg-white border-b border-stone">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <GoldLine className="mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body-refined text-lg leading-relaxed">
              Το Althea ανοίγει τις πόρτες του με μια προσφορά που αντανακλά τον τρόπο που
              σκεφτόμαστε τη φιλοξενία: ξεκάθαρη, γενναιόδωρη και χωρίς ψιλά γράμματα που σε
              αναγκάζουν να διαβάζεις δεύτερη φορά. Κάντε κράτηση απευθείας μαζί μας και
              κερδίστε 10% έκπτωση στη διαμονή σας. Χωρίς ενδιάμεσους, χωρίς προμήθειες,
              χωρίς περίπλοκες προϋποθέσεις. Απλώς μια καλύτερη τιμή, επειδή επιλέξατε να
              έρθετε σε εμάς πρώτα!
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Opening Offer */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 bg-gold text-white px-4 py-2 mb-8">
                  <span className="text-xs uppercase tracking-[0.2em]">Προσφορά Ανοίγματος</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-md text-deep mb-6">
                  10% Έκπτωση για Απευθείας Κρατήσεις
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  Για να γιορτάσουμε το άνοιγμα του Althea Resorts, προσφέρουμε έκπτωση 10%
                  σε όλες τις απευθείας κρατήσεις που πραγματοποιούνται μέσω της ιστοσελίδας
                  μας ή επικοινωνώντας απευθείας μαζί μας. Η προσφορά ισχύει για κρατήσεις
                  που θα γίνουν έως το τέλος Ιουνίου 2026 και αφορά όλες τις κατηγορίες
                  δωματίων, από το Standard Double έως το Althea Loft Suite με Εξωτερικό Jacuzzi.
                </p>
                <p className="text-body-refined mb-5">
                  Η απευθείας κράτηση σημαίνει επίσης ότι μιλάτε απευθείας με εμάς. Ερωτήσεις
                  σχετικά με τη διαμονή σας, αιτήματα πριν από την άφιξη, ειδικές διευθετήσεις,
                  όλα διαχειρίζονται από τους ανθρώπους που γνωρίζουν πραγματικά το κατάλυμα,
                  χωρίς τη μεσολάβηση τρίτων.
                </p>
                <p className="text-body-refined mb-10">
                  Αυτός είναι ο τρόπος που προτιμάμε για να καλωσορίσουμε τους πρώτους μας
                  επισκέπτες. Με μια ουσιαστική προσφορά και μια άμεση επικοινωνία.
                </p>
              </ScrollReveal>

              {/* Conditions */}
              <ScrollReveal delay={250}>
                <h3 className="text-label-upper text-deep mb-5">ΙΣΧΥΕΙ ΓΙΑ:</h3>
                <div className="flex flex-col gap-3 mb-10">
                  {[
                    'Όλες τις κατηγορίες δωματίων',
                    'Απευθείας κρατήσεις μόνο μέσω του althearesorts.com ή μέσω τηλεφώνου και email',
                    'Κρατήσεις που θα πραγματοποιηθούν έως τις 30 Ιουνίου 2026',
                  ].map((cond) => (
                    <div key={cond} className="flex items-start gap-3 text-sm font-light text-smoke">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                      {cond}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <h3 className="text-label-upper text-deep mb-5">Τρόποι Κράτησης</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  {bookingUrl && (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-7 inline-flex items-center justify-center
                                 text-xs uppercase tracking-[0.2em]
                                 bg-deep text-white border border-deep
                                 hover:bg-transparent hover:text-deep
                                 transition-all duration-500"
                    >
                      Online Κράτηση
                    </a>
                  )}
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="h-11 px-7 inline-flex items-center justify-center
                                 text-xs uppercase tracking-[0.2em]
                                 bg-transparent text-deep border border-deep
                                 hover:bg-deep hover:text-white
                                 transition-all duration-500"
                    >
                      {phone}
                    </a>
                  )}
                </div>
                {email && (
                  <p className="mt-4 text-sm font-light text-smoke">
                    Ή γράψτε μας στο{' '}
                    <a href={`mailto:${email}`} className="text-gold hover:underline">
                      {email}
                    </a>
                  </p>
                )}
              </ScrollReveal>
            </div>

            {/* Offer card */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={150}>
                <div className="bg-deep p-10 text-center sticky top-32">
                  <span className="text-label-upper text-gold block mb-4">Προσφορά Ανοίγματος</span>
                  <div className="font-editorial text-8xl font-light text-white leading-none mb-4">
                    10%
                  </div>
                  <p className="text-sm font-light text-white/60 mb-8">
                    Έκπτωση σε όλη τη διαμονή σας με άμεση κράτηση
                  </p>
                  <p className="text-xs font-light text-white/40 uppercase tracking-wider mb-8">
                    Ισχύει έως 30 Ιουνίου 2026
                  </p>
                  {bookingUrl && (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-7 inline-flex items-center justify-center w-full
                                 text-xs uppercase tracking-[0.2em]
                                 bg-gold text-white border border-gold
                                 hover:bg-transparent hover:text-gold
                                 transition-all duration-500"
                    >
                      Εξαργυρώστε την Προσφορά
                    </a>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <DirectBookingReasons
        label={b?.directBookingLabel || undefined}
        headline1={b?.directBookingHeadline1 || undefined}
        headline2={b?.directBookingHeadline2 || undefined}
        intro={b?.directBookingIntro || undefined}
        ctaLabel={b?.directBookingCtaLabel || undefined}
        reasons={directReasons}
        bookingUrl={bookingUrl}
      />
    </main>
  )
}
