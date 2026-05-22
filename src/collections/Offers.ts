import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'validUntil', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: { read: () => true },
  versions: {
    drafts: { autosave: true },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    ...slugField('title'),
    {
      name: 'badge',
      type: 'text',
      admin: { description: 'Short badge text, e.g. "Opening Offer" or "10% Off"' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'discountPercent',
      type: 'number',
      admin: { description: 'Discount percentage (e.g. 10)' },
    },
    {
      name: 'validFrom',
      type: 'date',
    },
    {
      name: 'validUntil',
      type: 'date',
    },
    {
      name: 'conditions',
      type: 'array',
      fields: [{ name: 'condition', type: 'text', required: true }],
    },
    {
      name: 'howToBook',
      type: 'richText',
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
    {
      type: 'tabs',
      tabs: [{ label: 'SEO', fields: seoFields }],
    },
  ],
}
