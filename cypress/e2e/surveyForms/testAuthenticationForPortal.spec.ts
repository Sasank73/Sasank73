/* eslint-env node, mocha */
/// <reference types="cypress"/>
import env_creds from '../../utilities/environment'

describe('Authenticated Portal Url ', () => {
  let testData, token

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data
    })
    cy.getLoginToken().then((authToken) => {
      token = authToken
    })
  })

  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('unauthenticated url', () => {
    cy.portalUrl(env_creds.portal_url, testData.verifications.portalText)
  })

  it('authenticated url', () => {
    cy.authUrl(env_creds.auth_Url, testData.verifications.loginTxt)
  })
})
