/// <reference types="cypress"/>
import 'cypress-wait-until'
import env_creds from '../utilities/environment'

//menu items locators
const locationsMenu = '[data-testid="PlaceRoundedIcon"]'
const surveysMenu = '[data-testid="AssignmentRoundedIcon"]'
const menuItem = '[aria-label="primary individual surveys"] .MuiListItemContent-root'
const menuText = '[aria-label="Table Toolbar"] .MuiTypography-root'
const downloadCSVButton = '[data-testid="DownloadCSV-iconButton"]'
const viewColumnsButton = '[data-testid="View Columns-iconButton"]'
const filterTableButton = '[data-testid="Filter Table-iconButton"]'
const moreVertButton = '[aria-label="Table Toolbar"] [data-testid="MoreVertIcon"]'
const tableBody = 'tbody'

//create location locators
const addLocationButton = '[aria-label="Add location"]'
const typeName = '[name="name"]'
const locationLatitude = '[name="lat"]'
const locationLongitude = '[name="long"]'
const saveButton = '[type = "submit"]'
const verifyPageCreation = '[role="alert"]'
const createText = '[aria-label="Go back"]+h1'
const goBackButton = '[aria-label="Go back"]'
const uploadIcon = '[data-testid="CloudUploadIcon"]'
const activeCheckBox = '[name="isActive"]'
const surveyAddIcon = '[data-testid="AddIcon"]'
const surveyTitleInput = 'input[placeholder="Survey title"]'
const surveyDesc = 'textarea[placeholder="Optional description for the Survey"]'

//select location locators
const searchBtn = '[data-testid="Search-iconButton"]'
const textField = '[type="text"]'
const selectLocation = 'tbody.MuiTableBody-root td'

//create space locators
const tab = '[role="tab"]'
const newSpaceButton = '[aria-label="New space"]'
const enableSurveyMode = '.MuiSwitch-action'
const typeDetail = '#detail'
const surveyDropDown = '#survey'
const rmvFieldBtn = '[data-parent="Card-vertical"] button.MuiIconButton-colorDanger'
const saveBtn = 'button.MuiButton-variantSolid'

//create survey locators
const surveyButton = 'button.MuiButton-root'
const fieldTypeDropDown = '#type'
const surveyTitle = '#internalTitle'
const surveyDescription = '#internalDescription'
const portalDisplayTitle = '#externalTitle'
const portalHelperText = '#externalDescription'
const defaultTextValue = '#defaultText'
const defaultNumberValue = '#defaultNumber'
const defaultMultiTextValue = '#defaultLongText'
const defaultCheckbox = '[name = "defaultBoolean"]'
const addField = '[title="Add field"]'
const surveyFieldTitles = '.MuiSheet-root'
const fieldTypeNames = '[role="option"]'
const closeTosFieldTitle = 'div.MuiGrid-container'
const filedRequired = '[name="required"]'
const addNewOption = 'Add new option'
const option1 = 'Option 1'
const option2 = 'Option 2'
const saveFieldText = 'Save field'
const saveText = 'Save'
const createANewSurvey = 'Create a new survey'
const createNewField = 'Create new field'
const checkboxField = 'Checkbox'
const textFieldSurvey = 'Text'
const dropDownField = 'Drop-down'
const numberField = 'Number'
const multiTextField = 'Multi-line text'
const accountIcon = '[data-testid="AccountCircleIcon"]'
const feedbackBtn = '[data-testid="FeedbackIcon"]'

