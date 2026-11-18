'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'
import { Logo } from './logo'
import { navigation } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ onDark = false }: { onDark?: boolean }) {
  return (
    <label className={cn('inline-flex items-center gap-1.5 text-sm font-medium', onDark ? 'text-on-primary-muted' : 'text-text-2')}>
      <Globe className="size-4" aria-hidden="true" />
      <span className="sr-only">Language</span>
      <select defaultValue="en" className="cursor-pointer rounded-md bg-transparent py-1 pr-1 text-sm font-medium">
        <option value="en">English</option>
        <option value="ha" disabled>
          Hausa (coming soon)
        </option>
      </select>
    </label>
  )
}

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="mobile-nav"
      className={cn('menu-btn', open && 'is-close')}
    >
      <span />
      <span />
      <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
    </button>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  // The logo already links home, so the desktop bar skips "Home".
  const desktopNav = navigation.filter((n) => n.href !== '/')

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <div className="bar">
            <Logo />
            <nav aria-label="Primary" className="links seg-host">
              {desktopNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="bar-end">
              <Link href="/donate" className="btn btn-primary btn-sm">
                Donate
              </Link>
              <MenuButton open={false} onClick={() => setOpen(true)} />
            </div>
          </div>
        </div>
      </header>

      {/* The sheet sits outside the header: the header's backdrop-filter would trap a fixed-position child. */}
      {open && (
        <div id="mobile-nav" className="sheet animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="wrap flex min-h-full flex-col">
            <div className="sheet-head">
              <Logo />
              <MenuButton open onClick={() => setOpen(false)} />
            </div>
            <nav aria-label="Mobile" className="sheet-links">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="sheet-foot">
              <LanguageSwitcher />
              <Link href="/donate" className="btn btn-primary">
                Donate
              </Link>
              <Link href="/partner-with-us" className="btn btn-ghost">
                Partner with us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
