import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { BookingSettings } from './globals/BookingSettings'
import { ContactInfo } from './globals/ContactInfo'
import { SEOSettings } from './globals/SEOSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Althea Resorts CMS',
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
  ],
  globals: [
    SiteSettings,
    Header,
    Footer,
    BookingSettings,
    ContactInfo,
    SEOSettings,
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
  plugins: [],
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
