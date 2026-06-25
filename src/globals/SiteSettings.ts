import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'Top-level site configuration — branding, identity, social links, and site-wide toggles.',
  },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─── BRANDING ────────────────────────────────────────────────────
        {
          label: 'Branding',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'Althea Resorts',
              required: true,
            },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              defaultValue: 'Redefining Hospitality With Timeless Elegance',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Primary logo (dark/standard version).' },
            },
            {
              name: 'logoLight',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'White / reversed logo for dark backgrounds.' },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Favicon (32×32 px ICO or PNG).' },
            },
            {
              name: 'appleTouchIcon',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Apple touch icon (180×180 px PNG). Shown when users add site to home screen.' },
            },
            {
              name: 'defaultOGImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Default social share image (1200×630 px). Used when pages have no specific image.' },
            },
          ],
        },

        // ─── SOCIAL LINKS ────────────────────────────────────────────────
        {
          label: 'Social Links',
          description: 'Social media profiles shown in the header, footer, and used in schema.org sameAs.',
          fields: [
            {
              name: 'instagram',
              type: 'text',
              defaultValue: 'https://www.instagram.com/althearesorts',
            },
            {
              name: 'facebook',
              type: 'text',
              defaultValue: 'https://www.facebook.com/profile.php?id=61589365637032',
            },
            {
              name: 'linkedin',
              type: 'text',
              defaultValue: 'https://www.linkedin.com/company/althearesorts',
            },
            {
              name: 'twitter',
              type: 'text',
              admin: { description: 'X (Twitter) profile URL (optional).' },
            },
            {
              name: 'youtube',
              type: 'text',
              admin: { description: 'YouTube channel URL (optional).' },
            },
            {
              name: 'tripadvisor',
              type: 'text',
              admin: { description: 'TripAdvisor listing URL.' },
            },
          ],
        },

        // ─── SITE BEHAVIOUR ──────────────────────────────────────────────
        {
          label: 'Site Behaviour',
          fields: [
            {
              name: 'maintenanceMode',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Put the site in maintenance mode. All visitors see a maintenance page.' },
            },
            {
              name: 'maintenanceMessage',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Message shown during maintenance mode.',
                condition: (data) => !!data?.maintenanceMode,
              },
            },
            {
              name: 'cookieConsentEnabled',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Show the GDPR cookie consent banner.' },
            },
            {
              name: 'cookieConsentMessage',
              type: 'textarea',
              localized: true,
              defaultValue: 'We use cookies to improve your experience on our website.',
            },
          ],
        },

        // ─── ANNOUNCEMENT BANNER ─────────────────────────────────────────
        {
          label: 'Announcement Banner',
          description: 'An optional sitewide announcement bar shown above the header.',
          fields: [
            {
              name: 'announcementBannerEnabled',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'announcementMessage',
              type: 'text',
              localized: true,
              admin: {
                description: 'Short message. Keep under 120 characters.',
                condition: (data) => !!data?.announcementBannerEnabled,
              },
            },
            {
              name: 'announcementCtaLabel',
              type: 'text',
              localized: true,
              admin: {
                condition: (data) => !!data?.announcementBannerEnabled,
              },
            },
            {
              name: 'announcementCtaUrl',
              type: 'text',
              admin: {
                condition: (data) => !!data?.announcementBannerEnabled,
              },
            },
            {
              name: 'announcementStyle',
              type: 'select',
              defaultValue: 'gold',
              options: [
                { label: 'Gold', value: 'gold' },
                { label: 'Dark', value: 'dark' },
                { label: 'Info', value: 'info' },
              ],
              admin: {
                condition: (data) => !!data?.announcementBannerEnabled,
              },
            },
          ],
        },
      ],
    },
  ],
}
