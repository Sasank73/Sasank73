import 'cypress-wait-until'

//login locators
const emailTxtField = '[name="email"]'
const passwordTxtField = '[name="password"]'
const signInButton = 'Sign In'
const profileIcon = '[aria-label="your profile"]'
const verifyLogo = '[alt="nodaFi Logo"]'
const verifyPortalText = '.MuiTypography-root'
const verifyEndUserPage = '[data-testid="LoginIcon"]'

//logout locators
const profileButton = 'button[aria-haspopup="menu"]'
const portalMenuItem = '[data-testid="LogoutRoundedIcon"]'
const portalAccountIcon = '[data-testid="AccountCircleIcon"]'
const logoutMenu = '[role="menuitem"]'
//profile locators
const editUserText = '[aria-label="Go back"]+.MuiTypography-root '
const userRole = '#role'

//login commands
Cypress.Commands.add('login', (siginTxt, url, username, password) => {
  cy.visit(url)
  cy.get(verifyLogo).should('be.visible')
  cy.get(verifyPortalText).contains(siginTxt)
  cy.get(emailTxtField).type(username).should('have.value', username)
  cy.get(passwordTxtField).type(password).should('have.value', password)
  cy.contains(signInButton).should('not.be.disabled').click()
})

Cypress.Commands.add('verifyLoginIsSuccessful', (username) => {
  cy.waitUntil(() => cy.get(profileIcon).should('be.visible'))
  cy.get(profileIcon).should('be.visible')
  cy.contains(username).should('be.visible')
})

Cypress.Commands.add('verifyVendorLoginIsSuccessful', (verifyText) => {
  cy.get(verifyLogo).should('be.visible')
  cy.waitUntil(() => cy.get(profileButton).should('be.visible'))
  cy.url().should('include', 'portal')
  cy.get(verifyPortalText).should('contain', verifyText)
})

Cypress.Commands.add('verifyEndUserRedirectedToPortal', (url, verifyText) => {
  cy.visit(url)
  cy.url().should('include', '/portal/form/')
  cy.get(verifyPortalText).should('contain', verifyText)
  cy.get(verifyEndUserPage).should('be.visible')
})

Cypress.Commands.add('logoutFromPortal', () => {
  cy.get(portalAccountIcon).should('be.visible').click({ force: true })
  cy.get(logoutMenu).contains('Logout', { matchCase: false }).click({ multiple: true, force: true })
})

Cypress.Commands.add('verifyloggedInUserRole', (role) => {
  cy.get(profileIcon).should('be.visible').click()
  cy.get(editUserText).contains('edit user', { matchCase: false }).should('be.visible')
  if (role === 'viewer') {
    cy.get(userRole).contains(role, { matchCase: false })
  } else {
    cy.get(userRole).click().contains(role, { matchCase: false })
  }
})

Cypress.Commands.add('logout', (username) => {
  cy.get(portalMenuItem).should('be.visible').click()
  cy.contains(username).should('not.exist')
  cy.get(verifyLogo).should('be.visible')
})

Cypress.Commands.add('typeAndWaitForFirstCharacter', { prevSubject: true }, (subject, text) => {
  cy.wrap(subject).click()
  cy.wrap(subject).clear()
  cy.wrap(subject).type(text)
  return cy.wrap(subject)
})

Cypress.Commands.add('typeAndCheckValueWithRetry', (typeName, name) => {
  const maxAttempts = 2
  let attempt = 1

  const checkValue = () => {
    cy.get(typeName)
      .clear()
      .invoke('val', name)
      .then(() => {
        cy.get(typeName)
          .should('have.value', name)
          .then(() => {
            const currentText = cy.get(typeName).invoke('val')
            if (currentText !== name && attempt < maxAttempts) {
              attempt++
              checkValue()
            }
          })
      })
  }
  checkValue()
})
