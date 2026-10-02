// German copy. Loaded on demand as its own bundle when someone switches to DE.
export default {
  lang: 'de',
  meta: {
    title: 'KlarDataLabs — SAP-, ServiceNow- & KI-gestützte Automatisierung',
    contactTitle: 'Kontakt — KlarDataLabs',
    description: 'KlarDataLabs entwickelt KI-gestützte Automatisierung, die echte operative Probleme löst – mit SAP- und ServiceNow-Expertise, Full-Stack-Engineering, n8n-Workflows und agentischer KI.',
  },

  ui: {
    home: 'KlarDataLabs – zurück nach oben',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen',
    language: 'Sprache',
    backToTop: 'Nach oben',
    scrollNext: 'Zum nächsten Abschnitt',
    scroll: 'Scrollen',
    tech: 'Technologien, mit denen wir arbeiten',
    letsTalk: 'Sprechen wir',
    contactUs: 'Kontakt aufnehmen',
    startConversation: 'Gespräch starten',
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
    eyebrow: 'SAP · ServiceNow · KI · Engineering',
    title: 'Klarheit für smartere Entscheidungen.',
    lead: 'Klarheit für smartere',
    words: ['Entscheidungen.', 'Abläufe.', 'Prozesse.', 'Automatisierung.', 'Transformation.'],
    body: 'Wir verwandeln geschäftliche Herausforderungen in Innovation – mit SAP-, ServiceNow- und KI-Expertise, die Abläufe vereinfacht und Wachstum vorantreibt.',
    offices: ['Zürich', 'Bangalore'],
    stack: ['SAP', 'SAP BTP', 'SAP Integration', 'ServiceNow', 'Agentische KI', 'Generative KI', 'RAG', 'n8n', 'Data Engineering'],
  },

  statement: {
    caption: 'Wer wir sind',
    text: 'Klar steht für Klarheit – und genau die bringen wir in komplexe Abläufe. Wir entwickeln KI-gestützte Automatisierung, die echte operative Probleme löst – mit 20 Jahren praktischer SAP-Erfahrung, ServiceNow-Know-how, Full-Stack-Engineering, n8n-Workflows und agentischer KI.',
    pillars: [
      { title: 'Verwandeln', body: 'Operative Komplexität in Automatisierung verwandeln, die funktioniert.' },
      { title: 'Befähigen', body: 'Teams mit Automatisierung befähigen, die selbstständig läuft – und mit KI, die weiß, wann ein Mensch gefragt ist.' },
      { title: 'Klären', body: 'Klarheit für smartere Entscheidungen schaffen.' },
    ],
  },

  services: {
    caption: 'Unsere Leistungen',
    stages: [
      {
        name: 'SAP-Leistungen',
        body: 'Umfassende SAP-Beratung, -Implementierung und -Integration – on-premise und in der Cloud. Basierend auf 20 Jahren praktischer SAP-Erfahrung, nicht auf Theorie.',
        cards: [
          { glyph: 'grid', title: 'SAP On-Premise', body: 'Beratung, Implementierung und Support für Ihre On-Premise-SAP-Landschaft – von ECC bis S/4HANA.' },
          { glyph: 'spark', title: 'SAP Cloud (BTP)', body: 'Erweitern und modernisieren mit SAP BTP – Cloud-native Integration, SAP Build, Joule AI und Automatisierung.' },
          { glyph: 'link', title: 'SAP Integration', body: 'Wir unterstützen die gesamte Integrationslandschaft – SAP PI/PO, SAP Integration Suite, API Management und mehr.' },
          { glyph: 'bars', title: 'Hybrid-Cloud-Lösungen', body: 'Unsere Experten entwickeln hybride SAP-Lösungen auf Azure, AWS und GCP – und verbinden SAP mit dem Hyperscaler-Ökosystem, auf dem Ihr Unternehmen bereits läuft.' },
        ],
      },
      {
        name: 'ServiceNow-Leistungen',
        body: 'Moderne Abläufe mit ServiceNow – Workflow-Automatisierung und bessere Service-Erbringung auf der gesamten Plattform.',
        cards: [
          { glyph: 'flow', title: 'ServiceNow-Beratung & -Implementierung', body: 'Workflow-Automatisierung und bessere Service-Erbringung auf ServiceNow – vom Plattform-Setup bis zum Go-live.' },
          { glyph: 'peak', title: 'AI-Native ServiceNow', body: 'Autonome KI-Workforce, Enterprise-Governance & -Sicherheit und KI-native Infrastruktur – direkt auf der Plattform.' },
        ],
      },
      {
        name: 'KI-Leistungen',
        body: 'Agentische KI & Automatisierung, prädiktive & generative KI, Data Engineering & Modelltraining – damit aus Daten smartere Entscheidungen und Automatisierung werden.',
        cards: [
          { glyph: 'flow', title: 'Agentische KI & Automatisierung', body: 'Autonome Agenten mit Strands und LangGraph sowie n8n-Workflows, die echte operative Arbeit übernehmen – vom Routing bis zur Lösung.' },
          { glyph: 'peak', title: 'Prädiktive & generative KI', body: 'Unsere KI/ML-Praxis liefert Forecasting, Automatisierung und generative KI, die Erkenntnisse in Handeln übersetzen.' },
          { glyph: 'bars', title: 'Data Engineering & Modelltraining', body: 'Datenpipelines und Modelltraining, die aus Rohdaten Entscheidungen machen.' },
        ],
      },
      {
        name: 'Full-Stack Engineering',
        body: 'Full-Stack-Produkte mit React und Python – vom Prototyp bis zur Produktion, gebaut für Skalierung.',
        cards: [
          { glyph: 'grid', title: 'Webanwendungen', body: 'Full-Stack-Webanwendungen mit React und Python – vom Prototyp bis zur Produktion.' },
          { glyph: 'link', title: 'API- & Backend-Entwicklung', body: 'Robuste, skalierbare Backends und APIs, die Ihre Systeme verbinden und Ihre Produkte antreiben.' },
          { glyph: 'spark', title: 'Cloud-native Architektur', body: 'Moderne, Microservice-basierte Anwendungen, gebaut für Skalierung – auf Azure, AWS und GCP.' },
        ],
      },
    ],
  },

  approach: {
    caption: 'Unser Vorgehen',
    title: 'Vom ersten Gespräch zum Kickoff.',
    body: 'Wir hören zuerst zu, prüfen die Idee früh und legen schnell los, sobald Sie bereit sind – damit Ihre Transformation mit Zuversicht beginnt.',
    steps: [
      { title: 'Wir hören zuerst zu', body: 'Ein erstes Gespräch, um Ihre Ziele, Herausforderungen und Prioritäten zu verstehen – damit unsere Lösungen vom ersten Tag an echten Mehrwert liefern.' },
      { title: 'Von der Idee zur Umsetzung', body: 'Auf Basis unseres Gesprächs entwickeln wir ein erstes Konzept oder eine Demo – mit Beispielsystem und der gesamten Dokumentation zur Prüfung.' },
      { title: 'Klären & zusammenarbeiten', body: 'Wir beantworten Ihre Fragen, stimmen Anforderungen ab und wählen die passenden Berater für jeden Fachbereich.' },
      { title: 'Projekt-Kickoff', body: 'Nach der Einigung starten wir zügig – mit klaren Meilensteinen und einem reibungslosen, sicheren Start in Ihre Transformation.' },
    ],
  },

  projects: {
    caption: 'Unsere Arbeit',
    title: 'Live und im Einsatz.',
    body: 'Eine Auswahl an Projekten, die wir für unsere Kunden gebaut und ausgeliefert haben.',
    items: [
      { title: 'Visueller Konfigurator', body: 'Full-Stack-3D-Produktkonfigurator, end-to-end entwickelt und auf AWS betrieben.', area: 'Full-Stack Engineering', practice: 'fullstack' },
      { title: 'Term-Sheet-Engine', body: 'KI- und OCR-Engine, die Term Sheets für Kunden im Bereich parametrischer Versicherungen erstellt.', area: 'Prädiktive & generative KI', practice: 'ai' },
      { title: 'Finanzautomatisierung', body: 'Automatisierte Finanzprozesse mit n8n, angebunden an SAP Public Cloud.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Turbinen-Intelligenz', body: 'Echtzeit-Anomalieerkennung aus Live-SCADA-Datenströmen von Windturbinen.', area: 'Prädiktive & generative KI', practice: 'ai' },
      { title: 'Compliance-Plattform', body: 'Compliance- und Audit-Plattform für ein Unternehmen im Bereich Lebensmittelsicherheit.', area: 'Full-Stack Engineering', practice: 'fullstack' },
      { title: 'Treasury-Chatbot', body: 'KI-Chatbot für eine afrikanische Treasury-Behörde auf Basis öffentlicher UN-Daten.', area: 'Agentische KI & Automatisierung', practice: 'ai' },
      { title: 'SAP-Integration', body: 'Anbindung von SAP PO an SAP CPI für einen großen asiatischen Kunden.', area: 'SAP Integration', practice: 'sap' },
      { title: 'Rechnungsautomatisierung', body: 'KI- und LLM-gestützte Automatisierung der Lieferantenabrechnung auf Basis von SAP.', area: 'Agentische KI & Automatisierung', practice: 'ai' },
      { title: 'BTP Hub', body: 'SAP-BTP-Integrations-Hub für ein großes Fertigungsunternehmen implementiert.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'BTP Build', body: 'SAP-BTP-Build-Projekt im Prozessbereich PP/SD umgesetzt.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Autonome Agenten', body: 'Autonome Agenten für ServiceNow-Prozessberater und -Entwickler gebaut.', area: 'AI-Native ServiceNow', practice: 'servicenow' },
      { title: 'Custom Nodes', body: 'Individuelle n8n-Nodes für einen wichtigen Enterprise-Kunden entwickelt.', area: 'Agentische KI & Automatisierung', practice: 'ai' },
      { title: 'Legacy-MCPs', body: 'Individuelle MCPs, die Legacy-Anwendungen über AWS, APIs und PostgreSQL verbinden.', area: 'API- & Backend-Entwicklung', practice: 'fullstack' },
      { title: 'HR-Integration', body: 'HR-, MCP- und SAP-API-Management-Lösung für einen SAP-Kunden gebaut.', area: 'SAP Integration', practice: 'sap' },
      { title: 'HR-Automatisierung', body: 'Vollständige HR-Prozessautomatisierung, end-to-end mit n8n-Workflows umgesetzt.', area: 'Agentische KI & Automatisierung', practice: 'ai' },
      { title: 'Unfallkosten-Schätzung', body: 'Automatisierte Engine zur Schätzung von Unfallkosten, vollständig mit n8n gebaut.', area: 'Agentische KI & Automatisierung', practice: 'ai' },
      { title: 'Legal RAG', body: 'RAG-Modell für die Dokumentensuche eines indischen Rechtsteams entwickelt.', area: 'Data Engineering & Modelltraining', practice: 'ai' },
      { title: 'Payment-Integration', body: 'Individuelle ServiceNow-App, die Funktionen einer Payment-Plattform für Kunden integriert.', area: 'ServiceNow-Beratung & -Implementierung', practice: 'servicenow' },
    ],
  },

  contact: {
    caption: 'Kontakt',
    title: 'Sagen Sie uns, wo es unklar ist.',
    body: 'Erzählen Sie uns kurz von Ihrem Team und davon, was Sie automatisieren oder bauen möchten. Wir melden uns, um gemeinsam den richtigen Einstieg zu finden.',
    side: { email: 'Lieber per E-Mail?', address: 'Adresse', offices: 'Standorte' },
    fields: {
      name: 'Vollständiger Name',
      email: 'Geschäftliche E-Mail',
      company: 'Unternehmen',
      role: 'Ihre Rolle',
      website: 'Unternehmenswebsite',
      needs: 'Wobei können wir helfen?',
      needsOptions: ['SAP', 'ServiceNow', 'KI & Automatisierung', 'Full-Stack Engineering', 'Noch unklar'],
      message: 'Erzählen Sie uns von Ihrem Projekt',
      messagePlaceholder: 'Was möchten Sie lösen? Systeme, Zeitrahmen – alles, was hilft.',
      timeline: 'Zeitrahmen',
      timelineOptions: ['So bald wie möglich', 'Dieses Quartal', 'Dieses Jahr', 'Erst einmal informieren'],
      timelinePlaceholder: 'Zeitrahmen wählen',
      source: 'Wie sind Sie auf uns aufmerksam geworden?',
      consent: 'Ich bin einverstanden, dass KlarDataLabs diese Angaben nutzt, um auf meine Anfrage zu antworten.',
    },
    errors: {
      required: 'Bitte ausfüllen.',
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      consent: 'Bitte bestätigen Sie, damit wir antworten können.',
    },
    submit: 'Nachricht senden',
    sending: 'Wird gesendet …',
    success: { title: 'Vielen Dank – Ihre Nachricht ist angekommen.', body: 'Wir melden uns in Kürze unter der angegebenen E-Mail-Adresse.', again: 'Weitere Nachricht senden' },
    failure: 'Beim Senden ist etwas schiefgelaufen. Bitte schreiben Sie uns direkt an',
  },

  footer: {
    caption: 'Sprechen wir',
    line: 'Kundenherausforderungen lösen – mit Technologie & Innovation.',
    visionTitle: 'Unsere Vision',
    vision: 'Eine Welt zu schaffen, in der Leidenschaft und Innovation jede Herausforderung in eine Chance verwandeln – indem wir Technologie, Zusammenarbeit und menschliche Einsicht vereinen und so Klarheit für smartere Entscheidungen schaffen.',
    companyTitle: 'Unternehmen',
    company: [
      { label: 'Leistungen', href: '#services' },
      { label: 'Vorgehen', href: '#approach' },
      { label: 'Projekte', href: '#projects' },
      { label: 'Kontakt', href: '/contact' },
    ],
    officesTitle: 'Standorte',
    offices: ['Zürich', 'Bangalore'],
    connectTitle: 'Vernetzen',
  },
}
