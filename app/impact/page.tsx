import type { Metadata } from 'next'
import { CtaBand, PageHero, SectionHead, TextLink, VerificationBadge, Words } from '@/components/site/ui'
import { CountUp, Reveal } from '@/components/site/motion'
import { metrics, metricsAsOf, milestones } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Impact',
  description: 'Our impact data with clear definitions, reporting periods and sources.',
}

export default function ImpactPage() {
  return (
    <>
      <PageHero
        title="Every number"
        accent="has a source."
        intro={`Each figure we publish comes with a definition, a period and a verification status. Figures are as of ${metricsAsOf}.`}
        crumbs={[{ label: 'Impact' }]}
      >
        <a href="#methodology" className="btn btn-ghost">
          How we count
        </a>
      </PageHero>

      <section className="section pt-0 md:pt-0">
        <div className="wrap">
          <SectionHead eyebrow="Key metrics" title="What we've achieved together" />
          <ul className="cards cards-3 m-0 list-none p-0">
            {metrics.map((m) => (
              <Reveal as="li" key={m.label} className="stat">
                <div className="flex items-start justify-between gap-3">
                  <p className="stat-value m-0">
                    <CountUp value={m.value} />
                  </p>
                  <VerificationBadge status={m.status} />
                </div>
                <h3 className="mt-4 mb-1">{m.label}</h3>
                <p className="m-0 text-[var(--fs-sm)] leading-relaxed text-text-2">{m.definition}</p>
                <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-4 text-[var(--fs-xs)]">
                  <div>
                    <dt className="font-semibold text-foreground">Period</dt>
                    <dd className="m-0 text-text-2">{m.period}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Scope</dt>
                    <dd className="m-0 text-text-2">{m.scope}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-semibold text-foreground">Source</dt>
                    <dd className="m-0 text-text-2">{m.source}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="methodology" className="section tint">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Methodology</p>
            <h2>
              <Words text="How we count" />
            </h2>
            <p className="lead">
              We separate Foundation programme results from wider Ihifix Group figures, and label every metric with its
              verification status.
            </p>
          </div>
          <dl className="trio two m-0">
            <div>
              <dt className="k">Direct beneficiaries</dt>
              <dd className="m-0">
                <p>People who completed at least one programme activity, recorded in attendance or enrolment records.</p>
              </dd>
            </div>
            <div>
              <dt className="k">Foundation</dt>
              <dd className="m-0">
                <p>Results from Foundation-led programmes.</p>
              </dd>
            </div>
            <div>
              <dt className="k">Group-wide</dt>
              <dd className="m-0">
                <p>Includes work delivered with other Ihifix entities.</p>
              </dd>
            </div>
            <div>
              <dt className="k">Under verification</dt>
              <dd className="m-0">
                <p>
                  The figure comes from programme reports and is being reconciled against source data before an
                  independent review.
                </p>
              </dd>
            </div>
            <div>
              <dt className="k">Updates</dt>
              <dd className="m-0">
                <p>
                  We update figures at least twice a year. To request underlying data,{' '}
                  <a href="/contact" className="inline-link">
                    contact us
                  </a>
                  .
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Timeline"
            title="Impact over time"
            action={<TextLink href="/resources">Download reports</TextLink>}
          />
          <ol className="trio">
            {milestones.map((m) => (
              <Reveal as="li" key={m.year}>
                <span className="k big">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.detail}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Help us grow these numbers"
        body="Your support turns each figure into a person with new skills, income and voice."
        primary={{ label: 'Donate', href: '/donate' }}
        secondary={{ label: 'Partner with us', href: '/partner-with-us' }}
      />
    </>
  )
}
