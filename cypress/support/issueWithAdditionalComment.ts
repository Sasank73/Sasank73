import Utility from '../utilities/utilityMethods'
let utilities = new Utility()

//issue creation locators
const locationsMenu = '[data-testid="PlaceRoundedIcon"]'
const addIssue = '[aria-label="Add issue"]'
const nameField = '[name="name"]'
const descriptionField = '[name="description"]'
const spacesField = '#spaces'
const spacesMenu = '[role="option"]'
const commentCheckbox = '[name="userCommentRequired"]'
const positionField = '[name ="position"]'
const saveIssueBtn = '[type="submit"]'
const searchBtn = '[data-testid="Search-iconButton"]'
const textField = '[data-test-id="Search"] input'
const verifyCreatedIssue = 'td.MuiTableCell-root '
const backBtn = 'button[aria-label="Go back"]'

//verifications
const verifyLocPage = '[aria-label="Table Toolbar"] .MuiTypography-root'
const verifyCreateLocPage = '[aria-label="Go back"]+h1'
const verifyPortalText = '.MuiTypography-root'

//addIssueToSpace locators
const selectLocation = '[data-testid*="MuiDataTableBodyCell"]'
const spaceBtn = '[role="tab"]'
const issueField = '[data-testid="ArrowDropDownIcon"]'
const closeBtn = 'button[aria-label="Clear"]'
const saveBtn = 'form button[type="submit"]'

//requestSubmission locators
const ellipsisBtn = '[data-testid="MoreVertIcon"]'
const portalBtn = '[role="menuitem"]'
const radioButtons = '.MuiRadio-label'
const addcomment = '#comment_message'
const locationDropdownSearch = '#location'
const locationOption = '[role="option"]'
const detailHelperText = '#detail-helper-text'
const verifyPageCreation = '[role="alert"]'
const typeName = '[name="name"]'
const typeDescription = '[name=description]'
const spaceDrpdwn = '#spaces'
const chkBox = '[type="checkbox"]'
const issuesMenu = '[data-testid="DnsRoundedIcon"]'
const image = 'div img'
const tab = '[role="tab"]'
const uploadInputFile = 'input[type="file"]'

//additional comment commands

const number = utilities.getRandomNumber(1, 999)

//commands
Cypress.Commands.add(
  'createIssue',
  (locPage, createPage, issueName, issueDescription, spaceName, status) => {
    cy.waitUntil(() => cy.get(issuesMenu).should('be.visible'))
    cy.get(issuesMenu).should('exist').click({ multiple: true, force: true })
    cy.get(verifyLocPage).contains(locPage)
    cy.get(addIssue).should('be.visible').click()
    cy.get(verifyCreateLocPage).contains(createPage)
    cy.get(typeName).should('be.visible')
    cy.get(typeDescription).should('be.visible')
    cy.get(spaceDrpdwn).should('be.visible')
    cy.get(chkBox).eq(0).should('not.be.checked')
    cy.get(chkBox).eq(1).should('not.be.checked')
    cy.get(chkBox).eq(2).should('be.checked')
    cy.get(nameField).should('exist').clear().type(issueName).should('have.value', issueName)
    cy.get(descriptionField)
      .should('exist')
      .type(issueDescription)
      .should('have.value', issueDescription)
    cy.get(spacesField).should('exist').click()
    cy.get(spacesMenu).contains(spaceName).click()
    cy.get(commentCheckbox).click({ force: true })
    cy.get(positionField).type(number, { force: true })
    cy.get(saveIssueBtn).should('be.visible').click({ force: true })
    cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
    cy.get(verifyPageCreation).contains(status, { matchCase: false })
  },
)

Cypress.Commands.add('clickOnIssueCategories', () => {
  cy.get(issuesMenu).should('exist').click()
})

Cypress.Commands.add('verifyCreatedIssue', (locPage, issueName) => {
  cy.get(verifyLocPage).contains(locPage)
  cy.get(searchBtn).should('be.visible').click()
  cy.get(textField).should('be.visible').type(issueName)
  cy.get(verifyCreatedIssue).eq(0).should('contain', issueName).click({ multiple: true })
  cy.url().then((url) => {
    const parts = url.split('/')
    const desiredValue = parts[parts.length - 2]
    cy.wrap(desiredValue).as('issueId')
  })
})

Cypress.Commands.add('selectLocation', (locPage, locationTitles, btnName, spaceTitle) => {
  cy.get(locationsMenu).click({ multiple: true, force: true })
  cy.get(verifyLocPage).contains(locPage)
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
})

Cypress.Commands.add('addIssueToSpace', (issueName) => {
  cy.get(issueField).should('be.visible').click({ multiple: true, force: true })
  cy.get(closeBtn).should('exist').click()
  cy.get(spacesMenu).contains(issueName).click()
  cy.get(detailHelperText).click({ force: true })
  cy.get(saveBtn).should('exist').and('not.be.disabled').click({ force: true })
})

Cypress.Commands.add(
  'requestSubmission',
  (verifyText, locName, spacPage, spaceName, issuePage, issueName, issueTwo) => {
    cy.reload()
    cy.get(verifyPortalText).should('contain', verifyText)
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
    cy.get(verifyPortalText).should('contain', spacPage)
    cy.get(radioButtons)
      .should('exist')
      .contains(spaceName)
      .parentsUntil('.MuiRadio-radio')
      .first()
      .click()
    cy.waitUntil(() => cy.contains(issueName))
    cy.contains(issueName)
    cy.contains(issueTwo)
    cy.get('.MuiRadio-radio+label ').contains(issueName).parent('.MuiRadio-root').first().click()
    cy.get(verifyPortalText).should('contain', issuePage)
    cy.contains(issueName).click({ force: true })
    cy.waitUntil(() => cy.get(addcomment).should('exist'))
    cy.get(addcomment).type(issueName).should('have.value', issueName)
    cy.contains(locName).click()
  },
)
Cypress.Commands.add('uploadFiles', (fileNames, expectedLength) => {
  const filePaths = fileNames.map((fileName) => `cypress/fixtures/${fileName}`)
  cy.log('File paths:', filePaths)
  cy.get(uploadInputFile).selectFile(filePaths, { force: true })
  cy.verifyUploadedImages(expectedLength)
})

Cypress.Commands.add('clickOnCommentsTab', () => {
  cy.get(tab).contains('Comments (1)').should('exist').click()
})

Cypress.Commands.add('verifyUploadedImages', (expectedLength) => {
  cy.waitUntil(() => cy.get(image).should('have.length', expectedLength))
})
