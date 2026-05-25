import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { isAdmin, isSuperAdmin } from '../access'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'distance', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isSuperAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    ...slugField('name'),
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Beaches', value: 'beaches' },
        { label: 'Archaeological Sites', value: 'archaeological' },
        { label: 'Towns & Villages', value: 'towns' },
        { label: 'Activities', value: 'activities' },
        { label: 'Dining Out', value: 'dining' },
        { label: 'Day Trips', value: 'day-trips' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'distance',
      type: 'text',
      admin: { description: 'e.g. "5 minutes by shuttle" or "45 minutes by car"' },
    },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
