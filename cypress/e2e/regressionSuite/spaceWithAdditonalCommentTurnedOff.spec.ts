/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test verifies that how the user submits the request in the portal when additional comment is turned off .
 */

import env_creds from '../../utilities/environment'
import * as dataUtils from '../../utilities/dataUtils'

describe('Space With Additional Comment Turned Off ', () => {
  let testData, locationDetails, spaceDetails, issueDetails, locId
  let issueId, token, user, Url, portalUrl

  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const orgDetails = dataUtils.createMockOrganization()
  const userNames = ['staff', 'viewer', 'vendor']
  const userRoles = ['STAFF', 'VIEWER', 'VENDOR']
  const userEmail = ['test_staff@yopmail.com', 'test_viewer@yopmail.com', 'test_vendor@yopmail.com']
  user = dataUtils.createMockUser()

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

  beforeEach(() => {
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  it('unchecking the allow comment box in space', () => {
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
        cy.spaceCreation(token, space.name, space.description, issueID, false, locationId)
      })
    })

    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.uncheckCommentBox(
      location.name,
      testData.buttonNames.spaceButton,
      space.name,
      testData.buttonNames.saveButton,
    )
  })

  it('creating user login data', () => {
    userNames.forEach((name, index) => {
      const role = userRoles[index]
      const email = userEmail[index]
      cy.createUser(token, name, email, user.phoneNumber, role, locId)
    })
  })

  it('should verify the absence of the comment field in portal form', () => {
    env_creds.login_creds.forEach((data) => {
      cy.clearLocalStorage()
      const role = Object.keys(data)[0]
      const credentials = data[role]
      cy.login(testData.verifications.loginTxt, Url, credentials.username, credentials.password)
      if (role === 'admin' || role === 'staff' || role === 'viewer') {
        cy.verifyLoginIsSuccessful(credentials.username)
        cy.verifyloggedInUserRole(role)
        cy.portalLogin(portalUrl)
        cy.spaceRequestSubmission(location.name, space.name, issue.name)
        cy.logoutFromPortal()
      } else if (role === 'vendor') {
        cy.verifyVendorLoginIsSuccessful(testData.verifications.portalText)
        cy.spaceRequestSubmission(location.name, space.name, issue.name)
        cy.logoutFromPortal()
      }
    })
    cy.verifyEndUserRedirectedToPortal(portalUrl, testData.verifications.portalText)
    cy.spaceRequestSubmission(location.name, space.name, issue.name)
    cy.verifyEndusePortalPage()
  })

  after(() => {
    cy.archiveLocation(token, locId, false)
    cy.archiveIssue(token, issueId, false)
  })
})
