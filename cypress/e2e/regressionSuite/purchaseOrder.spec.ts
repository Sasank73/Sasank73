/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test examines CRUD operations for Purchase Orders.
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('CRUD Purchase Orders', () => {
  let testData, partId, part, mockPo, poId, token, Url
  part = dataUtils.createPart()
  mockPo = dataUtils.createMockPO()
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
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.createAPart(token, part.name, part.description, part.unitPrice, part.inStock, part.minStock)
    cy.get('@partId').then((data) => {
      partId = data
    })
    cy.clickOnPO()
    cy.verifyPoPage('Purchase Orders')
    cy.clickOnCreatePO()
    cy.verifyCreatePoPage('Create new purchase order')
    cy.verifyCreatePurchaseOrderBtn()
    cy.createPO(mockPo.poId, part.name, mockPo.code, mockPo.quantity, part.unitPrice)
    cy.verifySuccessAlert(`created purchase order ${mockPo.poId}`)
  })

  it('create and validate Purchase Order', () => {
    const newPart = dataUtils.createPart()
    const newMockPo = dataUtils.createMockPO()
    cy.clickOnPO()
    cy.verifyPoPage('Purchase Orders')
    cy.selectCreatedPo(mockPo.poId)
    cy.verifyCreatePoPage('Edit purchase order')
    cy.verifyCreatePurchaseOrderBtn()
    cy.editPo(newPart.name, newMockPo.poId, newPart.unitPrice, newPart.inStock)
    cy.get('@poID').then((data) => {
      poId = data
    })
    cy.verifySuccessAlert('updated')
    cy.clearAllLocalStorage()
    cy.closeSearchBar()
    cy.selectCreatedPo(mockPo.poId)
    cy.verifyCreatePoPage('Edit purchase order')
    cy.verifyCreatePurchaseOrderBtn()
    cy.deletePart(newPart.name)
    cy.completePo()
    cy.verifySuccessAlert('updated')
    cy.clearAllLocalStorage()
    cy.closeSearchBar()
    cy.selectCreatedPo(mockPo.poId)
    cy.verifyCompletedPO()
    cy.clickOnPartsInventory()
    cy.verifyPoPage('Parts')
    cy.verifyAddPartBtn()
    cy.selectCreatedPo(part.name)
    cy.verifyEditPartsPage('Edit part', part.name)
    cy.verifyAddedParts(part.inStock)
  })

  after(() => {
    cy.archivePart(token, partId, false)
    cy.archivePO(token, poId, false)
  })
})
