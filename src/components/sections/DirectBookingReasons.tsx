'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { BOOKING_URL } from '@/lib/constants'

type Locale = 'en' | 'el'

const content = {
  en: {
    label: 'Direct Booking',
    headlineLine1: 'Reasons to Book',
    headlineLine2: 'Directly With Us',
    body: 'Booking direct means you speak to the people who actually know the property. Every arrangement, every request, every question — handled without a third party in between.',
    cta: 'Book Direct Now',
    reasons: [
      {
        title: 'Best Rate Guarantee',
        body: 'When you book directly through our website or by calling us, you always get the best available rate — guaranteed. No platform fees, no margin added for third parties. If you find a lower price elsewhere for the same dates and room, we will match it.',
      },
      {
        title: 'Priority Room Allocation',
        body: 'Direct guests are the first to receive our best-positioned rooms. When a sea-view room or a suite with a private pool becomes available, it goes to guests who came directly to us first.',
      },
      {
        title: 'Free Room Upgrade',
        body: 'Subject to availability at check-in, direct bookings receive complimentary upgrades to the next room category. We cannot promise it every time, but we always try — because you came to us directly.',
      },
      {
        title: 'Free Early / Late Check-In & Check-Out',
        body: 'We do our best to accommodate early arrivals and late departures for all direct bookings, subject to the property\'s schedule. No extra charge. No negotiation required at the desk.',
      },
    ],
  },
  el: {
    label: 'Άμεση Κράτηση',
    headlineLine1: 'Λόγοι για να Κάνετε',
    headlineLine2: 'Κράτηση Απευθείας',
    body: 'Κάνοντας απευθείας κράτηση, επικοινωνείτε με τους ανθρώπους που γνωρίζουν πραγματικά το κατάλυμα. Κάθε συνεννόηση, κάθε αίτημα, κάθε ερώτηση, όλα διεκπεραιώνονται χωρίς τη μεσολάβηση τρίτων.',
    cta: 'Κλείστε Απευθείας',
    reasons: [
      {
        title: 'Εγγύηση Καλύτερης Τιμής',
        body: 'Όταν κάνετε κράτηση απευθείας μέσω της ιστοσελίδας μας ή τηλεφωνικά, έχετε πάντα εγγυημένα την καλύτερη διαθέσιμη τιμή. Χωρίς προμήθειες πλατφόρμας, χωρίς επιπλέον χρεώσεις για τρίτους. Εάν βρείτε χαμηλότερη τιμή αλλού για τις ίδιες ημερομηνίες και τον ίδιο τύπο δωματίου, θα σας επιστρέψουμε τη διαφορά.',
      },
      {
        title: 'Προτεραιότητα στην Κατανομή Δωματίων',
        body: 'Οι επισκέπτες που κλείνουν απευθείας είναι πάντα οι πρώτοι που λαμβάνουν τα καλύτερα τοποθετημένα δωμάτιά μας. Δωμάτια με θέα στη θάλασσα ή σουίτες με ιδιωτική πισίνα πηγαίνουν σε αυτούς που επέλεξαν να έρθουν απευθείας σε εμάς.',
      },
      {
        title: 'Δωρεάν Αναβάθμιση Δωματίου',
        body: 'Ανάλογα με τη διαθεσιμότητα κατά το check-in, οι άμεσες κρατήσεις λαμβάνουν δωρεάν αναβάθμιση στην επόμενη κατηγορία δωματίου. Δεν μπορούμε να το εγγυηθούμε κάθε φορά, αλλά πάντα προσπαθούμε — γιατί επιλέξατε να έρθετε απευθείας σε εμάς.',
      },
      {
        title: 'Δωρεάν Early Check-In & Late Check-Out',
        body: 'Κάνουμε ό,τι μπορούμε για να εξυπηρετήσουμε πρώιμες αφίξεις και αργές αναχωρήσεις για όλες τις άμεσες κρατήσεις, ανάλογα με τη διαθεσιμότητα του καταλύματος. Χωρίς επιπλέον χρέωση. Χωρίς διαπραγμάτευση στη ρεσεψιόν.',
      },
    ],
  },
}

export function DirectBookingReasons({ locale = 'en' }: { locale?: Locale }) {
  const [open, setOpen] = useState<number>(0)
  const c = content[locale]

  return (
    <section className="section-padding bg-[#f2f8fb]" aria-label="Reasons to book directly">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <ScrollReveal>
              <SectionLabel className="mb-6">{c.label}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-[#102027] mb-8">
                {c.headlineLine1}<br />
                <em className="italic font-light">{c.headlineLine2}</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="text-body-refined mb-10">{c.body}</p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-8 inline-flex items-center
                           text-xs uppercase tracking-[0.2em]
                           bg-[#102027] text-white border border-[#102027]
                           hover:bg-transparent hover:text-[#102027]
                           transition-all duration-500"
              >
                {c.cta}
              </a>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal delay={100}>
              <div className="flex flex-col divide-y divide-[#e8e4dd]">
                {c.reasons.map((reason, i) => {
                  const isOpen = open === i
                  return (
                    <div key={reason.title}>
                      <button
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className={`w-full flex items-center justify-between gap-6 py-6 text-left transition-colors duration-300 ${
                          isOpen ? 'text-[#102027]' : 'text-[#6b6b6b] hover:text-[#102027]'
                        }`}
                      >
                        <span className="font-editorial text-xl font-light leading-snug">
                          {reason.title}
                        </span>
                        <span
                          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? 'border-[#ad8b27] bg-[#ad8b27] text-white'
                              : 'border-[#e8e4dd] bg-white text-[#102027]'
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
