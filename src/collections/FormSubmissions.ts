import type { CollectionConfig } from 'payload'
import { isAdmin, isSuperAdmin } from '../access'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'name',
    group: 'Enquiries',
    defaultColumns: ['name', 'email', 'formType', 'status', 'createdAt'],
    description: 'All enquiries and contact form submissions from the website.',
  },
  access: {
    create: () => true,    // Public: anyone can submit a form
    read: isAdmin,
    update: isAdmin,       // Admins can mark status / add notes
    delete: isSuperAdmin,
  },
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Full name of the enquirer' },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'formType',
      type: 'select',
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Reservation Enquiry', value: 'reservation' },
        { label: 'Wedding', value: 'wedding' },
        { label: 'Corporate / Events', value: 'corporate' },
        { label: 'Restaurant Reservation', value: 'restaurant' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: 'contact',
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: '🔵 New', value: 'new' },
        { label: '👁 Read', value: 'read' },
        { label: '✅ Replied', value: 'replied' },
        { label: '🗄 Archived', value: 'archived' },
      ],
      defaultValue: 'new',
      admin: { position: 'sidebar' },
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes — not visible to the enquirer.',
      },
    },
  ],
}
