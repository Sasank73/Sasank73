/* eslint-env node, mocha */
/// <reference types="cypress"/>
import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'
import { faker } from '@faker-js/faker'

describe('CRUD Survey', () => {
  let testData, token, Url

  const shortText = dataUtils.createMockShortTextField()
  const longText = dataUtils.createMockLongTextField()
  const number = dataUtils.createMockNumbersField()
  const checkbox = dataUtils.createMockCheckboxField()
  const dropdown = dataUtils.createMockDropdownField()
  const survey = dataUtils.createMockSurvey()
  const sectionTitle = faker.word.noun() + '_section'
  const dropDownOptions = dataUtils.createMockDropdownOptions()
  const orgDetails = dataUtils.createMockOrganization()

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data
    })

    cy.createOrganization(orgDetails.subdomainName, orgDetails.locationName)

    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
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
    cy.clearLocalStorage()
  })

  it('crud survey', () => {
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToSurveysMenu()
    cy.verifySurveyPage()
    cy.fillSurveyForm(survey.name, survey.description)
    cy.verifyNewSection()
    cy.addHeaderName(sectionTitle)

    cy.verifyAndAddshortTextField(shortText.fieldTitle, sectionTitle, shortText.fieldDescription)
    cy.verifyAndAddNumberField(number.fieldTitle, number.fieldDescription)
    cy.saveSurvey()
    cy.verifySuccessAlert('created')
    cy.verifySurveyPage()
    cy.selectCreatedSurvey(survey.name)
    cy.verifyCreateProcedurePage(testData.verifications.vrfySurveyEditPage)

    cy.verifyAndAddLongTextField(longText.fieldTitle, sectionTitle, longText.fieldDescription)
    cy.verifyAndAddcheckBoxField(checkbox.fieldTitle, checkbox.fieldDescription)
    cy.verifyAndAddDropdownField(
      dropdown.fieldTitle,
      dropdown.fieldDescription,
      dropDownOptions.opt1,
      dropDownOptions.opt2,
    )
    cy.saveSurvey()
    cy.verifySuccessAlert('updated')

    cy.verifySurveyPage()
    cy.selectCreatedSurvey(survey.name)
    cy.verifyCreateProcedurePage(testData.verifications.vrfySurveyEditPage)
    cy.removeAField(dropdown.fieldTitle)
    cy.verifySuccessAlert('updated')

    cy.selectCreatedSurvey(survey.name)
    cy.verifyCreateProcedurePage(testData.verifications.vrfySurveyEditPage)
    cy.verifyDeletedField(dropdown.fieldTitle)
  })
})
