import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'
import { isAdmin, isSuperAdmin } from '../access'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'size', 'status', 'updatedAt'],
    group: 'Accommodation',
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
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Room or suite name' },
    },
    ...slugField('title'),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Standard Double', value: 'standard-double' },
        { label: 'Deluxe Double M.V / P.V.', value: 'deluxe-double-mv-pv' },
        { label: 'Deluxe Double with Private Pool', value: 'deluxe-private-pool' },
        { label: 'Superior Sea View Room', value: 'superior-sea-view' },
        { label: 'Junior Suite with Private Pool', value: 'junior-suite' },
        { label: 'Althea Loft Suite Outdoor Jacuzzi', value: 'loft-suite' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Feature on homepage' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'caption',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. "The One Room That Changes Everything"' },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
            },
            {
              name: 'size',
              type: 'text',
              required: true,
              admin: { description: 'e.g. 45 m²' },
            },
            {
              name: 'viewType',
              type: 'text',
              localized: true,
              admin: { description: 'e.g. Panoramic Gulf views' },
            },
            {
              name: 'maxOccupancy',
              type: 'number',
              defaultValue: 2,
            },
            {
              name: 'bedType',
              type: 'select',
              options: [
                { label: 'King size or twin beds', value: 'king-twin' },
                { label: 'King size only', value: 'king' },
                { label: 'Twin beds', value: 'twin' },
              ],
            },
          ],
        },
        {
          label: 'Amenities',
          fields: [
            {
              name: 'amenities',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  admin: { description: 'Icon identifier' },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
            {
              name: 'highlights',
              type: 'array',
              admin: { description: 'Key selling features (3–5 items)' },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              name: 'startingPrice',
              type: 'number',
              admin: { description: 'Starting price per night in EUR' },
            },
            {
              name: 'bookingUrl',
              type: 'text',
              defaultValue: 'https://althearesort.reserve-online.net',
              admin: { description: 'Direct booking URL for this room type' },
            },
          ],
        },
      ],
    },
  ],
}
