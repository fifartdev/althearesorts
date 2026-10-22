import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { getPage, getPosts, src } from '@/lib/wp/api'
import { getLabels } from '@/lib/wp/site'
import { siteDefaults } from '@/lib/wp/metadata'
import { Rich, decodeEntities } from '@/lib/wp/Rich'
import { blocksToSections, parseBlocks, splitLines } from '@/lib/wp/text'
import type { Item, Locale } from '@/lib/wp/schema-types'


export async function articleStaticParams(locale: Locale) {
  return (await getPosts(locale)).map((p) => ({ slug: p.fields.route_slug }))
}

/** URL of a post's translation in the other language, if it exists. */
async function translationUrl(post: Item<'althea_post'>, locale: Locale) {
  const other: Locale = locale === 'el' ? 'en' : 'el'
  const t = (await getPosts(other)).find((p) => p.fields.translation_key === post.fields.translation_key)
  return t ? `${SITE_URL}${other === 'el' ? '/el' : ''}/journal/${t.fields.route_slug}` : null
}

export async function articleMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const post = (await getPosts(locale)).find((p) => p.fields.route_slug === slug)
  if (!post) return {}
  const f = post.fields
  const [geo, site] = await Promise.all([getPage('seo_geo'), siteDefaults(locale)])
  const keywords = splitLines(f.seo_keywords)
  const url = `${SITE_URL}${locale === 'el' ? '/el' : ''}/journal/${slug}`
  const other = await translationUrl(post, locale)
  // Without a translation, don't point hreflang at a page that does not exist.
  const languages = other
    ? undefined
    : { [locale]: url, 'x-default': url }
  return genMeta({
    title: f.seo_title || post.title,
    description: f.seo_description || post.excerpt,
    keywords: keywords.length ? keywords : [f.category, ...splitLines(geo.defaults.article_keywords[locale])],
    canonical: url,
    image: src(post.image),
    site,
    languages,
  })
}

export async function ArticlePage({ slug, locale }: { slug: string; locale: Locale }) {
  const labels = await getLabels('pages', locale)
  const [posts, c] = await Promise.all([getPosts(locale), getPage('journal')])
  const post = posts.find((p) => p.fields.route_slug === slug)
  if (!post) notFound()

  const f = post.fields
  const base = locale === 'el' ? '/el/journal' : '/journal'
  const sections = f.body ? blocksToSections(parseBlocks(f.body)) : null
  const related = posts.filter((p) => p.fields.route_slug !== slug).slice(0, 3)
  const a = c.article

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden"
        aria-label={post.title}
      >
        <Image
          src={src(post.image)}
          alt={f.image_alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/40 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 uppercase tracking-[0.15em] mb-5">
              <Link href={base} className="hover:text-white transition-colors duration-200">{a.back_label[locale]}</Link>
              <span>·</span>
              <span>{f.category}</span>
              <span>·</span>
              <span>{f.display_date}</span>
              <span>·</span>
              <span>{f.read_time}</span>
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
          {sections ? (
            <>
              <ScrollReveal>
                <GoldLine className="mb-10" />
              </ScrollReveal>
              {sections.map((section, i) => (
                <ScrollReveal key={i} delay={i * 40}>
                  <div className="mb-8">
                    {section.heading && (
                      <h2 className="font-editorial text-2xl lg:text-3xl font-light text-[#102027] mb-5 mt-10 first:mt-0">
                        <Rich html={section.heading} />
                      </h2>
                    )}
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className="text-body-refined text-lg leading-relaxed mb-5">
                        <Rich html={para} />
                      </p>
                    ))}
                    {/* Second image inserted after section index 1 */}
                    {i === 1 && f.image2 && (
                      <div className="relative aspect-[16/7] overflow-hidden mt-10 mb-2">
                        <Image
                          src={src(f.image2)}
                          alt={f.image2_alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 720px"
                        />
                      </div>
                    )}
                    {section.bullets && (
                      <ul className="space-y-3 mt-4 mb-6">
                        {section.bullets.map((bullet, k) => (
                          <li key={k} className="flex gap-3 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] mt-[0.65rem] shrink-0" />
                            <span className="text-body-refined text-lg leading-relaxed"><Rich html={bullet} /></span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.faqs && (
                      <div className="space-y-6 mt-4 mb-6">
                        {section.faqs.map((faq, k) => (
                          <div key={k} className="border-l-2 border-[#ad8b27]/40 pl-5">
                            <p className="font-editorial text-lg font-light text-[#102027] mb-1"><Rich html={faq.q} /></p>
                            <p className="text-sm font-light text-[#6b6b6b] leading-relaxed"><Rich html={faq.a} /></p>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.cta && (
                      <div className="mt-8 mb-4">
                        <a
                          href={decodeEntities(section.cta.href)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 h-11 px-8
                                     text-xs uppercase tracking-[0.2em]
                                     bg-[#ad8b27] text-white border border-[#ad8b27]
                                     hover:bg-transparent hover:text-[#ad8b27]
                                     transition-all duration-500"
                        >
                          <Rich html={section.cta.label} />
                          <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                            <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </>
          ) : (
            <div className="text-center py-16">
              <GoldLine className="mx-auto mb-8" />
              <p className="text-body-refined text-lg mb-4">{a.coming_soon_title[locale]}</p>
              <p className="font-editorial text-xl font-light italic text-[#102027] mb-10">
                {a.coming_soon_body[locale]}
              </p>
              <Link
                href={base}
                className="h-11 px-7 inline-flex items-center justify-center
                           text-xs uppercase tracking-[0.2em]
                           bg-[#102027] text-white border border-[#102027]
                           hover:bg-transparent hover:text-[#102027]
                           transition-all duration-500"
              >
                {a.browse_cta[locale]}
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* Related stories */}
      {related.length > 0 && (
        <section className="section-padding bg-[#faf8f4]" aria-label={labels.related}>
          <div className="container-luxury">
            <ScrollReveal>
              <SectionLabel className="mb-10">{a.more_heading[locale]}</SectionLabel>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((item, i) => (
                <ScrollReveal key={item.slug} delay={i * 60}>
                  <Link href={`${base}/${item.fields.route_slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden mb-5 relative">
                      <Image
                        src={src(item.image)}
                        alt={item.fields.image_alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/10 transition-colors duration-500" />
                    </div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">{item.fields.category}</span>
                    <h3 className="font-editorial text-xl font-light text-[#102027] leading-snug mb-3 group-hover:text-[#ad8b27]/80 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light text-[#6b6b6b] leading-relaxed mb-3">{item.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-[#a0a0a0] uppercase tracking-wider">
                      <span>{item.fields.display_date}</span>
                      <span>·</span>
                      <span>{item.fields.read_time}</span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={200}>
              <div className="mt-12 text-center">
                <Link
                  href={base}
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#102027] hover:text-[#ad8b27] transition-colors duration-300"
                >
                  {a.view_all[locale]}
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
