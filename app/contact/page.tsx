import type { Metadata } from 'next'
import { PageHero } from '@/components/site/ui'
import { ContactForm } from '@/components/site/forms/contact-form'
import { site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.name} in Kaduna, Nigeria.`,
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Talk to us."
        accent="We read every message."
        intro="We reply to every message within 3 working days."
        crumbs={[{ label: 'Contact' }]}
      />
      <section className="section pt-0 md:pt-0">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="form-panel lg:col-span-7">
            <h2>Send a message</h2>
            <ContactForm />
          </div>
          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div>
              <p className="eyebrow">Our office</p>
              <ul className="contact-list">
                <li>
                  <strong>Address</strong>
                  {site.address}
                </li>
                <li>
                  <strong>Email</strong>
                  <a href={`mailto:${site.email}`} className="inline-link">
                    {site.email}
                  </a>
                </li>
                <li>
                  <strong>Directions</strong>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Ahman+Pategi+Road+Kaduna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow"
                  >
                    Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="callout danger">
              <p className="m-0">
                <strong>Safeguarding concern?</strong> Choose “Safeguarding concern” in the form or email {site.email}{' '}
                with “Safeguarding” in the subject. Reports are handled confidentially.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
