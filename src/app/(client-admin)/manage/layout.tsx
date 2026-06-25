import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/client-admin/Sidebar'
import type { ManageLocale } from '@/lib/manage-i18n'
import { getLocale } from '@/lib/manage-i18n'

export const metadata: Metadata = {
  title: 'Althea Resorts — Content Manager',
  robots: { index: false, follow: false },
}

export default async function ManageLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode
  searchParams?: Promise<{ locale?: string }>
}) {
  const cookieStore = await cookies()
  const requestHeaders = await headers()

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    redirect('/manage/login')
  }

  const role = (user as any)?.role
  if (role !== 'superadmin' && role !== 'admin' && role !== 'client') {
    redirect('/manage/login?error=access_denied')
  }

  const resolvedSearchParams = await searchParams
  const localeCookie = cookieStore.get('manage-locale')?.value
  const localeParam = resolvedSearchParams?.locale
  const locale: ManageLocale = getLocale(
    localeParam ?? localeCookie ?? (user as any)?.preferredLocale
  )

  const firstName = (user as any)?.firstName
  const lastName = (user as any)?.lastName
  const userName =
    firstName || lastName ? [firstName, lastName].filter(Boolean).join(' ') : undefined

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-[#faf8f4] min-h-screen font-sans antialiased">
        <div className="flex h-screen overflow-hidden">
          <aside className="w-60 shrink-0 h-full overflow-hidden">
            <Sidebar locale={locale} userEmail={user.email ?? undefined} userName={userName} />
          </aside>
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
