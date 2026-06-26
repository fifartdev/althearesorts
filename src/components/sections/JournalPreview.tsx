import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Locale = 'en' | 'el'

type PostItem = {
  category: string
  title: string
  excerpt: string
  readTime: string
  href: string
  image: string
  imageAlt: string
}

type JournalPreviewProps = {
  locale?: Locale
  label?: string
  headline1?: string
  headline2?: string
  ctaLabel?: string
  posts?: PostItem[]
}

export function JournalPreview({
  locale = 'en',
  label,
  headline1,
  headline2,
  ctaLabel,
  posts,
}: JournalPreviewProps) {
  if (!posts || posts.length === 0) return null

  const journalHref = locale === 'el' ? '/el/journal' : '/journal'
  const activePosts = posts.slice(0, 3)

  return (
    <section className="section-padding bg-white" aria-label="Journal — Althea Stories">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-12">
          <div>
            {label && (
              <ScrollReveal>
                <SectionLabel className="mb-4">{label}</SectionLabel>
              </ScrollReveal>
            )}
            {headline1 && (
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-deep">
                  {headline1}<br />
                  {headline2 && headline2}
                </h2>
              </ScrollReveal>
            )}
          </div>
          {ctaLabel && (
            <ScrollReveal delay={150}>
              <a
                href={journalHref}
                className="hidden lg:inline-flex items-center gap-2
                           text-xs uppercase tracking-[0.2em] text-smoke
                           hover:text-deep transition-colors duration-300"
              >
                {ctaLabel}
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                  <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                </svg>
              </a>
            </ScrollReveal>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activePosts.map((post, i) => (
            <ScrollReveal key={post.title} delay={i * 100}>
              <a href={post.href} className="group block">
                <div className="aspect-16/10 overflow-hidden mb-5 relative">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-deep/0 group-hover:bg-deep/10 transition-colors duration-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-label-upper text-gold">{post.category}</span>
                  <h3 className="font-editorial text-xl font-light text-deep leading-snug group-hover:text-gold/80 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm font-light text-smoke leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="text-xs uppercase tracking-widest text-smoke/60 mt-1">
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
