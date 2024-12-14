/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test verifies & validates the time and cost tracking in ticket screen which covers 
    a) Parts 
    b) Time log entries
    c) Other costs
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'
import testData from '../../fixtures/testData.json'

describe('Add parts, timelogs and others in edit ticket', () => {
  let token, Url, ticket

  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const orgDetails = dataUtils.createMockOrganization()
  const part = dataUtils.createPart()
  const notestext = dataUtils.generateNotes()
  before(() => {
    cy.createOrganization(orgDetails.subdomainName, orgDetails.locationName)

    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
    })
    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
      cy.createAPart(
        authToken,
        part.name,
        part.description,
        part.unitPrice,
        part.inStock,
        part.minStock,
      )
      cy.issueCreation(authToken, issue.name, issue.description).then((issueID) => {
        cy.locationCreation(authToken, location.name, locLat, locLong).then((locationId) => {
          cy.spaceCreation(authToken, space.name, space.description, issueID, true, locationId)
        })
      })
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
    ticket = dataUtils.mockTicketDetails()
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToTicketMenu()
    cy.verifyPoPage('Tickets')
    cy.clcikOnCreateTicketBtn()
    cy.verifyTicketsPage()
    cy.enterTicketdetails(ticket.title, ticket.description, location.name, space.name, issue.name)
    cy.clickOnCreateTicketButton()
    cy.verifySuccessAlert('created')
    cy.verifyTmeCostButton()
    cy.clickOnTmeCostButton()
    cy.verifyTimeTrackinPopUp()
  })

  it('include a part in the edit ticket screen', () => {
    cy.clickOnButtonInPopUp(testData.buttonInTimeTrack.addPart)
    cy.verifyAddPartPopUp()
    cy.clickOnSubmitButtonInPopUp()
    cy.verifyWarningMessages(testData.warningMessaages.selectPart)
    cy.verifyWarningMessages(testData.warningMessaages.enterQuantity)
    cy.enterPartsDetails(part.name, part.description, part.minStock, notestext.notes)
    cy.clickOnSubmitButtonInPopUp()
    cy.verifySuccessAlert('Added part.')
    cy.verifyTimeTrackinPopUp()
    cy.verifyAddedPartsDetails(part.name, part.minStock, part.unitPrice)
    cy.clickOnForwardButton()
    cy.verifyPartsNotes(notestext.notes)
  })

  it('include a time log in the edit ticket screen', () => {
    cy.clickOnButtonInPopUp(testData.buttonInTimeTrack.logTime)
    cy.verifyTimeLogPopUp()
    cy.clickOnSubmitButtonInPopUp()
    cy.verifyWarningMessages(testData.warningMessaages.validTime)
    cy.enterTimeLog(part.minStock, notestext.notes)
    cy.clickOnSubmitButtonInPopUp()
    cy.verifySuccessAlert('Created new entry.')
    cy.verifyTimeTrackinPopUp()
    cy.clickOnForwardButton()
    cy.verifyTimeLogNotes(notestext.notes)
  })

  it('include a other component in the edit ticket screen', () => {
    cy.clickOnButtonInPopUp(testData.buttonInTimeTrack.addOther)
    cy.verifyAddOtherPopUp()
    cy.enterOtherCostEntry(part.minStock, notestext.notes)
    cy.clickOnSubmitButtonInPopUp()
    cy.verifySuccessAlert('Created new entry.')
    cy.clickOnForwardButton()
    cy.verifyOtherCostEntryNotes(notestext.notes)
  })
})
