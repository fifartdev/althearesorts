import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Εμπειρίες — Spa, Δραστηριότητες, Γάμοι & Εκδηλώσεις',
  description: 'Ocean Spa, πισίνα, δραστηριότητες, γάμοι και εκδηλώσεις στην Althea Resorts, Κορινθία. Αρχαίες ευεξία με σύγχρονες θεραπείες Oceanis.',
  keywords: ['Ocean Spa Althea', 'spa Κορινθία', 'καλλυντικά Oceanis', 'γάμοι Κορινθία', 'εταιρικές εκδηλώσεις Ελλάδα'],
  canonical: `${SITE_URL}/el/experiences`,
})

export default function GreekExperiencesPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Εμπειρίες"
      >
        <Image
          src="https://staging.althearesorts.com/wp-content/uploads/2026/02/1.jpg"
          alt="Althea Resorts — εμπειρίες και ευεξία"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Εμπειρίες</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              Λόγοι για να επιστρέψετε!
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/55 leading-relaxed mt-6 max-w-lg">
              Οι περισσότεροι επισκέπτες φτάνουν με ένα πρόγραμμα στο μυαλό τους. Τα περισσότερα
              προγράμματα αλλάζουν μέχρι το δεύτερο πρωινό!
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Page Intro */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <GoldLine className="mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body-refined text-lg leading-relaxed mb-5">
              Ένα resort δεν είναι απλώς ένα μέρος για να κοιμηθείς καλά. Στο Althea, η εμπειρία
              εκτείνεται πολύ πέρα από το δωμάτιο, την πισίνα, το{' '}
              <a href="/el/spa" className="text-[#ad8b27] hover:underline font-light">spa</a>{' '}
              ή τη θέα από τη βεράντα. Οι λόφοι της Κορινθίας ζητούν να τους εξερευνήσετε.
            </p>
            <p className="text-body-refined text-lg leading-relaxed mb-5">
              Η θάλασσα απέχει μόλις πέντε λεπτά. Το spa έχει δημιουργηθεί για να σταματήσετε
              εντελώς τους ρυθμούς σας, αφήνοντας το σώμα σας να θυμηθεί πως είναι η πραγματική
              ξεκούραση. Και όταν η περίσταση απαιτεί κάτι μεγαλύτερο, έναν γάμο, μια εταιρική
              συγκέντρωση με ουσιαστικό νόημα, το Althea ξέρει πώς να τη φιλοξενήσει ιδανικά.
              Όποιος κι αν είναι ο λόγος που σας έφερε εδώ, σας περιμένουν περισσότερα από όσα
              φαντάζεστε.
            </p>
            <p className="text-body-refined text-lg leading-relaxed">
              Οι περισσότεροι επισκέπτες φτάνουν με ένα πρόγραμμα στο μυαλό τους. Τα περισσότερα
              προγράμματα αλλάζουν μέχρι το δεύτερο πρωινό!
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="/images/activities%20pexel%20photo.jpg"
                alt="Πεζοπορία και δραστηριότητες στην Κορινθία"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Δραστηριότητες</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">Κινηθείτε στους Δικούς σας Ρυθμούς</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined">
                  Το τοπίο γύρω από το Althea δεν είναι ένα απλό φόντο. Είναι μέρος της εμπειρίας που
                  ήρθατε να ζήσετε. Μονοπάτια πεζοπορίας ελίσσονται μέσα από τους κορινθιακούς
                  λόφους, προσφέροντας θέα που σε αναγκάζει να σταματήσεις σε κάθε βήμα. Ποδηλατικές
                  διαδρομές ακολουθούν την ακτογραμμή με όποια ταχύτητα επιλέξετε. Συνεδρίες γιόγκα
                  στο ύπαιθρο, με φόντο τον κόλπο, από εκείνες που σε κάνουν να ξεχνάς να κοιτάξεις το
                  ρολόι. Οι δραστηριότητες στο Althea είναι σχεδιασμένες για επισκέπτες που θέλουν να
                  βιώσουν το μέρος στο οποίο βρίσκονται, και όχι απλώς να το φωτογραφίσουν από
                  απόσταση. Καθώς το resort αναπτύσσεται, προσθέτουμε συνεχώς νέες εμπειρίες: ρωτήστε
                  μας απευθείας και θα σας ενημερώσουμε για όλα όσα έρχονται!
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Spa */}
      <section id="spa" className="section-padding bg-[#102027]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden lg:sticky lg:top-32">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80"
                alt="Ocean Spa — Althea Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel light className="mb-6">Spa, The Ocean</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-white mb-6">Το Σώμα Εναρμονίζεται με το Πνεύμα</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  Το Ocean Spa στο Althea δεν είναι μια απλή προσθήκη στις παροχές του resort. Είναι ένας
                  από τους βασικότερους λόγους για να μας επισκεφθείτε. Οι θεραπείες βασίζονται στα
                  καλλυντικά Oceanis, ένα ελληνικό brand που αντλεί τη δύναμή του από την ίδια θάλασσα
                  και τη γη που περιβάλλει το κατάλυμα, και κάθε θεραπεία επιλέγεται για τα πραγματικά
                  της οφέλη και όχι για το πώς ακούγεται σε έναν κατάλογο.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  Οι εγκαταστάσεις σχεδιάστηκαν με την ίδια φιλοσοφία όπως καθετί στο Althea: τίποτα
                  περιττό, τίποτα λιγότερο από το τέλειο. Σάουνα και χαμάμ με steam room για θερμότητα και
                  αποτοξίνωση. Ice bath για όσους γνωρίζουν τα οφέλη της κρυοθεραπείας. Μια ειδικά
                  διαμορφωμένη πισίνα, ένας χώρος χαλάρωσης όπου ο χρόνος κυριολεκτικά σταματά, και
                  μια αίθουσα γιόγκα ανοιχτή στην κίνηση και τη γαλήνη σε ίση μοίρα. Ένα πλήρως
                  εξοπλισμένο γυμναστήριο για όσους θέλουν να κρατήσουν το σώμα τους σε φόρμα. Δύο
                  μονές καμπίνες θεραπείας και μία διπλή καμπίνα για ζευγάρια ή για όσους επιζητούν
                  περισσότερη άνεση χώρου. Αποδυτήρια, ιδιωτικοί χώροι και μια boutique καλλυντικών με
                  ολόκληρη τη σειρά Oceanis, για όσους θέλουν να πάρουν ένα κομμάτι αυτής της εμπειρίας
                  μαζί τους στο σπίτι.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-8">
                  Οι θεραπευτές μας ακολουθούν τους δικούς σας σωματικούς ρυθμούς. Δεν βιάζονται. Και
                  δεν θέλουν να βιάζεστε ούτε εσείς. Φτάνετε κουβαλώντας το βάρος της καθημερινότητας
                  που προηγήθηκε. Μία ώρα μετά, έχετε ειλικρινά ξεχάσει το μεγαλύτερο μέρος της. Δεν
                  είναι μια απλή υπόσχεση. Είναι αυτό που συμβαίνει σε αυτόν τον χώρο, σε αυτή την
                  πλαγιά, από αυτά τα χέρια.
                </p>
              </ScrollReveal>

              {/* Oceanis philosophy */}
              <ScrollReveal delay={250}>
                <div className="border-t border-white/10 pt-8 mb-8">
                  <h3 className="text-label-upper text-[#ad8b27] mb-5">OCEANIS: Η ΦΙΛΟΣΟΦΙΑ ΠΙΣΩ ΑΠΟ ΤΑ ΠΡΟΪΟΝΤΑ</h3>
                  <p className="text-sm font-light text-white/50 leading-relaxed mb-4">
                    Η επιλογή της Oceanis ήταν μια απόφαση βασισμένη σε κοινές αξίες, για την οποία δεν
                    χρειάστηκε δεύτερη σκέψη. Η Oceanis πήρε το όνομά της από τις Ωκεανίδες, τις νύμφες
                    των υδάτων στην αρχαία ελληνική μυθολογία, κόρες του Ωκεανού και της Τηθύος, που
                    οδηγούσαν τα νερά των πηγών προς την ανοιχτή θάλασσα. Το όνομα κρύβει τη δική του
                    λογική: ένα ελληνικό brand, ριζωμένο στον ελληνικό μύθο, φτιαγμένο στην Ελλάδα, για ένα
                    θέρετρο που ατενίζει έναν ελληνικό κόλπο. Όλα συνδέονται. Οι φόρμουλες είναι
                    πιστοποιημένα βιοδιασπώμενες σε είκοσι οκτώ ημέρες. Οι συσκευασίες κατασκευάζονται
                    από ανακυκλωμένο PET και είναι 100% ανακυκλώσιμες. Κάθε dispenser στο spa και στα
                    δωμάτια αποτελεί μέρος ενός συστήματος refill, σχεδιασμένου να εξαλείφει τα απορρίμματα
                    μιας χρήσης στην πηγή τους, αντί να τα διαχειρίζεται εκ των υστέρων. Τα προϊόντα είναι
                    vegan, cruelty-free και δερματολογικά ελεγμένα. Δεν περιέχουν επιβλαβή χημικά, είναι
                    πιστοποιημένα, εγγυημένα και ελεγμένα.
                  </p>
                  <p className="text-sm font-light text-white/50 leading-relaxed mb-4">
                    Στο Althea, η βιωσιμότητα δεν είναι μια ξεχωριστή πρωτοβουλία με τη δική της σελίδα και
                    τις δικές της υποσχέσεις. Είναι μια σειρά από αθόρυβες αποφάσεις που πάρθηκαν κατά τον
                    σχεδιασμό του καταλύματος: στα υλικά που χρησιμοποιήθηκαν, στα τρόφιμα που
                    επιλέγονται, στο brand που τοποθετείται στο ράφι του μπάνιου. Η Oceanis είναι μία από
                    αυτές τις αποφάσεις. Ένα ελληνικό brand που γνωρίζει πώς είναι η υπεύθυνη παραγωγή,
                    επιλεγμένο από ένα ελληνικό resort που νιώθει το ίδιο για τη γη του.
                  </p>
                  <p className="text-sm font-light text-white/40 leading-relaxed">
                    Η πλήρης σειρά Oceanis είναι διαθέσιμη στη boutique του spa για τους επισκέπτες που
                    επιθυμούν να συνεχίσουν την εμπειρία στο σπίτι.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <a
                  href="/el/spa"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 hover:text-[#ad8b27] hover:border-[#ad8b27] transition-colors duration-300"
                >
                  Ανακαλύψτε το Πλήρες Ocean Spa
                  <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                    <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pool */}
      <section id="pool" className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/3] w-full relative overflow-hidden">
              <Image
                src="/images/main-pool.jpg"
                alt="Κεντρική πισίνα στην Althea Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Πισίνα</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  Η κεντρική πισίνα του Althea είναι το μέρος όπου δεν χρειάζεται καμία προσπάθεια από
                  μέρους σας. Καθαρό νερό, φυσικά υλικά, ξαπλώστρες τοποθετημένες ακριβώς εκεί που το
                  φως πέφτει σωστά και το pool bar αρκετά κοντά ώστε να μην χρειάζεται να πάτε μακριά
                  για τίποτα. Ορισμένοι επισκέπτες κατεβαίνουν για μια βουτιά και μένουν για τέσσερις
                  ώρες. Κανείς δεν εκπλήσσεται με αυτό. Ο χρόνος δίπλα σε αυτή την πισίνα έχει μια
                  ιδιαίτερη ιδιότητα: κυλά πιο αργά από οπουδήποτε αλλού, και αυτός είναι ακριβώς ο
                  σκοπός.
                </p>
                <p className="text-body-refined">
                  Φέρτε ένα βιβλίο. Αφήστε το κλειστό. Και τα δύο είναι απολύτως αποδεκτά!
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Events header */}
      <section className="section-padding bg-white" aria-label="Εκδηλώσεις στο Althea">
        <div className="container-luxury text-center">
          <ScrollReveal>
            <SectionLabel className="mb-6 justify-center">Εκδηλώσεις</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-display-sm text-[#102027] mb-6">
              Η Περίσταση Αξίζει<br />Κάτι Παραπάνω από Έναν Χώρο
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <GoldLine className="mx-auto" />
          </ScrollReveal>
        </div>
      </section>

      {/* Corporate Events */}
      <section id="conference" className="pt-0 pb-0 section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Εταιρικές Εκδηλώσεις</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  Συναντήσεις που Αφήνουν το Αποτύπωμά τους
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-10">
                  Οι καλύτερες εταιρικές συναντήσεις πραγματοποιούνται όταν το ίδιο το περιβάλλον βοηθά
                  στη δουλειά. Όταν οι άνθρωποι απομακρύνονται από τα γνώριμα γραφεία και τις
                  συνηθισμένες αίθουσες, κάτι αλλάζει. Οι συζητήσεις γίνονται πιο άμεσες. Οι ιδέες έρχονται
                  πιο εύκολα. Η ένταση που δημιουργείται στα κλασικά συνεδριακά περιβάλλοντα απλώς
                  δεν σας ακολουθεί εδώ. Στο Althea, οι χώροι είναι ευέλικτοι και άρτια εξοπλισμένοι, αλλά
                  είναι το περιβάλλον που κάνει την πραγματική διαφορά: οι λόφοι, η θάλασσα, τα κοινά
                  γεύματα, τα βράδια που εξελίσσονται φυσικά σε κάτι που μοιάζει λιγότερο με
                  επαγγελματικό ταξίδι και περισσότερο με αφορμή για να εμπιστευτείς τους ανθρώπους με
                  τους οποίους συνεργάζεσαι. Οι ομάδες φεύγουν από το Althea με αποφάσεις που έχουν
                  παρθεί και με ανανεωμένη ενέργεια.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={220}>
                <h3 className="text-label-upper text-[#102027] mb-6">Συνεδριακές Εγκαταστάσεις</h3>
                <p className="text-body-refined mb-10">
                  Η αίθουσα συνεδριάσεων του Althea έχει χωρητικότητα έως και εκατό άτομα σε διάταξη
                  θεάτρου, ένας χώρος για σημαντικές συναντήσεις, χωρίς την εταιρική ανωνυμία που
                  συνήθως τις συνοδεύει. Η αίθουσα είναι πλήρως εξοπλισμένη με δυνατότητα να
                  μετατραπεί από μια μεγάλη συνεδρίαση ολομέλειας σε μια πιο προσωπική μορφή εργασίας,
                  ανάλογα με τις απαιτήσεις της ημέρας. Αυτό που την ξεχωρίζει είναι όλα όσα βρίσκονται
                  έξω από τους τοίχους της: τα διαλείμματα δίπλα στην πισίνα, τα γεύματα που φέρνουν
                  κοντά τους ανθρώπους, τα βράδια που μετατρέπουν τους συναδέλφους σε ανθρώπους που
                  εμπιστεύονται ο ένας τον άλλον.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <h3 className="text-label-upper text-[#102027] mb-5">Διατάξεις Αίθουσας</h3>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {[
                    { layout: 'Theatre',   capacity: '100 άτομα' },
                    { layout: 'Classroom', capacity: '60 άτομα' },
                    { layout: 'U-Shape',   capacity: '40 άτομα' },
                    { layout: 'Boardroom', capacity: '30 άτομα' },
                  ].map((c) => (
                    <div key={c.layout} className="border border-[#e8e4dd] p-4">
                      <span className="text-xs uppercase tracking-[0.18em] text-[#ad8b27] block mb-1">{c.layout}</span>
                      <span className="font-editorial text-2xl font-light text-[#102027]">{c.capacity}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={265}>
                <h3 className="text-label-upper text-[#102027] mb-5">Εξοπλισμός & Υπηρεσίες</h3>
                <div className="flex flex-col gap-2 mb-10">
                  {[
                    'Βιντεοπροβολέας υψηλής ευκρίνειας & οθόνες',
                    'Ασύρματα μικρόφωνα & ηχοσύστημα',
                    'Υψηλής ταχύτητας αποκλειστικό Wi-Fi',
                    'Flip charts, πίνακες & γραφική ύλη',
                    'Catering & διαλείμματα καφέ κατόπιν αιτήματος',
                    'Χώροι ομάδων εργασίας & πρόσβαση στη βεράντα',
                    'Τεχνική υποστήριξη οπτικοακουστικών',
                    'Πακέτα διαμονής για συμμετέχοντες',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-light text-[#6b6b6b]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={280}>
                <a
                  href="mailto:reservations@althearesorts.com?subject=Αίτημα Εταιρικής Εκδήλωσης"
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  Πληροφορίες για Εταιρικές Εκδηλώσεις
                </a>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="/images/conference%20pexel%20photo.jpg"
                alt="Αίθουσα συνεδρίων — Althea Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Weddings */}
      <section id="weddings" className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80"
                alt="Γαμήλιος χώρος — Althea Resorts Κορινθία"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Γάμοι</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  Ένας Γάμος στην Κορινθία
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-10">
                  Οι λόφοι της Κορινθίας, το φως πάνω από τον κόλπο εκείνη την ιδιαίτερη ώρα του
                  δειλινού, ο αέρας που φέρνει κάτι ζεστό και χαλαρό: κανένας διακοσμητής δεν μπορεί να
                  τα δημιουργήσει αυτά. Αυτό που προσφέρουμε σε κάθε γάμο στο Althea είναι κάτι πιο
                  αθόρυβο αλλά πιο σημαντικό από την αισθητική: την κατανόηση ότι αυτή η μέρα έχει
                  σημασία για τους ανθρώπους που τη ζουν, όχι μόνο για τις φωτογραφίες. Η ομάδα μας
                  συνεργάζεται στενά με κάθε ζευγάρι, από την πρώτη συζήτηση μέχρι τον τελευταίο χορό,
                  διασφαλίζοντας ότι οι λεπτομέρειες θα τηρηθούν και η ημέρα θα κυλήσει όπως ακριβώς
                  την ονειρευτήκατε. Η Κορινθία αποτελεί τόπο συναντήσεων και γιορτής εδώ και χιλιάδες
                  χρόνια. Ο γάμος σας εντάσσεται φυσικά σε αυτή την ιστορία.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <a
                  href="mailto:reservations@althearesorts.com?subject=Αίτημα Γάμου"
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  Πληροφορίες για Γάμους
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <FinalBookingCTA locale="el" />
    </main>
  )
}
