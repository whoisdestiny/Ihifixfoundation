import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap, MapPin, Users } from 'lucide-react'
import { ButtonLink, SectionHead, TextLink, TravelPattern, VerificationBadge, Words } from './ui'
import { CountUp, Reveal } from './motion'
import { metrics, metricsAsOf, partners, programmes, site } from '@/lib/site-data'

export function HomeHero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="loc">
            <MapPin aria-hidden="true" />
            Kaduna, Nigeria <span className="muted">· Since {site.founded}</span>
          </p>
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
            <ButtonLink href="/partner-with-us">Partner with us</ButtonLink>
            <ButtonLink href="/donate" variant="ghost">
              Donate
            </ButtonLink>
          </div>
          <ul className="trust">
            <li>Community-led since {site.founded}</li>
            <li>Independent board</li>
            <li>Every figure sourced</li>
          </ul>
          <p className="mt-6 text-sm text-text-3">
            Looking for support?{' '}
            <Link href="/get-involved#apply" className="inline-link">
              Find a programme near you
            </Link>
          </p>
        </div>

        <div className="hero-art">
          <div className="hero-photo">
            <Image
              src="/images/hero-digital-skills.png"
              alt="Young Nigerian women and men learning digital skills together on laptops in a training room."
              fill
              priority
              sizes="(min-width: 960px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="float f1">
            <span className="ic">
              <Users strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span>
              <b>
                <CountUp value={metrics[0].value} /> lives impacted
              </b>
              <small>Training, support and advocacy</small>
            </span>
          </div>
          <div className="float f2 navy">
            <span className="ic">
              <GraduationCap strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span>
              <b>{metrics[2].value} digital learners</b>
              <small>Across 8 states with Google</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ImpactStrip() {
  const shown = metrics.slice(0, 4)
  return (
    <section aria-labelledby="impact-strip" className="section">
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
          {programmes.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 80}>
              <Link href={`/programmes/${p.slug}`} className="prog">
                <div className="prog-media">
                  <Image src={p.image} alt="" fill sizes="(min-width: 700px) 50vw, 100vw" className="object-cover" />
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
          ))}
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
              src="/images/human-capital.png"
              alt="Participants at an Ihifix community training session."
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
            <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 900px) 45vw, 100vw" className="object-cover" />
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
  const list = partners.slice(0, 10)
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
          {list.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
        <div aria-hidden="true" className="animate-marquee flex w-max gap-3">
          {[...list, ...list].map((p, i) => (
            <span key={`${p.name}-${i}`} className="partner-pill">
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
