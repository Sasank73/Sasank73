/// <reference types="cypress"/>
import 'cypress-wait-until'
//menu items locators
const issuesMenu = '[data-testid="DnsRoundedIcon"]'
//create location locators
const typeName = '[name="name"]'
const saveButton = '[type = "submit"]'
const submitBtn = '[aria-hidden="false"] [type="submit"]'

//select location locators
const textField = '[helpertext="[object Object]"]'

//create space locators
const tab = '[role="tab"]'
const newSpaceButton = '[aria-label="New space"]'
const enableSurveyMode = '.MuiSwitch-action'
const typeDetail = '#detail'
const selectInputDrpdn = '[role="option"]'
//issue creation locators
const addIssueButton = '[aria-label="Add issue"]'
const typeDescription = '[name=description]'

// create space (mode=space) locators
const tableCell = '[data-testid*="MuiDataTableBodyCell"]'
const body = 'body'
const issueDropdown = '[data-testid="ArrowDropDownIcon"]'

//request submission locators

const requestSuccessmsg = 'Request successfully submitted!'
const addcomment = '#comment_message'

//contact info locators
const contactDropdown = '[label="Space contact info collection"] [role="combobox"]'
const labelRoot = '.MuiFormLabel-root'
const requiredText = 'This is required'
const spaceContactText = 'Space contact info collection'
const subscribeText = 'Subscribe to request updates?'
const contactInfoText = 'Contact info'
const contactHelperText = '.MuiFormHelperText-root'
const inputContactField = '[helpertext="[object Object]"]'
const verifyPageCreation = '[role="alert"]'
const chkbx = 'input[type="checkbox"]'
const searchButton = '[data-testid="Search-iconButton"]'
const searchInputField = '[type="text"]'
const nextBtn = '[aria-hidden="false"] [type = "submit"]'

//commands

Cypress.Commands.add('createSpaceModeSpace', (spaceTitle, detail, issueName, status) => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.waitUntil(() => cy.get(newSpaceButton).should('be.visible'))
  cy.get(newSpaceButton).should('be.visible').click()
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
    .click()
    .typeAndWaitForFirstCharacter(spaceTitle)
    .should('have.value', spaceTitle)
  cy.get(typeDetail)
    .clear()
    .click()
    .typeAndWaitForFirstCharacter(detail)
    .should('have.value', detail)
  cy.get(issueDropdown).should('be.visible').click({multiple: true})
  cy.get(selectInputDrpdn).contains(issueName).click()
  cy.get(body).click()
  cy.get(saveButton).contains('Save').should('be.visible').click()
  cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
  cy.get(verifyPageCreation).contains(status, { matchCase: false })
})

Cypress.Commands.add('goToIssueCategoriesMenu', () => {
  cy.waitUntil(() => cy.get(issuesMenu).should('be.visible'))
  cy.get(issuesMenu).should('exist').click()
})

Cypress.Commands.add('createIssueWithOutSelectingSpace', (issueName, issueDescription, status) => {
  cy.get(addIssueButton).should('be.visible').click({ force: true })
  cy.waitUntil(() => cy.get(typeName).should('be.visible'))
  cy.get(typeName)
    .should('be.visible')
    .clear()
    .click()
    .typeAndWaitForFirstCharacter(issueName)
    .should('have.value', issueName)
  cy.get(typeDescription)
    .should('be.visible')
    .clear()
    .click()
    .typeAndWaitForFirstCharacter(issueDescription)
    .should('have.value', issueDescription)
  cy.intercept('POST', 'https://api.nodafi-staging.com/graphql').as('createIssue')
  cy.get(saveButton).should('be.visible').click()
  cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
  cy.get(verifyPageCreation).contains(status, { matchCase: false })
  cy.reload()
})

Cypress.Commands.add('selectCreatedSpace', (spaceName) => {
  cy.get(tab).contains('Spaces').should('exist').and('not.be.disabled')
  cy.get(searchButton).should('exist').click()
  cy.get(searchInputField).type(spaceName).should('have.value', spaceName)
  cy.waitUntil(() => cy.get(tableCell).should('exist'))
  cy.get(tableCell).contains(spaceName).click('center')
})

Cypress.Commands.add('selectContactInfoOption', (option) => {
  cy.waitUntil(() => cy.contains(spaceContactText).should('exist'))
  cy.contains(spaceContactText).scrollIntoView().should('be.visible')
  cy.get(contactDropdown).scrollIntoView().should('be.visible').click()
  cy.get(selectInputDrpdn).contains(option).click()
  cy.get(saveButton).contains('save', { matchCase: false }).click({ force: true })
})

Cypress.Commands.add('issueRequestWithComment', (issueName, locationName) => {
  cy.get(addcomment).clear()
  cy.get(addcomment).type(issueName).should('have.value', issueName)
  cy.contains(locationName).click({ force: true })
})

Cypress.Commands.add('clickOnNextButton', () => {
  cy.get(nextBtn).should('exist').click()
})

Cypress.Commands.add('clickOnSubmitButton', () => {
  cy.get(saveButton).click({ multiple: true, force: true })
})

Cypress.Commands.add('clickSubmitButton', () => {
  cy.get(submitBtn).click({ multiple: true, force: true })
})

Cypress.Commands.add('verifyIsRequestSubmitted', () => {
  cy.contains(requestSuccessmsg, { matchCase: false }).should('exist').and('be.visible')
  cy.url().should('include', '/request/success')
})

Cypress.Commands.add('verifyContactInfoNotVisible', () => {
  cy.contains(contactInfoText, { matchCase: false }).should('not.exist')
  cy.get(labelRoot).contains('email', { matchCase: false }).should('not.exist')
  cy.get(labelRoot).contains('name', { matchCase: false }).should('not.exist')
  cy.contains(subscribeText, { matchCase: false }).should('not.exist')
})

Cypress.Commands.add('verifyContactInfoVisible', () => {
  cy.contains(contactInfoText, { matchCase: false }).should('be.visible')
  cy.contains(subscribeText, { matchCase: false }).should('be.visible')
  cy.get(labelRoot).contains('email', { matchCase: false }).should('be.visible')
  cy.get(labelRoot).contains('name', { matchCase: false }).should('be.visible')
})

Cypress.Commands.add('verifyErrorMessageForEmail', (locationName, fieldName) => {
  cy.get(textField).eq(0).click({ multiple: true, force: true })
  cy.contains(locationName).click()
  cy.get(labelRoot)
    .contains(fieldName, { matchCase: false })
    .siblings(contactHelperText)
    .contains(requiredText)
    .should('be.visible')
})

Cypress.Commands.add('verifyErrorMessageForName', (locationName, fieldName) => {
  cy.get(textField).eq(1).click({ multiple: true, force: true })
  cy.contains(locationName).click()
  cy.get(labelRoot)
    .contains(fieldName, { matchCase: false })
    .siblings(contactHelperText)
    .contains(requiredText)
    .should('be.visible')
})

Cypress.Commands.add('inputIntoContactField', (fieldName, input) => {
  cy.get(labelRoot)
    .contains(fieldName, { matchCase: false })
    .siblings(inputContactField)
    .click()
    .clear()
    .typeAndWaitForFirstCharacter(input)
})

Cypress.Commands.add('checkSubscribe', () => {
  cy.get(chkbx)
    .should('exist')
    .then((checkbox) => {
      if (checkbox.is(':checked')) {
        cy.get(body).click()
      } else {
        cy.get(chkbx).should('exist').click()
      }
    })
})