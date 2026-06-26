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

        // ─── HOMEPAGE HERO ───────────────────────────────────────────────
        {
          label: 'Homepage Hero',
          description: 'Content for the full-screen homepage hero section.',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Full-screen hero background image. Recommended 2400×1600px.' },
            },
            {
              name: 'heroHeadline1',
              type: 'text',
              localized: true,
              defaultValue: 'Where the Gulf',
              admin: { description: 'First line of the hero headline.' },
            },
            {
              name: 'heroHeadline2',
              type: 'text',
              localized: true,
              defaultValue: 'Begins to Heal You',
              admin: { description: 'Second line (italic) of the hero headline.' },
            },
            {
              name: 'heroTagline',
              type: 'textarea',
              localized: true,
              defaultValue: '41 rooms and suites on the hills of Ano Loutro. Sixty minutes from Athens. A world away from everything else.',
            },
            {
              name: 'heroLocationLabel',
              type: 'text',
              localized: true,
              defaultValue: 'Corinthia, Greece',
            },
            {
              name: 'heroScrollLabel',
              type: 'text',
              localized: true,
              defaultValue: 'Scroll',
            },
            {
              name: 'heroCta1Label',
              type: 'text',
              localized: true,
              defaultValue: 'Reserve a Room',
              admin: { description: 'Primary CTA button label (links to booking engine).' },
            },
            {
              name: 'heroCta2Label',
              type: 'text',
              localized: true,
              defaultValue: 'Explore Rooms',
              admin: { description: 'Secondary CTA button label (links to /accommodation).' },
            },
            {
              name: 'heroStat1Value',
              type: 'text',
              localized: true,
              defaultValue: '41',
            },
            {
              name: 'heroStat1Label',
              type: 'text',
              localized: true,
              defaultValue: 'Rooms & Suites',
            },
            {
              name: 'heroStat2Value',
              type: 'text',
              localized: true,
              defaultValue: "60'",
            },
            {
              name: 'heroStat2Label',
              type: 'text',
              localized: true,
              defaultValue: 'From Athens',
            },
            {
              name: 'heroStat3Value',
              type: 'text',
              localized: true,
              defaultValue: '5★',
            },
            {
              name: 'heroStat3Label',
              type: 'text',
              localized: true,
              defaultValue: 'Experience',
            },
          ],
        },

        // ─── HOMEPAGE COPY ───────────────────────────────────────────────
        {
          label: 'Homepage Copy',
          description: 'Text for all homepage section components. All fields are localized (EN + EL).',
          fields: [
            // Brand Intro section
            { type: 'row', fields: [
              { name: 'brandIntroLabel', type: 'text', localized: true, admin: { width: '50%', description: 'Section chip label ("The Property")' } },
              { name: 'brandIntroLinkLabel', type: 'text', localized: true, admin: { width: '50%', description: 'Link text ("Our Story")' } },
            ]},
            { name: 'brandIntroHeadline1', type: 'text', localized: true, defaultValue: 'Built for', admin: { description: 'Brand intro headline line 1' } },
            { name: 'brandIntroHeadline2', type: 'text', localized: true, defaultValue: 'That Moment', admin: { description: 'Brand intro headline line 2 (italic)' } },
            { name: 'brandIntroBody1', type: 'textarea', localized: true, admin: { description: 'Brand intro paragraph 1' } },
            { name: 'brandIntroBody2', type: 'textarea', localized: true, admin: { description: 'Brand intro paragraph 2' } },
            { name: 'brandIntroCardLabel', type: 'text', admin: { description: 'Info card label (e.g. "Althos")' } },
            { name: 'brandIntroCardLine1', type: 'text', localized: true, admin: { description: 'Card text line 1' } },
            { name: 'brandIntroCardLine2', type: 'text', localized: true, admin: { description: 'Card text line 2 (italic)' } },
            { name: 'brandIntroCardSub', type: 'textarea', localized: true, admin: { description: 'Small card subtext' } },
            { name: 'brandIntroImage1', type: 'upload', relationTo: 'media' as const, admin: { description: 'Brand intro left tall image' } },
            { name: 'brandIntroImage2', type: 'upload', relationTo: 'media' as const, admin: { description: 'Brand intro right square image' } },
            // Experiences Highlight section
            { name: 'expHighlightLabel', type: 'text', localized: true, defaultValue: 'Experiences', admin: { description: 'Experiences section chip label' } },
            { name: 'expHighlightHeadline1', type: 'text', localized: true, defaultValue: 'This Is What You', admin: { description: 'Experiences headline line 1' } },
            { name: 'expHighlightHeadline2', type: 'text', localized: true, defaultValue: 'Come Back For', admin: { description: 'Experiences headline line 2 (italic)' } },
            { name: 'expHighlightSubtext', type: 'textarea', localized: true, admin: { description: 'Experiences section subtext (right side)' } },
            { name: 'expHighlightDiscoverLabel', type: 'text', localized: true, defaultValue: 'Discover', admin: { description: 'Card link label' } },
            // Gastronomy section
            { name: 'gastronomyLabel', type: 'text', localized: true, defaultValue: 'Gastronomy', admin: { description: 'Gastronomy section chip label' } },
            { name: 'gastronomyHeadline1', type: 'text', localized: true, defaultValue: 'Food Here Is Not', admin: { description: 'Gastronomy headline line 1' } },
            { name: 'gastronomyHeadline2', type: 'text', localized: true, defaultValue: 'an Afterthought', admin: { description: 'Gastronomy headline line 2 (italic)' } },
            { name: 'gastronomyBody1', type: 'textarea', localized: true, admin: { description: 'Gastronomy paragraph 1' } },
            { name: 'gastronomyBody2', type: 'textarea', localized: true, admin: { description: 'Gastronomy paragraph 2' } },
            { name: 'gastronomyCardQuote', type: 'textarea', localized: true, admin: { description: 'Quote card text' } },
            { name: 'gastronomyCtaLabel', type: 'text', localized: true, defaultValue: 'Explore Gastronomy', admin: { description: 'Gastronomy section CTA label' } },
            { name: 'gastronomyImage', type: 'upload', relationTo: 'media' as const, admin: { description: 'Gastronomy section image (aspect 3/4)' } },
            // Journal preview section
            { name: 'journalLabel', type: 'text', localized: true, defaultValue: 'Journal', admin: { description: 'Journal section chip label' } },
            { name: 'journalHeadline1', type: 'text', localized: true, defaultValue: 'Stories from', admin: { description: 'Journal headline line 1' } },
            { name: 'journalHeadline2', type: 'text', localized: true, defaultValue: 'Corinthia', admin: { description: 'Journal headline line 2' } },
            { name: 'journalCtaLabel', type: 'text', localized: true, defaultValue: 'All Stories', admin: { description: 'Journal section CTA label' } },
            // Gallery preview section
            { name: 'galleryLabel', type: 'text', localized: true, defaultValue: 'Gallery', admin: { description: 'Gallery section chip label' } },
            { name: 'galleryHeadline', type: 'text', localized: true, defaultValue: 'The View From Here', admin: { description: 'Gallery section headline' } },
            { name: 'galleryCtaLabel', type: 'text', localized: true, defaultValue: 'View Full Gallery', admin: { description: 'Gallery section CTA label' } },
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
