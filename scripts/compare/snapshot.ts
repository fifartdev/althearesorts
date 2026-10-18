/**
 * Saves the HTML of every public URL of a running site, for scripts/compare/compare.ts.
 *   npx tsx scripts/compare/snapshot.ts <base-url> <out-dir>
 * URLs: sitemap.xml + all blog posts (EN/EL) + robots.txt, sitemap.xml, llms.txt and a 404.
 */
import fs from 'node:fs'
import path from 'node:path'

const [base, outDir] = process.argv.slice(2)
if (!base || !outDir) throw new Error('usage: snapshot.ts <base-url> <out-dir>')
const ROOT = path.resolve(import.meta.dirname, '../..')
const content = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/lib/wp/fallback/content.json'), 'utf8'))

export const fileFor = (p: string) => (p === '/' ? 'index' : p.replace(/^\//, '').replace(/[/?.]/g, '_')) + '.html'

async function main() {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
  const paths = new Set<string>([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname))
  for (const p of content.items.althea_post) paths.add(`${p.fields.locale === 'el' ? '/el' : ''}/journal/${p.fields.route_slug}`)
  for (const p of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/this-page-does-not-exist']) paths.add(p)

  fs.mkdirSync(outDir, { recursive: true })
  const index: Record<string, number> = {}
  for (const p of [...paths].sort()) {
    const res = await fetch(`${base}${p}`, { redirect: 'manual' })
    index[p] = res.status
    fs.writeFileSync(path.join(outDir, fileFor(p)), await res.text())
  }
  fs.writeFileSync(path.join(outDir, '_index.json'), JSON.stringify(index, null, 2))
  console.log(`Saved ${paths.size} URLs from ${base} to ${outDir}`)
}

if (import.meta.url === `file://${process.argv[1]}`) main()
