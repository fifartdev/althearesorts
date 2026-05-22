import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Dining: CollectionConfig = {
  slug: 'dining',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'venue', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: { read: () => true },
  versions: {
    drafts: { autosave: true },
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    ...slugField('name'),
    {
      name: 'venue',
      type: 'select',
      options: [
        { label: 'Narrativa (Rooftop Restaurant)', value: 'narrativa' },
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'All-Day Dining', value: 'all-day' },
        { label: 'Bar', value: 'bar' },
        { label: 'Pool Bar', value: 'pool-bar' },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    { name: 'tagline', type: 'text' },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'description', type: 'richText' },
    {
      name: 'openingHours',
      type: 'text',
      admin: { description: 'e.g. "Open from late afternoon into the night"' },
    },
    {
      name: 'reservationUrl',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [{ label: 'SEO', fields: seoFields }],
    },
  ],
}
