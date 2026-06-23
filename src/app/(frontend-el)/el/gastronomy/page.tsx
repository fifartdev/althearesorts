import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { PHONE, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Γαστρονομία — AITHER Εστιατόριο Ταράτσας',
  description: 'AITHER, το εστιατόριο ταράτσας της Althea Resorts — πανοραμική θέα στον Κορινθιακό Κόλπο, μεσογειακή κουζίνα με ελληνική ματιά. All-day dining, πρωινό, bar και pool bar.',
  keywords: ['εστιατόριο AITHER', 'εστιατόριο ταράτσας Κορινθία', 'ελληνική γαστρονομία', 'Althea Resorts εστιατόριο'],
  canonical: `${SITE_URL}/el/gastronomy`,
})

const venues = [
  {
    id: 'all-day',
    label: 'All Day Dining',
    title: 'Κάτι Εκλεκτό, Κάθε Ώρα της Ημέρας.',
    desc: 'Ανάμεσα στα γεύματα, η κουζίνα του Althea παραμένει ανοιχτή. Ελαφριά πιάτα, καθαρές γεύσεις, υλικά που δεν χρειάζονται περίπλοκες διαχειρίσεις για να αναδειχθούν. Είτε επιστρέφετε από την πισίνα είτε από την παραλία, υπάρχει πάντα κάτι που αξίζει να απολαύσετε. Το all-day μενού ακολουθεί την ίδια φιλοσοφία με καθετί στο Althea: εξαιρετικές πρώτες ύλες, με σεβασμό, σερβιρισμένες χωρίς περιττούς εντυπωσιασμούς.',
    image: '/images/restaurant/althea-indoor-outdoor-12.jpg',
    imageAlt: 'All-day dining στο Althea',
    bg: 'bg-[#dde6ea]',
  },
  {
    id: 'breakfast',
    label: 'Πρωινό',
    title: 'Το Ελληνικό Πρωινό',
    desc: 'Το πρωινό στο Althea είναι μια ιεροτελεστία που απαιτεί χρόνο. Το τραπέζι στρώνεται με ό,τι προσφέρει η κάθε εποχή. Τοπικό μέλι, φρέσκο ψωμί, τυριά από τα γύρω χωριά, αυγά, ελιές, φρούτα κομμένα στην ώρα τους. Πρόκειται για μπουφέ, που όμως δεν θυμίζει σε τίποτα έναν τυπικό μπουφέ ξενοδοχείου. Μοιάζει περισσότερο με μια σπιτική κουζίνα, φροντισμένη σε μεγαλύτερη κλίμακα. Εδώ δεν υπάρχει βιασύνη. Το πρωινό φως πάνω από τον Κορινθιακό κόλπο είναι από μόνο του επαρκής λόγος για να καθυστερήσετε λίγο παραπάνω απολαμβάνοντας το δεύτερο φλιτζάνι καφέ σας.',
    image: '/images/breakfast/althea-breakfast-18.jpg',
    imageAlt: 'Μεσογειακό πρωινό στο Althea',
    bg: 'bg-[#f7f4ef]',
  },
  {
    id: 'bar',
    label: 'Bar',
    title: 'Το Bar του Althea',
    desc: 'Εκλεκτά αποστάγματα, καλοφτιαγμένα κοκτέιλ και η κατάλληλη ηρεμία που βοηθά μια συζήτηση να εμβαθύνει. Η συλλογή είναι προσεκτικά επιλεγμένη: κρασιά από τον ελληνικό αμπελώνα, premium ποτά που αξίζει να γνωρίσετε και κοκτέιλ φτιαγμένα με έμπνευση και όχι από συνήθεια. Ανοιχτό από αργά το απόγευμα έως τη νύχτα, για όσους δεν βιάζονται και έχουν βρει έναν καλό λόγο να παραμείνουν στο τραπέζι.',
    image: 'https://images.unsplash.com/photo-1674654658721-ffc9c08ee1d0?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Bar Althea — κοκτέιλ στο χέρι',
    bg: 'bg-[#f2f8fb]',
  },
  {
    id: 'pool-bar',
    label: 'Bar Πισίνας',
    title: 'Δίπλα στο Νερό Όλη Μέρα',
    desc: 'Δροσερά ποτά, ελαφριά σνακ, ο ήχος του νερού. Το pool bar είναι το μέρος όπου το απόγευμα παρατείνεται ευχάριστα. Ένας καφές που δίνει τη θέση του σε ένα κοκτέιλ, ένας φρέσκος χυμός που γίνεται η αφορμή για μια μεγάλη κουβέντα. Το μενού είναι σχεδιασμένο με γνώμονα την απλότητα: φρούτα εποχής, ελαφριά bites, καθετί που επιθυμείτε όταν χαλαρώνετε κάτω από τον ήλιο. Δεν χρειάζεται καμία βιασύνη. Τα πάντα θα σας περιμένουν...',
    image: 'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Χαλάρωση δίπλα στην πισίνα του Althea',
    bg: 'bg-[#dde6ea]',
  },
]

