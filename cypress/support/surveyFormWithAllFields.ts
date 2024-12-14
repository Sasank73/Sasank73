/// <reference types="cypress"/>
import 'cypress-wait-until'
import timeOuts from '../utilities/dynamicTimeouts'

//menu items locators
const menuItem = '[aria-label="primary individual surveys"] .MuiListItemContent-root'

//create survey locators
const surveyButton = 'button.MuiButton-root'
const filedRequired = '.MuiSwitch-action'
const createNewField = 'Create new field'
const editSurveyButton = '[aria-label="Edit survey"]'

//survey submission locators
const labelTag = 'label'
const inputTag = 'input'
const bodyTag = 'body'
const textAreaTag = 'textarea[aria-describedby*="helper-text"]'
const clickBody = 'button[aria-haspopup="menu"]'

Cypress.Commands.add('clickOnCreateNewField', () => {
  cy.get(surveyButton).contains(createNewField).should('be.visible').click()
})

Cypress.Commands.add('clearSurveyFieldTextAndNumber', (portalDisplay) => {
  cy.get(labelTag).contains(portalDisplay).next().find(inputTag).clear()
  cy.get(bodyTag).click()
})

Cypress.Commands.add('checkIsNumberFieldAllowingStringContainsText', (portalDisplay) => {
  const string = 'nodaFi'
  cy.get(labelTag)
    .contains(portalDisplay)
    .next()
    .find(inputTag)
    .clear()
    .type(string, { delay: timeOuts.nanoWait })
    .should('not.have.value', string)
  cy.get(bodyTag).click()
})

Cypress.Commands.add('clearSurveyFieldMultiLineText', (portalDisplay) => {
  cy.get(labelTag)
    .contains(portalDisplay)
    .next()
    .find(textAreaTag)
    .click({ multiple: true })
    .clear({ force: true })
    .should('be.empty')
  cy.get(bodyTag).click()
})

Cypress.Commands.add('editSurvey', (surveyName) => {
  cy.get(menuItem).contains(surveyName).click()
  cy.get(editSurveyButton).click()
})

Cypress.Commands.add('allFieldsRequired', () => {
  cy.get(filedRequired).each(($el) => {
    if (!$el.is(':checked')) {
      cy.wrap($el).click()
    }
  })
})

Cypress.Commands.add('inputIntoSurveyFieldTextAndNumber', (portalDisplay, input) => {
  cy.get(labelTag)
    .contains(portalDisplay)
    .next()
    .find(inputTag)
    .clear()
    .focus()
    .type(input)
    .should('have.value', input)
  cy.get(bodyTag).click()
})

Cypress.Commands.add('inputIntoSurveyFieldMultiLineText', (portalDisplay, input) => {
  cy.get(labelTag)
    .contains(portalDisplay)
    .next()
    .find(textAreaTag)
    .clear({ force: true })
    .eq(0)
    .type(input)
    .should('have.value', input)
  cy.get(clickBody).click()
})