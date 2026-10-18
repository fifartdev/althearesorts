import 'server-only'

/**
 * Stores contact-form submissions in WordPress (Althea → Form submissions), as the dedicated
 * WP_FORMS_USER, whose role can only create submissions. Entries are always private.
 */

export const FORM_TYPES = ['reservation', 'wedding', 'corporate', 'restaurant', 'contact', 'general'] as const
export type FormType = (typeof FORM_TYPES)[number]

export type Submission = {
  name: string
  email: string
  phone?: string
  formType: FormType
  subject?: string
  message: string
}

function wpBase(): string | null {
  const url = process.env.WP_API_URL?.replace(/\/$/, '')
  return url && url.startsWith('https://') ? url : null
}

/** wp-admin list of submissions, for links in notification emails. */
export function submissionsAdminUrl(): string | null {
  const base = wpBase()
  return base ? base.replace(/\/wp-json$/, '') + '/wp-admin/edit.php?post_type=althea_submission' : null
}

export async function saveSubmission(s: Submission, title: string): Promise<void> {
  const base = wpBase()
  const user = process.env.WP_FORMS_USER
  const password = process.env.WP_FORMS_APP_PASSWORD
  if (!base || !user || !password) throw new Error('WordPress form submissions are not configured')

  const res = await fetch(`${base}/wp/v2/althea-submissions`, {
    method: 'POST',
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
    },
    body: JSON.stringify({
      title,
      status: 'private',
      meta: {
        name: s.name,
        email: s.email,
        phone: s.phone ?? '',
        form_type: s.formType,
        subject: s.subject ?? '',
        message: s.message,
        state: 'new',
      },
    }),
  })
  if (!res.ok) throw new Error(`WordPress responded ${res.status}`)
}
