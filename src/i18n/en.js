// English copy (default language). German lives in de.js and loads as its own bundle.
export default {
  lang: 'en',
  meta: {
    title: 'KlarDataLabs — SAP, ServiceNow & AI-Driven Automation',
    contactTitle: 'Contact — KlarDataLabs',
    description: 'KlarDataLabs builds AI-powered automation that solves real operational problems — combining SAP and ServiceNow expertise with full-stack engineering, n8n workflows, and agentic AI.',
  },

  ui: {
    home: 'KlarDataLabs — back to top',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
    backToTop: 'Back to top',
    scrollNext: 'Scroll to next section',
    scroll: 'Scroll',
    tech: 'Technologies we work with',
    letsTalk: 'Let’s talk',
    contactUs: 'Contact us',
    startConversation: 'Start a conversation',
    explore: 'Explore services',
    step: 'Step',
    optional: 'optional',
  },

  menu: [
    { label: 'Services', href: '#services' },
    { label: 'Approach', href: '#approach' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '/contact' },
  ],

  hero: {
    eyebrow: 'SAP · ServiceNow · AI · Engineering',
    title: 'Clarity for smarter decisions.',
    lead: 'Clarity for smarter',
    // the last word of the headline types itself through what we improve
    words: ['decisions.', 'operations.', 'growth.', 'automation.', 'transformation.'],
    body: 'We turn business challenges into innovation through SAP, ServiceNow, and AI expertise that simplifies operations and drives growth.',
    offices: ['Zurich', 'Bangalore'],
    stack: ['SAP', 'SAP BTP', 'SAP Integration', 'ServiceNow', 'Agentic AI', 'Generative AI', 'RAG', 'n8n', 'Data Engineering'],
  },

  statement: {
    caption: 'Who we are',
    text: 'Klar means clear — and that’s exactly what we bring to complex operations. We build AI-powered automation that solves real operational problems, combining 20 years of hands-on SAP expertise and ServiceNow know-how with full-stack engineering, n8n workflows, and agentic AI.',
    pillars: [
      { title: 'Turn', body: 'Turning operational complexity into automation that works.' },
      { title: 'Empower', body: 'Empowering teams with automation that runs on its own, and AI that knows when to bring a human in.' },
      { title: 'Clarify', body: 'Enabling clarity for smarter decisions.' },
    ],
  },

  services: {
    caption: 'Our services',
    stages: [
      {
        name: 'SAP Services',
        body: 'Comprehensive SAP — on-premise and cloud — consulting, implementation, and integration services. Built on 20 years of hands-on SAP expertise, not theory.',
        cards: [
          { glyph: 'grid', title: 'SAP On-Premise', body: 'Consulting, implementation, and support across your on-premise SAP landscape — from ECC to S/4HANA.' },
          { glyph: 'spark', title: 'SAP Cloud (BTP)', body: 'Extend and modernize with SAP BTP — cloud-native integration, SAP Build, Joule AI, and automation.' },
          { glyph: 'link', title: 'SAP Integration', body: 'We support the full integration landscape — SAP PI/PO, SAP Integration Suite, API Management, and beyond.' },
          { glyph: 'bars', title: 'Hybrid Cloud Solutions', body: 'Our experts build hybrid SAP solutions across Azure, AWS, and GCP — connecting SAP with the hyperscaler ecosystem your business already runs on.' },
        ],
      },
      {
        name: 'ServiceNow Services',
        body: 'Modernize operations with ServiceNow — workflow automation and enhanced service delivery across the platform.',
        cards: [
          { glyph: 'flow', title: 'ServiceNow Consulting & Implementation', body: 'Workflow automation and better service delivery on ServiceNow — from platform setup to go-live.' },
          { glyph: 'peak', title: 'AI-Native ServiceNow', body: 'Autonomous AI workforce, enterprise governance & security, and AI-native infrastructure — built on the platform.' },
        ],
      },
      {
        name: 'AI Services',
        body: 'Agentic AI & Automation, Predictive & Generative AI, Data Engineering & Model Training — turning data into smarter decisions and automation.',
        cards: [
          { glyph: 'flow', title: 'Agentic AI & Automation', body: 'Autonomous agents built with Strands and LangGraph, plus n8n workflows that handle real operational work — from routing to resolution.' },
          { glyph: 'peak', title: 'Predictive & Generative AI', body: 'Our AI/ML practice delivers forecasting, automation, and generative AI that turn insight into action.' },
          { glyph: 'bars', title: 'Data Engineering & Model Training', body: 'Data pipelines and model training that turn raw data into decisions.' },
        ],
      },
      {
        name: 'Full-Stack Engineering',
        body: 'Full-stack products built with React and Python — from prototype to production, designed to scale.',
        cards: [
          { glyph: 'grid', title: 'Web Applications', body: 'Full-stack web applications built with React and Python — from prototype to production.' },
          { glyph: 'link', title: 'API & Backend Development', body: 'Robust, scalable backends and APIs that connect your systems and power your products.' },
          { glyph: 'spark', title: 'Cloud-Native Architecture', body: 'Modern, microservices-based applications designed to scale — built on Azure, AWS, and GCP.' },
        ],
      },
    ],
  },

  approach: {
    caption: 'Our approach',
    title: 'From first call to kickoff.',
    body: 'We listen first, prove the idea early, and move quickly once you’re ready — so your transformation starts with confidence.',
    steps: [
      { title: 'We Listen First', body: 'An initial assessment call to understand your goals, challenges, and priorities — so we can craft solutions that deliver real value from day one.' },
      { title: 'From Ideas to Action', body: 'Based on our discussion, we develop an initial concept or demo, with a sample system and all supporting documentation for review.' },
      { title: 'Clarify & Collaborate', body: 'We address your questions, align on requirements, and pick the right consultants for each functional area.' },
      { title: 'Project Kickoff', body: 'Once agreed, we move quickly into execution — clear milestones and a smooth, confident start to your transformation.' },
    ],
  },

  projects: {
    caption: 'Our work',
    title: 'Live and working.',
    body: 'A selection of projects we’ve built and shipped for our clients.',
    items: [
      { title: 'Visual Configurator', body: 'Full-stack 3D product configurator built end-to-end and deployed on AWS.', area: 'Full-Stack Engineering', practice: 'fullstack' },
      { title: 'Term-Sheet Engine', body: 'AI and OCR engine generating term sheets for parametric insurance clients.', area: 'Predictive & Generative AI', practice: 'ai' },
      { title: 'Finance Automation', body: 'Automated finance processes using n8n connected to SAP Public Cloud.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Turbine Intelligence', body: 'Real-time anomaly detection from live wind turbine SCADA data streams.', area: 'Predictive & Generative AI', practice: 'ai' },
      { title: 'Compliance Platform', body: 'Compliance and auditing platform built for a food safety company.', area: 'Full-Stack Engineering', practice: 'fullstack' },
      { title: 'Treasury Chatbot', body: 'AI chatbot for an African treasury agency using public UN data.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'SAP Integration', body: 'Connected SAP PO to SAP CPI for a major Asian customer.', area: 'SAP Integration', practice: 'sap' },
      { title: 'Invoice Automation', body: 'AI and LLM-powered vendor invoicing automation built on SAP.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'BTP Hub', body: 'Implemented SAP BTP integration hub for a major manufacturing enterprise.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'BTP Build', body: 'SAP BTP Build project delivered in the PP/SD process area.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Autonomous Agents', body: 'Built autonomous agents for ServiceNow business process consultants and developers.', area: 'AI-Native ServiceNow', practice: 'servicenow' },
      { title: 'Custom Nodes', body: 'Built custom n8n nodes tailored for a key enterprise customer.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Legacy MCPs', body: 'Custom MCPs connecting legacy applications across AWS, API, and PostgreSQL.', area: 'API & Backend Development', practice: 'fullstack' },
      { title: 'HR Integration', body: 'Built HR, MCP, and SAP API Management solution for a SAP client.', area: 'SAP Integration', practice: 'sap' },
      { title: 'HR Automation', body: 'Full HR process automation built end-to-end using n8n workflows.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Accident Estimation', body: 'Automated accident cost estimation engine built entirely using n8n.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Legal RAG', body: 'Built a RAG model for an Indian legal team’s document search.', area: 'Data Engineering & Model Training', practice: 'ai' },
      { title: 'Payment Integration', body: 'Custom ServiceNow app integrating payment platform capabilities for clients.', area: 'ServiceNow Consulting & Implementation', practice: 'servicenow' },
    ],
  },

  contact: {
    caption: 'Contact',
    title: 'Tell us where things feel unclear.',
    body: 'Share a little about your team and what you want to automate or build. We’ll get back to you to find the right place to start.',
    side: { email: 'Prefer email?', address: 'Address', offices: 'Offices' },
    fields: {
      name: 'Full name',
      email: 'Work email',
      company: 'Company',
      role: 'Your role',
      website: 'Company website',
      needs: 'What can we help with?',
      needsOptions: ['SAP', 'ServiceNow', 'AI & Automation', 'Full-Stack Engineering', 'Not sure yet'],
      message: 'Tell us about your project',
      messagePlaceholder: 'What are you trying to solve? Systems, timelines — anything that helps.',
      timeline: 'Timeline',
      timelineOptions: ['As soon as possible', 'This quarter', 'This year', 'Just exploring'],
      timelinePlaceholder: 'Select a timeline',
      source: 'How did you hear about us?',
      consent: 'I agree that KlarDataLabs may use these details to respond to my enquiry.',
    },
    errors: {
      required: 'Please fill this in.',
      email: 'Please enter a valid email address.',
      consent: 'Please confirm so we can reply.',
    },
    submit: 'Send message',
    sending: 'Sending…',
    success: { title: 'Thank you — your message is in.', body: 'We’ll be in touch soon at the email you gave us.', again: 'Send another message' },
    failure: 'Something went wrong sending your message. Please email us directly at',
  },

  footer: {
    caption: 'Let’s talk',
    line: 'Solving customer challenges through technology & innovation.',
    visionTitle: 'Our vision',
    vision: 'To create a world where passion and innovation transform every challenge into opportunity — uniting technology, collaboration, and human insight to bring clarity for smarter decisions.',
    companyTitle: 'Company',
    company: [
      { label: 'Services', href: '#services' },
      { label: 'Approach', href: '#approach' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '/contact' },
    ],
    officesTitle: 'Offices',
    offices: ['Zurich', 'Bangalore'],
    connectTitle: 'Connect',
  },
}
