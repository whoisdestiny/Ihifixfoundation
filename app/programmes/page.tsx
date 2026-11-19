import type { Metadata } from 'next'
import Image from 'next/image'
import { ButtonLink, CtaBand, PageHero } from '@/components/site/ui'
import { Reveal } from '@/components/site/motion'
import { programmes } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Programmes',
  description:
    'Human Capital Development, Gender Equity & Inclusion, Micro-Business Growth and Good Governance programmes across Nigeria.',
}

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        title="Four pillars."
        accent="One connected plan."
        intro="Our programmes build skills, open economic opportunity and strengthen the systems people rely on."
        crumbs={[{ label: 'Programmes' }]}
      >
        <ButtonLink href="/get-involved#apply">Register interest</ButtonLink>
        <ButtonLink href="/partner-with-us" variant="ghost">
          Fund a programme
        </ButtonLink>
      </PageHero>

      <section className="showcase">
        <div className="wrap">
          {programmes.map((p, i) => (
            <Reveal as="article" key={p.slug} className={`spanel ${i % 2 ? 'rev' : ''}`}>
              <div className="spanel-media">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 900px) 45vw, 100vw"
                  className={`object-cover ${p.imagePosition ?? ''}`}
                />
              </div>
              <div className="spanel-copy">
                <p className="eyebrow">Pillar {i + 1}</p>
                <h2>{p.title}</h2>
                <p className="lead">{p.short}</p>
                <dl className="m-0 mb-8 flex flex-wrap gap-x-10 gap-y-5">
                  {p.results.map((r) => (
                    <div key={r.label} className="flex flex-col">
                      <dt className="sr-only">{r.label}</dt>
                      <dd className="m-0 text-[1.625rem] font-bold leading-none tracking-[-0.035em]">{r.value}</dd>
                      <dd className="m-0 mt-2 max-w-52 text-sm text-text-2">{r.label}</dd>
                    </div>
                  ))}
                </dl>
                <ButtonLink href={`/programmes/${p.slug}`} variant="ink">
                  Explore {p.title}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        spaced
        title="Need support from a programme?"
        body="Tell us where you are and what you need. We'll let you know when a programme opens near you."
        primary={{ label: 'Register interest', href: '/get-involved#apply' }}
        secondary={{ label: 'Fund a programme', href: '/partner-with-us' }}
      />
    </>
  )
}
