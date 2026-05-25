import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const SEOSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: 'SEO Settings',
  admin: { group: 'Settings' },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: 'defaultTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Althea Resorts — Luxury Hotel in Corinthia, Greece',
    },
    {
      name: 'titleSuffix',
      type: 'text',
      localized: true,
      defaultValue: '| Althea Resorts',
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      localized: true,
      defaultValue: 'A luxury boutique resort on the hills of Ano Loutro, Corinthia. 41 rooms and suites with views of the Corinthian Gulf. 60 minutes from Athens.',
    },
    { name: 'defaultOGImage', type: 'upload', relationTo: 'media' },
    { name: 'googleVerification', type: 'text' },
    { name: 'bingVerification', type: 'text' },
    { name: 'googleAnalyticsId', type: 'text' },
    { name: 'googleTagManagerId', type: 'text' },
    {
      name: 'robotsTxt',
      type: 'textarea',
      defaultValue: 'User-agent: *\nAllow: /',
    },
  ],
}
