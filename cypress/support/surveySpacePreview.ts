import cypress from 'cypress'
import 'cypress-wait-until'

//create space and issue locators
const tab = '[role="tab"]'
const newSpaceButton = '[aria-label="New space"]'
const enableSurveyMode = '.MuiSwitch-action'
const typeDetail = '#detail'
const typeName = '[name="name"]'
const searchBar = '[data-test-id="Search"]'
const selectLocation = 'tbody.MuiTableBody-root td'
const backBtn = '[aria-label="Go back"]'
const checkboxPortal = '.MuiCheckbox-checkbox'
const surveyButton = 'button.MuiButton-root'

//space preview locators
const tile = '.MuiSheet-root'
const surveyTile = '.MuiSheet-variantPlain'
const profileIcon = 'button [data-testid="AccountCircleIcon"]'
const submitButton = '[type="submit"]'
const surveyList = 'li .MuiListItemButton-root'
const editSurvey = '[aria-label="Edit survey"]'
const surveyDropDown = '#survey'
const saveButton = '[type = "submit"]'
const saveText = 'Save'
const searchBtn = '[data-testid="Search-iconButton"]'
const num = '[type="number"]'
const drpdwn = '[data-testid="UnfoldIcon"]'
const role = '[role="option"]'
const chkBox = '.MuiSheet-root .MuiCheckbox-checkbox'
const menuItem = '[data-testid="AddIcon"]'
const surveyTitle = '#internalTitle'
const surveyDescription = '#internalDescription'
const createNewField = 'Create new field'
const bufferIcon = '.MuiCircularProgress-progress'
const verifyPageCreation = '[role="alert"]'

//commands
Cypress.Commands.add('surveyPreviewWithOutData', (locationName, spaceName) => {
  cy.get(surveyTile).should('be.visible').and('have.length', 4)
  cy.get(surveyTile).eq(3).contains(locationName).should('contain', locationName)
  cy.get(surveyTile).eq(3).find(profileIcon).should('exist')
  cy.get(surveyTile).eq(3).find(submitButton).should('exist').should('contain.text', 'Submit')
  cy.get(surveyTile).eq(3).contains(spaceName).should('contain', spaceName)
})

Cypress.Commands.add('goToSurvey', (surveyName) => {
  cy.get(surveyList).contains(surveyName).click()
  cy.get(editSurvey).should('exist').and('not.be.disabled').click()
  cy.get(bufferIcon).should('not.exist')
  cy.get(surveyButton).contains(createNewField).should('be.visible').click()
})

Cypress.Commands.add('surveyPage', (sTitle, sDesc) => {
  cy.get(menuItem).should('exist').click()
  cy.get(bufferIcon).should('not.exist')
  cy.get(surveyTitle).should('be.visible').type(sTitle)
  cy.get(surveyDescription).should('be.visible').type(sDesc)
  cy.waitUntil(() => cy.get(saveButton).contains('Save').should('exist'))
})

Cypress.Commands.add('surveyPreviewWithData', (locationName, spaceName, surveyName) => {
  cy.get(surveyTile).should('be.visible').and('have.length', 4)
  cy.get(surveyTile).eq(3).contains(locationName).should('contain', locationName)
  cy.get(surveyTile).eq(3).find(profileIcon).should('exist')
  cy.get(surveyTile).eq(3).find(submitButton).should('exist').should('contain.text', 'Submit')
  cy.get(surveyTile).eq(3).contains(spaceName).should('contain', spaceName)
  cy.get(surveyTile).eq(3).contains(surveyName).should('contain', surveyName)
})

Cypress.Commands.add('verifyTextField', (dispTitle, helpText) => {
  cy.get(surveyTile).eq(3).contains(dispTitle).should('contain', dispTitle)
  cy.scrollTo('bottom', { ensureScrollable: false })
  cy.get(surveyTile).eq(3).contains(helpText).should('contain', helpText)
  cy.reload()
})

