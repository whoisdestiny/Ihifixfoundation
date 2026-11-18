import type { Metadata } from 'next'
import { PageHero, TravelPattern } from '@/components/site/ui'
import { DonationForm } from '@/components/site/forms/donation-form'
import { site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Make a one-time or monthly gift to Ihifix Innovation Foundation in NGN, USD, GBP or EUR.',
}

const uses = [
  { share: '70%', label: 'Programme delivery' },
  { share: '20%', label: 'Monitoring, safeguarding and learning' },
  { share: '10%', label: 'Operations and fundraising' },
]

export default function DonatePage() {
  return (
    <>
      <PageHero
        title="Give the gift"
        accent="of opportunity."
        intro="Your donation helps young people, women and communities gain the skills, support and voice to change their lives."
        crumbs={[{ label: 'Donate' }]}
      />
      <section className="section pt-0 md:pt-0">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="form-panel lg:col-span-7">
            <h2>Make a donation</h2>
            <DonationForm />
          </div>
          <aside className="flex flex-col gap-4 lg:col-span-5">
            <div className="card on-dark has-pattern">
              <TravelPattern id="uses" />
              <h2 className="eyebrow">Where your money goes</h2>
              <ul className="m-0 flex list-none flex-col gap-5 p-0">
                {uses.map((u) => (
                  <li key={u.label} className="flex flex-col gap-2">
                    <div className="flex justify-between gap-4 text-sm">
                      <span>{u.label}</span>
                      <span className="font-semibold text-primary-foreground">{u.share}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/15">
                      <div className="h-full rounded-full bg-[var(--night-brand)]" style={{ width: u.share }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-6 text-xs!">Indicative allocation. Audited figures will be published in our annual report.</p>
            </div>
            <div className="card">
              <h3>Bank transfer</h3>
              <p className="m-0">
                Prefer to give by bank transfer? Email{' '}
                <a href={`mailto:${site.email}`} className="inline-link">
                  {site.email}
                </a>{' '}
                and we&apos;ll send account details and an official receipt.
              </p>
            </div>
            <div className="callout">
              <p className="m-0">
                <strong>Secure payments.</strong> PCI-compliant payments through our payment partner. We never store your
                card details, and we handle your data under the Nigeria Data Protection Act 2023.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
