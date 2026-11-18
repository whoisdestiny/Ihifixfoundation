import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBand, Initials, PageHero, SectionHead, TextLink, TravelPattern, Words } from '@/components/site/ui'
import { Reveal } from '@/components/site/motion'
import { board, leadership, milestones, site, values } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Who we are, our approach, leadership and governance. ${site.name} has worked in Kaduna, Nigeria since ${site.founded}.`,
}

const approach = [
  { title: 'Listen first', body: 'We start with community priorities, gathered through outreach, town halls and civic tech.' },
  { title: 'Equip people', body: 'We combine in-demand skills with psycho-social support and a solution-based mindset.' },
  { title: 'Strengthen systems', body: 'We work with government and civil society so change is backed by policy and budgets.' },
  { title: 'Measure honestly', body: 'We define every metric, show its source and publish what we learn.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="From Kaduna,"
        accent="for Africa."
        intro={`${site.name} is the social impact arm of the Ihifix Group, empowering the poor and vulnerable in Africa since ${site.founded}.`}
        crumbs={[{ label: 'About' }]}
        art={{ src: '/images/human-capital.png', alt: 'Participants learning together at an Ihifix programme.' }}
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow">Our story</p>
            <h2>
              <Words text="People can lead their own transformation" />
            </h2>
            <p className="lead">
              We began in Kaduna with a simple belief: that people affected by poverty, conflict and exclusion can lead
              their own transformation when they have the right knowledge, skills and support.
            </p>
            <p className="mt-5 max-w-[34em] leading-relaxed text-text-2">
              Since then we have trained tens of thousands of young people in digital skills, supported women- and
              youth-led businesses, and built civic technology that helped citizen priorities reach the state budget.
            </p>
          </div>
          <dl className="m-0 grid gap-4">
            <Reveal className="card on-dark has-pattern">
              <TravelPattern id="vision" />
              <dt className="eyebrow">Vision</dt>
              <dd className="m-0 text-[1.625rem] font-bold leading-tight tracking-[-0.025em]">{site.vision}</dd>
            </Reveal>
            <Reveal className="card">
              <dt className="eyebrow">Mission</dt>
              <dd className="m-0 text-lg leading-relaxed text-foreground">{site.mission}</dd>
            </Reveal>
          </dl>
        </div>
      </section>

      <section id="approach" className="section tint">
        <div className="wrap">
          <SectionHead
            eyebrow="Our approach"
            title="How we create lasting change"
            intro="Four habits shape every programme, from the first community meeting to the final report."
          />
          <ol className="steps four on-white">
            {approach.map((a) => (
              <Reveal as="li" key={a.title}>
                <h3>{a.title}</h3>
                <p className="m-0">{a.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Our values" title="What guides us" />
          <ul className="cards cards-3 m-0 list-none p-0">
            {values.map((v) => (
              <Reveal as="li" key={v.name} className="card">
                <h3>{v.name}</h3>
                <p className="m-0">{v.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="showcase has-pattern on-dark">
        <TravelPattern id="milestones" />
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="eyebrow">Milestones</p>
              <h2 className="text-primary-foreground">
                <Words text="Our journey so far" />
              </h2>
            </div>
            <div className="relative hidden aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] md:block">
              <Image src="/images/good-governance.png" alt="" fill sizes="26em" className="object-cover" />
            </div>
          </div>
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

      <section id="leadership" className="section">
        <div className="wrap">
          <SectionHead eyebrow="Leadership" title="The people behind the work" />
          <ul className="cards cards-2 m-0 list-none p-0">
            {leadership.map((l) => (
              <Reveal as="li" key={l.name} className="card flex items-center gap-5">
                <Initials initials={l.initials} name={l.name} size="lg" />
                <div>
                  <h3 className="m-0 text-[1.375rem]">{l.name}</h3>
                  <p className="m-0">{l.role}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <h3 className="mb-5 mt-16 text-[1.5rem] tracking-[-0.02em]">Board of directors</h3>
          <ul className="cards cards-3 m-0 list-none p-0">
            {board.map((b) => (
              <li key={b.name} className="card flex items-center gap-4 p-4!">
                <Initials initials={b.initials} name={b.name} />
                <span className="font-semibold">{b.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="governance" className="section tint">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Governance</p>
            <h2>
              <Words text="Accountable by design" />
            </h2>
            <p className="lead">
              An independent board oversees strategy, finance and safeguarding. We publish our policies and reports so
              partners and communities can hold us to account.
            </p>
          </div>
          <ul className="m-0 grid list-none gap-3 p-0">
            {[
              { label: 'Safeguarding policy', href: '/policies#safeguarding' },
              { label: 'Privacy and data protection', href: '/policies#privacy' },
              { label: 'Reports and publications', href: '/resources' },
              { label: 'How we measure impact', href: '/impact#methodology' },
            ].map((l) => (
              <li key={l.href} className="rounded-[var(--radius-m)] bg-background px-6 py-5">
                <TextLink href={l.href}>{l.label}</TextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        spaced
        title="Work with us"
        body="Join funders, governments and partners helping communities across Nigeria thrive."
        primary={{ label: 'Partner with us', href: '/partner-with-us' }}
        secondary={{ label: 'Get involved', href: '/get-involved' }}
      />
    </>
  )
}
