/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * The different options for contact information are validated by this test.
 * Verifies how end user contact information submitted through the Portal.
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('Contact Info With Various Fields', () => {
  let testData, issueId, locId, token, Url, portalUrl
  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const orgDetails = dataUtils.createMockOrganization()

  before(() => {
    cy.createOrganization(orgDetails.subdomainName, orgDetails.locationName)

    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
      portalUrl = config.portalUrl.replace('${subdomain}', orgDetails.subdomainName)
    })

    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
    })

    cy.fixture('testData.json').then((data) => {
      testData = data
    })
  })

  before(() => {
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
        cy.spaceCreation(token, space.name, space.description, issueID, true, locationId)
      })
    })
  })

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.selectCreatedSpace(space.name)
  })

  it('contact info with Required option', () => {
    cy.selectContactInfoOption('Required')
    cy.logout(env_creds.username)
    cy.visit(portalUrl)
    cy.selectLocationAndSpaceInPortal(location.name, space.name, space.description)
    cy.issueRequestWithComment(issue.name, issue.description, location.name)
    cy.clickOnNextButton()
    cy.verifyContactInfoVisible()
    cy.verifyErrorMessageForEmail(location.name, 'email')
    cy.inputIntoContactField('email', 'sureshQA@yopmail.com')
    cy.verifyErrorMessageForName(location.name, 'name')
    cy.inputIntoContactField('name', 'SureshQA')
    cy.checkSubscribe()
    cy.clickSubmitButton()
    cy.verifyIsRequestSubmitted()
  })

  it('contact info with the Optional option without entering any dat', () => {
    cy.selectContactInfoOption('Optional')
    cy.logout(env_creds.username)
    cy.visit(portalUrl)
    cy.selectLocationAndSpaceInPortal(location.name, space.name, space.description)
    cy.issueRequestWithComment(issue.name, issue.description, location.name)
    cy.clickOnNextButton()
    cy.verifyContactInfoVisible()
    cy.clickSubmitButton()
    cy.verifyIsRequestSubmitted()
  })

  it('confirm contact info with the Optional option by providing an email', () => {
    cy.selectContactInfoOption('Optional')
    cy.logout(env_creds.username)
    cy.visit(portalUrl)
    cy.selectLocationAndSpaceInPortal(location.name, space.name, space.description)
    cy.issueRequestWithComment(issue.name, issue.description, location.name)
    cy.clickOnNextButton()
    cy.verifyContactInfoVisible()
    cy.inputIntoContactField('email', 'sureshQA@yopmail.com')
    cy.clickSubmitButton()
    cy.verifyIsRequestSubmitted()
  })

  it('contact info with the Optional option by providing a name', () => {
    cy.selectContactInfoOption('Optional')
    cy.logout(env_creds.username)
    cy.visit(portalUrl)
    cy.selectLocationAndSpaceInPortal(location.name, space.name, space.description)
    cy.issueRequestWithComment(issue.name, issue.description, location.name)
    cy.clickOnNextButton()
    cy.verifyContactInfoVisible()
    cy.inputIntoContactField('name', 'SureshQA')
    cy.clickSubmitButton()
    cy.verifyIsRequestSubmitted()
  })

  it('contact info with the Optional option is complete by providing all required data', () => {
    cy.selectContactInfoOption('Optional')
    cy.logout(env_creds.username)
    cy.visit(portalUrl)
    cy.selectLocationAndSpaceInPortal(location.name, space.name, space.description)
    cy.issueRequestWithComment(issue.name, issue.description, location.name)
    cy.clickOnNextButton()
    cy.verifyContactInfoVisible()
    cy.inputIntoContactField('email', 'sureshQA@yopmail.com')
    cy.inputIntoContactField('name', 'SureshQA')
    cy.checkSubscribe()
    cy.clickSubmitButton()
    cy.verifyIsRequestSubmitted()
  })

  it('contact info with the None option selected', () => {
    cy.selectContactInfoOption('None')
    cy.logout(env_creds.username)
    cy.visit(portalUrl)
    cy.selectLocationAndSpaceInPortal(location.name, space.name, space.description)
    cy.issueRequestWithComment(issue.name, issue.description, location.name)
    cy.verifyContactInfoNotVisible()
    cy.clickSubmitButton()
    cy.verifyIsRequestSubmitted()
    cy.archiveLocation(token, locId, false)
    cy.archiveIssue(token, issueId, false)
  })
})
