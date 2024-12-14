import { faker } from '@faker-js/faker'
import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('Verify that delete a section from Procedure', () => {
  let testData, procName, sectionTitle, token, Url, secondSectionTitle

  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const shortText = dataUtils.createMockShortTextField()
  const number = dataUtils.createMockNumbersField()
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

    cy.clearLocalStorage()
    cy.clearCookies()
    procName =
      faker.word.noun() +
      ' procedure' +
      faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        cy.spaceCreation(token, space.name, space.description, issueID, true, locationId)
      })
    })
  })

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    sectionTitle = faker.word.noun() + '_section'
    secondSectionTitle = faker.word.noun() + '_secondSection'
    cy.goToProcedure()
    cy.verifyProcedureHomePage()
  })

  it('remove a section from a multi-section procedure template', () => {
    cy.clickOnProcedureBtn()
    cy.verifyCreateProcedurePage(testData.procedureVerifications.createProcPage)
    cy.addProcedureName(procName)
    cy.verifyNewSection()
    cy.addHeaderName(sectionTitle)
    cy.verifyAndAddshortTextField(shortText.fieldTitle, sectionTitle, shortText.fieldDescription)
    cy.verifyAndAddNumberField(number.fieldTitle, number.fieldDescription)
    cy.verifyConfigurePage()

    cy.addNewSection()
    cy.addHeaderName(secondSectionTitle)
    cy.verifyConfigurePage()
    cy.selectNewSection(sectionTitle)
    cy.saveProcedure()
    cy.verifyProcedureHomePage()
    cy.goToProcedure()
    cy.verifyProcedureHomePage()
    cy.selectTheCreatedProcedure(procName)
    cy.verifyCreateProcedurePage(`edit ${procName}`)
    cy.deleteSectionButton()
    cy.deletebuttonOnConfirmationPopup()
    cy.saveProcedure()
    cy.verifyProcedureHomePage()
    cy.goToProcedure()
    cy.selectTheCreatedProcedure(procName)
    cy.VerifySectionIsDeletedOrNot(secondSectionTitle)
  })
})
