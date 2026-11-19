// Content mirrors the Ihifix company profile. Structured so it can move into a headless CMS
// (PRD CM-02) without changing the page templates.

export const site = {
  name: 'Ihifix Innovation Foundation',
  shortName: 'Ihifix Foundation',
  tagline: 'Empowering the Vulnerable. Transforming Communities.',
  vision: 'A developed Africa, where everyone is empowered to live a dignified life.',
  mission:
    'To empower the poor and vulnerable in Africa with psycho-social support, functional knowledge, in-demand skills, and a solution-based mindset.',
  url: 'https://foundation.ihifix.com',
  email: 'info@ihifix.com',
  address: 'No. 2 Ahman Pategi Road, Off Alkali Road, close to First Care Hospital, Kaduna, Nigeria',
  founded: 2017,
  socials: [
    { label: 'Facebook', href: 'https://web.facebook.com/ihifix' },
    { label: 'Instagram', href: 'https://www.instagram.com/ihifix_/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ihifix/' },
  ],
  group: [
    { label: 'Ihifix Group', href: 'https://www.ihifix.com' },
    { label: 'Digital Academy', href: 'https://academy.ihifix.com' },
    { label: 'International School', href: 'https://ihifix.sch.ng' },
  ],
}

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Impact', href: '/impact' },
  { label: 'Partners', href: '/partners' },
  { label: 'Get involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
]

export const metricsAsOf = 'December 2024'

export type Metric = {
  value: string
  label: string
  definition: string
  period: string
  source: string
  status: 'Verified' | 'Under verification'
  scope: 'Foundation' | 'Group-wide'
}

export const metrics: Metric[] = [
  {
    value: '105,000+',
    label: 'Lives impacted',
    definition: 'Direct beneficiaries reached through training, support and advocacy programmes.',
    period: '2017 – 2024',
    source: 'Ihifix company profile; programme records',
    status: 'Under verification',
    scope: 'Group-wide',
  },
  {
    value: '60,000+',
    label: 'Youth empowered',
    definition: 'Young people enrolled in apprenticeship and community skills training under Mafita.',
    period: '2018 – 2021',
    source: 'UKAID/DFID Mafita programme reporting',
    status: 'Under verification',
    scope: 'Foundation',
  },
  {
    value: '45,000+',
    label: 'Trained in digital skills',
    definition: 'Participants completing Google-supported digital skills training across 8 states.',
    period: '2017 – present',
    source: 'Google partnership records',
    status: 'Under verification',
    scope: 'Foundation',
  },
  {
    value: '15+',
    label: 'Strategic partnerships',
    definition: 'Formal programme partnerships with funders, governments and technical partners.',
    period: '2017 – 2024',
    source: 'Partnership agreements',
    status: 'Under verification',
    scope: 'Group-wide',
  },
  {
    value: '80+',
    label: 'Women & girls trained',
    definition: 'Women and girls completing digital literacy and entrepreneurship training.',
    period: '2019',
    source: 'Ford Foundation programme report',
    status: 'Under verification',
    scope: 'Foundation',
  },
  {
    value: '4',
    label: 'National summits',
    definition: 'National summits and conferences convened, including Digital Summits and Afriscale.',
    period: '2021 – 2024',
    source: 'Event records',
    status: 'Under verification',
    scope: 'Group-wide',
  },
]

export type Programme = {
  slug: string
  title: string
  short: string
  image: string
  imageAlt: string
  /** Tailwind object-position class to keep the subject in frame. */
  imagePosition?: string
  problem: string
  whatWeDo: string[]
  whoWeServe: string[]
  howItWorks: string[]
  results: { value: string; label: string }[]
  partners: string[]
  story: { quote: string; attribution: string }
  externalLinks?: { label: string; href: string }[]
}

