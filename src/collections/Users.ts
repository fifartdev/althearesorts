import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf, isSuperAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'System',
    defaultColumns: ['email', 'firstName', 'lastName', 'role', 'updatedAt'],
    description: 'Manage CMS users and their access roles.',
  },
  auth: true,
  access: {
    create: isSuperAdmin,
    read: isAdmin,
    update: isAdminOrSelf,
    delete: isSuperAdmin,
    admin: ({ req }) => {
      const role = (req.user as any)?.role
      return role === 'admin' || role === 'superadmin'
    },
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Super Admin', value: 'superadmin' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        update: ({ req }) => (req.user as any)?.role === 'superadmin',
      },
      admin: {
        position: 'sidebar',
        description: 'Super Admin has full system access. Admin manages content and settings.',
      },
    },
  ],
}
