'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Site-wide motion runtime.
 * - Reveals `.reveal`, `.rise`, section h2s and eyebrows once as they reach 92% of the viewport (checked every
 *   scroll frame, so a fast fling or an anchor jump never leaves content hidden). Siblings get a stagger index.
 * - Drives the scroll progress line, the header that tucks away on scroll down, and the hero parallax.
 * - Feeds the cursor position to cards for the spotlight hover.
 * - Plays a curtain wipe on client-side navigations (not on the first load).
 * Without JS (no `.js` on <html>) nothing is hidden; under reduced motion only the progress line updates.
 */
export function MotionRuntime() {
  const pathname = usePathname()
  const first = useRef(true)
  const [curtain, setCurtain] = useState(0)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (document.documentElement.classList.contains('js')) setCurtain((n) => n + 1)
  }, [pathname])

  // Scroll-linked effects: progress, header direction, hero parallax.
  useEffect(() => {
    const root = document.documentElement
    const motion = root.classList.contains('js')
    let lastY = window.scrollY
    let queued = false
    const update = () => {
      queued = false
      const y = window.scrollY
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--progress', max > 0 ? String(Math.min(y / max, 1)) : '0')
      if (y > 24) root.setAttribute('data-scrolled', '')
      else root.removeAttribute('data-scrolled')
      if (motion) {
        const delta = y - lastY
        if (y < 320 || delta < -6) root.removeAttribute('data-scroll-dir')
        else if (delta > 6) root.setAttribute('data-scroll-dir', 'down')
        const bg = document.querySelector<HTMLElement>('.hero-bg')
        if (bg && y < window.innerHeight * 1.2) bg.style.setProperty('--hero-shift', `${Math.round(y * 0.28)}px`)
      }
      lastY = y
    }
    const queue = () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(update)
      }
    }
    addEventListener('scroll', queue, { passive: true })
    addEventListener('resize', queue)
    update()
    return () => {
      removeEventListener('scroll', queue)
      removeEventListener('resize', queue)
    }
  }, [pathname])

  // Cursor spotlight on cards.
  useEffect(() => {
    if (!document.documentElement.classList.contains('js')) return
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('.card, .stat, .prog')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    addEventListener('pointermove', onMove, { passive: true })
    return () => removeEventListener('pointermove', onMove)
  }, [])

  // Entrance reveals.
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('js')) return
    let queued = false
    const selector =
      '.reveal:not(.in), .rise:not(.in), main section h2:not(.in), main section .eyebrow:not(.in)'
    const index = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not([data-i])').forEach((el) => {
        const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal')) : []
        el.dataset.i = String(Math.max(sibs.indexOf(el), 0))
        el.style.setProperty('--i', el.dataset.i)
      })
    }
    const check = () => {
      queued = false
      const limit = window.innerHeight * 0.92
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const r = el.getBoundingClientRect()
        if (!r.width && !r.height) return
        if (r.top < limit) el.classList.add('in')
      })
    }
    const queue = () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(check)
      }
    }
    index()
    addEventListener('scroll', queue, { passive: true })
    addEventListener('resize', queue)
    addEventListener('hashchange', queue)
    check()
    const late = [setTimeout(() => (index(), queue()), 120), setTimeout(queue, 600)]
    return () => {
      removeEventListener('scroll', queue)
      removeEventListener('resize', queue)
      removeEventListener('hashchange', queue)
      late.forEach(clearTimeout)
    }
  }, [pathname])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      {curtain > 0 && <div key={curtain} className="page-curtain" aria-hidden="true" />}
    </>
  )
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'article' | 'figure'
}

/** A block that fades up 28px once as it enters the viewport (driven by MotionRuntime). */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  return (
    <Tag className={cn('reveal', className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}

function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function parseValue(value: string) {
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/)
  if (!match) return null
  const [, prefix, num, suffix] = match
  const target = Number(num.replace(/,/g, ''))
  if (Number.isNaN(target)) return null
  return { prefix, target, suffix, decimals: num.includes('.') ? num.split('.')[1].length : 0 }
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = parseValue(value)
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const [current, setCurrent] = useState<number | null>(null)

  useEffect(() => {
    if (!inView || !parsed) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(parsed.target)
      return
    }
    const duration = 1600
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(parsed.target * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // parsed is derived from value; depending on value keeps the effect stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value])

  if (!parsed) return <span className={className}>{value}</span>

  // Before it scrolls into view (and without JS) show the real figure, never a zero.
  const display =
    current === null
      ? value.slice(parsed.prefix.length, value.length - parsed.suffix.length)
      : current.toLocaleString('en-US', {
          minimumFractionDigits: parsed.decimals,
          maximumFractionDigits: parsed.decimals,
        })

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {parsed.prefix}
        {display}
        {parsed.suffix}
      </span>
    </span>
  )
}
