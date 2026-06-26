import { generateMetadata as genMeta, SITE_URL } from '@/lib/seo'
import { getContactInfo, getBookingSettings } from '@/lib/cms'

export const metadata = genMeta({
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for bookings and use of the Althea Resorts website.',
  keywords: ['Althea Resorts terms', 'booking conditions', 'hotel terms and conditions'],
  canonical: `${SITE_URL}/terms`,
})

export default async function TermsPage() {
  const [contactInfo, bookingSettings] = await Promise.all([getContactInfo(), getBookingSettings()])
  const phone: string | undefined = (contactInfo as any)?.phone || undefined
  const email: string | undefined = (contactInfo as any)?.email || undefined
  const bookingUrl: string | undefined = (bookingSettings as any)?.bookingEngineUrl || undefined
  return (
    <main id="main-content" className="pt-40 pb-24 lg:pt-56 lg:pb-32 bg-white">
      <div className="container-luxury max-w-3xl">

        {/* LEGAL REVIEW NOTICE — remove after solicitor sign-off */}
        <div className="mb-10 p-6 border-2 border-gold bg-cream">
          <p className="text-xs uppercase tracking-widest text-gold font-medium mb-2">Action Required — Legal Review</p>
          <p className="text-sm text-smoke font-light">These Terms &amp; Conditions must be reviewed and approved by a qualified legal professional before publication. Outstanding items: (1) confirm legal entity name and company registration number in Section 1; (2) define cancellation policy in Section 3; (3) list accepted payment methods in Section 5.</p>
        </div>

        <h1 className="text-display-lg text-deep mb-4">Terms &amp; Conditions</h1>
        <p className="text-sm text-smoke font-light mb-12">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none text-smoke font-light leading-loose space-y-8">

          <section>
            <h2 className="text-lg font-light text-deep mb-4">1. Introduction</h2>
            <p>These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Althea Resorts website (<a href={SITE_URL} className="text-deep hover:text-gold transition-colors">{SITE_URL}</a>) and any bookings made with Althea Resorts. By accessing our website or making a reservation, you agree to these Terms.</p>
            {email && <p className="mt-3">Althea Resorts is operated by Althea Resorts, registered in Corinthia, Greece. Queries may be directed to <a href={`mailto:${email}`} className="text-deep hover:text-gold transition-colors">{email}</a>.</p>}
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">2. Reservations</h2>
            {bookingUrl
              ? <p>Reservations may be made through our online booking system at <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="text-deep hover:text-gold transition-colors">{bookingUrl}</a>, by telephone, or by email. A reservation is confirmed upon receipt of a written confirmation from Althea Resorts.</p>
              : <p>Reservations may be made by telephone or email. A reservation is confirmed upon receipt of a written confirmation from Althea Resorts.</p>
            }
            <p className="mt-3">All rates are quoted in Euros (EUR) and include applicable taxes unless otherwise stated. Rates are subject to change without notice until a reservation is confirmed.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">3. Cancellation Policy</h2>
            <p>[Insert cancellation policy — e.g.: Reservations may be cancelled free of charge up to [X] days before arrival. Cancellations made within [X] days of arrival will incur a charge of [X]% of the total booking value. No-shows will be charged the full amount of the reservation.]</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">4. Check-in &amp; Check-out</h2>
            <p>Check-in is from 15:00 and check-out is by 11:00. Early check-in and late check-out may be available upon request, subject to availability and any applicable supplement.</p>
            <p className="mt-3">Guests must present a valid government-issued photo ID at check-in. The lead guest must be at least 18 years of age.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">5. Payment</h2>
            <p>Payment terms are as specified at the time of booking. We accept [list accepted payment methods]. A credit card may be required to guarantee your reservation.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">6. Property Rules</h2>
            <p>Guests are expected to respect the property and other guests. Althea Resorts reserves the right to request departure without refund from guests whose behaviour is disruptive or causes damage to the property or other guests.</p>
            <p className="mt-3">Smoking is not permitted in rooms or enclosed public areas of the resort. Designated smoking areas are available.</p>
            <p className="mt-3">Pets may be permitted in certain room categories subject to prior arrangement and applicable charges. Please contact us in advance.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">7. Liability</h2>
            <p>Althea Resorts shall not be liable for any loss, damage, or injury to guests or their property except where caused by our negligence. Guests are responsible for the safekeeping of their valuables. In-room safes are available in all rooms.</p>
            <p className="mt-3">We shall not be liable for failure to perform our obligations where such failure results from circumstances beyond our reasonable control (&ldquo;force majeure&rdquo;).</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">8. Website Use</h2>
            <p>The content of this website is for general information purposes only. We reserve the right to modify, update, or remove content at any time without notice. Reproduction of any part of this website without prior written consent is prohibited.</p>
            <p className="mt-3">We are not responsible for the content of external websites linked from this site.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">9. Intellectual Property</h2>
            <p>All content on this website — including text, images, logos, and design — is the property of Althea Resorts or its licensors and is protected by applicable intellectual property laws. Unauthorised use is prohibited.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">10. Governing Law</h2>
            <p>These Terms are governed by the laws of Greece. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Corinth.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">11. Changes to These Terms</h2>
            <p>We may update these Terms from time to time. The current version will always be available at <a href={`${SITE_URL}/terms`} className="text-deep hover:text-gold transition-colors">{SITE_URL}/terms</a>. Continued use of our website following any changes constitutes your acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">12. Contact</h2>
            <p>For any questions about these Terms, please contact us:</p>
            <address className="not-italic mt-3">
              {email && <>Email: <a href={`mailto:${email}`} className="text-deep hover:text-gold transition-colors">{email}</a><br /></>}
              {phone && <>Phone: <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-deep hover:text-gold transition-colors">{phone}</a></>}
            </address>
          </section>

        </div>
      </div>
    </main>
  )
}
