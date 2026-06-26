import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { getJournalPosts } from '@/lib/cms'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata = genMeta({
  title: 'Ημερολόγιο — Ιστορίες από την Κορινθία',
  description: 'Ιστορίες από την Κορινθία — το ημερολόγιο της Althea Resorts. Οδηγοί, ιστορίες ξενοδοχείου, γαστρονομία, ευεξία και η ζωή της περιοχής.',
  keywords: ['blog Althea Resorts', 'οδηγός Κορινθία', 'ξενοδοχείο Ελλάδα ημερολόγιο', 'ταξίδι Ξυλόκαστρο'],
  canonical: `${SITE_URL}/el/journal`,
})

const CATEGORY_LABELS: Record<string, string> = {
  'local-guides':   'Τοπικοί Οδηγοί',
  'hotel-stories':  'Ιστορίες Ξενοδοχείου',
  gastronomy:       'Γαστρονομία',
  wellness:         'Ευεξία',
  events:           'Εκδηλώσεις',
  corinthia:        'Κορινθία',
}

export default async function GreekJournalPage() {
  const docs = await getJournalPosts('el', 20)
  const activePosts = docs.length > 0
    ? docs.map((p: any) => ({
        category: CATEGORY_LABELS[p.category] ?? p.category ?? '',
        title: p.title ?? '',
        excerpt: p.excerpt ?? '',
        readTime: p.readingTime ? `${p.readingTime} λεπτά ανάγνωση` : '',
        href: `/el/journal/${p.slug}`,
        date: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString('el-GR', { month: 'long', year: 'numeric' })
          : '',
        image: (typeof p.heroImage === 'object' ? p.heroImage?.url : p.heroImage) || p.imageUrl || '',
        imageAlt: p.title ?? 'Althea Resorts ημερολόγιο',
      }))
    : []
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
      {activePosts.length > 0 && (
      <section className="pb-16 bg-white">
        <div className="container-luxury">
          <ScrollReveal>
            <a href={activePosts[0].href} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 border border-stone overflow-hidden">
              <div className="aspect-video lg:aspect-auto relative min-h-70">
                <Image
                  src={activePosts[0].image}
                  alt={activePosts[0].imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-deep/0 group-hover:bg-deep/10 transition-colors duration-500" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-label-upper text-gold block mb-4">{activePosts[0].category}</span>
                <h2 className="font-editorial text-3xl font-light text-deep leading-snug mb-4 group-hover:text-gold/80 transition-colors duration-300">
                  {activePosts[0].title}
                </h2>
                <p className="text-body-refined mb-6">{activePosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-smoke/60 uppercase tracking-wider">
                  <span>{activePosts[0].date}</span>
                  <span>·</span>
                  <span>{activePosts[0].readTime}</span>
                </div>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </section>
      )}

      {/* Posts grid */}
      {activePosts.length > 1 && (
      <section className="section-padding bg-cream">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePosts.slice(1).map((post, i) => (
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
                  <div className="flex items-center gap-3 text-xs text-smoke/60 uppercase tracking-wider">
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
      )}
    </main>
  )
}
