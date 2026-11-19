import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Info } from 'lucide-react'
import type { Metric } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('wrap', className)}>{children}</div>
}

/** Wraps each word for the headline rise. Keeps the spaces so text reads and wraps normally. */
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="w" style={{ '--d': Math.min(start + i, 15) } as React.CSSProperties}>
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('eyebrow', className)}>{children}</p>
}

/** Section head: eyebrow and h2 on the left, lead (and an optional link) on the right from 900px. */
export function SectionHead({
  eyebrow,
  title,
  intro,
  action,
  id,
  className,
}: {
  eyebrow?: string
  title: string
  intro?: string
  action?: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <div className={cn('head-row', className)}>
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={id}>
          <Words text={title} />
        </h2>
      </div>
      {(intro || action) && (
        <div className="head-aside">
          {intro && <p className="lead">{intro}</p>}
          {action}
        </div>
      )}
    </div>
  )
}

/** Stacked heading for narrow columns (forms, two-column layouts). */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <div className={cn('flex max-w-2xl flex-col', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>
        <Words text={title} />
      </h2>
      {intro && <p className="lead">{intro}</p>}
    </div>
  )
}

export function PageHero({
  title,
  accent,
  intro,
  crumbs,
  art,
  children,
}: {
  title: string
  /** Optional second headline line, set in brand orange on its own line. */
  accent?: string
  intro?: string
  crumbs: { label: string; href?: string }[]
  art?: { src: string; alt: string }
  children?: React.ReactNode
}) {
  const titleWords = title.split(' ').length
  return (
    <section className="page-hero has-pattern pattern-light">
      <TravelPattern id="page-hero" />
      <div className={cn('wrap page-hero-grid', art && 'has-art')}>
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="loc">
              <li>
                <Link href="/">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <ChevronRight aria-hidden="true" />
                  {c.href ? (
                    <Link href={c.href}>{c.label}</Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="max-w-[16em]">
            <Words text={title} />
            {accent && (
              <>
                {' '}
                <em>
                  <Words text={accent} start={titleWords} />
                </em>
              </>
            )}
          </h1>
          {intro && <p className="lead">{intro}</p>}
          {children && <div className="btn-row">{children}</div>}
        </div>
        {art && (
          <div className="page-hero-art">
            <Image src={art.src} alt={art.alt} fill priority sizes="(min-width: 900px) 40vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}

type ButtonVariant = 'primary' | 'ghost' | 'ink' | 'light' | 'outline-light'

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: ButtonVariant
  size?: 'sm'
  className?: string
}) {
  return (
    <Link href={href} className={cn('btn', `btn-${variant}`, size === 'sm' && 'btn-sm', className)}>
      {children}
    </Link>
  )
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn('link-arrow', className)}>
      {children}
    </Link>
  )
}

export function VerificationBadge({ status, className }: { status: Metric['status']; className?: string }) {
  return (
    <span className={cn('chip', className)}>
      <Info className="size-3.5 text-text-3" aria-hidden="true" />
      {status}
    </span>
  )
}

export function Initials({ initials, name, size = 'md' }: { initials: string; name: string; size?: 'md' | 'lg' }) {
  return (
    <span
      role="img"
      aria-label={`Portrait placeholder for ${name}`}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-bold tracking-tight',
        size === 'lg' ? 'size-20 bg-primary text-lg text-primary-foreground' : 'size-12 bg-background text-base text-foreground',
      )}
    >
      {initials}
    </span>
  )
}

export function CtaBand({
  title,
  body,
  primary,
  secondary,
  spaced = false,
}: {
  title: string
  body: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
  /** Adds top spacing when the band follows a tinted or dark section. */
  spaced?: boolean
}) {
  return (
    <section className={cn('pb-20 md:pb-32', spaced && 'pt-20 md:pt-32')}>
      <div className="wrap">
        <div className="cta reveal has-pattern">
          <TravelPattern id="cta" />
          <div>
            <h2>
              <Words text={title} />
            </h2>
            <p>{body}</p>
          </div>
          <div className="btn-row">
            <ButtonLink href={primary.href} variant="light">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="outline-light">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * A faint map of routes linking communities: streets, dotted routes that flow, travellers and pinging stops.
 * Light-on-dark by default; put `pattern-light` on the host for navy-on-white. Decorative only.
 */
export function TravelPattern({ id }: { id: string }) {
  const r = (n: number) => `${id}-r${n}`
  return (
    <svg
      className="pattern"
      viewBox="0 0 1440 1200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="streets">
        <path d="M-40 170C300 120 520 260 820 205S1300 110 1480 160" />
        <path d="M-40 520C260 465 430 610 710 560S1180 460 1480 530" />
        <path d="M-40 905C330 860 600 990 900 930S1260 850 1480 895" />
        <path d="M230 -40C205 300 300 610 255 1240" />
        <path d="M715 -40C760 400 670 820 745 1240" />
        <path d="M1205 -40C1160 320 1250 700 1190 1240" />
        <path d="M-40 1120C240 1060 380 1160 600 1110S900 1050 1480 1130" />
        <path d="M980 -40C1010 120 1120 200 1480 260" />
      </g>
      <path id={r(1)} className="route" d="M70 1160C190 960 120 760 255 600S530 400 715 330 1010 140 1380 95" />
      <path id={r(2)} className="route" d="M1400 1180C1210 1030 1310 820 1190 650S910 545 745 455" />
      <path id={r(3)} className="route" d="M30 255C200 300 300 160 485 205" />
      <g className="mover">
        <circle className="halo" r="12" />
        <circle className="dot" r="4.5" />
        <animateMotion dur="16s" repeatCount="indefinite">
          <mpath href={`#${r(1)}`} />
        </animateMotion>
      </g>
      <g className="mover">
        <circle className="halo" r="12" />
        <circle className="dot" r="4.5" />
        <animateMotion dur="12s" begin="-5s" repeatCount="indefinite">
          <mpath href={`#${r(2)}`} />
        </animateMotion>
      </g>
      <g className="mover">
        <circle className="halo" r="12" />
        <circle className="dot" r="4.5" />
        <animateMotion dur="7s" begin="-2s" repeatCount="indefinite">
          <mpath href={`#${r(3)}`} />
        </animateMotion>
      </g>
      <g transform="translate(1380 95)">
        <circle className="ping" r="10" />
        <circle className="stop" r="6" />
      </g>
      <g transform="translate(745 455)">
        <circle className="ping late" r="10" />
        <circle className="stop" r="6" />
      </g>
      <g transform="translate(485 205)">
        <circle className="ping" r="10" />
        <circle className="stop" r="6" />
      </g>
      <g transform="translate(70 1160)">
        <circle className="stop start" r="5" />
      </g>
      <g transform="translate(1400 1180)">
        <circle className="stop start" r="5" />
      </g>
      <g transform="translate(30 255)">
        <circle className="stop start" r="5" />
      </g>
    </svg>
  )
}
