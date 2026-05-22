import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: { read: () => true },
  versions: {
    drafts: { autosave: true },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
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
        { name: 'label', type: 'text' },
        { name: 'headline', type: 'text' },
        { name: 'intro', type: 'textarea' },
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
            { name: 'heading', type: 'text' },
            { name: 'content', type: 'richText' },
          ],
        },
        {
          slug: 'image-block',
          labels: { singular: 'Image Block', plural: 'Image Blocks' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text' },
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
            { name: 'heading', type: 'text' },
            { name: 'subtext', type: 'textarea' },
            { name: 'buttonLabel', type: 'text', defaultValue: 'Book Now' },
            { name: 'buttonUrl', type: 'text', defaultValue: 'https://althearesort.reserve-online.net' },
          ],
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [{ label: 'SEO', fields: seoFields }],
    },
  ],
}