//survey request submission locators
const portalBtn = '[data-testid="LaunchIcon"]'
const radioButtons = '.MuiRadio-label'
const rdBtn = '.MuiRadio-radio'
const backBtn = '[aria-hidden="false"] [type="button"]'
const submtbtn = '[aria-hidden="false"] [type="submit"]'
const surveyTableCell = '[data-testid*="MuiDataTableBodyCell"]'
const portalInput = '.MuiOutlinedInput-root .MuiInputBase-input'
const locationDropdownSearch = '#location'
const locationOption = '[role="option"]'
const locName = 'div .MuiTypography-root'
const arrowBtn = 'button[aria-label="Go back"]'
const checkboxLabel = '.MuiCheckbox-label'
const checkboxPortal = '.MuiCheckbox-checkbox'
const portalHelperTextRoot = '.MuiFormHelperText-root'
const portalBody = 'body'
const labelRoot = '.MuiFormLabel-root'
const selectInputDrpdn = '[role="option"]'
const dropDownPortal = '.MuiSelect-root [role="combobox"]'
const checkboxLabelRoot = '.MuiCheckbox-label'
const errorMessageRoot = '.MuiCheckbox-root+.MuiFormHelperText-root'
const requiredText = 'This is required'
const fieldValue = '[aria-describedby*="helper-text"]'
const pdTitleLocator = '[id*="label"]:not([id="location-label"])'
const phTitleLocator = '[id*="helper-text"]'

//space preview locators
const submitButton = '[type="submit"]'
const button = '[type="button"]'
const editSurveyBtn = 'button[aria-label="Edit survey"]'
const editPage = 'button+.MuiTypography-root'
const surveyEllipsisBtn = 'button[aria-haspopup="menu"]'
const archiveBtn = '[data-testid="ArchiveIcon"]'
const rmvBtn = '[data-testid="RemoveCircleIcon"]'
const archBtn = '[aria-haspopup="menu"] [data-testid="MoreVertIcon"]'

//Commands
Cypress.Commands.add('goToLocationsMenu', () => {
  cy.get(locationsMenu).click({ multiple: true, force: true })
  cy.get(menuText).contains('Locations').should('be.visible')
  cy.get(searchBtn).should('be.visible')
  cy.get(tableBody).should('be.visible')
  cy.get(downloadCSVButton).should('be.visible')
  cy.get(viewColumnsButton).should('be.visible')
  cy.get(filterTableButton).should('be.visible')
  cy.get(moreVertButton).should('be.visible')
})

Cypress.Commands.add('goToSurveysMenu', () => {
  cy.get(surveysMenu).click({ multiple: true, force: true })
  cy.get(menuText).contains('Select a survey').should('be.visible')
  cy.get(searchBtn).should('be.visible')
  cy.get(tableBody).should('be.visible')
  cy.get(downloadCSVButton).should('be.visible')
  cy.get(viewColumnsButton).should('be.visible')
  cy.get(filterTableButton).should('be.visible')
})

Cypress.Commands.add('verifyCreateLocationPage', () => {
  cy.url().should('contain', 'locations')
  cy.get(goBackButton).should('be.visible')
  cy.get(createText).contains('Create location', { matchCase: false }).should('be.visible')
  cy.get(activeCheckBox).should('exist').and('be.checked')
  cy.get(uploadIcon).should('exist')
  cy.waitUntil(() => cy.get(typeName).should('be.visible'))
  cy.waitUntil(() => cy.get(locationLatitude).should('be.visible'))
  cy.waitUntil(() => cy.get(locationLongitude).should('be.visible'))
})

