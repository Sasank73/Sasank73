import assert from 'assert'
let title, desc, outputText, outputdesc, textVal, multiTextextVal
//locators
const ticketTitle = '#title'
const ticketDesc = '#description'
const assigneedGroup = '#ticket-assignee-group-field' //eq0
const dropdwnList = '[role="option"]'
const assignee = '#ticket-assignee-user-field' //eq1
const priority = '#priority'
const asset = '#assets'
const vendor = '#vendors'
const customer = '#customers'
const cancelBtn = '[role="dialog"] .MuiButton-variantPlain'
const checkboxInSchedule = '.MuiPopover-paper [type="checkbox"]'
const schedulePopup = '.MuiPopover-paper'
const submitBtn = '[type="submit"]'
const addProc = '.MuiFormControl-root'
const procDropdwn = '[class="MuiAutocomplete-input css-zbfygt"]'
const procName = 'input[placeholder="Procedure title"]'
const addProcBtn = '.MuiSheet-root .MuiButton-root'
const updateBtn = '[form="procedure-form"]'
const closeBtn = '[data-testid="CancelIcon"]'
const wathcer = '#watchers'
const verifyWatcher = '.MuiAutocomplete-wrapper .MuiChip-labelMd'
const assigneedPeople = '[aria-expanded="false"] .MuiTypography-root'
const searchButton = '[data-testid="Search-iconButton"]'
const searchField = '[data-test-id="Search"]'
const selectTicket = 'td.MuiTableCell-root'
const closeButton = '[data-testid="ClearIcon"]~'
const allBtn = '[aria-label="All"]'
const customFields = '.MuiFormControl-vertical label'
const parentField = '.MuiFormControl-root'
const fieldInput = '.MuiInput-root'
const helperText = '.MuiFormHelperText-root'
const multiText = '.MuiTextarea-textarea'
const textArea = '.MuiTextarea-root'
const multiHelpText = '.MuiFormHelperText-root'
const viewerName = '#name'
const viewerEmail = '#email'
const locationDropdown = '#locations'
const password = '#password'
const profileBtn = '[aria-label="your profile"]'
const deleteIcon = '[aria-label="Clear"]'
const selectOption = '[aria-disabled="false"]'
const roleTab = '[role="tab"]'
const commentLabel = '#comment-text-field-label'
const commentField = '#comment-text-field'
const internalMessage = '.MuiButton-sizeMd'
const verifyMessage = '.MuiTypography-root'
const messsageDropdown = '[role="group"] .MuiButton-sizeSm'
const roleItem = '[role="menuitem"]'
const usersButton = '[data-testid="PersonIcon"]'
const addUserButton = '[aria-label="Add user"]'
const name = '#name'
const email = '#email'
const role = '[labelid="role-label"]'
const location = '#locations'
const alertMessage = '[role="alert"] .MuiTypography-body-md'
const peopleButton = '[data-testid="PeopleRoundedIcon"]'
const field = '[role="dialog"] [id="procedure-form"] [helpertext="[object Object]"] input'
const pdfDownloadButton = '[aria-label="Click to print a PDF version of this ticket."] a button '
//commands

Cypress.Commands.add('fillticketDeatils', (priorityState, assetName, vendorName) => {
  cy.get(priority).should('exist').click()
  cy.get(dropdwnList).contains(priorityState).click()
  cy.get(priority)
    .invoke('text')
    .then((data) => {
      assert.equal(data.trim(), priorityState)
    })

  cy.get(asset).should('exist').click()
  cy.get(dropdwnList).contains(assetName).click()
  cy.clickOnTcketBody()
})

Cypress.Commands.add('fillCutomerDetails', (customerName) => {
  cy.get(customer).should('exist').click()
  cy.get(dropdwnList).contains(customerName).click()
})

Cypress.Commands.add('verifyVendorDetails', (email) => {
  cy.contains('Send ticket to vendor').click()
  cy.contains('Select contacts to send to').should('exist')
  cy.contains(email).should('exist')
  cy.get(cancelBtn).should('exist').and('not.be.disabled').click()
})

Cypress.Commands.add('clickOnScheduleToggleButton', () => {
  cy.get(checkboxInSchedule).should('exist').click()
})

