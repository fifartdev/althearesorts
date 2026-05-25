'use client'

import React, { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const FORM_TYPES = [
  { value: 'reservation', label: 'Reservation Enquiry' },
  { value: 'wedding', label: 'Wedding Enquiry' },
  { value: 'corporate', label: 'Corporate Events' },
  { value: 'restaurant', label: 'Restaurant Reservation' },
  { value: 'general', label: 'General Enquiry' },
]

export function ContactForm() {
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

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed.')
      }

      setStatus('success')
      setForm({ firstName: '', lastName: '', email: '', phone: '', formType: 'reservation', message: '' })
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err?.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-6 py-10">
        <h3 className="text-label-upper text-[#102027] mb-2">Message Sent</h3>
        <p className="text-sm font-light text-[#6b6b6b] leading-relaxed max-w-md">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="h-11 px-7 inline-flex items-center self-start
                     text-xs uppercase tracking-[0.2em]
                     border border-[#102027] text-[#102027]
                     hover:bg-[#102027] hover:text-white
                     transition-all duration-500"
        >
          Send Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label="Contact form" noValidate>
      <h3 className="text-label-upper text-[#102027] mb-2">Send a Message</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-xs uppercase tracking-wider text-[#6b6b6b]">
            First Name
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
            Last Name
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
            Email Address
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
            Phone <span className="normal-case tracking-normal text-[#6b6b6b]/60">(optional)</span>
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
          Subject
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
          {FORM_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs uppercase tracking-wider text-[#6b6b6b]">
          Message
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
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
