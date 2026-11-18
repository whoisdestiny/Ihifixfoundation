'use client'

import { useActionState } from 'react'
import { submitContact } from '@/app/actions'
import { FormMessage, Honeypot, SelectField, SubmitButton, TextAreaField, TextField, initialFormState } from './fields'

export function ContactForm() {
  const [state, action] = useActionState(submitContact, initialFormState)
  const e = state.errors ?? {}

  return (
    <form action={action} className="relative flex flex-col gap-5" noValidate>
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Full name" required autoComplete="name" error={e.name} />
        <TextField name="email" label="Email" type="email" required autoComplete="email" error={e.email} />
      </div>
      <SelectField
        name="subject"
        label="What is this about?"
        required
        error={e.subject}
        options={['General enquiry', 'Media / press', 'Request a report', 'Donation question', 'Safeguarding concern', 'Other']}
      />
      <TextAreaField name="message" label="Message" required error={e.message} />
      <FormMessage state={state} />
      <SubmitButton className="self-start">Send message</SubmitButton>
    </form>
  )
}
