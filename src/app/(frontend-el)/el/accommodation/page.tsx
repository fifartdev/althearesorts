import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { ROOMS, BOOKING_URL, SITE_URL } from '@/lib/constants'
import { getRooms } from '@/lib/cms'

export const metadata = genMeta({
  title: 'Δωμάτια & Σουίτες — 41 Δωμάτια στην Κορινθία',
  description: '41 δωμάτια και σουίτες σε έξι κατηγορίες στην Althea Resorts, Κορινθία. Από Standard Double έως την υπογραφή Loft Suite με Υπαίθριο Jacuzzi.',
  keywords: ['δωμάτια Althea Resorts', 'πολυτελείς σουίτες Κορινθία', 'σουίτα ιδιωτική πισίνα Ελλάδα', 'loft σουίτα jacuzzi Ελλάδα'],
  canonical: `${SITE_URL}/el/accommodation`,
})

const greekRoomData: Record<string, { view: string; tagline?: string; shortDesc: string; features: string[] }> = {
  'standard-double': {
    view: 'Θέα Βουνό ή Κήπο',
    tagline: 'Το Σωστό Δωμάτιο στο Σωστό Μέρος.',
    shortDesc: 'Καθαρές γραμμές, άνετες αναλογίες και το φυσικό φως της Κορινθίας να σας καλωσορίζει κάθε πρωί. Το Standard Double συνδυάζει το προσεγμένο design με την ουσιαστική αξία, ένα δωμάτιο που προσφέρει όλα όσα χρειάζεστε, χωρίς τίποτα περιττό.',
    features: ['Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Ηχομόνωση', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'superior-sea-view': {
    view: 'Θέα Θάλασσα',
    shortDesc: 'Η πιο ευρύχωρη κατηγορία δωματίου στο Althea, σχεδιασμένη γύρω από ένα και μόνο στοιχείο: τη θέα. Μια μεγάλη ιδιωτική βεράντα αντικρίζει τον Κορινθιακό κόλπο χωρίς τίποτα να κρύβει τον ορίζοντα. Αυτό είναι το ιδανικό δωμάτιο για όσους ήρθαν εδώ για τη θάλασσα και θέλουν να την έχουν διαρκώς μπροστά τους.',
    features: ['Θέα θάλασσα', 'Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'deluxe-double-mv-pv': {
    view: 'Θέα Βουνό ή Κόλπο',
    tagline: 'Ένα Δωμάτιο που Δικαιώνει τη Θέα του',
    shortDesc: 'Θέα στο βουνό ή στην πισίνα από ένα ευρύχωρο ιδιωτικό μπαλκόνι. Το Deluxe Double είναι το μέρος όπου μπορείτε να περάσετε το πρωινό σας με έναν καφέ, χωρίς κανένα συγκεκριμένο πρόγραμμα, χαζεύοντας τους λόφους ή το νερό που απλώνεται από κάτω. Εκλεπτυσμένη επίπλωση, premium amenities Oceanis και ένας χώρος που δίνει την αίσθηση ότι είναι ακόμα μεγαλύτερος.',
    features: ['Θέα βουνό ή κόλπο', 'Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι με θέα', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'deluxe-double-private-pool': {
    view: 'Ιδιωτική Πισίνα',
    tagline: 'Κάντε ένα βήμα έξω και η πισίνα σας περιμένει!',
    shortDesc: 'Βγείτε από το δωμάτιό σας και απολαύστε την άνεση της άμεσης πρόσβασης σε πισίνα, την οποία μοιράζεστε μόνο με ένα ακόμη δωμάτιο. Μια εμπειρία ιδιωτικότητας και χαλάρωσης, σχεδιασμένη για όσους αναζητούν κάτι ξεχωριστό. Οι κομψοί εσωτερικοί χώροι οδηγούν απευθείας στο νερό, αφήνοντας τη ροή της ημέρας αποκλειστικά στα χέρια σας.',
    features: ['Ιδιωτική πισίνα', 'Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'junior-suite-private-pool': {
    view: 'Θέα Θάλασσα & Ιδιωτική Πισίνα',
    tagline: 'Περισσότερος Χώρος. Περισσότερος Χρόνος.',
    shortDesc: 'Η Junior Suite αναβαθμίζει τη διαμονή σε κάθε επίπεδο. High-end φινιρίσματα, ιδιωτική πισίνα και η άνεση χώρου που θα σας κάνει να αναβάλετε τα σχέδιά σας για να μείνετε στο δωμάτιο περισσότερο από όσο υπολογίζατε! Από τις πιο περιζήτητες επιλογές στο Althea, και είναι εύκολο να καταλάβει κανείς το γιατί.',
    features: ['Ιδιωτική πισίνα', 'Χωριστό καθιστικό', 'Κλιματισμός', 'Βεράντα με θέα', 'Μπάνιο En suite', 'Ηχομόνωση', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'althea-loft-suite': {
    view: 'Πανοραμική Θέα & Εξωτερικό Jacuzzi',
    tagline: 'Το Δωμάτιο που Αλλάζει τα Δεδομένα',
    shortDesc: 'Δύο επίπεδα. Ένα υπνοδωμάτιο στον επάνω όροφο που λούζεται από το φως του ουρανού. Καθηλωτική θέα στον Κορινθιακό κόλπο. Και έξω, ένα ιδιωτικό jacuzzi που μετατρέπει το βράδυ σε μια προσμονή που διαρκεί όλη μέρα. Η Althea Loft Suite είναι η επιτομή της διαμονής στο resort· μια αρχιτεκτονική δήλωση που τυχαίνει να είναι και το πιο άνετο μέρος στην Κορινθία για να μην κάνετε απολύτως τίποτα.',
    features: ['Εξωτερικό Jacuzzi', 'Διώροφη διαρρύθμιση', 'Πανοραμική θέα', 'Μπαλκόνι με θέα', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
}

export default async function GreekAccommodationPage() {
  const docs = await getRooms('el')

  // Use CMS images/slugs/sizes; overlay Greek text from greekRoomData if available
  const rooms = docs.length > 0
    ? docs.map((r: any) => {
        const slug: string = r.slug ?? ''
        const gr = greekRoomData[slug]
        const cmsImage = (typeof r.heroImage === 'object' ? r.heroImage?.url : r.heroImage) || r.imageUrl || ''
        const fallbackRoom = ROOMS.find((fr) => fr.slug === slug)
        return {
          slug,
          title: r.title ?? fallbackRoom?.title ?? '',
          view: gr?.view ?? r.viewType ?? fallbackRoom?.view ?? '',
          tagline: gr?.tagline ?? r.tagline ?? fallbackRoom?.tagline,
          size: r.size ?? fallbackRoom?.size ?? '',
          shortDesc: gr?.shortDesc ?? r.shortDescription ?? fallbackRoom?.shortDesc ?? '',
          image: cmsImage || fallbackRoom?.image || '',
          features: gr?.features ?? ((r.highlights ?? []).map((h: any) => h.text ?? '').filter(Boolean)) ?? fallbackRoom?.features ?? [],
          featured: r.featured ?? false,
        }
      })
    : ROOMS.map((room) => {
        const gr = greekRoomData[room.slug]
        return {
          slug: room.slug,
          title: room.title,
          view: gr?.view ?? room.view,
          tagline: gr?.tagline ?? room.tagline,
          size: room.size,
          shortDesc: gr?.shortDesc ?? room.shortDesc,
          image: room.image,
          features: gr?.features ?? room.features,
          featured: room.featured,
        }
      })

  return (
    <main id="main-content">

      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Δωμάτια"
      >
        <Image
          src="/images/superior%20sea%20view.jpg"
          alt="Althea Resorts — Superior Sea View δωμάτιο"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Διαμονή</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              Δωμάτια Σχεδιασμένα<br />
              <em className="italic font-light text-white/70">Γύρω από τη Θέα</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro text */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <GoldLine className="mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body-refined text-lg leading-relaxed mb-5">
              Κάθε δωμάτιο στο Althea ξεκινά με την ίδια ερώτηση: τι χρειάζεται ο επισκέπτης
              για να νιώσει απόλυτα άνετα; Η απάντηση αλλάζει ανάλογα με τη θέα, το μέγεθος
              της βεράντας, το βάθος της πισίνας. Εκείνο που παραμένει σταθερό είναι η ποιότητα
              των εσωτερικών χώρων.
            </p>
            <p className="text-body-refined text-lg leading-relaxed mb-5">
              Φυσικά υλικά, μελετημένο design, amenities από την Oceanis και μια αίσθηση γαλήνης
              που προσφέρει μόνο ένας χώρος που έχει χτιστεί με πραγματική φροντίδα. Από την
              πλαγιά του Άνω Λουτρού, ο Κορινθιακός κόλπος στολίζει την άκρη κάθε οπτικής γωνίας.
            </p>
            <p className="text-body-refined text-lg leading-relaxed">
              Η θάλασσα είναι πάντα εκεί. Τα υπόλοιπα εξαρτώνται από εσάς!
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-12 pt-10 border-t border-[#e8e4dd]">
              {[
                { value: '41', label: 'Δωμάτια & Σουίτες' },
                { value: '6',  label: 'Κατηγορίες' },
                { value: '22–45 m²', label: 'Μεγέθη Δωματίων' },
                { value: '5★', label: 'Εμπειρία' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1">
                  <span className="font-editorial text-3xl font-light text-[#102027]">{s.value}</span>
                  <span className="text-label-upper text-[#6b6b6b]">{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Room sections */}
      {rooms.map((room, i) => {
        const isEven = i % 2 === 0
        const isFeatured = room.featured === true

        return (
          <section
            key={room.slug}
            id={room.slug}
            className={`${isFeatured ? 'bg-deep' : i % 2 === 0 ? 'bg-white' : 'bg-soft'} overflow-hidden`}
            aria-label={room.view}
          >
            <div className="container-luxury py-0">
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:[direction:rtl]'}`}>

                {/* Image */}
                <ScrollReveal variant="image" className="aspect-[4/3] lg:aspect-auto lg:min-h-150 relative overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                  />
                  {isFeatured && (
                    <div className="absolute top-6 left-6 bg-gold px-4 py-1.5">
                      <span className="text-label-upper text-white">Signature Suite</span>
                    </div>
                  )}
                </ScrollReveal>

                {/* Content */}
                <div className={`flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-20 [direction:ltr] ${isFeatured ? 'bg-deep' : ''}`}>
                  <ScrollReveal>
                    <span className="text-label-upper text-gold mb-6 block">{room.view}</span>
                  </ScrollReveal>
                  <ScrollReveal delay={80}>
                    <h2 className={`text-display-sm mb-3 ${isFeatured ? 'text-white' : 'text-deep'}`}>
                      {room.title}
                    </h2>
                  </ScrollReveal>
                  {room.tagline && (
                    <ScrollReveal delay={100}>
                      <p className={`font-editorial text-lg font-light italic mb-4 ${isFeatured ? 'text-white/70' : 'text-smoke'}`}>
                        {room.tagline}
                      </p>
                    </ScrollReveal>
                  )}
                  <ScrollReveal delay={120}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`text-sm font-light ${isFeatured ? 'text-white/50' : 'text-smoke'}`}>
                        {room.size}
                      </span>
                      <span className={`w-px h-4 ${isFeatured ? 'bg-white/20' : 'bg-stone'}`} />
                      <span className={`text-sm font-light ${isFeatured ? 'text-white/50' : 'text-smoke'}`}>
                        Διαμόρφωση King ή Twin
                      </span>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={150}>
                    <GoldLine className="mb-6" />
                  </ScrollReveal>
                  <ScrollReveal delay={180}>
                    <p className={`text-sm font-light leading-relaxed mb-8 ${isFeatured ? 'text-white/60' : 'text-smoke'}`}>
                      {room.shortDesc}
                    </p>
                  </ScrollReveal>

                  {/* Features */}
                  <ScrollReveal delay={210}>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-10">
                      {room.features.slice(0, 6).map((f: string) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
                          <span className={`text-xs font-light ${isFeatured ? 'text-white/50' : 'text-smoke'}`}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>

                  {/* CTAs */}
                  <ScrollReveal delay={250}>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 px-7 inline-flex items-center
                                   text-xs uppercase tracking-[0.2em]
                                   bg-gold text-white border border-gold
                                   hover:bg-transparent hover:text-gold
                                   transition-all duration-500"
                      >
                        Κράτηση
                      </a>
                      <a
                        href={`/el/accommodation/${room.slug}`}
                        className={`h-11 px-7 inline-flex items-center
                                   text-xs uppercase tracking-[0.2em]
                                   bg-transparent border transition-all duration-500
                                   ${isFeatured
                                     ? 'text-white border-white/30 hover:bg-white hover:text-deep'
                                     : 'text-deep border-deep/30 hover:bg-deep hover:text-white'
                                   }`}
                      >
                        Διαβάστε περισσότερα
                      </a>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* All rooms include */}
      <section className="section-padding bg-[#faf8f4]" aria-label="Παροχές σε όλα τα δωμάτια">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <ScrollReveal>
              <SectionLabel className="mb-5 justify-center">Σε Κάθε Δωμάτιο</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027]">Όλα τα Δωμάτια Περιλαμβάνουν</h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={150}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#e8e4dd]">
              {[
                'Δωρεάν Wi-Fi',
                'Κλιματισμός',
                'Επίπεδη Τηλεόραση',
                'Μίνι Μπαρ',
                'Ηχομόνωση',
                'Καλλυντικά Oceanis',
                'Καθημερινή Καθαριότητα',
                'Μπαλκόνι ή Βεράντα',
                'Μπάνιο En Suite',
                'Χρηματοκιβώτιο',
                'Ρεσεψιόν 24ωρη',
                'Υπηρεσία Concierge',
              ].map((amenity) => (
                <div
                  key={amenity}
                  className="flex flex-col items-center text-center gap-3 p-6 bg-[#faf8f4]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27]" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider text-[#102027] font-light leading-tight">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalBookingCTA locale="el" />
    </main>
  )
}
