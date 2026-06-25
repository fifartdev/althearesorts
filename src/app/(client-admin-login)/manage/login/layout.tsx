import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — Althea Resorts Content Manager',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#102027] min-h-screen font-sans antialiased">{children}</body>
    </html>
  )
}
