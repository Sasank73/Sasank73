import 'cypress-wait-until'
//locators --> Procedure creation
const procedureBtn = '[data-testid="AssignmentTurnedInRoundedIcon"]'
const procedureHeader = '.MuiTypography-root'
const createProcedureBtn = '[data-testid="AddIcon"]'
const downloadCSVButton = '[data-testid="DownloadCSV-iconButton"]'
const viewColumnsButton = '[data-testid="View Columns-iconButton"]'
const filterTableButton = '[data-testid="Filter Table-iconButton"]'
const tabBtn = '[role="tab"]'
const saveButton = '[type="button"]'
const addNewField = '.MuiCard-vertical'
const inputeFields = ['Short text', 'Long text', 'Number', 'Checkbox', 'Single select']
const sectionName = '.MuiGrid-root'
const textInput = '.MuiCardContent-root .MuiInput-input'
const textDesc = '[id="form-section"] .MuiTextarea-root'
const enableRequiredBtn = '.MuiSwitch-action'
const inputField = '[id="form-section"] .MuiInput-input'
const headerName = '[id="form-section"] .MuiTypography-root'
const addnewSection = '.MuiCard-horizontal+[type="button"]'
const addSection = '[id="card-description"]'
const checkField = '.MuiCheckbox-checkbox'
const dropField = '[id="form-section"] [role="radiogroup"]'
const addOption = '[data-testid="AddCircleIcon"]'
const label = '.MuiFormLabel-root'
const dropdown = '.MuiAutocomplete-root [aria-label="Open"]'

const procdrDilog = '#action-dialog-title' //issue in selecting this locator

const procdDilog = '#action-dialog-subtitle'
const updateBtn = '[form="procedure-form"]'
const cancelBtn = '.MuiDialogActions-root .MuiButton-variantPlain'
const addProcBtn = '.MuiSheet-root .MuiButton-root'

//ticket creation
const ticketMenu = '[data-testid="InboxRoundedIcon"]'
const createTicketBtn = '[data-testid="tickets-landing-page-create-ticket-button"]'
const ticketPage = '[data-testid="tickets-create-content-container"]'
const ticketTitle = '#title'
const ticketDesc = '#description'
const locName = '#location'
const spaceName = '#space'
const IssuName = '#issue'
const dropDownoption = '[role="option"]'
const createTicketButton = '[data-testid="tickets-create-submit-create-ticket-button"]'
const verifyPageCreation = '[role="alert"]'
const ticketMenuButton = '[data-testid="InboxRoundedIcon"]'
const searchField = '[data-test-id="Search"]'
const selectTicket = 'td.MuiTableCell-root'
const ticketHelpertext = 'p~div .MuiTextarea-textarea'
const addProc = '.MuiFormControl-root'

const procDropdwn = '[class="MuiAutocomplete-input css-zbfygt"]' // changed to new locator

const procOption = '[role="option"]'
const procName = 'input[placeholder="Procedure title"]'
const selectProc = '[aria-label="primary individual procedure templates"] .MuiListItemContent-root '
const editProc = '[aria-label="Edit procedure template"]'
const searchBtn = '[data-testid="Search-iconButton"]'
const submitBtn = '[type="submit"]'
const closeBtn = '[title="Close ticket details"]'
const checkBtn = '.MuiSwitch-input'
const longTextIp = 'textarea[placeholder="Enter text here..."]'
const procedureIdHeader = '[id="action-dialog-title"]'
const deleteButton = '[data-testid="DeleteIcon"]'
//commands

Cypress.Commands.add('goToTicketMenu', () => {
  cy.waitUntil(() => cy.get(ticketMenu).should('be.visible'))
  cy.get(ticketMenu).should('be.visible').click()
})

Cypress.Commands.add('verifyTicketHomePage', () => {
  cy.get(searchBtn).should('be.visible')
  cy.get(downloadCSVButton).should('be.visible')
  cy.get(viewColumnsButton).should('be.visible')
  cy.get(createProcedureBtn).should('be.visible')
  cy.get(procedureHeader).contains('Tickets')
  cy.get(createTicketBtn).should('not.be.disabled').and('be.visible')
})

