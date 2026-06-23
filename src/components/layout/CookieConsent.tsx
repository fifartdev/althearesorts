'use client'

import React, { useState, useEffect } from 'react'

const CONSENT_KEY = 'althea-cookie-consent'

const content = {
  en: {
    heading: 'We use cookies',
    body: 'We use cookies to enhance your browsing experience and analyse site traffic. You can accept all cookies or reject non-essential ones. Your choice will be remembered for future visits.',
    accept: 'Accept All',
    reject: 'Reject Non-Essential',
  },
  el: {
    heading: 'Χρησιμοποιούμε cookies',
    body: 'Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία πλοήγησής σας και να αναλύσουμε την επισκεψιμότητα του ιστότοπου. Μπορείτε να αποδεχτείτε όλα τα cookies ή να απορρίψετε τα μη απαραίτητα. Η επιλογή σας θα αποθηκευτεί για μελλοντικές επισκέψεις.',
    accept: 'Αποδοχή Όλων',
    reject: 'Απόρριψη Μη Απαραίτητων',
  },
}

export function CookieConsent({ locale = 'en' }: { locale?: 'en' | 'el' }) {
  const [visible, setVisible] = useState(false)
  const c = content[locale]

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#102027]/97 backdrop-blur-sm border-t border-white/10"
      role="dialog"
      aria-label={c.heading}
      aria-live="polite"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#ad8b27] mb-2 font-light">
            {c.heading}
          </p>
          <p className="text-xs font-light text-white/55 leading-relaxed max-w-2xl">
            {c.body}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="h-9 px-5
                       text-[10px] uppercase tracking-[0.2em] font-light
                       border border-white/20 text-white/50
                       hover:border-white/50 hover:text-white/80
                       transition-all duration-300"
          >
            {c.reject}
          </button>
          <button
            onClick={handleAccept}
            className="h-9 px-5
                       text-[10px] uppercase tracking-[0.2em] font-light
                       bg-[#ad8b27] text-white border border-[#ad8b27]
                       hover:bg-transparent hover:text-[#ad8b27]
                       transition-all duration-300"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
