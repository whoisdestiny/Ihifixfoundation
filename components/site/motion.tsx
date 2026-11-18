'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Plays entrance animations once as each element first scrolls into view.
 * Every scroll frame reveals any pending `.reveal`, section `h2` or `.eyebrow` whose top has reached 92% of the
 * viewport, including ones already scrolled past, so a fast fling or an anchor jump never leaves content hidden.
 * Re-scans on each client navigation. Without JS (no `.js` on <html>) nothing is hidden.
 */
export function MotionRuntime() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('js')) return
    let queued = false
    const check = () => {
      queued = false
      const limit = window.innerHeight * 0.92
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.in), main section h2:not(.in), main section .eyebrow:not(.in)')
        .forEach((el) => {
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
    addEventListener('scroll', queue, { passive: true })
    addEventListener('resize', queue)
    addEventListener('hashchange', queue)
    check()
    const late = [setTimeout(queue, 120), setTimeout(queue, 600)]
    return () => {
      removeEventListener('scroll', queue)
      removeEventListener('resize', queue)
      removeEventListener('hashchange', queue)
      late.forEach(clearTimeout)
    }
  }, [pathname])

  return null
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
