// Italian copy. English (default language) lives in en.js; this file loads as its own bundle.
export default {
  lang: 'it',
  meta: {
    title: 'KlarDataLabs — SAP, ServiceNow e automazione basata sull’IA',
    contactTitle: 'Contatti — KlarDataLabs',
    description: 'KlarDataLabs sviluppa automazione basata sull’IA che risolve problemi operativi reali — unendo competenza SAP e ServiceNow, full-stack engineering, workflow n8n e IA agentica.',
  },

  ui: {
    home: 'KlarDataLabs — torna all’inizio',
    menuOpen: 'Apri il menu',
    menuClose: 'Chiudi il menu',
    language: 'Lingua',
    backToTop: 'Torna su',
    scrollNext: 'Scorri alla sezione successiva',
    scroll: 'Scorri',
    tech: 'Tecnologie con cui lavoriamo',
    letsTalk: 'Parliamone',
    contactUs: 'Contattateci',
    startConversation: 'Iniziate una conversazione',
    explore: 'Scoprite i servizi',
    step: 'Fase',
    optional: 'facoltativo',
  },

  menu: [
    { label: 'Servizi', href: '#services' },
    { label: 'Approccio', href: '#approach' },
    { label: 'Progetti', href: '#projects' },
    { label: 'Contatti', href: '/contact' },
  ],

  hero: {
    eyebrow: 'SAP · ServiceNow · AI · Engineering',
    title: 'Chiarezza per decisioni più intelligenti.',
    lead: 'Chiarezza per',
    // the last words of the headline type themselves through what we improve
    words: ['decisioni più intelligenti.', 'processi più efficienti.', 'crescita sostenibile.', 'automazione intelligente.', 'trasformazione di successo.'],
    body: 'Trasformiamo le sfide aziendali in innovazione grazie a una competenza in SAP, ServiceNow e IA che semplifica le operazioni e favorisce la crescita.',
    offices: ['Zurigo', 'Bangalore'],
    stack: ['SAP', 'SAP BTP', 'SAP Integration', 'ServiceNow', 'Agentic AI', 'Generative AI', 'RAG', 'n8n', 'Data Engineering'],
  },

  statement: {
    caption: 'Chi siamo',
    text: 'Klar significa «chiaro» — ed è esattamente ciò che portiamo nelle operazioni complesse. Colleghiamo i sistemi che già utilizzate — SAP e ServiceNow, forti di 20 anni di esperienza sul campo — con full-stack engineering, workflow n8n e IA agentica, perché l’automazione arrivi al lavoro che conta davvero.',
    pillars: [
      { title: 'Trasformare', body: 'Trasformiamo la complessità operativa in automazione che funziona.' },
      { title: 'Potenziare', body: 'Potenziamo i team con un’automazione che lavora in autonomia e un’IA che sa quando coinvolgere una persona.' },
      { title: 'Chiarire', body: 'Portiamo chiarezza per decisioni più intelligenti.' },
    ],
  },

  services: {
    caption: 'I nostri servizi',
    stages: [
      {
        name: 'Servizi SAP',
        body: 'Servizi SAP completi — on-premise e cloud — di consulenza, implementazione e integrazione. Costruiti su 20 anni di esperienza SAP sul campo, non sulla teoria.',
        cards: [
          { glyph: 'grid', title: 'SAP On-Premise', body: 'Consulenza, implementazione e supporto per il vostro panorama SAP on-premise — da ECC a S/4HANA.' },
          { glyph: 'spark', title: 'SAP Cloud (BTP)', body: 'Estendete e modernizzate con SAP BTP — integrazione cloud-native, SAP Build, Joule AI e automazione.' },
          { glyph: 'link', title: 'Integrazione SAP', body: 'Supportiamo l’intero panorama di integrazione — SAP PI/PO, SAP Integration Suite, API Management e oltre.' },
          { glyph: 'bars', title: 'Soluzioni Hybrid Cloud', body: 'I nostri esperti realizzano soluzioni SAP ibride su Azure, AWS e GCP, collegando SAP all’ecosistema hyperscaler su cui la vostra azienda già opera.' },
        ],
      },
      {
        name: 'Servizi ServiceNow',
        body: 'Modernizzate le operazioni con ServiceNow — automazione dei workflow e un’erogazione dei servizi migliore su tutta la piattaforma.',
        cards: [
          { glyph: 'flow', title: 'Consulenza e implementazione ServiceNow', body: 'Automazione dei workflow e migliore erogazione dei servizi su ServiceNow — dalla configurazione della piattaforma al go-live.' },
          { glyph: 'peak', title: 'AI-Native ServiceNow', body: 'Forza lavoro AI autonoma, governance e sicurezza di livello enterprise e infrastruttura AI-native — costruite sulla piattaforma.' },
        ],
      },
      {
        name: 'AI Services',
        body: 'Agentic AI & Automation, Predictive & Generative AI, Data Engineering & Model Training — trasformiamo i dati in decisioni e automazione più intelligenti.',
        cards: [
          { glyph: 'flow', title: 'Agentic AI & Automation', body: 'Agenti autonomi realizzati con Strands e LangGraph, più workflow n8n che gestiscono lavoro operativo reale — dall’instradamento alla risoluzione.' },
          { glyph: 'peak', title: 'Predictive & Generative AI', body: 'La nostra practice AI/ML offre previsioni, automazione e IA generativa che trasformano le intuizioni in azioni.' },
          { glyph: 'bars', title: 'Data Engineering & Model Training', body: 'Pipeline di dati e addestramento di modelli che trasformano i dati grezzi in decisioni.' },
        ],
      },
      {
        name: 'Full-Stack Engineering',
        body: 'Prodotti full-stack su qualsiasi stack tecnologico moderno — con i framework e i linguaggi più adatti — dal prototipo alla produzione, progettati per scalare.',
        cards: [
          { glyph: 'grid', title: 'Applicazioni web', body: 'Applicazioni web full-stack con lo stack frontend e backend più adatto al vostro team — dal prototipo alla produzione.' },
          { glyph: 'link', title: 'Sviluppo API e backend', body: 'Backend e API robusti e scalabili, nel linguaggio più adatto, che collegano i vostri sistemi e alimentano i vostri prodotti.' },
          { glyph: 'spark', title: 'Architettura cloud-native', body: 'Applicazioni moderne basate su microservizi, progettate per scalare — su Azure, AWS e GCP.' },
        ],
      },
    ],
  },

  approach: {
    caption: 'Il nostro approccio',
    title: 'Dal primo contatto all’avvio del progetto.',
    body: 'Prima ascoltiamo, dimostriamo l’idea fin da subito e procediamo rapidamente quando siete pronti — così la vostra trasformazione parte con fiducia.',
    steps: [
      { title: 'Prima ascoltiamo', body: 'Una chiamata iniziale di valutazione per comprendere obiettivi, sfide e priorità — così da definire soluzioni che creano valore reale fin dal primo giorno.' },
      { title: 'Dalle idee all’azione', body: 'Sulla base del confronto, sviluppiamo un concept iniziale o una demo, con un sistema di esempio e tutta la documentazione di supporto da rivedere.' },
      { title: 'Chiarire e collaborare', body: 'Rispondiamo alle vostre domande, allineiamo i requisiti e scegliamo i consulenti giusti per ogni area funzionale.' },
      { title: 'Avvio del progetto', body: 'Una volta concordato tutto, passiamo rapidamente all’esecuzione — con milestone chiare e un avvio fluido e sicuro della vostra trasformazione.' },
    ],
  },

  projects: {
    caption: 'Il nostro lavoro',
    title: 'Online e operativi.',
    body: 'Una selezione di progetti che abbiamo realizzato e consegnato ai nostri clienti.',
    items: [
      { title: 'Configuratore visuale', body: 'Configuratore di prodotto 3D full-stack, realizzato end-to-end e distribuito su AWS.', area: 'Full-Stack Engineering', practice: 'fullstack' },
      { title: 'Term-Sheet Engine', body: 'Motore AI e OCR per la generazione di term sheet per clienti di assicurazioni parametriche.', area: 'Predictive & Generative AI', practice: 'ai' },
      { title: 'Automazione finanziaria', body: 'Processi finanziari automatizzati con n8n collegato a SAP Public Cloud.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Intelligenza per turbine', body: 'Rilevamento di anomalie in tempo reale da flussi di dati SCADA di turbine eoliche in esercizio.', area: 'Predictive & Generative AI', practice: 'ai' },
      { title: 'Piattaforma di compliance', body: 'Piattaforma di compliance e auditing realizzata per un’azienda della sicurezza alimentare.', area: 'Full-Stack Engineering', practice: 'fullstack' },
      { title: 'Chatbot per la tesoreria', body: 'Chatbot AI per un ente del tesoro africano che utilizza dati pubblici dell’ONU.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Integrazione SAP', body: 'Abbiamo aiutato un importante cliente asiatico a realizzare la sua piattaforma di integrazione, migrando tutte le interfacce da SAP PO a SAP Cloud Integration (CPI).', area: 'Integrazione SAP', practice: 'sap' },
      { title: 'Automazione delle fatture', body: 'Automazione della fatturazione fornitori basata su AI e LLM, realizzata su SAP.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'BTP Hub', body: 'Implementato un hub di integrazione SAP BTP per una grande azienda manifatturiera.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'BTP Build', body: 'Progetto SAP BTP Build realizzato nell’area di processo PP/SD.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Agenti autonomi', body: 'Agenti autonomi sviluppati per consulenti di processo e sviluppatori ServiceNow, con un aumento della produttività del 70%.', area: 'AI-Native ServiceNow', practice: 'servicenow' },
      { title: 'Nodi personalizzati', body: 'Realizzati nodi n8n personalizzati per un cliente enterprise chiave.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'MCP per sistemi legacy', body: 'MCP personalizzati che collegano applicazioni legacy tramite AWS, API e PostgreSQL.', area: 'Sviluppo API e backend', practice: 'fullstack' },
      { title: 'Integrazione HR', body: 'Realizzata una soluzione HR, MCP e SAP API Management per un cliente SAP.', area: 'Integrazione SAP', practice: 'sap' },
      { title: 'Automazione HR', body: 'Automazione completa dei processi HR, realizzata end-to-end con workflow n8n.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Stima dei sinistri', body: 'Motore di stima automatica dei costi dei sinistri, realizzato interamente con n8n.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'RAG legale', body: 'Realizzato un modello RAG per la ricerca documentale di un team legale indiano.', area: 'Data Engineering & Model Training', practice: 'ai' },
      { title: 'Integrazione dei pagamenti', body: 'App ServiceNow personalizzata che integra le funzionalità di una piattaforma di pagamento per i clienti.', area: 'Consulenza e implementazione ServiceNow', practice: 'servicenow' },
    ],
  },

  contact: {
    caption: 'Contatti',
    title: 'Raccontateci dove le cose non sono chiare.',
    body: 'Raccontateci qualcosa del vostro team e di ciò che volete automatizzare o realizzare. Vi risponderemo per individuare insieme il punto di partenza giusto.',
    side: { email: 'Preferite l’e-mail?', address: 'Indirizzo', offices: 'Sedi' },
    fields: {
      name: 'Nome e cognome',
      email: 'E-mail aziendale',
      company: 'Azienda',
      role: 'Il vostro ruolo',
      website: 'Sito web aziendale',
      needs: 'In cosa possiamo aiutarvi?',
      needsOptions: ['SAP', 'ServiceNow', 'AI & Automation', 'Full-Stack Engineering', 'Non ancora deciso'],
      message: 'Parlateci del vostro progetto',
      messagePlaceholder: 'Cosa volete risolvere? Sistemi, tempistiche — tutto ciò che può aiutare.',
      timeline: 'Tempistiche',
      timelineOptions: ['Il prima possibile', 'Questo trimestre', 'Quest’anno', 'Stiamo solo esplorando'],
      timelinePlaceholder: 'Selezionate le tempistiche',
      source: 'Come ci avete conosciuti?',
      consent: 'Accetto che KlarDataLabs utilizzi questi dati per rispondere alla mia richiesta.',
    },
    errors: {
      required: 'Compilare questo campo.',
      email: 'Inserire un indirizzo e-mail valido.',
      consent: 'Confermare per consentirci di rispondere.',
      captcha: 'Completate il controllo di sicurezza.',
      captchaRetry: 'Il controllo di sicurezza non è andato a buon fine. Inviate di nuovo il messaggio.',
    },
    verify: { checking: 'Verifica in corso…', ok: 'Verificato — potete inviare il messaggio.' },
    submit: 'Invia messaggio',
    sending: 'Invio in corso…',
    success: { title: 'Grazie — il vostro messaggio è arrivato.', body: 'Vi contatteremo presto all’indirizzo e-mail indicato.', again: 'Invia un altro messaggio' },
    failure: 'Qualcosa è andato storto nell’invio del messaggio. Scriveteci direttamente a',
  },

  footer: {
    caption: 'Parliamone',
    line: 'Risolviamo le sfide dei clienti con tecnologia e innovazione.',
    visionTitle: 'La nostra visione',
    vision: 'Creare un mondo in cui passione e innovazione trasformano ogni sfida in opportunità — unendo tecnologia, collaborazione e sensibilità umana per portare chiarezza a decisioni più intelligenti.',
    companyTitle: 'Azienda',
    company: [
      { label: 'Servizi', href: '#services' },
      { label: 'Approccio', href: '#approach' },
      { label: 'Progetti', href: '#projects' },
      { label: 'Contatti', href: '/contact' },
    ],
    officesTitle: 'Sedi',
    offices: ['Zurigo', 'Bangalore'],
    connectTitle: 'Restiamo in contatto',
  },
}