Cypress.Commands.add('createLocation', (name, latitude, longitude, status) => {
  cy.waitUntil(() => cy.get(addLocationButton).should('be.visible'))
  cy.get(addLocationButton).should('be.visible').click({ force: true })
  cy.url().should('contain', 'locations')
  cy.get(goBackButton).should('be.visible')
  cy.get(createText).contains('Create location', { matchCase: false }).should('be.visible')
  cy.get(activeCheckBox).should('exist').and('be.checked')
  cy.get(uploadIcon).should('exist')
  cy.waitUntil(() => cy.get(typeName).should('be.visible'))
  cy.waitUntil(() => cy.get(locationLatitude).should('be.visible'))
  cy.waitUntil(() => cy.get(locationLongitude).should('be.visible'))

  cy.get(typeName).typeAndWaitForFirstCharacter(name)
  cy.verifyCreateLocationPage()
  cy.typeAndCheckValueWithRetry(typeName, name)

  cy.get(locationLatitude).typeAndWaitForFirstCharacter(latitude)
  cy.verifyCreateLocationPage()

  cy.get(locationLongitude).typeAndWaitForFirstCharacter(longitude)
  cy.verifyCreateLocationPage()

  cy.get(locationLatitude).then(($element) => {
    const currentText = $element.val()
    if (currentText !== latitude) {
      cy.get(locationLatitude).typeAndWaitForFirstCharacter(latitude).should('have.value', latitude)
    }
  })
  cy.verifyCreateLocationPage()
  cy.verifyCreateLocationPage()

  cy.get(locationLongitude).then(($element) => {
    const currentText = $element.val()
    if (currentText !== longitude) {
      cy.get(locationLongitude)
        .typeAndWaitForFirstCharacter(longitude)
        .should('have.value', longitude)
    }
  })
  cy.verifyCreateLocationPage()
  cy.verifyCreateLocationPage()
  cy.get(typeName).then(($element) => {
    const currentText = $element.val()
    if (currentText !== name) {
      cy.get(typeName).typeAndWaitForFirstCharacter(name).should('have.value', name)
    }
  })

  cy.waitUntil(() => cy.get(typeName).should('have.value', name))
  cy.waitUntil(() => cy.get(locationLatitude).should('have.value', latitude))
  cy.waitUntil(() => cy.get(locationLongitude).should('have.value', longitude))
  cy.get(saveButton).should('be.visible').click()
  cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
  cy.get(verifyPageCreation).contains(status, { matchCase: false })
})

Cypress.Commands.add('selectCreatedLocation', (locationTitle) => {
  cy.get(downloadCSVButton).should('not.be.disabled')
  cy.get(viewColumnsButton).should('not.be.disabled')
  cy.get(filterTableButton).should('not.be.disabled')
  cy.get(moreVertButton).should('not.be.disabled')
  cy.waitUntil(() => cy.get(searchBtn).should('be.visible'))
  cy.get(searchBtn).should('exist').click()
  cy.waitUntil(() => cy.get(textField).should('exist'))
  cy.get(textField).should('exist').type(locationTitle)
  cy.waitUntil(() => cy.get(selectLocation).should('be.visible'))
  cy.get(selectLocation).eq(0).contains(locationTitle).click()
  cy.get(createText).contains('edit', { matchCase: false }).should('be.visible')
  cy.get(createText).contains(locationTitle, { matchCase: false }).should('be.visible')
})

Cypress.Commands.add('createSpace', (spaceTitle, detail, survey, status) => {
  cy.get(tab).contains('Spaces').should('be.visible').click()
  cy.waitUntil(() => cy.get(newSpaceButton).should('be.visible'))
  cy.get(newSpaceButton).should('be.visible').click()
  cy.get(createText).contains('Create space', { matchCase: false }).should('be.visible')
  cy.get(goBackButton).should('be.visible')
  cy.waitUntil(() => cy.get(enableSurveyMode).should('exist'))
  cy.get(enableSurveyMode).then(($el) => {
    if (!$el.is(':checked')) {
      cy.get(enableSurveyMode).click()
    }
  })
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
  cy.get(surveyDropDown).should('be.visible').click()
  cy.get(selectInputDrpdn).contains(survey).click()
  cy.get(saveButton).contains(saveText).should('be.visible').click({ force: true })
  cy.get(verifyPageCreation).contains(status, { matchCase: false })
})

Cypress.Commands.add('fillSurveyForm', (sTitle, sDesc) => {
  cy.get(surveyAddIcon).should('exist').click()
  cy.verifyCreateProcedurePage('Create survey', { matchCase: false })
  cy.waitUntil(() => cy.get(surveyButton).should('be.visible'))
  cy.get(surveyTitleInput).should('be.visible').clear().click().typeAndWaitForFirstCharacter(sTitle)
  cy.get(surveyDesc).should('be.visible').typeAndWaitForFirstCharacter(sDesc)
})

