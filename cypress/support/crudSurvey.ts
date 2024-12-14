/// <reference types="cypress"/>
import 'cypress-wait-until'

//create survey locators
const surveyButton = 'button.MuiButton-root'
const createNewField = 'Create new field'
const surveyList = '[role="button"]'
const editBtn = '[aria-label="Edit survey"]'
const verifyLocPage = '[aria-label="Table Toolbar"] .MuiTypography-root'
const verifyCreateLocPage = '[aria-label="Go back"]+h1'
const removeBtn = '[title="Remove field"]'
const surveyPagetxt = 'Select a survey'
const surveyFieldTitles = 'form .MuiTypography-root'
const parentLoc = '.MuiGrid-container'
const siblingLoc = ' .MuiGrid-root'
const saveBtn = 'button.MuiButton-variantSolid'
const lable = 'label'
//commands
Cypress.Commands.add('verifySurveyPage', () => {
  cy.get(verifyLocPage).should('contain', surveyPagetxt)
})

Cypress.Commands.add('verifySurveyCreatePage', (pageTxt) => {
  cy.get(verifyCreateLocPage).should('contain', pageTxt)
})

Cypress.Commands.add('selectCreatedSurvey', (surveyName) => {
  cy.get(surveyList).contains(surveyName).click({ multiple: true })
  cy.get(editBtn).should('not.be.disabled').click()
})

Cypress.Commands.add('removeAndVerifyFields', (fieldName) => {
  cy.get(surveyFieldTitles)
    .should('contain', fieldName)
    .parent(siblingLoc)
    .parent(parentLoc)
    .parent(parentLoc)
    .children('.MuiGrid-root')
    .then((element) => {
      cy.wrap(element).get(removeBtn).eq(4).click({ multiple: true })
    })
})

Cypress.Commands.add('verifyDeletedField', (fieldName) => {
  cy.get(lable).should('not.contain', fieldName)
})

Cypress.Commands.add('saveSurvey', () => {
  cy.get(saveBtn).should('exist').and('not.be.disabled').click()
})