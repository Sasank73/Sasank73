/// <reference types="cypress"/>
import 'cypress-wait-until'

//menu items locators
const assetsMenu = '[data-testid="WidgetsRoundedIcon"]'
const goBackButton = '[aria-label="Go back"]'
const checkBox = 'input[name="isUserCommentEnabled"] '
//space preview locators'
const profileIcon = 'button[aria-haspopup="menu"]'
const submitButton = '[type="submit"]'
const button = '[type="button"]'
const addComment = '#comment_message'
const addPhoto = '#ticket-image-input'
const locName = '.MuiTypography-root'
const submitBtn = '[type="submit"]'
const saveText = 'Save'

//update asset locators
const lableName = '.MuiFormControl-root label'
const selectedItems = 'button[aria-label="Clear"]'
const tableRow = 'td.MuiTableCell-root '
const tableCell = 'tbody tr td'
const spacesDropdown = '#spaces'

//issue creation locators
const searchBtn = '[data-testid="Search-iconButton"]'
const textField = '[type="text"]'
const tableBody = 'tbody'
const downloadCSVButton = '[data-testid="DownloadCSV-iconButton"]'
const viewColumnsButton = '[data-testid="View Columns-iconButton"]'
const filterTableButton = '[data-testid="Filter Table-iconButton"]'
const moreVertButton = '[aria-label="Table Toolbar"] [data-testid="MoreVertIcon"]'

//create space and issue locators
const tab = '[role="tab"]'
const newSpaceButton = '[aria-label="New space"]'
const body = 'body'
const issuesDropdown = '#issues'
const typeName = '[name="name"]'
const selectInputDrpdn = '[role="option"]'
const locationDropdwn = '#location'
const saveButton = 'form [type="submit"]'
const spaceEllipsisButton = 'div button~div div button'
const archiveButton = '[data-testid="ArchiveIcon"]'
const backBtn = '[aria-hidden="false"] [type="button"]'
const nextBtn = '[aria-hidden="false"] [type="submit"]'
const searchButton = '[data-testid="Search-iconButton"]'
const searchInputField = '[type="text"]'
const customFields = '.MuiChip-label'
const parentField = '.MuiChip-variantSoft'
const clearIcon = '.MuiChipDelete-root'
const verifySumbitPage = '[for="ticket-image-input"]'
//commands

Cypress.Commands.add('goToSpacesFromLocation', () => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.waitUntil(() => cy.get(newSpaceButton).should('be.visible'))
})

Cypress.Commands.add('verifySpacesOfLocation', (spaceName) => {
  cy.get(tab).contains('Spaces').should('exist').and('not.be.disabled')
  cy.get(searchButton).should('exist').click()
  cy.get(searchInputField).clear().type(spaceName).should('have.value', spaceName)
  cy.get(tableCell).eq(0).contains(spaceName).should('exist')
})

Cypress.Commands.add('goToSpaces', () => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.waitUntil(() => cy.get(newSpaceButton).should('be.visible'))
  cy.get(newSpaceButton).should('be.visible').click()
})

Cypress.Commands.add('verifySpacesOfLocationInPortal', (locationName, spaceName) => {
  cy.get(locName).should('be.visible').should('contain.text', locationName)
  cy.get(submitBtn).should('not.be.disabled').and('be.visible').click()
  cy.contains('Please select a space.').should('be.visible')
  cy.contains(spaceName, { matchCase: false }).should('exist')
})

Cypress.Commands.add('verifySpacesOfLocationInPortalForm', (locationName, spaceName) => {
  cy.get(locName).should('be.visible').should('contain.text', locationName)
  cy.waitUntil(() => cy.get(nextBtn).should('not.be.disabled').and('be.visible'))
  cy.get(nextBtn).should('not.be.disabled').and('be.visible').click()
  cy.contains('Please select a space.')
  cy.contains(spaceName, { matchCase: false }).should('exist')
})

Cypress.Commands.add('verifyIssuesOfSpaceInPortal', (locationName, spaceName, issueName) => {
  cy.get(locName).should('be.visible').should('contain.text', locationName)
  cy.get(verifySumbitPage).should('exist').and('be.visible')
  cy.get(backBtn).should('not.be.disabled').and('exist').click()
  cy.contains('Please select an issue').should('be.visible')
  cy.contains(spaceName).should('exist')
  cy.contains(issueName).should('exist')
})

Cypress.Commands.add('verifyIssuesOfSpacesInPortal', (locationName, spaceName, issueName) => {
  cy.get(locName).should('be.visible').should('contain.text', locationName)
  cy.get(nextBtn).should('not.be.disabled').and('exist')
  cy.contains('Please select an issue').should('be.visible')
  cy.contains(spaceName).should('exist')
  cy.contains(issueName).should('exist')
})

Cypress.Commands.add('selectIssueFromDropdown', (issueName) => {
  cy.get(goBackButton).should('be.visible')
  cy.get(typeName).should('exist')
  cy.get(checkBox).should('be.checked')
  cy.get(issuesDropdown).should('exist').click({ force: true })
  cy.get(selectInputDrpdn).contains(issueName).should('exist').click()
  cy.get(issuesDropdown).should('exist').scrollIntoView()
  cy.get(body).click()
  cy.get(selectInputDrpdn).should('exist')
})

