import type { Field } from 'payload'

export const seoFields: Field[] = [
  {
    name: 'meta',
    type: 'group',
    label: 'SEO',
    fields: [
      {
        name: 'title',
        type: 'text',
        localized: true,
        admin: {
          description: 'Overrides the page title. Max 60 characters.',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        localized: true,
        admin: {
          description: 'Meta description. 150–160 characters recommended.',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: 'OpenGraph image. 1200×630px recommended.',
        },
      },
      {
        name: 'keywords',
        type: 'text',
        localized: true,
        admin: {
          description: 'Comma-separated keywords.',
        },
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Prevent search engines from indexing this page.',
        },
      },
    ],
  },
]
