// Copy sourced from https://klardatalabs.com/
const SITE = 'https://klardatalabs.com'

export const links = {
  email: 'contact@mail.klardatalabs.com',
  booking:
    'https://outlook.office.com/bookwithme/user/00e5ddc728ee4c1d9679a69414027ad1@klardatalabs.com/meetingtype/LIpF2aV6q0-rAx_PIivJiQ2?anonymous&ismsaljsauthenabled&ep=mLinkFromTile',
  linkedin: 'https://www.linkedin.com/company/klardatalabs',
  github: 'https://github.com/klardatalabs',
  german: `${SITE}/de`,
  articles: `${SITE}/articles.php`,
}

export const menu = [
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Insights', href: '#insights' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Free consultation', href: links.booking, external: true },
]

export const hero = {
  eyebrow: 'SAP · Digital · AI consultancy',
  title: 'Clarity for smarter decisions.',
  lead: 'Clarity for smarter',
  // the last word of the headline types itself through what we improve
  words: ['decisions.', 'operations.', 'growth.', 'automation.', 'transformation.'],
  body: 'We turn business challenges into innovation through SAP, Digital, and AI expertise that simplifies operations and drives growth.',
  offices: ['Zurich', 'Oldenburg', 'Bangalore'],
  stack: ['SAP', 'SAP BTP', 'SAP Integration', 'ServiceNow', 'ITSM', 'CSM', 'Now Assist', 'Agentic AI', 'Generative AI', 'RAG', 'n8n', 'Data Engineering'],
}

export const manifesto = 'Solving customer challenges through technology & innovation.'

export const statement = {
  caption: 'Who we are',
  text: 'We are one of the fastest-growing SAP and Digital transformation consultancies in Europe — turning business challenges into innovation that simplifies operations and drives growth.',
  pillars: [
    { title: 'Turn', body: 'Turning challenges into opportunities with SAP, Digital, and AI.' },
    { title: 'Empower', body: 'Empowering innovation through smart enterprise solutions.' },
    { title: 'Clarify', body: 'Enabling clarity for smarter decisions.' },
  ],
}

export const services = {
  caption: 'Our services',
  stages: [
    {
      name: 'SAP Services',
      body: 'Comprehensive SAP, SAP BTP, and Integration consulting, implementation, and support to help enterprises accelerate their digital transformation.',
      cards: [
        { glyph: 'grid', title: 'SAP Consulting & Implementation', body: 'Consulting, implementation, and support across your SAP landscape.' },
        { glyph: 'link', title: 'SAP BTP & Integration', body: 'Extend and connect SAP with SAP BTP and integration services.' },
      ],
    },
    {
      name: 'Digital Services',
      body: 'Modernize operations with ServiceNow — workflow automation and enhanced service delivery across the platform.',
      cards: [
        { glyph: 'flow', title: 'ServiceNow Consulting & Implementation', body: 'Workflow automation and better service delivery on ServiceNow.' },
        { glyph: 'bars', title: 'CSM · ITSM · App Engine · Now Assist', body: 'Customer and IT service operations, custom apps, and GenAI assistance.' },
      ],
    },
    {
      name: 'AI Services',
      body: 'AI Strategy, Predictive & GenAI, Data Engineering & Model Training — turning data into smarter decisions and automation.',
      cards: [
        { glyph: 'peak', title: 'AI Strategy & Consulting', body: 'Find where AI and automation create real value in your business.' },
        { glyph: 'spark', title: 'Predictive & Generative AI', body: 'Data engineering and model training that turn data into decisions.' },
      ],
    },
  ],
}

export const approach = {
  caption: 'Our approach',
  title: 'From first call to kickoff.',
  body: 'We listen first, prove the idea early, and move quickly once you’re ready — so your transformation starts with confidence.',
  steps: [
    {
      title: 'We Listen First',
      body: 'A free assessment call to understand your goals, challenges, and priorities.',
    },
    {
      title: 'From Ideas to Action',
      body: 'An initial concept or demo, with a sample system and supporting documentation.',
    },
    {
      title: 'Clarify & Collaborate',
      body: 'We align on requirements and pick the right consultants for each functional area.',
    },
    {
      title: 'Project Kickoff',
      body: 'Clear milestones and a smooth, confident start to your transformation journey.',
    },
  ],
}

export const insights = {
  caption: 'Insights',
  title: 'Notes from the field.',
  items: [
    {
      tag: 'Automation',
      title: 'Automated Preliminary Accident Cost Estimation',
      excerpt:
        'Claims adjusters spend 60–80 minutes per claim on administrative handling rather than damage assessment. Here’s how we automated the intake.',
      date: 'Dec 17, 2025',
      href: 'https://www.linkedin.com/pulse/automated-preliminary-accident-cost-estimation-klardatalabs-t4vse',
      seed: 3,
    },
    {
      tag: 'Automation',
      title: 'Reinventing Talent Acquisition with Event-Driven, AI-Augmented Architecture',
      excerpt:
        'Traditional ATS systems are outdated. We built a fully event-driven, AI-augmented recruitment platform that operates 24/7.',
      date: 'Nov 26, 2025',
      href: 'https://www.linkedin.com/pulse/reinventing-talent-acquisition-event-driven-ai-augmented-etgif',
      seed: 11,
    },
    {
      tag: 'AI',
      title: 'Building an AI-Powered Policy Assistant: From MVP to Scalable Solution',
      excerpt:
        'Upload scattered policy documents and query them conversationally, with answers grounded in the source material using RAG.',
      date: 'Nov 16, 2025',
      href: 'https://www.linkedin.com/pulse/building-ai-powered-policy-assistant-from-mvp-scalable-solution-vhosf',
      seed: 29,
    },
  ],
}

export const solutions = {
  caption: 'Our solutions',
  title: 'AI and automation you can try today.',
  demos: [
    {
      tag: 'RAG · AI',
      name: 'Policy Intelligence',
      body: 'Upload scattered policy documents and ask questions in plain language — answers grounded in the source.',
      href: `${SITE}/KlarDataLabsPolicyIntelligenceDemo.php`,
    },
    {
      tag: 'n8n · Automation',
      name: 'Recruitment Automation',
      body: 'Event-driven, AI-augmented screening that removes bottlenecks and runs 24/7.',
      href: `${SITE}/KlarDataLabs-n8n-Recruitment-Automation.php`,
    },
    {
      tag: 'n8n · Automation',
      name: 'Accident Estimation',
      body: 'Automated claim intake and preliminary cost estimates, so adjusters can focus on assessment.',
      href: `${SITE}/KlarDataLabs-Accident-damage-estimation-tool.php`,
    },
  ],
  more: [
    { label: 'Agentic AI', href: `${SITE}/KlarDataLabs-Agentic-AI-Offering.php` },
    { label: 'Manufacturing', href: links.booking },
    { label: 'Financials', href: links.booking },
  ],
}

export const footer = {
  vision:
    'To create a world where passion and innovation transform every challenge into opportunity — uniting technology, collaboration, and human insight to bring clarity for smarter decisions.',
  company: [
    { label: 'Services', href: '#services' },
    { label: 'Approach', href: '#approach' },
    { label: 'Insights', href: '#insights' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Free consultation', href: links.booking, external: true },
  ],
  offices: ['Zurich', 'Oldenburg', 'Bangalore'],
}
