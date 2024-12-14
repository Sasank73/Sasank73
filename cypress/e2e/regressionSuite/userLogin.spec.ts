/* eslint-env node, mocha */
import env_creds from '../../utilities/environment'
import * as dataUtils from '../../utilities/dataUtils'

describe('Login Functionality ', () => {
  let testData, user, Url, portalUrl, token

  const orgDetails = dataUtils.createMockOrganization()
  const location = dataUtils.createMockLocation()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
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
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
  })

  it('create user data', () => {
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
      cy.log(`token value:${token}`)
      userNames.forEach((name, index) => {
        const role = userRoles[index]
        const email = userEmail[index]
        cy.createUser(token, name, email, user.phoneNumber, role, locationId)
      })
    })
  })

  it('login authentication with multiple roles.', () => {
    env_creds.login_creds.forEach((data) => {
      cy.clearLocalStorage()
      const role = Object.keys(data)[0]
      const credentials = data[role]
      cy.login(testData.verifications.loginTxt, Url, credentials.username, credentials.password)
      if (role === 'admin' || role === 'staff' || role === 'viewer') {
        cy.verifyLoginIsSuccessful(credentials.username)
        cy.verifyloggedInUserRole(role)
        cy.portalLogin(portalUrl)
        cy.logoutFromPortal()
      } else if (role === 'vendor') {
        cy.verifyVendorLoginIsSuccessful(testData.verifications.portalText)
        cy.logoutFromPortal()
      }
    })
    cy.verifyEndUserRedirectedToPortal(portalUrl, testData.verifications.portalText)
  })
})
