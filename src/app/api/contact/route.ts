import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSettings } from '@/lib/wp/api'
import { FORM_TYPES, saveSubmission, submissionsAdminUrl, type FormType, type Submission } from '@/lib/wp/submissions'

const FORM_TYPE_LABELS: Record<FormType, string> = {
  reservation: 'Reservation Enquiry',
  wedding: 'Wedding Enquiry',
  corporate: 'Corporate Events',
  restaurant: 'Restaurant Reservation',
  contact: 'Contact',
  general: 'General Enquiry',
}

const EMAIL = /^[^\s@<>,]+@[^\s@<>,]+\.[a-z]{2,}$/i

const MAX_LENGTH = { name: 200, email: 200, phone: 50, subject: 300, message: 10_000 }

const field = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

function emailHtml(s: Submission, typeLabel: string): string {
  const e = {
    name: escapeHtml(s.name),
    email: escapeHtml(s.email),
    phone: escapeHtml(s.phone ?? ''),
    subject: escapeHtml(s.subject ?? ''),
    message: escapeHtml(s.message),
  }
  const adminUrl = submissionsAdminUrl()
  return `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#102027">
            <div style="background:#102027;padding:24px 32px">
              <img src="https://www.althearesorts.com/logos/althea_logo_white-f.png" height="36" alt="Althea Resorts" />
            </div>
            <div style="padding:32px;border:1px solid #e8e4dd;border-top:none">
              <p style="margin:0 0 8px 0;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#ad8b27">${typeLabel}</p>
              <h2 style="margin:0 0 24px 0;font-size:20px">New enquiry from ${e.name}</h2>
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#6b6b6b;width:120px">Name</td><td style="padding:8px 0">${e.name}</td></tr>
                <tr><td style="padding:8px 0;color:#6b6b6b">Email</td><td style="padding:8px 0"><a href="mailto:${e.email}" style="color:#102027">${e.email}</a></td></tr>
                ${e.phone ? `<tr><td style="padding:8px 0;color:#6b6b6b">Phone</td><td style="padding:8px 0">${e.phone}</td></tr>` : ''}
                ${e.subject ? `<tr><td style="padding:8px 0;color:#6b6b6b">Subject</td><td style="padding:8px 0">${e.subject}</td></tr>` : ''}
              </table>
              <hr style="border:none;border-top:1px solid #e8e4dd;margin:24px 0" />
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#6b6b6b;margin:0 0 12px 0">Message</p>
              <p style="margin:0;line-height:1.7;white-space:pre-wrap">${e.message}</p>
              <hr style="border:none;border-top:1px solid #e8e4dd;margin:24px 0" />
              <p style="font-size:12px;color:#6b6b6b;margin:0">
                Reply directly to this email to respond to ${e.name}.${adminUrl ? `
                View all submissions in <a href="${escapeHtml(adminUrl)}" style="color:#ad8b27">WordPress</a>.` : ''}
              </p>
            </div>
          </div>
        `
}

async function sendEmail(s: Submission, typeLabel: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_api_key_here') return false
  const resend = new Resend(process.env.RESEND_API_KEY)
  // Recipient(s) from WordPress (Settings → Contact form notifications to), else the env default.
  const fromCms = ((await getSettings()).form_recipient ?? '').split(',').map((a) => a.trim()).filter((a) => EMAIL.test(a))
  const to = fromCms.length ? fromCms : (process.env.RESEND_TO ?? 'reservations@althearesorts.com')
  const from = process.env.RESEND_FROM ?? 'noreply@althearesorts.com'
  const { error } = await resend.emails.send({
    from: `Althea Resorts Website <${from}>`,
    to,
    replyTo: s.email,
    subject: `[${typeLabel}] New enquiry from ${s.name.replace(/[\r\n]+/g, ' ')}`,
    html: emailHtml(s, typeLabel),
  })
  if (error) throw new Error(error.message)
  return true
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const formType = FORM_TYPES.includes(body.formType as FormType) ? (body.formType as FormType) : 'contact'
  const submission: Submission = {
    name: field(body.name, MAX_LENGTH.name),
    email: field(body.email, MAX_LENGTH.email),
    phone: field(body.phone, MAX_LENGTH.phone) || undefined,
    formType,
    subject: field(body.subject, MAX_LENGTH.subject) || undefined,
    message: field(body.message, MAX_LENGTH.message),
  }
  if (!submission.name || !submission.email || !submission.message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  const typeLabel = FORM_TYPE_LABELS[formType]

  // 1. Save to WordPress and 2. send the notification email. The visitor only sees an error if
  // neither worked, so a WordPress outage or an email failure alone never loses the enquiry.
  const [saved, emailed] = await Promise.allSettled([
    saveSubmission(submission, `${typeLabel} — ${submission.name}`),
    sendEmail(submission, typeLabel),
  ])
  if (saved.status === 'rejected') console.error('[contact route] WordPress:', saved.reason)
  if (emailed.status === 'rejected') console.error('[contact route] Resend:', emailed.reason)

  if (saved.status === 'fulfilled' || (emailed.status === 'fulfilled' && emailed.value)) {
    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
}
