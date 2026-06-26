import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const VALID_TAGS = [
  'rooms', 'dining', 'experiences', 'faqs', 'offers',
  'journal', 'gallery', 'locations', 'testimonials',
  'contact-info', 'booking-settings', 'site-settings',
]

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const tag: string | undefined = body?.tag ?? body?.collection

  if (!tag || !VALID_TAGS.includes(tag)) {
    return NextResponse.json({ error: `Unknown tag: ${tag}` }, { status: 400 })
  }

  revalidateTag(tag, {})
  return NextResponse.json({ revalidated: true, tag })
}
