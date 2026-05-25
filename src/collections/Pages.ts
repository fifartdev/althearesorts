import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'
import { isAdmin, isSuperAdmin } from '../access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content',
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
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Cinematic Full Screen', value: 'cinematic' },
            { label: 'Minimal with Image', value: 'minimal' },
            { label: 'Text Only', value: 'text' },
          ],
          defaultValue: 'cinematic',
        },
        { name: 'label', type: 'text', localized: true },
        { name: 'headline', type: 'text', localized: true },
        { name: 'intro', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'content-block',
          labels: { singular: 'Content Block', plural: 'Content Blocks' },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'content', type: 'richText', localized: true },
          ],
        },
        {
          slug: 'image-block',
          labels: { singular: 'Image Block', plural: 'Image Blocks' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text', localized: true },
            {
              name: 'size',
              type: 'select',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Content Width', value: 'content' },
                { label: 'Small', value: 'small' },
              ],
              defaultValue: 'full',
            },
          ],
        },
        {
          slug: 'cta-block',
          labels: { singular: 'CTA Block', plural: 'CTA Blocks' },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'subtext', type: 'textarea', localized: true },
            { name: 'buttonLabel', type: 'text', defaultValue: 'Book Now', localized: true },
            {
              name: 'buttonUrl',
              type: 'text',
              defaultValue: 'https://althearesort.reserve-online.net',
            },
          ],
        },
      ],
    },
  ],
}
