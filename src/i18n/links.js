// Language-independent contact details and links
export const links = {
  email: 'hello@klardatalabs.com',
  linkedin: 'https://www.linkedin.com/company/klardatalabs',
  github: 'https://github.com/klardatalabs',
}

// registered company name and Swiss UID, shown above the street address
const legal = ['KlarDataLabs GmbH', 'CHE-285.980.722']

export const address = {
  en: [...legal, 'Giesserei', '8427 Freienstein-Teufen', 'Zürich, Switzerland'],
  de: [...legal, 'Giesserei', '8427 Freienstein-Teufen', 'Zürich, Schweiz'],
  fr: [...legal, 'Giesserei', '8427 Freienstein-Teufen', 'Zurich, Suisse'],
  it: [...legal, 'Giesserei', '8427 Freienstein-Teufen', 'Zurigo, Svizzera'],
}
