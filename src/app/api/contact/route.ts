import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, formType, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}
