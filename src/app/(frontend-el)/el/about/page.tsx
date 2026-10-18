import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { getPage, src } from '@/lib/wp/api'
import { pageMetadata } from '@/lib/wp/metadata'
import { Paragraphs, Rich, spaced } from '@/lib/wp/Rich'
import { splitLines, splitParagraphs } from '@/lib/wp/text'

export async function generateMetadata() {
  return pageMetadata('about', 'el', '/el/about')
}

const LINK = 'text-[#ad8b27] hover:underline font-light'

// The Greek intro reveals each paragraph separately; the first one is larger.
const introDelay = (i: number) => (i === 0 ? undefined : i === 1 ? 100 : 150)
const introClass = (i: number, n: number) =>
  i === 0 ? 'text-body-refined text-lg leading-relaxed mb-6' : i < n - 1 ? 'text-body-refined mb-6' : 'text-body-refined'

export default async function GreekAboutPage() {
  const c = await getPage('about')
  const intro = splitParagraphs(c.intro.paragraphs.el)
  return (
    <main id="main-content">
      {/* Page Hero */}
      <section
        className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 bg-[#35657a] overflow-hidden"
        aria-label="Σχετικά με Εμάς"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-editorial text-[22vw] font-light text-white leading-none select-none">
            {c.hero.watermark}
          </div>
        </div>
        <div className="relative z-10 container-luxury">
          <ScrollReveal>
            <SectionLabel light className="mb-6">{c.hero.label.el}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-3xl">
              <Rich html={c.hero.heading.el} />
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-narrow">
          {intro.map((p, i) => (
            <ScrollReveal key={i} delay={introDelay(i)}>
              <p className={introClass(i, intro.length)}>
                <Rich html={p} classes={{ a: LINK }} />
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src={src(c.who.image)}
                alt={c.who.image_alt.el}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">{c.who.label.el}</SectionLabel>
              </ScrollReveal>
              {c.who.heading.el && (
                <ScrollReveal delay={100}>
                  <h2 className="text-display-sm text-[#102027] mb-6">
                    <Rich html={c.who.heading.el} />
                  </h2>
                </ScrollReveal>
              )}
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs html={c.who.paragraphs.el} className={spaced('text-body-refined', 'mb-5')} classes={{ a: LINK }} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Are */}
      <section className="section-padding bg-[#102027]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <SectionLabel light className="mb-6">{c.where.label.el}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-white mb-8">
                  <Rich html={c.where.heading.el} />
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs
                  html={c.where.paragraphs.el}
                  className={spaced('text-sm font-light text-white/60 leading-relaxed', 'mb-5')}
                  classes={{ a: 'text-[#ad8b27]/70 hover:text-[#ad8b27] transition-colors duration-200 font-light' }}
                />
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollReveal variant="image" className="aspect-[4/3] w-full relative overflow-hidden">
                <Image
                  src={src(c.where.image)}
                  alt={c.where.image_alt.el}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <SectionLabel className="mb-6 justify-center">{c.values.label.el}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027] mb-8">
                <Rich html={c.values.heading.el} />
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoldLine className="mx-auto mb-10" />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Paragraphs html={c.values.paragraphs.el} className={spaced('text-body-refined text-center', 'mb-6', 'mb-10')} classes={{ a: LINK }} />
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <div className="flex flex-col items-center gap-3 pt-8 border-t border-[#e8e4dd]">
                {splitLines(c.values.stats.el).map((stat) => (
                  <div key={stat} className="flex items-center gap-3 text-sm font-light text-[#6b6b6b]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                    {stat}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FinalBookingCTA locale="el" />
    </main>
  )
}
