'use client'

import { useActionState } from 'react'
import { submitVolunteer } from '@/app/actions'
import {
  ConsentField,
  FormMessage,
  Honeypot,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  initialFormState,
} from './fields'
import { opportunities } from '@/lib/site-data'

export function VolunteerForm() {
  const [state, action] = useActionState(submitVolunteer, initialFormState)
  const e = state.errors ?? {}

  return (
    <form action={action} className="relative flex flex-col gap-5" noValidate>
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Full name" required autoComplete="name" error={e.name} />
        <TextField name="email" label="Email" type="email" required autoComplete="email" error={e.email} />
      </div>
      <SelectField
        name="role"
        label="Role"
        required
        error={e.role}
        options={[...opportunities.map((o) => o.role), 'General volunteering']}
      />
      <TextField name="cv_link" label="Link to CV or LinkedIn" type="url" />
      <TextAreaField name="motivation" label="Why do you want to join us?" rows={4} required error={e.motivation} />
      <ConsentField label="I consent to the Foundation storing my application for recruitment purposes." error={e.consent} />
      <FormMessage state={state} />
      <SubmitButton className="self-start">Submit application</SubmitButton>
    </form>
  )
}
