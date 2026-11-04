import React from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let pathname = '/'
vi.mock('next/navigation', () => ({ usePathname: () => pathname }))

import { OfferPopup } from '@/components/layout/OfferPopup'

const offer = {
  id: 'festive-package-2026',
  eyebrow: 'Festive Package',
  heading: 'Christmas &amp; New Year<br><em>at Althea</em>',
  body: 'Celebrate the festive season at Althea.',
  includesLabel: 'The package includes',
  includes: ['Festive Christmas Eve dinner', '15% discount on all Spa treatments'],
  noteTitle: 'Stay Longer, Enjoy More!',
  noteText: 'Special rates for longer festive stays, up to 30% off.',
  ctaLabel: 'Book the Package',
  bookingUrl: 'https://althearesort.reserve-online.net',
  viewLabel: 'View the offer',
  viewHref: '/offers',
  closeLabel: 'Close',
}
const HOUR = 60 * 60 * 1000
const dialog = () => screen.queryByRole('dialog')
const showAfterDelay = () => act(() => { vi.advanceTimersByTime(800) })

describe('OfferPopup', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-12-01T10:00:00Z'))
    localStorage.clear()
    pathname = '/'
  })
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('shows the offer on a first visit, with its list and buttons', () => {
    render(<OfferPopup offer={offer} />)
    expect(dialog()).toBeNull()
    showAfterDelay()
    expect(dialog()).not.toBeNull()
    expect(screen.getByText('Festive Christmas Eve dinner')).toBeTruthy()
    expect(screen.getByText('Book the Package').getAttribute('href')).toBe(offer.bookingUrl)
    expect(screen.getByText('View the offer').getAttribute('href')).toBe('/offers')
    expect(screen.getByText('Stay Longer, Enjoy More!')).toBeTruthy()
  })

  it.each([
    ['the X', () => fireEvent.click(screen.getByLabelText('Close'))],
    ['a click outside', () => fireEvent.click(document.querySelector('[role="dialog"] > div')!)],
    ['Esc', () => fireEvent.keyDown(window, { key: 'Escape' })],
    ['the booking button', () => fireEvent.click(screen.getByText('Book the Package'))],
  ])('closes with %s and stays hidden for an hour, then shows again', (_, closeIt) => {
    const { unmount } = render(<OfferPopup offer={offer} />)
    showAfterDelay()
    act(() => closeIt())
    expect(dialog()).toBeNull()
    unmount()

    // Another page within the hour: hidden.
    vi.setSystemTime(Date.now() + HOUR - 60_000)
    render(<OfferPopup offer={offer} />)
    showAfterDelay()
    expect(dialog()).toBeNull()
    cleanup()

    // After an hour: back.
    vi.setSystemTime(Date.now() + 2 * 60_000)
    render(<OfferPopup offer={offer} />)
    showAfterDelay()
    expect(dialog()).not.toBeNull()
  })

  it('shows again on the next page if it was not closed', () => {
    const { rerender } = render(<OfferPopup offer={offer} />)
    showAfterDelay()
    expect(dialog()).not.toBeNull()
    pathname = '/spa'
    rerender(<OfferPopup offer={offer} />)
    showAfterDelay()
    expect(dialog()).not.toBeNull()
  })

  it('a different offer is not hidden by closing the previous one', () => {
    localStorage.setItem('althea-offer-popup:old-offer', String(Date.now()))
    render(<OfferPopup offer={offer} />)
    showAfterDelay()
    expect(dialog()).not.toBeNull()
  })
})
