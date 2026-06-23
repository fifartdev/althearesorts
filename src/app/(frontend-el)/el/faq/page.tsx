'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { PHONE, EMAIL, BOOKING_URL } from '@/lib/constants'

const faqs = [
  {
    category: 'Δωμάτια & Τιμές',
    items: [
      { q: 'Πόσα δωμάτια έχει η Althea Resorts;', a: 'Η Althea Resorts διαθέτει 41 δωμάτια και σουίτες σε έξι κατηγορίες, από το Standard Double έως την Althea Loft Suite με Υπαίθριο Jacuzzi.' },
      { q: 'Ποια είναι η εγγύηση καλύτερης τιμής;', a: 'Η καλύτερη τιμή εγγυάται πάντα όταν κάνετε κράτηση απευθείας μέσω της ιστοσελίδας μας ή επικοινωνώντας μαζί μας τηλεφωνικά ή email. Προσφέρουμε επί του παρόντος 10% έκπτωση σε όλες τις άμεσες κρατήσεις, ισχύει για κρατήσεις έως 30 Ιουνίου 2026.' },
      { q: 'Έχουν όλα τα δωμάτια θέα;', a: 'Όλα τα δωμάτια έχουν είτε θέα βουνό, πισίνα ή θάλασσα. Το Superior Sea View και η Althea Loft Suite προσφέρουν αδιάκοπη θέα στον Κορινθιακό Κόλπο από ευρύχωρες βεράντες.' },
    ],
  },
  {
    category: 'Check-in & Διαμονή',
    items: [
      { q: 'Ποιες είναι οι ώρες check-in και check-out;', a: 'Το check-in είναι από τις 15:00 και το check-out έως τις 11:00. Πρώιμο check-in και late check-out είναι διαθέσιμα κατόπιν αιτήματος, ανάλογα με διαθεσιμότητα.' },
      { q: 'Ποια είναι η ελάχιστη ηλικία για check-in;', a: 'Οι επισκέπτες πρέπει να είναι τουλάχιστον 18 ετών για να κάνουν κράτηση. Τα παιδιά είναι ευπρόσδεκτα και το resort είναι family-friendly.' },
      { q: 'Επιτρέπονται τα κατοικίδια;', a: 'Υποδεχόμαστε μικρά κατοικίδια σε ορισμένες κατηγορίες δωματίων. Παρακαλούμε επικοινωνήστε μαζί μας εκ των προτέρων για να κάνουμε τις κατάλληλες ρυθμίσεις.' },
    ],
  },
  {
    category: 'Τοποθεσία & Μεταφορά',
    items: [
      { q: 'Πόσο μακριά είναι η Althea Resorts από την Αθήνα;', a: 'Η Althea Resorts απέχει περίπου 60 λεπτά από την Αθήνα με αυτοκίνητο μέσω του αυτοκινητοδρόμου Αθηνών–Κορίνθου. Μπορούμε να βοηθήσουμε με ρυθμίσεις ιδιωτικής μεταφοράς κατόπιν αιτήματος.' },
      { q: 'Προσφέρετε μεταφορά από αεροδρόμιο;', a: 'Ναι, μπορούμε να οργανώσουμε ιδιωτικές μεταφορές από το Διεθνές Αεροδρόμιο Αθηνών. Επικοινωνήστε μαζί μας με τα στοιχεία του ταξιδιού σας και θα οργανώσουμε τα υπόλοιπα.' },
    ],
  },
  {
    category: 'Γαστρονομία',
    items: [
      { q: 'Χρειάζεται να κάνω κράτηση στο AITHER εκ των προτέρων;', a: 'Συνιστούμε να κάνετε κράτηση στο AITHER, το εστιατόριο ταράτσάς μας, ιδίως κατά την υψηλή σεζόν. Τα τραπέζια μπορούν να ρυθμιστούν καλώντας απευθείας το resort.' },
      { q: 'Περιλαμβάνεται το πρωινό;', a: 'Το πρωινό είναι διαθέσιμο ως μέρος ορισμένων πακέτων. Ελέγξτε τις τιμές δωματίων κατά την κράτηση ή επικοινωνήστε μαζί μας για να προσθέσετε πρωινό.' },
      { q: 'Εξυπηρετείτε διαιτητικές απαιτήσεις;', a: 'Ναι. Η κουζίνα μας μπορεί να καλύψει τις περισσότερες διαιτητικές απαιτήσεις, συμπεριλαμβανομένων χορτοφαγικών, vegan και αλλεργιογόνων. Παρακαλούμε ενημερώστε μας κατά την κράτηση.' },
    ],
  },
  {
    category: 'Spa & Ευεξία',
    items: [
      { q: 'Χρειάζεται να κλείσω θεραπείες spa εκ των προτέρων;', a: 'Συνιστούμε να κλείνετε θεραπείες εκ των προτέρων, ιδίως κατά τη σεζόν αιχμής. Επικοινωνήστε μαζί μας ή ρωτήστε τη ρεσεψιόν κατά την άφιξη.' },
      { q: 'Ποια προϊόντα χρησιμοποιεί το Ocean Spa;', a: 'Το Ocean Spa χρησιμοποιεί καλλυντικά Oceanis — μια ελληνική μάρκα πιστοποιημένα βιοδιασπώμενη, vegan, χωρίς δοκιμές σε ζώα και δερματολογικά ελεγμένη. Η πλήρης σειρά διατίθεται προς αγορά στη boutique spa.' },
      { q: 'Είναι το spa ανοιχτό σε μη διαμένοντες επισκέπτες;', a: 'Το spa είναι κυρίως για τους επισκέπτες του ξενοδοχείου. Επικοινωνήστε μαζί μας εκ των προτέρων αν θέλετε να ρωτήσετε για ημερήσιες επισκέψεις.' },
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

export default function GreekFAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqs[0].category)
  const active = faqs.find((f) => f.category === activeCategory)!

  return (
    <main id="main-content">
      {/* Header */}
      <section className="pt-40 pb-16 lg:pt-56 lg:pb-20 bg-[#f2f8fb]" aria-label="Συχνές Ερωτήσεις">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionLabel className="mb-6">FAQ</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-[#102027] max-w-2xl mb-8">
              Συχνές<br />
              <em className="italic font-light">Ερωτήσεις</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-body-refined max-w-md">
              Αν δεν βρείτε αυτό που ψάχνετε, καλέστε μας στο{' '}
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-[#102027] hover:text-[#ad8b27] transition-colors duration-200">{PHONE}</a>
              {' '}ή γράψτε στο{' '}
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
                    <p className="text-sm font-light text-[#102027] mb-1">Έχετε ακόμα ερωτήσεις;</p>
                    <p className="text-xs font-light text-[#6b6b6b]">Η ομάδα μας είναι διαθέσιμη για οποιαδήποτε απορία.</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a
                      href={`tel:${PHONE.replace(/\s/g, '')}`}
                      className="h-9 px-5 inline-flex items-center text-xs uppercase tracking-[0.18em] bg-transparent text-[#102027] border border-[#102027] hover:bg-[#102027] hover:text-white transition-all duration-400"
                    >
                      Καλέστε μας
                    </a>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-5 inline-flex items-center text-xs uppercase tracking-[0.18em] bg-[#102027] text-white border border-[#102027] hover:bg-transparent hover:text-[#102027] transition-all duration-400"
                    >
                      Κράτηση
                    </a>
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
