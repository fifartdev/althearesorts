'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

const categories = ['Όλες', 'Δωμάτια & Σουίτες', 'Πισίνα & Εξωτερικοί Χώροι', 'Γαστρονομία', 'Λόμπι & Ρεσεψιόν', 'Πρωινό', 'Spa & Ευεξία', 'Θέες']

const categoryMap: Record<string, string> = {
  'All': 'Όλες',
  'Rooms & Suites': 'Δωμάτια & Σουίτες',
  'Pool & Exterior': 'Πισίνα & Εξωτερικοί Χώροι',
  'Dining': 'Γαστρονομία',
  'Lobby & Reception': 'Λόμπι & Ρεσεψιόν',
  'Breakfast': 'Πρωινό',
  'Spa & Wellness': 'Spa & Ευεξία',
  'Views': 'Θέες',
}

const galleryItems = [
  { src: '/images/new-images/althea-front.jpg',         caption: 'Althea Resorts',              category: 'Πισίνα & Εξωτερικοί Χώροι', wide: true },
  { src: '/images/main-pool.jpg',                        caption: 'Κεντρική Πισίνα',             category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: `${S}/Gallery-9VZMNYN.jpg`,                    caption: 'Κήποι & Ταράτσες',            category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/new-images/New-Hero.jpg',             caption: 'Το Resort',                   category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },

  { src: `${S}/althea-exclusive-resorts-spa-1.png`,     caption: 'Standard Double',             category: 'Δωμάτια & Σουίτες',         wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-2.png`,     caption: 'Εσωτερικό Δωματίου',         category: 'Δωμάτια & Σουίτες',         wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-3.png`,     caption: 'Λεπτομέρειες Δωματίου',      category: 'Δωμάτια & Σουίτες',         wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-4.png`,     caption: 'Deluxe Double',               category: 'Δωμάτια & Σουίτες',         wide: true },
  { src: `${S}/althea-exclusive-resorts-spa-5.png`,     caption: 'Deluxe με Πισίνα',            category: 'Δωμάτια & Σουίτες',         wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-6.png`,     caption: 'Superior Sea View',           category: 'Δωμάτια & Σουίτες',         wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-8.png`,     caption: 'Junior Suite',                category: 'Δωμάτια & Σουίτες',         wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-9.png`,     caption: 'Loft Suite',                  category: 'Δωμάτια & Σουίτες',         wide: true },
  { src: `${S}/althea-exclusive-resorts-spa-10.png`,    caption: 'Καθιστικό Σουίτας',          category: 'Δωμάτια & Σουίτες',         wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-11.png`,    caption: 'Βεράντα Σουίτας',             category: 'Δωμάτια & Σουίτες',         wide: false },

  { src: '/images/new-images/althea-side-images1.jpg',  caption: 'Θέα στον Κορινθιακό Κόλπο', category: 'Θέες',                       wide: true },
  { src: '/images/new-images/althea-side-images2.jpg',  caption: 'Κορινθιακή Ακτή',           category: 'Θέες',                       wide: false },
  { src: '/images/new-images/althea-side-images3.jpg',  caption: 'Το Περιβάλλον',             category: 'Θέες',                       wide: false },
  { src: '/images/new-images/althea-side-images4.jpg',  caption: 'Τοπίο & Φύση',              category: 'Θέες',                       wide: false },
  { src: `${S}/1.jpg`,                                  caption: 'Το Κατάλυμα',               category: 'Θέες',                       wide: false },
  { src: `${S}/2.jpg`,                                  caption: 'Κόλπος στο Σούρουπο',       category: 'Θέες',                       wide: false },

  { src: `${S}/FAQ-CKK5K7K.jpg`,                        caption: 'Althea Resorts',             category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/oceanisphoto.jpg',                    caption: 'Oceanis — Προϊόντα Spa',     category: 'Spa & Ευεξία',               wide: false },

  { src: '/images/breakfast/althea-breakfast-1.jpg',   caption: 'Πρωινό Τραπέζι',            category: 'Πρωινό',                     wide: true },
  { src: '/images/breakfast/althea-breakfast-2.jpg',   caption: 'Φρέσκα Αρτοσκευάσματα',    category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-3.jpg',   caption: 'Μέλι & Τοπικά Τυριά',       category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-4.jpg',   caption: 'Εποχικά Φρούτα',            category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-5.jpg',   caption: 'Ελληνικό Πρωινό',           category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-6.jpg',   caption: 'Τo Πρωινό Τραπέζι',         category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-7.jpg',   caption: 'Πρωινό στο Althea',          category: 'Πρωινό',                     wide: true },
  { src: '/images/breakfast/althea-breakfast-8.jpg',   caption: 'Πρωινό Τελετουργικό',       category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-9.jpg',   caption: 'Φρέσκο από την Κουζίνα',    category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-10.jpg',  caption: 'Πρωινό Φως',                category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-11.jpg',  caption: 'Επιλογές Μπουφέ',           category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-12.jpg',  caption: 'Χωριάτικα Τυριά',           category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-13.jpg',  caption: 'Μεσογειακό Πρωί',           category: 'Πρωινό',                     wide: true },
  { src: '/images/breakfast/althea-breakfast-14.jpg',  caption: 'Αργά Πρωινά',               category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-15.jpg',  caption: 'Πρωινός Καφές',             category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-16.jpg',  caption: 'Πρωινός Μπουφές',           category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-17.jpg',  caption: 'Φρεσκοψημένα',              category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-18.jpg',  caption: 'Το Πρωινό Τραπέζι',         category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-19.jpg',  caption: 'Πρωινό Δίπλα στη Θάλασσα', category: 'Πρωινό',                     wide: true },
  { src: '/images/breakfast/althea-breakfast-20.jpg',  caption: 'Μέλι & Φρούτα',             category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-21.jpg',  caption: 'Ελληνικό Πρωί',             category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-22.jpg',  caption: 'Πρωινές Λεπτομέρειες',     category: 'Πρωινό',                     wide: false },
  { src: '/images/breakfast/althea-breakfast-23.jpg',  caption: 'Η Ώρα του Πρωινού',         category: 'Πρωινό',                     wide: false },

  { src: '/images/restaurant/althea-indoor-outdoor-9.jpg',   caption: 'Γεύμα στο Althea',         category: 'Γαστρονομία',                wide: true },
  { src: '/images/restaurant/althea-indoor-outdoor-10.jpg',  caption: 'Ταράτσα Εστιατορίου',      category: 'Γαστρονομία',                wide: false },
  { src: '/images/restaurant/althea-indoor-outdoor-11.jpg',  caption: 'Εσωτερικό Εστιατόριο',     category: 'Γαστρονομία',                wide: false },
  { src: '/images/restaurant/althea-indoor-outdoor-12.jpg',  caption: 'Αίθουσα Γευμάτων',         category: 'Γαστρονομία',                wide: false },

  { src: '/images/reception/althea-indoor-outdoor-1.jpg',    caption: 'Λόμπι Althea',              category: 'Λόμπι & Ρεσεψιόν',          wide: true },
  { src: '/images/reception/althea-indoor-outdoor-2.jpg',    caption: 'Ρεσεψιόν',                  category: 'Λόμπι & Ρεσεψιόν',          wide: false },
  { src: '/images/reception/althea-indoor-outdoor-3.jpg',    caption: 'Εσωτερικό Ξενοδοχείου',     category: 'Λόμπι & Ρεσεψιόν',          wide: false },
  { src: '/images/reception/althea-indoor-outdoor-4.jpg',    caption: 'Λεπτομέρειες Λόμπι',        category: 'Λόμπι & Ρεσεψιόν',          wide: false },
  { src: '/images/reception/althea-indoor-outdoor-5.jpg',    caption: 'Η Υποδοχή',                 category: 'Λόμπι & Ρεσεψιόν',          wide: false },
  { src: '/images/reception/althea-indoor-outdoor-6.jpg',    caption: 'Άφιξη στο Althea',          category: 'Λόμπι & Ρεσεψιόν',          wide: true },
  { src: '/images/reception/althea-indoor-outdoor-7.jpg',    caption: 'Κοινόχρηστοι Χώροι',        category: 'Λόμπι & Ρεσεψιόν',          wide: false },
  { src: '/images/reception/althea-indoor-outdoor-8.jpg',    caption: 'Εσωτερικός Σχεδιασμός',     category: 'Λόμπι & Ρεσεψιόν',          wide: false },

  { src: '/images/outdoor-pool/althea-indoor-outdoor-13.jpg', caption: 'Εξωτερική Πισίνα',         category: 'Πισίνα & Εξωτερικοί Χώροι', wide: true },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-14.jpg', caption: 'Πισίνα στο Ηλιοβασίλεμα', category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-15.jpg', caption: 'Ταράτσα Πισίνας',          category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-16.jpg', caption: 'Η Πισίνα',                 category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-17.jpg', caption: 'Δίπλα στην Πισίνα',        category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-18.jpg', caption: 'Καλοκαίρι στην Πισίνα',    category: 'Πισίνα & Εξωτερικοί Χώροι', wide: true },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-19.jpg', caption: 'Θέα Πισίνας',              category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-20.jpg', caption: 'Απογευματινό Μπάνιο',      category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-21.jpg', caption: 'Δίπλα στο Νερό',           category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-22.jpg', caption: 'Πισίνα & Κόλπος',          category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-23.jpg', caption: 'Κήπος Πισίνας',            category: 'Πισίνα & Εξωτερικοί Χώροι', wide: true },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-24.jpg', caption: 'Εξωτερική Διαβίωση',       category: 'Πισίνα & Εξωτερικοί Χώροι', wide: false },
]

export default function GreekGalleryPage() {
  const [activeCategory, setActiveCategory] = useState('Όλες')

  const filtered = activeCategory === 'Όλες'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Γκαλερί"
      >
        <Image
          src="/images/main-pool.jpg"
          alt="Althea Resorts — γκαλερί"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Γκαλερί</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              Η Θέα<br />
              <em className="italic font-light text-white/70">Από Εδώ</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-10 bg-white border-b border-[#e8e4dd]">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`h-8 px-4 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#102027] text-white border border-[#102027]'
                      : 'bg-transparent text-[#6b6b6b] border border-[#e8e4dd] hover:border-[#102027] hover:text-[#102027]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Masonry */}
      <section className="pb-24 bg-white" aria-label={`Γκαλερί — ${activeCategory}`}>
        <div className="container-luxury">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <ScrollReveal
                key={item.src + i}
                delay={i * 40}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer"
              >
                <div className={`w-full relative ${item.wide ? 'aspect-[16/9]' : 'aspect-square'}`}>
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/40 transition-colors duration-500 flex flex-col items-center justify-center">
                    <p className="text-white text-xs uppercase tracking-widest font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
