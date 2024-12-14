/* eslint-env node, mocha */
/// <reference types="cypress"/>

import { faker } from '@faker-js/faker'
import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('submit survey with each type of field', () => {
  let testData, input, surveyDetails, locationDetails, spaceDetails, surveyFieldDetails, token, Url, portalUrl
  const inputFields = ['Text', 'Number', 'Multi-line text', 'Checkbox', 'Drop-down']
  const location = dataUtils.createMockLocation()
  const orgDetails = dataUtils.createMockOrganization()

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data
    })
    cy.getLoginToken().then((authToken) => {
      token = authToken
    })
    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
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

    cy.clearLocalStorage()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    surveyDetails = dataUtils.createMockSurvey()
    locationDetails = dataUtils.createMockLocation()
    surveyFieldDetails = dataUtils.createMockSurveyFieldData()
    spaceDetails = dataUtils.createMockSpace()

    cy.goToSurveysMenu()
    cy.fillSurveyForm(surveyDetails[0], surveyDetails[1])
  })

  for (let i = 0; i < inputFields.length; i++) {
    it('verify is survey form submitted with out required field', () => {
      if (inputFields[i] === 'Text') {
        cy.createAndAddTextField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[1],
        )
      } else if (inputFields[i] === 'Number') {
        cy.createAndAddNumberField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[1],
        )
      } else if (inputFields[i] === 'Multi-line text') {
        cy.createAndAddMultiTextField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[1],
        )
      } else if (inputFields[i] === 'Checkbox') {
        cy.createAndAddCheckboxField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
        )
      } else {
        cy.createAndAddDropdownField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
        )
      }

      if (
        inputFields[i] === 'Text' ||
        inputFields[i] === 'Multi-line text' ||
        inputFields[i] === 'Drop-down'
      ) {
        input = ''
      } else if (inputFields[i] === 'Number') {
        input = '0'
      } else {
        input = 'No'
      }

      cy.createSurvey('created')
      cy.goToLocationsMenu()
      cy.createLocation(location.name, locationDetails[1], locationDetails[2], 'created')
      cy.selectCreatedLocation(location.name)
      cy.createSpace(spaceDetails[0], spaceDetails[1], surveyDetails[0], 'created')

      env_creds.login_creds.forEach((data) => {
        const role = Object.keys(data)[0]
        const credentials = data[role]
        cy.login(testData.verifications.loginTxt, Url, credentials.username, credentials.password)

        if (role === 'admin' || role === 'staff' || role === 'viewer') {
          cy.verifyLoginIsSuccessful(credentials.username)
          cy.verifyloggedInUserRole(role)
          cy.portalLogin(portalUrl)
        } else {
          cy.verifyVendorLoginIsSuccessful(testData.verifications.portalText)
        }

        cy.selectLocationAndSpaceInPortal(location.name, spaceDetails[0], spaceDetails[1])

        if (inputFields[i] === 'Text' || inputFields[i] === 'Multi-line text') {
          cy.clearSurveyField()
        } else if (inputFields[i] === 'Number') {
          cy.clearSurveyField()
          cy.checkIsNumberFieldAllowingString()
        } else if (inputFields[i] === 'Checkbox') {
          cy.uncheckTheCheckBox(surveyFieldDetails[2])
        }
        cy.submitSurvey()
        cy.logoutFromPortal()
        cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
        cy.verifyLoginIsSuccessful(env_creds.username)
        cy.goToSurveysMenu()
        cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], input, surveyDetails[0])
        cy.logout(env_creds.username)
      })

      cy.verifyEndUserRedirectedToPortal(env_creds.portal_url, testData.verifications.portalText)
      cy.selectLocationAndSpaceInPortal(location.name, spaceDetails[0], spaceDetails[1])

      if (inputFields[i] === 'Text' || inputFields[i] === 'Multi-line text') {
        cy.clearSurveyField()
      } else if (inputFields[i] === 'Number') {
        cy.clearSurveyField()
        cy.checkIsNumberFieldAllowingString()
      } else if (inputFields[i] === 'Checkbox') {
        cy.uncheckTheCheckBox(surveyFieldDetails[2])
      }
      cy.submitSurvey()
      cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
      cy.verifyLoginIsSuccessful(env_creds.username)
      cy.goToSurveysMenu()
      cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], input, surveyDetails[0])
    })

    it('verify is survey form submitted with required field', () => {
      if (inputFields[i] === 'Text') {
        cy.createAndAddTextField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[1],
        )
      } else if (inputFields[i] === 'Number') {
        cy.createAndAddNumberField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[1],
        )
      } else if (inputFields[i] === 'Multi-line text') {
        cy.createAndAddMultiTextField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[1],
        )
      } else if (inputFields[i] === 'Checkbox') {
        cy.createAndAddCheckboxField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
        )
      } else {
        cy.createAndAddDropdownField(
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
        )
      }

      if (inputFields[i] === 'Text') {
        input = 'input_' + faker.number.float(5)
      } else if (inputFields[i] === 'Number') {
        input = faker.number.int(100000)
      } else if (inputFields[i] === 'Multi-line text') {
        input = 'longinput_' + faker.lorem.lines(3)
      } else if (inputFields[i] === 'Checkbox') {
        input = 'Yes'
      } else {
        input = 'Selected Yes'
      }

      cy.fieldRequired()
      cy.createSurvey('created')
      cy.goToLocationsMenu()
      cy.createLocation(location.name, locationDetails[1], locationDetails[2], 'created')
      cy.selectCreatedLocation(location.name)
      cy.createSpace(spaceDetails[0], spaceDetails[1], surveyDetails[0], 'created')

      env_creds.login_creds.forEach((data) => {
        const role = Object.keys(data)[0]
        const credentials = data[role]
        cy.login(testData.verifications.loginTxt, Url, credentials.username, credentials.password)

        if (role === 'admin' || role === 'staff' || role === 'viewer') {
          cy.verifyLoginIsSuccessful(credentials.username)
          cy.verifyloggedInUserRole(role)
          cy.portalLogin(portalUrl)
        } else if (role === 'vendor') {
          cy.verifyVendorLoginIsSuccessful(testData.verifications.portalText)
        }
        cy.selectLocationAndSpaceInPortal(location.name, spaceDetails[0], spaceDetails[1])

        if (inputFields[i] === 'Text' || inputFields[i] === 'Multi-line text') {
          cy.clearSurveyField()
        } else if (inputFields[i] === 'Number') {
          cy.clearSurveyField()
          cy.checkIsNumberFieldAllowingString()
        } else if (inputFields[i] === 'Checkbox') {
          cy.uncheckTheCheckBox(surveyFieldDetails[2])
        }

        if (
          inputFields[i] === 'Text' ||
          inputFields[i] === 'Multi-line text' ||
          inputFields[i] === 'Number'
        ) {
          cy.checkErrorMessageIfRequired(
            surveyFieldDetails[2],
            surveyFieldDetails[3],
            location.name,
          )
        } else if (inputFields[i] === 'Checkbox') {
          cy.checkErrorMessageIfRequiredForCheckbox(
            surveyFieldDetails[2],
            surveyFieldDetails[3],
            location.name,
          )
        } else {
          cy.checkErrorMessageIfRequiredForDropdown(
            surveyFieldDetails[2],
            surveyFieldDetails[3],
            location.name,
          )
        }

        if (
          inputFields[i] === 'Text' ||
          inputFields[i] === 'Multi-line text' ||
          inputFields[i] === 'Number'
        ) {
          cy.inputIntoSurveyField(
            input,
            surveyDetails[0],
            surveyDetails[1],
            surveyFieldDetails[2],
            surveyFieldDetails[3],
          )
        } else if (inputFields[i] === 'Checkbox') {
          cy.CheckTheCheckBox(surveyFieldDetails[2])
        } else {
          cy.selectInputFromDropdown(surveyFieldDetails[2], input)
        }

        cy.submitSurvey()
        cy.logoutFromPortal()
        cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
        cy.goToSurveysMenu()
        cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], input, surveyDetails[0])
        cy.logout(env_creds.username)
      })

      cy.verifyEndUserRedirectedToPortal(env_creds.portal_url, testData.verifications.portalText)
      cy.selectLocationAndSpaceInPortal(location.name, spaceDetails[0], spaceDetails[1])

      if (inputFields[i] === 'Text' || inputFields[i] === 'Multi-line text') {
        cy.clearSurveyField()
      } else if (inputFields[i] === 'Number') {
        cy.clearSurveyField()
        cy.checkIsNumberFieldAllowingString()
      } else if (inputFields[i] === 'Checkbox') {
        cy.uncheckTheCheckBox(surveyFieldDetails[2])
      }

      if (
        inputFields[i] === 'Text' ||
        inputFields[i] === 'Multi-line text' ||
        inputFields[i] === 'Number'
      ) {
        cy.checkErrorMessageIfRequired(surveyFieldDetails[2], surveyFieldDetails[3], location.name)
      } else if (inputFields[i] === 'Checkbox') {
        cy.checkErrorMessageIfRequiredForCheckbox(
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          location.name,
        )
      } else {
        cy.checkErrorMessageIfRequiredForDropdown(
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          location.name,
        )
      }

      if (
        inputFields[i] === 'Text' ||
        inputFields[i] === 'Multi-line text' ||
        inputFields[i] === 'Number'
      ) {
        cy.inputIntoSurveyField(
          input,
          surveyDetails[0],
          surveyDetails[1],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
        )
      } else if (inputFields[i] === 'Checkbox') {
        cy.CheckTheCheckBox(surveyFieldDetails[2])
      } else {
        cy.selectInputFromDropdown(surveyFieldDetails[2], input)
      }

      cy.submitSurvey()
      cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
      cy.goToSurveysMenu()
      cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], input, surveyDetails[0])
    })
  }
})
