/**
 * Text formats used by WordPress fields (see wordpress/mu-plugins/althea-cms/schema.json).
 *
 *   paragraphs  paragraphs separated by an empty line (inline HTML allowed)
 *   lines       one item per line
 *   blocks      article bodies: "## Heading", paragraphs, "- item" lists,
 *               "Q: …"/"A: …" pairs, "[cta] Label | /href", "---" (new section without a heading),
 *               "[address]" on its own line followed by an address block (inline HTML, <br> for lines)
 *
 * Shared by the Next.js data layer (parsing) and scripts/migrate-to-wp.ts (serializing).
 */

export type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; html: string }
  | { type: 'list'; items: string[] }
  | { type: 'faq'; items: Array<{ q: string; a: string }> }
  | { type: 'cta'; label: string; href: string }
  | { type: 'break' }
  | { type: 'address'; html: string }

/** The article section shape used by the blog templates. */
export type ArticleSection = {
  heading?: string
  paragraphs: string[]
  bullets?: string[]
  faqs?: Array<{ q: string; a: string }>
  cta?: { label: string; href: string }
}

const normalize = (value: string) => value.replace(/\r\n?/g, '\n')

export function splitParagraphs(value: string | null | undefined): string[] {
  if (!value) return []
  return normalize(value)
    .split(/\n[ \t]*\n\s*/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function joinParagraphs(paragraphs: string[]): string {
  return paragraphs.map((p) => p.trim()).join('\n\n')
}

export function splitLines(value: string | null | undefined): string[] {
  if (!value) return []
  return normalize(value)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

export function joinLines(lines: string[]): string {
  return lines.map((l) => l.trim()).join('\n')
}

/** "Label | /href" lines, e.g. navigation menus. */
export function splitLinks(value: string | null | undefined): Array<{ label: string; href: string }> {
  return splitLines(value).map((line) => {
    const i = line.lastIndexOf('|')
    return i === -1 ? { label: line, href: '' } : { label: line.slice(0, i).trim(), href: line.slice(i + 1).trim() }
  })
}

const CTA = /^\[cta\]\s*(.*?)\s*\|\s*(\S+)\s*$/i
const QA = /^(Q|A):\s?(.*)$/

export function parseBlocks(value: string | null | undefined): Block[] {
  const blocks: Block[] = []
  for (let chunk of splitParagraphs(value)) {
    // A heading may be followed directly by text without an empty line.
    while (chunk.startsWith('## ')) {
      const nl = chunk.indexOf('\n')
      const heading = nl === -1 ? chunk : chunk.slice(0, nl)
      blocks.push({ type: 'heading', text: heading.slice(3).trim() })
      chunk = nl === -1 ? '' : chunk.slice(nl + 1).trim()
    }
    if (!chunk) continue

    if (chunk === '---') {
      blocks.push({ type: 'break' })
      continue
    }
    if (chunk.startsWith('[address]')) {
      blocks.push({ type: 'address', html: chunk.slice('[address]'.length).trim() })
      continue
    }
    const lines = chunk.split('\n').map((l) => l.trim())
    const cta = lines.length === 1 ? CTA.exec(lines[0]) : null
    if (cta) {
      blocks.push({ type: 'cta', label: cta[1], href: cta[2] })
    } else if (lines.every((l) => l.startsWith('- '))) {
      blocks.push({ type: 'list', items: lines.map((l) => l.slice(2).trim()) })
    } else if (lines.every((l) => QA.test(l)) && lines[0].startsWith('Q:')) {
      const items: Array<{ q: string; a: string }> = []
      for (const line of lines) {
        const [, kind, text] = QA.exec(line)!
        if (kind === 'Q') items.push({ q: text.trim(), a: '' })
        else if (items.length) items[items.length - 1].a = items[items.length - 1].a ? `${items[items.length - 1].a} ${text.trim()}` : text.trim()
      }
      blocks.push({ type: 'faq', items })
    } else {
      blocks.push({ type: 'paragraph', html: chunk })
    }
  }
  return blocks
}

export function serializeBlocks(blocks: Block[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return `## ${block.text}`
        case 'paragraph':
          return block.html.trim()
        case 'list':
          return block.items.map((item) => `- ${item}`).join('\n')
        case 'faq':
          return block.items.map(({ q, a }) => `Q: ${q}\nA: ${a}`).join('\n')
        case 'cta':
          return `[cta] ${block.label} | ${block.href}`
        case 'break':
          return '---'
        case 'address':
          return `[address]\n${block.html.trim()}`
      }
    })
    .join('\n\n')
}

/** Article sections → blocks, in the order the article template renders them. */
export function sectionsToBlocks(sections: ArticleSection[]): Block[] {
  const blocks: Block[] = []
  sections.forEach((section, i) => {
    if (section.heading) blocks.push({ type: 'heading', text: section.heading })
    else if (i > 0) blocks.push({ type: 'break' })
    for (const html of section.paragraphs) blocks.push({ type: 'paragraph', html })
    if (section.bullets?.length) blocks.push({ type: 'list', items: section.bullets })
    if (section.faqs?.length) blocks.push({ type: 'faq', items: section.faqs })
    if (section.cta) blocks.push({ type: 'cta', ...section.cta })
  })
  return blocks
}

/** Blocks → article sections: each heading or "---" starts a new section. */
export function blocksToSections(blocks: Block[]): ArticleSection[] {
  const sections: ArticleSection[] = []
  let current: ArticleSection | null = null
  const ensure = () => {
    if (!current) {
      current = { paragraphs: [] }
      sections.push(current)
    }
    return current
  }
  for (const block of blocks) {
    if (block.type === 'heading' || block.type === 'break') {
      current = block.type === 'heading' ? { heading: block.text, paragraphs: [] } : { paragraphs: [] }
      sections.push(current)
      continue
    }
    const section = ensure()
    if (block.type === 'paragraph') section.paragraphs.push(block.html)
    else if (block.type === 'list') section.bullets = [...(section.bullets ?? []), ...block.items]
    else if (block.type === 'faq') section.faqs = [...(section.faqs ?? []), ...block.items]
    else section.cta = { label: block.label, href: block.href }
  }
  return sections
}
