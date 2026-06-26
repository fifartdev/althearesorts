import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { getRoom, getRooms, getBookingSettings } from '@/lib/cms'
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
    shortDesc: 'Το Standard Double του Althea είναι ό,τι σημαίνει ένα καλά σχεδιασμένο δωμάτιο: άνετο, ήσυχο, με φυσικά υλικά και ένα μπαλκόνι που σας υπενθυμίζει πού βρίσκεστε. Ιδανικό για ζεύγη ή μεμονωμένους επισκέπτες που θέλουν να απολαύσουν το Althea χωρίς περιττά.',
    features: ['Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Ασφαλές δωματίου', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'superior-sea-view': {
    view: 'Θέα Θάλασσα',
    shortDesc: 'Το Superior Sea View δίνει στον επισκέπτη αυτό που αξίζει να ξυπνά κανείς: ο Κορινθιακός Κόλπος απλωμένος μπροστά του, ο ήλιος να ανεβαίνει από την απέναντι ακτή. Ευρύχωρο, φωτεινό, με φυσικά υλικά.',
    features: ['Θέα θάλασσα', 'Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'deluxe-double-mv-pv': {
    view: 'Θέα Βουνό ή Κόλπο',
    shortDesc: 'Το Deluxe Double προσφέρει περισσότερο χώρο, πλουσιότερες λεπτομέρειες, θέα στο βουνό ή στον Κόλπο. Ένα δωμάτιο για όσους θέλουν αναβαθμισμένη άνεση με φυσικό τρόπο.',
    features: ['Θέα βουνό ή κόλπο', 'Κλιματισμός', 'Επίπεδη τηλεόραση', 'Μπαλκόνι', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'deluxe-double-private-pool': {
    view: 'Ιδιωτική Πισίνα',
    shortDesc: 'Βγείτε από το δωμάτιο και η πισίνα σας περιμένει. Κανένας κοινόχρηστος χώρος, κανένα ωράριο. Μόνο εσείς, το νερό, και ο λόφος γύρω σας.',
    features: ['Ιδιωτική πισίνα', 'Κλιματισμός', 'Επίπεδη τηλεόραση', 'Ιδιωτική βεράντα', 'Μπάνιο En suite', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'junior-suite-private-pool': {
    view: 'Θέα Θάλασσα & Κόλπος',
    shortDesc: 'Η Junior Suite αναβαθμίζει τη διαμονή σε κάθε επίπεδο. Χωριστό καθιστικό, θέα στον Κορινθιακό Κόλπο, ευρύχωρο μπάνιο και όλες οι λεπτομέρειες που κάνουν μια σουίτα να αξίζει το όνομά της.',
    features: ['Θέα Κορινθιακού Κόλπου', 'Ιδιωτική πισίνα', 'Χωριστό καθιστικό', 'Κλιματισμός', 'Βεράντα', 'Μίνι μπαρ', 'Wi-Fi', 'Καλλυντικά Oceanis'],
  },
  'althea-loft-suite': {
    view: 'Πανοραμική Θέα & Υπαίθριο Jacuzzi',
    shortDesc: 'Η Althea Loft Suite είναι η καλύτερη θέση στο κατάλυμα — κυριολεκτικά. Διώροφη, με ανοιχτή θέα 180° στον Κορινθιακό Κόλπο, ιδιωτική ταράτσα και υπαίθριο Jacuzzi.',
    features: ['Θέα 180° στον Κόλπο', 'Υπαίθριο Jacuzzi', 'Διώροφη διαρρύθμιση', 'Ιδιωτική ταράτσα', 'Πολυτελές μπάνιο', 'Μπαρ δωματίου', 'Wi-Fi', 'Καλλυντικά Oceanis Premium'],
  },
}

export async function generateStaticParams() {
  const docs = await getRooms('el').catch(() => [])
  return (docs as any[]).filter((r) => r.slug).map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const cmsRoom = await getRoom(slug, 'el')
  const gr = greekRoomData[slug]
  if (cmsRoom) {
    const image = (typeof (cmsRoom as any).heroImage === 'object'
      ? (cmsRoom as any).heroImage?.url
      : (cmsRoom as any).heroImage) || (cmsRoom as any).imageUrl || ''
    const shortDesc = gr?.shortDesc ?? (cmsRoom as any).shortDescription ?? ''
    return genMeta({
      title: (cmsRoom as any).title ?? '',
      description: `${(cmsRoom as any).title} στην Althea Resorts — ${shortDesc.slice(0, 120)}`,
      keywords: [`${(cmsRoom as any).title} Althea`, 'πολυτελές δωμάτιο Κορινθία', 'κράτηση δωματίου Ελλάδα'],
      canonical: `${SITE_URL}/el/accommodation/${slug}`,
      image,
    })
  }
  return {}
}

export default async function GreekRoomPage({ params }: Props) {
  const { slug } = await params

  const [cmsRoom, allCmsRooms, bookingSettings] = await Promise.all([
    getRoom(slug, 'el'),
    getRooms('el'),
    getBookingSettings(),
  ])
  const bookingUrl: string | undefined = (bookingSettings as any)?.bookingEngineUrl || undefined
  const gr = greekRoomData[slug]

  const room = cmsRoom
    ? {
        slug: (cmsRoom as any).slug ?? slug,
        title: (cmsRoom as any).title ?? '',
        view: gr?.view ?? (cmsRoom as any).viewType ?? '',
        size: (cmsRoom as any).size ?? '',
        shortDesc: gr?.shortDesc ?? (cmsRoom as any).shortDescription ?? '',
        image: (typeof (cmsRoom as any).heroImage === 'object'
          ? (cmsRoom as any).heroImage?.url
          : (cmsRoom as any).heroImage) || (cmsRoom as any).imageUrl || '',
        images: ((cmsRoom as any).gallery ?? [])
          .map((g: any) => typeof g.image === 'object' ? g.image?.url : g.image)
          .filter(Boolean) as string[],
        features: gr?.features ?? ((cmsRoom as any).amenities ?? []).map((a: any) => a.label ?? '').filter(Boolean) as string[],
        maxOccupancy: (cmsRoom as any).maxOccupancy ?? 2,
      }
    : null

  if (!room) notFound()

  const similarRooms = (allCmsRooms as any[])
    .filter((r: any) => r.slug !== slug)
    .slice(0, 3)
    .map((r: any) => {
      const sgr = greekRoomData[r.slug ?? '']
      return {
        slug: r.slug ?? '',
        title: r.title ?? '',
        size: r.size ?? '',
        shortDesc: sgr?.shortDesc ?? r.shortDescription ?? '',
        view: sgr?.view ?? r.viewType ?? '',
        image: (typeof r.heroImage === 'object' ? r.heroImage?.url : r.heroImage) || r.imageUrl || '',
      }
    })

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-screen min-h-150 overflow-hidden"
        aria-label={room.title}
      >
        {room.image && (
          <Image
            src={room.image}
            alt={room.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-deep/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 container-luxury pb-16 lg:pb-24">
          <ScrollReveal>
            <span className="text-label-upper text-gold block mb-4">Διαμονή</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-white mb-6">{room.title}</h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-6 text-sm font-light text-white/70 mb-8">
              <span>{room.size}</span>
              <span>·</span>
              <span>{room.view}</span>
              <span>·</span>
              <span>Έως {room.maxOccupancy} επισκέπτες</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <a
              href={bookingUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-8 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-gold text-white border border-gold
                         hover:bg-transparent hover:text-gold
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
                <h2 className="text-display-sm text-deep mb-6">{room.title}</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined leading-loose mb-8">{room.shortDesc}</p>
              </ScrollReveal>
            </div>

            {/* Specs sidebar */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={100}>
                <div className="bg-soft p-8 flex flex-col gap-6">
                  <h3 className="text-label-upper text-deep">Στοιχεία Δωματίου</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between border-b border-stone pb-3">
                      <span className="text-sm font-light text-smoke">Μέγεθος</span>
                      <span className="text-sm font-light text-deep">{room.size}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone pb-3">
                      <span className="text-sm font-light text-smoke">Θέα</span>
                      <span className="text-sm font-light text-deep">{room.view}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone pb-3">
                      <span className="text-sm font-light text-smoke">Κρεβάτι</span>
                      <span className="text-sm font-light text-deep">King ή Twin</span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-sm font-light text-smoke">Χωρητικότητα</span>
                      <span className="text-sm font-light text-deep">Έως {room.maxOccupancy} επισκέπτες</span>
                    </div>
                  </div>
                  <a
                    href={bookingUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-6 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-deep text-white border border-deep
                               hover:bg-transparent hover:text-deep
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
      {room.images.length > 0 && (
        <section className="section-padding bg-cream" aria-label="Φωτογραφική γκαλερί δωματίου">
          <div className="container-luxury">
            <ScrollReveal>
              <SectionLabel className="mb-6">Φωτογραφική Γκαλερί</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="text-display-sm text-deep mb-12">Το Δωμάτιο σε Λεπτομέρεια</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {room.images.map((src, i) => (
                <ScrollReveal key={src} delay={i * 40} className="aspect-4/3 relative overflow-hidden group">
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
      <section className="section-padding bg-soft">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="text-display-sm text-deep mb-12">Παροχές Δωματίου</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {room.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-4 bg-white border border-stone">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-sm font-light text-deep">{feature}</span>
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
            <h2 className="text-display-sm text-deep mb-12">Άλλα Δωμάτια & Σουίτες</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {similarRooms.map((r, i) => (
              <ScrollReveal key={r.slug} delay={i * 80}>
                <RoomCard
                  slug={r.slug}
                  href={`/el/accommodation/${r.slug}`}
                  title={r.title}
                  size={r.size}
                  shortDesc={r.shortDesc}
                  view={r.view}
                  image={r.image}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
