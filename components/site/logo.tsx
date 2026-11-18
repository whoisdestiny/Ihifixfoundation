import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Ihifix Innovation Foundation home"
      className={cn(
        'flex flex-none items-center gap-2.5 rounded-sm no-underline',
        inverted ? 'text-primary-foreground' : 'text-foreground',
        className,
      )}
    >
      <span aria-hidden="true" className="text-[1.6rem] font-bold lowercase leading-none tracking-[-0.045em]">
        ihifi<span className={inverted ? 'text-[var(--night-brand)]' : 'text-brand'}>x</span>
      </span>
      <span aria-hidden="true" className={cn('h-6 w-px', inverted ? 'bg-on-primary-muted/50' : 'bg-line')} />
      <span
        aria-hidden="true"
        className={cn(
          'flex flex-col text-[0.6875rem] font-semibold leading-[1.15] tracking-[0.01em]',
          inverted ? 'text-on-primary-muted' : 'text-text-2',
        )}
      >
        <span>Innovation</span>
        <span>Foundation</span>
      </span>
    </Link>
  )
}
