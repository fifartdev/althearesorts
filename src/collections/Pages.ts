import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'
import { isAdmin, isSuperAdmin } from '../access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Content',
    description: 'Flexible CMS pages. Build any page by adding, removing, and reordering section blocks.',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isSuperAdmin,
  },
  versions: {
    drafts: { autosave: true },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    ...slugField('title'),

    // ─── HERO ──────────────────────────────────────────────────────────────
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'style',
          type: 'select',
          defaultValue: 'cinematic',
          options: [
            { label: 'Cinematic Full Screen', value: 'cinematic' },
            { label: 'Minimal with Image', value: 'minimal' },
            { label: 'Color Background', value: 'color' },
            { label: 'Text Only', value: 'text' },
          ],
        },
        { name: 'label', type: 'text', localized: true, admin: { description: 'Small eyebrow label above the headline.' } },
        { name: 'headline', type: 'text', localized: true },
        { name: 'subheadline', type: 'text', localized: true },
        { name: 'intro', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'overlayOpacity',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 40,
          admin: { description: 'Dark overlay opacity over hero image (0–100).' },
        },
        {
          name: 'backgroundColor',
          type: 'text',
          defaultValue: '#102027',
          admin: {
            description: 'Hex background color for Color Background style.',
            condition: (_, siblingData) => siblingData?.style === 'color',
          },
        },
        { name: 'ctaLabel', type: 'text', localized: true },
        { name: 'ctaUrl', type: 'text' },
        { name: 'secondaryCtaLabel', type: 'text', localized: true },
        { name: 'secondaryCtaUrl', type: 'text' },
      ],
    },

    // ─── LAYOUT BLOCKS ─────────────────────────────────────────────────────
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Sections',
      admin: {
        description: 'Add, reorder, enable/disable, and remove sections to build the page layout.',
      },
      blocks: [

        // ── 1. Rich Content Block ──────────────────────────────────────────
        {
          slug: 'content-block',
          labels: { singular: 'Rich Content', plural: 'Rich Content Blocks' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'label', type: 'text', localized: true, admin: { description: 'Eyebrow label.' } },
            { name: 'heading', type: 'text', localized: true },
            { name: 'subheading', type: 'text', localized: true },
            { name: 'content', type: 'richText', localized: true },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Centered', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
            },
            {
              name: 'width',
              type: 'select',
              defaultValue: 'content',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Content Width', value: 'content' },
                { label: 'Narrow', value: 'narrow' },
              ],
            },
            {
              name: 'background',
              type: 'select',
              defaultValue: 'white',
              options: [
                { label: 'White', value: 'white' },
                { label: 'Cream', value: 'cream' },
                { label: 'Dark', value: 'dark' },
                { label: 'Gold', value: 'gold' },
              ],
            },
          ],
        },

        // ── 2. Content + Image Side by Side ───────────────────────────────
        {
          slug: 'content-image-block',
          labels: { singular: 'Content + Image', plural: 'Content + Image Blocks' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'label', type: 'text', localized: true },
            { name: 'heading', type: 'text', localized: true },
            { name: 'body', type: 'richText', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'imagePosition',
              type: 'select',
              defaultValue: 'right',
              options: [
                { label: 'Image Right', value: 'right' },
                { label: 'Image Left', value: 'left' },
              ],
            },
            { name: 'ctaLabel', type: 'text', localized: true },
            { name: 'ctaUrl', type: 'text' },
            {
              name: 'background',
              type: 'select',
              defaultValue: 'white',
              options: [
                { label: 'White', value: 'white' },
                { label: 'Cream', value: 'cream' },
                { label: 'Dark', value: 'dark' },
              ],
            },
          ],
        },

        // ── 3. Image Block ────────────────────────────────────────────────
        {
          slug: 'image-block',
          labels: { singular: 'Image', plural: 'Image Blocks' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text', localized: true },
            {
              name: 'size',
              type: 'select',
              defaultValue: 'full',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Content Width', value: 'content' },
                { label: 'Small', value: 'small' },
              ],
            },
            { name: 'aspectRatio', type: 'select', defaultValue: 'landscape', options: ['landscape', 'portrait', 'square', 'cinema'] },
          ],
        },

        // ── 4. Gallery Grid Block ─────────────────────────────────────────
        {
          slug: 'gallery-block',
          labels: { singular: 'Gallery Grid', plural: 'Gallery Grids' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'heading', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'images',
              type: 'array',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text', localized: true },
              ],
            },
            {
              name: 'columns',
              type: 'select',
              defaultValue: '3',
              options: ['2', '3', '4'],
            },
            { name: 'ctaLabel', type: 'text', localized: true },
            { name: 'ctaUrl', type: 'text', defaultValue: '/gallery' },
          ],
        },

        // ── 5. Rooms Showcase Block ───────────────────────────────────────
        {
          slug: 'rooms-showcase-block',
          labels: { singular: 'Rooms Showcase', plural: 'Rooms Showcases' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'label', type: 'text', localized: true },
            { name: 'heading', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'displayMode',
              type: 'select',
              defaultValue: 'grid',
              options: [
                { label: 'Grid (3 columns)', value: 'grid' },
                { label: 'Horizontal List', value: 'list' },
                { label: 'Featured + Grid', value: 'featured' },
              ],
            },
            {
              name: 'rooms',
              type: 'relationship',
              relationTo: 'rooms',
              hasMany: true,
              admin: { description: 'Select rooms to display. Leave empty to show all published rooms.' },
            },
            { name: 'maxItems', type: 'number', defaultValue: 6 },
            { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'View All Rooms' },
            { name: 'ctaUrl', type: 'text', defaultValue: '/accommodation' },
          ],
        },

        // ── 6. Experiences Grid Block ─────────────────────────────────────
        {
          slug: 'experiences-block',
          labels: { singular: 'Experiences Grid', plural: 'Experiences Grids' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'label', type: 'text', localized: true },
            { name: 'heading', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'experiences',
              type: 'relationship',
              relationTo: 'experiences',
              hasMany: true,
              admin: { description: 'Select specific experiences. Leave empty to show all.' },
            },
            {
              name: 'filterByCategory',
              type: 'select',
              options: [
                { label: 'All', value: 'all' },
                { label: 'Activities', value: 'activities' },
                { label: 'Spa & Wellness', value: 'spa' },
                { label: 'Pool', value: 'pool' },
                { label: 'Events & Weddings', value: 'events' },
                { label: 'Corporate', value: 'corporate' },
              ],
              defaultValue: 'all',
            },
            { name: 'ctaLabel', type: 'text', localized: true },
            { name: 'ctaUrl', type: 'text', defaultValue: '/experiences' },
          ],
        },

        // ── 7. Dining / Gastronomy Block ──────────────────────────────────
        {
          slug: 'dining-block',
          labels: { singular: 'Dining Section', plural: 'Dining Sections' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'label', type: 'text', localized: true },
            { name: 'heading', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'venues',
              type: 'relationship',
              relationTo: 'dining',
              hasMany: true,
              admin: { description: 'Select specific venues. Leave empty to show all published venues.' },
            },
            {
              name: 'displayMode',
              type: 'select',
              defaultValue: 'list',
              options: [
                { label: 'Alternating List (full-width)', value: 'list' },
                { label: 'Card Grid', value: 'grid' },
                { label: 'Featured + List', value: 'featured' },
              ],
            },
            { name: 'ctaLabel', type: 'text', localized: true },
            { name: 'ctaUrl', type: 'text', defaultValue: '/gastronomy' },
          ],
        },

        // ── 8. Spa Highlight Block ────────────────────────────────────────
        {
          slug: 'spa-highlight-block',
          labels: { singular: 'Spa Highlight', plural: 'Spa Highlights' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'label', type: 'text', localized: true },
            { name: 'heading', type: 'text', localized: true },
            { name: 'body', type: 'richText', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'features',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Icon identifier (optional).' } },
                { name: 'label', type: 'text', required: true, localized: true },
                { name: 'value', type: 'text', localized: true },
              ],
            },
            { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Discover the Spa' },
            { name: 'ctaUrl', type: 'text', defaultValue: '/spa' },
            {
              name: 'background',
              type: 'select',
              defaultValue: 'dark',
              options: [
                { label: 'Dark', value: 'dark' },
                { label: 'Cream', value: 'cream' },
                { label: 'White', value: 'white' },
              ],
            },
          ],
        },

        // ── 9. Testimonials Block ─────────────────────────────────────────
        {
          slug: 'testimonials-block',
          labels: { singular: 'Testimonials', plural: 'Testimonials' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'heading', type: 'text', localized: true, defaultValue: 'What Guests Say' },
            {
              name: 'testimonials',
              type: 'relationship',
              relationTo: 'testimonials',
              hasMany: true,
              admin: { description: 'Select specific testimonials. Leave empty to show all featured ones.' },
            },
            {
              name: 'displayMode',
              type: 'select',
              defaultValue: 'carousel',
              options: [
                { label: 'Carousel', value: 'carousel' },
                { label: 'Grid', value: 'grid' },
                { label: 'Single Featured', value: 'single' },
              ],
            },
            {
              name: 'background',
              type: 'select',
              defaultValue: 'cream',
              options: [
                { label: 'Cream', value: 'cream' },
                { label: 'White', value: 'white' },
                { label: 'Dark', value: 'dark' },
              ],
            },
          ],
        },

        // ── 10. Stats / Numbers Block ────────────────────────────────────
        {
          slug: 'stats-block',
          labels: { singular: 'Stats / Key Numbers', plural: 'Stats Blocks' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'heading', type: 'text', localized: true },
            {
              name: 'stats',
              type: 'array',
              minRows: 2,
              maxRows: 6,
              fields: [
                { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "41", "5★", "60 min"' } },
                { name: 'label', type: 'text', required: true, localized: true },
                { name: 'sublabel', type: 'text', localized: true },
              ],
            },
            {
              name: 'background',
              type: 'select',
              defaultValue: 'dark',
              options: [
                { label: 'Dark', value: 'dark' },
                { label: 'Gold', value: 'gold' },
                { label: 'Cream', value: 'cream' },
              ],
            },
          ],
        },

        // ── 11. CTA Banner Block ──────────────────────────────────────────
        {
          slug: 'cta-block',
          labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'eyebrow', type: 'text', localized: true },
            { name: 'heading', type: 'text', localized: true },
            { name: 'subtext', type: 'textarea', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Optional background image.' } },
            { name: 'buttonLabel', type: 'text', localized: true, defaultValue: 'Book Now' },
            { name: 'buttonUrl', type: 'text', defaultValue: 'https://althearesort.reserve-online.net' },
            { name: 'secondaryButtonLabel', type: 'text', localized: true },
            { name: 'secondaryButtonUrl', type: 'text' },
            {
              name: 'style',
              type: 'select',
              defaultValue: 'dark',
              options: [
                { label: 'Dark with image', value: 'dark' },
                { label: 'Gold', value: 'gold' },
                { label: 'Minimal', value: 'minimal' },
              ],
            },
          ],
        },

        // ── 12. FAQ Accordion Block ──────────────────────────────────────
        {
          slug: 'faq-block',
          labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'heading', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'faqs',
              type: 'relationship',
              relationTo: 'faqs',
              hasMany: true,
              admin: { description: 'Select specific FAQs. Leave empty to load all from the FAQ collection.' },
            },
            {
              name: 'filterByCategory',
              type: 'select',
              options: [
                { label: 'All', value: 'all' },
                { label: 'Rooms & Rates', value: 'rooms' },
                { label: 'Check-in & Check-out', value: 'checkin' },
                { label: 'Dining', value: 'dining' },
                { label: 'Spa & Wellness', value: 'spa' },
                { label: 'Getting Here', value: 'location' },
                { label: 'Reservations', value: 'reservations' },
                { label: 'General', value: 'general' },
              ],
              defaultValue: 'all',
            },
            { name: 'ctaLabel', type: 'text', localized: true },
            { name: 'ctaUrl', type: 'text', defaultValue: '/faq' },
          ],
        },

        // ── 13. Location / Map Block ──────────────────────────────────────
        {
          slug: 'location-block',
          labels: { singular: 'Location & Map', plural: 'Location Sections' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'heading', type: 'text', localized: true },
            { name: 'body', type: 'richText', localized: true },
            {
              name: 'showMap',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'nearbyPlaces',
              type: 'relationship',
              relationTo: 'locations',
              hasMany: true,
              admin: { description: 'Nearby sights and places to show in a grid.' },
            },
          ],
        },

        // ── 14. Journal Preview Block ─────────────────────────────────────
        {
          slug: 'journal-block',
          labels: { singular: 'Journal Preview', plural: 'Journal Previews' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'heading', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'posts',
              type: 'relationship',
              relationTo: 'journal',
              hasMany: true,
              admin: { description: 'Select specific posts. Leave empty to show the latest featured posts.' },
            },
            { name: 'maxItems', type: 'number', defaultValue: 3 },
            { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Read the Journal' },
            { name: 'ctaUrl', type: 'text', defaultValue: '/journal' },
          ],
        },

        // ── 15. Offers Preview Block ──────────────────────────────────────
        {
          slug: 'offers-block',
          labels: { singular: 'Offers Section', plural: 'Offers Sections' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'heading', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'offers',
              type: 'relationship',
              relationTo: 'offers',
              hasMany: true,
              admin: { description: 'Leave empty to display all active offers.' },
            },
            { name: 'ctaLabel', type: 'text', localized: true },
            { name: 'ctaUrl', type: 'text', defaultValue: '/offers' },
          ],
        },

        // ── 16. Feature Cards Block ──────────────────────────────────────
        {
          slug: 'feature-cards-block',
          labels: { singular: 'Feature Cards', plural: 'Feature Card Sections' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'label', type: 'text', localized: true },
            { name: 'heading', type: 'text', localized: true },
            { name: 'intro', type: 'textarea', localized: true },
            {
              name: 'cards',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Icon name or SVG identifier.' } },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'heading', type: 'text', required: true, localized: true },
                { name: 'body', type: 'textarea', localized: true },
                { name: 'ctaLabel', type: 'text', localized: true },
                { name: 'ctaUrl', type: 'text' },
              ],
            },
            {
              name: 'columns',
              type: 'select',
              defaultValue: '3',
              options: ['2', '3', '4'],
            },
            {
              name: 'cardStyle',
              type: 'select',
              defaultValue: 'image',
              options: [
                { label: 'With Image', value: 'image' },
                { label: 'Icon + Text', value: 'icon' },
                { label: 'Text Only', value: 'text' },
              ],
            },
          ],
        },

        // ── 17. Video Block ──────────────────────────────────────────────
        {
          slug: 'video-block',
          labels: { singular: 'Video', plural: 'Video Blocks' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            { name: 'heading', type: 'text', localized: true },
            {
              name: 'videoType',
              type: 'select',
              defaultValue: 'youtube',
              options: [
                { label: 'YouTube', value: 'youtube' },
                { label: 'Vimeo', value: 'vimeo' },
                { label: 'Self-hosted (upload)', value: 'upload' },
              ],
            },
            {
              name: 'videoUrl',
              type: 'text',
              admin: {
                description: 'YouTube or Vimeo URL.',
                condition: (_, sibling) => sibling?.videoType !== 'upload',
              },
            },
            {
              name: 'videoFile',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (_, sibling) => sibling?.videoType === 'upload',
              },
            },
            { name: 'posterImage', type: 'upload', relationTo: 'media', admin: { description: 'Thumbnail shown before video plays.' } },
            { name: 'caption', type: 'text', localized: true },
            {
              name: 'size',
              type: 'select',
              defaultValue: 'full',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Content Width', value: 'content' },
              ],
            },
          ],
        },

        // ── 18. Spacer / Divider ─────────────────────────────────────────
        {
          slug: 'spacer-block',
          labels: { singular: 'Spacer / Divider', plural: 'Spacers' },
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
            {
              name: 'size',
              type: 'select',
              defaultValue: 'md',
              options: [
                { label: 'Small (2rem)', value: 'sm' },
                { label: 'Medium (4rem)', value: 'md' },
                { label: 'Large (8rem)', value: 'lg' },
                { label: 'Section (10rem)', value: 'xl' },
              ],
            },
            {
              name: 'showDivider',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Show a horizontal rule.' },
            },
          ],
        },
      ],
    },
  ],
}
