//locators
const emailTxtField = '[name="email"]'
const signInButton = 'Sign in with email'
const verifyLogo = '[alt="nodaFi Logo"]'
const verifySignInPage = 'div h1'
const verifyPortalTxt = '.MuiTypography-h4 '
const verifyLoginButton = '[aria-label="Login"]'

//commands
Cypress.Commands.add('portalUrl', (prtlUrl, welcomeTxt) => {
  cy.visit(prtlUrl)
  cy.url().should('include', '/portal/form/')
  cy.get(verifyLogo).should('be.visible')
  cy.get(verifyPortalTxt).should('contain', welcomeTxt)
  cy.get(verifyLoginButton).should('not.be.disabled')
})

Cypress.Commands.add('authUrl', (authenticatedUrl, siginTxt) => {
  cy.visit(authenticatedUrl)
  cy.url().should('include', '/auth/login')
  cy.get(verifyLogo).should('be.visible')
  cy.get(verifySignInPage).contains(siginTxt)
  cy.get(emailTxtField).should('be.visible')
  cy.contains(signInButton).should('not.be.disabled')
})
