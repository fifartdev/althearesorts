import crypto from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * On-demand revalidation, called by the Althea CMS WordPress plugin when content changes.
 *
 *   POST /api/revalidate
 *   x-althea-secret: <REVALIDATE_SECRET>
 *   { "tags": ["wp:page:home", "wp:althea_room"] }
 *
 * Tags are expired immediately ({ expire: 0 }), so the next request renders fresh content — editors
 * see their change right away rather than after one stale view.
 */

const TAG = /^wp(:[a-z0-9_-]+){0,2}$/

function authorized(request: NextRequest): boolean {
  const secret = process.env.REVALIDATE_SECRET
  const given = request.headers.get('x-althea-secret')
  if (!secret || !given) return false
  const a = Buffer.from(given)
  const b = Buffer.from(secret)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ revalidated: false, error: 'Unauthorized' }, { status: 401 })
  }

  let tags: unknown
  try {
    tags = ((await request.json()) as { tags?: unknown }).tags
  } catch {
    return NextResponse.json({ revalidated: false, error: 'Invalid JSON' }, { status: 400 })
  }
  if (!Array.isArray(tags) || tags.length === 0 || tags.length > 50 || !tags.every((t) => typeof t === 'string' && TAG.test(t))) {
    return NextResponse.json({ revalidated: false, error: 'Expected { tags: ["wp", "wp:<type>", "wp:page:<slug>"] }' }, { status: 400 })
  }

  for (const tag of new Set(tags as string[])) revalidateTag(tag, { expire: 0 })
  return NextResponse.json({ revalidated: true, tags, now: Date.now() })
}
