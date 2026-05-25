import type { CollectionConfig } from 'payload'
import { isAdmin, isSuperAdmin } from '../access'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isSuperAdmin,
  },
  fields: [
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'richText', required: true, localized: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Rooms & Rates', value: 'rooms' },
        { label: 'Check-in & Check-out', value: 'checkin' },
        { label: 'Dining', value: 'dining' },
        { label: 'Spa & Wellness', value: 'spa' },
        { label: 'Pets & Children', value: 'family' },
        { label: 'Getting Here', value: 'location' },
        { label: 'Reservations', value: 'reservations' },
        { label: 'General', value: 'general' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
