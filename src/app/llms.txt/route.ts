import { SITE_URL } from '@/lib/constants'
import { getItems, getPage } from '@/lib/wp/api'

/**
 * llms.txt (summary of the site for AI assistants), from the "SEO & GEO" page in WordPress.
 * {rooms} is replaced by the current list of rooms, so new or removed rooms appear automatically.
 */
export async function GET() {
  const [geo, rooms] = await Promise.all([getPage('seo_geo'), getItems('althea_room')])
  const list = rooms.map((r) => `- [${r.title}](${SITE_URL}/accommodation/${r.slug})`).join('\n')
  return new Response(`${geo.llms.content.replace('{rooms}', list)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
