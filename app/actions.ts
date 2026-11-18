'use server'

import { headers } from 'next/headers'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message: string
  errors?: Record<string, string>
  reference?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

async function isRateLimited() {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

function text(fd: FormData, key: string, max = 500) {
  return String(fd.get(key) ?? '').trim().slice(0, max)
}

type Rule = { key: string; label: string; required?: boolean; email?: boolean; max?: number }

async function guard(fd: FormData, rules: Rule[]) {
  // Honeypot: real visitors never see or fill this field.
  if (text(fd, 'company_website')) {
    return { blocked: true as const, state: { status: 'success', message: 'Thank you.' } satisfies FormState }
  }
  if (await isRateLimited()) {
    return {
      blocked: true as const,
      state: { status: 'error', message: 'Too many submissions. Please wait a minute and try again.' } satisfies FormState,
    }
  }
  const errors: Record<string, string> = {}
  const values: Record<string, string> = {}
  for (const r of rules) {
    const v = text(fd, r.key, r.max ?? 500)
    values[r.key] = v
    if (r.required && !v) errors[r.key] = `${r.label} is required.`
    else if (r.email && v && !EMAIL_RE.test(v)) errors[r.key] = 'Enter a valid email address, like name@example.com.'
  }
  if (Object.keys(errors).length) {
    return {
      blocked: true as const,
      state: { status: 'error', message: 'Please fix the highlighted fields.', errors } satisfies FormState,
    }
  }
  return { blocked: false as const, values }
}

function reference(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`
}

export async function subscribeNewsletter(_: FormState, fd: FormData): Promise<FormState> {
  const g = await guard(fd, [{ key: 'email', label: 'Email', required: true, email: true }])
  if (g.blocked) return g.state
  return { status: 'success', message: 'You’re subscribed. Look out for our next update.' }
}

export async function submitContact(_: FormState, fd: FormData): Promise<FormState> {
  const g = await guard(fd, [
    { key: 'name', label: 'Name', required: true },
    { key: 'email', label: 'Email', required: true, email: true },
    { key: 'subject', label: 'Subject', required: true },
    { key: 'message', label: 'Message', required: true, max: 3000 },
  ])
  if (g.blocked) return g.state
  return { status: 'success', message: 'Thank you. Our team will reply within 3 working days.', reference: reference('CT') }
}

export async function submitPartnership(_: FormState, fd: FormData): Promise<FormState> {
  const g = await guard(fd, [
    { key: 'organisation', label: 'Organisation', required: true },
    { key: 'name', label: 'Contact name', required: true },
    { key: 'email', label: 'Email', required: true, email: true },
    { key: 'type', label: 'Partner type', required: true },
    { key: 'focus', label: 'Focus area', required: true },
    { key: 'message', label: 'Message', required: true, max: 3000 },
  ])
  if (g.blocked) return g.state
  return {
    status: 'success',
    message: 'Thank you for reaching out. Our partnerships team will be in touch within 5 working days.',
    reference: reference('PT'),
  }
}

export async function submitInterest(_: FormState, fd: FormData): Promise<FormState> {
  const g = await guard(fd, [
    { key: 'name', label: 'Name', required: true },
    { key: 'contact', label: 'Phone or email', required: true },
    { key: 'state', label: 'State / LGA', required: true },
    { key: 'age', label: 'Age band', required: true },
    { key: 'programme', label: 'Programme', required: true },
  ])
  if (g.blocked) return g.state
  if (!fd.get('consent')) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors: { consent: 'Please agree so we can contact you.' } }
  }
  return {
    status: 'success',
    message: 'Thank you. We’ll contact you when a programme opens in your area.',
    reference: reference('AP'),
  }
}

export async function submitVolunteer(_: FormState, fd: FormData): Promise<FormState> {
  const g = await guard(fd, [
    { key: 'name', label: 'Name', required: true },
    { key: 'email', label: 'Email', required: true, email: true },
    { key: 'role', label: 'Role', required: true },
    { key: 'motivation', label: 'Motivation', required: true, max: 2000 },
  ])
  if (g.blocked) return g.state
  if (!fd.get('consent')) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors: { consent: 'Please agree to continue.' } }
  }
  return { status: 'success', message: 'Application received. We’ll review it and reply by email.', reference: reference('VL') }
}

export async function startDonation(_: FormState, fd: FormData): Promise<FormState> {
  const g = await guard(fd, [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email', required: true, email: true },
    { key: 'frequency', label: 'Frequency', required: true },
    { key: 'currency', label: 'Currency', required: true },
  ])
  if (g.blocked) return g.state
  const custom = Number(text(fd, 'custom_amount'))
  const preset = Number(text(fd, 'amount'))
  const amount = custom > 0 ? custom : preset
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100_000_000) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors: { amount: 'Choose or enter a valid amount.' } }
  }
  return {
    status: 'success',
    message:
      'Thank you for your generosity. Online card payments are being activated with our payment partner. Please use the bank transfer details below with this reference so we can send your receipt.',
    reference: reference('DN'),
  }
}
