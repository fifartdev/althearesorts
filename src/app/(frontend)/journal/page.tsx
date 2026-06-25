import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { getJournalPosts } from '@/lib/cms'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata = genMeta({
  title: 'Journal',
  description: 'Stories from Corinthia — the Althea Resorts journal. Local guides, hotel stories, gastronomy, wellness, and the life of the region.',
  keywords: ['Althea Resorts blog', 'Corinthia travel guide', 'Greece hotel journal', 'Xylokastro travel'],
  canonical: `${SITE_URL}/journal`,
})

const CATEGORY_LABELS: Record<string, string> = {
  'local-guides': 'Local Guides',
  'hotel-stories': 'Hotel Stories',
  gastronomy: 'Gastronomy',
  wellness: 'Wellness',
  events: 'Events',
  corinthia: 'Corinthia',
}

const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

const staticPosts = [
  {
    category: 'Local Guides',
    title: 'Ancient Corinth: A Morning Away From Everything',
    excerpt: 'One hour to one of the most powerful city-states of antiquity, still quiet enough to feel like a discovery.',
    readTime: '5 min read', href: '/journal/ancient-corinth', date: 'May 2025',
    image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=900&q=80', imageAlt: 'Ancient stone columns at Corinth',
  },
  {
    category: 'Wellness',
    title: 'The Philosophy Behind Oceanis',
    excerpt: 'Greek mythology, certified biodegradable formulas, and the decision that no explanation was needed.',
    readTime: '4 min read', href: '/journal/oceanis-philosophy', date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80', imageAlt: 'Spa wellness ritual',
  },
  {
    category: 'Gastronomy',
    title: 'What the Fishermen Bring In',
    excerpt: 'How a rooftop restaurant in Corinthia begins its evening story — at the harbor, before sunrise.',
    readTime: '6 min read', href: '/journal/fishermen-harvest', date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80', imageAlt: 'Fresh seafood from the Corinthian Gulf',
  },
  {
    category: 'Corinthia',
    title: 'The Corinth Canal: Closer Than You Think',
    excerpt: 'One of the great feats of nineteenth-century engineering, still stopping people in their tracks.',
    readTime: '3 min read', href: '/journal/corinth-canal', date: 'March 2025',
    image: `${S}/Gallery-9VZMNYN.jpg`, imageAlt: 'Corinthia landscape',
  },
  {
    category: 'Hotel Stories',
    title: 'On Althos: The Word Behind the Name',
    excerpt: 'How an ancient Greek word for healing became a design brief, an operating philosophy, and a place.',
    readTime: '7 min read', href: '/journal/althos-meaning', date: 'March 2025',
    image: `${S}/2.jpg`, imageAlt: 'Althea Resorts — the property',
  },
  {
    category: 'Wellness',
    title: 'The Case for Doing Nothing by a Pool',
    excerpt: 'A defense of the afternoon with no plan, no itinerary, and no particular reason to move.',
    readTime: '3 min read', href: '/journal/pool-afternoon', date: 'February 2025',
    image: `${S}/Gallery-MUZ36MM.jpg`, imageAlt: 'Pool and Gulf views at Althea',
  },
]

export default async function JournalPage() {
  const docs = await getJournalPosts('en', 20)

  const posts = docs.length > 0
    ? docs.map((p: any) => ({
        category: CATEGORY_LABELS[p.category] ?? p.category ?? '',
        title: p.title ?? '',
        excerpt: p.excerpt ?? '',
        readTime: p.readingTime ? `${p.readingTime} min read` : '',
        href: `/journal/${p.slug}`,
        date: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
          : '',
        image: typeof p.heroImage === 'object' ? (p.heroImage?.url ?? '') : (p.heroImage ?? ''),
        imageAlt: p.title ?? 'Althea Resorts journal',
      }))
    : staticPosts

  return (
    <main id="main-content">
      {/* Header */}
      <section className="pt-40 pb-16 lg:pt-56 lg:pb-20 bg-white" aria-label="Journal">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionLabel className="mb-6">Journal</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-deep">Stories from Corinthia</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-16 bg-white">
        <div className="container-luxury">
          <ScrollReveal>
            <a href={posts[0].href} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 border border-stone overflow-hidden">
              <div className="aspect-video lg:aspect-auto relative min-h-70">
                <Image
                  src={posts[0].image}
                  alt={posts[0].imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-deep/0 group-hover:bg-deep/10 transition-colors duration-500" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-label-upper text-gold block mb-4">{posts[0].category}</span>
                <h2 className="font-editorial text-3xl font-light text-deep leading-snug mb-4 group-hover:text-gold/80 transition-colors duration-300">
                  {posts[0].title}
                </h2>
                <p className="text-body-refined mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-fog uppercase tracking-wider">
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
      <section className="section-padding bg-cream">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, i) => (
              <ScrollReveal key={post.title} delay={i * 60}>
                <a href={post.href} className="group block">
                  <div className="aspect-16/10 overflow-hidden mb-5 relative">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-deep/0 group-hover:bg-deep/10 transition-colors duration-500" />
                  </div>
                  <span className="text-label-upper text-gold block mb-2">{post.category}</span>
                  <h3 className="font-editorial text-xl font-light text-deep leading-snug mb-3 group-hover:text-gold/80 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm font-light text-smoke leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-fog uppercase tracking-wider">
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
