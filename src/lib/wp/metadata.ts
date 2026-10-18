import 'server-only'

import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { getPage, getSettings } from './api'
import { splitLines } from './text'
import type { Locale, PageSlug, Pages } from './schema-types'

type SeoPage = { [K in PageSlug]: Pages[K] extends { seo: unknown } ? K : never }[PageSlug]

/** Site-wide metadata defaults from the CMS settings; Greek falls back to English when empty. */
export async function siteDefaults(locale: Locale) {
  const s = await getSettings()
  return {
    name: s.site_name,
    tagline: s.site_tagline[locale] || s.site_tagline.en,
    description: s.default_meta_description[locale] || s.default_meta_description.en,
  }
}

/**
 * Metadata for a CMS page from its SEO fields, built by the same generateMetadata() as before
 * (title template, canonical, hreflang, OpenGraph, Twitter, robots).
 */
export async function pageMetadata(slug: SeoPage, locale: Locale, path: string, extra: { image?: string } = {}): Promise<Metadata> {
  const page = (await getPage(slug)) as { seo: { title: Partial<Record<Locale, string>>; description: Partial<Record<Locale, string>>; keywords: Partial<Record<Locale, string>> } }
  const seo = page.seo
  const keywords = splitLines(seo.keywords[locale])
  return genMeta({
    title: seo.title[locale] || undefined,
    description: seo.description[locale] || undefined,
    keywords: keywords.length ? keywords : undefined,
    canonical: `${SITE_URL}${path}`,
    site: await siteDefaults(locale),
    ...extra,
  })
}
