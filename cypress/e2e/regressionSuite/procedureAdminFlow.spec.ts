/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 *This test verifies Procedure admin flow
  a) Creating & updating Procedure 
  b) Adding Procedure to ticket
 */

import { faker } from '@faker-js/faker'
import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('It verifies single and multiple sections for procedure template', () => {
  let testData, procName, sectionTitle, locId, issueId, token, Url

  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const ticket = dataUtils.createMockTicketData()
  const shortText = dataUtils.createMockShortTextField()
  const longText = dataUtils.createMockLongTextField()
  const number = dataUtils.createMockNumbersField()
  const checkbox = dataUtils.createMockCheckboxField()
  const dropdown = dataUtils.createMockDropdownField()
  const dropDownOptions = dataUtils.createMockDropdownOptions()
  const orgDetails = dataUtils.createMockOrganization()

  before(() => {
    cy.createOrganization(orgDetails.subdomainName, orgDetails.locationName)

    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
    })

    cy.fixture('testData.json').then((data) => {
      testData = data
    })
    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
    })
  })

  before(() => {
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }

    cy.clearLocalStorage()
    cy.clearCookies()
    procName =
      faker.word.noun() +
      ' procedure' +
      faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
        cy.spaceCreation(token, space.name, space.description, issueID, true, locationId)
      })
    })
    cy.goToTicketMenu()
    cy.verifyTicketHomePage()
    cy.createTicket(
      ticket.ticketTitle,
      ticket.ticketDescription,
      location.name,
      space.name,
      issue.name,
    )
  })

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    sectionTitle = faker.word.noun() + '_section'
    cy.goToProcedure()
    cy.verifyProcedureHomePage()
  })

  it('create and attach a procedure template with single section in ticket', () => {
    cy.clickOnProcedureBtn()
    cy.verifyCreateProcedurePage(testData.procedureVerifications.createProcPage)
    cy.addProcedureName(procName)
    cy.verifyNewSection()
    cy.addHeaderName(sectionTitle)
    cy.verifyAndAddshortTextField(shortText.fieldTitle, sectionTitle, shortText.fieldDescription)
    cy.verifyAndAddNumberField(number.fieldTitle, number.fieldDescription)
    cy.verifyConfigurePage()
    cy.saveProcedure()
    cy.verifyProcedureHomePage()
    cy.addProcedureToTicket(ticket.ticketTitle, procName)
    cy.verifyProcedure(shortText.fieldTitle, number.fieldTitle)
  })

  it('create and attach a proecdure template with two sections in ticket', () => {
    cy.selectTheCreatedProcedure(procName)
    cy.addNewSection()
    cy.verifyCreateProcedurePage(`edit ${procName}`)
    cy.addNewSection()
    cy.addHeaderName(sectionTitle)
    cy.verifyCreateProcedurePage(`edit ${procName}`)
    cy.verifyConfigurePage()
    cy.verifyCreateProcedurePage(`edit ${procName}`)
    cy.selectNewSection(sectionTitle)
    cy.saveProcedure()
    cy.selectTheCreatedProcedure(procName)
    cy.verifyCreateProcedurePage(`edit ${procName}`)
    cy.selectNewSection(sectionTitle)
    cy.verifyAndAddLongTextField(longText.fieldTitle, sectionTitle, longText.fieldDescription)
    cy.verifyAndAddcheckBoxField(checkbox.fieldTitle, checkbox.fieldDescription)
    cy.verifyAndAddDropdownField(
      dropdown.fieldTitle,
      dropdown.fieldDescription,
      dropDownOptions.opt1,
      dropDownOptions.opt2,
    )
    cy.saveProcedure()
    cy.verifyProcedureHomePage()
    cy.updateProcedure(ticket.ticketTitle)
    cy.verifySecondSection(
      shortText.fieldTitle,
      number.fieldTitle,
      longText.fieldTitle,
      checkbox.fieldTitle,
      dropdown.fieldTitle,
    )
    cy.goToProcedure()
    cy.verifyProcedureHomePage()
    cy.selectTheCreatedProcedure(procName)
    cy.verifyCreateProcedurePage(`edit ${procName}`)
    cy.archiveProcedure()
    cy.saveProcedure()
    cy.archiveLocation(token, locId, false)
    cy.archiveIssue(token, issueId, false)
  })
})
