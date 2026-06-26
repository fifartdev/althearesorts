import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'

export const metadata = genMeta({
  title: 'Τοποθεσία — Κορινθία, Ελλάδα',
  description: 'Η Althea Resorts βρίσκεται στο Άνω Λουτρό, κοντά στο Ξυλόκαστρο, Κορινθία, Ελλάδα. 60 λεπτά από Αθήνα. Κοντά στην Αρχαία Κόρινθο, τον Ακροκόρινθο και τη Διώρυγα.',
  keywords: ['τοποθεσία Althea Resorts', 'ξενοδοχείο Ξυλόκαστρο', 'Κορινθία Ελλάδα', 'κοντά στην Αρχαία Κόρινθο', 'ξενοδοχείο κοντά στην Αθήνα'],
  canonical: `${SITE_URL}/el/location`,
})

const sights = [
  {
    name: 'Αρχαία Κόρινθος',
    distance: '45 λεπτά με αυτοκίνητο',
    desc: 'Μία από τις πιο ισχυρές πόλεις-κράτη της αρχαιότητας. Ο αρχαιολογικός χώρος και το μουσείο αντέχουν σύγκριση με οτιδήποτε στην Αττική.',
    category: 'Αρχαιολογικός',
    image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ακροκόρινθος',
    distance: '45 λεπτά με αυτοκίνητο',
    desc: 'Ο οχυρωμένος λόφος που υψώνεται πάνω από την αρχαία πόλη. Μια ανάβαση που αξίζει τη θέα.',
    category: 'Αρχαιολογικός',
    image: 'https://enjoycorinthia.gr/wp-content/uploads/2021/06/ancient-corinth-72.jpg',
  },
  {
    name: 'Διώρυγα Κορίνθου',
    distance: '40 λεπτά με αυτοκίνητο',
    desc: 'Ένα από τα μεγαλύτερα έργα μηχανικής του δέκατου ένατου αιώνα. Εξακολουθεί να αφήνει άφωνους τους επισκέπτες που τη βλέπουν για πρώτη φορά.',
    category: 'Αξιοθέατο',
    image: 'https://images.unsplash.com/photo-1717518213008-16af162e8494?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ξυλόκαστρο',
    distance: '10 λεπτά με αυτοκίνητο',
    desc: 'Μια παραλιακή προκυμαία, καλός καφές, φρέσκα ψάρια, και η αίσθηση ενός τόπου που δεν έχει στηθεί για τουρίστες.',
    category: 'Πόλη',
    image: 'https://images.unsplash.com/photo-1710107655752-92edd8d02afb?auto=format&fit=crop&w=800&q=80',
    objectPosition: 'center bottom',
  },
  {
    name: 'Επίδαυρος',
    distance: '1.5 ώρα με αυτοκίνητο',
    desc: 'Το αρχαίο θέατρο της Επιδαύρου, χτισμένο σε κοιλάδα με τέλεια ακουστική. Ένας από τους πιο συγκινητικούς τόπους της Ελλάδας.',
    category: 'Ημερήσια Εκδρομή',
    image: 'https://images.unsplash.com/photo-1681118143040-e81720f92a27?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Μυστράς',
    distance: '2 ώρες με αυτοκίνητο',
    desc: 'Η βυζαντινή πόλη που υψώνεται πάνω από την Πελοπόννησο. Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO που αξίζει μια ολόκληρη μέρα.',
    category: 'Ημερήσια Εκδρομή',
    image: 'https://images.unsplash.com/photo-1776845791455-dbb7383628a0?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Μυκήνες',
    distance: '1 ώρα με αυτοκίνητο',
    desc: 'Η ακρόπολη του Αγαμέμνονα. Ένας από τους σημαντικότερους αρχαιολογικούς χώρους της Ελλάδας — η Πύλη των Λεόντων από μόνη της δικαιώνει το ταξίδι.',
    category: 'Ημερήσια Εκδρομή',
    image: 'https://images.unsplash.com/photo-1573314105642-342e876cae22?auto=format&fit=crop&w=800&q=80',
  },
]

