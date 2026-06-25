import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

/**
 * GeoSettings — structured data and local business configuration.
 * Drives the LodgingBusiness JSON-LD schema, Google Business Profile signals,
 * and any GEO-specific overrides used in the frontend and sitemap.
 */
export const GeoSettings: GlobalConfig = {
  slug: 'geo-settings',
  label: 'GEO & Structured Data',
  admin: {
    group: 'Settings',
    description: 'Controls the LodgingBusiness schema.org markup, local business signals, and GEO visibility fields. Changes here affect how the property appears in Google Knowledge Panels, Maps, and AI-generated answers.',
  },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─── HOTEL IDENTITY ────────────────────────────────────────────────
        {
          label: 'Hotel Identity',
          fields: [
            {
              name: 'legalName',
              type: 'text',
              required: true,
              defaultValue: 'Althea Resorts',
              admin: { description: 'Legal entity name registered with the business.' },
            },
            {
              name: 'brandName',
              type: 'text',
              defaultValue: 'Althea Resorts',
              localized: true,
              admin: { description: 'Trading / brand name shown to customers.' },
            },
            {
              name: 'alternateName',
              type: 'text',
              defaultValue: 'Althea Exclusive Resorts & Spa',
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              defaultValue: 'A luxury boutique resort on the hillside of Ano Loutro, near Xylokastro, Corinthia, Greece. 60 minutes from Athens. 41 rooms and suites, Ocean Spa, rooftop restaurant AITHER, and private beach shuttle.',
              admin: { description: 'Used in schema.org description and GEO entity summaries.' },
            },
            {
              name: 'logoImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Square logo (min 512×512px) for structured data and Google Knowledge Panel.' },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Primary property photo for structured data (1200×630px recommended).' },
            },
          ],
        },

        // ─── ADDRESS & COORDINATES ────────────────────────────────────────
        {
          label: 'Address & Location',
          fields: [
            {
              name: 'streetAddress',
              type: 'text',
              defaultValue: 'Ano Loutro',
            },
            {
              name: 'addressLocality',
              type: 'text',
              defaultValue: 'Xylokastro',
            },
            {
              name: 'addressRegion',
              type: 'text',
              defaultValue: 'Corinthia',
            },
            {
              name: 'postalCode',
              type: 'text',
              defaultValue: '20400',
            },
            {
              name: 'addressCountry',
              type: 'text',
              defaultValue: 'GR',
              admin: { description: 'ISO 3166-1 alpha-2 country code.' },
            },
            {
              name: 'coordinates',
              type: 'group',
              fields: [
                {
                  name: 'latitude',
                  type: 'number',
                  defaultValue: 38.0945616,
                  admin: { description: 'Decimal degrees. Verify against Google Maps pin.' },
                },
                {
                  name: 'longitude',
                  type: 'number',
                  defaultValue: 22.5454614,
                },
              ],
            },
            {
              name: 'googleMapsUrl',
              type: 'text',
              admin: { description: 'Full Google Maps URL to the business listing (optional override).' },
            },
            {
              name: 'googlePlaceId',
              type: 'text',
              admin: { description: 'Google Place ID for linking to the Google Business Profile. Find at: developers.google.com/maps/documentation/places/web-service/place-id' },
            },
          ],
        },

        // ─── CONTACT ──────────────────────────────────────────────────────
        {
          label: 'Contact',
          fields: [
            {
              name: 'telephone',
              type: 'text',
              defaultValue: '+30 27430 24063',
              admin: { description: 'Primary telephone in E.164 or international format.' },
            },
            {
              name: 'mobilePhone',
              type: 'text',
              defaultValue: '+30 211 41 84 108',
            },
            {
              name: 'email',
              type: 'email',
              defaultValue: 'reservations@althearesorts.com',
            },
            {
              name: 'reservationsEmail',
              type: 'email',
              defaultValue: 'reservations@althearesorts.com',
            },
            {
              name: 'infoEmail',
              type: 'email',
              defaultValue: 'info@althearesorts.com',
            },
            {
              name: 'fax',
              type: 'text',
              admin: { description: 'Fax number (if applicable).' },
            },
            {
              name: 'url',
              type: 'text',
              defaultValue: 'https://althearesorts.com',
            },
            {
              name: 'bookingUrl',
              type: 'text',
              defaultValue: 'https://althearesort.reserve-online.net',
            },
          ],
        },

        // ─── BUSINESS HOURS ───────────────────────────────────────────────
        {
          label: 'Business Hours',
          description: 'Opening hours displayed on Google Business Profile and in structured data.',
          fields: [
            {
              name: 'reception247',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Check if reception is open 24/7. This overrides the schedule below.' },
            },
            {
              name: 'openingHoursSpec',
              type: 'array',
              admin: {
                description: 'Opening hours per day/service. Only used when reception247 is off.',
                condition: (data) => !data?.reception247,
              },
              fields: [
                {
                  name: 'dayOfWeek',
                  type: 'select',
                  required: true,
                  hasMany: true,
                  options: [
                    { label: 'Monday', value: 'Monday' },
                    { label: 'Tuesday', value: 'Tuesday' },
                    { label: 'Wednesday', value: 'Wednesday' },
                    { label: 'Thursday', value: 'Thursday' },
                    { label: 'Friday', value: 'Friday' },
                    { label: 'Saturday', value: 'Saturday' },
                    { label: 'Sunday', value: 'Sunday' },
                  ],
                },
                {
                  name: 'opens',
                  type: 'text',
                  required: true,
                  admin: { description: 'HH:MM format, e.g. 09:00' },
                },
                {
                  name: 'closes',
                  type: 'text',
                  required: true,
                  admin: { description: 'HH:MM format, e.g. 22:00' },
                },
              ],
            },
            {
              name: 'checkinTime',
              type: 'text',
              defaultValue: '15:00',
              admin: { description: 'Guest check-in time. HH:MM format.' },
            },
            {
              name: 'checkoutTime',
              type: 'text',
              defaultValue: '11:00',
              admin: { description: 'Guest check-out time. HH:MM format.' },
            },
            {
              name: 'seasonalNote',
              type: 'text',
              localized: true,
              admin: { description: 'Optional note about seasonal closures or special hours. Displayed in footer/contact.' },
            },
          ],
        },

        // ─── HOSPITALITY DETAILS ──────────────────────────────────────────
        {
          label: 'Hospitality Details',
          fields: [
            {
              name: 'starRating',
              type: 'number',
              defaultValue: 5,
              min: 1,
              max: 5,
            },
            {
              name: 'numberOfRooms',
              type: 'number',
              defaultValue: 41,
            },
            {
              name: 'priceRange',
              type: 'select',
              defaultValue: '€€€€',
              options: ['€', '€€', '€€€', '€€€€'],
            },
            {
              name: 'currenciesAccepted',
              type: 'text',
              defaultValue: 'EUR',
            },
            {
              name: 'paymentAccepted',
              type: 'text',
              defaultValue: 'Cash, Credit Card, Debit Card',
            },
            {
              name: 'availableLanguages',
              type: 'array',
              fields: [
                { name: 'language', type: 'text', required: true },
              ],
              defaultValue: [
                { language: 'English' },
                { language: 'Greek' },
                { language: 'French' },
              ],
            },
            {
              name: 'amenityFeatures',
              type: 'array',
              admin: { description: 'Hotel amenities to include in LodgingBusiness schema.' },
              fields: [
                { name: 'name', type: 'text', required: true },
                {
                  name: 'value',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
              defaultValue: [
                { name: 'Ocean Spa', value: true },
                { name: 'Sauna', value: true },
                { name: 'Hammam', value: true },
                { name: 'Swimming Pool', value: true },
                { name: 'Rooftop Restaurant', value: true },
                { name: 'Pool Bar', value: true },
                { name: 'Free WiFi', value: true },
                { name: 'Conference Room', value: true },
                { name: 'Fitness Centre', value: true },
                { name: 'Yoga Room', value: true },
                { name: 'Air Conditioning', value: true },
                { name: 'Parking', value: true },
                { name: 'Beach Shuttle', value: true },
              ],
            },
          ],
        },

        // ─── NESTED PLACES ────────────────────────────────────────────────
        {
          label: 'Sub-Venues',
          description: 'Restaurants and facilities within the hotel listed as containsPlace in schema.org.',
          fields: [
            {
              name: 'nestedPlaces',
              type: 'array',
              admin: { description: 'Each entry becomes a containsPlace entity in the LodgingBusiness schema.' },
              fields: [
                {
                  name: 'schemaType',
                  type: 'select',
                  required: true,
                  defaultValue: 'Restaurant',
                  options: [
                    { label: 'Restaurant', value: 'Restaurant' },
                    { label: 'Bar', value: 'Bar' },
                    { label: 'Spa / Health & Beauty', value: 'HealthAndBeautyBusiness' },
                    { label: 'Swimming Pool', value: 'SwimmingPool' },
                    { label: 'Conference Room', value: 'ConferenceRoom' },
                    { label: 'SportsActivityLocation', value: 'SportsActivityLocation' },
                  ],
                },
                { name: 'id', type: 'text', admin: { description: 'Schema @id (e.g. https://althearesorts.com/gastronomy#aither)' } },
                { name: 'name', type: 'text', required: true },
                { name: 'description', type: 'textarea', localized: true },
                {
                  name: 'servesCuisine',
                  type: 'text',
                  admin: { description: 'Comma-separated cuisines for Restaurant type. e.g. Greek, Mediterranean' },
                },
                { name: 'priceRange', type: 'text' },
                { name: 'url', type: 'text' },
              ],
            },
          ],
        },

        // ─── SOCIAL & DIRECTORY ───────────────────────────────────────────
        {
          label: 'Social & Directory Profiles',
          description: 'Used in sameAs arrays across schema.org and Open Graph tags.',
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
              name: 'tripadvisor',
              type: 'text',
              admin: { description: 'TripAdvisor listing URL.' },
            },
            {
              name: 'bookingcom',
              type: 'text',
              admin: { description: 'Booking.com property listing URL.' },
            },
            {
              name: 'googleBusinessProfile',
              type: 'text',
              admin: { description: 'Google Business Profile URL.' },
            },
          ],
        },
      ],
    },
  ],
}
