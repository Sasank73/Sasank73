/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test examines the transition of radio buttons and dropdowns when the location has less than six spaces or more than five spaces.
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('autocomplete and radio buttons for locations and spaces', () => {
  let testData, issueId, locId, token, Url, portalUrl
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
  })

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearAllSessionStorage()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
    })
  })

  it('radio buttons are displayed when location having less than six spaces', () => {
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
      })
    })

    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    for (let i = 0; i < 4; i++) {
      const space = dataUtils.createMockSpace()
      cy.createSpaceModeSpace(space.name, space.description, issue.name, 'created')
    }
    cy.portalLogin(portalUrl)
    cy.verifyRadioButtons(location.name)
  })

  it('radio buttons are displayed when location having greater than five spaces', () => {
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    const space = dataUtils.createMockSpace()
    cy.createSpaceModeSpace(space.name, space.description, issue.name, 'created')
    cy.portalLogin(portalUrl)
    cy.verifyDropDown(location.name)
  })

  after(() => {
    cy.archiveLocation(token, locId, false)
    cy.archiveIssue(token, issueId, false)
  })
})
