import type { Field } from 'payload'

export const slugField = (fieldToUse: string = 'title'): Field[] => [
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'URL-friendly identifier. Auto-generated from title if left blank.',
    },
    hooks: {
      beforeValidate: [
        ({ data, originalDoc }) => {
          const source = data?.[fieldToUse] || originalDoc?.[fieldToUse]
          if (data?.slug) {
            return data.slug
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '')
          }
          if (source) {
            return source
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '')
          }
        },
      ],
    },
  },
]
