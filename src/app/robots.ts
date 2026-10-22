import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getPage } from '@/lib/wp/api'
import { splitLines } from '@/lib/wp/text'

// Rendered per request from the tagged WordPress data cache, so a WordPress change shows up at once
// (a prerendered file would stay cached on the CDN until the next deploy).
export const dynamic = 'force-dynamic'

/** robots.txt from the "SEO & GEO" page in WordPress: hidden paths, allowed and blocked crawlers. */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const { robots: r } = await getPage('seo_geo')
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: splitLines(r.disallow) },
      ...splitLines(r.allow_bots).map((userAgent) => ({ userAgent, allow: '/' })),
      ...splitLines(r.block_bots).map((userAgent) => ({ userAgent, disallow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
