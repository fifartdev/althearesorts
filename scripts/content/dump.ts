// Prints the raw material of every <section> in the given page files (for writing build-content.ts).
import { Source } from './jsx'
import * as C from '../../src/lib/constants'

const resolve: Record<string, unknown> = { PHONE: C.PHONE, EMAIL: C.EMAIL, INFO_EMAIL: C.INFO_EMAIL, ADDRESS: C.ADDRESS, BOOKING_URL: C.BOOKING_URL, SITE_URL: C.SITE_URL }
const safe = (f: () => unknown) => { try { return f() } catch (e) { return `ERROR ${(e as Error).message}` } }
for (const file of process.argv.slice(2)) {
  const src = new Source(file, { ...C })
  console.log(`\n######## ${file}`)
  src.sections().forEach((s, i) => {
    console.log(`--- section ${i}`)
    const out: Record<string, unknown> = {
      labels: safe(() => s.labels), headings: safe(() => s.headings(resolve)), h3: safe(() => s.h3(resolve)),
      ps: safe(() => s.ps(resolve)), pcls: safe(() => s.pClasses.map((c) => c.replace(/\s+/g, ' ').slice(0, 60))), images: safe(() => s.images), arrays: safe(() => s.arrays),
      links: safe(() => s.links(resolve)), spans: safe(() => s.spans(resolve)), divTexts: safe(() => s.divTexts(resolve)),
    }
    for (const [k, v] of Object.entries(out)) if (!(Array.isArray(v) && v.length === 0)) console.log(`${k}:`, JSON.stringify(v, null, 0))
  })
}
