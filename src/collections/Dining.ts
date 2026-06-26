import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'
import { isAdmin, isSuperAdmin } from '../access'
import { makeRevalidateHook } from '../hooks/revalidate'

const { afterChange: revalidateAfterChange, afterDelete: revalidateAfterDelete } = makeRevalidateHook('dining')

export const Dining: CollectionConfig = {
  slug: 'dining',
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'venue', '_status', 'updatedAt'],
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
    { name: 'name', type: 'text', required: true, localized: true },
    ...slugField('name'),
    {
      name: 'venue',
      type: 'select',
      options: [
        { label: 'AITHER (Rooftop Restaurant)', value: 'aither' },
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'All-Day Dining', value: 'all-day' },
        { label: 'Bar', value: 'bar' },
        { label: 'Pool Bar', value: 'pool-bar' },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text', admin: { description: 'Fallback image URL — used when heroImage is not uploaded yet' } },
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
      name: 'openingHours',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Open from late afternoon into the night"' },
    },
    { name: 'reservationUrl', type: 'text' },
  ],
}