export const programmes: Programme[] = [
  {
    slug: 'human-capital-development',
    title: 'Human Capital Development',
    short:
      'Education and psycho-social support that help people acquire knowledge, overcome trauma and build in-demand digital skills.',
    image: '/images/photos/corps-members.jpg',
    imageAlt: 'Young corps members in uniform at an Ihifix training session.',
    imagePosition: 'object-[60%_30%]',
    problem:
      'Millions of young Nigerians, many affected by conflict and displacement, lack access to quality learning, emotional support and the digital skills employers now expect.',
    whatWeDo: [
      'Deliver digital skills training in partnership with Google across 8 states.',
      'Provide psycho-social support alongside learning so participants can heal and focus.',
      'Upskill educators and institutional staff, including work with TETFund.',
    ],
    whoWeServe: [
      'Out-of-school and unemployed youth',
      'Displaced and conflict-affected communities',
      'Educators and public-sector staff',
    ],
    howItWorks: [
      'Community outreach and enrolment through local partners',
      'Blended learning: in-person sessions with low-data online follow-up',
      'Mentoring and psycho-social check-ins throughout',
      'Certification and linkage to jobs or further learning',
    ],
    results: [
      { value: '45,000+', label: 'trained via Google across 8 states' },
      { value: '75', label: 'TETFund staff upskilled (2022)' },
    ],
    partners: ['Google', 'TETFund', 'Kaduna State Government'],
    story: {
      quote:
        'The training gave me more than skills. It gave me the confidence to believe my ideas matter and that I can build something.',
      attribution: 'Programme participant, Kaduna (name withheld)',
    },
  },
  {
    slug: 'gender-equity-inclusion',
    title: 'Gender Equity & Inclusion',
    short:
      'Equal rights for women, girls and persons with disability to access social protection and take part in the economy.',
    image: '/images/photos/women-in-tech.jpg',
    imageAlt: 'Women applauding at a women-in-tech watch party at the Ihifix hub in Kaduna.',
    imagePosition: 'object-[50%_60%]',
    problem:
      'Women, girls and persons with disability face structural barriers to education, finance and social protection, leaving their potential untapped.',
    whatWeDo: [
      'Run digital literacy and entrepreneurship training designed for women and girls.',
      'Advocate for inclusive social-protection policies.',
      'Design programmes accessible to persons with disability from the start.',
    ],
    whoWeServe: ['Women and girls', 'Persons with disability', 'Female-headed households'],
    howItWorks: [
      'Safe, women-led learning spaces',
      'Practical digital and business modules',
      'Peer support groups that continue after training',
      'Referral to finance and social-protection schemes',
    ],
    results: [
      {
        value: '80+',
        label: 'women and girls trained with the Ford Foundation (2019)',
      },
    ],
    partners: ['Ford Foundation'],
    story: {
      quote:
        'I now manage my orders on my phone and keep proper records. My business is growing and I teach other women what I learned.',
      attribution: 'Training graduate (name withheld)',
    },
  },
  {
    slug: 'micro-business-growth',
    title: 'Micro-Business Growth',
    short:
      'Supporting youth- and women-led micro-businesses through entrepreneurship, apprenticeships and access to markets.',
    image: '/images/photos/afriscale-speaker.jpg',
    imageAlt: 'A speaker addresses entrepreneurs at the AfriScale business event.',
    imagePosition: 'object-[30%_center]',
    problem:
      'Micro-businesses employ most working Nigerians but struggle with skills, finance and visibility, limiting growth and job creation.',
    whatWeDo: [
      'Deliver apprenticeship and community skills training through programmes like Mafita.',
      'Coach entrepreneurs on bookkeeping, digital marketing and growth.',
      'Convene Afriscale, a Pan-African SME scaling summit.',
    ],
    whoWeServe: ['Youth-led micro-businesses', 'Women entrepreneurs', 'Apprentices and artisans'],
    howItWorks: [
      'Skills assessment and apprenticeship placement',
      'Business clinics and mentoring',
      'Market linkage and peer networks',
      'Showcases and investor exposure through Afriscale',
    ],
    results: [{ value: '60,000+', label: 'youth empowered through UKAID/DFID Mafita' }],
    partners: ['UKAID/DFID', 'USAID NERI'],
    story: {
      quote: 'The apprenticeship turned my skill into a business. I now employ two young people from my street.',
      attribution: 'Mafita alumnus (name withheld)',
    },
  },
  {
    slug: 'good-governance',
    title: 'Good Governance',
    short:
      'Advocacy for stronger laws, policies and systems, powered by civic technology that puts citizens at the centre.',
    image: '/images/photos/digital-summit-audience.jpg',
    imageAlt: 'A full hall at the Ihifix Digital Summit for Development on open government.',
    problem:
      'When citizens cannot see or shape public budgets and services, resources rarely reach the people who need them most.',
    whatWeDo: [
      'Build civic tech platforms such as Meepeeya and Citizens Demand.',
      'Support citizen monitoring infrastructure in Kaduna State.',
      'Advance accountability work in Borno and Zamfara with the MacArthur Foundation.',
    ],
    whoWeServe: ['Citizens and community groups', 'Civil society organisations', 'State governments and agencies'],
    howItWorks: [
      'Collect citizen priorities through accessible digital tools',
      'Translate demands into budget and policy proposals',
      'Engage government through dialogue and town halls',
      'Track delivery and report back to communities',
    ],
    results: [
      { value: '3+', label: 'civic tech platforms built' },
      {
        value: '2023',
        label: 'Citizens Demand informed the Kaduna State budget',
      },
    ],
    partners: ['MacArthur Foundation', 'USAID State2State', 'DFID PERL / CSOs', 'Kaduna State Government'],
    story: {
      quote:
        'For the first time, our community’s request for a clinic appeared in the state budget because we could submit it ourselves.',
      attribution: 'Community representative, Kaduna State (name withheld)',
    },
  },
]

