//space locators
const locationsMenu = '[data-testid="PlaceRoundedIcon"]'
const searchBtn = '[data-testid="Search-iconButton"]'
const textField = 'input[aria-label="Search"]'
const selectLocation = '[data-testid*="MuiDataTableBodyCell"]'
const spaceBtn = '[role="tab"]'
const issueField = '[aria-labelledby*="issues"]'
const checkboxLabel = '.MuiCheckbox-label'
const checkboxPortal = '.MuiCheckbox-checkbox'
const detailHelperText = '#detail-helper-text'
const saveBtn = 'form button[type="submit"]'
//requestSubmission locators
const ellipsisBtn = '[data-testid="MoreVertIcon"]'
const portalBtn = '[role="menuitem"]'
const radioButtons = '.MuiRadio-label'
const submit = '[aria-hidden="false"] [type="submit"] '
const locationDropdownSearch = '#location'
const locationOption = '[role="option"]'
const portalProfileButton = '[aria-haspopup="menu"]'
const portalLoginButton = '[aria-label="Login"]'
const feedbackButton = '[title="Leave feedback"]'
const backButton = '[aria-hidden="false"] [type="button"]'
//commands

Cypress.Commands.add('uncheckCommentBox', (locationTitles, btnName, spaceTitle) => {
  cy.get(locationsMenu).click({ multiple: true, force: true })
  cy.get(searchBtn).should('be.visible').click()
  cy.get(textField).should('be.visible').type(locationTitles)
  cy.get(selectLocation)
  cy.contains(locationTitles).click()
  cy.get(spaceBtn)
  cy.contains(btnName).click({ multiple: true })
  cy.get(searchBtn).should('be.visible').click()
  cy.get(textField).should('be.visible').type(spaceTitle)
  cy.get(selectLocation)
  cy.contains(spaceTitle).click({ multiple: true })
  cy.get(checkboxLabel)
    .contains('Allow end-user comments')
    .parentsUntil('.MuiCheckbox-checkbox')
    .children(checkboxPortal)
    .then(($el) => {
      if (!$el.is(':checked')) {
        cy.get($el).click()
      } else {
        cy.get(detailHelperText).click({ force: true })
      }
    })
  cy.url().should('include', '/edit')
})

Cypress.Commands.add('spaceRequestSubmission', (locName, spaceName, isuName) => {
  cy.get('.MuiFormControl-vertical label')
    .parents('.MuiFormControl-vertical')
    .then(($parent) => {
      if ($parent.find('.MuiAutocomplete-hasPopupIcon').length > 0) {
        cy.get(locationDropdownSearch).should('exist').click().type(locName)
        cy.get(locationOption).contains(locName).eq(0).click()
      } else if ($parent.find('.MuiRadioGroup-root').length > 0) {
        cy.contains(locName).click({ force: true })
      }
    })
  cy.get(radioButtons)
    .should('be.visible')
    .contains(spaceName)
    .parentsUntil('.MuiRadio-radio')
    .first()
    .click()
  cy.contains(locName).should('exist')
  cy.contains(spaceName).should('exist')
  cy.contains('Please select an issue').should('exist')
  cy.waitUntil(() => cy.contains(isuName).should('exist'))
  cy.contains(isuName).click({ force: true })
  cy.get(feedbackButton).should('exist').and('not.be.disabled')
})

Cypress.Commands.add('verifyEndusePortalPage', () => {
  cy.get(portalLoginButton).should('exist').and('not.be.disabled')
})

Cypress.Commands.add('verifyEndusePortalPage', () => {
  cy.get(portalLoginButton).should('exist').and('not.be.disabled')
})
