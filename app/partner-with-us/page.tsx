import type { Metadata } from 'next'
import { PageHero, TextLink } from '@/components/site/ui'
import { PartnershipForm } from '@/components/site/forms/partnership-form'

export const metadata: Metadata = {
  title: 'Partner With Us',
  description: 'Fund, co-design or support programmes with Ihifix Innovation Foundation.',
}

const ways = [
  { title: 'Funders', body: 'Programme grants, multi-year funding and pooled funds with transparent reporting.' },
  { title: 'Government', body: 'Co-delivery of skills, inclusion and civic engagement initiatives at state and federal level.' },
  { title: 'CSOs and NGOs', body: 'Consortium bids, shared delivery and community reach across Northern Nigeria.' },
  { title: 'Corporates', body: 'CSR programmes, employee volunteering and talent pipelines from our graduates.' },
  { title: 'Technical', body: 'Curriculum, platforms, research and monitoring expertise.' },
]

export default function PartnerWithUsPage() {
  return (
    <>
      <PageHero
        title="Tell us what"
        accent="you want to achieve."
        intro="We bring community trust, delivery experience since 2017 and honest measurement."
        crumbs={[{ label: 'Partner with us' }]}
      />
      <section className="section pt-0 md:pt-0">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div>
              <p className="eyebrow">Ways to partner</p>
              <dl className="trio two m-0">
                {ways.map((w) => (
                  <div key={w.title} className="md:grid-cols-[140px_1fr]!">
                    <dt className="k">{w.title}</dt>
                    <dd className="m-0">
                      <p>{w.body}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="card">
              <h3>Due diligence</h3>
              <p>Review our governance, safeguarding policy and reports before you get in touch.</p>
              <TextLink href="/resources">Reports and policies</TextLink>
            </div>
          </div>
          <div className="form-panel lg:col-span-7">
            <h2>Partnership enquiry</h2>
            <PartnershipForm />
          </div>
        </div>
      </section>
    </>
  )
}
