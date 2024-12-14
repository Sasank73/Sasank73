/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test verifies & validates the creation & updating of custom fields in ticket screen
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('create & edit ticket fields', () => {
  let testData, locId, issueId, spacId, token, Url

  const ticket = dataUtils.mockTicketDetails()
  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const textField = dataUtils.createMockCustomTextFieldData()
  const longTextField = dataUtils.createMockCustomMultiTextFieldData()
  const numberField = dataUtils.createMockCustomNumberFieldData()
  const checkboxField = dataUtils.createMockCustomCheckboxFieldData()
  const dropdownnField = dataUtils.createMockCustomDropdownFieldData()
  function convertToValidFormat(input) {
    return input.replace(/_/g, '').toLowerCase().replace(/\s/g, '-')
  }
  const firstOpId = convertToValidFormat(dropdownnField.firstOp)
  const secondOpId = convertToValidFormat(dropdownnField.secondOp)
  const orgDetails = dataUtils.createMockOrganization()

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data
    })
    cy.createOrganization(orgDetails.subdomainName, orgDetails.locationName)

    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
    })
    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
    })
  })

  beforeEach(() => {
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToTicketMenu()
    cy.verifyPoPage('Tickets')
  })

  it('creating a new ticket through admin user', () => {
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
        cy.spaceCreation(token, space.name, space.description, issueID, true, locationId).then(
          (spaceId) => {
            spacId = spaceId
          },
        )
      })
    })
    cy.reload()
    cy.clcikOnCreateTicketBtn()
    cy.verifyTicketsPage()
    cy.enterTicketdetails(ticket.title, ticket.description, location.name, space.name, issue.name)
    cy.clickOnCreateTicketButton()
    cy.verifySuccessAlert('created')
  })

  it('creating and verifying custom text field in ticket', () => {
    cy.createCustomTextField(
      token,
      textField.title,
      textField.displayText,
      textField.helperText,
      textField.defaultText,
    )
    cy.reload()
    cy.selectCreatedTicket(ticket.title)
    cy.verifyTicketsPage()
    cy.verifyCustomFields(
      textField.displayText,
      textField.helperText,
      textField.defaultText,
      '_updated',
    )
    cy.updateCustomFields(textField.displayText, space.name, ticket.title)
  })

  it('creating and verifying  custom multi-line text field in ticket', () => {
    cy.createCustomMultiTextField(
      token,
      longTextField.title,
      longTextField.displayText,
      longTextField.helperText,
      longTextField.defaultLongText,
    )
    cy.reload()
    cy.selectCreatedTicket(ticket.title)
    cy.verifyTicketsPage()
    cy.verifyMultiCustomField(
      longTextField.displayText,
      longTextField.helperText,
      longTextField.defaultLongText,
      '_updated',
    )
    cy.updateMultiCustomFields(longTextField.displayText, space.name, ticket.title)
  })

  it('creating and verifying custom number field in ticket', () => {
    cy.createCustomNumberField(
      token,
      numberField.title,
      numberField.displayText,
      numberField.helperText,
      numberField.defaultNumber,
    )
    cy.reload()
    cy.selectCreatedTicket(ticket.title)
    cy.verifyTicketsPage()
    cy.verifyCustomFields(
      numberField.displayText,
      numberField.helperText,
      numberField.defaultNumber,
      1,
    )
    cy.updateCustomFields(numberField.displayText, space.name, ticket.title)
  })

  it('creating and verifying custom checkbox field in ticket', () => {
    cy.createCustomCheckboxField(
      token,
      checkboxField.title,
      checkboxField.displayText,
      checkboxField.helperText,
      true,
    )
    cy.reload()
    cy.selectCreatedTicket(ticket.title)
    cy.verifyTicketsPage()
    cy.verifyCheckboxCustomField(checkboxField.displayText, checkboxField.helperText, ticket.title)
    cy.updateCheckboxCustomField(checkboxField.displayText)
  })

  it('creating and verifying custom dropdown field in ticket', () => {
    cy.createCustomDropdownField(
      token,
      dropdownnField.title,
      dropdownnField.displayText,
      dropdownnField.helperText,
      dropdownnField.firstOp,
      firstOpId,
      dropdownnField.secondOp,
      secondOpId,
    )
    cy.reload()
    cy.selectCreatedTicket(ticket.title)
    cy.verifyTicketsPage()
    cy.verifyDropdownCustomField(
      dropdownnField.displayText,
      dropdownnField.secondOp,
      dropdownnField.helperText,
    )
    cy.updateDropdownCustomField(dropdownnField.displayText, dropdownnField.firstOp)
  })

  after(() => {
    cy.archiveLocation(token, locId, false)
    cy.archiveIssue(token, issueId, false)
  })
})