Cypress.Commands.add('verifyEditTicketCreationPage', () => {
  cy.contains('Title').should('exist')
  cy.contains('Description').should('exist')
  cy.contains('Location').should('exist')
  cy.contains('Space').should('exist')
  cy.contains('Issue').should('exist')
  cy.contains('Priority (optional)').should('exist')
})

Cypress.Commands.add('addProcedureInTicket', (procName) => {
  cy.verifyEditTicketCreationPage()
  cy.get(addProc)
    .contains('Procedure')
    .parents('.MuiFormControl-root')
    .children('.MuiButton-root')
    .should('not.be.disabled')
    .click()
  cy.verifyProcedureDialogueBox()
  cy.waitUntil(() => cy.get(procDropdwn).should('be.visible'))
  cy.get(procDropdwn).should('be.visible').click()
  cy.waitUntil(() => cy.get(dropdwnList).should('exist'))
  cy.get(dropdwnList).contains(procName).should('exist').click()
  cy.verifyProcedureDialogueBox()
  cy.get(field).should('be.visible')
  cy.verifyProcedureDialogueBox()
  cy.waitForUpdateButton()
})

Cypress.Commands.add('selectTestWatcher', (option, title) => {
  cy.get(closeBtn).eq(1).should('exist').click()
  cy.get(wathcer).should('exist').click().type(option)
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.waitUntil(() => cy.get(dropdwnList).contains(option))
  cy.get(dropdwnList).contains(option).click()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.contains('ID').should('exist').click({ force: true })
  cy.get(allBtn).should('exist').click()
  cy.selectCreatedTicket(title)
})

Cypress.Commands.add('verifyAssignedGroupUser', (groupName, userName) => {
  cy.get(assigneedPeople)
    .eq(0)
    .invoke('text')
    .then((text) => {
      if (text === groupName) {
        assert.equal(text, groupName)
      } else if (text === 'None') {
        assert.equal(text, 'None')
      }
    })
  cy.get(assignee).should('exist').click()
  cy.get(dropdwnList).should('exist').contains(userName).click()
  cy.get(assigneedPeople)
    .eq(1)
    .invoke('text')
    .then((text) => {
      assert.equal(text, userName)
    })
})

Cypress.Commands.add('selectCreatedTicket', (titleName) => {
  cy.verifyPoPage('Tickets')
  cy.verifyPoPage('Tickets')
  cy.get(searchButton).should('not.be.disabled').and('exist')
  cy.contains(titleName).should('be.visible').and('exist').click()
})

Cypress.Commands.add('clickOnCreatedTicket', (titleName) => {
  cy.waitUntil(() => cy.get(selectTicket).should('exist'))
  cy.get(selectTicket).contains(titleName).as('ticketName')
  cy.get('@ticketName').should('exist').click()
})

Cypress.Commands.add('clickOnTcketBody', () => {
  cy.contains('Assets (optional)').should('exist').click({ force: true })
})

Cypress.Commands.add('verifyCustomFields', (fieldTitle, helpText, defaultValue, updatedValue) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .children(fieldInput)
    .children('input')
    .click()
    .invoke('attr', 'value')
    .then((value) => {
      if (typeof defaultValue === 'number' && typeof updatedValue === 'number') {
        textVal = parseInt(value!, 10) + updatedValue
        cy.wrap(parseInt(value!, 10)).should('eq', defaultValue)
      } else {
        textVal = value + updatedValue
        cy.wrap(value).should('include', defaultValue)
      }
      cy.verifyHelperText(fieldTitle, helpText)
    })
})

Cypress.Commands.add('verifyHelperText', (fieldTitle, helpText) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .children(fieldInput)
    .siblings(helperText)
    .contains(helpText)
})

Cypress.Commands.add('updateCustomFields', (fieldTitle, spaceName, titleName) => {
  cy.get(customFields).contains(fieldTitle).parent(parentField).children(fieldInput).as('update')
  cy.verifyTicketsPage()
  cy.get('@update')
    .click()
    .type('{selectAll}' + textVal)
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()

  cy.contains(spaceName).click({ force: true })
  cy.waitUntil(() => cy.get(selectTicket).should('exist'))
  cy.get(selectTicket).contains(titleName).should('exist').click()

  cy.get('@update')
    .click()
    .invoke('attr', 'value')
    .then((value) => {
      if (value !== textVal) {
        cy.get(customFields)
          .contains(fieldTitle)
          .parent(parentField)
          .children(fieldInput)
          .click()
          .type('{selectAll}' + textVal)
      } else {
        cy.wrap(value).should('include', textVal)
      }
    })
  cy.contains(spaceName).click({ force: true })
})

