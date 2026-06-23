import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata = genMeta({
  title: 'Ημερολόγιο — Ιστορίες από την Κορινθία',
  description: 'Ιστορίες από την Κορινθία — το ημερολόγιο της Althea Resorts. Οδηγοί, ιστορίες ξενοδοχείου, γαστρονομία, ευεξία και η ζωή της περιοχής.',
  keywords: ['blog Althea Resorts', 'οδηγός Κορινθία', 'ξενοδοχείο Ελλάδα ημερολόγιο', 'ταξίδι Ξυλόκαστρο'],
  canonical: `${SITE_URL}/el/journal`,
})

const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

const posts = [
  {
    category: 'Τοπικοί Οδηγοί',
    title: 'Αρχαία Κόρινθος: Ένα Πρωί Μακριά από Όλα',
    excerpt: 'Μία ώρα από έναν από τους πιο ισχυρούς πόλεις-κράτη της αρχαιότητας, ακόμα αρκετά ήσυχη για να νιώθεις σαν ανακάλυψη.',
    readTime: '5 λεπτά ανάγνωση', href: '/el/journal/ancient-corinth', date: 'Μάιος 2025',
    image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=900&q=80', imageAlt: 'Αρχαίοι κίονες στην Κόρινθο',
  },
  {
    category: 'Ευεξία',
    title: 'Η Φιλοσοφία Πίσω από την Oceanis',
    excerpt: 'Ελληνική μυθολογία, πιστοποιημένα βιοδιασπώμενες φόρμουλες, και μια απόφαση που δεν χρειάστηκε εξήγηση.',
    readTime: '4 λεπτά ανάγνωση', href: '/el/journal/oceanis-philosophy', date: 'Απρίλιος 2025',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80', imageAlt: 'Τελετουργικό spa ευεξίας',
  },
  {
    category: 'Γαστρονομία',
    title: 'Αυτό που Φέρνουν οι Ψαράδες',
    excerpt: 'Πώς ένα εστιατόριο ταράτσας στην Κορινθία αρχίζει την ιστορία της βραδιάς του — στο λιμάνι, πριν την ανατολή.',
    readTime: '6 λεπτά ανάγνωση', href: '/el/journal/fishermen-harvest', date: 'Απρίλιος 2025',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80', imageAlt: 'Φρέσκα θαλασσινά από τον Κορινθιακό Κόλπο',
  },
  {
    category: 'Κορινθία',
    title: 'Η Διώρυγα της Κορίνθου: Πιο Κοντά απ' όσο Νομίζετε',
    excerpt: 'Ένα από τα μεγαλύτερα έργα μηχανικής του δέκατου ένατου αιώνα, που εξακολουθεί να αφήνει τους επισκέπτες άφωνους.',
    readTime: '3 λεπτά ανάγνωση', href: '/el/journal/corinth-canal', date: 'Μάρτιος 2025',
    image: `${S}/Gallery-9VZMNYN.jpg`, imageAlt: 'Τοπίο Κορινθίας',
  },
  {
    category: 'Ιστορίες Ξενοδοχείου',
    title: 'Περί Άλθους: Η Λέξη Πίσω από το Όνομα',
    excerpt: 'Πώς μια αρχαία ελληνική λέξη για θεραπεία έγινε σχέδιο, λειτουργική φιλοσοφία και ένας τόπος.',
    readTime: '7 λεπτά ανάγνωση', href: '/el/journal/althos-meaning', date: 'Μάρτιος 2025',
    image: `${S}/2.jpg`, imageAlt: 'Althea Resorts — το κατάλυμα',
  },
  {
    category: 'Ευεξία',
    title: 'Υπέρ του να Μην Κάνεις Τίποτα Δίπλα σε μια Πισίνα',
    excerpt: 'Μια υπεράσπιση του απογεύματος χωρίς σχέδιο, χωρίς πρόγραμμα και χωρίς ιδιαίτερο λόγο να κουνηθείς.',
    readTime: '3 λεπτά ανάγνωση', href: '/el/journal/pool-afternoon', date: 'Φεβρουάριος 2025',
    image: `${S}/Gallery-MUZ36MM.jpg`, imageAlt: 'Πισίνα και θέα στον Κόλπο στο Althea',
  },
]

export default function GreekJournalPage() {
  return (
    <main id="main-content">
      {/* Header */}
      <section className="pt-40 pb-16 lg:pt-56 lg:pb-20 bg-white" aria-label="Ημερολόγιο">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionLabel className="mb-6">Ημερολόγιο</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-[#102027]">Ιστορίες από την Κορινθία</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-16 bg-white">
        <div className="container-luxury">
          <ScrollReveal>
            <a href={posts[0].href} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 border border-[#e8e4dd] overflow-hidden">
              <div className="aspect-[16/9] lg:aspect-auto relative min-h-[280px]">
                <Image
                  src={posts[0].image}
                  alt={posts[0].imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/10 transition-colors duration-500" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-label-upper text-[#ad8b27] block mb-4">{posts[0].category}</span>
                <h2 className="font-editorial text-3xl font-light text-[#102027] leading-snug mb-4 group-hover:text-[#ad8b27]/80 transition-colors duration-300">
                  {posts[0].title}
                </h2>
                <p className="text-body-refined mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[#a0a0a0] uppercase tracking-wider">
                  <span>{posts[0].date}</span>
                  <span>·</span>
                  <span>{posts[0].readTime}</span>
                </div>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts grid */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, i) => (
              <ScrollReveal key={post.title} delay={i * 60}>
                <a href={post.href} className="group block">
                  <div className="aspect-[16/10] overflow-hidden mb-5 relative">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/10 transition-colors duration-500" />
                  </div>
                  <span className="text-label-upper text-[#ad8b27] block mb-2">{post.category}</span>
                  <h3 className="font-editorial text-xl font-light text-[#102027] leading-snug mb-3 group-hover:text-[#ad8b27]/80 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm font-light text-[#6b6b6b] leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-[#a0a0a0] uppercase tracking-wider">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
