'use client'

import { useActionState, useState } from 'react'
import { Lock } from 'lucide-react'
import { startDonation } from '@/app/actions'
import { FormMessage, Honeypot, SelectField, SubmitButton, TextField, initialFormState } from './fields'
import { programmes } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const presets: Record<string, { symbol: string; amounts: number[] }> = {
  NGN: { symbol: '₦', amounts: [5000, 10000, 25000, 50000] },
  USD: { symbol: '$', amounts: [10, 25, 50, 100] },
  GBP: { symbol: '£', amounts: [10, 25, 50, 100] },
  EUR: { symbol: '€', amounts: [10, 25, 50, 100] },
}

const impactHint: Record<number, string> = {
  0: 'Helps cover learning materials for a participant.',
  1: 'Supports a week of digital skills training for a young person.',
  2: 'Funds mentoring for a woman-led micro-business.',
  3: 'Helps bring a community town hall to life.',
}

function Segmented({
  name,
  legend,
  value,
  onChange,
  options,
}: {
  name: string
  legend: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold text-foreground">{legend}</legend>
      <div className="seg">
        {options.map((o) => (
          <label key={o.value} className={cn(value === o.value && 'is-selected')}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function DonationForm() {
  const [state, action] = useActionState(startDonation, initialFormState)
  const [frequency, setFrequency] = useState('one-time')
  const [currency, setCurrency] = useState('NGN')
  const [amount, setAmount] = useState(String(presets.NGN.amounts[1]))
  const [custom, setCustom] = useState('')
  const e = state.errors ?? {}
  const { symbol, amounts } = presets[currency]
  const selectedIndex = amounts.findIndex((a) => String(a) === amount)

  return (
    <form action={action} className="relative flex flex-col gap-6" noValidate>
      <Honeypot />
      <Segmented
        name="frequency"
        legend="How often?"
        value={frequency}
        onChange={setFrequency}
        options={[
          { value: 'one-time', label: 'One-time' },
          { value: 'monthly', label: 'Monthly' },
        ]}
      />

      <Segmented
        name="currency"
        legend="Currency"
        value={currency}
        onChange={(c) => {
          setCurrency(c)
          setAmount(String(presets[c].amounts[1]))
          setCustom('')
        }}
        options={Object.keys(presets).map((c) => ({ value: c, label: c }))}
      />

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 text-sm font-semibold text-foreground">Amount</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {amounts.map((a) => (
            <label key={a} className={cn('amount', !custom && String(a) === amount && 'is-selected')}>
              <input
                type="radio"
                name="amount"
                value={a}
                checked={!custom && String(a) === amount}
                onChange={() => {
                  setAmount(String(a))
                  setCustom('')
                }}
                className="sr-only"
              />
              {symbol}
              {a.toLocaleString()}
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="custom_amount" className="text-sm font-semibold text-foreground">
            Or enter another amount <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <div className="field-control flex items-center py-0! focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--accent)]">
            <span className="text-base font-semibold text-text-3" aria-hidden="true">
              {symbol}
            </span>
            <input
              id="custom_amount"
              name="custom_amount"
              type="number"
              inputMode="numeric"
              min={1}
              value={custom}
              onChange={(ev) => setCustom(ev.target.value)}
              aria-invalid={e.amount ? true : undefined}
              aria-describedby={e.amount ? 'amount-error' : undefined}
              className="h-12 w-full bg-transparent px-2 text-base text-foreground outline-none"
            />
          </div>
          {e.amount && (
            <p id="amount-error" className="text-sm font-medium text-destructive">
              {e.amount}
            </p>
          )}
        </div>
        {!custom && selectedIndex >= 0 && (
          <p className="text-sm leading-relaxed text-muted-foreground">{impactHint[selectedIndex]}</p>
        )}
      </fieldset>

      <SelectField
        name="designation"
        label="Direct my gift to"
        defaultValue="Where it’s needed most"
        options={['Where it’s needed most', ...programmes.map((p) => p.title)]}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Full name" autoComplete="name" />
        <TextField name="email" label="Email for your receipt" type="email" required autoComplete="email" error={e.email} />
      </div>

      <FormMessage state={state} />

      <SubmitButton className="w-full">
        <Lock className="size-4" aria-hidden="true" />
        {frequency === 'monthly' ? 'Give monthly' : 'Give now'}
        {' · '}
        {symbol}
        {Number(custom || amount || 0).toLocaleString()}
      </SubmitButton>
      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Payments are processed securely by our payment partner. Card details are never stored on Ihifix servers.
      </p>
    </form>
  )
}
