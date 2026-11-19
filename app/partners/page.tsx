import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBand, PageHero, SectionHead } from '@/components/site/ui'
import { partners } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'The funders, governments and technical partners we work with, and what we have achieved together.',
}

export default function PartnersPage() {
  return (
    <>
      <PageHero
        title="We go further"
        accent="together."
        intro="We deliver at scale by working with global funders, government agencies, civil society and technology leaders."
        crumbs={[{ label: 'Partners' }]}
      />
      <section className="section pt-0 md:pt-0">
        <div className="wrap">
          <SectionHead
            eyebrow="Partnerships"
            title="What we've built together"
            intro="Each partnership with its period, type and the change it made possible."
          />
          <div className="table-wrap reveal">
            <table>
              <caption className="sr-only">Partners, partnership period, type and impact</caption>
              <thead>
                <tr>
                  <th scope="col">Partner</th>
                  <th scope="col">Period</th>
                  <th scope="col">Type</th>
                  <th scope="col">Impact</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr key={p.name}>
                    <th scope="row">
                      <span className="partner-cell">
                        <span className="partner-cell-logo" aria-hidden="true">
                          {p.logo ? (
                            <Image src={p.logo.src} alt="" width={p.logo.width} height={p.logo.height} />
                          ) : (
                            <span className="partner-cell-text">{p.name}</span>
                          )}
                        </span>
                        {p.name}
                      </span>
                    </th>
                    <td className="whitespace-nowrap">{p.period}</td>
                    <td>{p.type}</td>
                    <td className="text-foreground!">{p.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CtaBand
        title="Become a partner"
        body="Co-design programmes, fund scale-up or bring technical expertise to communities that need it."
        primary={{ label: 'Start a conversation', href: '/partner-with-us' }}
      />
    </>
  )
}
