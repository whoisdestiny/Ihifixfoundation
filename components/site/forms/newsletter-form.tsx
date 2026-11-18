'use client'

import { useActionState, useId } from 'react'
import { subscribeNewsletter } from '@/app/actions'
import { Honeypot, initialFormState } from './fields'
import { cn } from '@/lib/utils'

export function NewsletterForm({ inverted = false }: { inverted?: boolean }) {
  const [state, action, pending] = useActionState(subscribeNewsletter, initialFormState)
  const id = useId()

  return (
    <form action={action} className="relative flex flex-col gap-2">
      <Honeypot />
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={cn(
            'h-12 min-w-0 flex-1 rounded-full px-5 text-base',
            inverted
              ? 'bg-white/8 text-primary-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] placeholder:text-[var(--night-text-3)]'
              : 'field-control rounded-full!',
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            'btn shrink-0 h-12!',
            inverted ? 'btn-light' : 'btn-primary',
          )}
        >
          {pending ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      <p aria-live="polite" className={cn('text-sm', inverted ? 'text-on-primary-muted' : 'text-muted-foreground')}>
        {state.status !== 'idle' ? state.message : ''}
      </p>
    </form>
  )
}
