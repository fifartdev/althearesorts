import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
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
      name: 'category',
      type: 'select',
      options: [
        { label: 'Activities', value: 'activities' },
        { label: 'Spa & Wellness', value: 'spa' },
        { label: 'Swimming Pool', value: 'pool' },
        { label: 'Events & Weddings', value: 'events' },
        { label: 'Corporate', value: 'corporate' },
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
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
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
    {
      type: 'tabs',
      tabs: [{ label: 'SEO', fields: seoFields }],
    },
  ],
}
