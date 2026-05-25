import type { CollectionConfig } from 'payload'
import { isAdmin, isSuperAdmin } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'System',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  upload: true,
}
