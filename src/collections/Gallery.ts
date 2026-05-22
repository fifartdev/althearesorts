import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['caption', 'category', 'order', 'updatedAt'],
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Rooms & Suites', value: 'rooms' },
        { label: 'Dining', value: 'dining' },
        { label: 'Spa & Wellness', value: 'spa' },
        { label: 'Exterior & Views', value: 'exterior' },
        { label: 'Pool & Beach', value: 'pool' },
        { label: 'Events', value: 'events' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show in homepage gallery preview' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Sort order' },
    },
  ],
}
