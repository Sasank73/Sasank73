/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test verifies the location page in the portal and the associated space within the portal using a unique location ID.
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('location id specs for issues and spaces', () => {
  let testData, space, locId, token, Url, locationPortalURL
  const location = dataUtils.createMockLocation()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const orgDetails = dataUtils.createMockOrganization()

  before(() => {
    cy.createOrganization(orgDetails.subdomainName, orgDetails.locationName)

    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
      locationPortalURL = config.locationPortalURL.replace('${subdomain}', orgDetails.subdomainName)
    })
    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
    })
    cy.fixture('testData.json').then((data) => {
      testData = data
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
    cy.goToIssueCategoriesMenu()
    cy.createIssueWithOutSelectingSpace(issue.name, issue.description, 'created')
    cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
      locId = locationId
    })
  })

  it('issue picker page rendering', () => {
    cy.clearAllLocalStorage()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.visitLocationIDURL(locationPortalURL)
    cy.verifySpacePickerAutoComplete(location.name)
  })

  it('space picker page rendering in the form of radio buttons with less than or equal to 5 spaces', () => {
    for (let i = 0; i < 4; i++) {
      space = dataUtils.createMockSpace()

      cy.clearAllLocalStorage()
      cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
      cy.verifyLoginIsSuccessful(env_creds.username)
      cy.goToLocationsMenu()
      cy.selectCreatedLocation(location.name)
      cy.createSpaceModeSpace(space.name, space.description, issue.name, 'created')
      cy.visitLocationIDURL(locationPortalURL)
      cy.verifySpacePickerRadioButtons(location.name)
      cy.verifySpaceOfLocationInPortal(space.name, space.description)
    }
  })

  it('space picker page rendering in the form of a dropdown with more than five spaces', () => {
    space = dataUtils.createMockSpace()

    cy.clearAllLocalStorage()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.createSpaceModeSpace(space.name, space.description, issue.name, 'created')
    cy.visitLocationIDURL(locationPortalURL)
    cy.verifySpacePickerDropDown(location.name)
    cy.verifySpaceOfLocationInPortal(space.name, space.description)
  })

  after(() => {
    cy.archiveLocation(token, locId, false)
  })
})
