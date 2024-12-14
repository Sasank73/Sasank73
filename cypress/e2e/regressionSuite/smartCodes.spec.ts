/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test verifies and validates smart-codes pointing to specific locations, spaces and issues.
 */

import { faker } from '@faker-js/faker'
import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('validate specific location, spaces and issues with smart-codes', () => {
  let testData, spaces, issueDetails, assetSCURL, token, Url, smartCodeUrl
  let spaceSCURL, smartAsset, createdSpace, createdAsset, spacId, issueId
  let locId, asetId, smartSpace, locSCURL, smartLoc, issueName

  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const asset = dataUtils.createMockAsset()
  const orgDetails = dataUtils.createMockOrganization()

  before(() => {
    cy.createOrganization(orgDetails.subdomainName, orgDetails.locationName)

    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
      smartCodeUrl = config.smartCodeUrl.replace('${subdomain}', orgDetails.subdomainName)
    })

    cy.fixture('testData.json').then((data) => {
      testData = data
    })
    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
    })
    issueName = issue.name
  })

  beforeEach(() => {
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
    locSCURL = smartCodeUrl + smartLoc
    spaceSCURL = smartCodeUrl + smartSpace
    assetSCURL = smartCodeUrl + smartAsset
    spaces = dataUtils.createMockSpace()
    issueDetails = dataUtils.createMockIssue()

    cy.clearLocalStorage()
    cy.clearAllCookies()
    cy.clearAllSessionStorage()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
  })

  it('create data with api', () => {
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
        cy.createSmartCode(token, 'LOCATION', locationId).then((smartId) => {
          smartLoc = smartId
        })
        cy.createAsset(token, asset.name, asset.description, locationId).then((assetId) => {
          asetId = assetId
          createdAsset = asset.name
          cy.createSmartCode(token, 'ASSET', assetId).then((smartId) => {
            smartAsset = smartId
          })
        })
        cy.spaceCreation(token, space.name, space.description, issueID, true, locationId).then(
          (spaceId) => {
            createdSpace = space.name
            spacId = spaceId
            cy.createSmartCode(token, 'SPACE', spaceId).then((smartId) => {
              smartSpace = smartId
            })
          },
        )
      })
    })
  })

  it('when a user uses the location smartcode, the space picker page is rendered', () => {
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToSpacesFromLocation()
    cy.verifySpacesOfLocation(createdSpace)
    cy.visit(locSCURL)
    cy.verifySpacesOfLocationInPortalForm(location.name, createdSpace)
  })

  it('the space picker page updated after adding an extra space to the location', () => {
    cy.goToIssueCategoriesMenu()
    cy.createIssueWithOutSelectingSpace(issue.name, issue.description, 'created')
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.createSpaceModeSpace(spaces.name, spaces.description, issue.name, 'created')
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToSpacesFromLocation()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.verifySpacesOfLocation(createdSpace)
    cy.verifySpacesOfLocation(spaces.name)
    cy.visit(locSCURL)
    cy.verifySpacesOfLocationInPortal(location.name, createdSpace)
    cy.verifySpacesOfLocationInPortal(location.name, spaces.name)
  })

  it('issue picker page rendering when user uses space smartcode', () => {
    cy.goToIssueCategoriesMenu()
    cy.createIssueWithOutSelectingSpace(issue.name, issue.description, 'created')
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.selectCreatedSpace(createdSpace)
    cy.selectIssueFromDropdown(issue.name)
    cy.clickOnSubmitButton()
    cy.visit(spaceSCURL)
    cy.verifyIssuesOfSpaceInPortal(location.name, createdSpace, issue.name)
  })

  it('update the issue picker page after adding two more issues to the slot', () => {
    const issue1 = 'issue1_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
    const issue2 = 'issue2_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })

    cy.goToIssueCategoriesMenu()
    cy.createIssueWithOutSelectingSpace(issue1, issue.description, 'created')
    cy.goToIssueCategoriesMenu()
    cy.createIssueWithOutSelectingSpace(issue2, issue.description, 'created')
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.selectCreatedSpace(createdSpace)
    cy.selectIssueFromDropdown(issue1)
    cy.selectIssueFromDropdown(issue2)
    cy.clickOnSubmitButton()
    cy.visit(spaceSCURL)
    cy.verifyIssuesOfSpacesInPortal(location.name, createdSpace, issue1)
    cy.verifyIssuesOfSpacesInPortal(location.name, createdSpace, issue2)
  })

  it('asset without configuring space', () => {
    cy.goToAssetsMenu()
    cy.selectCreatedAsset(createdAsset)
    cy.clickOnSaveAsset()
    cy.visit(assetSCURL)
    cy.verifyAssetWithOutSpace(createdSpace)
  })

  it('asset without configuring issue', () => {
    cy.goToAssetsMenu()
    cy.selectCreatedAsset(createdAsset)
    cy.selectSpaceInAsset(location.name, createdSpace)
    cy.clickOnSaveAsset()
    cy.selectCreatedAsset(createdAsset)
    cy.removeIssue(issueName)
    cy.clickOnSaveAsset()
    cy.visit(assetSCURL)
    cy.verifyAssetWithOutIssue(createdSpace, issue.name)
  })

  it('asset by configuring one issue', () => {
    cy.goToIssueCategoriesMenu()
    cy.createIssueWithOutSelectingSpace(issue.name, issue.description, 'created')
    cy.goToAssetsMenu()
    cy.selectCreatedAsset(createdAsset)
    cy.selectIssueInAsset(issue.name)
    cy.clickOnSaveAsset()
    cy.visit(assetSCURL)
    cy.verifyAutoCompleteInAsset(location.name, createdAsset)
  })

  it('asset by configuring two issue', () => {
    const issue1 = 'issue1_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
    const issue2 = 'issue2_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })

    cy.goToIssueCategoriesMenu()
    cy.createIssueWithOutSelectingSpace(issue1, issue.description, 'created')
    cy.goToIssueCategoriesMenu()
    cy.createIssueWithOutSelectingSpace(issue2, issue.description, 'created')
    cy.goToAssetsMenu()
    cy.selectCreatedAsset(createdAsset)
    cy.selectIssuesInAsset(issue1, issue2)
    cy.clickOnSaveAsset()
    cy.visit(assetSCURL)
    cy.verifyIssuesOfAssetsInPortal(location.name, createdAsset, issue1)
    cy.verifyIssuesOfAssetsInPortal(location.name, createdAsset, issue2)
  })
})
