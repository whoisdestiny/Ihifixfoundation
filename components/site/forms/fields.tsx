'use client'

import { useFormStatus } from 'react-dom'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import type { FormState } from '@/app/actions'
import { cn } from '@/lib/utils'

export const initialFormState: FormState = { status: 'idle', message: '' }

const control = 'field-control'

type BaseProps = { name: string; label: string; error?: string; required?: boolean; hint?: string; className?: string }

function FieldShell({
  name,
  label,
  error,
  required,
  hint,
  className,
  children,
}: BaseProps & { children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={name} className="text-sm font-semibold text-foreground">
        {label}
        {required ? (
          <span className="text-brand-text" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-text-3"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${name}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(name: string, error?: string, hint?: string) {
  return [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(' ') || undefined
}

export function TextField({
  type = 'text',
  autoComplete,
  ...props
}: BaseProps & { type?: string; autoComplete?: string }) {
  return (
    <FieldShell {...props}>
      <input
        id={props.name}
        name={props.name}
        type={type}
        autoComplete={autoComplete}
        required={props.required}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(props.name, props.error, props.hint)}
        className={control}
      />
    </FieldShell>
  )
}

export function TextAreaField(props: BaseProps & { rows?: number }) {
  return (
    <FieldShell {...props}>
      <textarea
        id={props.name}
        name={props.name}
        rows={props.rows ?? 5}
        required={props.required}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(props.name, props.error, props.hint)}
        className={control}
      />
    </FieldShell>
  )
}

export function SelectField({ options, defaultValue, ...props }: BaseProps & { options: string[]; defaultValue?: string }) {
  return (
    <FieldShell {...props}>
      <select
        id={props.name}
        name={props.name}
        required={props.required}
        defaultValue={defaultValue ?? ''}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(props.name, props.error, props.hint)}
        className={control}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export function ConsentField({ name = 'consent', label, error }: { name?: string; label: React.ReactNode; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
        <input
          type="checkbox"
          name={name}
          className="mt-1 size-4 shrink-0 accent-[var(--brand)]"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={`${name}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'btn btn-primary',
        className,
      )}
    >
      {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}

export function FormMessage({ state }: { state: FormState }) {
  if (state.status === 'idle') return null
  const success = state.status === 'success'
  return (
    <div
      role={success ? 'status' : 'alert'}
      className={cn(
        'flex gap-3 rounded-[var(--radius-s)] p-4 text-sm leading-relaxed',
        success ? 'bg-panel text-foreground' : 'bg-[var(--error-wash)] text-destructive',
      )}
    >
      {success ? (
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      )}
      <div className="flex flex-col gap-1">
        <p>{state.message}</p>
        {state.reference && (
          <p className="font-semibold">
            Reference: <span className="font-mono">{state.reference}</span>
          </p>
        )}
      </div>
    </div>
  )
}
