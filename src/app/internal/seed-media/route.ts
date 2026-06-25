import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 300

// All local image paths (relative to /public, no leading slash).
// Fetched via HTTP from the same deployment — Vercel functions can't read public/ via fs.
const LOCAL_IMAGES: string[] = [
  // Rooms
  'images/standard.jpg',
  'images/deluxe double.jpg',
  'images/del.double.jpg',
  'images/superior sea view.jpg',
  'images/Junior suite .jpg',
  'images/js living room.jpg',
  'images/Superior sv.jpg',
  'images/stand.double.jpg',
  'images/standard...jpg',
  'images/js living r.jpg',
  'images/js living r...jpg',
  'images/js..jpg',
  'images/deluxe double...jpg',
  'images/bath.jpg',
  // Dining
  'images/aither.jpg',
  'images/restaurant/althea-indoor-outdoor-9.jpg',
  'images/restaurant/althea-indoor-outdoor-10.jpg',
  'images/restaurant/althea-indoor-outdoor-11.jpg',
  'images/restaurant/althea-indoor-outdoor-12.jpg',
  'images/breakfast.jpg',
  'images/breakfast/althea-breakfast-1.jpg',
  'images/breakfast/althea-breakfast-2.jpg',
  'images/breakfast/althea-breakfast-3.jpg',
  'images/breakfast/althea-breakfast-4.jpg',
  'images/breakfast/althea-breakfast-5.jpg',
  'images/breakfast/althea-breakfast-6.jpg',
  'images/breakfast/althea-breakfast-7.jpg',
  'images/breakfast/althea-breakfast-8.jpg',
  'images/breakfast/althea-breakfast-9.jpg',
  'images/breakfast/althea-breakfast-10.jpg',
  'images/breakfast/althea-breakfast-11.jpg',
  'images/breakfast/althea-breakfast-12.jpg',
  'images/breakfast/althea-breakfast-13.jpg',
  'images/breakfast/althea-breakfast-14.jpg',
  'images/breakfast/althea-breakfast-15.jpg',
  'images/breakfast/althea-breakfast-16.jpg',
  'images/breakfast/althea-breakfast-17.jpg',
  'images/breakfast/althea-breakfast-18.jpg',
  'images/breakfast/althea-breakfast-19.jpg',
  'images/breakfast/althea-breakfast-20.jpg',
  'images/breakfast/althea-breakfast-21.jpg',
  'images/breakfast/althea-breakfast-22.jpg',
  'images/breakfast/althea-breakfast-23.jpg',
  // New images
  'images/new-images/althea-front.jpg',
  'images/new-images/New-Hero.jpg',
  'images/new-images/althea-side-images1.jpg',
  'images/new-images/althea-side-images2.jpg',
  'images/new-images/althea-side-images3.jpg',
  'images/new-images/althea-side-images4.jpg',
  'images/new-images/althea-deluxe-double1.jpg',
  'images/new-images/althea-deluxe-double2.jpg',
  'images/new-images/althea-deluxe-double3.jpg',
  'images/new-images/althea-deluxe-double4.jpg',
  'images/new-images/althea-deluxe-double5.jpg',
  'images/new-images/althea-deluxe-double6.jpg',
  'images/new-images/althea-deluxe-double7.jpg',
  'images/new-images/althea-deluxe-double8.jpg',
  'images/new-images/althea-deluxe-double9.jpg',
  'images/new-images/althea-deluxe-double10.jpg',
  'images/new-images/althea-deluxe-double11.jpg',
  'images/new-images/althea-deluxe-double12.jpg',
  'images/new-images/althea-deluxe-double13.jpg',
  'images/new-images/althea-deluxe-double14.jpg',
  'images/new-images/althea-deluxe-double15.jpg',
  'images/new-images/althea-deluxe-double16.jpg',
  'images/new-images/althea-rooms-bathroom1.jpg',
  'images/new-images/althea-rooms-bathroom2.jpg',
  'images/new-images/althea-rooms-bathroom3.jpg',
  'images/new-images/althea-rooms-bathroom4.jpg',
  'images/new-images/althea-rooms-bathroom5.jpg',
  // Spa
  'images/oceanisphoto.jpg',
  // Outdoor pool
  'images/outdoor-pool/althea-indoor-outdoor-13.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-14.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-15.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-16.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-17.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-18.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-19.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-20.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-21.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-22.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-23.jpg',
  'images/outdoor-pool/althea-indoor-outdoor-24.jpg',
  // Reception / interior
  'images/reception/althea-indoor-outdoor-1.jpg',
  'images/reception/althea-indoor-outdoor-2.jpg',
  'images/reception/althea-indoor-outdoor-3.jpg',
  'images/reception/althea-indoor-outdoor-4.jpg',
  'images/reception/althea-indoor-outdoor-5.jpg',
  'images/reception/althea-indoor-outdoor-6.jpg',
  'images/reception/althea-indoor-outdoor-7.jpg',
  'images/reception/althea-indoor-outdoor-8.jpg',
  // Misc
  'images/main-pool.jpg',
  'images/althea-contact.jpg',
  'images/activities pexel photo.jpg',
  'images/conference pexel photo.jpg',
  'images/dining pexel photo.jpg',
  'images/restaurant pexel photo.jpg',
]

