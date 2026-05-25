import React from 'react'

export default function Logo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 12px',
      }}
    >
      <img
        src="/logos/althea_logo_sqr.png"
        alt="Althea Resorts"
        style={{ height: '40px', width: '40px', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}
