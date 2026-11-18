import type { Metadata } from 'next'
import { Briefcase, HandHeart, Handshake, Users } from 'lucide-react'
import { PageHero, SectionHeading } from '@/components/site/ui'
import { Reveal } from '@/components/site/motion'
import { InterestForm } from '@/components/site/forms/interest-form'
import { VolunteerForm } from '@/components/site/forms/volunteer-form'
import { opportunities } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Donate, partner, volunteer, join our team or request support from our programmes.',
}

const paths = [
  { icon: HandHeart, title: 'Donate', body: 'Fund skills, support and opportunity.', href: '/donate', brand: true },
  { icon: Handshake, title: 'Partner', body: 'Co-design and scale programmes with us.', href: '/partner-with-us' },
  { icon: Briefcase, title: 'Volunteer and careers', body: 'Share your time and expertise.', href: '#volunteer' },
  { icon: Users, title: 'Request support', body: 'Find a programme near you.', href: '#apply' },
]

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        title="There's a place"
        accent="for everyone here."
        intro="Whether you give, partner, volunteer or need support, this work needs you."
        crumbs={[{ label: 'Get involved' }]}
      />

      <section className="section pt-0 md:pt-0">
        <div className="wrap">
          <ul className="cards cards-4 m-0 list-none p-0">
            {paths.map((p) => (
              <Reveal as="li" key={p.title}>
                <a href={p.href} className="card flex h-full flex-col no-underline">
                  <span className={p.brand ? 'card-ic' : 'card-ic navy'}>
                    <p.icon strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h2 className="mb-2 text-[1.375rem] tracking-[-0.02em]">{p.title}</h2>
                  <p className="m-0">{p.body}</p>
                  <span className="link-arrow mt-auto pt-5">Go</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="volunteer" className="section tint">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-10">
            <SectionHeading eyebrow="Volunteer and careers" title="Open opportunities" />
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {opportunities.map((o) => (
                <li key={o.role} className="card on-white">
                  <h3 className="mb-3">{o.role}</h3>
                  <dl className="m-0 flex flex-wrap gap-2">
                    <div className="chip on-surface">
                      <dt className="text-text-3">Location</dt>
                      <dd className="m-0">{o.location}</dd>
                    </div>
                    <div className="chip on-surface">
                      <dt className="text-text-3">Duration</dt>
                      <dd className="m-0">{o.duration}</dd>
                    </div>
                    <div className="chip on-surface h-auto! min-h-7 py-1 whitespace-normal!">
                      <dt className="text-text-3">Skills</dt>
                      <dd className="m-0">{o.skills}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-panel on-surface self-start">
            <h2>Apply</h2>
            <VolunteerForm />
          </div>
        </div>
      </section>

      <section id="apply" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Request support"
            title="Looking for a programme?"
            intro="Tell us a little about yourself and where you live. We'll contact you when a programme opens in your area."
          />
          <div className="form-panel">
            <InterestForm />
          </div>
        </div>
      </section>
    </>
  )
}