Cypress.Commands.add('createTicket', (titleName, titleDesc, loctnName, spcName, issName) => {
  cy.get(createTicketBtn).should('not.be.disabled').and('be.visible').click()
  cy.get(ticketPage).should('be.visible')
  cy.get(ticketTitle).type(titleName).should('have.value', titleName)
  cy.get(ticketDesc).type(titleDesc).should('have.value', titleDesc)
  cy.get(locName).should('exist').click()
  cy.get(dropDownoption).contains(loctnName).click()
  cy.get(spaceName).should('exist').click()
  cy.get(dropDownoption).contains(spcName).click()
  cy.get(IssuName).should('exist').click()
  cy.get(dropDownoption).contains(issName).click()
  cy.get(createTicketButton).scrollIntoView()
  cy.get(createTicketButton).should('exist').and('not.be.disabled').click()
  cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
  cy.get(verifyPageCreation).contains('created', { matchCase: false })
})

Cypress.Commands.add('goToProcedure', () => {
  cy.waitUntil(() => cy.get(procedureBtn).should('exist'))
  cy.get(procedureBtn).should('be.visible').click()
})

Cypress.Commands.add('verifyProcedureHomePage', () => {
  cy.waitUntil(() => cy.get(procedureHeader).contains('All procedure entries'))
  cy.get(procedureBtn).should('be.visible')
  cy.get(searchBtn).should('be.visible')
  cy.get(downloadCSVButton).should('be.visible')
  cy.get(viewColumnsButton).should('be.visible')
  cy.get(filterTableButton).should('be.visible')
  cy.get(createProcedureBtn).should('be.visible')
  cy.get(procedureHeader).contains('Create a new procedure template')
  cy.get(procedureHeader).contains('All procedure entries')
})

Cypress.Commands.add('clickOnProcedureBtn', () => {
  cy.get(createProcedureBtn).should('be.visible').click()
})

Cypress.Commands.add('verifyCreateProcedurePage', (pageHeader) => {
  cy.waitUntil(() => cy.get(tabBtn).contains('Form').should('be.visible'))
  cy.get(tabBtn).contains('Form').should('not.be.disabled')
  cy.get(tabBtn).contains('Configuration').should('not.be.disabled')
  cy.get(saveButton).contains('Configuration').should('not.be.disabled')
  cy.get(procedureHeader).contains(pageHeader, { matchCase: false })
  cy.get(procedureHeader).contains('Add a form element').should('exist')
  cy.get(procedureHeader).contains('Sections').should('exist')
  cy.get(procedureHeader).contains('Short text').should('exist')
  cy.get(procedureHeader).contains('Capture a short text response.').should('exist')
  cy.get(procedureHeader).contains('Long text').should('exist')
  cy.get(procedureHeader).contains('Capture a long text response.').should('exist')
  cy.get(procedureHeader).contains('Number').should('exist')
  cy.get(procedureHeader).contains('Capture a number response.').should('exist')
  cy.get(procedureHeader).contains('Checkbox').should('exist')
  cy.get(procedureHeader).contains('Capture a yes/no response.').should('exist')
  cy.get(procedureHeader).contains('Single select').should('exist')
  cy.get(procedureHeader).contains('Capture a single select response.').should('exist')
})

Cypress.Commands.add('addProcedureName', (proceName) => {
  cy.get(procName).typeAndWaitForFirstCharacter(proceName).should('have.value', proceName)
})

Cypress.Commands.add('addHeaderName', (sectionTitle) => {
  cy.get(headerName).type('{selectAll}+{backspace}' + sectionTitle)
  cy.get('.MuiStack-root label').contains('Title').should('be.visible').click()
})

Cypress.Commands.add('selectNewSection', (sectionTitle) => {
  cy.get(addSection).contains(sectionTitle).should('be.visible').click()
  cy.get(headerName).contains(sectionTitle).click()
})

Cypress.Commands.add('saveProcedure', () => {
  cy.get(saveButton).contains('Save').should('not.be.disabled').click()
})

Cypress.Commands.add('verifyConfigurePage', () => {
  cy.get(tabBtn).contains('Configuration').should('not.be.disabled').click()
  cy.waitUntil(() => cy.get(procedureHeader).contains('Configuration').should('exist'))
  cy.get(label).contains('Assigned locations')
  cy.get(label).contains('Assigned groups')
  cy.get(label).contains('Assigned assets')
  cy.get(dropdown).eq(0).should('not.be.disabled').and('be.visible')
  cy.get(dropdown).eq(1).should('not.be.disabled').and('be.visible')
  cy.get(dropdown).eq(2).should('not.be.disabled').and('be.visible')
  cy.get(tabBtn).contains('Form').should('not.be.disabled').click()
})

