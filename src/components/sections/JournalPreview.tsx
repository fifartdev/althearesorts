import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

const posts = [
  {
    category: 'Local Guides',
    title: 'Ancient Corinth: A Morning Away From Everything',
    excerpt: 'One hour to one of the most powerful city-states of antiquity, still quiet enough to feel like a discovery.',
    readTime: '5 min read',
    href: '/journal/ancient-corinth',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Ancient Corinth ruins',
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
]

export function JournalPreview() {
  return (
    <section className="section-padding bg-white" aria-label="Journal — Althea Stories">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-12">
          <div>
            <ScrollReveal>
              <SectionLabel className="mb-4">Journal</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027]">
                Stories from<br />Corinthia
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={150}>
            <a
              href="/journal"
              className="hidden lg:inline-flex items-center gap-2
                         text-xs uppercase tracking-[0.2em] text-[#6b6b6b]
                         hover:text-[#102027] transition-colors duration-300"
            >
              All Stories
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <ScrollReveal key={post.title} delay={i * 100}>
              <a href={post.href} className="group block">
                {/* Image */}
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

                {/* Content */}
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
