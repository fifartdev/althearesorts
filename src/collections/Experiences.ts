import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'
import { isAdmin, isSuperAdmin } from '../access'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
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
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'shortDescription', type: 'textarea', required: true, localized: true },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true, localized: true },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Book Now', localized: true },
    {
      name: 'ctaUrl',
      type: 'text',
      defaultValue: 'https://althearesort.reserve-online.net',
    },
  ],
}