export const milestones = [
  {
    year: '2017',
    title: 'Foundation established in Kaduna',
    detail: 'Partnerships begin with Google, the MacArthur Foundation and Kaduna State Government.',
  },
  {
    year: '2018',
    title: 'UKAID/DFID Mafita',
    detail: 'Apprenticeship and community skills training for young people launches.',
  },
  {
    year: '2019',
    title: 'USAID NERI and Ford Foundation',
    detail: 'Digital literacy and entrepreneurship training for women and girls.',
  },
  {
    year: '2021',
    title: '60,000+ youth and two Digital Summits',
    detail: 'Mafita reaches 60,000+ youth; two national Digital Summits convened.',
  },
  {
    year: '2022',
    title: 'Meepeeya, Citizens Demand, TETFund',
    detail: 'Civic tech platforms launch; 75 TETFund staff upskilled.',
  },
  {
    year: '2023–24',
    title: 'Citizens Demand informs the budget',
    detail: 'Citizen priorities feed the Kaduna State budget; Afriscale SME conference held.',
  },
]

export type PartnerLogo = { src: string; width: number; height: number; label: string }

/** Official logos (Wikimedia Commons). Several partnerships share one organisation's logo. */
export const partnerLogos = {
  google: { src: '/images/partners/google.svg', width: 272, height: 92, label: 'Google' },
  ukaid: { src: '/images/partners/ukaid.svg', width: 315, height: 339, label: 'UK aid' },
  usaid: { src: '/images/partners/usaid.png', width: 482, height: 144, label: 'USAID' },
  ford: { src: '/images/partners/ford.png', width: 960, height: 120, label: 'Ford Foundation' },
  macarthur: { src: '/images/partners/macarthur.png', width: 454, height: 160, label: 'MacArthur Foundation' },
  kaduna: { src: '/images/partners/kaduna.png', width: 156, height: 160, label: 'Kaduna State Government' },
} satisfies Record<string, PartnerLogo>

export type Partner = {
  name: string
  period: string
  type: string
  impact: string
  logo?: PartnerLogo
}

export const partners: Partner[] = [
  {
    name: 'Google',
    logo: partnerLogos.google,
    period: '2017 – present',
    type: 'Technology',
    impact: '45,000+ trained in digital skills across 8 states',
  },
  {
    name: 'UKAID / DFID',
    logo: partnerLogos.ukaid,
    period: '2018 – 2021',
    type: 'Development',
    impact: '60,000+ youth empowered through Mafita',
  },
  {
    name: 'USAID NERI',
    logo: partnerLogos.usaid,
    period: '2019',
    type: 'Development',
    impact: 'Economic resilience programming',
  },
  {
    name: 'USAID State2State',
    logo: partnerLogos.usaid,
    period: '2022',
    type: 'Governance',
    impact: 'Meepeeya civic engagement platform',
  },
  {
    name: 'Ford Foundation',
    logo: partnerLogos.ford,
    period: '2019',
    type: 'Social Impact',
    impact: '80 women and girls trained in digital literacy',
  },
  {
    name: 'MacArthur Foundation',
    logo: partnerLogos.macarthur,
    period: '2017 – present',
    type: 'Governance',
    impact: 'Accountability work in Borno and Zamfara',
  },
  {
    name: 'TETFund',
    period: '2022',
    type: 'Government',
    impact: '75 staff upskilled',
  },
  {
    name: 'Kaduna State Government',
    logo: partnerLogos.kaduna,
    period: '2017 – present',
    type: 'Government',
    impact: 'Citizen monitoring infrastructure',
  },
  {
    name: 'DFID PERL / CSOs',
    logo: partnerLogos.ukaid,
    period: '2022',
    type: 'Governance',
    impact: 'Citizens Demand platform',
  },
]

export type Person = { name: string; role: string; bio: string; photo: string }