export default function GreekGastronomyPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Γαστρονομία"
      >
        <Image
          src="/images/breakfast/althea-breakfast-14.jpg"
          alt="AITHER — εστιατόριο ταράτσας Althea Resorts"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Γαστρονομία</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              AITHER • Rooftop Restaurant
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/55 leading-relaxed mt-6 max-w-sm">
              Πάνω από τον Κόλπο Και Πάνω από Όλα!
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* AITHER featured section */}
      <section id="aither" className="section-padding bg-[#e8e4dd]" aria-label="Εστιατόριο AITHER">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">AITHER</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  Το Εστιατόριο Αναφοράς<br />της Althea Resorts
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5 leading-loose">
                  Το AITHER είναι το signature εστιατόριο του Althea Resorts. Το όνομά του
                  προέρχεται από την αρχαία ελληνική λέξη <em>Αιθήρ</em>, τον καθαρό αέρα που
                  υπάρχει πάνω από τα σύννεφα, τη φωτεινή ανώτερη ατμόσφαιρα όπου ανέπνεαν οι
                  θεοί. Ένα rooftop εστιατόριο που πήρε το όνομά του από τα υψηλότερα στρώματα του
                  ουρανού, τοποθετημένο πάνω από τον Κορινθιακό κόλπο, ανοιχτό στον ορίζοντα προς
                  κάθε κατεύθυνση. Ένα όνομα που δικαιώνεται κάθε βράδυ.
                </p>
                <p className="text-body-refined mb-5 leading-loose">
                  Η κουζίνα λειτουργεί με σημείο αναφοράς τη Μεσόγειο και πρίσμα την Ελλάδα, με
                  υλικά που προέρχονται από αυτή τη γη και αυτή τη θάλασσα, προετοιμασμένα με τη
                  φροντίδα που μετατρέπει κάτι απλό σε αξιοσημείωτο. Το μενού ανανεώνεται, η
                  ατμόσφαιρα ακολουθεί τους ρυθμούς της ώρας και η θέα μεταβάλλεται μαζί με το
                  φως. Εκείνο που παραμένει σταθερό είναι η ποιότητα όσων φτάνουν στο τραπέζι και
                  η αίσθηση ότι κάποιος έχει σκεφτεί προσεκτικά κάθε στιγμή της βραδιάς σας,
                  όχι μόνο το φαγητό.
                </p>
                <p className="text-body-refined mb-5 leading-loose">
                  Η πανοραμική θέα στον Κορινθιακό κόλπο είναι ο λόγος που το εστιατόριο
                  βρίσκεται σε αυτό ακριβώς το σημείο. Ένα καθαρό βράδυ, με τα βουνά της Στερεάς
                  Ελλάδας να διαγράφονται στην απέναντι όχθη και τις τελευταίες ακτίνες του
                  ήλιου να χαϊδεύουν το νερό, το AITHER είναι η καλύτερη θέση σε ολόκληρη
                  την Κορινθία.
                </p>
                <p className="text-body-refined mb-10 leading-loose">
                  Το AITHER είναι το είδος του εστιατορίου για το οποίο οι επισκέπτες
                  επιστρέφουν στο Althea, όχι μόνο μία φορά, αλλά κάθε φορά!
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  Κράτηση Τραπεζιού
                </a>
                <p className="mt-3 text-xs font-light text-[#6b6b6b]">
                  Καλέστε μας στο {PHONE} — ρεσεψιόν ή εστιατόριο
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" className="aspect-[3/4] w-full relative overflow-hidden">
              <Image
                src="/images/aither.jpg"
                alt="Εστιατόριο AITHER με θέα τον Κόλπο"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Other venues */}
      {venues.map((venue, i) => (
        <section
          key={venue.id}
          id={venue.id}
          className={`section-padding ${venue.bg}`}
          aria-label={venue.title}
        >
          <div className="container-luxury">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
              <div className={i % 2 !== 0 ? 'lg:col-start-2' : ''}>
                <ScrollReveal>
                  <SectionLabel className="mb-6">{venue.label}</SectionLabel>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h2 className="text-display-sm text-[#102027] mb-6">
                    {venue.title}
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={150}>
                  <GoldLine className="mb-8" />
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p className="text-body-refined mb-8 leading-loose">
                    {venue.desc}
                  </p>
                </ScrollReveal>
              </div>
              <div className={i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <ScrollReveal variant="image" className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={venue.image}
                    alt={venue.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <FinalBookingCTA locale="el" />
    </main>
  )
}
