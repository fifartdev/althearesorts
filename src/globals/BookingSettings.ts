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
  ],
}
