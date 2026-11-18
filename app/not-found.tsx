import { ButtonLink, TravelPattern, Words } from '@/components/site/ui'

export default function NotFound() {
  return (
    <section className="notfound page-hero has-pattern pattern-light">
      <TravelPattern id="notfound" />
      <div className="wrap py-16 md:py-24">
        <p className="eyebrow">Error 404</p>
        <h1 className="max-w-[14em]">
          <Words text="We couldn't find" /> <em><Words text="that page." start={3} /></em>
        </h1>
        <p className="lead">It may have moved. Try one of these instead.</p>
        <div className="btn-row">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/programmes" variant="ghost">
            Our programmes
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
