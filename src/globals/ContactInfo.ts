import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'Contact Information',
  admin: { group: 'Settings' },
  fields: [
    { name: 'address', type: 'text', defaultValue: 'Ano Loutro, Xylokastro, Corinthia, Greece' },
    { name: 'phone', type: 'text', defaultValue: '+30 211 41 84 108' },
    { name: 'email', type: 'email', defaultValue: 'reservations@althearesorts.com' },
    { name: 'reservationsEmail', type: 'email', defaultValue: 'reservations@althearesorts.com' },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        { name: 'lat', type: 'number', defaultValue: 38.0567 },
        { name: 'lng', type: 'number', defaultValue: 22.6345 },
      ],
    },
    {
      name: 'directions',
      type: 'textarea',
      defaultValue: '60 minutes from Athens by car. Follow the Athens–Corinth motorway toward the Peloponnese, exit at Xylokastro.',
    },
  ],
}
