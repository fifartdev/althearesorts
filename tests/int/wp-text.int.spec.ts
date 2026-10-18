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
import { JOURNAL_POSTS } from '@/app/(frontend)/journal/journalData'
import { JOURNAL_POSTS_EL } from '@/app/(frontend-el)/el/journal/journalData'

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

  it('round-trips every existing blog post body (EN and EL)', () => {
    for (const post of [...JOURNAL_POSTS, ...JOURNAL_POSTS_EL]) {
      if (!post.sections) continue
      const text = serializeBlocks(sectionsToBlocks(post.sections))
      const back = blocksToSections(parseBlocks(text))
      expect(back, post.slug).toEqual(
        post.sections.map((s) => ({
          ...(s.heading ? { heading: s.heading } : {}),
          paragraphs: s.paragraphs,
          ...('bullets' in s && s.bullets?.length ? { bullets: s.bullets } : {}),
          ...('faqs' in s && s.faqs?.length ? { faqs: s.faqs } : {}),
          ...('cta' in s && s.cta ? { cta: s.cta } : {}),
        })),
      )
    }
  })
})
