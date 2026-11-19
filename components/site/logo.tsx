import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Ihifix Innovation Foundation home"
      className={cn('logo flex flex-none items-center gap-2.5 rounded-sm no-underline', className)}
    >
      <Image
        src={inverted ? '/images/ihifix-logo-white.png' : '/images/ihifix-logo.png'}
        alt=""
        width={592}
        height={200}
        priority={!inverted}
        className="logo-mark h-7 w-auto"
      />
      <span aria-hidden="true" className={cn('h-6 w-px', inverted ? 'bg-on-primary-muted/50' : 'bg-line')} />
      <span
        aria-hidden="true"
        className={cn(
          'flex flex-col text-[0.625rem] font-semibold leading-[1.2] tracking-[0.02em]',
          inverted ? 'text-on-primary-muted' : 'text-text-2',
        )}
      >
        <span>Innovation</span>
        <span>Foundation</span>
      </span>
    </Link>
  )
}
