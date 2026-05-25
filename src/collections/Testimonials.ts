import type { CollectionConfig } from 'payload'
import { isAdmin, isSuperAdmin } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'rating', 'featured', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isSuperAdmin,
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'authorName', type: 'text', required: true },
    {
      name: 'authorOrigin',
      type: 'text',
      admin: { description: 'e.g. "Athens, Greece" or "Paris, France"' },
    },
    {
      name: 'stayDate',
      type: 'text',
      admin: { description: 'e.g. "May 2025"' },
    },
    {
      name: 'roomStayed',
      type: 'text',
      admin: { description: 'Room or suite category where the guest stayed' },
    },
    {
      name: 'rating',
      type: 'select',
      options: ['1', '2', '3', '4', '5'],
      defaultValue: '5',
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Google', value: 'google' },
        { label: 'Booking.com', value: 'booking' },
        { label: 'TripAdvisor', value: 'tripadvisor' },
        { label: 'Direct', value: 'direct' },
      ],
    },
  ],
}
