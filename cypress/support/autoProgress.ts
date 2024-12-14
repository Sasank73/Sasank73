/// <reference types="cypress"/>
import timeOuts from '../utilities/dynamicTimeouts'
//portal locators
const locationDrpdownSearch = '#location'
const locOption = '.MuiAutocomplete-option'
const tab = '[role="tab"]'
const newSpaceButton = '[aria-label="New space"]'
const issueDropdown = '[data-testid="ArrowDropDownIcon"]'
const selectInputDrpdn = '[role="option"]'
const body = 'body'
const saveButton = '[type = "submit"]'
const verifyPageCreation = '[role="alert"]'
const selectFirstSpace = '[data-testid^="MUIDataTableBodyRow"]'
const locName = '.MuiTypography-root'
const addPhotoBtn = '[for="ticket-image-input"]'
const submitButton = '[aria-hidden="false"] [type="submit"]'

//commands
Cypress.Commands.add('selectLocationInPortal', (locationName) => {
  cy.get('.MuiFormControl-vertical label')
    .parents('.MuiFormControl-vertical')
    .then(($parent) => {
      if ($parent.find('.MuiAutocomplete-hasPopupIcon').length > 0) {
        cy.get(locationDropdownSearch).should('exist').click().type(locationName)
        cy.get(locationOption).contains(locationName).eq(0).click()
      } else if ($parent.find('.MuiRadioGroup-root').length > 0) {
        cy.contains(locationName).click({ force: true })
      }
    })
})

Cypress.Commands.add('selectIssueInLocation', (issueName, status) => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.waitUntil(() => cy.get(newSpaceButton).should('be.visible'))
  cy.get(selectFirstSpace).eq(0).should('be.visible').click('center')
  cy.get(issueDropdown).should('be.visible').click()
  cy.get(selectInputDrpdn).contains(issueName).click()
  cy.get(body).click()
  cy.get(saveButton).click({ multiple: true, force: true })
  cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
  cy.get(verifyPageCreation).contains(status, { matchCase: false })
})

Cypress.Commands.add('verifyAddCommentPage', (locatName) => {
  cy.get(locName).should('contain', locatName)
  cy.get(addPhotoBtn).should('not.be.disabled')
  cy.get(submitButton).should('not.be.disabled')
})
