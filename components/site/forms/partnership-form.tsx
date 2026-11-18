'use client'

import { useActionState } from 'react'
import { submitPartnership } from '@/app/actions'
import { FormMessage, Honeypot, SelectField, SubmitButton, TextAreaField, TextField, initialFormState } from './fields'
import { programmes } from '@/lib/site-data'

export function PartnershipForm() {
  const [state, action] = useActionState(submitPartnership, initialFormState)
  const e = state.errors ?? {}

  return (
    <form action={action} className="relative flex flex-col gap-5" noValidate>
      <Honeypot />
      <TextField name="organisation" label="Organisation" required autoComplete="organization" error={e.organisation} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Contact name" required autoComplete="name" error={e.name} />
        <TextField name="email" label="Work email" type="email" required autoComplete="email" error={e.email} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          name="type"
          label="Partner type"
          required
          error={e.type}
          options={['Funder', 'Government', 'CSO / NGO', 'Corporate', 'Technical']}
        />
        <SelectField
          name="focus"
          label="Focus area"
          required
          error={e.focus}
          options={[...programmes.map((p) => p.title), 'Multiple / not sure yet']}
        />
      </div>
      <TextAreaField
        name="message"
        label="Tell us about your goals"
        required
        hint="Objectives, geography, timeline and budget range if known."
        error={e.message}
      />
      <FormMessage state={state} />
      <SubmitButton className="self-start">Submit enquiry</SubmitButton>
    </form>
  )
}
