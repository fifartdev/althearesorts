import { generateMetadata as genMeta, SITE_URL } from '@/lib/seo'
import { getContactInfo } from '@/lib/cms'

export const metadata = genMeta({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Althea Resorts — how we collect, use, and protect your personal data in accordance with GDPR.',
  keywords: ['Althea Resorts privacy policy', 'GDPR', 'data protection'],
  canonical: `${SITE_URL}/privacy-policy`,
})

export default async function PrivacyPolicyPage() {
  const contactInfo = await getContactInfo()
  const phone: string | undefined = (contactInfo as any)?.phone || undefined
  const email: string | undefined = (contactInfo as any)?.email || undefined
  const address: string | undefined = (contactInfo as any)?.address || undefined
  return (
    <main id="main-content" className="pt-40 pb-24 lg:pt-56 lg:pb-32 bg-white">
      <div className="container-luxury max-w-3xl">

        {/* LEGAL REVIEW NOTICE — remove after solicitor sign-off */}
        <div className="mb-10 p-6 border-2 border-gold bg-cream">
          <p className="text-xs uppercase tracking-widest text-gold font-medium mb-2">Action Required — Legal Review</p>
          <p className="text-sm text-smoke font-light">This Privacy Policy must be reviewed and approved by a qualified legal professional before publication. Outstanding items: (1) confirm legal entity name and company registration details in Section 1; (2) confirm data retention period in Section 5.</p>
        </div>

        <h1 className="text-display-lg text-deep mb-4">Privacy Policy</h1>
        <p className="text-sm text-smoke font-light mb-12">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none text-smoke font-light leading-loose space-y-8">

          <section>
            <h2 className="text-lg font-light text-deep mb-4">1. Data Controller</h2>
            <p>
              Althea Resorts (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is the data controller responsible for your personal data. Our contact details are:
            </p>
            <address className="not-italic mt-3">
              <strong className="text-deep font-light">Althea Resorts</strong><br />
              {address && <>{address}<br /></>}
              {email && <>Email: <a href={`mailto:${email}`} className="text-deep hover:text-gold transition-colors">{email}</a><br /></>}
              {phone && <>Phone: <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-deep hover:text-gold transition-colors">{phone}</a></>}
            </address>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">2. Personal Data We Collect</h2>
            <p>We collect and process the following categories of personal data:</p>
            <ul className="list-none space-y-2 mt-3">
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Contact and enquiry data</strong>: name, email address, phone number, and message content submitted via our contact form.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Booking data</strong>: reservation details processed by our third-party booking system (Reserve Online). Please refer to their privacy policy for data processed through that platform.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Technical data</strong>: IP address, browser type, pages visited, and time spent on our website, collected via Google Analytics (GA4).</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Cookie data</strong>: as described in our Cookie Policy below.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">3. Legal Basis for Processing</h2>
            <p>We process your personal data on the following legal bases under GDPR (Article 6):</p>
            <ul className="list-none space-y-2 mt-3">
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Contractual necessity</strong>: to fulfil a reservation or respond to a pre-contractual enquiry.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Legitimate interests</strong>: to improve our website and services through analytics, and to protect our business against fraud.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Consent</strong>: for non-essential cookies and any direct marketing communications. You may withdraw consent at any time.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Legal obligation</strong>: where we are required to retain records by law (e.g. tax and accounting obligations).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">4. How We Use Your Data</h2>
            <p>We use your personal data to:</p>
            <ul className="list-none space-y-2 mt-3">
              <li><span className="text-gold mr-2">—</span>Respond to enquiries submitted via our contact form.</li>
              <li><span className="text-gold mr-2">—</span>Process and manage accommodation reservations.</li>
              <li><span className="text-gold mr-2">—</span>Improve our website through aggregated analytics.</li>
              <li><span className="text-gold mr-2">—</span>Comply with legal and regulatory obligations.</li>
            </ul>
            <p className="mt-3">We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">5. Data Retention</h2>
            <p>We retain your personal data for as long as necessary to fulfil the purposes set out in this policy, unless a longer retention period is required by law. Contact form submissions are retained for 24 months. Analytics data is retained in accordance with Google Analytics default settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">6. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-none space-y-2 mt-3">
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Google Analytics (GA4)</strong>: website analytics. Data may be transferred to the United States under Standard Contractual Clauses.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Reserve Online</strong>: our booking engine. Please review their privacy policy at their platform.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Vercel</strong>: website hosting. Servers are located within the European Union or covered by appropriate data transfer mechanisms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">7. Your Rights</h2>
            <p>Under GDPR, you have the following rights regarding your personal data:</p>
            <ul className="list-none space-y-2 mt-3">
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Right of access</strong>: to receive a copy of the data we hold about you.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Right to rectification</strong>: to request correction of inaccurate data.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Right to erasure</strong>: to request deletion of your data (&ldquo;right to be forgotten&rdquo;).</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Right to restriction</strong>: to request that we limit processing of your data.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Right to data portability</strong>: to receive your data in a structured, machine-readable format.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Right to object</strong>: to object to processing based on legitimate interests.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Right to withdraw consent</strong>: where processing is based on consent, you may withdraw it at any time.</li>
            </ul>
            {email && (
              <p className="mt-3">To exercise any of these rights, please contact us at <a href={`mailto:${email}`} className="text-deep hover:text-gold transition-colors">{email}</a>. You also have the right to lodge a complaint with the Hellenic Data Protection Authority (HDPA) at <a href="https://www.dpa.gr" target="_blank" rel="noopener noreferrer" className="text-deep hover:text-gold transition-colors">www.dpa.gr</a>.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">8. Cookies</h2>
            <p>We use cookies to improve your browsing experience and analyse site traffic. When you first visit our website, you will be asked to consent to non-essential cookies. You may change your cookie preferences at any time by clearing your browser cookies and revisiting our site.</p>
            <p className="mt-3">We use the following types of cookies:</p>
            <ul className="list-none space-y-2 mt-3">
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Strictly necessary cookies</strong>: required for the website to function. These cannot be disabled.</li>
              <li><span className="text-gold mr-2">—</span><strong className="text-deep font-light">Analytics cookies</strong>: Google Analytics cookies that help us understand how visitors interact with our site (only set with your consent).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">9. Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. Our website is served over HTTPS. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. The most recent version will always be available at <a href={`${SITE_URL}/privacy-policy`} className="text-deep hover:text-gold transition-colors">{SITE_URL}/privacy-policy</a>. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="text-lg font-light text-deep mb-4">11. Contact</h2>
            <p>For any questions about this Privacy Policy or how we handle your data, please contact us:</p>
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
