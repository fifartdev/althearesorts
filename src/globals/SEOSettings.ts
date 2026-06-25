import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const SEOSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: 'SEO & GEO Settings',
  admin: {
    group: 'Settings',
    description: 'Global SEO, GEO, and metadata defaults. These values apply site-wide unless overridden per page.',
  },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    // ─── METADATA DEFAULTS ───────────────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Metadata',
          description: 'Default titles, descriptions, and Open Graph settings used when no page-level override exists.',
          fields: [
            {
              name: 'defaultTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Althea Resorts — Luxury Hotel in Corinthia, Greece',
              admin: { description: 'Used as <title> on pages without their own title.' },
            },
            {
              name: 'titleSuffix',
              type: 'text',
              localized: true,
              defaultValue: '| Althea Resorts',
              admin: { description: 'Appended to every page title. e.g. "Spa | Althea Resorts"' },
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              localized: true,
              defaultValue: 'A luxury boutique resort on the hills of Ano Loutro, Corinthia. 41 rooms and suites with views of the Corinthian Gulf. 60 minutes from Athens.',
              admin: { description: '120–160 characters. Used when no page description is set.' },
            },
            {
              name: 'defaultOGImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Default Open Graph image (1200×630px). Used for social sharing when no page image exists.' },
            },
            {
              name: 'defaultKeywords',
              type: 'text',
              localized: true,
              defaultValue: 'luxury hotel Greece, boutique resort Corinthia, hotel Xylokastro, Althea Resorts',
              admin: { description: 'Comma-separated fallback keywords.' },
            },
            {
              name: 'twitterCardType',
              type: 'select',
              defaultValue: 'summary_large_image',
              options: [
                { label: 'Summary with Large Image', value: 'summary_large_image' },
                { label: 'Summary', value: 'summary' },
              ],
            },
            {
              name: 'twitterHandle',
              type: 'text',
              admin: { description: 'e.g. @althearesorts (optional)' },
            },
          ],
        },

        // ─── CANONICALS & HREFLANG ──────────────────────────────────────────
        {
          label: 'Canonicals & Hreflang',
          description: 'Settings for canonical URLs and multilingual alternate links.',
          fields: [
            {
              name: 'siteUrl',
              type: 'text',
              defaultValue: 'https://althearesorts.com',
              required: true,
              admin: { description: 'The canonical base URL of the site. No trailing slash.' },
            },
            {
              name: 'hreflangEnabled',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Automatically inject hreflang alternate links on all pages.' },
            },
            {
              name: 'defaultLocale',
              type: 'select',
              defaultValue: 'en',
              options: [
                { label: 'English (en)', value: 'en' },
                { label: 'Greek (el)', value: 'el' },
                { label: 'French (fr)', value: 'fr' },
              ],
              admin: { description: 'Used as x-default for hreflang.' },
            },
            {
              name: 'additionalLocales',
              type: 'array',
              admin: { description: 'Additional locales to include in hreflang. Auto-includes en and el.' },
              fields: [
                {
                  name: 'code',
                  type: 'text',
                  required: true,
                  admin: { description: 'BCP 47 locale code, e.g. fr, de, it' },
                },
                {
                  name: 'urlPrefix',
                  type: 'text',
                  required: true,
                  admin: { description: 'URL prefix, e.g. /fr' },
                },
              ],
            },
          ],
        },

        // ─── ROBOTS & INDEXING ───────────────────────────────────────────────
        {
          label: 'Robots & Indexing',
          fields: [
            {
              name: 'robotsTxt',
              type: 'textarea',
              defaultValue: 'User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: anthropic-ai\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /\n\nSitemap: https://althearesorts.com/sitemap.xml',
              admin: { description: 'Full content of the robots.txt file. Changes here will override the auto-generated file.' },
            },
            {
              name: 'noIndexSitewide',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Block all search engines site-wide. Use only for staging environments.' },
            },
            {
              name: 'sitemapEnabled',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'sitemapChangeFreq',
              type: 'select',
              defaultValue: 'weekly',
              options: [
                { label: 'Always', value: 'always' },
                { label: 'Hourly', value: 'hourly' },
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
                { label: 'Never', value: 'never' },
              ],
            },
          ],
        },

        // ─── ANALYTICS & VERIFICATION ────────────────────────────────────────
        {
          label: 'Analytics & Verification',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              admin: { description: 'Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX).' },
            },
            {
              name: 'googleTagManagerId',
              type: 'text',
              admin: { description: 'Google Tag Manager container ID (e.g. GTM-XXXXXX).' },
            },
            {
              name: 'metaPixelId',
              type: 'text',
              admin: { description: 'Meta (Facebook) Pixel ID.' },
            },
            {
              name: 'googleVerification',
              type: 'text',
              admin: { description: 'Google Search Console verification meta content value.' },
            },
            {
              name: 'bingVerification',
              type: 'text',
              admin: { description: 'Bing Webmaster Tools verification meta content value.' },
            },
            {
              name: 'facebookDomainVerification',
              type: 'text',
              admin: { description: 'Facebook domain verification meta content value.' },
            },
          ],
        },

        // ─── LOCAL SEO / GEO ─────────────────────────────────────────────────
        {
          label: 'Local SEO / GEO',
          description: 'Structured data fields for Google Knowledge Panel, Google Maps, and local search signals.',
          fields: [
            {
              name: 'businessName',
              type: 'text',
              defaultValue: 'Althea Resorts',
              admin: { description: 'Legal business name as it appears on Google.' },
            },
            {
              name: 'businessAlternateName',
              type: 'text',
              defaultValue: 'Althea Exclusive Resorts & Spa',
            },
            {
              name: 'businessType',
              type: 'select',
              defaultValue: 'LodgingBusiness',
              options: [
                { label: 'Lodging Business', value: 'LodgingBusiness' },
                { label: 'Hotel', value: 'Hotel' },
                { label: 'Resort', value: 'Resort' },
                { label: 'Bed & Breakfast', value: 'BedAndBreakfast' },
              ],
            },
            {
              name: 'priceRange',
              type: 'select',
              defaultValue: '€€€€',
              options: [
                { label: '€', value: '€' },
                { label: '€€', value: '€€' },
                { label: '€€€', value: '€€€' },
                { label: '€€€€', value: '€€€€' },
              ],
            },
            {
              name: 'starRating',
              type: 'number',
              defaultValue: 5,
              min: 1,
              max: 5,
              admin: { description: 'Official star rating (1–5).' },
            },
            {
              name: 'numberOfRooms',
              type: 'number',
              defaultValue: 41,
            },
            {
              name: 'checkinTime',
              type: 'text',
              defaultValue: '15:00',
              admin: { description: 'Format: HH:MM (24-hour). e.g. 15:00' },
            },
            {
              name: 'checkoutTime',
              type: 'text',
              defaultValue: '11:00',
              admin: { description: 'Format: HH:MM (24-hour). e.g. 11:00' },
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
              admin: { description: 'Languages spoken by staff.' },
              fields: [
                { name: 'language', type: 'text', required: true },
              ],
            },
            {
              name: 'amenityFeatures',
              type: 'array',
              admin: { description: 'Hotel amenities listed in structured data. Name only — value is always true.' },
              fields: [
                { name: 'name', type: 'text', required: true },
              ],
            },
          ],
        },

        // ─── STRUCTURED DATA ─────────────────────────────────────────────────
        {
          label: 'Structured Data',
          description: 'Control the JSON-LD schema.org markup injected sitewide.',
          fields: [
            {
              name: 'schemaEnabled',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Enable sitewide JSON-LD structured data.' },
            },
            {
              name: 'sameAsProfiles',
              type: 'array',
              admin: { description: 'Social and directory profile URLs for sameAs in schema.org.' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'TripAdvisor', value: 'tripadvisor' },
                    { label: 'Booking.com', value: 'booking' },
                    { label: 'Google Business', value: 'google' },
                    { label: 'Other', value: 'other' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'hotelSchemaCustomJson',
              type: 'textarea',
              admin: {
                description: 'Optional: paste a valid JSON-LD snippet to MERGE with the auto-generated LodgingBusiness schema. Advanced use only.',
              },
            },
            {
              name: 'breadcrumbEnabled',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Inject BreadcrumbList schema on inner pages.' },
            },
          ],
        },

        // ─── AI / GEO VISIBILITY ─────────────────────────────────────────────
        {
          label: 'AI & GEO Visibility',
          description: 'Controls for Generative Engine Optimization (GEO) — how this property appears in AI-generated answers, ChatGPT, Google AI Overviews, Perplexity, and similar.',
          fields: [
            {
              name: 'llmsEnabled',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Allow AI retrieval crawlers (ChatGPT-User, Claude-Web) to index the site.' },
            },
            {
              name: 'llmsTxt',
              type: 'textarea',
              admin: {
                description: 'Content of /llms.txt — a structured summary of the site for AI models. Use concise, factual language. See llmstxt.org.',
              },
            },
            {
              name: 'entityDescription',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'A single-paragraph entity description of the hotel. Written to appear in AI-generated answers and knowledge panels. Be factual, specific, and include key differentiators.',
              },
              defaultValue: 'Althea Resorts is a 5-star luxury boutique hotel located in Ano Loutro, Xylokastro, Corinthia, Greece, on the northern Peloponnese coast. It features 41 rooms and suites with views of the Corinthian Gulf, the Ocean Spa with Oceanis certified biodegradable cosmetics, the rooftop restaurant AITHER, an infinity pool, conference facilities, and a private beach shuttle. It is 60 minutes from Athens by car.',
            },
            {
              name: 'aiTrainingOptOut',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Block AI training crawlers (GPTBot, anthropic-ai, CCBot) via robots.txt.' },
            },
          ],
        },
      ],
    },
  ],
}
