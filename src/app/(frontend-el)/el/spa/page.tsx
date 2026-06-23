import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { BOOKING_URL, SITE_URL } from '@/lib/constants'
import { SpaBanner } from '@/components/ui/SpaBanner'

export const metadata = genMeta({
  title: 'Ocean Spa — Ευεξία & Θεραπείες',
  description: 'Το Ocean Spa στην Althea Resorts — σάουνα, χαμάμ, λουτρό πάγου, πισίνα spa, δωμάτια θεραπείας, χώρος yoga και γυμναστήριο. Θεραπείες με καλλυντικά Oceanis.',
  keywords: ['Ocean Spa Althea', 'spa Κορινθία', 'καλλυντικά Oceanis', 'χαμάμ Ελλάδα', 'ξενοδοχείο ευεξίας Κορινθία'],
  canonical: `${SITE_URL}/el/spa`,
})

const facilities = [
  { name: 'Σάουνα',                         desc: 'Φινλανδική ξηρή ζέστη. Το είδος που αδειάζει το μυαλό πριν το σώμα.' },
  { name: 'Χαμάμ & Ατμόλουτρο',             desc: 'Παραδοσιακό τελετουργικό ατμού, ανανεωμένο για σύγχρονη αισθητική.' },
  { name: 'Λουτρό Πάγου',                   desc: 'Η αντίθεση που κάνει όλα τα άλλα να νιώθονται σαν ανακούφιση.' },
  { name: 'Αποκλειστική Πισίνα Spa',         desc: 'Ζεστό νερό, ησυχία. Χωριστά από την κεντρική πισίνα του resort.' },
  { name: 'Χώρος Χαλάρωσης',                desc: 'Χρόνος αφιερωμένος στο τίποτα. Σωστά.' },
  { name: 'Αίθουσα Yoga',                    desc: 'Ανοιχτή στον λόφο. Μαθήματα κατόπιν αιτήματος.' },
  { name: 'Πλήρως Εξοπλισμένο Γυμναστήριο', desc: 'Για όσους χρειάζονται κίνηση για να βρουν ηρεμία.' },
  { name: 'Boutique Oceanis',                desc: 'Πάρτε τη συνήθεια σπίτι. Η πλήρης σειρά Oceanis, εντός χώρου.' },
]

const cabins = [
  {
    title: 'Μονό Δωμάτιο Ι & ΙΙ',
    desc: 'Δύο ιδιωτικά δωμάτια θεραπείας για ατομικές συνεδρίες. Signature μασάζ, περιτυλίγματα σώματος και θεραπείες προσώπου με φόρμουλες Oceanis. Κάθε δωμάτιο σχεδιάστηκε για πλήρη ησυχία — χωρίς θόρυβο διαδρόμου, χωρίς διακοπές.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Μονό δωμάτιο θεραπείας — Ocean Spa',
  },
  {
    title: 'Διπλό Δωμάτιο',
    desc: 'Το διπλό δωμάτιο προσφέρει τις ίδιες θεραπείες για δύο, δίπλα-δίπλα. Μασάζ για ζευγάρια, κοινά τελετουργικά ή απλώς η ίδια εμπειρία στο ίδιο δωμάτιο. Διαθέσιμο για οποιονδήποτε συνδυασμό επισκεπτών.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Διπλό δωμάτιο θεραπείας — Ocean Spa',
  },
]

