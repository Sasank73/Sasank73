/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test verifies the preview in space page for the selected issues which are diplayed in the portal.
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('Preview of Space page for the selected issues displayed in the portal', () => {
  let testData, space, issueDetails, locId, token, Url
  const location = dataUtils.createMockLocation()
  space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
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

    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
      locId = locationId
    })
  })

  beforeEach(() => {
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
  })

  it('the space preview based on the issue request without data', () => {
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToSpaces()
    cy.spacePreviewWithOutData(location.name, space.name)
  })

  it('the space preview with the issue request, including all data and one issue', () => {
    issueDetails = dataUtils.createMockIssue()
    cy.goToIssueCategoriesMenu()
    cy.createIssueWithOutSelectingSpace(issue.name, issue.description, 'created')
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToSpaces()
    cy.fillSpaceModeSpace(space.name, space.description, issue.name)
    cy.selectIssueFromDropdown(issue.name)
    cy.spacePreviewWithData(location.name, space.name, space.description)
    cy.clickOnBackButton()
    cy.verifyTheSelectedIssue(issue.name)
  })

  it('the space preview with the issue request, including all data and multiple issues', () => {
    const issuesNames = ['issue-1', 'issue-2', 'issue-3', 'issue-4', 'issue-5']
    const issuesDetailsDescs = [
      'issueDetail-1',
      'issueDetail-2',
      'issueDetail-3',
      'issueDetail-4',
      'issueDetail-5',
    ]

    for (let i = 0; i < issuesNames.length; i++) {
      cy.goToIssueCategoriesMenu()
      cy.createIssueWithOutSelectingSpace(issuesNames[i], issuesDetailsDescs[i], 'created')
    }

    cy.clearLocalStorage()
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToSpaces()
    cy.fillSpaceModeSpace(space.name, space.description)

    for (let i = 0; i < issuesNames.length; i++) {
      cy.selectIssueFromDropdown(issuesNames[i])
    }

    cy.spacePreviewWithData(location.name, space.name, space.description)

    for (let i = 0; i < issuesNames.length; i++) {
      cy.verifyTheSelectedIssue(issuesNames[i])
    }

    cy.clickOnSubmitButton()
    cy.archiveLocation(token, locId, false)
  })
})
