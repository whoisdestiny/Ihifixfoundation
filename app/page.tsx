import { HomeHero, ImpactStrip, PartnerStrip, ProgrammesGrid, Showcase } from '@/components/site/home-sections'
import { CtaBand } from '@/components/site/ui'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ImpactStrip />
      <ProgrammesGrid />
      <Showcase />
      <PartnerStrip />
      <CtaBand
        title="Help us reach the next 100,000"
        body="Every gift and every partnership puts skills, support and opportunity within reach of someone who needs it."
        primary={{ label: 'Donate now', href: '/donate' }}
        secondary={{ label: 'Partner with us', href: '/partner-with-us' }}
      />
    </>
  )
}
