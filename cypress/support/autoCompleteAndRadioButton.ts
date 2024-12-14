import timeOuts from '../utilities/dynamicTimeouts'
//create issue locators
const addIssueButton = '[aria-label="Add issue"]'
const typeDescription = '[name=description]'
//create space locators
const tab = '[role="tab"]'
const newSpaceButton = '[aria-label="New space"]'
const enableSurveyMode = '.MuiSwitch-thumb'
const typeDetail = '#detail'
const selectInputDrpdn = '[role="option"]'
const body = 'body'
const issueDropdown = '[data-testid="ArrowDropDownIcon"]'
const typeName = '[name="name"]'
const saveButton = '[type = "submit"]'
//portal form locators
const locationDropdownSearch = '#location'
const locationOption = '.MuiAutocomplete-option'
const radioButton = '[type="radio"]'
const drpDwn = '[aria-hidden="false"] [role="combobox"]'
const verifyPageCreation = '[role="alert"]'
const verifyIssuePage = 'Create issue'
const spaceDrpdwn = 'button [data-testid="ArrowDropDownIcon"]'
const checkBox = '[type="checkbox"]'
const label = 'div label'
const locName = 'div .MuiTypography-root'
const arrowBtn = 'button[aria-label="Go back"]'
const submtbtn = '[aria-hidden="false"] [type="submit"]'
//commands

Cypress.Commands.add('createIssues', (issueName, issueDescription, status) => {
  cy.get(addIssueButton).should('be.visible').click()
  cy.contains(verifyIssuePage).should('be.visible')
  cy.get(typeName).should('be.visible')
  cy.get(typeDescription).should('be.visible')
  cy.get(label).contains('Spaces').nextUntil(spaceDrpdwn).should('be.visible')
  cy.get(label).contains('Assets').nextUntil(spaceDrpdwn).should('be.visible')
  cy.get(checkBox).eq(0).should('not.be.checked')
  cy.get(checkBox).eq(1).should('not.be.checked')
  cy.get(checkBox).eq(2).should('be.checked')
  cy.get(saveButton).should('be.visible')
  cy.get(typeName)
    .should('be.visible')
    .clear()
    .click()
    .type(issueName, { delay: timeOuts.nanoWait })
    .should('have.value', issueName)
  cy.get(typeDescription)
    .should('be.visible')
    .clear()
    .click()
    .type(issueDescription, { delay: timeOuts.nanoWait })
    .should('have.value', issueDescription)
  cy.get(saveButton).should('be.visible').click()
  cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
  cy.get(verifyPageCreation).contains(status, { matchCase: false })
})

Cypress.Commands.add('verifyRadioButtons', (locationName) => {
  cy.waitUntil(() => cy.get(locName).contains('Welcome to'))
  cy.get(arrowBtn).should('not.be.disabled').and('be.visible')
  cy.get(submtbtn).should('not.be.disabled').and('be.visible')

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
  cy.waitUntil(() => cy.get(radioButton).should('exist'))
  cy.get(radioButton).should('exist')
})

Cypress.Commands.add('verifyDropDown', (locationName) => {
  cy.waitUntil(() => cy.get(locName).contains('Welcome to'))
  cy.get(arrowBtn).should('not.be.disabled').and('be.visible')
  cy.get(submtbtn).should('not.be.disabled').and('be.visible')

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
  cy.get(drpDwn).should('exist').click()
})
