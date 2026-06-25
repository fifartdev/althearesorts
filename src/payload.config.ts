import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Rooms } from './collections/Rooms'
import { Offers } from './collections/Offers'
import { Experiences } from './collections/Experiences'
import { Dining } from './collections/Dining'
import { Gallery } from './collections/Gallery'
import { Testimonials } from './collections/Testimonials'
import { Journal } from './collections/Journal'
import { FAQs } from './collections/FAQs'
import { Locations } from './collections/Locations'
import { Pages } from './collections/Pages'
import { FormSubmissions } from './collections/FormSubmissions'

import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { BookingSettings } from './globals/BookingSettings'
import { ContactInfo } from './globals/ContactInfo'
import { SEOSettings } from './globals/SEOSettings'
import { GeoSettings } from './globals/GeoSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Althea Resorts CMS',
      icons: [{ url: '/logos/althea_logo_white-f.png' }],
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Rooms,
    Offers,
    Experiences,
    Dining,
    Gallery,
    Testimonials,
    Journal,
    FAQs,
    Locations,
    Pages,
    FormSubmissions,
  ],
  globals: [
    SiteSettings,
    Header,
    Footer,
    BookingSettings,
    ContactInfo,
    SEOSettings,
    GeoSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
    seoPlugin({
      collections: ['rooms', 'offers', 'experiences', 'dining', 'journal', 'pages'],
      globals: ['site-settings', 'seo-settings'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        `${(doc as any).title ?? (doc as any).name ?? ''} | Althea Resorts`,
      generateDescription: ({ doc }) =>
        (doc as any).excerpt ?? (doc as any).shortDescription ?? (doc as any).tagline ?? '',
      generateURL: ({ doc, collectionSlug }) => {
        const base = 'https://althearesorts.com'
        const paths: Record<string, string> = {
          rooms: `/accommodation/${(doc as any).slug ?? ''}`,
          offers: '/offers',
          experiences: '/experiences',
          dining: '/gastronomy',
          journal: `/journal/${(doc as any).slug ?? ''}`,
          pages: `/${(doc as any).slug ?? ''}`,
        }
        return base + (paths[collectionSlug ?? ''] ?? '/')
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords',
          localized: true,
          admin: { description: 'Comma-separated keywords.' },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'No Index',
          defaultValue: false,
          admin: { description: 'Prevent search engines from indexing this page.' },
        },
      ],
    }),
  ],
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Greek', code: 'el' },
      { label: 'French', code: 'fr' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
})