/** Founder and board, in the order shown on ihifix.com. */
export const team: Person[] = [
  {
    name: 'Emmanuel Odeh Adikpe',
    role: 'Founder & CEO',
    bio: 'Digital specialist and Certified Management Consultant with over 10 years leading large-scale education and technology initiatives.',
    photo: '/images/people/emmanuel-odeh-adikpe.png',
  },
  {
    name: 'Omano Edigheji, Ph.D.',
    role: 'Board member',
    bio: 'Development expert with 20+ years advising the UN, governments, and civil society. Associate Professor, University of Johannesburg.',
    photo: '/images/people/omano-edigheji.png',
  },
  {
    name: 'Hafsatu Hamza',
    role: 'Board member',
    bio: 'Country Director, TaRL Africa; 15+ years in education reform; DFID MAFITA; founder, Teen Tycoons Academy.',
    photo: '/images/people/hafsatu-hamza.png',
  },
  {
    name: 'Adewole Adegbesan',
    role: 'Board member',
    bio: 'Business Development Manager, Senior executive, First Bank Nigeria; 15+ years banking; corporate growth.',
    photo: '/images/people/adewole-adegbesan.png',
  },
  {
    name: 'Eugenia Ndukwe',
    role: 'Board member',
    bio: 'MD, XEM Consultants; Chartered Management Consultant; organisational strategy and governance.',
    photo: '/images/people/eugenia-ndukwe.png',
  },
  {
    name: 'Dr. Chidi Chidebe',
    role: 'Board member',
    bio: 'PhD Legislative Studies; political adviser; solar energy entrepreneur.',
    photo: '/images/people/chidi-chidebe.png',
  },
  {
    name: 'Anthony Emebo',
    role: 'Board member',
    bio: 'MSc Marketing (Distinction); led META and Spotify initiatives; Google Grow with Africa Champion.',
    photo: '/images/people/anthony-emebo.png',
  },
  {
    name: 'Dr. Okeme Victor',
    role: 'Board member',
    bio: 'MD/CEO',
    photo: '/images/people/okeme-victor.png',
  },
]

export const values = [
  {
    name: 'Innovation',
    detail: 'We use technology and fresh thinking to solve old problems.',
  },
  {
    name: 'Integrity',
    detail: 'We are transparent about what we do and what it achieves.',
  },
  {
    name: 'Excellence',
    detail: 'We hold our programmes to high standards of quality.',
  },
  {
    name: 'Impact',
    detail: 'We measure success by real change in people’s lives.',
  },
  {
    name: 'Inclusion',
    detail: 'We design for the unreached and underserved first.',
  },
  {
    name: 'Optimism',
    detail: 'We believe a better future is possible, and we build it.',
  },
]

export const reports = [
  {
    title: 'Impact Report 2017 – 2024',
    type: 'Impact report',
    year: '2024',
    size: 'PDF · coming soon',
  },
  {
    title: 'Citizens Demand: Kaduna Budget Brief',
    type: 'Policy brief',
    year: '2023',
    size: 'PDF · coming soon',
  },
  {
    title: 'Mafita Programme Summary',
    type: 'Programme report',
    year: '2021',
    size: 'PDF · coming soon',
  },
  {
    title: 'Safeguarding Policy',
    type: 'Policy',
    year: '2024',
    size: 'PDF · coming soon',
  },
  {
    title: 'Data Protection & Privacy Policy',
    type: 'Policy',
    year: '2024',
    size: 'PDF · coming soon',
  },
  {
    title: 'Foundation Fact Sheet',
    type: 'Press kit',
    year: '2024',
    size: 'PDF · coming soon',
  },
]

export const events = [
  {
    title: 'Afriscale SME Scaling Summit',
    date: 'To be announced · 2027',
    location: 'Kaduna, Nigeria',
    past: false,
  },
  {
    title: 'National Digital Summit (archive)',
    date: '2021',
    location: 'Nigeria',
    past: true,
  },
]

export const opportunities = [
  {
    role: 'Digital Skills Volunteer Trainer',
    location: 'Kaduna (on-site)',
    duration: '3 months',
    skills: 'Digital literacy, facilitation',
  },
  {
    role: 'Monitoring & Evaluation Intern',
    location: 'Kaduna / hybrid',
    duration: '6 months',
    skills: 'Data analysis, reporting',
  },
  {
    role: 'Pro-bono Communications Support',
    location: 'Remote',
    duration: 'Flexible',
    skills: 'Writing, design, photography',
  },
]
