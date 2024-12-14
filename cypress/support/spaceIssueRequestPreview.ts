import 'cypress-wait-until'
import timeOuts from '../utilities/dynamicTimeouts'
//create space and issue locators
const tab = '[role="tab"]'
const newSpaceButton = '[aria-label="New space"]'
const enableSurveyMode = '.MuiSwitch-action'
const typeDetail = '#detail'
const body = 'body'
const issueDropdown = '[data-testid="ArrowDropDownIcon"]'
const typeName = '[name="name"]'
const selectInputDrpdn = '[role="option"]'
//space preview locators
const tile = '.MuiSheet-root'
const profileIcon = '[data-testid="AccountCircleIcon"]'
const pleaseSelectText = 'please select an issue'
const submitButton = '[type="submit"]'
const button = '.MuiSheet-root [aria-label="Go back"]'
const addComment = '#comment_message'
const addPhoto = '#ticket-image-input'
const tabCell = 'td.MuiTableCell-root'
const issueEllipsisBtn = '.MuiGrid-root [aria-haspopup="menu"]'
const archiveButton = '[data-testid="ArchiveIcon"]'
const verifyPageCreation = '[role="alert"]'
const backBtn = 'button[aria-label="Go back"]'

//commands
Cypress.Commands.add('goToSpaces', () => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.waitUntil(() => cy.get(newSpaceButton).should('be.visible'))
  cy.get(newSpaceButton).should('be.visible').click()
})

Cypress.Commands.add('fillSpaceModeSpace', (spaceTitle, detail) => {
  cy.get(enableSurveyMode)
    .then(($el) => {
      if ($el.is(':checked')) {
        cy.get(enableSurveyMode).uncheck()
      }
    })
    .should('not.be.checked')
  cy.get(typeName)
    .should('be.visible')
    .clear()
    .type(spaceTitle, { delay: timeOuts.nanoWait })
    .should('have.value', spaceTitle)
  cy.get(typeDetail).type(detail).should('have.value', detail)
})

Cypress.Commands.add('spacePreviewWithOutData', (locationName, spaceName) => {
  cy.get(tile).should('be.visible').and('have.length', 3)
  cy.get(tile).eq(2).contains(locationName).should('exist')
  cy.get(tile).eq(2).contains(pleaseSelectText, { matchCase: false }).should('exist')
  cy.get(tile).eq(2).find(profileIcon).should('exist')
  cy.get(tile).eq(2).find(submitButton).should('exist').should('contain.text', 'Next')
  cy.get(tile).eq(2).contains(spaceName).should('not.exist')
})

Cypress.Commands.add('spacePreviewWithData', (locationName, spaceName, spaceDetail) => {
  cy.get(tile).should('exist').and('have.length', 3)
  cy.get(tile).eq(2).contains(locationName).should('exist')
  cy.get(tile).eq(2).contains(spaceName).should('exist')
  cy.get(tile).eq(2).contains(spaceDetail).should('exist')
  cy.get(tile).eq(2).find(profileIcon).should('exist')
  cy.get(tile).eq(2).find(addComment).should('exist')
  cy.get(tile).eq(2).find(addPhoto).should('exist')
  cy.get(tile).eq(2).find(submitButton).should('exist').should('contain.text', 'Submit')
  cy.get(button).should('exist')
})

Cypress.Commands.add('verifyTheSelectedIssue', (issueName) => {
  cy.get(tile).eq(2).contains(issueName).should('exist')
})

Cypress.Commands.add('clickOnBackButton', () => {
  cy.get(button).should('exist').and('not.be.disabled').click()
})
