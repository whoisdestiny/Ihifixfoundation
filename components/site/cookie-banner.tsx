'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

const KEY = 'ihifix-consent'
const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getSnapshot() {
  return window.localStorage.getItem(KEY)
}

function setConsent(value: 'all' | 'essential') {
  window.localStorage.setItem(KEY, value)
  listeners.forEach((l) => l())
}

export function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, () => 'pending-ssr')
  if (consent !== null) return null

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-[var(--radius-card)] bg-background p-5 shadow-[var(--shadow-float)] ring-1 ring-line md:inset-x-6 md:p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-foreground">
          We use essential cookies to run this site and, with your permission, privacy-respecting analytics to
          improve it, in line with the Nigeria Data Protection Act 2023 and GDPR.{' '}
          <Link href="/policies#privacy" className="inline-link">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setConsent('essential')}
            className="btn btn-ghost btn-sm"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => setConsent('all')}
            className="btn btn-ink btn-sm"
          >
            Accept all
          </button>
        </div>
      </div>
    </section>
  )
}
