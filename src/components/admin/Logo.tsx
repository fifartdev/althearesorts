import React from 'react'

export default function Logo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 0',
      }}
    >
      <img
        src="/logos/althea_logo_white-f.png"
        alt="Althea Resorts"
        style={{ height: '38px', width: 'auto', display: 'block' }}
      />
    </div>
  )
}