export default function GreekLocationPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 bg-[#35657a] overflow-hidden" aria-label="Τοποθεσία">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-editorial text-[14vw] font-light text-white/[0.03] leading-none select-none" aria-hidden="true">
          Κορινθία
        </div>
        <div className="relative z-10 container-luxury">
          <ScrollReveal>
            <SectionLabel light className="mb-6">Τοποθεσία</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-3xl mb-8">
              Η Κορινθία Περίμενε<br />
              <em className="italic font-light text-white/70">τη Στιγμή που θα την Προσέξετε</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/55 leading-relaxed max-w-lg">
              Οι περισσότεροι περνούν από την Κορινθία πηγαίνοντας κάπου αλλού.
              Αυτή είναι η δική τους απώλεια και, ήσυχα, το δικό σας κέρδος.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="text-body-refined mb-5">
                  Η περιοχή βρίσκεται ανάμεσα στην Αθήνα και την Πελοπόννησο, αρκετά κοντά
                  στην πόλη για να φτάσετε χωρίς κόπο, αρκετά μακριά για να νιώσετε ότι
                  βρίσκεστε σε έναν εντελώς διαφορετικό κόσμο. Ο Κορινθιακός κόλπος απλώνεται
                  μπροστά σας, ήρεμος και πλατύς, με τα βουνά της Στερεάς Ελλάδας στην απέναντι
                  όχθη. Το φως εδώ είναι διαφορετικό από το φως των νησιών. Πιο απαλό το πρωί,
                  χρυσό το απόγευμα, και στο σούρουπο μεταμορφώνει το νερό με έναν τρόπο που
                  είναι δύσκολο να περιγραφεί και πολύ εύκολο να αποτυπωθεί στη μνήμη.{' '}
                  <Link href="/el/accommodation" className="text-[#ad8b27] hover:underline font-light">Το Althea</Link>
                  {' '}βρίσκεται στους ήρεμους λόφους του Άνω Λουτρού, πέντε λεπτά από τη θάλασσα,
                  στο κέντρο μιας περιοχής που ανταμείβει τους περίεργους και ξεκουράζει τους
                  κουρασμένους σε ίση μοίρα.
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={150}>
                <div className="flex flex-col gap-6">
                  {[
                    { value: "60'", label: 'Από Αθήνα με αυτοκίνητο' },
                    { value: "10'", label: 'Ως Ξυλόκαστρο' },
                    { value: "45'", label: 'Ως Αρχαία Κόρινθος' },
                  ].map((f) => (
                    <div key={f.label} className="flex gap-4 border-l-2 border-[#ad8b27] pl-4">
                      <span className="font-editorial text-3xl font-light text-[#102027] leading-none">{f.value}</span>
                      <span className="text-xs uppercase tracking-wider text-[#6b6b6b] font-light self-end pb-0.5">{f.label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Beaches */}
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionLabel className="mb-6">Παραλίες</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body-refined max-w-2xl">
              Η ιδιωτική παραλία του Althea απέχει πέντε λεπτά από το resort με το shuttle bus,
              μια ήσυχη ακτογραμμή αποκλειστικά για τους επισκέπτες μας, με άνετες ξαπλώστρες
              και την ιδιωτικότητα που σπάνια προσφέρουν οι δημόσιες παραλίες. Ο Κορινθιακός
              κόλπος είναι από τη φύση του απάνεμος και ήρεμος. Τα νερά είναι καθαρά, η
              θερμοκρασία φιλόξενη από τις αρχές του καλοκαιριού έως και τον Οκτώβριο, και η
              εμπειρία του κολυμπιού εδώ προσφέρει μια χαλάρωση που σπάνια συναντά κανείς
              στις πολυσύχναστες παραλίες του Αιγαίου. Για όσους θέλουν να εξερευνήσουν
              περισσότερο, η ακτογραμμή του Ξυλοκάστρου και της γύρω περιοχής προσφέρει μια
              σειρά από μικρότερες παραλίες που αξίζει να ανακαλύψετε, άλλες με ταβερνάκια
              και άλλες εντελώς ερημικές, που μερικές φορές είναι ακριβώς αυτό που χρειάζεστε.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Sightseeing Grid */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-4">Αξιοθέατα</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027]">
                  Μια Περιοχή με Μεγάλη Ιστορία
                </h2>
              </ScrollReveal>
            </div>
          </div>
          <ScrollReveal delay={150}>
            <p className="text-body-refined max-w-2xl mb-12">
              Η Κορινθία είναι μία από τις πιο πλούσιες ιστορικά περιοχές της Ελλάδας και από τις
              λιγότερο επιβαρυμένες από τον μαζικό τουρισμό, γεγονός που την καθιστά κάτι σπάνιο:
              ένα μέρος όπου ο αρχαίος κόσμος παραμένει ευδιάκριτος και ήσυχος. Η Αρχαία
              Κόρινθος, μία από τις ισχυρότερες πόλεις-κράτη της αρχαιότητας, απέχει λιγότερο
              από μία ώρα από το Althea. Ο αρχαιολογικός χώρος και το μουσείο μπορούν να
              σταθούν επάξια δίπλα σε οτιδήποτε υπάρχει στην Αττική. Ο Ακροκόρινθος, ο
              οχυρωμένος λόφος που υψώνεται πάνω από την αρχαία πόλη, προσφέρει μια ανάβαση
              που ανταμείβει με τη θέα της. Ο Ισθμός της Κορίνθου, που κόβει τη στενή λωρίδα γης
              που συνδέει την ηπειρωτική Ελλάδα με την Πελοπόννησο, είναι ένα από τα σπουδαία
              μηχανικά επιτεύγματα του 19ου αιώνα και συνεχίζει να καθηλώνει όποιον τον
              αντικρίζει για πρώτη φορά. Πιο κοντά στο resort, η πόλη του Ξυλοκάστρου έχει τον
              δικό της ήρεμο χαρακτήρα, έναν παραθαλάσσιο πεζόδρομο, καλό καφέ, φρέσκο
              τοπικό ψάρι και την αίσθηση ενός μέρους που δεν έχει αλλοιωθεί για χάρη των
              επισκεπτών. Προχωρώντας βαθύτερα στην Πελοπόννησο, η καστροπολιτεία του
              Μυστρά, το αρχαίο θέατρο της Επιδαύρου και τα ερείπια των Μυκηνών είναι όλα
              εύκολα προσβάσιμα για τους επισκέπτες που θέλουν να περάσουν μια μέρα
              ταξιδεύοντας στην ιστορία με τον δικό τους ρυθμό.{' '}
              <Link href="/el/accommodation" className="text-[#ad8b27] hover:underline font-light">Το Althea</Link>
              {' '}είναι τόσο ορμητήριο
              όσο και προορισμός. Η γύρω περιοχή αξίζει την{' '}
              <Link href="/el/experiences" className="text-[#ad8b27] hover:underline font-light">εξερεύνησή σας</Link>
              {' '}και θα χαρούμε να{' '}
              <Link href="/el/contact" className="text-[#ad8b27] hover:underline font-light">σας βοηθήσουμε να το κάνετε πράξη</Link>.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sights.map((sight, i) => (
              <ScrollReveal key={sight.name} delay={i * 60}>
                <div className="border border-[#e8e4dd] h-full flex flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={sight.image}
                      alt={sight.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      style={'objectPosition' in sight ? { objectPosition: (sight as typeof sight & { objectPosition: string }).objectPosition } : undefined}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[#102027]/20" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white bg-[#102027]/60 backdrop-blur-sm px-2.5 py-1">
                        {sight.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-2 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-editorial text-xl font-light text-[#102027]">{sight.name}</h3>
                      <span className="text-xs font-light text-[#a0a0a0] uppercase tracking-wider shrink-0 mt-1">{sight.distance}</span>
                    </div>
                    <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">{sight.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FinalBookingCTA locale="el" />
    </main>
  )
}
