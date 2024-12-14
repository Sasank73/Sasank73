import 'cypress-wait-until'
import timeOuts from '../utilities/dynamicTimeouts'

//create space and issue locators
const tab = '[role="tab"]'
const newSpaceButton = '[aria-label="New space"]'
const tableCell = 'tbody tr td'

//portal locators
const submitButton = '[type="submit"]'
const button = '[type="button"]'
const locationNameInPortal = '.MuiTypography-root'
const pleaseSelectIssueText = 'Please select an issue'
const pleaseSelectSpaceText = 'Please select a space.'
const spacesDropdown = '#space'
const radioButton = '[type="radio"]'
const issueInPortal = '[aria-label="issues"]'

Cypress.Commands.add('goToSpaces', () => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.waitUntil(() => cy.get(newSpaceButton).should('be.visible'))
  cy.get(newSpaceButton).should('be.visible').click()
  cy.wait(timeOuts.veryShortWait)
})

Cypress.Commands.add('goToSpacesFromLocation', () => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.waitUntil(() => cy.get(newSpaceButton).should('be.visible'))
})

Cypress.Commands.add('verifySpaceOfLocation', (spaceName) => {
  cy.get(tableCell).contains(spaceName, { matchCase: false }).should('exist')
})

Cypress.Commands.add('visitLocationIDURL', (locationPortalURL) => {
  cy.url().then((locationURL) => {
    const locationID = locationURL.split('/')[5]
    const locationIDPortalURL = locationPortalURL + locationID
    cy.wrap(locationIDPortalURL).as('locationIDPortalURL')
    cy.visit(locationIDPortalURL)
  })
})

Cypress.Commands.add('verifySpaceOfLocationInPortal', (spaceName, spaceDetail) => {
  cy.contains(spaceName, { matchCase: false }).should('exist')
  cy.contains(spaceDetail).should('exist')
})

Cypress.Commands.add('verifySpacePickerAutoComplete', (locationName) => {
  cy.get(locationNameInPortal).should('be.visible').should('contain.text', locationName)
  cy.contains(pleaseSelectIssueText).should('be.visible')
  cy.get(submitButton).should('exist').should('contain.text', 'Next')
  cy.get(button).should('exist').should('contain.text', 'Back')
  cy.get(issueInPortal).should('exist')
})

Cypress.Commands.add('verifySpacePickerRadioButtons', (locationName) => {
  cy.waitUntil(() => cy.get(locationNameInPortal).should('exist'))
  cy.get(locationNameInPortal).should('be.visible').should('contain.text', locationName)
  cy.contains(pleaseSelectSpaceText).should('be.visible')
  cy.waitUntil(() => cy.get(radioButton).should('exist'))
  cy.get(radioButton).should('exist')
})

Cypress.Commands.add('verifySpacePickerDropDown', (locationName) => {
  cy.get(locationNameInPortal).should('be.visible').should('contain.text', locationName)
  cy.contains(pleaseSelectSpaceText).should('be.visible')
  cy.get(spacesDropdown).should('be.visible').click({ force: true })
})
