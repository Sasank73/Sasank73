/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
* This test verifies the following:
    a) End user request flow with contact info,
    b) Fetching the ticket link through the email provided in the contact information,
    c) Submitted request
*/

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'
import testData from '../../fixtures/testData.json'
describe('end user request list', () => {
  let yopEmail, link, issueId, locId, token, Url, portalUrl

  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const contactDetails = dataUtils.generateContactDetails()
  const orgDetails = dataUtils.createMockOrganization()

  before(() => {
    cy.createOrganization(orgDetails.subdomainName, orgDetails.locationName)

    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
      portalUrl = config.portalUrl.replace('${subdomain}', orgDetails.subdomainName)
    })
  })

  before(() => {
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
    })
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
  })

  it('Enduser with contact info with Required option', () => {
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
        cy.spaceCreation(token, space.name, space.description, issueID, true, locationId)
      })
    })
    cy.writeFile('cypress/fixtures/issueDetails.json', issue)
    cy.generateAndSaveRandomEmail()
    cy.clearLocalStorage()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.selectCreatedSpace(space.name)
    cy.selectContactInfoOption('Required')
    cy.logout(env_creds.username)
    cy.visit(portalUrl)
    cy.selectLocationAndSpaceInPortal(location.name, space.name, space.description)
    cy.issueRequestWithComment(issue.name, issue.description, location.name)
    cy.clickOnNextButton()
    cy.verifyContactInfoVisible()
    cy.verifyErrorMessageForEmail(location.name, 'email')
    cy.readFile('cypress/fixtures/randomEmail.json').then((data) => {
      yopEmail = data.email
      cy.inputIntoContactField('email', yopEmail)
    })

    cy.clickOnBody()
    cy.readFile('cypress/fixtures/randomEmail.json').then((data) => {
      yopEmail = data.email
      cy.verifyEmailIsEntered(yopEmail)
    })

    cy.verifyErrorMessageForName(location.name, 'name')
    cy.inputIntoContactField('name', contactDetails[1])
    cy.clickOnBody()
    cy.verifyNameIsEntered(contactDetails[1])
    cy.checkSubscribe()
    cy.saveRequest()
  })

  it('should allow end users to update their ticket status', () => {
    cy.clearLocalStorage()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.changeTicketStatus(issue.name, issue.name, issue.name, 'updated')
  })

  it('fetching data from yopmail', () => {
    cy.readFile('cypress/fixtures/randomEmail.json').then((data) => {
      yopEmail = data.email
      cy.fetchLinkInEmail(yopEmail).then((link) => {
        cy.writeFile('cypress/fixtures/storedLink.json', { emailLink: link })
      })
    })
  })

  it('should allow end users to access their ticket via email', () => {
    cy.readFile('cypress/fixtures/storedLink.json').then((viewLink) => {
      link = viewLink.emailLink
      cy.readFile('cypress/fixtures/issueDetails.json').then((issue) => {
        cy.verifyEndUserRequest(link, issue.name)
      })
    })
  })

  after(() => {
    cy.archiveLocation(token, locId, false)
    cy.archiveIssue(token, issueId, false)
  })
})