Cypress.Commands.add('verifyTicketsPage', () => {
  cy.contains('Title').should('exist')
  cy.contains('Description').should('exist')
  cy.contains('Location').should('exist')
  cy.contains('Space').should('exist')
  cy.contains('Issue').should('exist')
  cy.contains('Priority (optional)').should('exist')
})

Cypress.Commands.add(
  'verifyMultiCustomField',
  (fieldTitle, helpText, defaultValue, updatedValue) => {
    cy.get(customFields)
      .contains(fieldTitle)
      .parents(parentField)
      .children(textArea)
      .children(multiText)
      .eq(0)
      .click()
      .invoke('text')
      .then((value) => {
        multiTextextVal = value + updatedValue
        cy.wrap(value).should('include', defaultValue)
        cy.verifyMultiHelperText(fieldTitle, helpText)
      })
  },
)

Cypress.Commands.add('verifyMultiHelperText', (fieldTitle, helpText) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .children(textArea)
    .siblings(multiHelpText)
    .contains(helpText)
})

Cypress.Commands.add('updateMultiCustomFields', (fieldTitle, spaceName, titleName) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parent(parentField)
    .children(textArea)
    .children(multiText)
    .eq(0)
    .click()
    .type('{selectAll}' + multiTextextVal)

  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()

  cy.contains(spaceName).click({ force: true })
  cy.waitUntil(() => cy.get(selectTicket).should('exist'))
  cy.get(selectTicket).contains(titleName).should('exist').click()

  cy.get(customFields)
    .contains(fieldTitle)
    .parent(parentField)
    .children(textArea)
    .children(multiText)
    .eq(0)
    .click()
    .invoke('text')
    .then((value) => {
      if (value !== textVal) {
        cy.get(customFields)
          .contains(fieldTitle)
          .parent(parentField)
          .children(textArea)
          .children(multiText)
          .eq(0)
          .click()
          .type('{selectAll}' + multiTextextVal)
      } else {
        cy.wrap(value).should('include', multiTextextVal)
      }
    })
})

Cypress.Commands.add('verifyCheckboxCustomField', (fieldTitle, helpText) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .children('.MuiCheckbox-root')
    .children('.MuiCheckbox-checkbox')
    .click()
  cy.verifyCheckboxHelperText(fieldTitle, helpText)
})

Cypress.Commands.add('verifyCheckboxHelperText', (fieldTitle, helpText) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .children('.MuiCheckbox-root')
    .siblings()
    .contains(helpText)
})

Cypress.Commands.add('updateCheckboxCustomField', (fieldTitle) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .children('.MuiCheckbox-root')
    .children('.MuiCheckbox-checkbox')
    .click()
})

Cypress.Commands.add('verifyDropdownCustomField', (fieldTitle, option, helpText) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .children('.MuiSelect-root')
    .children('.MuiSelect-button')
    .click()
  cy.verifyTicketsPage()
  cy.get(dropdwnList).contains(option).as('option')
  cy.get('@option').click()
  cy.verifyTicketsPage()
  cy.verifyDropdownHelperText(fieldTitle, helpText)
})

Cypress.Commands.add('verifyDropdownHelperText', (fieldTitle, helpText) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .children('.MuiSelect-root')
    .siblings()
    .contains(helpText)
})

Cypress.Commands.add('updateDropdownCustomField', (fieldTitle, option) => {
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .children('.MuiSelect-root')
    .children('.MuiSelect-button')
    .click()
  cy.get(dropdwnList).contains(option).as('option')
  cy.get('@option').click()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.verifyTicketsPage()
  cy.get(customFields)
    .contains(fieldTitle)
    .parents(parentField)
    .find('.MuiSelect-root .MuiSelect-button')
    .should('have.text', option)
})

