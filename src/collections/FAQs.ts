import type { CollectionConfig } from 'payload'
import { isAdmin, isSuperAdmin } from '../access'
import { makeRevalidateHook } from '../hooks/revalidate'

const { afterChange: revalidateAfterChange, afterDelete: revalidateAfterDelete } = makeRevalidateHook('faqs')

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
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
    { name: 'answer', type: 'textarea', required: true, localized: true },
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
