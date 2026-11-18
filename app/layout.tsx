import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { CookieBanner } from '@/components/site/cookie-banner'
import { MobileContactShortcut } from '@/components/site/mobile-contact-shortcut'
import { MotionRuntime } from '@/components/site/motion'
import { site } from '@/lib/site-data'
import './globals.css'

const body = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

// Adds .js before first paint so entrance animations have a hidden start state; skipped under reduced motion.
const motionBootstrap = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js')}catch(e){}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.mission} Based in Kaduna, Nigeria since 2017.`,
  generator: 'v0.app',
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    locale: 'en_NG',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.tagline },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#05145a',
  width: 'device-width',
  initialScale: 1,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: site.name,
  url: site.url,
  email: site.email,
  foundingDate: String(site.founded),
  slogan: site.tagline,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 2 Ahman Pategi Road, Off Alkali Road',
    addressLocality: 'Kaduna',
    addressCountry: 'NG',
  },
  sameAs: site.socials.map((s) => s.href),
  parentOrganization: { '@type': 'Organization', name: 'Ihifix Group', url: 'https://www.ihifix.com' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} bg-background`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionRuntime />
        <MobileContactShortcut />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
