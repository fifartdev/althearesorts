import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { JOURNAL_POSTS } from './journalData'

export const metadata = genMeta({
  title: 'Blog',
  description: 'Articles from Corinthia — the Althea Resorts blog. Destination guides, gastronomy, wellness, local culture, and the life of the Corinthian Gulf region.',
  keywords: ['Althea Resorts blog', 'Corinthia travel guide', 'Greece hotel journal', 'Xylokastro travel', 'AITHER restaurant Corinthia'],
  canonical: `${SITE_URL}/journal`,
})

export default function JournalPage() {
  const featured = JOURNAL_POSTS[0]
  const gridPosts = JOURNAL_POSTS.slice(1)

  return (
    <main id="main-content">
      {/* Header */}
      <section className="pt-40 pb-16 lg:pt-56 lg:pb-20 bg-white" aria-label="Blog">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionLabel className="mb-6">Blog</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-[#102027]">Articles from Corinthia</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-16 bg-white">
        <div className="container-luxury">
          <ScrollReveal>
            <Link href={`/journal/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 border border-[#e8e4dd] overflow-hidden">
              <div className="aspect-[16/9] lg:aspect-auto relative min-h-[280px]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/10 transition-colors duration-500" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-label-upper text-[#ad8b27] block mb-4">{featured.category}</span>
                <h2 className="font-editorial text-3xl font-light text-[#102027] leading-snug mb-4 group-hover:text-[#ad8b27]/80 transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-body-refined mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[#a0a0a0] uppercase tracking-wider">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts grid */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 60}>
                <Link href={`/journal/${post.slug}`} className="group block">
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
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
