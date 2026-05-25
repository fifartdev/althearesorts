import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'
import { isAdmin, isSuperAdmin } from '../access'

export const Journal: CollectionConfig = {
  slug: 'journal',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status', 'updatedAt'],
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
        { label: 'Local Guides', value: 'local-guides' },
        { label: 'Hotel Stories', value: 'hotel-stories' },
        { label: 'Gastronomy', value: 'gastronomy' },
        { label: 'Wellness', value: 'wellness' },
        { label: 'Events', value: 'events' },
        { label: 'Corinthia', value: 'corinthia' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Althea Resorts',
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'excerpt', type: 'textarea', required: true, localized: true },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show in homepage journal preview' },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: { description: 'Estimated reading time in minutes' },
    },
    {
      type: 'tabs',
      tabs: [{ label: 'SEO', fields: seoFields }],
    },
  ],
}
