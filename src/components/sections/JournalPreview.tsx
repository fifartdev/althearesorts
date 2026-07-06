import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Locale = 'en' | 'el'

const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

const content = {
  en: {
    label: 'Journal',
    headlineLine1: 'Stories from',
    headlineLine2: 'Corinthia',
    allStoriesCta: 'All Stories',
    journalHref: '/journal',
    posts: [
      {
        category: 'Destination',
        title: 'The Sixty-Minute Shift: Why Savvy Travelers Are Choosing Corinthia Over the Cyclades',
        excerpt: 'As travel to the popular Aegean islands becomes increasingly congested, a growing number of deliberate travelers are turning their attention to Corinthia — one hour from Athens, no ferry required.',
        readTime: '6 min read',
        href: '/journal/sixty-minute-shift-corinthia',
        image: `${S}/2.jpg`,
        imageAlt: 'Gulf at dusk viewed from Althea Resorts, Ano Loutro, Xylokastro, Corinthia',
      },
      {
        category: 'Gastronomy',
        title: 'From the Gulf to the Horizon: Culinary Storytelling at AITHER Rooftop Restaurant',
        excerpt: 'At AITHER, the rooftop dining destination at Althea Resorts, the menu is a direct reflection of the Corinthian landscape — sourced within sight of the tables.',
        readTime: '6 min read',
        href: '/journal/aither-rooftop-restaurant-corinthia',
        image: '/images/restaurant/althea-indoor-outdoor-9.jpg',
        imageAlt: 'Dining at AITHER rooftop restaurant at Althea Resorts, Xylokastro, Corinthia',
      },
      {
        category: 'Local Guides',
        title: 'Ancient Corinth: A Morning Away From Everything',
        excerpt: 'One hour to one of the most powerful city-states of antiquity, still quiet enough to feel like a discovery.',
        readTime: '5 min read',
        href: '/journal/ancient-corinth',
        image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Ancient stone columns at the Temple of Apollo, Corinth, Greece',
      },
    ],
  },
  el: {
    label: 'Περιοδικό',
    headlineLine1: 'Ιστορίες από',
    headlineLine2: 'την Κορινθία',
    allStoriesCta: 'Όλα τα Άρθρα',
    journalHref: '/el/journal',
    posts: [
      {
        category: 'Προορισμός',
        title: 'Η Αλλαγή των Εξήντα Λεπτών: Γιατί οι Έξυπνοι Ταξιδιώτες Επιλέγουν την Κορινθία',
        excerpt: 'Καθώς τα ταξίδια στα δημοφιλή νησιά του Αιγαίου γίνονται όλο και πιο συνωστισμένα, ένας αυξανόμενος αριθμός ταξιδιωτών στρέφεται στην Κορινθία — μία ώρα από την Αθήνα.',
        readTime: '6 λεπτά ανάγνωση',
        href: '/el/journal/sixty-minute-shift-corinthia',
        image: `${S}/2.jpg`,
        imageAlt: 'Ο Κορινθιακός Κόλπος στο σούρουπο από το Althea Resorts, Ξυλόκαστρο',
      },
      {
        category: 'Γαστρονομία',
        title: 'Από τον Κόλπο στον Ορίζοντα: Γαστρονομική Αφήγηση στο Εστιατόριο AITHER',
        excerpt: 'Στο AITHER, τον εστιατόριο ταράτσας της Althea Resorts, το μενού είναι άμεση αντανάκλαση του κορινθιακού τοπίου — με υλικά εντός οπτικής επαφής των τραπεζιών.',
        readTime: '6 λεπτά ανάγνωση',
        href: '/el/journal/aither-rooftop-restaurant-corinthia',
        image: '/images/restaurant/althea-indoor-outdoor-9.jpg',
        imageAlt: 'Γεύμα στο εστιατόριο ταράτσας AITHER, Althea Resorts, Ξυλόκαστρο',
      },
      {
        category: 'Τοπικοί Οδηγοί',
        title: 'Αρχαία Κόρινθος: Ένα Πρωί Μακριά από Όλα',
        excerpt: 'Μία ώρα από έναν από τους πιο ισχυρούς πόλεις-κράτη της αρχαιότητας, ακόμα αρκετά ήσυχη για να νιώθεις σαν ανακάλυψη.',
        readTime: '5 λεπτά ανάγνωση',
        href: '/el/journal/ancient-corinth',
        image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Αρχαίοι κίονες στον Ναό του Απόλλωνα, Κόρινθος',
      },
    ],
  },
}

export function JournalPreview({ locale = 'en' }: { locale?: Locale }) {
  const c = content[locale]

  return (
    <section className="section-padding bg-white" aria-label="Journal — Althea Stories">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-12">
          <div>
            <ScrollReveal>
              <SectionLabel className="mb-4">{c.label}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027]">
                {c.headlineLine1}<br />
                {c.headlineLine2}
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={150}>
            <a
              href={c.journalHref}
              className="hidden lg:inline-flex items-center gap-2
                         text-xs uppercase tracking-[0.2em] text-[#6b6b6b]
                         hover:text-[#102027] transition-colors duration-300"
            >
              {c.allStoriesCta}
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {c.posts.map((post, i) => (
            <ScrollReveal key={post.title} delay={i * 100}>
              <a href={post.href} className="group block">
                <div className="aspect-[16/10] overflow-hidden mb-5 relative">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/10 transition-colors duration-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-label-upper text-[#ad8b27]">{post.category}</span>
                  <h3 className="font-editorial text-xl font-light text-[#102027] leading-snug group-hover:text-[#ad8b27]/80 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="text-xs uppercase tracking-widest text-[#a0a0a0] mt-1">
                    {post.readTime}
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