Cypress.Commands.add('addNewSection', () => {
  cy.waitUntil(() => cy.get(addnewSection).should('not.be.disabled'))
  cy.get(addnewSection).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('verifyNewSection', () => {
  cy.get(addSection).contains('New section').should('exist')
})

Cypress.Commands.add('verifyAndAddshortTextField', (shortTxt, sectionTitle, shortTxtDesc) => {
  cy.get(addNewField)
    .contains(inputeFields[0])
    .parent('.MuiCard-vertical')
    .find('[data-testid="AddIcon"]')
    .click({ force: true })
  cy.get(sectionName)
    .contains(sectionTitle)
    .parentsUntil('[id="form-section"]')
    .nextUntil('.MuiInput-input')
    .click({ multiple: true })
  cy.get(textInput)
    .should('be.visible')
    .typeAndWaitForFirstCharacter(shortTxt)
    .should('have.value', shortTxt)

  cy.get(textDesc).should('exist').typeAndWaitForFirstCharacter(shortTxtDesc).contains(shortTxtDesc)

  cy.get(enableRequiredBtn).then(($el) => {
    if (!$el.is(':checked')) {
      cy.get(enableRequiredBtn).click()
    }
  })
})

Cypress.Commands.add('verifyAndAddLongTextField', (longText, sectionTitle, longDesc) => {
  cy.get(addNewField)
    .contains(inputeFields[1])
    .parent('.MuiCard-vertical')
    .find('[data-testid="AddIcon"]')
    .click({ force: true })
  cy.get(longTextIp).click()
  cy.get(textInput)
    .should('be.visible')
    .typeAndWaitForFirstCharacter(longText)
    .should('have.value', longText)

  cy.get(textDesc).should('exist').typeAndWaitForFirstCharacter(longDesc).contains(longDesc)

  cy.get(enableRequiredBtn).then(($el) => {
    if (!$el.is(':checked')) {
      cy.get(enableRequiredBtn).click()
    }
  })
})

Cypress.Commands.add('verifyAndAddNumberField', (numbTitle, numbDesc) => {
  cy.get(addNewField)
    .contains(inputeFields[2])
    .parent('.MuiCard-vertical')
    .find('[data-testid="AddIcon"]')
    .click({ force: true })
  cy.get(inputField).eq(1).click({ multiple: true })
  cy.get(textInput)
    .should('be.visible')
    .typeAndWaitForFirstCharacter(numbTitle)
    .should('have.value', numbTitle)

  cy.get(textDesc).should('exist').typeAndWaitForFirstCharacter(numbDesc).contains(numbDesc)

  cy.get(enableRequiredBtn).then(($el) => {
    if (!$el.is(':checked')) {
      cy.get(enableRequiredBtn).click()
    }
  })
})

Cypress.Commands.add('verifyAndAddcheckBoxField', (checkTitle, checkDesc) => {
  cy.get(addNewField)
    .contains(inputeFields[3])
    .parent('.MuiCard-vertical')
    .find('[data-testid="AddIcon"]')
    .click({ force: true })
  cy.get(checkField).should('exist').click()
  cy.get(textInput).should('be.visible').type(checkTitle).should('have.value', checkTitle)

  cy.get(textDesc).eq(1).should('exist').click().type(checkDesc).contains(checkDesc)

  cy.get(enableRequiredBtn).then(($el) => {
    if (!$el.is(':checked')) {
      cy.get(enableRequiredBtn).click()
    }
  })
})

Cypress.Commands.add('verifyAndAddDropdownField', (dropTitle, dropDesc, opt1, opt2) => {
  cy.get(addNewField)
    .contains(inputeFields[4])
    .parent('.MuiCard-vertical')
    .find('[data-testid="AddIcon"]')
    .click({ force: true })
  cy.get(dropField).should('exist').click()
  cy.get(textInput).should('be.visible').type(dropTitle).should('have.value', dropTitle)

  cy.get(textDesc).eq(1).should('exist').type(dropDesc).contains(dropDesc)

  cy.get(addOption).should('exist').click()
  cy.get(addOption).should('exist').click()
  cy.contains('Option 2').next().children('.MuiInput-input').type(opt2)
  cy.contains('Option 1').next().children('.MuiInput-input').type(opt1)
  cy.get(enableRequiredBtn).then(($el) => {
    if (!$el.is(':checked')) {
      cy.get(enableRequiredBtn).click()
    }
  })
})

Cypress.Commands.add('verifyProcedureDialogueBox', () => {
  cy.get(updateBtn).should('not.be.disabled').and('be.visible')
})
Cypress.Commands.add('verifyProcedureUpdateDialogueBox', () => {
  cy.get(updateBtn).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('waitForUpdateButton', () => {
  cy.verifyProcedureUpdateDialogueBox()
})

Cypress.Commands.add('addProcedureToTicket', (titleName, procName) => {
  cy.get(ticketMenuButton).should('be.visible').click({ multiple: true, force: true })
  cy.get(procedureHeader).contains('Tickets')
  cy.get(searchBtn).should('not.be.disabled').and('be.visible').click()
  cy.get(searchField).should('be.visible').clear().typeAndWaitForFirstCharacter(titleName)
  cy.get(selectTicket).contains(titleName).should('exist').click('center')
  cy.get(ticketHelpertext).should('exist').and('contain.value', titleName)
  cy.get(addProc)
    .contains('Procedure')
    .parents('.MuiFormControl-root')
    .children('.MuiButton-root')
    .should('not.be.disabled')
    .click()
  cy.verifyProcedureDialogueBox()
  cy.get(procDropdwn).should('be.visible').click()
  cy.get(procOption).contains(procName).should('exist').click()
  cy.verifyProcedureDialogueBox()
  cy.waitForUpdateButton()
})

Cypress.Commands.add('updateProcedure', (titleName) => {
  cy.get(ticketMenuButton).should('be.visible').click({ multiple: true, force: true })
  cy.get(procedureHeader).contains('Tickets')
  cy.get(searchBtn).should('not.be.disabled').and('be.visible').click()
  cy.get(searchField).should('be.visible').clear().type(titleName)
  cy.verifyTicketHomePage()
  cy.get(selectTicket).contains(titleName).should('exist')
  cy.get(selectTicket).contains(titleName).click('center')
  cy.get(ticketHelpertext).should('exist').and('contain.value', titleName)
  cy.get(addProc)
    .contains('Procedure')
    .parents('.MuiFormControl-root')
    .children('.MuiButton-root')
    .should('not.be.disabled')
    .click()
})

Cypress.Commands.add('verifyProcedure', (textFieldDetails, numFieldDetails) => {
  cy.get(addProc)
    .contains('Procedure')
    .parents('.MuiFormControl-root')
    .children('.MuiButton-root')
    .should('not.be.disabled')
    .click()
  cy.contains(textFieldDetails).should('exist').and('be.visible')
  cy.contains(numFieldDetails).should('exist').and('be.visible')
})

Cypress.Commands.add(
  'verifySecondSection',
  (
    textFieldDetails,
    numFieldDetails,
    longTextFieldDetails,
    checkBoxFieldDetails,
    dropdownDetails,
  ) => {
    cy.contains(textFieldDetails).should('exist').and('be.visible') // issue in this line

    cy.contains(numFieldDetails).should('exist').and('be.visible')
    cy.contains(longTextFieldDetails).should('exist').and('be.visible')
    cy.contains(checkBoxFieldDetails).should('exist')
    cy.contains(dropdownDetails).should('exist')
    cy.get(submitBtn).should('not.be.disabled').and('be.visible').click()
    cy.get(closeBtn).should('not.be.disabled').click()
  },
)

Cypress.Commands.add('selectTheCreatedProcedure', (procTitle) => {
  cy.get(selectProc).contains(procTitle).should('exist').click()
  cy.waitUntil(() => cy.get(editProc).should('not.be.disabled').should('exist').click())
})

Cypress.Commands.add('archiveProcedure', () => {
  cy.get(tabBtn).contains('Configuration').should('not.be.disabled').click()
  cy.waitUntil(() => cy.get(procedureHeader).contains('Configuration').should('exist'))
  cy.get(checkBtn).click({ multiple: true }) //changed multiple:true for check
})

Cypress.Commands.add('deleteSectionButton', () => {
  cy.get(deleteButton).eq(1).should('be.visible').click()
})

Cypress.Commands.add('deletebuttonOnConfirmationPopup', () => {
  cy.get('[type="button"]').contains('Delete').click()
})

Cypress.Commands.add('VerifySectionIsDeletedOrNot', (procName) => {
  cy.contains(procName).should('not.exist')
})
