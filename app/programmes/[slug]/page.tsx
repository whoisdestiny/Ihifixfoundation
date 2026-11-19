import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ButtonLink, PageHero, SectionHeading, TravelPattern, Words } from '@/components/site/ui'
import { Reveal } from '@/components/site/motion'
import { InterestForm } from '@/components/site/forms/interest-form'
import { programmes } from '@/lib/site-data'

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = programmes.find((x) => x.slug === slug)
  if (!p) return {}
  return { title: p.title, description: p.short }
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = programmes.find((x) => x.slug === slug)
  if (!p) notFound()
  const others = programmes.filter((x) => x.slug !== slug)

  return (
    <>
      <PageHero
        title={p.title}
        intro={p.short}
        crumbs={[{ label: 'Programmes', href: '/programmes' }, { label: p.title }]}
        art={{ src: p.image, alt: p.imageAlt }}
      >
        <ButtonLink href="/partner-with-us">Fund this programme</ButtonLink>
        <ButtonLink href="#apply" variant="ghost">
          Register interest
        </ButtonLink>
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-14 lg:col-span-7">
            <div>
              <p className="eyebrow">The challenge</p>
              <h2 className="sr-only">The challenge</h2>
              <p className="m-0 text-[1.1875rem] font-semibold leading-snug tracking-[-0.015em]">{p.problem}</p>
            </div>
            <div>
              <h2 className="mb-6 text-[1.5rem]">
                <Words text="What we do" />
              </h2>
              <ul className="checklist text-foreground">
                {p.whatWeDo.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-[1.5rem]">
                <Words text="How it works" />
              </h2>
              <ol className="steps">
                {p.howItWorks.map((h) => (
                  <Reveal as="li" key={h}>
                    <strong className="font-semibold">{h}</strong>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>

          <aside className="flex flex-col gap-4 lg:col-span-5">
            <div className="card on-dark has-pattern">
              <TravelPattern id="results" />
              <h2 className="eyebrow">Results</h2>
              <div className="flex flex-col gap-5">
                {p.results.map((r) => (
                  <p key={r.label} className="m-0 flex flex-col">
                    <span className="text-[2rem] font-bold leading-none tracking-[-0.035em] text-primary-foreground">{r.value}</span>
                    <span className="mt-2 text-on-primary-muted">{r.label}</span>
                  </p>
                ))}
              </div>
              <Link href="/impact#methodology" className="link-arrow mt-6">
                How we count
              </Link>
            </div>
            <div className="card">
              <h2 className="mb-3 text-[var(--fs-sm)] font-semibold tracking-normal">Who we serve</h2>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {p.whoWeServe.map((w) => (
                  <li key={w} className="chip">
                    {w}
                  </li>
                ))}
              </ul>
              <h2 className="mb-2 mt-6 text-[var(--fs-sm)] font-semibold tracking-normal">Partners</h2>
              <p className="m-0">{p.partners.join(' · ')}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section tint compact">
        <div className="wrap">
          <figure className="m-0 max-w-4xl">
            <p className="eyebrow">In their words</p>
            <blockquote className="m-0 text-[clamp(1.3rem,1rem+1vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.025em] text-balance">
              &ldquo;{p.story.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-text-2">{p.story.attribution}</figcaption>
          </figure>
        </div>
      </section>

      <section id="apply" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Get support"
            title="Register your interest"
            intro="Programmes open in different states at different times. Leave your details and we'll contact you when there's an opportunity for you."
          />
          <div className="form-panel">
            <InterestForm defaultProgramme={p.title} />
          </div>
        </div>
      </section>

      <section className="section tint compact">
        <div className="wrap">
          <h2 className="mb-8 text-[1.5rem]">
            <Words text="Other programmes" />
          </h2>
          <ul className="cards cards-3 m-0 list-none p-0">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/programmes/${o.slug}`} className="card on-white flex h-full flex-col gap-2 no-underline">
                  <h3 className="m-0">{o.title}</h3>
                  <p className="m-0">{o.short}</p>
                  <span className="link-arrow mt-auto pt-3">Explore</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
