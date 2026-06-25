'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ManageLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const locale = searchParams.get('locale') === 'el' ? 'el' : 'en'
  const fromPath = searchParams.get('from') || '/manage'
  const errorParam = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const labels = {
    en: {
      heading: 'Sign in to manage your content',
      sub: 'Althea Resorts — Content Manager',
      email: 'Email address',
      password: 'Password',
      submit: 'Sign in',
      loading: 'Signing in…',
      errorCreds: 'Invalid email or password.',
      errorAccess: 'Access denied. Your account does not have permission to use this panel.',
    },
    el: {
      heading: 'Συνδεθείτε για να διαχειριστείτε το περιεχόμενο',
      sub: 'Althea Resorts — Διαχείριση περιεχομένου',
      email: 'Διεύθυνση email',
      password: 'Κωδικός πρόσβασης',
      submit: 'Σύνδεση',
      loading: 'Σύνδεση…',
      errorCreds: 'Λανθασμένο email ή κωδικός.',
      errorAccess: 'Απαγορεύεται η πρόσβαση.',
    },
  }[locale]

  useEffect(() => {
    if (errorParam === 'access_denied') setError(labels.errorAccess)
  }, [errorParam, labels.errorAccess])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(labels.errorCreds)
        return
      }

      const role = data?.user?.role
      if (role !== 'superadmin' && role !== 'admin' && role !== 'client') {
        await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
        setError(labels.errorAccess)
        return
      }

      router.push(fromPath)
    } catch {
      setError(labels.errorCreds)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logos/althea_logo_white-f.png"
            alt="Althea Resorts"
            className="h-12 w-auto mx-auto mb-4"
          />
          <h1 className="text-white text-xl font-medium">{labels.heading}</h1>
          <p className="text-white/40 text-sm mt-1">{labels.sub}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#102027] mb-1.5">
                {labels.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 border border-[#e8e4dd] rounded-lg text-[#102027] text-sm focus:outline-none focus:ring-2 focus:ring-[#ad8b27]/30 focus:border-[#ad8b27] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#102027] mb-1.5">
                {labels.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 border border-[#e8e4dd] rounded-lg text-[#102027] text-sm focus:outline-none focus:ring-2 focus:ring-[#ad8b27]/30 focus:border-[#ad8b27] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ad8b27] hover:bg-[#9a7d22] disabled:opacity-60 text-white font-medium py-2.5 px-6 rounded-lg text-sm transition-colors"
            >
              {loading ? labels.loading : labels.submit}
            </button>
          </form>

          {/* Locale toggle */}
          <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-[#e8e4dd]">
            <a
              href="/manage/login?locale=en"
              className={`text-xs ${locale === 'en' ? 'text-[#ad8b27] font-medium' : 'text-[#6b6b6b] hover:text-[#102027]'}`}
            >
              English
            </a>
            <span className="text-[#e8e4dd]">|</span>
            <a
              href="/manage/login?locale=el"
              className={`text-xs ${locale === 'el' ? 'text-[#ad8b27] font-medium' : 'text-[#6b6b6b] hover:text-[#102027]'}`}
            >
              Ελληνικά
            </a>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} Althea Resorts
        </p>
      </div>
    </div>
  )
}
