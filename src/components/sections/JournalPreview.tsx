import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Locale = 'en' | 'el'

const content = {
  en: {
    label: 'Journal',
    headlineLine1: 'Stories from',
    headlineLine2: 'Corinthia',
    allStoriesCta: 'All Stories',
    journalHref: '/journal',
    posts: [
      {
        category: 'Local Guides',
        title: 'Ancient Corinth: A Morning Away From Everything',
        excerpt: 'One hour to one of the most powerful city-states of antiquity, still quiet enough to feel like a discovery.',
        readTime: '5 min read',
        href: '/journal/ancient-corinth',
        image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Ancient stone columns at Corinth',
      },
      {
        category: 'Wellness',
        title: 'The Philosophy Behind Oceanis',
        excerpt: 'Greek mythology, certified biodegradable formulas, and the decision that no explanation was needed.',
        readTime: '4 min read',
        href: '/journal/oceanis-philosophy',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Spa wellness products',
      },
      {
        category: 'Gastronomy',
        title: 'What the Fishermen Bring In',
        excerpt: 'How a rooftop restaurant in Corinthia begins its evening story — at the harbor, before sunrise.',
        readTime: '6 min read',
        href: '/journal/fishermen-harvest',
        image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Fresh seafood from Corinthian Gulf',
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
        category: 'Τοπικοί Οδηγοί',
        title: 'Αρχαία Κόρινθος: Ένα πρωινό μακριά',
        excerpt: 'Μία ώρα από ένα από τα πιο ισχυρά αρχαία κέντρα, που ακόμα σου δίνει την αίσθηση ανακάλυψης.',
        readTime: '5 λεπτά ανάγνωση',
        href: '/el/journal/ancient-corinth',
        image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Αρχαίοι κίονες στην Κόρινθο',
      },
      {
        category: 'Ευεξία',
        title: 'Η φιλοσοφία πίσω από το Oceanis',
        excerpt: 'Ελληνική μυθολογία, βιοδιασπώμενες φόρμουλες, και η απόφαση να μη χρειαστεί καμία εξήγηση.',
        readTime: '4 λεπτά ανάγνωση',
        href: '/el/journal/oceanis-philosophy',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Προϊόντα spa',
      },
      {
        category: 'Γαστρονομία',
        title: 'Τι φέρνουν οι ψαράδες',
        excerpt: 'Πώς ένα εστιατόριο ταράτσας στην Κορινθία ξεκινά την ιστορία της βραδιάς — στο λιμάνι, πριν ανατείλει ο ήλιος.',
        readTime: '6 λεπτά ανάγνωση',
        href: '/el/journal/fishermen-harvest',
        image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Φρέσκα θαλασσινά από τον Κορινθιακό',
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
