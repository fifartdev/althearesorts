import type { GlobalConfig } from 'payload'

export const SEOSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: 'SEO Settings',
  admin: { group: 'Settings' },
  fields: [
    { name: 'defaultTitle', type: 'text', defaultValue: 'Althea Resorts — Luxury Hotel in Corinthia, Greece' },
    { name: 'titleSuffix', type: 'text', defaultValue: '| Althea Resorts' },
    { name: 'defaultDescription', type: 'textarea', defaultValue: 'A luxury boutique resort on the hills of Ano Loutro, Corinthia. 41 rooms and suites with views of the Corinthian Gulf. 60 minutes from Athens.' },
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
