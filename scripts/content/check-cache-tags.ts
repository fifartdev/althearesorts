/**
 * After `npm run build`: every prerendered page must carry the WordPress cache tags ("wp", …),
 * otherwise saving content in WordPress cannot refresh it. Exits 1 and lists the pages that don't.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.join(process.cwd(), '.next/server/app')
const NO_CONTENT = new Set(['/_not-found', '/_global-error', '/icon.png', '/apple-icon.png'])

const metas: string[] = []
const walk = (dir: string) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.meta')) metas.push(p)
  }
}
walk(ROOT)

const missing = metas
  .map((f) => ({ page: f.slice(ROOT.length).replace(/\.meta$/, ''), tags: String(JSON.parse(fs.readFileSync(f, 'utf8')).headers?.['x-next-cache-tags'] ?? '').split(',') }))
  .filter(({ page, tags }) => !NO_CONTENT.has(page) && !tags.includes('wp'))

if (missing.length) {
  console.error(`${missing.length} prerendered page(s) without WordPress cache tags:\n${missing.map((m) => `  ${m.page}`).join('\n')}`)
  process.exit(1)
}
console.log(`All ${metas.length - NO_CONTENT.size} prerendered pages carry WordPress cache tags.`)
