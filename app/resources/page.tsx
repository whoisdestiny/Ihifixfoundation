import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { PageHero, TextLink } from '@/components/site/ui'
import { Reveal } from '@/components/site/motion'
import { reports } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Resources & Reports',
  description: 'Impact reports, policy briefs, policies and press materials.',
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Resources and reports"
        intro="Reports, policies and press materials for partners, researchers and the media."
        crumbs={[{ label: 'Resources' }]}
      />
      <section className="section pt-0 md:pt-0">
        <div className="wrap flex flex-col gap-4">
          <ul className="cards cards-3 m-0 list-none p-0">
            {reports.map((r) => (
              <Reveal as="li" key={r.title} className="card flex flex-col">
                <span className="card-ic navy">
                  <FileText strokeWidth={1.8} aria-hidden="true" />
                </span>
                <p className="m-0 text-[var(--fs-xs)]! font-semibold text-brand-text!">
                  {r.type} · {r.year}
                </p>
                <h2 className="mt-1 mb-2 text-[var(--fs-h3)] font-semibold tracking-[-0.012em]">{r.title}</h2>
                <p className="m-0 mt-auto text-[var(--fs-xs)]!">{r.size}</p>
              </Reveal>
            ))}
          </ul>
          <div className="callout mt-4 flex flex-col items-start gap-3 p-7! md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="m-0 text-[1.125rem] tracking-[-0.02em] text-foreground">Need a document now?</h2>
              <p className="m-0 mt-1">Partners and media can request any report ahead of publication.</p>
            </div>
            <TextLink href="/contact">Request a report</TextLink>
          </div>
        </div>
      </section>
    </>
  )
}
