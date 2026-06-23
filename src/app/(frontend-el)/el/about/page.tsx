import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'

export const metadata = genMeta({
  title: 'Σχετικά με Εμάς — Επαναπροσδιορίζοντας την Ελληνική Φιλοξενία',
  description: 'Althea Resorts — 41 δωμάτια και σουίτες στην ήρεμη πλαγιά του Άνω Λουτρού, Κορινθία. Εξήντα λεπτά από Αθήνα, ένας κόσμος μακριά.',
  keywords: ['πολυτελές ξενοδοχείο Ελλάδα', 'boutique resort Κορινθία', 'Althea Resorts σχετικά'],
  canonical: `${SITE_URL}/el/about`,
})

export default function GreekAboutPage() {
  return (
    <main id="main-content">
      {/* Page Hero */}
      <section
        className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 bg-[#35657a] overflow-hidden"
        aria-label="Σχετικά με Εμάς"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-editorial text-[22vw] font-light text-white leading-none select-none">
            Althea
          </div>
        </div>
        <div className="relative z-10 container-luxury">
          <ScrollReveal>
            <SectionLabel light className="mb-6">Σχετικά με Εμάς</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-3xl">
              Επαναπροσδιορίζοντας την Ελληνική Φιλοξενία
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-narrow">
          <ScrollReveal>
            <p className="text-body-refined text-lg leading-relaxed mb-6">
              Υπάρχει μια στιγμή, συνήθως τη δεύτερη μέρα, που ο επισκέπτης του Althea σταματά να
              σκέφτεται όλα όσα άφησε πίσω του. Τα email, την κίνηση στους δρόμους, το ιδιαίτερο
              βάρος της καθημερινότητας. Συμβαίνει αβίαστα.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body-refined mb-6">
              Δημιουργήσαμε το Althea γι&apos; αυτήν ακριβώς τη στιγμή, και κάθε λεπτομέρεια σε αυτό το
              &ldquo;καταφύγιο&rdquo;, από την αρχιτεκτονική και το πρωινό τραπέζι μέχρι τη φροντίδα στο spa,
              είναι σχεδιασμένη για να τη φέρει πιο κοντά σας.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-body-refined">
              Το Althea Resorts βρίσκεται στην ήρεμη πλαγιά του Άνω Λουτρού, κοντά στο Ξυλόκαστρο,
              μόλις εξήντα λεπτά από την Αθήνα, αλλά ταυτόχρονα σε έναν κόσμο εντελώς μακριά από
              τους έντονους ρυθμούς με τους οποίους καταφθάνουν οι περισσότεροι επισκέπτες μας. Το
              όνομά του προέρχεται από την αρχαία ελληνική λέξη <em>άλθος</em>, που σημαίνει θεραπεία, ίαση.
              Αυτό δεν ήταν μια τυχαία επιλογή. Ήταν μια δήλωση της πρόθεσης μας.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="/images/new-images/New-Hero.jpg"
                alt="Althea Resorts — πισίνα και λόφος"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Ποιοί Είμαστε</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  Πιστεύουμε ότι η πολυτέλεια δεν μετριέται με τον αριθμό των παροχών μιας λίστας. Έχει
                  να κάνει με το πως σε κάνει να νιώθεις ένας χώρος όταν βρίσκεσαι εκεί: η ποιότητα του
                  πρωινού φωτός, η θερμοκρασία του νερού στην πισίνα, ο τρόπος με τον οποίο ένα γεύμα
                  καταφθάνει τη στιγμή που πεινάς και αποσύρεται διακριτικά όταν τελειώσεις. Είναι το
                  πρωινό, φτιαγμένο με όσα έφεραν οι τοπικοί παραγωγοί νωρίς το πρωί. Είναι η θεραπεία
                  spa που αξιοποιεί τα αγαθά που ανέκαθεν γεννούσε αυτή η γη και αυτή η θάλασσα. Είναι ο
                  άνθρωπος που θυμάται το όνομά σου τη δεύτερη κιόλας μέρα, χωρίς να χρειαστεί να του
                  το υπενθυμίσεις.
                </p>
                <p className="text-body-refined">
                  Το Althea σχεδιάστηκε γύρω από αυτές τις λεπτομέρειες. Σαράντα ένα{' '}
                  <a href="/el/accommodation" className="text-[#ad8b27] hover:underline font-light">δωμάτια και σουίτες</a>,
                  το καθένα τοποθετημένο έτσι ώστε να αξιοποιεί στο έπακρο το κορινθιακό τοπίο.
                  Ένα rooftop εστιατόριο εμπνευσμένο από τις γεύσεις, τα αρώματα και τις ιστορίες της
                  Μεσογείου. Ένα spa, το Ocean Spa, εμπνευσμένο από τα αρχαία Ασκληπιεία, όπου οι
                  παραδόσεις ευεξίας συναντούν τις σύγχρονες θεραπείες με τη χρήση των καλλυντικών
                  Oceanis, ενός ελληνικού brand με ρίζες τόσο βαθιές σε αυτόν τον τόπο, όσο και οι δικές μας.
                  Μια ιδιωτική παραλία σε απόσταση πέντε λεπτών. Και μια κουζίνα που ξεκινά κάθε πρωί
                  με ό,τι πιο φρέσκο, εκλεκτό και αυθεντικό έχει να προσφέρει η περιοχή.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Are */}
      <section className="section-padding bg-[#102027]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <SectionLabel light className="mb-6">Πού Βρισκόμαστε</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-white mb-8">
                  Η Κορινθία Μέσα από μια Νέα Ματιά
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  Οι περισσότεροι γνωρίζουν την Κορινθία ως ένα πέρασμα. Μια λωρίδα αυτοκινητοδρόμου
                  ανάμεσα στην Αθήνα και την Πελοπόννησο, μια γρήγορη ματιά στον Ισθμό, μια σκέψη ότι
                  &laquo;κάποια στιγμή πρέπει να σταματήσουμε εδώ&raquo;. Το Althea είναι ο λόγος για να σταματήσετε.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  Η περιοχή είναι μία από τις πιο πλούσιες ιστορικά και ταυτόχρονα λιγότερο κορεσμένες
                  τουριστικά γωνιές της Ελλάδας. Η Αρχαία Κόρινθος, ο Ακροκόρινθος, ο Ισθμός, η
                  ακτογραμμή του Κορινθιακού, όλα βρίσκονται σε απόσταση αναπνοής, διατηρώντας την
                  ησυχία που σου δίνει την αίσθηση μιας προσωπικής ανακάλυψης. Η πόλη του
                  Ξυλοκάστρου απέχει μόλις δέκα λεπτά από το ξενοδοχείο, με τον παραλιακό της
                  πεζόδρομο, το φρέσκο ψάρι και τους χαλαρούς της ρυθμούς. Η θάλασσα είναι πάντα
                  δίπλα σας. Η Αθήνα απέχει μόλις εξήντα λεπτά.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed">
                  Όλα τα άλλα μπορούν να περιμένουν...
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollReveal variant="image" className="aspect-[4/3] w-full relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=900&q=80"
                  alt="Αρχαίοι κίονες στην Κόρινθο"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <SectionLabel className="mb-6 justify-center">Οι Αξίες Μας</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027] mb-8">
                Η Ελληνική Φιλοξενία
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoldLine className="mx-auto mb-10" />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-body-refined text-center mb-6">
                Η ελληνική φιλοξενία δεν είναι μια έννοια που χρειάζεται ιδιαίτερη επεξήγηση σε έναν
                Έλληνα. Είναι κάτι με το οποίο μεγαλώνεις, κατανοώντας βαθιά ότι τον ξένο οφείλεις να
                τον υποδεχτείς σωστά, να τον &laquo;τραπεζώσεις&raquo; σωστά, όπως λέμε, να τον κάνεις να νιώσει
                άνετα και να τον αποχαιρετήσεις με την πεποίθηση ότι η παρουσία του ήταν πραγματική
                χαρά για σένα. Στο Althea, πήραμε αυτό ακριβώς το ένστικτο και δημιουργήσαμε γύρω του
                ένα μοναδικό &laquo;καταφύγιο&raquo; πέντε αστέρων. Το αποτέλεσμα είναι ένας χώρος που δεν είναι
                ούτε στημένος, ούτε απρόσωπος αλλά ούτε και παρεμβατικός.
              </p>
              <p className="text-body-refined text-center mb-6">
                Εδώ θα νιώσετε σαν να βρίσκεστε στην καλύτερη εκδοχή ενός μέρους στο οποίο ανήκατε πάντα!
              </p>
              <p className="text-body-refined text-center mb-10">
                Εξήντα λεπτά από την Αθήνα. Όχι εξήντα λεπτά και ένα πλοίο. Όχι εξήντα λεπτά και μια
                ανταπόκριση πτήσης. Εξήντα λεπτά με το αυτοκίνητο, σε έναν ασφαλή δρόμο, με τον
                Κορινθιακό κόλπο να ξεπροβάλλει στα αριστερά σας πριν καλά-καλά τελειώσετε τον
                πρώτο σας καφέ. Αυτή η εγγύτητα είναι ένα από τα μεγάλα πλεονεκτήματα του Althea:
                αρκετά κοντά για μια αυθόρμητη απόδραση, αρκετά μακριά για να νιώσετε εντελώς
                αποσυνδεδεμένοι από την πόλη που αφήσατε πίσω σας. Αυτή είναι η ελληνική φιλοξενία
                στην πιο ειλικρινή της μορφή: μια ανοιχτή αγκαλιά, με τον τρόπο που προσφερόταν πάντα
                εδώ, σε όποιον μας χτυπά την πόρτα.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <div className="flex flex-col items-center gap-3 pt-8 border-t border-[#e8e4dd]">
                {[
                  '41 Δωμάτια και σουίτες σε έξι κατηγορίες',
                  "5' Λεπτά από την ιδιωτική μας παραλία στον Κορινθιακό Κόλπο",
                  "60' Λεπτά από το κέντρο της Αθήνας",
                ].map((stat) => (
                  <div key={stat} className="flex items-center gap-3 text-sm font-light text-[#6b6b6b]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                    {stat}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FinalBookingCTA locale="el" />
    </main>
  )
}
