import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Settings' },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'heading', type: 'text', localized: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'tripadvisor', type: 'text' },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
      defaultValue: '© 2025 Althea Resorts. All rights reserved.',
    },
  ],
}
