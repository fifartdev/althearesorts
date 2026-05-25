import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Althea Resorts', required: true },
    { name: 'tagline', type: 'text', localized: true, defaultValue: 'Redefining Hospitality With Timeless Elegance' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'logoLight',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Light version of the logo (for dark backgrounds)' },
    },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    { name: 'maintenanceMode', type: 'checkbox', defaultValue: false },
    {
      name: 'announcementBanner',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'message', type: 'text', localized: true },
        { name: 'ctaLabel', type: 'text', localized: true },
        { name: 'ctaUrl', type: 'text' },
      ],
    },
  ],
}
