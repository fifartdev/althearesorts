import { describe, expect, it } from 'vitest'
import {
  blocksToSections,
  parseBlocks,
  sectionsToBlocks,
  serializeBlocks,
  splitLines,
  splitLinks,
  splitParagraphs,
} from '@/lib/wp/text'
import content from '@/lib/wp/fallback/content.json'

describe('wp text formats', () => {
  it('splits paragraphs on blank lines, tolerating CRLF and extra blank lines', () => {
    expect(splitParagraphs('One\r\n\r\n\r\nTwo <em>x</em>\n  \nThree')).toEqual(['One', 'Two <em>x</em>', 'Three'])
    expect(splitParagraphs('')).toEqual([])
  })

  it('splits lines and links', () => {
    expect(splitLines(' a \n\n b ')).toEqual(['a', 'b'])
    expect(splitLinks('About | /about\nBlog | /journal')).toEqual([
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/journal' },
    ])
  })

  it('parses every block type', () => {
    const text = [
      'Intro paragraph',
      '## Heading\nText right after the heading',
      '- one\n- two',
      'Q: Why?\nA: Because.\nQ: When?\nA: Now.',
      '[cta] Book now | https://example.com/?a=1&b=2',
      '---',
      'Untitled section',
      '[address]\n<strong>Name</strong><br>Email: <a href="mailto:a@b.c">a@b.c</a>',
    ].join('\n\n')
    expect(parseBlocks(text)).toEqual([
      { type: 'paragraph', html: 'Intro paragraph' },
      { type: 'heading', text: 'Heading' },
      { type: 'paragraph', html: 'Text right after the heading' },
      { type: 'list', items: ['one', 'two'] },
      { type: 'faq', items: [{ q: 'Why?', a: 'Because.' }, { q: 'When?', a: 'Now.' }] },
      { type: 'cta', label: 'Book now', href: 'https://example.com/?a=1&b=2' },
      { type: 'break' },
      { type: 'paragraph', html: 'Untitled section' },
      { type: 'address', html: '<strong>Name</strong><br>Email: <a href="mailto:a@b.c">a@b.c</a>' },
    ])
    expect(parseBlocks(serializeBlocks(parseBlocks(text)))).toEqual(parseBlocks(text))
  })

  it('round-trips every stored blog post body (EN and EL) through blocks and sections', () => {
    const bodies = content.items.althea_post.map((p) => p.fields.body).filter(Boolean)
    expect(bodies.length).toBeGreaterThan(0)
    for (const body of bodies) {
      expect(serializeBlocks(parseBlocks(body))).toBe(body)
      expect(serializeBlocks(sectionsToBlocks(blocksToSections(parseBlocks(body))))).toBe(body)
    }
  })

  it('round-trips the legal page bodies, including address blocks', () => {
    for (const body of [content.pages['privacy-policy'].sections.main.body.en, content.pages.terms.sections.main.body.en]) {
      expect(serializeBlocks(parseBlocks(body))).toBe(body)
    }
  })
})
