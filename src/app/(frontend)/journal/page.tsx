import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata = genMeta({
  title: 'Journal',
  description: 'Stories from Corinthia — the Althea Resorts journal. Destination guides, gastronomy, wellness, local culture, and the life of the Corinthian Gulf region.',
  keywords: ['Althea Resorts blog', 'Corinthia travel guide', 'Greece hotel journal', 'Xylokastro travel', 'AITHER restaurant Corinthia'],
  canonical: `${SITE_URL}/journal`,
})

const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

type Post = {
  category: string
  title: string
  excerpt: string
  readTime: string
  href: string
  date: string
  image: string
  imageAlt: string
  image2?: string
  image2Alt?: string
}

const posts: Post[] = [
  {
    category: 'Destination',
    title: 'The Sixty-Minute Shift: Why Savvy Travelers Are Choosing Corinthia Over the Cyclades',
    excerpt: 'As travel to the popular Aegean islands becomes increasingly congested, a growing number of deliberate travelers are turning their attention to Corinthia — one hour from Athens, no ferry required.',
    readTime: '6 min read',
    href: '/journal/sixty-minute-shift-corinthia',
    date: 'July 2026',
    image: `${S}/2.jpg`,
    imageAlt: 'Gulf at dusk viewed from Althea Resorts, Ano Loutro, Xylokastro, Corinthia, Greece',
    image2: '/images/new-images/althea-side-images1.jpg',
    image2Alt: 'Panoramic views of the Corinthian Gulf and Peloponnese mountains from Althea Resorts, Xylokastro',
  },
  {
    category: 'Gastronomy',
    title: 'From the Gulf to the Horizon: Culinary Storytelling at AITHER Rooftop Restaurant',
    excerpt: 'At AITHER, the rooftop dining destination at Althea Resorts, the menu is a direct reflection of the Corinthian landscape — sourced within sight of the tables, guided by the morning catch from the gulf.',
    readTime: '6 min read',
    href: '/journal/aither-rooftop-restaurant-corinthia',
    date: 'July 2026',
    image: '/images/restaurant/althea-indoor-outdoor-9.jpg',
    imageAlt: 'Dining at AITHER rooftop restaurant at Althea Resorts, Xylokastro, Corinthia, Greece',
    image2: '/images/restaurant/althea-indoor-outdoor-10.jpg',
    image2Alt: 'AITHER rooftop restaurant terrace with Corinthian Gulf views at Althea Resorts, Xylokastro',
  },
  {
    category: 'Local Guides',
    title: 'Ancient Corinth: A Morning Away From Everything',
    excerpt: 'One hour to one of the most powerful city-states of antiquity, still quiet enough to feel like a discovery.',
    readTime: '5 min read', href: '/journal/ancient-corinth', date: 'May 2025',
    image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=900&q=80', imageAlt: 'Ancient stone columns at the Temple of Apollo, Corinth, Greece',
  },
  {
    category: 'Wellness',
    title: 'The Philosophy Behind Oceanis',
    excerpt: 'Greek mythology, certified biodegradable formulas, and the decision that no explanation was needed.',
    readTime: '4 min read', href: '/journal/oceanis-philosophy', date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80', imageAlt: 'Oceanis spa wellness ritual at Althea Resorts Ocean Spa, Corinthia',
  },
  {
    category: 'Gastronomy',
    title: 'What the Fishermen Bring In',
    excerpt: 'How a rooftop restaurant in Corinthia begins its evening story — at the harbor, before sunrise.',
    readTime: '6 min read', href: '/journal/fishermen-harvest', date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80', imageAlt: 'Fresh seafood from the Corinthian Gulf for AITHER restaurant, Althea Resorts',
  },
  {
    category: 'Corinthia',
    title: 'The Corinth Canal: Closer Than You Think',
    excerpt: 'One of the great feats of nineteenth-century engineering, still stopping people in their tracks.',
    readTime: '3 min read', href: '/journal/corinth-canal', date: 'March 2025',
    image: `${S}/Gallery-9VZMNYN.jpg`, imageAlt: 'Corinthia landscape and coastline near Xylokastro',
  },
  {
    category: 'Hotel Stories',
    title: 'On Althos: The Word Behind the Name',
    excerpt: 'How an ancient Greek word for healing became a design brief, an operating philosophy, and a place.',
    readTime: '7 min read', href: '/journal/althos-meaning', date: 'March 2025',
    image: `${S}/1.jpg`, imageAlt: 'Althea Resorts — the property in Ano Loutro, Xylokastro, Corinthia',
  },
  {
    category: 'Wellness',
    title: 'The Case for Doing Nothing by a Pool',
    excerpt: 'A defense of the afternoon with no plan, no itinerary, and no particular reason to move.',
    readTime: '3 min read', href: '/journal/pool-afternoon', date: 'February 2025',
    image: `${S}/Gallery-MUZ36MM.jpg`, imageAlt: 'Pool and Corinthian Gulf views at Althea Resorts, Xylokastro',
  },
]

export default function JournalPage() {
  const featured = posts[0]
  const gridPosts = posts.slice(1)

  return (
    <main id="main-content">
      {/* Header */}
      <section className="pt-40 pb-16 lg:pt-56 lg:pb-20 bg-white" aria-label="Journal">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionLabel className="mb-6">Journal</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-[#102027]">Stories from Corinthia</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-16 bg-white">
        <div className="container-luxury">
          <ScrollReveal>
            <a href={featured.href} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 border border-[#e8e4dd] overflow-hidden">
              {featured.image2 ? (
                <div className="grid grid-rows-[2fr_1fr] gap-1 min-h-[320px] lg:min-h-[460px]">
                  <div className="relative overflow-hidden">
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
                  <div className="relative overflow-hidden">
                    <Image
                      src={featured.image2}
                      alt={featured.image2Alt ?? ''}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/10 transition-colors duration-500" />
                  </div>
                </div>
              ) : (
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
              )}
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
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts grid */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, i) => (
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
                  {post.image2 && (
                    <div className="aspect-[16/6] overflow-hidden mb-4 relative">
                      <Image
                        src={post.image2}
                        alt={post.image2Alt ?? ''}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
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
