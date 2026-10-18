import React from 'react'
import { getPage } from '@/lib/wp/api'
import { Rich } from '@/lib/wp/Rich'
import { parseBlocks, type Block } from '@/lib/wp/text'

const INLINE = { strong: 'text-[#102027] font-light', a: 'text-[#102027] hover:text-[#ad8b27] transition-colors' }

/** Groups blocks into sections, one per "## heading". */
function sectionsOf(blocks: Block[]) {
  const sections: Array<{ heading: string; blocks: Block[] }> = []
  for (const block of blocks) {
    if (block.type === 'heading') sections.push({ heading: block.text, blocks: [] })
    else if (sections.length) sections[sections.length - 1].blocks.push(block)
    else sections.push({ heading: '', blocks: [block] })
  }
  return sections
}

/** One block; every block after the first in a section is spaced with mt-3 (as before). */
function LegalBlock({ block, first }: { block: Block; first: boolean }) {
  switch (block.type) {
    case 'paragraph':
      return <p className={first ? undefined : 'mt-3'}><Rich html={block.html} classes={INLINE} /></p>
    case 'list':
      return (
        <ul className={first ? 'list-none space-y-2' : 'list-none space-y-2 mt-3'}>
          {block.items.map((item, i) => (
            <li key={i}><span className="text-[#ad8b27] mr-2">—</span><Rich html={item} classes={INLINE} /></li>
          ))}
        </ul>
      )
    case 'address':
      return <address className={first ? 'not-italic' : 'not-italic mt-3'}><Rich html={block.html} classes={INLINE} /></address>
    default:
      return null
  }
}

/** Privacy Policy / Terms (English only), from the CMS "blocks" body. */
export async function LegalPage({ slug }: { slug: 'privacy-policy' | 'terms' }) {
  const c = await getPage(slug)
  const sections = sectionsOf(parseBlocks(c.main.body.en))
  return (
    <main id="main-content" className="pt-40 pb-24 lg:pt-56 lg:pb-32 bg-white">
      <div className="container-luxury max-w-3xl">

        {/* LEGAL REVIEW NOTICE — remove before publishing */}
        {c.notice.title.en && (
          <div className="mb-10 p-6 border-2 border-[#ad8b27] bg-[#faf8f4]">
            <p className="text-xs uppercase tracking-widest text-[#ad8b27] font-medium mb-2">{c.notice.title.en}</p>
            <p className="text-sm text-[#6b6b6b] font-light"><Rich html={c.notice.body.en} /></p>
          </div>
        )}

        <h1 className="text-display-lg text-[#102027] mb-4">{c.main.title.en}</h1>
        <p className="text-sm text-[#6b6b6b] font-light mb-12">{c.main.updated.en}</p>

        <div className="prose prose-sm max-w-none text-[#6b6b6b] font-light leading-loose space-y-8">
          {sections.map((section, i) => (
            <section key={i}>
              {section.heading && <h2 className="text-lg font-light text-[#102027] mb-4"><Rich html={section.heading} /></h2>}
              {section.blocks.map((block, j) => (
                <LegalBlock key={j} block={block} first={j === 0} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
