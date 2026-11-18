'use client'

import { useActionState } from 'react'
import { submitInterest } from '@/app/actions'
import {
  ConsentField,
  FormMessage,
  Honeypot,
  SelectField,
  SubmitButton,
  TextField,
  initialFormState,
} from './fields'
import { programmes } from '@/lib/site-data'

export function InterestForm({ defaultProgramme }: { defaultProgramme?: string }) {
  const [state, action] = useActionState(submitInterest, initialFormState)
  const e = state.errors ?? {}

  return (
    <form action={action} className="relative flex flex-col gap-5" noValidate>
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Your name" required autoComplete="name" error={e.name} />
        <TextField name="contact" label="Phone or email" required autoComplete="tel" error={e.contact} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="state" label="State / LGA" required autoComplete="address-level1" error={e.state} />
        <SelectField
          name="age"
          label="Age band"
          required
          error={e.age}
          options={['Under 18', '18 – 24', '25 – 35', '36 – 50', 'Over 50']}
        />
      </div>
      <SelectField
        name="programme"
        label="Programme of interest"
        required
        error={e.programme}
        defaultValue={defaultProgramme}
        options={programmes.map((p) => p.title)}
      />
      <div className="callout">
        <p>
          <strong>Please note:</strong> sending this form does not guarantee a place. We use your details only to
          contact you about programmes. Please do not share health or personal history here. If you need support
          urgently, contact us directly.
        </p>
      </div>
      <ConsentField label="I agree that the Foundation may contact me about its programmes." error={e.consent} />
      <FormMessage state={state} />
      <SubmitButton className="self-start">Send my interest</SubmitButton>
    </form>
  )
}
