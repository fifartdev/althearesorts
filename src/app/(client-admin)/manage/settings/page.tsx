import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@payload-config'
import type { ManageLocale } from '@/lib/manage-i18n'
import { getLocale } from '@/lib/manage-i18n'

export default async function ManageSettings({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string }>
}) {
  const cookieStore = await cookies()
  const resolvedParams = await searchParams
  const locale: ManageLocale = getLocale(
    resolvedParams?.locale ?? cookieStore.get('manage-locale')?.value
  )

  const payload = await getPayload({ config })
  const [contactInfo, bookingSettings, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'contact-info' }).catch(() => null),
    payload.findGlobal({ slug: 'booking-settings' }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ])

  const labels = {
    en: {
      title: 'Settings Overview',
      sub: 'Key site settings. Use the full CMS to make changes.',
      contact: 'Contact Information',
      booking: 'Booking Settings',
      site: 'Site Settings',
      editInCms: 'Edit in CMS →',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      bookingUrl: 'Booking URL',
      discount: 'Direct booking discount',
      siteName: 'Site name',
      tagline: 'Tagline',
      maintenance: 'Maintenance mode',
      on: 'ON',
      off: 'OFF',
    },
    el: {
      title: 'Επισκόπηση Ρυθμίσεων',
      sub: 'Βασικές ρυθμίσεις ιστοσελίδας. Χρησιμοποιήστε το πλήρες CMS για αλλαγές.',
      contact: 'Στοιχεία Επικοινωνίας',
      booking: 'Ρυθμίσεις Κρατήσεων',
      site: 'Ρυθμίσεις Ιστοσελίδας',
      editInCms: 'Επεξεργασία στο CMS →',
      phone: 'Τηλέφωνο',
      email: 'Email',
      address: 'Διεύθυνση',
      bookingUrl: 'URL Κρατήσεων',
      discount: 'Έκπτωση απευθείας κράτησης',
      siteName: 'Όνομα ιστοσελίδας',
      tagline: 'Σλόγκαν',
      maintenance: 'Λειτουργία συντήρησης',
      on: 'ΕΝΕΡΓΗ',
      off: 'ΑΝΕΝΕΡΓΗ',
    },
  }[locale]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#102027]">{labels.title}</h1>
        <p className="text-[#6b6b6b] text-sm mt-1">{labels.sub}</p>
      </div>

      <div className="grid gap-5">
        {/* Contact Info */}
        <SettingsCard
          title={labels.contact}
          editHref="/admin/globals/contact-info"
          editLabel={labels.editInCms}
          locale={locale}
        >
          {contactInfo && (
            <div className="space-y-2">
              <SettingRow label={labels.phone} value={(contactInfo as any).phone || '—'} />
              <SettingRow label={labels.email} value={(contactInfo as any).email || '—'} />
              <SettingRow label={labels.address} value={(contactInfo as any).address || '—'} />
            </div>
          )}
        </SettingsCard>

        {/* Booking Settings */}
        <SettingsCard
          title={labels.booking}
          editHref="/admin/globals/booking-settings"
          editLabel={labels.editInCms}
          locale={locale}
        >
          {bookingSettings && (
            <div className="space-y-2">
              <SettingRow
                label={labels.bookingUrl}
                value={(bookingSettings as any).bookingEngineUrl || '—'}
                truncate
              />
              <SettingRow
                label={labels.discount}
                value={`${(bookingSettings as any).directBookingDiscount ?? 10}%`}
              />
            </div>
          )}
        </SettingsCard>

        {/* Site Settings */}
        <SettingsCard
          title={labels.site}
          editHref="/admin/globals/site-settings"
          editLabel={labels.editInCms}
          locale={locale}
        >
          {siteSettings && (
            <div className="space-y-2">
              <SettingRow label={labels.siteName} value={(siteSettings as any).siteName || '—'} />
              <SettingRow label={labels.tagline} value={(siteSettings as any).tagline || '—'} />
              <SettingRow
                label={labels.maintenance}
                value={
                  (siteSettings as any).maintenanceMode ? (
                    <span className="text-red-600 font-medium">{labels.on}</span>
                  ) : (
                    <span className="text-green-600 font-medium">{labels.off}</span>
                  )
                }
              />
            </div>
          )}
        </SettingsCard>

        {/* CMS sections */}
        <div className="bg-[#faf8f4] rounded-xl border border-[#e8e4dd] p-5">
          <h3 className="font-semibold text-[#102027] mb-3">
            {locale === 'el' ? 'Σύνθετες ρυθμίσεις' : 'Advanced settings'}
          </h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              { label: locale === 'el' ? 'Ρυθμίσεις SEO & GEO' : 'SEO & GEO Settings', href: '/admin/globals/seo-settings' },
              { label: locale === 'el' ? 'Δεδομένα τοποθεσίας (Schema)' : 'GEO & Structured Data', href: '/admin/globals/geo-settings' },
              { label: locale === 'el' ? 'Κεφαλίδα & Πλοήγηση' : 'Header & Navigation', href: '/admin/globals/header' },
              { label: locale === 'el' ? 'Υποσέλιδο' : 'Footer', href: '/admin/globals/footer' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-[#e8e4dd] hover:border-[#ad8b27]/40 transition-colors"
              >
                <span className="text-[#102027]">{item.label}</span>
                <span className="text-[#ad8b27] text-xs">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsCard({
  title,
  editHref,
  editLabel,
  children,
  locale,
}: {
  title: string
  editHref: string
  editLabel: string
  children: React.ReactNode
  locale: ManageLocale
}) {
  return (
    <div className="bg-white rounded-xl border border-[#e8e4dd] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#102027]">{title}</h3>
        <a
          href={editHref}
          target="_blank"
          className="text-xs text-[#ad8b27] font-medium hover:underline"
        >
          {editLabel}
        </a>
      </div>
      {children}
    </div>
  )
}

function SettingRow({
  label,
  value,
  truncate,
}: {
  label: string
  value: React.ReactNode
  truncate?: boolean
}) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="text-xs text-[#6b6b6b] w-40 shrink-0">{label}</span>
      <span className={`text-sm text-[#102027] ${truncate ? 'truncate' : ''}`}>{value}</span>
    </div>
  )
}