// External images (Unsplash) — already a full URL
const EXTERNAL_IMAGES: { url: string; filename: string; alt: string }[] = [
  {
    url: 'https://images.unsplash.com/photo-1674654658721-ffc9c08ee1d0?auto=format&fit=crop&w=1200&q=85',
    filename: 'bar-cocktail.jpg',
    alt: 'bar cocktail',
  },
  {
    url: 'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=85',
    filename: 'pool-bar-poolside.jpg',
    alt: 'pool bar poolside',
  },
]

// Map English title → uploaded filename, for linking heroImage after upload
// Using title-based lookup so slug mismatches don't matter
const ROOM_HERO_MAP: Record<string, string> = {
  'Standard Double':                    'standard.jpg',
  'Deluxe Double M.V / P.V.':           'deluxe double.jpg',
  'Deluxe Double Private Pool':         'del.double.jpg',
  'Superior Sea View Room':             'superior sea view.jpg',
  'Junior Suite Private Pool':          'Junior suite .jpg',
  'Althea Loft Suite Outdoor Jacuzzi':  'js living room.jpg',
}

const DINING_HERO_MAP: Record<string, string> = {
  'AITHER':         'aither.jpg',
  'All Day Dining': 'althea-indoor-outdoor-12.jpg',
  'Breakfast':      'althea-breakfast-18.jpg',
  'Bar':            'bar-cocktail.jpg',
  'Pool Bar':       'pool-bar-poolside.jpg',
}

function altFromFilename(filename: string): string {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  // Determine base URL for fetching static assets
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://althearesorts.com'

  const report: {
    uploaded: string[]
    skipped: string[]
    errors: string[]
    linked: string[]
  } = { uploaded: [], skipped: [], errors: [], linked: [] }

  // ─── 1. Upload local images via HTTP fetch ────────────────────────────────

  for (const localPath of LOCAL_IMAGES) {
    const filename = path.basename(localPath)
    try {
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        report.skipped.push(filename)
        continue
      }

      const url = `${host}/${localPath}`
      const res = await fetch(url)
      if (!res.ok) {
        report.errors.push(`${filename}: HTTP ${res.status} from ${url}`)
        continue
      }
      const buffer = Buffer.from(await res.arrayBuffer())
      const ct = res.headers.get('content-type') || 'image/jpeg'
      const mimetype = ct.split(';')[0].trim()

      await payload.create({
        collection: 'media',
        data: { alt: altFromFilename(filename) },
        file: { data: buffer, mimetype, name: filename, size: buffer.length },
      })
      report.uploaded.push(filename)
    } catch (err: any) {
      report.errors.push(`${filename}: ${err?.message ?? String(err)}`)
    }
  }

  // ─── 2. Upload external Unsplash images ───────────────────────────────────

  for (const { url, filename, alt } of EXTERNAL_IMAGES) {
    try {
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        report.skipped.push(filename)
        continue
      }

      const res = await fetch(url)
      if (!res.ok) {
        report.errors.push(`${filename}: HTTP ${res.status}`)
        continue
      }
      const buffer = Buffer.from(await res.arrayBuffer())
      const mimetype = (res.headers.get('content-type') || 'image/jpeg').split(';')[0].trim()

      await payload.create({
        collection: 'media',
        data: { alt },
        file: { data: buffer, mimetype, name: filename, size: buffer.length },
      })
      report.uploaded.push(filename)
    } catch (err: any) {
      report.errors.push(`${filename}: ${err?.message ?? String(err)}`)
    }
  }

  // ─── 3. Link heroImage on rooms (matched by English title) ──────────────────

  for (const [title, filename] of Object.entries(ROOM_HERO_MAP)) {
    try {
      const mediaResult = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (!mediaResult.docs.length) {
        report.errors.push(`link room "${title}": no media for ${filename}`)
        continue
      }

      const roomResult = await payload.find({
        collection: 'rooms',
        where: { title: { equals: title } },
        limit: 1,
      })
      if (!roomResult.docs.length) {
        report.errors.push(`link room "${title}": room doc not found`)
        continue
      }

      await payload.update({
        collection: 'rooms',
        id: roomResult.docs[0].id,
        data: { heroImage: mediaResult.docs[0].id },
      })
      report.linked.push(`room "${title}" → ${filename}`)
    } catch (err: any) {
      report.errors.push(`link room "${title}": ${err?.message ?? String(err)}`)
    }
  }

  // ─── 4. Link heroImage on dining (matched by English name) ──────────────────

  for (const [name, filename] of Object.entries(DINING_HERO_MAP)) {
    try {
      const mediaResult = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (!mediaResult.docs.length) {
        report.errors.push(`link dining "${name}": no media for ${filename}`)
        continue
      }

      const diningResult = await payload.find({
        collection: 'dining',
        where: { name: { equals: name } },
        limit: 1,
      })
      if (!diningResult.docs.length) {
        report.errors.push(`link dining "${name}": doc not found`)
        continue
      }

      await payload.update({
        collection: 'dining',
        id: diningResult.docs[0].id,
        data: { heroImage: mediaResult.docs[0].id },
      })
      report.linked.push(`dining "${name}" → ${filename}`)
    } catch (err: any) {
      report.errors.push(`link dining "${name}": ${err?.message ?? String(err)}`)
    }
  }

  return NextResponse.json({
    message: 'Media seed complete',
    host,
    summary: {
      uploaded: report.uploaded.length,
      skipped: report.skipped.length,
      linked: report.linked.length,
      errors: report.errors.length,
    },
    detail: report,
  })
}
