import type { Metadata } from 'next'
import { PageHero } from '@/components/site/ui'
import { site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Policies',
  description: 'Privacy, terms, safeguarding and accessibility policies.',
}

const sections = [
  {
    id: 'privacy',
    title: 'Privacy and data protection',
    body: [
      'We collect only the information needed to respond to you, process donations and deliver programmes. We comply with the Nigeria Data Protection Act 2023 and, where applicable, the GDPR.',
      'We never sell personal data. Card payments are handled by our PCI-compliant payment partner; we do not store card details.',
      `You can request access to, correction of or deletion of your data by emailing ${site.email}.`,
    ],
  },
  {
    id: 'terms',
    title: 'Terms of use',
    body: [
      'Content on this site is provided for information. Impact figures are labelled with their period, source and verification status.',
      'You may share our content with attribution. Photographs of programme participants may not be reused without permission.',
    ],
  },
  {
    id: 'safeguarding',
    title: 'Safeguarding',
    body: [
      'We are committed to protecting children, young people and vulnerable adults in all our work. Staff, volunteers and partners must follow our safeguarding code of conduct.',
      'Stories and images are published only with informed consent, and names are withheld where needed.',
      `To raise a concern confidentially, email ${site.email} with “Safeguarding” in the subject line.`,
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    body: [
      'We aim to meet WCAG 2.1 AA. The site supports keyboard navigation, screen readers and reduced motion, and is designed to load on low-bandwidth mobile connections.',
      'If something isn’t working for you, please contact us and we’ll fix it.',
    ],
  },
]

export default function PoliciesPage() {
  return (
    <>
      <PageHero title="Policies" intro="How we protect people, data and trust." crumbs={[{ label: 'Policies' }]} />
      <section className="section pt-0 md:pt-0">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <nav aria-label="Policies" className="lg:col-span-4">
            <div className="toc lg:sticky lg:top-28">
              <p className="toc-title">On this page</p>
              <ol>
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.title}</a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="doc lg:col-span-8">
            {sections.map((s) => (
              <article key={s.id} id={s.id}>
                <h2>{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </article>
            ))}
            <p className="mt-10 text-sm text-text-3">Last updated: November 2026</p>
          </div>
        </div>
      </section>
    </>
  )
}
