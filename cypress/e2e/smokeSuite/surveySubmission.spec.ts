/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test generates and validate data from survey forms with several fields.
 * Verifies how surveys with and without required fields can be submitted through the Portal.
 * Verifies submitted surveys in Admin user.
 */

import { faker } from '@faker-js/faker'
import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('submit survey with all field types', () => {
  let testData, token, locId, issueId, Url, portalUrl

  const inputFields = ['Text', 'Number', 'Multi-line text', 'Checkbox', 'Drop-down']
  const location = dataUtils.createMockLocation()
  const survey = dataUtils.createMockSurvey()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const surveyText = dataUtils.createMockTextField()
  const surveyNumber = dataUtils.createMockNumberField()
  const surveyMultiText = dataUtils.createMockMultiTextField()
  const surveyCheckbox = dataUtils.createMockCheckBoxField()
  const surveyDropDown = dataUtils.createMockDropDownField()
  const dropDownOptions = dataUtils.createMockDropdownOptions()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const orgDetails = dataUtils.createMockOrganization()

  before(() => {
    cy.createOrganization(orgDetails.subdomainName, orgDetails.locationName)

    cy.fixture('cypress.env.json').then((config) => {
      Url = config.passwordLoginUrl.replace('${subdomain}', orgDetails.subdomainName)
      portalUrl = config.portalUrl.replace('${subdomain}', orgDetails.subdomainName)
    })

    cy.getLoginToken(orgDetails.subdomainName).then((authToken) => {
      token = authToken
    })

    cy.fixture('testData.json').then((data) => {
      testData = data
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

    cy.surveyCreation(token, survey.name, survey.name, survey.description, survey.description)
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
        cy.readFile('cypress/fixtures/surveyId.json').then((data) => {
          const surveyId = data.surveyId
          cy.addSurveyInSpace(token, space.name, space.description, locationId, surveyId, issueID)
        })
      })
    })

    cy.createSurveyWithTextField(
      token,
      surveyText.fieldTitle,
      surveyText.fieldDescription,
      surveyText.fieldHelperText,
      surveyText.fieldHelperText,
      surveyText.defaultValue,
    )

    cy.readFile('cypress/fixtures/surveyId.json').then((data) => {
      const surveyId = data.surveyId
      cy.readFile('cypress/fixtures/textId.json').then((data) => {
        const textFieldIdentity = data.textId
        cy.updateSurveyFields(token, surveyId, textFieldIdentity, true)
      })
    })

    cy.createSurveyWithNumberField(
      token,
      surveyNumber.fieldTitle,
      surveyNumber.fieldDescription,
      surveyNumber.fieldHelperText,
      surveyNumber.fieldHelperText,
      surveyNumber.defaultValue,
    )
    cy.readFile('cypress/fixtures/surveyId.json').then((data) => {
      const surveyId = data.surveyId
      cy.readFile('cypress/fixtures/numbId.json').then((data) => {
        const numericFieldId = data.numbId
        cy.updateSurveyFields(token, surveyId, numericFieldId, true)
      })
    })

    cy.createSurveyWithMultiLineTextField(
      token,
      surveyMultiText.fieldTitle,
      surveyMultiText.fieldDescription,
      surveyMultiText.fieldHelperText,
      surveyMultiText.fieldHelperText,
      surveyMultiText.defaultValue,
    )
    cy.readFile('cypress/fixtures/surveyId.json').then((data) => {
      const surveyId = data.surveyId
      cy.readFile('cypress/fixtures/longTextId.json').then((data) => {
        const multiTextId = data.longTextId
        cy.updateSurveyFields(token, surveyId, multiTextId, true)
      })
    })

    cy.createSurveyWithCheckboxField(
      token,
      surveyCheckbox.fieldTitle,
      surveyCheckbox.fieldDescription,
      surveyCheckbox.fieldHelperText,
      surveyCheckbox.fieldHelperText,
      true,
    )
    cy.readFile('cypress/fixtures/surveyId.json').then((data) => {
      const surveyId = data.surveyId
      cy.readFile('cypress/fixtures/checkId.json').then((data) => {
        const checkboxFieldId = data.checkId
        cy.updateSurveyFields(token, surveyId, checkboxFieldId, true)
      })
    })

    cy.createSurveyWithDropdownField(
      token,
      surveyDropDown.fieldTitle,
      surveyDropDown.fieldDescription,
      surveyDropDown.fieldHelperText,
      surveyDropDown.fieldHelperText,
      dropDownOptions.opt1,
      dropDownOptions.opt2,
    )
    cy.readFile('cypress/fixtures/surveyId.json').then((data) => {
      const surveyId = data.surveyId
      cy.readFile('cypress/fixtures/dropId.json').then((data) => {
        const dropdownFieldId = data.dropId
        cy.updateSurveyFields(token, surveyId, dropdownFieldId, true)
      })
    })
  })

  it('the survey form is submitted with all required fields filled', () => {
    const textInput = 'text_input_' + faker.number.float(5)
    const numberInput = faker.number.int(10000)
    const multiLineTextInput = 'multiLineText_input_' + faker.lorem.lines(3)
    const checkBoxInput = 'Yes'
    const dropDownInput = dropDownOptions.opt1
    const inputs = [textInput, numberInput, multiLineTextInput, checkBoxInput, dropDownInput]

    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.verifyloggedInUserRole('admin')
    cy.goToSurveysMenu()
    cy.removeField(survey.name, surveyDropDown.fieldTitle)
    cy.verifySuccessAlert('updated')
    cy.readFile('cypress/fixtures/surveyId.json').then((data) => {
      const surveyId = data.surveyId
      cy.readFile('cypress/fixtures/textId.json').then((data) => {
        const textFieldIdentity = data.textId
        cy.readFile('cypress/fixtures/numbId.json').then((data) => {
          const numericFieldId = data.numbId
          cy.readFile('cypress/fixtures/longTextId.json').then((data) => {
            const multiTextId = data.longTextId
            cy.readFile('cypress/fixtures/checkId.json').then((data) => {
              const checkboxFieldId = data.checkId
              cy.readFile('cypress/fixtures/dropId.json').then((data) => {
                const dropdownFieldId = data.dropId
                cy.updateSurveyWithAllFieldsQuery(
                  token,
                  surveyId,
                  survey.name,
                  survey.name,
                  survey.description,
                  survey.description,
                  textFieldIdentity,
                  numericFieldId,
                  multiTextId,
                  checkboxFieldId,
                  dropdownFieldId,
                )
              })
            })
          })
        })
      })
    })

    cy.portalLogin(portalUrl)
    cy.selectLocationAndSpaceInPortal(location.name, space.name, space.description)
    cy.clearSurveyFieldTextAndNumber(surveyText.fieldDescription)
    cy.clearSurveyFieldTextAndNumber(surveyNumber.fieldDescription)
    cy.clearSurveyFieldMultiLineText(surveyMultiText.fieldDescription)
    cy.checkIsNumberFieldAllowingStringContainsText(surveyNumber.fieldDescription)
    cy.uncheckTheCheckBox(surveyCheckbox.fieldDescription)
    cy.checkErrorMessageIfRequired(
      surveyText.fieldDescription,
      surveyText.fieldHelperText,
      location.name,
    )
    cy.checkErrorMessageIfRequired(
      surveyNumber.fieldDescription,
      surveyNumber.fieldHelperText,
      location.name,
    )
    cy.checkErrorMessageIfRequired(
      surveyMultiText.fieldDescription,
      surveyMultiText.fieldHelperText,
      location.name,
    )
    cy.checkErrorMessageIfRequiredForCheckbox(
      surveyCheckbox.fieldDescription,
      surveyCheckbox.fieldHelperText,
      location.name,
    )
    cy.checkErrorMessageIfRequiredForDropdown(
      surveyDropDown.fieldDescription,
      surveyDropDown.fieldHelperText,
      location.name,
    )
    cy.inputIntoSurveyFieldTextAndNumber(surveyText.fieldDescription, inputs[0])
    cy.inputIntoSurveyFieldTextAndNumber(surveyNumber.fieldDescription, inputs[1])
    cy.inputIntoSurveyFieldMultiLineText(surveyMultiText.fieldDescription, inputs[2])
    cy.CheckTheCheckBox(surveyCheckbox.fieldDescription)
    cy.selectInputFromDropdown(surveyDropDown.fieldDescription, inputs[4])
    cy.submitSurvey()
    cy.logoutFromPortal()
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToSurveysMenu()

    for (let i = 0; i < inputFields.length; i++) {
      cy.verifyIsSurveySubmitted(space.name, space.description, inputs[i], survey.name)
    }
    cy.logout(env_creds.username)
    cy.archiveLocation(token, locId, false)
    cy.archiveIssue(token, issueId, false)
  })
})
