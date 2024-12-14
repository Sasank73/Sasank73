/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test verifies that that how the user submits the request in the portal when additional comment is required.
 */

import env_creds from '../../utilities/environment'
import * as dataUtils from '../../utilities/dataUtils'

describe('Issue With Additional Comment Required ', () => {
  let testData, locId, issueId, issue, spacId, secondIssueId, token, Url, portalUrl, user
  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issueOne = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const issueTwo = dataUtils.createMockIssue()
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

    cy.clearAllCookies()
    cy.clearLocalStorage()
  })

  it('should allow admin users to create and verify an issue', () => {
    cy.issueCreation(token, issueOne.name, issueOne.description).then((issueID) => {
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

    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.issueCreation(token, issueTwo.name, issueTwo.description).then((issueID) => {
      secondIssueId = issueID
      cy.updateSpaceWithIssue(token, spacId, locId, true, issueId, secondIssueId, true)
    })
    cy.clickOnIssueCategories()
    cy.verifyCreatedIssue(testData.verifications.vrfyIssuePage, issueOne.name)
  })

  it('create user data', () => {
    userNames.forEach((name, index) => {
      const role = userRoles[index]
      const email = userEmail[index]
      cy.createUser(token, name, email, user.phoneNumber, role, locId)
    })
  })

  it('Verifying the existence of a comment field in the portal form', () => {
    env_creds.login_creds.forEach((data) => {
      cy.clearLocalStorage()
      const role = Object.keys(data)[0]
      const credentials = data[role]
      cy.login(testData.verifications.loginTxt, Url, credentials.username, credentials.password)
      if (role === 'admin' || role === 'staff' || role === 'viewer') {
        cy.verifyLoginIsSuccessful(credentials.username)
        cy.verifyloggedInUserRole(role)
        cy.portalLogin(portalUrl)
        cy.requestSubmission(
          testData.verifications.portalText,
          location.name,
          testData.verifications.vrfyPortalSpcPage,
          space.name,
          testData.verifications.vrfyPortalIssuePage,
          issueOne.name,
          issueTwo.name,
          testData.verifications.vrfyPortalCommnetPage,
        )
        cy.logoutFromPortal()
      } else if (role === 'vendor') {
        cy.verifyVendorLoginIsSuccessful(testData.verifications.portalText)
        cy.requestSubmission(
          testData.verifications.portalText,
          location.name,
          testData.verifications.vrfyPortalSpcPage,
          space.name,
          testData.verifications.vrfyPortalIssuePage,
          issueOne.name,
          issueTwo.name,
          testData.verifications.vrfyPortalCommnetPage,
        )
        cy.logoutFromPortal()
      }

      cy.verifyEndUserRedirectedToPortal(portalUrl, testData.verifications.portalText)
      cy.requestSubmission(
        testData.verifications.portalText,
        location.name,
        testData.verifications.vrfyPortalSpcPage,
        space.name,
        testData.verifications.vrfyPortalIssuePage,
        issueOne.name,
        issueTwo.name,
        testData.verifications.vrfyPortalCommnetPage,
      )
    })
  })

  after(() => {
    cy.archiveLocation(token, locId, false)
    cy.archiveIssue(token, issueId, false)
    cy.archiveIssue(token, secondIssueId, false)
  })
})
