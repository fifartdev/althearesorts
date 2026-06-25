import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

// Vercel max duration — set to 300s in vercel.json if needed
export const maxDuration = 300

// Map from CMS slug → local image path for hero images
const ROOM_HEROES: Record<string, string> = {
  'standard-double':            'images/standard.jpg',
  'deluxe-double-mv-pv':        'images/deluxe double.jpg',
  'deluxe-double-private-pool': 'images/del.double.jpg',
  'superior-sea-view':          'images/superior sea view.jpg',
  'junior-suite-private-pool':  'images/Junior suite .jpg',
  'althea-loft-suite':          'images/js living room.jpg',
}

const DINING_HEROES: Record<string, string | { url: string; filename: string }> = {
  'aither':         'images/aither.jpg',
  'all-day-dining': 'images/restaurant/althea-indoor-outdoor-12.jpg',
  'breakfast':      'images/breakfast/althea-breakfast-18.jpg',
  'bar':            { url: 'https://images.unsplash.com/photo-1674654658721-ffc9c08ee1d0?auto=format&fit=crop&w=1200&q=85', filename: 'bar-cocktail.jpg' },
  'pool-bar':       { url: 'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=85', filename: 'pool-bar-poolside.jpg' },
}

// Walk a directory recursively and return all file paths
function walkDir(dir: string, base: string, results: string[] = []): string[] {
  const entries = fs.readdirSync(dir)
  for (const entry of entries) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      walkDir(full, base, results)
    } else if (/\.(jpe?g|png|webp|gif)$/i.test(entry)) {
      results.push(path.relative(base, full))
    }
  }
  return results
}

function slugFromPath(p: string): string {
  return path.basename(p, path.extname(p))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function GET(request: NextRequest) {
  // Protect with PAYLOAD_SECRET
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const publicDir = path.join(process.cwd(), 'public')
  const imagesDir = path.join(publicDir, 'images')

  const report: { uploaded: string[]; skipped: string[]; errors: string[]; linked: string[] } = {
    uploaded: [],
    skipped: [],
    errors: [],
    linked: [],
  }

  // ─── 1. Upload all local images ───────────────────────────────────────────

  const localPaths = walkDir(imagesDir, publicDir)

  for (const relativePath of localPaths) {
    const filename = path.basename(relativePath)
    try {
      // Check duplicate
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        report.skipped.push(filename)
        continue
      }

      const fullPath = path.join(publicDir, relativePath)
      const data = fs.readFileSync(fullPath)
      const ext = path.extname(filename).toLowerCase()
      const mimetype = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg'
      const alt = slugFromPath(relativePath).replace(/-/g, ' ')

      await payload.create({
        collection: 'media',
        data: { alt },
        file: { data, mimetype, name: filename, size: data.length },
      })
      report.uploaded.push(filename)
    } catch (err: any) {
      report.errors.push(`${filename}: ${err?.message ?? err}`)
    }
  }

  // ─── 2. Upload external images (Unsplash bar / pool-bar) ─────────────────

  const externalEntries = Object.entries(DINING_HEROES).filter(
    ([, v]) => typeof v === 'object',
  ) as [string, { url: string; filename: string }][]

  for (const [, { url, filename }] of externalEntries) {
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
      if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())
      const mimetype = res.headers.get('content-type') || 'image/jpeg'
      const alt = slugFromPath(filename).replace(/-/g, ' ')

      await payload.create({
        collection: 'media',
        data: { alt },
        file: { data: buffer, mimetype, name: filename, size: buffer.length },
      })
      report.uploaded.push(filename)
    } catch (err: any) {
      report.errors.push(`${filename}: ${err?.message ?? err}`)
    }
  }

  // ─── 3. Link room heroImages ──────────────────────────────────────────────

  for (const [slug, localPath] of Object.entries(ROOM_HEROES)) {
    try {
      const filename = path.basename(localPath)
      const mediaResult = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (mediaResult.docs.length === 0) {
        report.errors.push(`link rooms/${slug}: media not found for ${filename}`)
        continue
      }
      const mediaId = mediaResult.docs[0].id

      const roomResult = await payload.find({
        collection: 'rooms',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      if (roomResult.docs.length === 0) {
        report.errors.push(`link rooms/${slug}: room doc not found`)
        continue
      }
      const roomId = roomResult.docs[0].id

      await payload.update({
        collection: 'rooms',
        id: roomId,
        data: { heroImage: mediaId },
      })
      report.linked.push(`rooms/${slug} → ${filename}`)
    } catch (err: any) {
      report.errors.push(`link rooms/${slug}: ${err?.message ?? err}`)
    }
  }

  // ─── 4. Link dining heroImages ────────────────────────────────────────────

  for (const [slug, hero] of Object.entries(DINING_HEROES)) {
    try {
      const filename = typeof hero === 'string' ? path.basename(hero) : hero.filename
      const mediaResult = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (mediaResult.docs.length === 0) {
        report.errors.push(`link dining/${slug}: media not found for ${filename}`)
        continue
      }
      const mediaId = mediaResult.docs[0].id

      const diningResult = await payload.find({
        collection: 'dining',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      if (diningResult.docs.length === 0) {
        report.errors.push(`link dining/${slug}: dining doc not found`)
        continue
      }
      const diningId = diningResult.docs[0].id

      await payload.update({
        collection: 'dining',
        id: diningId,
        data: { heroImage: mediaId },
      })
      report.linked.push(`dining/${slug} → ${filename}`)
    } catch (err: any) {
      report.errors.push(`link dining/${slug}: ${err?.message ?? err}`)
    }
  }

  return NextResponse.json({
    message: 'Media seed complete',
    summary: {
      uploaded: report.uploaded.length,
      skipped: report.skipped.length,
      linked: report.linked.length,
      errors: report.errors.length,
    },
    detail: report,
  })
}
