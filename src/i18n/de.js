// German copy. English (default language) lives in en.js; this file loads as its own bundle.
export default {
  lang: 'de',
  meta: {
    title: 'KlarDataLabs — SAP, ServiceNow & KI-gestützte Automatisierung',
    contactTitle: 'Kontakt — KlarDataLabs',
    description: 'KlarDataLabs entwickelt KI-gestützte Automatisierung, die echte operative Probleme löst — mit SAP- und ServiceNow-Expertise, Full-Stack-Engineering, n8n-Workflows und agentischer KI.',
  },

  ui: {
    home: 'KlarDataLabs — zurück nach oben',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schliessen',
    language: 'Sprache',
    backToTop: 'Nach oben',
    scrollNext: 'Zum nächsten Abschnitt scrollen',
    scroll: 'Scrollen',
    tech: 'Technologien, mit denen wir arbeiten',
    letsTalk: 'Sprechen wir miteinander',
    contactUs: 'Kontakt aufnehmen',
    startConversation: 'Gespräch beginnen',
    explore: 'Leistungen entdecken',
    step: 'Schritt',
    optional: 'optional',
  },

  menu: [
    { label: 'Leistungen', href: '#services' },
    { label: 'Vorgehen', href: '#approach' },
    { label: 'Projekte', href: '#projects' },
    { label: 'Kontakt', href: '/contact' },
  ],

  hero: {
    eyebrow: 'SAP · ServiceNow · AI · Engineering',
    title: 'Klarheit für klügere Entscheidungen.',
    lead: 'Klarheit für',
    // the last words of the headline type themselves through what we improve
    words: ['klügere Entscheidungen.', 'effizientere Abläufe.', 'nachhaltiges Wachstum.', 'intelligente Automatisierung.', 'erfolgreiche Transformation.'],
    body: 'Wir machen aus Geschäftsherausforderungen Innovation — mit SAP-, ServiceNow- und KI-Expertise, die Abläufe vereinfacht und Wachstum fördert.',
    offices: ['Zürich', 'Bangalore'],
    stack: ['SAP', 'SAP BTP', 'SAP Integration', 'ServiceNow', 'Agentic AI', 'Generative AI', 'RAG', 'n8n', 'Data Engineering'],
  },

  statement: {
    caption: 'Wer wir sind',
    text: 'Klar heisst klar — und genau das bringen wir in komplexe Abläufe. Wir verbinden die Systeme, mit denen Sie bereits arbeiten — SAP und ServiceNow, gestützt auf 20 Jahre praktische Erfahrung — mit Full-Stack-Engineering, n8n-Workflows und agentischer KI, damit Automatisierung genau dort ankommt, wo es zählt.',
    pillars: [
      { title: 'Verwandeln', body: 'Wir verwandeln operative Komplexität in Automatisierung, die funktioniert.' },
      { title: 'Befähigen', body: 'Wir befähigen Teams mit Automatisierung, die eigenständig läuft, und mit KI, die weiss, wann sie einen Menschen einbeziehen muss.' },
      { title: 'Klären', body: 'Wir schaffen Klarheit für klügere Entscheidungen.' },
    ],
  },

  services: {
    caption: 'Unsere Leistungen',
    stages: [
      {
        name: 'SAP-Services',
        body: 'Umfassende SAP-Services — On-Premise und Cloud — von Beratung über Implementierung bis Integration. Basierend auf 20 Jahren praktischer SAP-Erfahrung, nicht auf Theorie.',
        cards: [
          { glyph: 'grid', title: 'SAP On-Premise', body: 'Beratung, Implementierung und Support für Ihre SAP-On-Premise-Landschaft — von ECC bis S/4HANA.' },
          { glyph: 'spark', title: 'SAP Cloud (BTP)', body: 'Erweitern und modernisieren Sie mit SAP BTP — cloudnative Integration, SAP Build, Joule AI und Automatisierung.' },
          { glyph: 'link', title: 'SAP-Integration', body: 'Wir unterstützen die gesamte Integrationslandschaft — SAP PI/PO, SAP Integration Suite, API Management und mehr.' },
          { glyph: 'bars', title: 'Hybrid-Cloud-Lösungen', body: 'Unsere Expertinnen und Experten entwickeln hybride SAP-Lösungen auf Azure, AWS und GCP — und verbinden SAP mit dem Hyperscaler-Ökosystem, auf dem Ihr Unternehmen bereits arbeitet.' },
        ],
      },
      {
        name: 'ServiceNow-Services',
        body: 'Modernisieren Sie Ihre Abläufe mit ServiceNow — Workflow-Automatisierung und verbesserte Servicebereitstellung auf der gesamten Plattform.',
        cards: [
          { glyph: 'flow', title: 'ServiceNow-Beratung & -Implementierung', body: 'Workflow-Automatisierung und bessere Servicebereitstellung mit ServiceNow — vom Plattform-Setup bis zum Go-live.' },
          { glyph: 'peak', title: 'AI-Native ServiceNow', body: 'Autonome KI-Belegschaft, Governance und Sicherheit auf Unternehmensniveau sowie KI-native Infrastruktur — direkt auf der Plattform aufgebaut.' },
        ],
      },
      {
        name: 'AI Services',
        body: 'Agentic AI & Automation, Predictive & Generative AI, Data Engineering & Modelltraining — wir machen aus Daten klügere Entscheidungen und Automatisierung.',
        cards: [
          { glyph: 'flow', title: 'Agentic AI & Automation', body: 'Autonome Agenten auf Basis von Strands und LangGraph sowie n8n-Workflows, die echte operative Arbeit übernehmen — vom Routing bis zur Lösung.' },
          { glyph: 'peak', title: 'Predictive & Generative AI', body: 'Unser KI-/ML-Bereich liefert Prognosen, Automatisierung und generative KI, die Erkenntnisse in Handlungen umsetzen.' },
          { glyph: 'bars', title: 'Data Engineering & Modelltraining', body: 'Datenpipelines und Modelltraining, die aus Rohdaten Entscheidungen machen.' },
        ],
      },
      {
        name: 'Full-Stack-Engineering',
        body: 'Full-Stack-Produkte auf jedem modernen Tech-Stack — mit den Frameworks und Sprachen, die zur Aufgabe passen — vom Prototyp bis zur Produktion, für Skalierbarkeit konzipiert.',
        cards: [
          { glyph: 'grid', title: 'Webanwendungen', body: 'Full-Stack-Webanwendungen mit dem Frontend- und Backend-Stack, der zu Ihrem Team passt — vom Prototyp bis zur Produktion.' },
          { glyph: 'link', title: 'API- & Backend-Entwicklung', body: 'Robuste, skalierbare Backends und APIs — in jeder passenden Sprache —, die Ihre Systeme verbinden und Ihre Produkte antreiben.' },
          { glyph: 'spark', title: 'Cloudnative Architektur', body: 'Moderne, auf Microservices basierende Anwendungen, die für Skalierung ausgelegt sind — auf Azure, AWS und GCP.' },
        ],
      },
    ],
  },

  approach: {
    caption: 'Unser Vorgehen',
    title: 'Vom ersten Gespräch bis zum Projektstart.',
    body: 'Wir hören zuerst zu, beweisen die Idee früh und handeln schnell, sobald Sie bereit sind — damit Ihre Transformation mit Zuversicht beginnt.',
    steps: [
      { title: 'Wir hören zuerst zu', body: 'Ein erstes Analysegespräch, um Ihre Ziele, Herausforderungen und Prioritäten zu verstehen — damit wir Lösungen entwickeln, die vom ersten Tag an echten Mehrwert schaffen.' },
      { title: 'Von der Idee zur Umsetzung', body: 'Auf Basis unseres Gesprächs entwickeln wir ein erstes Konzept oder eine Demo, inklusive Beispielsystem und der gesamten Dokumentation zur Prüfung.' },
      { title: 'Klären & Zusammenarbeiten', body: 'Wir beantworten Ihre Fragen, stimmen die Anforderungen ab und wählen für jeden Funktionsbereich die passenden Berater aus.' },
      { title: 'Projektstart', body: 'Sobald alles vereinbart ist, gehen wir zügig in die Umsetzung — mit klaren Meilensteinen und einem reibungslosen, zuversichtlichen Start in Ihre Transformation.' },
    ],
  },

  projects: {
    caption: 'Unsere Arbeit',
    title: 'Live und im Einsatz.',
    body: 'Eine Auswahl von Projekten, die wir für unsere Kunden entwickelt und ausgeliefert haben.',
    items: [
      { title: 'Visueller Konfigurator', body: 'Full-Stack-3D-Produktkonfigurator, durchgängig entwickelt und auf AWS bereitgestellt.', area: 'Full-Stack-Engineering', practice: 'fullstack' },
      { title: 'Term-Sheet-Engine', body: 'KI- und OCR-Engine zur Erstellung von Term Sheets für Kunden im Bereich parametrischer Versicherungen.', area: 'Predictive & Generative AI', practice: 'ai' },
      { title: 'Finanzautomatisierung', body: 'Automatisierte Finanzprozesse mit n8n, angebunden an SAP Public Cloud.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Turbinen-Intelligenz', body: 'Echtzeit-Anomalieerkennung auf Basis von Live-SCADA-Datenströmen von Windturbinen.', area: 'Predictive & Generative AI', practice: 'ai' },
      { title: 'Compliance-Plattform', body: 'Compliance- und Audit-Plattform für ein Unternehmen im Bereich Lebensmittelsicherheit.', area: 'Full-Stack-Engineering', practice: 'fullstack' },
      { title: 'Treasury-Chatbot', body: 'KI-Chatbot für eine afrikanische Finanzbehörde auf Basis öffentlicher UN-Daten.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'SAP-Integration', body: 'Wir haben einem führenden asiatischen Kunden beim Aufbau seiner Integrationsplattform geholfen und alle Schnittstellen von SAP PO zu SAP Cloud Integration (CPI) migriert.', area: 'SAP-Integration', practice: 'sap' },
      { title: 'Rechnungsautomatisierung', body: 'KI- und LLM-gestützte Automatisierung der Lieferantenrechnungen auf Basis von SAP.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'BTP-Hub', body: 'Implementierung eines SAP-BTP-Integrations-Hubs für ein grosses Fertigungsunternehmen.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'BTP Build', body: 'SAP-BTP-Build-Projekt im Prozessbereich PP/SD erfolgreich umgesetzt.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Autonome Agenten', body: 'Autonome Agenten für ServiceNow-Geschäftsprozessberater und -Entwickler entwickelt, die die Produktivität um 70 % steigern.', area: 'AI-Native ServiceNow', practice: 'servicenow' },
      { title: 'Eigene Nodes', body: 'Massgeschneiderte n8n-Nodes für einen wichtigen Unternehmenskunden entwickelt.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Legacy-MCPs', body: 'Eigene MCPs, die Legacy-Anwendungen über AWS, API und PostgreSQL verbinden.', area: 'API- & Backend-Entwicklung', practice: 'fullstack' },
      { title: 'HR-Integration', body: 'HR-, MCP- und SAP-API-Management-Lösung für einen SAP-Kunden entwickelt.', area: 'SAP-Integration', practice: 'sap' },
      { title: 'HR-Automatisierung', body: 'Vollständige Automatisierung der HR-Prozesse, durchgängig mit n8n-Workflows umgesetzt.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Unfallkostenschätzung', body: 'Automatisierte Engine zur Schätzung von Unfallkosten, vollständig mit n8n entwickelt.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Juristisches RAG', body: 'RAG-Modell für die Dokumentensuche eines indischen Rechtsteams entwickelt.', area: 'Data Engineering & Modelltraining', practice: 'ai' },
      { title: 'Zahlungsintegration', body: 'Individuelle ServiceNow-App, die Funktionen einer Zahlungsplattform für Kunden integriert.', area: 'ServiceNow-Beratung & -Implementierung', practice: 'servicenow' },
    ],
  },

  contact: {
    caption: 'Kontakt',
    title: 'Sagen Sie uns, wo es unklar wird.',
    body: 'Erzählen Sie uns etwas über Ihr Team und darüber, was Sie automatisieren oder entwickeln möchten. Wir melden uns bei Ihnen, um gemeinsam den richtigen Einstieg zu finden.',
    side: { email: 'Lieber per E-Mail?', address: 'Adresse', offices: 'Standorte' },
    fields: {
      name: 'Vollständiger Name',
      email: 'Geschäftliche E-Mail-Adresse',
      company: 'Unternehmen',
      role: 'Ihre Funktion',
      website: 'Website des Unternehmens',
      needs: 'Wobei können wir helfen?',
      needsOptions: ['SAP', 'ServiceNow', 'AI & Automation', 'Full-Stack-Engineering', 'Noch unklar'],
      message: 'Erzählen Sie uns von Ihrem Projekt',
      messagePlaceholder: 'Was möchten Sie lösen? Systeme, Zeitplan — alles, was hilft.',
      timeline: 'Zeitrahmen',
      timelineOptions: ['So bald wie möglich', 'In diesem Quartal', 'In diesem Jahr', 'Ich informiere mich nur'],
      timelinePlaceholder: 'Zeitrahmen auswählen',
      source: 'Wie haben Sie von uns erfahren?',
      consent: 'Ich bin damit einverstanden, dass KlarDataLabs diese Angaben zur Beantwortung meiner Anfrage verwendet.',
    },
    errors: {
      required: 'Bitte füllen Sie dieses Feld aus.',
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      consent: 'Bitte bestätigen Sie, damit wir antworten können.',
      captcha: 'Bitte schliessen Sie die Sicherheitsprüfung ab.',
      captchaRetry: 'Die Sicherheitsprüfung ist fehlgeschlagen. Bitte senden Sie Ihre Nachricht erneut.',
    },
    verify: { checking: 'Wird geprüft…', ok: 'Bestätigt — Sie können Ihre Nachricht senden.' },
    submit: 'Nachricht senden',
    sending: 'Wird gesendet…',
    success: { title: 'Vielen Dank — Ihre Nachricht ist eingegangen.', body: 'Wir melden uns in Kürze unter der von Ihnen angegebenen E-Mail-Adresse.', again: 'Weitere Nachricht senden' },
    failure: 'Beim Senden Ihrer Nachricht ist etwas schiefgelaufen. Bitte schreiben Sie uns direkt an',
  },

  footer: {
    caption: 'Sprechen wir miteinander',
    line: 'Wir lösen Kundenherausforderungen durch Technologie und Innovation.',
    visionTitle: 'Unsere Vision',
    vision: 'Eine Welt zu schaffen, in der Leidenschaft und Innovation jede Herausforderung in eine Chance verwandeln — indem wir Technologie, Zusammenarbeit und menschliche Einsicht vereinen, um Klarheit für klügere Entscheidungen zu schaffen.',
    companyTitle: 'Unternehmen',
    company: [
      { label: 'Leistungen', href: '#services' },
      { label: 'Vorgehen', href: '#approach' },
      { label: 'Projekte', href: '#projects' },
      { label: 'Kontakt', href: '/contact' },
    ],
    officesTitle: 'Standorte',
    offices: ['Zürich', 'Bangalore'],
    connectTitle: 'Verbinden',
  },
}