Cypress.Commands.add('createSurvey', (status) => {
  cy.get(saveButton).contains(saveText).click({ force: true })
  cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
  cy.get(verifyPageCreation).contains(status, { matchCase: false })
})

Cypress.Commands.add('createAndAddTextField', (sFieldTitle, pdTitle, phTitle, dValue) => {
  cy.get(fieldTypeDropDown).should('exist').click()
  cy.get(fieldTypeNames).contains(textFieldSurvey).click()
  cy.get(surveyTitle).eq(0).click().typeAndWaitForFirstCharacter(sFieldTitle)
  cy.get(portalDisplayTitle).click().typeAndWaitForFirstCharacter(pdTitle)
  cy.get(portalHelperText).click().typeAndWaitForFirstCharacter(phTitle)
  cy.get(defaultTextValue).click().typeAndWaitForFirstCharacter(dValue)
  cy.get(saveButton).contains(saveFieldText).should('be.visible').click()
  cy.get(surveyFieldTitles)
    .contains(sFieldTitle)
    .eq(0)
    .closest(closeTosFieldTitle)
    .siblings()
    .find(addField)
    .click()
})

Cypress.Commands.add('inputIntoSurveyField', (surveyName, surveyDesc, pdTitle, phTitle, input) => {
  cy.contains(surveyName).should('be.visible')
  cy.contains(surveyDesc).should('be.visible')
  cy.get(pdTitleLocator).contains(pdTitle).should('be.visible')
  cy.get(phTitleLocator).contains(phTitle).should('be.visible')
  cy.get(submitButton).should('exist').should('contain.text', 'Submit')
  cy.get(button).should('exist').should('contain.text', 'Back')
  cy.waitUntil(() => cy.get(portalInput).eq(1))
  cy.get(portalInput).eq(1).focus().typeAndWaitForFirstCharacter(input).should('have.value', input)
})

Cypress.Commands.add('clearSurveyField', () => {
  cy.get(portalInput).eq(1).focus().clear().should('be.empty')
})

Cypress.Commands.add('submitSurvey', () => {
  cy.waitUntil(() => cy.get(saveButton).should('exist'))
  cy.get(saveButton).eq(2).should('exist').click({ force: true })
  cy.waitUntil(() => cy.url().should('include', '/form/success'))
  cy.url().should('include', '/form/success')
})

Cypress.Commands.add('fieldRequired', () => {
  cy.get(filedRequired).eq(0).check().should('be.checked')
})

Cypress.Commands.add('portalLogin', (portalUrl) => {
  cy.visit(portalUrl)
  cy.url().should('include', '/portal/form/')
})

Cypress.Commands.add('selectLocationAndSpaceInPortal', (locationName, spaceName, spaceDetail) => {
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
  cy.waitUntil(() => cy.get(locName).contains(locationName))
  cy.get(locName).contains(locationName)
  cy.contains('Please select a space.')
  cy.get(backBtn).should('not.be.disabled').and('be.visible')
  cy.get(submtbtn).should('not.be.disabled').and('be.visible')
  cy.get(feedbackBtn).should('exist')
  cy.get(radioButtons).should('exist').contains(spaceName).parentsUntil(rdBtn).first().click()
  cy.contains(locationName).should('exist')
  cy.contains(spaceName).should('exist')
  cy.contains(spaceDetail).should('exist')
})

Cypress.Commands.add('verifyIsSurveySubmitted', (spaceName, spaceDetail, value, surveyName) => {
  cy.waitUntil(() => cy.get(menuItem).contains(surveyName))
  cy.get(menuItem).contains(surveyName).click()
  cy.get(surveyTableCell)
    .should('contain.text', spaceName)
    .should('contain.text', spaceDetail)
    .should('contain.text', value)
})

