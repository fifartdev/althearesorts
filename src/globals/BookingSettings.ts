import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const BookingSettings: GlobalConfig = {
  slug: 'booking-settings',
  label: 'Booking Settings',
  admin: { group: 'Settings' },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: 'bookingEngineUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://althearesort.reserve-online.net',
    },
    {
      name: 'stickyBarEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show sticky booking bar on desktop' },
    },
    {
      name: 'floatingCTAEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show floating CTA button on mobile' },
    },
    {
      name: 'stickyBarText',
      type: 'text',
      localized: true,
      defaultValue: 'Reserve your stay — 60 minutes from Athens',
    },
    {
      name: 'directBookingDiscount',
      type: 'number',
      defaultValue: 10,
      admin: { description: 'Direct booking discount percentage' },
    },
    { name: 'openingOfferEndDate', type: 'date' },
    { name: 'directBookingLabel', type: 'text', localized: true, defaultValue: 'Direct Booking' },
    { name: 'directBookingHeadline1', type: 'text', localized: true, defaultValue: 'Reasons to Book' },
    { name: 'directBookingHeadline2', type: 'text', localized: true, defaultValue: 'Directly With Us' },
    {
      name: 'directBookingIntro',
      type: 'textarea',
      localized: true,
      defaultValue: 'Booking direct means you speak to the people who actually know the property. Every arrangement, every request, every question — handled without a third party in between.',
    },
    { name: 'directBookingCtaLabel', type: 'text', localized: true, defaultValue: 'Book Direct Now' },
    {
      name: 'reasons',
      type: 'array',
      localized: true,
      admin: { description: 'Accordion reasons shown in the Direct Booking section.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}
