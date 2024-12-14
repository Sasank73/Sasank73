/* eslint-env node, mocha */
/// <reference types="cypress"/>
import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('submit survey with each type of field', () => {
  let surveyId, textFieldIdentity, multiTextId, checkboxFieldId, dropdownFieldId, locationId, Url, portalUrl
  let testData,
    input,
    surveyDetails,
    locationDetails,
    spaceDetails,
    surveyFieldDetails,
    surveyFieldWiseDetails,
    token
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

    cy.surveyCreation(
      token,
      surveyDetails[0],
      surveyDetails[1],
      surveyDetails[0],
      surveyDetails[1],
    ).then((response) => {
      const responseData = response.body.data
      surveyId = responseData.createSurvey.id
    })
  })

  for (let i = 0; i < inputFields.length; i++) {
    it('verify is survey form submitted with out required field', () => {
      if (inputFields[i] === 'Text') {
        cy.createSurveyWithTextField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          surveyFieldDetails[1],
        ).then((response) => {
          const responseBody = response.body.data
          const createTextField = responseBody.createField
          textFieldIdentity = createTextField.id
          cy.updateSurveyFields(token, surveyId, textFieldIdentity, false)
        })
      } else if (inputFields[i] === 'Number') {
        cy.createSurveyWithNumberField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          surveyFieldWiseDetails[1][3],
        ).then((response) => {
          const createNumberField = response.body.data.createField
          const numericFieldId = createNumberField.id
          cy.updateSurveyFields(token, surveyId, numericFieldId, false)
        })
      } else if (inputFields[i] === 'Multi-line text') {
        cy.createSurveyWithMultiLineTextField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          surveyFieldDetails[1],
        ).then((response) => {
          const responseBody = response.body.data
          const createMultiLinetext = responseBody.createField
          multiTextId = createMultiLinetext.id
          cy.updateSurveyFields(token, surveyId, multiTextId, false)
        })
      } else if (inputFields[i] === 'Checkbox') {
        cy.createSurveyWithCheckboxField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          true,
        ).then((response) => {
          const createCheckboxField = response.body.data.createField
          checkboxFieldId = createCheckboxField.id
          cy.updateSurveyFields(token, surveyId, checkboxFieldId, false)
        })
      } else {
        cy.createSurveyWithDropdownField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
        ).then((response) => {
          const createDropdownField = response.body.data.createField
          dropdownFieldId = createDropdownField.id
          cy.updateSurveyFields(token, surveyId, dropdownFieldId, false)
        })
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
      const locName = location.name
      const locLat = locationDetails[1].toString()
      const locLong = locationDetails[2].toString()
      cy.locationCreation(token, locName, locLat, locLong).then((response) => {
        const createdLocation = response.body.data.createLocation
        locationId = createdLocation.id
        cy.addSurveyInSpace(token, spaceDetails[0], spaceDetails[1], true, locationId, surveyId)
      })

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
          cy.uncheckTheCheckBox(surveyFieldDetails[3])
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
        cy.uncheckTheCheckBox(surveyFieldDetails[3])
      }
      cy.submitSurvey()
      cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
      cy.verifyLoginIsSuccessful(env_creds.username)
      cy.goToSurveysMenu()
      cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], input, surveyDetails[0])
    })

    it.only('verify is survey form submitted with required field', () => {
      if (inputFields[i] === 'Text') {
        cy.createSurveyWithTextField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          surveyFieldDetails[1],
        ).then((response) => {
          const responseBody = response.body.data
          const createTextField = responseBody.createField
          textFieldIdentity = createTextField.id
          cy.updateSurveyFields(token, surveyId, textFieldIdentity, true)
        })
      } else if (inputFields[i] === 'Number') {
        cy.createSurveyWithNumberField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          surveyFieldWiseDetails[1][3],
        ).then((response) => {
          const createNumberField = response.body.data.createField
          const numericFieldId = createNumberField.id
          cy.updateSurveyFields(token, surveyId, numericFieldId, true)
        })
      } else if (inputFields[i] === 'Multi-line text') {
        cy.createSurveyWithMultiLineTextField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          surveyFieldDetails[1],
        ).then((response) => {
          const responseBody = response.body.data
          const createMultiLinetext = responseBody.createField
          multiTextId = createMultiLinetext.id
          cy.updateSurveyFields(token, surveyId, multiTextId, true)
        })
      } else if (inputFields[i] === 'Checkbox') {
        cy.createSurveyWithCheckboxField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          true,
        ).then((response) => {
          const createCheckboxField = response.body.data.createField
          checkboxFieldId = createCheckboxField.id
          cy.updateSurveyFields(token, surveyId, checkboxFieldId, true)
        })
      } else {
        cy.createSurveyWithDropdownField(
          token,
          surveyFieldDetails[0],
          surveyFieldDetails[2],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
        ).then((response) => {
          const createDropdownField = response.body.data.createField
          dropdownFieldId = createDropdownField.id
          cy.updateSurveyFields(token, surveyId, dropdownFieldId, true)
        })
      }

      if (inputFields[i] === 'Text' || inputFields[i] === 'Multi-line text') {
        input = 'Hello'
      } else if (inputFields[i] === 'Number') {
        input = '0'
      } else if (inputFields[i] === 'Drop-down') {
        input = 'Yes'
      } else {
        input = 'Yes'
      }

      const locName = location.name
      const locLat = locationDetails[1].toString()
      const locLong = locationDetails[2].toString()
      cy.locationCreation(token, locName, locLat, locLong).then((response) => {
        const createdLocation = response.body.data.createLocation
        locationId = createdLocation.id
        cy.addSurveyInSpace(token, spaceDetails[0], spaceDetails[1], true, locationId, surveyId)
      })
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
          cy.uncheckTheCheckBox(surveyFieldDetails[3])
        }

        if (
          inputFields[i] === 'Text' ||
          inputFields[i] === 'Multi-line text' ||
          inputFields[i] === 'Number'
        ) {
          cy.checkErrorMessageIfRequired(
            surveyFieldDetails[3],
            surveyFieldDetails[2],
            location.name,
          )
        } else if (inputFields[i] === 'Checkbox') {
          cy.checkErrorMessageIfRequiredForCheckbox(
            surveyFieldDetails[3],
            surveyFieldDetails[2],
            location.name,
          )
        } else {
          cy.checkErrorMessageIfRequiredForDropdown(
            surveyFieldDetails[3],
            surveyFieldDetails[2],
            location.name,
          )
        }

        if (
          inputFields[i] === 'Text' ||
          inputFields[i] === 'Multi-line text' ||
          inputFields[i] === 'Number'
        ) {
          cy.inputIntoSurveyField(
            surveyDetails[0],
            surveyDetails[1],
            surveyFieldDetails[3],
            surveyFieldDetails[2],
            input,
          )
        } else if (inputFields[i] === 'Checkbox') {
          cy.CheckTheCheckBox(surveyFieldDetails[3])
        } else {
          cy.selectInputFromDropdown(surveyFieldDetails[3], input)
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
        cy.uncheckTheCheckBox(surveyFieldDetails[3])
      }

      if (
        inputFields[i] === 'Text' ||
        inputFields[i] === 'Multi-line text' ||
        inputFields[i] === 'Number'
      ) {
        cy.checkErrorMessageIfRequired(surveyFieldDetails[3], surveyFieldDetails[2], location.name)
      } else if (inputFields[i] === 'Checkbox') {
        cy.checkErrorMessageIfRequiredForCheckbox(
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          location.name,
        )
      } else {
        cy.checkErrorMessageIfRequiredForDropdown(
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          location.name,
        )
      }

      if (
        inputFields[i] === 'Text' ||
        inputFields[i] === 'Multi-line text' ||
        inputFields[i] === 'Number'
      ) {
        cy.inputIntoSurveyField(
          surveyDetails[0],
          surveyDetails[1],
          surveyFieldDetails[3],
          surveyFieldDetails[2],
          input,
        )
      } else if (inputFields[i] === 'Checkbox') {
        cy.CheckTheCheckBox(surveyFieldDetails[3])
      } else {
        cy.selectInputFromDropdown(surveyFieldDetails[3], input)
      }

      cy.submitSurvey()
      cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
      cy.goToSurveysMenu()
      cy.verifyIsSurveySubmitted(spaceDetails[0], spaceDetails[1], input, surveyDetails[0])
    })
  }
})
