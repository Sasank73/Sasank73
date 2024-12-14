/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test verifies the preview in space page for the selected surveys which are diplayed in the portal.
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('submit survey with each type of field', () => {
  let testData, locId, token, surveyfield, Url

  const survey = dataUtils.createMockSurvey()
  const space = dataUtils.createMockSpace()
  const dropDownOptions = dataUtils.createMockDropdownOptions()
  const location = dataUtils.createMockLocation()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
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

  before(() => {
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
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
    cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
      locId = locationId
    })
    cy.goToSurveysMenu()
    cy.surveyPage(survey.name, survey.description)
    cy.createSurvey('created')
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.createAndVerifySurevy(space.name, space.description, survey.name, location.name)
  })

  beforeEach(() => {
    cy.clearLocalStorage()
    surveyfield = dataUtils.createMockSurveyFieldData()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.reload()
    cy.goToSurveysMenu()
    cy.goToSurvey(survey.name)
  })

  it('preview with text field', () => {
    cy.createAndAddTextField(
      surveyfield.fieldTitle,
      surveyfield.defaultValue,
      surveyfield.fieldDescription,
      surveyfield.fieldHelperText,
    )
    cy.surveyPreviewWithOutData(testData.verifications.locName, testData.verifications.spacName)
    cy.createSurvey('updated')
    cy.goToSurvey(survey.name)
    cy.surveyPreviewWithData(
      testData.verifications.locName,
      testData.verifications.spacName,
      survey.name,
    )
    cy.verifyTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToCreatedSpace(space.name, space.name)
    cy.goToCreatedSpaces(space.name, space.name)
    cy.spacePreviewWithAllData(location.name, space.name, survey.name)
    cy.verifySpaceTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
  })

  it('preview with multi-line text field', () => {
    cy.createAndAddMultiTextField(
      surveyfield.fieldTitle,
      surveyfield.defaultValue,
      surveyfield.fieldDescription,
      surveyfield.fieldHelperText,
    )
    cy.surveyPreviewWithOutData(testData.verifications.locName, testData.verifications.spacName)
    cy.createSurvey('updated')
    cy.goToSurvey(survey.name)
    cy.surveyPreviewWithData(
      testData.verifications.locName,
      testData.verifications.spacName,
      survey.name,
    )
    cy.verifyTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToCreatedSpace(space.name, space.name)
    cy.goToCreatedSpaces(space.name, space.name)
    cy.spacePreviewWithAllData(location.name, space.name, survey.name)
    cy.verifySpaceTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
  })

  it('preview with number field', () => {
    cy.createAndAddNumberField(
      surveyfield.fieldTitle,
      surveyfield.defaultValue,
      surveyfield.fieldDescription,
      surveyfield.fieldHelperText,
    )
    cy.surveyPreviewWithOutData(testData.verifications.locName, testData.verifications.spacName)
    cy.createSurvey('updated')
    cy.goToSurvey(survey.name)
    cy.surveyPreviewWithData(
      testData.verifications.locName,
      testData.verifications.spacName,
      survey.name,
    )
    cy.verifyTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToCreatedSpace(space.name, space.name)
    cy.goToCreatedSpaces(space.name, space.name)
    cy.spacePreviewWithAllData(location.name, space.name, survey.name)
    cy.verifySpaceTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.verifySpaceNumberField(surveyfield.defaultValue, surveyfield.fieldDescription)
  })

  it('preview with dropdown field', () => {
    cy.createAndAddDropdownField(
      surveyfield.fieldTitle,
      surveyfield.defaultValue,
      surveyfield.fieldDescription,
      dropDownOptions.opt1,
      dropDownOptions.opt2,
    )
    cy.surveyPreviewWithOutData(testData.verifications.locName, testData.verifications.spacName)
    cy.createSurvey('updated')
    cy.goToSurvey(survey.name)
    cy.surveyPreviewWithData(
      testData.verifications.locName,
      testData.verifications.spacName,
      survey.name,
    )
    cy.verifyTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToCreatedSpace(space.name, space.name)
    cy.goToCreatedSpaces(space.name, space.name)
    cy.spacePreviewWithAllData(location.name, space.name, survey.name)
    cy.verifySpaceTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.verifySpaceNumberField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.verifyDropDownField(surveyfield.defaultValue, surveyfield.fieldDescription)
  })

  it('preview with checkbox field', () => {
    cy.createAndAddCheckboxField(
      surveyfield.fieldTitle,
      surveyfield.defaultValue,
      surveyfield.fieldDescription,
    )
    cy.surveyPreviewWithOutData(testData.verifications.locName, testData.verifications.spacName)
    cy.createSurvey('updated')
    cy.goToSurvey(survey.name)
    cy.surveyPreviewWithData(
      testData.verifications.locName,
      testData.verifications.spacName,
      survey.name,
    )
    cy.verifyTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.goToLocationsMenu()
    cy.selectCreatedLocation(location.name)
    cy.goToCreatedSpace(space.name, space.name)
    cy.goToCreatedSpaces(space.name, space.name)
    cy.spacePreviewWithAllData(location.name, space.name, survey.name)
    cy.verifySpaceTextField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.verifySpaceNumberField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.verifyDropDownField(surveyfield.defaultValue, surveyfield.fieldDescription)
    cy.verifyCheckBoxField(
      surveyfield.defaultValue,
      surveyfield.fieldDescription,
      surveyfield.defaultValue,
    )
    cy.archiveLocation(token, locId, false)
  })
})
