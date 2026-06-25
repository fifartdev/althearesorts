import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'
import { isAdmin, isSuperAdmin } from '../access'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'validUntil', '_status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isSuperAdmin,
  },
  versions: {
    drafts: { autosave: true },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    ...slugField('title'),
    {
      name: 'badge',
      type: 'text',
      localized: true,
      admin: { description: 'Short badge text, e.g. "Opening Offer" or "10% Off"' },
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'discountPercent',
      type: 'number',
      admin: { description: 'Discount percentage (e.g. 10)' },
    },
    { name: 'validFrom', type: 'date' },
    { name: 'validUntil', type: 'date' },
    {
      name: 'conditions',
      type: 'array',
      fields: [{ name: 'condition', type: 'text', required: true, localized: true }],
    },
    { name: 'howToBook', type: 'richText', localized: true },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Book Now', localized: true },
    {
      name: 'ctaUrl',
      type: 'text',
      defaultValue: 'https://althearesort.reserve-online.net',
    },
  ],
}