Cypress.Commands.add('checkErrorMessageIfRequired', (pdTitle, phTitle, locationName) => {
  cy.contains(locationName).should('be.visible').click()
  cy.get(labelRoot)
    .contains(pdTitle)
    .siblings(portalHelperTextRoot)
    .contains(requiredText)
    .should('exist')
    .should('include.text', phTitle)
})

Cypress.Commands.add('checkIsNumberFieldAllowingString', () => {
  const string = 'nodaFi'
  cy.get(fieldValue).focus().typeAndWaitForFirstCharacter(string).should('not.have.value', string)
})

Cypress.Commands.add('createAndAddNumberField', (sFieldTitle, pdTitle, phTitle, dValue) => {
  cy.get(fieldTypeDropDown).click()
  cy.get(fieldTypeNames).contains(numberField).click()
  cy.get(surveyTitle).eq(0).click().typeAndWaitForFirstCharacter(sFieldTitle)
  cy.get(portalDisplayTitle).click().typeAndWaitForFirstCharacter(pdTitle)
  cy.get(portalHelperText).click().typeAndWaitForFirstCharacter(phTitle)
  cy.get(defaultNumberValue).click().typeAndWaitForFirstCharacter(dValue)
  cy.get(saveButton).contains(saveFieldText).should('be.visible').click()
  cy.get(surveyFieldTitles)
    .contains(sFieldTitle)
    .eq(0)
    .closest(closeTosFieldTitle)
    .siblings()
    .find(addField)
    .click()
})

Cypress.Commands.add('createAndAddMultiTextField', (sFieldTitle, pdTitle, phTitle, dValue) => {
  cy.get(fieldTypeDropDown).click()
  cy.get(fieldTypeNames).contains(multiTextField).click({ force: true })
  cy.get(surveyTitle).eq(0).click().typeAndWaitForFirstCharacter(sFieldTitle)
  cy.get(portalDisplayTitle).click().typeAndWaitForFirstCharacter(pdTitle)
  cy.get(portalHelperText).click().typeAndWaitForFirstCharacter(phTitle)
  cy.get(defaultMultiTextValue).click().typeAndWaitForFirstCharacter(dValue)
  cy.get(saveButton).contains(saveFieldText).should('exist').click()
  cy.get(surveyFieldTitles)
    .contains(sFieldTitle)
    .eq(0)
    .closest(closeTosFieldTitle)
    .siblings()
    .find(addField)
    .click()
})

Cypress.Commands.add('createAndAddCheckboxField', (sFieldTitle, pdTitle, phTitle) => {
  cy.get(fieldTypeDropDown).click()
  cy.get(fieldTypeNames).contains(checkboxField).click()
  cy.get(surveyTitle).eq(0).click().typeAndWaitForFirstCharacter(sFieldTitle)
  cy.get(portalDisplayTitle).click().typeAndWaitForFirstCharacter(pdTitle)
  cy.get(portalHelperText).click().typeAndWaitForFirstCharacter(phTitle)
  cy.get(defaultCheckbox).check().should('be.checked')
  cy.get(saveButton).contains(saveFieldText).should('be.visible').click()
  cy.get(surveyFieldTitles)
    .contains(sFieldTitle)
    .eq(0)
    .closest(closeTosFieldTitle)
    .siblings()
    .find(addField)
    .click()
})

Cypress.Commands.add('uncheckTheCheckBox', (pdTitle) => {
  cy.get(checkboxLabel)
    .contains(pdTitle)
    .parentsUntil('.MuiCheckbox-checkbox')
    .children(checkboxPortal)
    .click()
})

Cypress.Commands.add('CheckTheCheckBox', (pdTitle) => {
  cy.get(checkboxLabel)
    .contains(pdTitle)
    .parentsUntil('.MuiCheckbox-checkbox')
    .children(checkboxPortal)
    .click()
})

Cypress.Commands.add('checkErrorMessageIfRequiredForCheckbox', (pdTitle, phTitle, locationName) => {
  cy.get(portalHelperTextRoot).contains(phTitle).click()
  cy.contains(locationName).should('be.visible').click()
  cy.get(checkboxLabelRoot).contains(pdTitle).should('be.visible')
  cy.get(errorMessageRoot).contains(requiredText).should('exist').should('include.text', phTitle)
})