Cypress.Commands.add('createAndVerifySurevy', (spaceTitle, detail, survey, locationName) => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.waitUntil(() => cy.get(newSpaceButton).should('be.visible'))
  cy.get(newSpaceButton).should('be.visible').click()
  cy.waitUntil(() => cy.get(enableSurveyMode).should('exist'))
  cy.get(enableSurveyMode).then(($el) => {
    if (!$el.is(':checked')) {
      cy.get(enableSurveyMode).click()
    }
  })
  cy.get(typeName).should('be.visible').type(spaceTitle).should('have.value', spaceTitle)
  cy.get(typeDetail).type(detail).should('have.value', detail)
  cy.get(surveyDropDown).click()
  cy.contains(survey).eq(0).click()
  cy.get(tile).should('be.visible').and('have.length', 3)
  cy.get(tile).eq(2).contains(locationName).should('contain', locationName)
  cy.get(tile).eq(2).find(profileIcon).should('exist')
  cy.waitUntil(() => cy.get(saveButton).contains(saveText).should('be.visible'))
  cy.get(saveButton).contains(saveText).should('be.visible').click()
})

Cypress.Commands.add('verifySpaceHomeScreen', () => {
  cy.get(tab).should('exist')
  cy.get(tab).should('have.length', 3)
  cy.get(newSpaceButton).should('be.visible')
})

Cypress.Commands.add('goToCreatedSpace', (newSurvey, survey) => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.get(searchBtn).should('be.visible').click()
  cy.get(searchBar).type(newSurvey).click()
  cy.waitUntil(() => cy.get(selectLocation).should('exist'))
  cy.get(selectLocation).contains(survey).click('center', { force: true })
  cy.reload()
})

Cypress.Commands.add('goToCreatedSpaces', (newSurvey, survey) => {
  cy.get(backBtn).eq(0).should('be.visible').click({ multiple: true })
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.get(searchBtn).should('be.visible').click()
  cy.get(searchBar).clear().type(newSurvey).click()
  cy.get(selectLocation).contains(survey).click('center', { force: true })
})

Cypress.Commands.add('spacePreviewWithAllData', (locationName, spaceName, surveyName) => {
  cy.get(tile).should('be.visible').and('have.length', 3)
  cy.get(tile).eq(2).contains(locationName).should('contain', locationName)
  cy.get(tile).eq(2).find(profileIcon).should('exist')
  cy.get(tile).eq(2).find(submitButton).should('exist').should('contain.text', 'Submit')
  cy.get(tile).eq(2).contains(spaceName).should('contain', spaceName)
  cy.get(tile).eq(2).contains(surveyName).should('contain', surveyName)
})

Cypress.Commands.add('verifySpaceTextField', (dispTitle, helpText) => {
  cy.get(tile).eq(2).contains(dispTitle).should('contain', dispTitle)
  cy.scrollTo('bottom', { ensureScrollable: false })
  cy.get(tile).eq(2).contains(helpText).should('contain', helpText)
})

Cypress.Commands.add('verifySpaceNumberField', (dispTitle, helpText) => {
  cy.get(tile).eq(2).contains(dispTitle).should('contain', dispTitle)
  cy.scrollTo('bottom', { ensureScrollable: false })
  cy.get(tile).eq(2).contains(helpText).should('contain', helpText)
  cy.get(num).type('20').should('have.value', '20')
})

Cypress.Commands.add('verifyDropDownField', (dispTitle, helpText) => {
  cy.get(tile).eq(2).contains(dispTitle).should('contain', dispTitle)
  cy.scrollTo('bottom', { ensureScrollable: false })
  cy.get(tile).eq(2).contains(helpText).should('contain', helpText)
  cy.scrollTo('bottom', { ensureScrollable: false })
  cy.get(drpdwn).eq(2).should('exist').click({ multiple: true, force: true })
  cy.get(role).should('exist')
})

Cypress.Commands.add('verifyCheckBoxField', (dispTitle, helpText, pdTitle) => {
  cy.get(tile).eq(2).contains(dispTitle).should('contain', dispTitle)
  cy.scrollTo('bottom', { ensureScrollable: false })
  cy.get(tile).eq(2).contains(helpText).should('contain', helpText)
  cy.scrollTo('bottom', { ensureScrollable: false })
  cy.get(chkBox)
    .eq(1)
    .then(($el) => {
      if (!$el.is(':checked')) {
        cy.get($el).click()
      }
    })
})
