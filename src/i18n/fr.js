// French copy. English (default language) lives in en.js; this file loads as its own bundle.
export default {
  lang: 'fr',
  meta: {
    title: 'KlarDataLabs — SAP, ServiceNow et automatisation pilotée par l’IA',
    contactTitle: 'Contact — KlarDataLabs',
    description: 'KlarDataLabs conçoit une automatisation pilotée par l’IA qui résout de vrais problèmes opérationnels — en associant expertise SAP et ServiceNow, ingénierie full-stack, workflows n8n et IA agentique.',
  },

  ui: {
    home: 'KlarDataLabs — retour en haut',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    language: 'Langue',
    backToTop: 'Retour en haut',
    scrollNext: 'Défiler jusqu’à la section suivante',
    scroll: 'Défiler',
    tech: 'Technologies avec lesquelles nous travaillons',
    letsTalk: 'Parlons-en',
    contactUs: 'Nous contacter',
    startConversation: 'Démarrer la conversation',
    explore: 'Découvrir nos services',
    step: 'Étape',
    optional: 'facultatif',
  },

  menu: [
    { label: 'Services', href: '#services' },
    { label: 'Approche', href: '#approach' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '/contact' },
  ],

  hero: {
    eyebrow: 'SAP · ServiceNow · AI · Engineering',
    title: 'Clarté pour des décisions plus éclairées.',
    lead: 'Clarté pour',
    // the last words of the headline type themselves through what we improve
    words: ['des décisions plus éclairées.', 'des opérations plus efficaces.', 'une croissance durable.', 'une automatisation intelligente.', 'une transformation réussie.'],
    body: 'Nous transformons les défis métier en innovation grâce à une expertise SAP, ServiceNow et IA qui simplifie les opérations et stimule la croissance.',
    offices: ['Zurich', 'Bangalore'],
    stack: ['SAP', 'SAP BTP', 'SAP Integration', 'ServiceNow', 'Agentic AI', 'Generative AI', 'RAG', 'n8n', 'Data Engineering'],
  },

  statement: {
    caption: 'Qui nous sommes',
    text: 'Klar signifie « clair » — et c’est exactement ce que nous apportons aux opérations complexes. Nous connectons les systèmes que vous utilisez déjà — SAP et ServiceNow, forts de 20 ans d’expertise de terrain — à l’ingénierie full-stack, aux workflows n8n et à l’IA agentique, pour que l’automatisation atteigne le travail qui compte vraiment.',
    pillars: [
      { title: 'Transformer', body: 'Transformer la complexité opérationnelle en automatisation qui fonctionne.' },
      { title: 'Renforcer', body: 'Donner aux équipes les moyens d’agir, avec une automatisation qui tourne seule et une IA qui sait quand faire intervenir un humain.' },
      { title: 'Clarifier', body: 'Apporter de la clarté pour des décisions plus éclairées.' },
    ],
  },

  services: {
    caption: 'Nos services',
    stages: [
      {
        name: 'Services SAP',
        body: 'Services SAP complets — on-premise et cloud — de conseil, d’implémentation et d’intégration. Fondés sur 20 ans d’expertise SAP de terrain, pas sur la théorie.',
        cards: [
          { glyph: 'grid', title: 'SAP On-Premise', body: 'Conseil, implémentation et support pour votre paysage SAP on-premise — d’ECC à S/4HANA.' },
          { glyph: 'spark', title: 'SAP Cloud (BTP)', body: 'Étendez et modernisez avec SAP BTP — intégration cloud-native, SAP Build, Joule AI et automatisation.' },
          { glyph: 'link', title: 'Intégration SAP', body: 'Nous couvrons l’ensemble du paysage d’intégration — SAP PI/PO, SAP Integration Suite, API Management et au-delà.' },
          { glyph: 'bars', title: 'Solutions Hybrid Cloud', body: 'Nos experts conçoivent des solutions SAP hybrides sur Azure, AWS et GCP — en connectant SAP à l’écosystème d’hyperscalers sur lequel votre entreprise opère déjà.' },
        ],
      },
      {
        name: 'Services ServiceNow',
        body: 'Modernisez vos opérations avec ServiceNow — automatisation des workflows et prestation de services améliorée sur l’ensemble de la plateforme.',
        cards: [
          { glyph: 'flow', title: 'Conseil et implémentation ServiceNow', body: 'Automatisation des workflows et meilleure prestation de services sur ServiceNow — de la mise en place de la plateforme à la mise en production.' },
          { glyph: 'peak', title: 'AI-Native ServiceNow', body: 'Main-d’œuvre IA autonome, gouvernance et sécurité de niveau entreprise, et infrastructure native IA — construites sur la plateforme.' },
        ],
      },
      {
        name: 'AI Services',
        body: 'Agentic AI & Automation, Predictive & Generative AI, Data Engineering & Model Training — nous transformons les données en décisions et en automatisation plus intelligentes.',
        cards: [
          { glyph: 'flow', title: 'Agentic AI & Automation', body: 'Des agents autonomes conçus avec Strands et LangGraph, ainsi que des workflows n8n qui prennent en charge un vrai travail opérationnel — du routage à la résolution.' },
          { glyph: 'peak', title: 'Predictive & Generative AI', body: 'Notre practice IA/ML fournit prévisions, automatisation et IA générative qui transforment les informations en actions.' },
          { glyph: 'bars', title: 'Data Engineering & Model Training', body: 'Des pipelines de données et un entraînement de modèles qui transforment les données brutes en décisions.' },
        ],
      },
      {
        name: 'Full-Stack Engineering',
        body: 'Des produits full-stack sur toute stack moderne — avec les frameworks et langages adaptés au besoin — du prototype à la production, pensés pour évoluer.',
        cards: [
          { glyph: 'grid', title: 'Applications web', body: 'Applications web full-stack sur la stack frontend et backend qui convient à votre équipe — du prototype à la production.' },
          { glyph: 'link', title: 'Développement d’API et de backends', body: 'Des backends et API robustes et évolutifs, dans le langage le plus adapté, qui connectent vos systèmes et alimentent vos produits.' },
          { glyph: 'spark', title: 'Architecture cloud-native', body: 'Des applications modernes, basées sur des microservices et conçues pour passer à l’échelle — sur Azure, AWS et GCP.' },
        ],
      },
    ],
  },

  approach: {
    caption: 'Notre approche',
    title: 'De la première prise de contact au lancement.',
    body: 'Nous écoutons d’abord, validons l’idée très tôt et avançons vite dès que vous êtes prêts — pour que votre transformation démarre en confiance.',
    steps: [
      { title: 'Nous commençons par écouter', body: 'Un premier appel d’évaluation pour comprendre vos objectifs, vos défis et vos priorités — afin de concevoir des solutions qui créent une vraie valeur dès le premier jour.' },
      { title: 'Des idées à l’action', body: 'À partir de nos échanges, nous développons un premier concept ou une démo, avec un système exemple et toute la documentation à examiner.' },
      { title: 'Clarifier et collaborer', body: 'Nous répondons à vos questions, alignons les exigences et choisissons les bons consultants pour chaque domaine fonctionnel.' },
      { title: 'Lancement du projet', body: 'Une fois l’accord conclu, nous passons rapidement à l’exécution — avec des jalons clairs et un démarrage fluide et confiant de votre transformation.' },
    ],
  },

  projects: {
    caption: 'Nos réalisations',
    title: 'En production et opérationnels.',
    body: 'Une sélection de projets que nous avons conçus et livrés à nos clients.',
    items: [
      { title: 'Configurateur visuel', body: 'Configurateur de produits 3D full-stack, conçu de bout en bout et déployé sur AWS.', area: 'Full-Stack Engineering', practice: 'fullstack' },
      { title: 'Term-Sheet Engine', body: 'Moteur d’IA et d’OCR générant des term sheets pour des clients de l’assurance paramétrique.', area: 'Predictive & Generative AI', practice: 'ai' },
      { title: 'Automatisation financière', body: 'Processus financiers automatisés avec n8n, connecté à SAP Public Cloud.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Intelligence des turbines', body: 'Détection d’anomalies en temps réel à partir de flux de données SCADA d’éoliennes en service.', area: 'Predictive & Generative AI', practice: 'ai' },
      { title: 'Plateforme de conformité', body: 'Plateforme de conformité et d’audit conçue pour une entreprise de sécurité alimentaire.', area: 'Full-Stack Engineering', practice: 'fullstack' },
      { title: 'Chatbot de trésorerie', body: 'Chatbot IA pour une agence du Trésor africaine, basé sur des données publiques de l’ONU.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Intégration SAP', body: 'Connexion de SAP PO à SAP CPI pour un grand client asiatique.', area: 'Intégration SAP', practice: 'sap' },
      { title: 'Automatisation des factures', body: 'Automatisation de la facturation fournisseurs par IA et LLM, construite sur SAP.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'BTP Hub', body: 'Mise en place d’un hub d’intégration SAP BTP pour un grand groupe industriel.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'BTP Build', body: 'Projet SAP BTP Build livré dans le domaine de processus PP/SD.', area: 'SAP Cloud (BTP)', practice: 'sap' },
      { title: 'Agents autonomes', body: 'Agents autonomes conçus pour les consultants en processus métier et les développeurs ServiceNow.', area: 'AI-Native ServiceNow', practice: 'servicenow' },
      { title: 'Nœuds personnalisés', body: 'Nœuds n8n sur mesure développés pour un client entreprise clé.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'MCP pour systèmes legacy', body: 'MCP sur mesure connectant des applications legacy via AWS, API et PostgreSQL.', area: 'Développement d’API et de backends', practice: 'fullstack' },
      { title: 'Intégration RH', body: 'Solution RH, MCP et SAP API Management développée pour un client SAP.', area: 'Intégration SAP', practice: 'sap' },
      { title: 'Automatisation RH', body: 'Automatisation complète des processus RH, réalisée de bout en bout avec des workflows n8n.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'Estimation des sinistres', body: 'Moteur d’estimation automatisée du coût des sinistres, entièrement conçu avec n8n.', area: 'Agentic AI & Automation', practice: 'ai' },
      { title: 'RAG juridique', body: 'Modèle RAG conçu pour la recherche documentaire d’une équipe juridique indienne.', area: 'Data Engineering & Model Training', practice: 'ai' },
      { title: 'Intégration de paiement', body: 'Application ServiceNow sur mesure intégrant les fonctionnalités d’une plateforme de paiement pour des clients.', area: 'Conseil et implémentation ServiceNow', practice: 'servicenow' },
    ],
  },

  contact: {
    caption: 'Contact',
    title: 'Dites-nous où les choses manquent de clarté.',
    body: 'Parlez-nous un peu de votre équipe et de ce que vous souhaitez automatiser ou construire. Nous reviendrons vers vous pour trouver le bon point de départ.',
    side: { email: 'Vous préférez l’e-mail ?', address: 'Adresse', offices: 'Bureaux' },
    fields: {
      name: 'Nom complet',
      email: 'E-mail professionnel',
      company: 'Entreprise',
      role: 'Votre fonction',
      website: 'Site web de l’entreprise',
      needs: 'En quoi pouvons-nous vous aider ?',
      needsOptions: ['SAP', 'ServiceNow', 'AI & Automation', 'Full-Stack Engineering', 'Pas encore défini'],
      message: 'Parlez-nous de votre projet',
      messagePlaceholder: 'Que cherchez-vous à résoudre ? Systèmes, délais — tout ce qui peut aider.',
      timeline: 'Délai',
      timelineOptions: ['Dès que possible', 'Ce trimestre', 'Cette année', 'Simple exploration'],
      timelinePlaceholder: 'Sélectionnez un délai',
      source: 'Comment avez-vous entendu parler de nous ?',
      consent: 'J’accepte que KlarDataLabs utilise ces informations pour répondre à ma demande.',
    },
    errors: {
      required: 'Veuillez renseigner ce champ.',
      email: 'Veuillez saisir une adresse e-mail valide.',
      consent: 'Veuillez confirmer afin que nous puissions vous répondre.',
    },
    submit: 'Envoyer le message',
    sending: 'Envoi en cours…',
    success: { title: 'Merci — votre message nous est bien parvenu.', body: 'Nous vous répondrons très bientôt à l’adresse e-mail indiquée.', again: 'Envoyer un autre message' },
    failure: 'Une erreur s’est produite lors de l’envoi de votre message. Veuillez nous écrire directement à',
  },

  footer: {
    caption: 'Parlons-en',
    line: 'Nous résolvons les défis de nos clients grâce à la technologie et à l’innovation.',
    visionTitle: 'Notre vision',
    vision: 'Créer un monde où la passion et l’innovation transforment chaque défi en opportunité — en unissant technologie, collaboration et compréhension humaine pour apporter de la clarté à des décisions plus éclairées.',
    companyTitle: 'Entreprise',
    company: [
      { label: 'Services', href: '#services' },
      { label: 'Approche', href: '#approach' },
      { label: 'Projets', href: '#projects' },
      { label: 'Contact', href: '/contact' },
    ],
    officesTitle: 'Bureaux',
    offices: ['Zurich', 'Bangalore'],
    connectTitle: 'Restons en contact',
  },
}
