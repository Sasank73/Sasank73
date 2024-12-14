/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test validates the automatic progression of locations, spaces, and issues in cases where only one element is present.
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('auto progress for locations, spaces and issues', () => {
  let testData, locId, issueId, token, Url, portalUrl
  const location = dataUtils.createMockLocation()
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

    cy.fixture('testData.json').then((data) => {
      testData = data
    })
    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
    })
  })

  it('auto progress', () => {
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }

    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
      })
    })
    cy.portalLogin(portalUrl)
    cy.selectLocationInPortal(location.name)
    cy.verifyAddCommentPage(location.name)
  })
})
