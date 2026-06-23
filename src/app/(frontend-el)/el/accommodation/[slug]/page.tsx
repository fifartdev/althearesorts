import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ROOMS, BOOKING_URL, SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { RoomCard } from '@/components/ui/RoomCard'

interface Props {
  params: Promise<{ slug: string }>
}

const greekRoomData: Record<string, { view: string; shortDesc: string; features: string[] }> = {
  'standard-double': {
    view: 'Θέα Βουνό ή Κήπο',
    shortDesc: 'Το Standard Double του Althea είναι ό,τι σημαίνει ένα καλά σχεδιασμένο δωμάτιο: άνετο, ήσυχο, με φυσικά υλικά και ένα μπαλκόνι που σας υπενθυμίζει πού βρίσκεστε. Ιδανικό για ζεύγη ή μεμονωμένους επισκέπτες που θέλουν να απολαύσουν το Althea χωρίς περιττά. Το πρωινό φως στο δωμάτιο αυτό είναι από μόνο του αρκετός λόγος για να ξυπνήσετε νωρίς.',
    features: ['Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Ασφαλές δωματίου', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'superior-sea-view': {
    view: 'Θέα Θάλασσα',
    shortDesc: 'Το Superior Sea View δίνει στον επισκέπτη αυτό που αξίζει να ξυπνά κανείς: ο Κορινθιακός Κόλπος απλωμένος μπροστά του, ο ήλιος να ανεβαίνει από την απέναντι ακτή. Το δωμάτιο είναι ευρύχωρο, φωτεινό, με φυσικά υλικά και ένα μπαλκόνι που γίνεται αναπόφευκτο μέρος της ρουτίνας σας.',
    features: ['Θέα θάλασσα', 'Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'deluxe-double-mv-pv': {
    view: 'Θέα Βουνό ή Κόλπο',
    shortDesc: 'Το Deluxe Double προσφέρει κάτι παραπάνω από το Standard: περισσότερο χώρο, πλουσιότερες λεπτομέρειες, θέα στο βουνό ή στον Κόλπο ανάλογα με την επιλογή σας. Ένα δωμάτιο για όσους θέλουν να νιώθουν αναβαθμισμένη άνεση χωρίς να χρειάζονται τίποτα υπερβολικό.',
    features: ['Θέα βουνό ή κόλπο', 'Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'deluxe-double-private-pool': {
    view: 'Ιδιωτική Πισίνα',
    shortDesc: 'Το Deluxe Double με Ιδιωτική Πισίνα κάνει μια απλή πρόταση και την τηρεί: η πισίνα είναι δική σας. Κανένας κοινόχρηστος χώρος, κανένα ωράριο, κανένας άλλος. Μόνο εσείς, το νερό, και ο λόφος γύρω σας. Ένα δωμάτιο για ζεύγη που ξέρουν τι θέλουν από τις διακοπές τους.',
    features: ['Ιδιωτική πισίνα', 'Κλιματισμός', 'Επίπεδη τηλεόραση', 'Ιδιωτική βεράντα', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'junior-suite': {
    view: 'Θέα Θάλασσα & Κόλπος',
    shortDesc: 'Η Junior Suite του Althea είναι το πρώτο επίπεδο εμπειρίας που νιώθεις ότι το δωμάτιο ανταποκρίνεται στον ρυθμό σου. Χωριστός χώρος καθιστικού, θέα στον Κορινθιακό Κόλπο, ευρύχωρο μπάνιο και όλες οι λεπτομέρειες που κάνουν μια σουίτα να αξίζει το όνομά της.',
    features: ['Θέα Κορινθιακού Κόλπου', 'Χωριστό καθιστικό', 'Κλιματισμός', 'Βεράντα', 'Πλούσιο μπάνιο', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'althea-loft-suite': {
    view: 'Πανοραμική Θέα & Υπαίθριο Jacuzzi',
    shortDesc: 'Η Althea Loft Suite είναι η καλύτερη θέση στο κατάλυμα — κυριολεκτικά. Διώροφη, με ανοιχτή θέα 180° στον Κορινθιακό Κόλπο, ιδιωτική ταράτσα και υπαίθριο Jacuzzi. Ένας χώρος που δεν χρειάζεται εξηγήσεις: όταν τον δείτε, θα καταλάβετε αμέσως γιατί υπάρχει.',
    features: ['Θέα 180° στον Κόλπο', 'Υπαίθριο Jacuzzi', 'Διώροφη διαρρύθμιση', 'Ιδιωτική ταράτσα', 'Πολυτελές μπάνιο', 'Μπαρ δωματίου', 'Wi-Fi', 'Καλλυντικά Oceanis Premium'],
  },
}

export async function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const room = ROOMS.find((r) => r.slug === slug)
  if (!room) return {}
  const gr = greekRoomData[slug]
  return genMeta({
    title: room.title,
    description: `${room.title} στην Althea Resorts — ${gr?.shortDesc.slice(0, 80) ?? room.shortDesc}. ${gr?.view ?? room.view}.`,
    keywords: [`${room.title} Althea`, 'πολυτελές δωμάτιο Κορινθία', 'κράτηση δωματίου Ελλάδα'],
    canonical: `${SITE_URL}/el/accommodation/${slug}`,
    image: room.image,
  })
}

export default async function GreekRoomPage({ params }: Props) {
  const { slug } = await params
  const room = ROOMS.find((r) => r.slug === slug)
  if (!room) notFound()

  const gr = greekRoomData[slug]
  const similarRooms = ROOMS.filter((r) => r.slug !== slug).slice(0, 3)

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-screen min-h-[600px] overflow-hidden"
        aria-label={room.title}
      >
        <Image
          src={room.image}
          alt={room.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 container-luxury pb-16 lg:pb-24">
          <ScrollReveal>
            <span className="text-label-upper text-[#ad8b27] block mb-4">Διαμονή</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-white mb-6">{room.title}</h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-6 text-sm font-light text-white/70 mb-8">
              <span>{room.size}</span>
              <span>·</span>
              <span>{gr?.view ?? room.view}</span>
              <span>·</span>
              <span>Έως 2 επισκέπτες</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-8 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-[#ad8b27] text-white border border-[#ad8b27]
                         hover:bg-transparent hover:text-[#ad8b27]
                         transition-all duration-500"
            >
              Έλεγχος Διαθεσιμότητας
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <SectionLabel className="mb-6">Το Δωμάτιο</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  {room.title}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined leading-loose mb-8">
                  {gr?.shortDesc ?? room.shortDesc}
                </p>
              </ScrollReveal>
            </div>

            {/* Specs sidebar */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={100}>
                <div className="bg-[#f2f8fb] p-8 flex flex-col gap-6">
                  <h3 className="text-label-upper text-[#102027]">Στοιχεία Δωματίου</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between border-b border-[#e8e4dd] pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">Μέγεθος</span>
                      <span className="text-sm font-light text-[#102027]">{room.size}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#e8e4dd] pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">Θέα</span>
                      <span className="text-sm font-light text-[#102027]">{gr?.view ?? room.view}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#e8e4dd] pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">Κρεβάτι</span>
                      <span className="text-sm font-light text-[#102027]">King ή Twin</span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">Χωρητικότητα</span>
                      <span className="text-sm font-light text-[#102027]">Έως 2 επισκέπτες</span>
                    </div>
                  </div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-6 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-[#102027] text-white border border-[#102027]
                               hover:bg-transparent hover:text-[#102027]
                               transition-all duration-500 w-full"
                  >
                    Κράτηση Δωματίου
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {room.images && room.images.length > 0 && (
        <section className="section-padding bg-[#faf8f4]" aria-label="Φωτογραφικό υλικό">
          <div className="container-luxury">
            <ScrollReveal>
              <SectionLabel className="mb-6">Φωτογραφικό Υλικό</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="text-display-sm text-[#102027] mb-12">Το Δωμάτιο στη Λεπτομέρεια</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {room.images.map((src, i) => (
                <ScrollReveal key={src} delay={i * 40} className="aspect-[4/3] relative overflow-hidden group">
                  <Image
                    src={src}
                    alt={`${room.title} — φωτογραφία ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="text-display-sm text-[#102027] mb-12">Παροχές Δωματίου</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(gr?.features ?? room.features).map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 bg-white border border-[#e8e4dd]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                  <span className="text-sm font-light text-[#102027]">{feature}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Similar Rooms */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="text-display-sm text-[#102027] mb-12">Άλλα Δωμάτια & Σουίτες</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {similarRooms.map((r, i) => {
              const grSimilar = greekRoomData[r.slug]
              return (
                <ScrollReveal key={r.slug} delay={i * 80}>
                  <RoomCard
                    slug={r.slug}
                    href={`/el/accommodation/${r.slug}`}
                    title={r.title}
                    size={r.size}
                    shortDesc={grSimilar?.shortDesc ?? r.shortDesc}
                    view={grSimilar?.view ?? r.view}
                    image={r.image}
                  />
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
