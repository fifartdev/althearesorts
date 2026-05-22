import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & Navigation',
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Internal Page', value: 'internal' },
            { label: 'External URL', value: 'external' },
          ],
          defaultValue: 'internal',
        },
        {
          name: 'url',
          type: 'text',
          admin: { condition: (_, siblingData) => siblingData?.type === 'external' },
        },
        {
          name: 'internalUrl',
          type: 'text',
          admin: {
            description: 'Internal URL path (e.g. /accommodation)',
            condition: (_, siblingData) => siblingData?.type === 'internal',
          },
        },
        {
          name: 'dropdown',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Book Now',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      defaultValue: 'https://althearesort.reserve-online.net',
    },
  ],
}
