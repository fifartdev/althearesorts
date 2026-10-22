'use client'

import React, { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

/** Form texts in the page language, from the Contact page in WordPress. */
export type ContactFormTexts = {
  heading: string
  firstName: string
  lastName: string
  email: string
  phone: string
  phoneOptional: string
  subject: string
  message: string
  submit: string
  submitting: string
  successTitle: string
  successBody: string
  reset: string
  error: string
  ariaLabel: string
  types: { value: string; label: string }[]
}

export function ContactForm({ texts: c }: { texts: ContactFormTexts }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formType: 'reservation',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone || undefined,
          formType: form.formType,
          message: form.message,
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setStatus('success')
      setForm({ firstName: '', lastName: '', email: '', phone: '', formType: 'reservation', message: '' })
    } catch {
      setStatus('error')
      setErrorMsg(c.error)
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-6 py-10">
        <h3 className="text-label-upper text-[#102027] mb-2">{c.successTitle}</h3>
        <p className="text-sm font-light text-[#6b6b6b] leading-relaxed max-w-md">
          {c.successBody}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="h-11 px-7 inline-flex items-center self-start
                     text-xs uppercase tracking-[0.2em]
                     border border-[#102027] text-[#102027]
                     hover:bg-[#102027] hover:text-white
                     transition-all duration-500"
        >
          {c.reset}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label={c.ariaLabel} noValidate>
      <h3 className="text-label-upper text-[#102027] mb-2">{c.heading}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-xs uppercase tracking-wider text-[#6b6b6b]">
            {c.firstName}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={handleChange}
            className="h-11 px-4 border border-[#e8e4dd] text-sm font-light text-[#102027]
                       bg-transparent focus:outline-none focus:border-[#102027]
                       transition-colors duration-200 w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-xs uppercase tracking-wider text-[#6b6b6b]">
            {c.lastName}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={handleChange}
            className="h-11 px-4 border border-[#e8e4dd] text-sm font-light text-[#102027]
                       bg-transparent focus:outline-none focus:border-[#102027]
                       transition-colors duration-200 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs uppercase tracking-wider text-[#6b6b6b]">
            {c.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="h-11 px-4 border border-[#e8e4dd] text-sm font-light text-[#102027]
                       bg-transparent focus:outline-none focus:border-[#102027]
                       transition-colors duration-200 w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs uppercase tracking-wider text-[#6b6b6b]">
            {c.phone}{' '}
            <span className="normal-case tracking-normal text-[#6b6b6b]/60">{c.phoneOptional}</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="h-11 px-4 border border-[#e8e4dd] text-sm font-light text-[#102027]
                       bg-transparent focus:outline-none focus:border-[#102027]
                       transition-colors duration-200 w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="formType" className="text-xs uppercase tracking-wider text-[#6b6b6b]">
          {c.subject}
        </label>
        <select
          id="formType"
          name="formType"
          value={form.formType}
          onChange={handleChange}
          className="h-11 px-4 border border-[#e8e4dd] text-sm font-light text-[#102027]
                     bg-white focus:outline-none focus:border-[#102027]
                     transition-colors duration-200 w-full appearance-none"
        >
          {c.types.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs uppercase tracking-wider text-[#6b6b6b]">
          {c.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="px-4 py-3 border border-[#e8e4dd] text-sm font-light text-[#102027]
                     bg-transparent focus:outline-none focus:border-[#102027]
                     transition-colors duration-200 w-full resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="h-11 px-7 inline-flex items-center justify-center self-start
                   text-xs uppercase tracking-[0.2em]
                   bg-[#102027] text-white border border-[#102027]
                   hover:bg-transparent hover:text-[#102027]
                   transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? c.submitting : c.submit}
      </button>
    </form>
  )
}
