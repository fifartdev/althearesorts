import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { JOURNAL_POSTS } from '../journalData'

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = JOURNAL_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return genMeta({
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, 'Althea Resorts blog', 'Corinthia', 'Xylokastro Greece'],
    canonical: `${SITE_URL}/journal/${post.slug}`,
    image: post.image,
  })
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = JOURNAL_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = JOURNAL_POSTS.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden"
        aria-label={post.title}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/40 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 uppercase tracking-[0.15em] mb-5">
              <Link href="/journal" className="hover:text-white transition-colors duration-200">Blog</Link>
              <span>·</span>
              <span>{post.category}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-white max-w-3xl leading-tight">
              {post.title}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Article body */}
      <article className="section-padding bg-white">
        <div className="container-narrow">
          {post.sections ? (
            <>
              <ScrollReveal>
                <GoldLine className="mb-10" />
              </ScrollReveal>
              {post.sections.map((section, i) => (
                <ScrollReveal key={i} delay={i * 40}>
                  <div className="mb-8">
                    {section.heading && (
                      <h2 className="font-editorial text-2xl lg:text-3xl font-light text-[#102027] mb-5 mt-10 first:mt-0">
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className="text-body-refined text-lg leading-relaxed mb-5">
                        {para}
                      </p>
                    ))}
                    {/* Second image inserted after section 2 (before section 3) */}
                    {i === 1 && post.image2 && (
                      <div className="relative aspect-[16/7] overflow-hidden mt-10 mb-2">
                        <Image
                          src={post.image2}
                          alt={post.image2Alt ?? ''}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 720px"
                        />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </>
          ) : (
            <div className="text-center py-16">
              <GoldLine className="mx-auto mb-8" />
              <p className="text-body-refined text-lg mb-4">This article is coming soon.</p>
              <p className="font-editorial text-xl font-light italic text-[#102027] mb-10">
                We publish new articles from Corinthia regularly.
              </p>
              <Link
                href="/journal"
                className="h-11 px-7 inline-flex items-center justify-center
                           text-xs uppercase tracking-[0.2em]
                           bg-[#102027] text-white border border-[#102027]
                           hover:bg-transparent hover:text-[#102027]
                           transition-all duration-500"
              >
                Browse the Blog
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* Related stories */}
      {related.length > 0 && (
        <section className="section-padding bg-[#faf8f4]" aria-label="More articles from the blog">
          <div className="container-luxury">
            <ScrollReveal>
              <SectionLabel className="mb-10">More Articles</SectionLabel>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((item, i) => (
                <ScrollReveal key={item.slug} delay={i * 60}>
                  <Link href={`/journal/${item.slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden mb-5 relative">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/10 transition-colors duration-500" />
                    </div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">{item.category}</span>
                    <h3 className="font-editorial text-xl font-light text-[#102027] leading-snug mb-3 group-hover:text-[#ad8b27]/80 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light text-[#6b6b6b] leading-relaxed mb-3">{item.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-[#a0a0a0] uppercase tracking-wider">
                      <span>{item.date}</span>
                      <span>·</span>
                      <span>{item.readTime}</span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={200}>
              <div className="mt-12 text-center">
                <Link
                  href="/journal"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#102027] hover:text-[#ad8b27] transition-colors duration-300"
                >
                  View all articles
                  <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                    <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </main>
  )
}
