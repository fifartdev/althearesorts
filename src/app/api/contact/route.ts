import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Resend } from 'resend'

const FORM_TYPE_LABELS: Record<string, string> = {
  reservation: 'Reservation Enquiry',
  wedding: 'Wedding Enquiry',
  corporate: 'Corporate Events',
  restaurant: 'Restaurant Reservation',
  contact: 'Contact',
  general: 'General Enquiry',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, formType, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    // 1. Save to Payload CMS
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'form-submissions',
      data: {
        name,
        email,
        phone: phone || undefined,
        formType: formType || 'contact',
        subject: subject || undefined,
        message,
        status: 'new',
      },
    })

    // 2. Send notification email via Resend (non-blocking — failure doesn't affect the submission)
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_api_key_here') {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const typeLabel = FORM_TYPE_LABELS[formType] ?? formType ?? 'Contact'
      const to = process.env.RESEND_TO ?? 'reservations@althearesorts.com'
      const from = process.env.RESEND_FROM ?? 'noreply@althearesorts.com'

      await resend.emails.send({
        from: `Althea Resorts Website <${from}>`,
        to,
        replyTo: email,
        subject: `[${typeLabel}] New enquiry from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#102027">
            <div style="background:#102027;padding:24px 32px">
              <img src="https://althearesorts.com/logos/althea_logo_white-f.png" height="36" alt="Althea Resorts" />
            </div>
            <div style="padding:32px;border:1px solid #e8e4dd;border-top:none">
              <p style="margin:0 0 8px 0;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#ad8b27">${typeLabel}</p>
              <h2 style="margin:0 0 24px 0;font-size:20px">New enquiry from ${name}</h2>
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#6b6b6b;width:120px">Name</td><td style="padding:8px 0">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#6b6b6b">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#102027">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding:8px 0;color:#6b6b6b">Phone</td><td style="padding:8px 0">${phone}</td></tr>` : ''}
                ${subject ? `<tr><td style="padding:8px 0;color:#6b6b6b">Subject</td><td style="padding:8px 0">${subject}</td></tr>` : ''}
              </table>
              <hr style="border:none;border-top:1px solid #e8e4dd;margin:24px 0" />
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#6b6b6b;margin:0 0 12px 0">Message</p>
              <p style="margin:0;line-height:1.7;white-space:pre-wrap">${message}</p>
              <hr style="border:none;border-top:1px solid #e8e4dd;margin:24px 0" />
              <p style="font-size:12px;color:#6b6b6b;margin:0">
                Reply directly to this email to respond to ${name}.
                View all submissions in the <a href="https://althearesorts.com/admin/collections/form-submissions" style="color:#ad8b27">CMS dashboard</a>.
              </p>
            </div>
          </div>
        `,
      }).catch((err) => {
        // Log but don't fail the request if email delivery fails
        console.error('[contact route] Resend error:', err)
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}