export default function GreekSpaPage() {
  return (
    <main id="main-content">
      <SpaBanner locale="el" />
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Ocean Spa"
      >
        <Image
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=80"
          alt="Ocean Spa — Althea Resorts ευεξία"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Spa & Ευεξία</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              Το Ocean Spa<br />
              <em className="italic font-light text-white/70">Δεν Είναι Παροχή</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Ο Χώρος</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  Ένας από τους Κύριους Λόγους για να Έρθετε
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  Το Ocean Spa στο Althea σχεδιάστηκε ως αυτοτελής προορισμός, όχι ως εγκατάσταση
                  που σημειώνεται σε μια λίστα. Καταλαμβάνει το δικό του τμήμα του καταλύματος —
                  ήσυχο, αδιατάρακτο, χτισμένο γύρω από την ιδέα ότι το σώμα γνωρίζει τι χρειάζεται
                  όταν επιτέλους του δώσετε τις συνθήκες.
                </p>
                <p className="text-body-refined mb-5">
                  Φτάνετε κουβαλώντας το βάρος όλων όσα συνέβησαν πριν έρθετε. Μία ώρα αργότερα,
                  έχετε ξεχάσει πραγματικά τα περισσότερα. Αυτό δεν είναι υπόσχεση. Αυτό συμβαίνει
                  απλώς σε αυτό το δωμάτιο, σε αυτόν τον λόφο, με αυτά τα χέρια.
                </p>
                <p className="text-body-refined">
                  Κάθε θεραπεία χτίζεται γύρω από τα καλλυντικά Oceanis — μια πιστοποιημένη
                  ελληνική μάρκα από την ίδια θάλασσα και γη που περιβάλλει το κατάλυμα. Οι ίδιες
                  φόρμουλες διατίθενται στο Boutique Oceanis — για όσους θέλουν να πάρουν ένα
                  κομμάτι αυτού του τόπου μαζί τους.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="/images/oceanisphoto.jpg"
                alt="Καλλυντικά Oceanis — φυσικά ελληνικά προϊόντα"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="max-w-xl mb-16">
            <ScrollReveal>
              <SectionLabel className="mb-6">Εγκαταστάσεις</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027] mb-6">Όλα Όσα Χρειάζεται ένα Spa</h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoldLine className="mb-0" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e8e4dd]">
            {facilities.map((f, i) => (
              <ScrollReveal key={f.name} delay={i * 60}>
                <div className="bg-white p-8 h-full flex flex-col gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                  <h3 className="text-xs uppercase tracking-[0.18em] text-[#102027] font-light leading-relaxed">
                    {f.name}
                  </h3>
                  <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Cabins */}
      <section className="section-padding bg-[#102027]">
        <div className="container-luxury">
          <div className="max-w-xl mb-16">
            <ScrollReveal>
              <SectionLabel light className="mb-6">Θεραπείες</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-white mb-6">Τρία Δωμάτια. Μια Πρόθεση.</h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoldLine className="mb-6" />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-sm font-light text-white/60 leading-relaxed">
                Το Ocean Spa διαθέτει δύο μονά δωμάτια θεραπείας και ένα διπλό.
                Όλες οι θεραπείες χρησιμοποιούν φόρμουλες Oceanis — μασάζ, τελετουργικά
                σώματος και θεραπείες προσώπου σχεδιασμένες για το δέρμα και την εποχή.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cabins.map((cabin, i) => (
              <ScrollReveal key={cabin.title} delay={i * 100}>
                <div className="group relative overflow-hidden">
                  <div className="aspect-[3/2] relative overflow-hidden">
                    <Image
                      src={cabin.image}
                      alt={cabin.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-[#102027]/20" />
                  </div>
                  <div className="bg-[#0d1b21] p-8">
                    <h3 className="font-editorial text-xl font-light text-white mb-4">{cabin.title}</h3>
                    <p className="text-sm font-light text-white/60 leading-relaxed mb-6">{cabin.desc}</p>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#ad8b27] border-b border-[#ad8b27]/40 pb-1 hover:border-[#ad8b27] transition-colors duration-300"
                    >
                      Κλείστε αυτό το Δωμάτιο
                      <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                        <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200} className="mt-12 text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-10
                         text-xs uppercase tracking-[0.2em]
                         bg-[#ad8b27] text-white border border-[#ad8b27]
                         hover:bg-transparent hover:text-[#ad8b27]
                         transition-all duration-500"
            >
              Κλείστε Θεραπεία
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Oceanis Philosophy */}
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Βιωσιμότητα</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  Oceanis: Η Φιλοσοφία Πίσω από το Προϊόν
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  Η Oceanis παίρνει το όνομά της από τις Ωκεανίδες, τις νύμφες νερού της αρχαίας
                  ελληνικής μυθολογίας, κόρες του Ωκεανού και της Τηθύος. Μια ελληνική μάρκα,
                  ριζωμένη στον ελληνικό μύθο, φτιαγμένη στην Ελλάδα, για ένα κατάλυμα που
                  βρίσκεται πάνω από ελληνικό κόλπο. Όλα συνδέονται.
                </p>
                <p className="text-body-refined mb-5">
                  Οι φόρμουλες είναι πιστοποιημένα βιοδιασπώμενες σε είκοσι οκτώ ημέρες. Η
                  συσκευασία είναι από ανακυκλωμένο PET και είναι εκατό τοις εκατό ανακυκλώσιμη.
                  Κάθε dispenser στο spa και σε κάθε δωμάτιο είναι μέρος ενός συστήματος
                  επαναπλήρωσης σχεδιασμένου να εξαλείψει τα μίας χρήσης απόβλητα.
                </p>
                <p className="text-body-refined">
                  Στο Althea, η βιωσιμότητα δεν είναι ξεχωριστή πρωτοβουλία με τη δική της σελίδα.
                  Είναι μια σειρά από ήσυχες αποφάσεις που πάρθηκαν κατά τον σχεδιασμό του
                  καταλύματος. Η Oceanis είναι μία από αυτές.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80"
                alt="Φυσικά συστατικά — βιώσιμα καλλυντικά Oceanis"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FinalBookingCTA locale="el" />
    </main>
  )
}
