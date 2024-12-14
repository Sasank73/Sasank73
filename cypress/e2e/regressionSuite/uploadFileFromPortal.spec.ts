/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test verifies how the user submits the request in the portal when an additional comment is required.
 */

import env_creds from '../../utilities/environment'
import * as dataUtils from '../../utilities/dataUtils'

describe('File uplaod verification from portal', () => {
  let testData, locId, issueId, spacId, secondIssueId, token, Url, portalUrl
  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issueOne = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const issueTwo = dataUtils.createMockIssue()
  const orgDetails = dataUtils.createMockOrganization()
  const filePath = ['sampleJpg.jpeg', 'samplePNGImage.png', 'sampleSvg.svg', 'sampleWebp.webp']

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

  it('allow to upload a file from the portal and confirm its status', () => {
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
    cy.uploadFiles(filePath, testData.imageLength)
    cy.clickSubmitButton()
    cy.verifyIsRequestSubmitted()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.goToTicketMenu()
    cy.verifyPoPage('Tickets')
    cy.selectCreatedTicket(issueOne.name)
    cy.clickOnCommentsTab()
    cy.verifyUploadedImages(testData.imageLength)
  })
})
