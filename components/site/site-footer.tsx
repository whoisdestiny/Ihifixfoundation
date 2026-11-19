import Link from 'next/link'
import { Logo } from './logo'
import { NewsletterForm } from './forms/newsletter-form'
import { LanguageSwitcher } from './site-header'
import { TravelPattern, Words } from './ui'
import { site } from '@/lib/site-data'

const columns = [
  {
    title: 'About',
    links: [
      { label: 'Who we are', href: '/about' },
      { label: 'Our approach', href: '/about#approach' },
      { label: 'Leadership and board', href: '/about#leadership' },
      { label: 'Governance', href: '/about#governance' },
    ],
  },
  {
    title: 'Our work',
    links: [
      { label: 'Programmes', href: '/programmes' },
      { label: 'Impact', href: '/impact' },
      { label: 'Partners', href: '/partners' },
      { label: 'Resources', href: '/resources' },
    ],
  },
  {
    title: 'Get involved',
    links: [
      { label: 'Donate', href: '/donate' },
      { label: 'Partner with us', href: '/partner-with-us' },
      { label: 'Volunteer and careers', href: '/get-involved#volunteer' },
      { label: 'Request support', href: '/get-involved#apply' },
    ],
  },
]

const legal = [
  { label: 'Privacy', href: '/policies#privacy' },
  { label: 'Terms', href: '/policies#terms' },
  { label: 'Safeguarding', href: '/policies#safeguarding' },
  { label: 'Accessibility', href: '/policies#accessibility' },
]

export function SiteFooter() {
  return (
    <footer className="site-footer has-pattern">
      <TravelPattern id="footer" />
      <div className="wrap">
        <div className="f-top">
          <div>
            <Logo inverted />
            <p className="f-tag rise">
              <Words text="Empowering the vulnerable." />{' '}
              <em>
                <Words text="Transforming communities." start={3} />
              </em>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="f-title m-0">Stay informed</p>
            <p className="m-0 leading-relaxed text-[var(--night-text-2)]">
              Quarterly updates on our programmes, impact and opportunities. No spam.
            </p>
            <NewsletterForm inverted />
          </div>
        </div>

        <nav aria-label="Footer" className="f-grid">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="f-title">{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="f-title">Contact</h2>
            <ul>
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="f-bottom">
          <div className="grid gap-1">
            <p>
              A member of the Ihifix Group ·{' '}
              {site.group.map((g, i) => (
                <span key={g.href}>
                  <a href={g.href}>{g.label}</a>
                  {i < site.group.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
            <p>
              © {new Date().getFullYear()} {site.name}. Kaduna, Nigeria · Since {site.founded}.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul>
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher onDark />
          </div>
        </div>
      </div>
    </footer>
  )
}