Cypress.Commands.add('goToAssetsMenu', () => {
  cy.get(assetsMenu).click({ multiple: true, force: true })
})

Cypress.Commands.add('selectCreatedAsset', (assetTitle) => {
  cy.waitUntil(() => cy.get(searchBtn).should('be.visible'))
  cy.get(searchBtn).should('be.visible').click()
  cy.waitUntil(() => cy.get(textField).should('be.visible'))
  cy.get(textField).should('exist').type(assetTitle)
  cy.waitUntil(() => cy.get(tableRow).should('be.visible'))
  cy.get(tableRow).eq(0).contains(assetTitle).click()
})

Cypress.Commands.add('verifyAssetWithOutSpace', (spaceName) => {
  cy.contains(spaceName).should('not.exist', spaceName)
  cy.contains('There is no space configured for this asset.').should('be.visible')
})

Cypress.Commands.add('verifyAssetWithOutIssue', (spaceName, issueName) => {
  cy.contains(spaceName).should('not.exist', spaceName)
  cy.contains(issueName).should('not.exist', issueName)
})

Cypress.Commands.add('selectCreatedIssue', (issueTitle) => {
  cy.waitUntil(() => cy.get(searchBtn).should('be.visible'))
  cy.get(searchBtn).should('be.visible').click()
  cy.get(textField).should('be.visible').clear().type(issueTitle)
  cy.waitUntil(() => cy.get(tableRow).should('be.visible'))
  cy.get(tableRow).eq(0).contains(issueTitle).click()
})

Cypress.Commands.add('verifyAutoCompleteInAsset', (locationName, assetName) => {
  cy.get(locName).should('be.visible').should('contain.text', locationName)
  cy.contains(assetName).should('be.visible')
  cy.get(profileIcon).should('exist')
  cy.get(addComment).should('exist')
  cy.get(addPhoto).should('exist')
  cy.get(submitButton).should('exist').should('contain.text', 'Next')
})

Cypress.Commands.add('verifyIssuesOfAssetsInPortal', (locationName, assetName, issueName) => {
  cy.get(locName).should('be.visible').should('contain.text', locationName)
  cy.contains('Please select an issue').should('be.visible')
  cy.contains(assetName).should('exist')
  cy.contains(issueName).should('exist')
})

Cypress.Commands.add('deSelectAllIssuesAndSpacesInAsset', (labelTitle) => {
  cy.get(lableName)
    .contains(labelTitle)
    .parent('.MuiFormControl-root')
    .children('.MuiAutocomplete-root')
    .children('.MuiAutocomplete-wrapper')
    .siblings(selectedItems)
    .should('exist')
    .click({ force: true })
  cy.get(body).click()
})

Cypress.Commands.add('selectIssueInAsset', (issueName) => {
  cy.get(issuesDropdown).should('exist').click()
  cy.get(selectInputDrpdn).contains(issueName).should('exist').click()
  cy.get(body).click()
})

Cypress.Commands.add('selectIssuesInAsset', (issueName, issueNames) => {
  cy.get(issuesDropdown).should('exist').click({ multiple: true, force: true })
  cy.get(selectInputDrpdn).contains(issueName).should('exist').click()
  cy.get(selectInputDrpdn).contains(issueNames).should('exist').click()
  cy.get(body).click()
})

Cypress.Commands.add('selectSpaceInAsset', (locName, spaceName) => {
  cy.get(locationDropdwn).scrollIntoView()
  cy.get(locationDropdwn).should('exist').click({ force: true })
  cy.get(selectInputDrpdn).contains(locName).should('exist').click()
  cy.get(spacesDropdown).should('exist').click({ force: true })
  cy.get(selectInputDrpdn).contains(spaceName).should('exist').click()
  cy.get(body).click()
})

Cypress.Commands.add('removeIssue', (issueName) => {
  cy.get(customFields)
    .contains(issueName)
    .parents(parentField)
    .children('.MuiChip-endDecorator')
    .children(clearIcon)
    .should('exist')
    .click()
  cy.get(body).click()
})

Cypress.Commands.add('clickOnSaveAsset', () => {
  cy.get(saveButton).should('not.be.disabled').and('be.visible').click()
  cy.get(locName).contains('Assets').should('exist')
  cy.get(searchBtn).should('be.visible')
  cy.get(tableBody).should('be.visible')
  cy.get(downloadCSVButton).should('be.visible')
  cy.get(viewColumnsButton).should('be.visible')
  cy.get(filterTableButton).should('be.visible')
  cy.get(moreVertButton).should('be.visible')
})

Cypress.Commands.add('archiveCreatedSpace', () => {
  cy.get(spaceEllipsisButton).should('not.be.disabled').click()
  cy.get(archiveButton).should('be.visible').click()
  cy.get(saveButton).contains(saveText).should('exist').click({ force: true })
})