Cypress.Commands.add('createAndAddDropdownField', (sFieldTitle, pdTitle, phTitle, opt1, opt2) => {
  cy.get(fieldTypeDropDown).click()
  cy.get(fieldTypeNames).contains(dropDownField).click()
  cy.get(surveyTitle).eq(0).click().typeAndWaitForFirstCharacter(sFieldTitle)
  cy.get(portalDisplayTitle).click().typeAndWaitForFirstCharacter(pdTitle)
  cy.get(portalHelperText).click().typeAndWaitForFirstCharacter(phTitle)
  cy.contains(addNewOption).should('be.visible').click()
  cy.contains(option1).next().children('.MuiInput-input ').typeAndWaitForFirstCharacter(opt1)
  cy.contains(option2).next().children('.MuiInput-input ').typeAndWaitForFirstCharacter(opt2)
  cy.get(saveButton).contains(saveFieldText).should('be.visible').click()
  cy.verifyEditSurveyScreen()
  cy.verifyEditSurveyScreen()
  cy.verifyEditSurveyScreen()
  cy.get(surveyFieldTitles)
    .contains(sFieldTitle)
    .eq(0)
    .closest(closeTosFieldTitle)
    .siblings()
    .find(addField)
    .click()
})

Cypress.Commands.add('verifyEditSurveyScreen', () => {
  cy.contains('Edit survey')
  cy.contains('Fields')
  cy.contains('Click the "+" icon to add fields to the survey.')
  cy.contains('Title')
  cy.contains('The title of the survey.')
  cy.contains('Description')
  cy.contains('A description for the survey. Optional.')
  cy.get(archBtn).should('exist')
})

Cypress.Commands.add('selectInputFromDropdown', (pdTitle, input) => {
  cy.contains(pdTitle).should('be.visible').next().children(dropDownPortal).click()
  cy.get(selectInputDrpdn).contains(input).click()
})

Cypress.Commands.add('checkErrorMessageIfRequiredForDropdown', (pdTitle, phTitle, locationName) => {
  cy.contains(pdTitle).should('exist').next().children(dropDownPortal).dblclick({ force: true })
  cy.get(portalBody).click()
  cy.contains(locationName).should('exist').click({ force: true })
  cy.get(portalHelperTextRoot).should('exist').contains(phTitle).click({ force: true })
  cy.get(labelRoot)
    .contains(pdTitle)
    .siblings(portalHelperTextRoot)
    .contains(requiredText)
    .should('exist')
    .should('include.text', phTitle)
})

Cypress.Commands.add('archiveVerifiedSurvey', () => {
  cy.get(editSurveyBtn).should('not.be.disabled').and('be.visible').click()
  cy.get(editPage).contains('Edit survey').should('exist')
  cy.get(surveyEllipsisBtn).eq(0).should('not.be.disabled').and('be.visible').click()
  cy.get(archiveBtn).should('exist').click()
})

Cypress.Commands.add('removeField', (surveyName, fieldName) => {
  cy.waitUntil(() => cy.get(menuItem).contains(surveyName))
  cy.get(menuItem).contains(surveyName).click()
  cy.get(editSurveyBtn).should('not.be.disabled').and('be.visible').click()
  cy.get(editPage).contains('Edit survey').should('exist')
  cy.get(saveBtn).should('not.be.disabled').and('exist')
  cy.contains(fieldName).should('exist').click()
  cy.get(rmvFieldBtn).should('be.visible').click()
  cy.get(saveBtn).should('not.be.disabled').click()
})

Cypress.Commands.add('removeAField', (fieldName) => {
  cy.get(saveBtn).should('not.be.disabled').and('exist')
  cy.contains(fieldName).should('exist').click()
  cy.get(rmvFieldBtn).should('be.visible').click()
  cy.get(saveBtn).should('not.be.disabled').click()
})
