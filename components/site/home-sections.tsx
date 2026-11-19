import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ButtonLink, SectionHead, TextLink, TravelPattern, VerificationBadge, Words } from './ui'
import { CountUp, Reveal } from './motion'
import { metrics, metricsAsOf, partners, programmes, site } from '@/lib/site-data'

export function HomeHero() {
  const stats = metrics.slice(0, 3)
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <Image
          src="/images/photos/home-hero-summit.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">Ihifix Foundation · Since {site.founded}</p>
          <h1>
            <Words text="Empowering the vulnerable." />{' '}
            <em>
              <Words text="Transforming communities." start={3} />
            </em>
          </h1>
          <p className="lead">
            We equip the poor and vulnerable in Africa with psycho-social support, functional knowledge, in-demand
            skills and a solution-based mindset, so they can live dignified lives.
          </p>
          <div className="btn-row">
            <Link href="/partner-with-us" className="btn btn-primary btn-arrow">
              Partner with us
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/donate" className="btn btn-outline-light">
              Donate
            </Link>
          </div>
          <p className="hero-help">
            Looking for support? <Link href="/get-involved#apply">Find a programme near you</Link>
          </p>
        </div>

        <dl className="hero-stats">
          {stats.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>
                <CountUp value={m.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <a href="#impact" className="hero-scroll" aria-label="Scroll to our impact">
        <span aria-hidden="true" />
      </a>
    </section>
  )
}

export function ImpactStrip() {
  const shown = metrics.slice(0, 4)
  return (
    <section id="impact" aria-labelledby="impact-strip" className="section">
      <div className="wrap">
        <SectionHead
          id="impact-strip"
          eyebrow="Our impact"
          title="Real people, counted honestly"
          intro={`Every figure has a definition, a period and a source. Figures as of ${metricsAsOf}.`}
          action={<TextLink href="/impact#methodology">How we count</TextLink>}
        />
        <dl className="cards cards-4">
          {shown.map((m) => (
            <Reveal key={m.label} className="stat">
              <dd className="stat-value m-0">
                <CountUp value={m.value} />
              </dd>
              <dt className="stat-label mt-3">{m.label}</dt>
              <dd className="stat-meta m-0">{m.period}</dd>
              <dd className="m-0 mt-3">
                <VerificationBadge status={m.status} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function ProgrammesGrid() {
  return (
    <section className="section pt-0 md:pt-0">
      <div className="wrap">
        <SectionHead
          eyebrow="What we do"
          title="Four pillars of lasting change"
          intro="Each programme combines skills, support and systems change so progress continues long after training ends."
          action={<TextLink href="/programmes">All programmes</TextLink>}
        />
        <ul className="cards cards-2 m-0 list-none p-0">
          {programmes.map((p, i) => {
            return (
              <Reveal as="li" key={p.slug}>
                <Link href={`/programmes/${p.slug}`} className="prog">
                  <div className="prog-media">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 700px) 50vw, 100vw"
                      className={`object-cover ${p.imagePosition ?? ''}`}
                    />
                  </div>
                  <div className="prog-body">
                    <p className="m-0 text-[var(--fs-xs)] font-semibold text-brand-text">Pillar {i + 1}</p>
                    <h3>{p.title}</h3>
                    <p>{p.short}</p>
                    <div className="prog-foot">
                      <span className="chip">
                        {p.results[0].value} <span className="font-medium text-text-2">{p.results[0].label}</span>
                      </span>
                      <span className="link-arrow">Explore</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/** Navy showcase band: who we are, and a voice from the programmes. */
export function Showcase() {
  const p = programmes[1]
  return (
    <section className="showcase has-pattern">
      <TravelPattern id="showcase" />
      <div className="wrap">
        <div className="showcase-head">
          <p className="eyebrow">Who we are</p>
          <h2>
            <Words text="A Nigerian foundation built on innovation and evidence" />
          </h2>
        </div>

        <article className="spanel reveal">
          <div className="spanel-media">
            <Image
              src="/images/photos/afriscale-guests.jpg"
              alt="Guests at the AfriScale and Ihifix event, seated in the front row."
              fill
              sizes="(min-width: 900px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="spanel-copy">
            <p className="eyebrow">Our vision</p>
            <h2 className="text-[var(--fs-panel)]">{site.vision}</h2>
            <p className="lead">
              Founded in Kaduna in {site.founded} as the social impact arm of the Ihifix Group, we work alongside
              communities, government and global partners to unlock human potential across Africa.
            </p>
            <ButtonLink href="/about" variant="ink">
              Read our story
            </ButtonLink>
          </div>
        </article>

        <article className="spanel rev reveal">
          <div className="spanel-media">
            <Image
              src="/images/photos/afriscale-audience.jpg"
              alt="Participants listening at an AfriScale and Ihifix session."
              fill
              sizes="(min-width: 900px) 45vw, 100vw"
              className="object-cover object-[40%_center]"
            />
          </div>
          <figure className="spanel-copy m-0">
            <p className="eyebrow">Voices from our programmes</p>
            <blockquote className="m-0">&ldquo;{p.story.quote}&rdquo;</blockquote>
            <figcaption className="lead">
              {p.story.attribution} · {p.title}
              <span className="mt-2 block text-[var(--fs-xs)] text-text-3">
                Shared with informed consent. Names withheld for safeguarding.
              </span>
            </figcaption>
            <ButtonLink href={`/programmes/${p.slug}`}>See the programme</ButtonLink>
          </figure>
        </article>
      </div>
    </section>
  )
}

export function PartnerStrip() {
  // One tile per organisation: partnerships that share a logo (e.g. two USAID programmes) appear once.
  const seen = new Set<string>()
  const tiles = partners.filter((p) => {
    const key = p.logo?.src ?? p.name
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  return (
    <section className="section overflow-hidden">
      <div className="wrap">
        <SectionHead
          eyebrow="Trusted by"
          title="Partners who share our ambition"
          intro="Global funders, government agencies, civil society and technology leaders."
          action={<TextLink href="/partner-with-us">Become a partner</TextLink>}
        />
      </div>
      <div className="marquee-mask">
        <ul aria-label="Selected partners" className="sr-only">
          {tiles.map((p) => (
            <li key={p.name}>{p.logo?.label ?? p.name}</li>
          ))}
        </ul>
        <div aria-hidden="true" className="animate-marquee flex w-max gap-4">
          {[...tiles, ...tiles].map((p, i) => (
            <span key={`${p.name}-${i}`} className="partner-logo">
              {p.logo ? (
                <>
                  <Image src={p.logo.src} alt="" width={p.logo.width} height={p.logo.height} />
                  {p.logo.src.includes('kaduna') && <span className="partner-logo-text">Kaduna State Government</span>}
                </>
              ) : (
                <span className="partner-logo-text">{p.name}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