Cypress.Commands.add(
  'verifyAndValidateViewerUserScreenDetails',
  (viewerUserName, viewerUserMail, passcode) => {
    cy.get(viewerName).should('have.value', viewerUserName)
    cy.get(viewerName)
      .type('{selectAll}' + `updated${viewerUserName}`)
      .should('have.value', `updated${viewerUserName}`)
    cy.get(viewerEmail).should('have.value', viewerUserMail)
    cy.get(viewerEmail)
      .type('{selectAll}' + `updated${viewerUserMail}`)
      .should('have.value', `updated${viewerUserMail}`)
    cy.get(password).clear().type(passcode).should('have.value', passcode)
    cy.get(submitBtn).should('be.visible').click()
  },
)

Cypress.Commands.add('verifyUpdatedDetials', (viewerUserName, viewerUserMail) => {
  cy.get(viewerName).should('have.value', `updated${viewerUserName}`)
  cy.get(viewerEmail)
    .invoke('attr', 'value')
    .then((val) => {
      cy.wrap(val).as('updatedViewerMail')
      assert.equal(val, `updated${viewerUserMail}`)
    })
})

Cypress.Commands.add('clickOnProfileBtn', () => {
  cy.get(profileBtn).should('be.visible').click()
})

Cypress.Commands.add('verifyViewerUserPerimissions', () => {
  cy.get(locationDropdown).trigger('mouseover')
  cy.get(deleteIcon).should('exist').click({ force: true })
  cy.get(locationDropdown).should('be.empty')
  cy.get(locationDropdown).trigger('mouseover')
  cy.get(deleteIcon).should('exist').click({ force: true })
  cy.get(submitBtn)
    .should('be.visible')
    .click()
    .then(() => {
      cy.contains('Please select at least one location for this user.')
    })
})

Cypress.Commands.add('selectLocationInViewerScreen', (locationName) => {
  cy.get(locationDropdown).should('exist').click()
  cy.get(selectOption).contains(locationName).click()
  cy.get(submitBtn).should('be.visible').click()
  cy.goToTicketMenu()
})

Cypress.Commands.add('verifyTicketPresence', (titleName) => {
  cy.get(searchButton).should('not.be.disabled').click()
  cy.get(searchField).should('exist').clear().click().type(titleName)
  cy.get(selectTicket).should('not.contain.text', titleName)
})

Cypress.Commands.add('updateComments', () => {
  cy.get(roleTab).contains('Comments').click()
  cy.get(commentLabel).contains('Enter a message...')
  cy.get(commentField).type('interanl message comment from cypress automation')
  cy.get(internalMessage).contains('Internal message').click()
  cy.get(verifyMessage).contains('interanl message comment from cypress automation')
  cy.get(messsageDropdown).should('exist').click()
  cy.get(roleItem).contains('Public message').click()
  cy.get(commentField).type('public message comment from cypress automation')
  cy.get(internalMessage).contains('Public message').click()
  cy.get(verifyMessage).contains('public message comment from cypress automation')
})

Cypress.Commands.add('clickOnUsers', () => {
  cy.waitUntil(() => cy.get(usersButton).should('exist'))
  cy.get(usersButton).should('exist').click()
  cy.get(addUserButton).should('be.visible')
})

Cypress.Commands.add('clickOnAddUser', () => {
  cy.get(addUserButton).should('be.visible').and('not.be.disabled').click()
})

Cypress.Commands.add('verifyUserCreatePage', () => {
  cy.get(submitBtn).should('be.visible').and('not.be.disabled')
  cy.get(email).should('exist')
  cy.get(name).should('exist')
  cy.get(password).should('exist')
  cy.get(role).should('exist')
})

Cypress.Commands.add(
  'verifyStaffAccessInUserCreation',
  (mail, userName, passcode, roleOption, locationName, message) => {
    cy.get(email).should('exist').type(mail)
    cy.get(name).should('exist').type(userName)
    cy.get(password).should('exist').type(passcode)
    cy.get(role).should('exist').click()
    cy.get(dropdwnList).contains(roleOption).click()
    cy.get(location).should('exist').click()
    cy.get(dropdwnList).contains(locationName).click()
    cy.get(submitBtn).should('be.visible').and('not.be.disabled').click()
    cy.get(alertMessage)
      .invoke('text')
      .then((val) => {
        assert.equal(val, message)
      })
  },
)

Cypress.Commands.add('clickOnPeople', () => {
  cy.get(peopleButton).should('exist').click()
})

Cypress.Commands.add('clickOnPDFPreviewButton', () => {
  cy.get(pdfDownloadButton).should('exist').click()
})
