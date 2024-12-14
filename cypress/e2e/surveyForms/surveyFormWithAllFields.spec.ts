/* eslint-env node, mocha */
/// <reference types="cypress"/>

import { faker } from '@faker-js/faker'
import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('submit survey with all field types', () => {
  let testData, surveyDetails, locationDetails, spaceDetails, surveyFieldWiseDetails, token, Url, portalUrl
  const inputFields = ['Text', 'Number', 'Multi-line text', 'Checkbox', 'Drop-down']
  const location = dataUtils.createMockLocation()

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data
    })
    cy.getLoginToken().then((authToken) => {
      token = authToken
    })
  })

  before(() => {
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }

    locationDetails = dataUtils.createMockLocation()
    surveyDetails = dataUtils.createMockSurvey()
    spaceDetails = dataUtils.createMockSpace()

    cy.clearLocalStorage()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToSurveysMenu()
    cy.fillSurveyForm(surveyDetails[0], surveyDetails[1])
    cy.createAndAddTextField(
      surveyFieldWiseDetails[0][0],
      surveyFieldWiseDetails[0][1],
      surveyFieldWiseDetails[0][2],
      surveyFieldWiseDetails[0][3],
    )
    cy.clickOnCreateNewField()
    cy.createAndAddNumberField(
      surveyFieldWiseDetails[1][0],
      surveyFieldWiseDetails[1][1],
      surveyFieldWiseDetails[1][2],
      surveyFieldWiseDetails[1][3],
    )
    cy.clickOnCreateNewField()
    cy.createAndAddMultiTextField(
      surveyFieldWiseDetails[2][0],
      surveyFieldWiseDetails[2][1],
      surveyFieldWiseDetails[2][2],
      surveyFieldWiseDetails[2][3],
    )
    cy.clickOnCreateNewField()
    cy.createAndAddCheckboxField(
      surveyFieldWiseDetails[3][0],
      surveyFieldWiseDetails[3][1],
      surveyFieldWiseDetails[3][2],
    )
    cy.clickOnCreateNewField()
    cy.createAndAddDropdownField(
      surveyFieldWiseDetails[4][0],
      surveyFieldWiseDetails[4][1],
      surveyFieldWiseDetails[4][2],
    )
    cy.createSurvey('created')
    cy.goToLocationsMenu()
    cy.createLocation(location.name, locationDetails[1], locationDetails[2], 'created')
    cy.selectCreatedLocation(location.name)
    cy.createSpace(spaceDetails[0], spaceDetails[1], surveyDetails[0], 'created')
  })
  it('verify is survey form submitted with out required field', () => {
    const inputs = ['', '0', '', 'No', '']
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
      cy.clearSurveyFieldTextAndNumber(surveyFieldWiseDetails[0][1])
      cy.clearSurveyFieldTextAndNumber(surveyFieldWiseDetails[1][1])
      cy.clearSurveyFieldMultiLineText(surveyFieldWiseDetails[2][1])
      cy.checkIsNumberFieldAllowingStringContainsText(surveyFieldWiseDetails[1][1])
      cy.uncheckTheCheckBox(surveyFieldWiseDetails[3][1])
      cy.submitSurvey()
      cy.logoutFromPortal()
      cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
      cy.verifyLoginIsSuccessful(env_creds.username)
      cy.goToSurveysMenu()

      for (let i = 0; i < inputFields.length; i++) {
        cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], inputs[i], surveyDetails[0])
      }

      cy.logout(env_creds.username)
    })

    cy.verifyEndUserRedirectedToPortal(env_creds.portal_url, testData.verifications.portalText)
    cy.selectLocationAndSpaceInPortal(location.name, spaceDetails[0], spaceDetails[1])
    cy.clearSurveyFieldTextAndNumber(surveyFieldWiseDetails[0][1])
    cy.clearSurveyFieldTextAndNumber(surveyFieldWiseDetails[1][1])
    cy.clearSurveyFieldMultiLineText(surveyFieldWiseDetails[2][1])
    cy.checkIsNumberFieldAllowingStringContainsText(surveyFieldWiseDetails[1][1])
    cy.uncheckTheCheckBox(surveyFieldWiseDetails[3][1])
    cy.submitSurvey()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToSurveysMenu()

    for (let i = 0; i < inputFields.length; i++) {
      cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], inputs[i], surveyDetails[0])
    }
  })

  it('verify is survey form submitted with required field', () => {
    const textInput = 'text_input_' + faker.number.float(5)
    const numberInput = faker.number.int(10000)
    const multiLineTextInput = 'multiLineText_input_' + faker.lorem.lines(3)
    const checkBoxInput = 'Selected Yes'
    const dropDownInput = 'Yes'
    const inputs = [textInput, numberInput, multiLineTextInput, checkBoxInput, dropDownInput]

    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToSurveysMenu()
    cy.editSurvey(surveyDetails[0])
    cy.allFieldsRequired()
    cy.createSurvey('updated')

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
      cy.clearSurveyFieldTextAndNumber(surveyFieldWiseDetails[0][1])
      cy.clearSurveyFieldTextAndNumber(surveyFieldWiseDetails[1][1])
      cy.clearSurveyFieldMultiLineText(surveyFieldWiseDetails[2][1])
      cy.checkIsNumberFieldAllowingStringContainsText(surveyFieldWiseDetails[1][1])
      cy.uncheckTheCheckBox(surveyFieldWiseDetails[3][1])
      cy.checkErrorMessageIfRequired(
        surveyFieldWiseDetails[0][1],
        surveyFieldWiseDetails[0][2],
        location.name,
      )
      cy.checkErrorMessageIfRequired(
        surveyFieldWiseDetails[1][1],
        surveyFieldWiseDetails[1][2],
        location.name,
      )
      cy.checkErrorMessageIfRequired(
        surveyFieldWiseDetails[2][1],
        surveyFieldWiseDetails[2][2],
        location.name,
      )
      cy.checkErrorMessageIfRequiredForCheckbox(
        surveyFieldWiseDetails[3][1],
        surveyFieldWiseDetails[3][2],
        location.name,
      )
      cy.checkErrorMessageIfRequiredForDropdown(
        surveyFieldWiseDetails[4][1],
        surveyFieldWiseDetails[4][2],
        location.name,
      )
      cy.inputIntoSurveyFieldTextAndNumber(surveyFieldWiseDetails[0][1], inputs[0])
      cy.inputIntoSurveyFieldTextAndNumber(surveyFieldWiseDetails[1][1], inputs[1])
      cy.inputIntoSurveyFieldMultiLineText(surveyFieldWiseDetails[2][1], inputs[2])
      cy.CheckTheCheckBox(surveyFieldWiseDetails[3][1])
      cy.selectInputFromDropdown(surveyFieldWiseDetails[4][1], inputs[4])
      cy.submitSurvey()
      cy.logoutFromPortal()
      cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
      cy.verifyLoginIsSuccessful(env_creds.username)
      cy.goToSurveysMenu()

      for (let i = 0; i < inputFields.length; i++) {
        cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], inputs[i], surveyDetails[0])
      }

      cy.logout(env_creds.username)
    })

    cy.verifyEndUserRedirectedToPortal(env_creds.portal_url, testData.verifications.portalText)
    cy.selectLocationAndSpaceInPortal(location.name, spaceDetails[0], spaceDetails[1])
    cy.clearSurveyFieldTextAndNumber(surveyFieldWiseDetails[0][1])
    cy.clearSurveyFieldTextAndNumber(surveyFieldWiseDetails[1][1])
    cy.clearSurveyFieldMultiLineText(surveyFieldWiseDetails[2][1])
    cy.checkIsNumberFieldAllowingStringContainsText(surveyFieldWiseDetails[1][1])
    cy.uncheckTheCheckBox(surveyFieldWiseDetails[3][1])
    cy.checkErrorMessageIfRequired(
      surveyFieldWiseDetails[0][1],
      surveyFieldWiseDetails[0][2],
      location.name,
    )
    cy.checkErrorMessageIfRequired(
      surveyFieldWiseDetails[1][1],
      surveyFieldWiseDetails[1][2],
      location.name,
    )
    cy.checkErrorMessageIfRequired(
      surveyFieldWiseDetails[2][1],
      surveyFieldWiseDetails[2][2],
      location.name,
    )
    cy.checkErrorMessageIfRequiredForCheckbox(
      surveyFieldWiseDetails[3][1],
      surveyFieldWiseDetails[3][2],
      location.name,
    )
    cy.checkErrorMessageIfRequiredForDropdown(
      surveyFieldWiseDetails[4][1],
      surveyFieldWiseDetails[4][2],
      location.name,
    )
    cy.inputIntoSurveyFieldTextAndNumber(surveyFieldWiseDetails[0][1], inputs[0])
    cy.inputIntoSurveyFieldTextAndNumber(surveyFieldWiseDetails[1][1], inputs[1])
    cy.inputIntoSurveyFieldMultiLineText(surveyFieldWiseDetails[2][1], inputs[2])
    cy.CheckTheCheckBox(surveyFieldWiseDetails[3][1])
    cy.selectInputFromDropdown(surveyFieldWiseDetails[4][1], inputs[4])
    cy.submitSurvey()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToSurveysMenu()

    for (let i = 0; i < inputFields.length; i++) {
      cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], inputs[i], surveyDetails[0])
    }
  })
})
