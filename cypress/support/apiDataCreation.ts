/// <reference types="cypress"/>
import { JwtPayload } from '../../src/auth/common/types'
import { decodeJwtToken } from '../../src/common/helpers/stringUtils'
import apiData from '../utilities/apiData'

Cypress.Commands.add('getLoginToken', (subDomain) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      'x-nodafi-account-subdomain': subDomain,
    },
    body: {
      query: `mutation abc {
      staffLogin(subdomain: "${subDomain}", email: "test@nodafi.com", password: "123456") {
        token
        user {
          id
          name
          role
        }
      }
    }`,
      variables: {},
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const staffLogin = response.body.data.staffLogin
      const token = staffLogin.token
      const tokenValue = 'Bearer ' + token
      cy.writeFile('cypress/fixtures/token.json', { token: tokenValue })
      cy.wrap(tokenValue).as('authToken')
    }
  })
})

Cypress.Commands.add('createOrganization', (subDomainName, locationName) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      'x-nodafi-account-subdomain': subDomainName,
    },
    body: {
      query: apiData.createOrgQuery,
      variables: {
        data: {
          subdomain: subDomainName,
          name: subDomainName,
          locations: [{ name: locationName }],
          owner: {
            name: 'nodafi',
            email: 'test@nodafi.com',
            password: '123456',
          },
        },
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const createOrganization = responseBody.createOrganization
      const token = createOrganization.token
      cy.writeFile('cypress/fixtures/token.json', { token: token })
      cy.wrap(token).as('authToken')
    }
  })
})

Cypress.Commands.add('locationCreation', (token, locName, locLat, locLong) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.locationCreationqueryData,
      variables: {
        name: locName,
        lat: locLat,
        long: locLong,
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const createdLocation = response.body.data.createLocation
      const locId = createdLocation.id
      expect(createdLocation.name).to.equal(locName)
      expect(createdLocation.lat).to.equal(locLat)
      expect(createdLocation.long).to.equal(locLong)
      cy.wrap(locId).as('locationId')
    }
  })
})

Cypress.Commands.add(
  'spaceCreation',
  (token, spaceName, spaceDetail, issueIdentity, boolean, locationIdentity) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.spaceCreationQuery,
        variables: {
          name: spaceName,
          detail: spaceDetail,
          issues: issueIdentity,
          isUserCommentEnabled: boolean,
          location: locationIdentity,
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const expectedValue = issueIdentity
        const responseData = response.body.data
        const createSpace = responseData.createSpace
        const spcId = createSpace.id
        expect(createSpace.name).to.equal(spaceName)
        expect(createSpace.detail).to.equal(spaceDetail)
        expect(createSpace.isUserCommentEnabled).to.eq(boolean)
        expect(createSpace.location.id).to.equal(locationIdentity)
        cy.wrap(spcId).as('spaceId')
      }
    })
  },
)

Cypress.Commands.add(
  'updateSpaceWithIssue',
  (token, spaceId, locationId, boolean, IssueOne, IssueTwo, commentBoolean) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.updateSpaceWithIssueQuery,
        variables: {
          id: spaceId,
          location: locationId,
          isUserCommentEnabled: boolean,
          parentSpace: null,
          childSpaces: [],
          issues: [IssueOne, IssueTwo],
          survey: null,
          submissionSettings: {
            ticketSubmissionSettings: {
              isCaptchaRequired: false,
              formData: { images: false, comments: commentBoolean },
              submitterConfiguration: {
                isAuthenticationRequired: false,
                userData: { requirementType: 'NONE' },
              },
            },
          },
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseData = response.body.data
        const updateSpace = responseData.updateSpace
        expect(updateSpace.id).to.equal(spaceId)
        expect(updateSpace.isUserCommentEnabled).to.eq(boolean)
        expect(updateSpace.location.id).to.equal(locationId)
        expect(updateSpace.location.id).to.equal(locationId)
        expect(updateSpace.issues[0].id).to.equal(IssueOne)
        expect(updateSpace.issues[1].id).to.equal(IssueTwo)
      }
    })
  },
)

Cypress.Commands.add('spaceUpdate', (token, spaceId) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.getUserfieldSetId,
      variables: {
        id: spaceId,
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseData = response.body.data
      const updatedSpace = responseData.updateSpace
      const submissionSettings = updatedSpace.submissionSettings
      const ticketSubmissionSettings = submissionSettings.ticketSubmissionSettings
      const attribute = ticketSubmissionSettings.attributes
      const submitterConfiguration = attribute.submitterConfiguration
      const attrbutes = submitterConfiguration.attributes
      const userData = attrbutes.userData
      const value = userData.value
      const userFieldSet = value.userFieldSet
      const userFieldSetID = userFieldSet.id
      expect(updatedSpace.id).to.equal(spaceId)
      cy.wrap(userFieldSetID).as('uFSId')
    }
  })
})

Cypress.Commands.add(
  'conatctInfo',
  (token, spaceId, spaceName, locationIdentity, issueIdentity, contactInfo, fieldSetId) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.spaceUpdateQuery,
        variables: {
          id: spaceId,
          name: spaceName,
          location: locationIdentity,
          isUserCommentEnabled: true,
          issues: [issueIdentity],
          submissionSettings: {
            ticketSubmissionSettings: {
              isCaptchaRequired: false,
              formData: { images: false, comments: true },
              submitterConfiguration: {
                isAuthenticationRequired: false,
                userData: {
                  requirementType: contactInfo,
                  userFieldSetId: fieldSetId,
                },
              },
            },
          },
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseData = response.body.data
        const updatedSpace = responseData.updateSpace
        const submissionSettings = updatedSpace.submissionSettings
        const ticketSubmissionSettings = submissionSettings.ticketSubmissionSettings
        const submitterConfiguration = ticketSubmissionSettings.submitterConfiguration
        expect(updatedSpace.id).to.equal(spaceId)
        expect(updatedSpace.name).to.equal(spaceName)
        expect(updatedSpace.location).to.equal(locationIdentity)
        expect(updatedSpace.isUserCommentEnabled).to.be.true
        expect(submitterConfiguration.isAuthenticationRequired).to.be.false
        expect(submitterConfiguration.userData.requirementType).to.equal(contactInfo)
      }
    })
  },
)

Cypress.Commands.add('issueCreation', (token, issName, IssDesc) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.issueCreationQuery,
      variables: {
        name: issName,
        description: IssDesc,
        spaces: [],
        assets: [],
        userCommentRequired: true,
        useDescriptionAsTitle: false,
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseData = response.body.data
      const createIssue = responseData.createIssue
      const issueID = createIssue.id
      expect(createIssue.name).to.equal(issName)
      expect(createIssue.description).to.equal(IssDesc)
      expect(createIssue.userCommentRequired).to.be.true
      expect(createIssue.useDescriptionAsTitle).to.be.false
      cy.wrap(issueID).as('issueID')
    }
  })
})

Cypress.Commands.add(
  'surveyCreation',
  (token, IntrnlTitle, ExtTitle, IntrnlDescription, ExtDesc) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createSurveyQuery,
        variables: {
          internalTitle: IntrnlTitle,
          externalTitle: ExtTitle,
          internalDescription: IntrnlDescription,
          externalDescription: ExtDesc,
          fieldSetItems: [],
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body && response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseData = response.body.data
        const createSurvey = responseData.createSurvey
        const survID = createSurvey.id
        expect(createSurvey.internalTitle).to.equal(IntrnlTitle)
        expect(createSurvey.externalTitle).to.equal(ExtTitle)
        expect(createSurvey.internalDescription).to.equal(IntrnlDescription)
        expect(createSurvey.externalDescription).to.equal(ExtDesc)
        cy.writeFile('cypress/fixtures/surveyId.json', { surveyId: survID })
      }
    })
  },
)

Cypress.Commands.add('updateSurveyFields', (token, survyId, fldId, isRequiredBoolean) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.updateSurveyCustomFieldQuery,
      variables: {
        id: survyId,
        fieldSetItems: [
          {
            fieldId: fldId,
            isRequired: isRequiredBoolean,
          },
        ],
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    }
  })
})

Cypress.Commands.add(
  'updateSurveyWithAllFieldsQuery',
  (
    token,
    survyId,
    IntrnlTitle,
    ExtTitle,
    IntrnlDescription,
    ExtDesc,
    txtID,
    numbID,
    longTextID,
    checkBxID,
    drpdnID,
  ) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.updateSurveyWithAllFieldsQuery,
        variables: {
          id: survyId,
          internalTitle: IntrnlTitle,
          externalTitle: ExtTitle,
          internalDescription: IntrnlDescription,
          externalDescription: ExtDesc,
          fieldSetItems: [
            { fieldId: txtID, isRequired: true },
            { fieldId: numbID, isRequired: true },
            { fieldId: longTextID, isRequired: true },
            { fieldId: checkBxID, isRequired: true },
            { fieldId: drpdnID, isRequired: true },
          ],
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      }
    })
  },
)

Cypress.Commands.add(
  'createSurveyWithTextField',
  (token, intTitle, extTitle, intDesc, extDesc, dfltText) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createSurveywithTextFieldquery,
        variables: {
          internalTitle: intTitle,
          externalTitle: extTitle,
          internalDescription: intDesc,
          externalDescription: extDesc,
          type: 'TEXT',
          key: intTitle,
          resourceIdentifier: 'SURVEY',
          defaultText: dfltText,
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseData = response.body.data
        const createTextField = responseData.createField
        const txtFieldId = createTextField.id
        expect(createTextField.internalTitle).to.equal(intTitle)
        expect(createTextField.externalTitle).to.equal(extTitle)
        expect(createTextField.internalDescription).to.equal(intDesc)
        expect(createTextField.externalDescription).to.equal(extDesc)
        expect(createTextField.type).to.equal('TEXT')
        expect(createTextField.defaultText).to.equal(dfltText)
        cy.writeFile('cypress/fixtures/textId.json', { textId: txtFieldId })
      }
    })
  },
)

Cypress.Commands.add(
  'createSurveyWithMultiLineTextField',
  (token, intTitle, extTitle, intDesc, extDesc, dfltText) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createSurveyWithMultiTextFieldQuery,
        variables: {
          internalTitle: intTitle,
          externalTitle: extTitle,
          internalDescription: intDesc,
          externalDescription: extDesc,
          type: 'LONG_TEXT',
          resourceIdentifier: 'SURVEY',
          defaultLongText: dfltText,
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createMultiLinetext = responseBody.createField
        const mlTxtFieldId = createMultiLinetext.id
        expect(createMultiLinetext.internalTitle).to.equal(intTitle)
        expect(createMultiLinetext.externalTitle).to.equal(extTitle)
        expect(createMultiLinetext.internalDescription).to.equal(intDesc)
        expect(createMultiLinetext.externalDescription).to.equal(extDesc)
        expect(createMultiLinetext.type).to.equal('LONG_TEXT')
        cy.writeFile('cypress/fixtures/longTextId.json', { longTextId: mlTxtFieldId })
      }
    })
  },
)

Cypress.Commands.add(
  'createSurveyWithNumberField',
  (token, intTitle, extTitle, intDesc, extDesc, dfltNumber) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createSurveyWithNumberQuery,
        variables: {
          internalTitle: intTitle,
          externalTitle: extTitle,
          internalDescription: intDesc,
          externalDescription: extDesc,
          type: 'NUMERIC',
          resourceIdentifier: 'SURVEY',
          defaultNumber: dfltNumber,
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createNumberField = responseBody.createField
        const numId = createNumberField.id
        expect(createNumberField.internalTitle).to.equal(intTitle)
        expect(createNumberField.externalTitle).to.equal(extTitle)
        expect(createNumberField.internalDescription).to.equal(intDesc)
        expect(createNumberField.externalDescription).to.equal(extDesc)
        expect(createNumberField.type).to.equal('NUMERIC')
        cy.writeFile('cypress/fixtures/numbId.json', { numbId: numId })
      }
    })
  },
)

Cypress.Commands.add(
  'createSurveyWithCheckboxField',
  (token, intTitle, extTitle, intDesc, extDesc, dfltBoolean) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createSurveyWithCheckboxField,
        variables: {
          internalTitle: intTitle,
          externalTitle: extTitle,
          internalDescription: intDesc,
          externalDescription: extDesc,
          type: 'BINARY',
          resourceIdentifier: 'SURVEY',
          defaultBoolean: dfltBoolean,
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createCheckboxField = responseBody.createField
        const chkId = createCheckboxField.id
        expect(createCheckboxField.internalTitle).to.equal(intTitle)
        expect(createCheckboxField.externalTitle).to.equal(extTitle)
        expect(createCheckboxField.internalDescription).to.equal(intDesc)
        expect(createCheckboxField.externalDescription).to.equal(extDesc)
        expect(createCheckboxField.type).to.equal('BINARY')
        cy.writeFile('cypress/fixtures/checkId.json', { checkId: chkId })
      }
    })
  },
)

Cypress.Commands.add(
  'createSurveyWithDropdownField',
  (token, intTitle, extTitle, intDesc, extDesc, drp1, drp2) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createSurveyWithDropdownQuery,
        variables: {
          internalTitle: intTitle,
          externalTitle: extTitle,
          internalDescription: intDesc,
          externalDescription: extDesc,
          type: 'PICKLIST',
          resourceIdentifier: 'SURVEY',
          pickerOptions: [
            {
              internalTitle: drp1,
              externalTitle: drp1,
              internalDescription: drp1,
              externalDescription: drp1,
              identifier: drp1,
              iconName: '',
              iconColor: '#79cc68',
              isActive: true,
              position: 0,
            },
            {
              internalTitle: drp2,
              externalTitle: drp2,
              internalDescription: drp2,
              externalDescription: drp2,
              identifier: drp2,
              iconName: '',
              iconColor: '#e51515',
              isActive: true,
              position: 1,
            },
          ],
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createDropdownField = responseBody.createField
        const drpId = createDropdownField.id
        expect(createDropdownField.internalTitle).to.equal(intTitle)
        expect(createDropdownField.externalTitle).to.equal(extTitle)
        expect(createDropdownField.internalDescription).to.equal(intDesc)
        expect(createDropdownField.externalDescription).to.equal(extDesc)
        expect(createDropdownField.type).to.equal('PICKLIST')
        cy.writeFile('cypress/fixtures/dropId.json', { dropId: drpId })
      }
    })
  },
)

Cypress.Commands.add(
  'addSurveyInSpace',
  (token, spaceName, spaceDetail, locationIdentity, surveyID, issueID) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.addSurveyInSpaceQuery,
        variables: {
          name: spaceName,
          detail: spaceDetail,
          location: locationIdentity,
          isUserCommentEnabled: true,
          survey: surveyID,
          issues: [issueID],
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createSurveyInSurvey = responseBody.createSpace
        expect(createSurveyInSurvey.name).to.equal(spaceName)
        expect(createSurveyInSurvey.detail).to.equal(spaceDetail)
        expect(createSurveyInSurvey.isUserCommentEnabled).to.be.true
      }
    })
  },
)

Cypress.Commands.add('archiveLocation', (token, locationID, boolean) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archiveLocationQuery,
      variables: {
        id: locationID,
        isActive: boolean,
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updateLocation = responseBody.updateLocation
      expect(updateLocation.id).to.equal(locationID)
      expect(updateLocation.isActive).to.equal(boolean)
    }
  })
})

Cypress.Commands.add('archiveIssue', (token, issueID, boolean) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archiveIssueQuery,
      variables: {
        id: issueID,
        isActive: boolean,
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updateIssue = responseBody.updateIssue
      expect(updateIssue.id).to.equal(issueID)
      expect(updateIssue.isActive).to.equal(boolean)
    }
  })
})

Cypress.Commands.add('createAsset', (token, assetName, assetdesc, locationId) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.createAssetQuery,
      variables: {
        name: assetName,
        description: assetdesc,
        location: locationId,
        isActive: true,
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const createAsset = responseBody.createAsset
      const asetId = createAsset.id
      expect(createAsset.name).to.equal(assetName)
      expect(createAsset.description).to.equal(assetdesc)
      expect(createAsset.isActive).to.be.true
      cy.wrap(asetId).as('assetId')
    }
  })
})

Cypress.Commands.add('createSmartCode', (token, resourceName, locationId) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.createSmartCodeQuery,
      variables: {
        data: {
          resourceIdentifier: resourceName,
          type: 'RESOURCE',
          resourceRecordId: locationId,
        },
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const createSmartCode = responseBody.createSmartCode
      const smartCodId = createSmartCode.id
      cy.wrap(smartCodId).as('smartId')
    }
  })
})

Cypress.Commands.add('archiveAsset', (token, assetID, booleanVal) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archiveAssetQuery,
      variables: { id: assetID, isActive: booleanVal },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updateAsset = responseBody.updateAsset
      expect(updateAsset.id).to.equal(assetID)
      expect(updateAsset.isActive).to.equal(booleanVal)
    }
  })
})

Cypress.Commands.add('createAPart', (token, partName, partDesc, unitPrice, inStock, minmStock) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.createPartQuery,
      variables: {
        name: partName,
        description: partDesc,
        pricePerUnit: unitPrice,
        unitsInStock: inStock,
        minimumUnitsInStock: minmStock,
        location: null,
        space: null,
        defaultAssignedGroup: null,
        assets: [],
        isActive: true,
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const createPart = responseBody.createPart
      const id = createPart.id
      expect(createPart.name).to.equal(partName)
      expect(createPart.description).to.equal(partDesc)
      expect(createPart.pricePerUnit).to.equal(unitPrice)
      expect(createPart.unitsInStock).to.equal(inStock)
      expect(createPart.minimumUnitsInStock).to.equal(minmStock)
      expect(createPart.isActive).to.be.true
      cy.wrap(id).as('partId')
    }
  })
})

Cypress.Commands.add('archivePart', (token, partID, booleanVal) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archivePartQuery,
      variables: { id: partID, isActive: booleanVal },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updatePart = responseBody.updatePart
      expect(updatePart.id).to.equal(partID)
      expect(updatePart.isActive).to.equal(booleanVal)
    }
  })
})

Cypress.Commands.add('archivePO', (token, poID, booleanVal) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archivePoQuery,
      variables: { id: poID, isActive: booleanVal },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updatePart = responseBody.updatePart
    }
  })
})

Cypress.Commands.add(
  'createVendor',
  (token, vendorName, vendorDesc, vendorUserName, vendorMail, phoneNumber, locationId, assetId) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createVendorQuery,
        variables: {
          name: vendorName,
          description: vendorDesc,
          url: null,
          memberships: [
            {
              createUserInput: {
                role: 'VENDOR',
                name: vendorUserName,
                email: vendorMail,
                phone: phoneNumber,
                locationIds: [locationId],
              },
            },
          ],
          locations: [locationId],
          assets: [assetId],
          typeIdentifier: 'VENDOR',
          usersWhere: { isActive: true, role: { equals: 'VENDOR' } },
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createExtOrg = responseBody.createExternalOrganization
        const id = createExtOrg.id
        expect(createExtOrg.name).to.equal(vendorName)
        expect(createExtOrg.description).to.equal(vendorDesc)
        const memberships = createExtOrg.memberships
        const user = memberships[0].user
        expect(user.name).to.equal(vendorUserName)
        expect(user.email).to.equal(vendorMail)
        expect(user.phone).to.equal(phoneNumber)
        expect(user.isActive).to.be.true
        cy.wrap(id).as('vendorId')
      }
    })
  },
)

Cypress.Commands.add('archiveVendor', (token, partID, booleanVal) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archiveVendorQuery,
      variables: { id: partID, isActive: booleanVal },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updateExternalOrganization = responseBody.updateExternalOrganization
      expect(updateExternalOrganization.id).to.equal(partID)
    }
  })
})

Cypress.Commands.add(
  'createCustomer',
  (
    token,
    customerName,
    customerDesc,
    customerUserName,
    customerMail,
    phoneNumber,
    locationId,
    assetId,
  ) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createCustomerQuery,
        variables: {
          name: customerName,
          description: customerDesc,
          url: null,
          memberships: [
            {
              createUserInput: {
                role: 'END_USER',
                name: customerUserName,
                email: customerMail,
                phone: phoneNumber,
                locationIds: [locationId],
              },
            },
          ],
          locations: [locationId],
          assets: [assetId],
          typeIdentifier: 'CUSTOMER',
          usersWhere: { isActive: true, role: { equals: 'END_USER' } },
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createExtOrg = responseBody.createExternalOrganization
        const id = createExtOrg.id
        expect(createExtOrg.name).to.equal(customerName)
        expect(createExtOrg.description).to.equal(customerDesc)
        const memberships = createExtOrg.memberships
        const user = memberships[0].user
        expect(user.name).to.equal(customerUserName)
        expect(user.email).to.equal(customerMail)
        expect(user.phone).to.equal(phoneNumber)
        expect(user.isActive).to.be.true
        cy.wrap(id).as('customerId')
      }
    })
  },
)

Cypress.Commands.add('archiveCustomer', (token, partID, booleanVal) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archiveCustomerQuery,
      variables: { id: partID, isActive: booleanVal },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updateExternalOrganization = responseBody.updateExternalOrganization
      expect(updateExternalOrganization.id).to.equal(partID)
      expect(updateExternalOrganization.isActive).to.equal(booleanVal)
    }
  })
})

Cypress.Commands.add('createProcedure', (token, internlTitle, procedureTitle) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.createProcedureQuery,
      variables: {
        input: {
          data: {
            assignedAssets: [],
            assignedGroups: [],
            assignedLocations: [],
            form: {
              sections: [
                {
                  create: {
                    formElements: [
                      {
                        create: {
                          position: 0,
                          type: 'FIELD_ITEM',
                          formField: {
                            isRequired: true,
                            field: {
                              create: {
                                internalTitle: internlTitle,
                                internalDescription: '',
                                externalDescription: '',
                                externalTitle: internlTitle,
                                resourceIdentifier: 'PROCEDURE',
                                type: 'TEXT',
                              },
                            },
                          },
                        },
                      },
                    ],
                    internalDescription: '',
                    internalTitle: 'New section',
                    position: 0,
                  },
                },
              ],
            },
            internalDescription: '',
            internalTitle: procedureTitle,
          },
        },
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const createProcedureTemplate = responseBody.createProcedureTemplate
      const id = createProcedureTemplate.id
      expect(createProcedureTemplate.internalTitle).to.equal(procedureTitle)
      cy.wrap(id).as('procId')
    }
  })
})

Cypress.Commands.add('archiveProcdure', (token, booleanVal, partID) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archiveProcedureQuery,
      variables: {
        input: { data: { isActive: booleanVal }, where: { id: partID } },
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updateProcedureTemplate = responseBody.updateProcedureTemplate
      expect(updateProcedureTemplate.id).to.equal(partID)
      expect(updateProcedureTemplate.isActive).to.equal(booleanVal)
    }
  })
})

Cypress.Commands.add(
  'createUser',
  (token, userName, userEmail, phoneNumber, roleName, locationId) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createUserQuery,
        variables: {
          name: userName,
          email: userEmail,
          phone: phoneNumber,
          role: roleName,
          locations: [locationId],
          password: '123456',
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createUser = responseBody.createUser
        const id = createUser.id
        expect(createUser.name).to.equal(userName)
        expect(createUser.email).to.equal(userEmail)
        expect(createUser.role).to.equal(roleName)
        expect(createUser.isActive).to.be.true
        cy.wrap(id).as('userId')
      }
    })
  },
)

Cypress.Commands.add('archiveUser', (token, partID, booleanVal) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archiveUserQuery,
      variables: { id: partID, isActive: booleanVal },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updateUser = responseBody.updateUser
      expect(updateUser.id).to.equal(partID)
      expect(updateUser.isActive).to.equal(booleanVal)
    }
  })
})

Cypress.Commands.add('createGroup', (token, groupName, userId, spaceId) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.createGroupQuery,
      variables: {
        name: groupName,
        description: '',
        members: [userId],
        defaultSpaces: [spaceId],
        defaultIssues: [],
        defaultSpaceTypes: [],
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const createGroup = responseBody.createGroup
      const id = createGroup.id
      expect(createGroup.name).to.equal(groupName)
      expect(createGroup.isActive).to.be.true
      cy.wrap(id).as('groupId')
    }
  })
})

Cypress.Commands.add('archiveGroup', (token, partID, booleanVal) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.archiveGroupQuery,
      variables: { id: partID, isActive: booleanVal },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updateGroup = responseBody.updateGroup
      expect(updateGroup.id).to.equal(partID)
      expect(updateGroup.isActive).to.equal(booleanVal)
    }
  })
})

Cypress.Commands.add('createCustomTextField', (token, intTitle, extTitle, extDesc, textdefault) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.createCustomTextFieldQuery,
      variables: {
        internalTitle: intTitle,
        externalTitle: extTitle,
        internalDescription: extDesc,
        externalDescription: extDesc,
        type: 'TEXT',
        resourceIdentifier: 'TICKET',
        defaultText: textdefault,
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const createField = responseBody.createField
      expect(createField.internalTitle).to.equal(intTitle)
      expect(createField.externalTitle).to.equal(extTitle)
      expect(createField.internalDescription).to.equal(extDesc)
      expect(createField.externalDescription).to.equal(extDesc)
      expect(createField.defaultText).to.equal(textdefault)
    }
  })
})

Cypress.Commands.add(
  'createCustomMultiTextField',
  (token, intTitle, extTitle, extDesc, textdefault) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createCustomMultiTextFieldQuery,
        variables: {
          internalTitle: intTitle,
          externalTitle: extTitle,
          internalDescription: extDesc,
          externalDescription: extDesc,
          type: 'LONG_TEXT',
          resourceIdentifier: 'TICKET',
          defaultLongText: textdefault,
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createField = responseBody.createField
        expect(createField.internalTitle).to.equal(intTitle)
        expect(createField.externalTitle).to.equal(extTitle)
        expect(createField.internalDescription).to.equal(extDesc)
        expect(createField.externalDescription).to.equal(extDesc)
        expect(createField.defaultLongText).to.equal(textdefault)
      }
    })
  },
)

Cypress.Commands.add(
  'createCustomNumberField',
  (token, intTitle, extTitle, extDesc, numdefault) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createCustomNumberFieldQuery,
        variables: {
          internalTitle: intTitle,
          externalTitle: extTitle,
          internalDescription: extDesc,
          externalDescription: extDesc,
          type: 'NUMERIC',
          resourceIdentifier: 'TICKET',
          defaultNumber: numdefault,
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createField = responseBody.createField
        expect(createField.internalTitle).to.equal(intTitle)
        expect(createField.externalTitle).to.equal(extTitle)
        expect(createField.internalDescription).to.equal(extDesc)
        expect(createField.externalDescription).to.equal(extDesc)
        expect(createField.defaultNumber).to.equal(numdefault)
      }
    })
  },
)

Cypress.Commands.add('createCustomCheckboxField', (token, intTitle, extTitle, extDesc, bolean) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.createCustomCheckboxFieldQuery,
      variables: {
        internalTitle: intTitle,
        externalTitle: extTitle,
        internalDescription: extDesc,
        externalDescription: extDesc,
        type: 'BINARY',
        resourceIdentifier: 'TICKET',
        defaultBoolean: bolean,
      },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const createField = responseBody.createField
      expect(createField.internalTitle).to.equal(intTitle)
      expect(createField.externalTitle).to.equal(extTitle)
      expect(createField.internalDescription).to.equal(extDesc)
      expect(createField.externalDescription).to.equal(extDesc)
      expect(createField.defaultBoolean).to.equal(bolean)
    }
  })
})

Cypress.Commands.add(
  'createCustomDropdownField',
  (token, intTitle, extTitle, extDesc, firstOp, firstOpId, secondOp, secondOpId) => {
    cy.request({
      method: 'POST',
      url: apiData.endPointUrl,
      headers: {
        'Content-Type': apiData.format,
        Authorization: token,
        'x-nodafi-account-id':
          decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
      },
      body: {
        query: apiData.createCustomDropdownFieldQuery,
        variables: {
          internalTitle: intTitle,
          externalTitle: extTitle,
          internalDescription: extDesc,
          externalDescription: extDesc,
          type: 'PICKLIST',
          resourceIdentifier: 'TICKET',
          pickerOptions: [
            {
              internalTitle: firstOp,
              externalTitle: firstOp,
              internalDescription: firstOp,
              externalDescription: firstOp,
              identifier: firstOpId,
              iconName: '',
              iconColor: '#d51919',
              isActive: true,
              position: 0,
            },
            {
              internalTitle: secondOp,
              externalTitle: secondOp,
              internalDescription: secondOp,
              externalDescription: secondOp,
              identifier: secondOpId,
              iconName: '',
              iconColor: '#5ad421',
              isActive: true,
              position: 1,
            },
          ],
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      if (response.body.errors) {
        response.body.errors.forEach((error, index) => {
          cy.log(`Error ${index + 1}: ${error.message}`)
        })
      } else {
        const responseBody = response.body.data
        const createField = responseBody.createField
        expect(createField.internalTitle).to.equal(intTitle)
        expect(createField.externalTitle).to.equal(extTitle)
        expect(createField.internalDescription).to.equal(extDesc)
        expect(createField.externalDescription).to.equal(extDesc)
      }
    })
  },
)

Cypress.Commands.add('updateGroup', (token, groupID, memberId) => {
  cy.request({
    method: 'POST',
    url: apiData.endPointUrl,
    headers: {
      'Content-Type': apiData.format,
      Authorization: token,
      'x-nodafi-account-id':
        decodeJwtToken<JwtPayload>((token ?? '') as string)?.organizationId ?? '',
    },
    body: {
      query: apiData.updateGroupQuery,
      variables: { id: groupID, members: [memberId] },
    },
  }).then((response) => {
    expect(response.status).to.equal(200)
    if (response.body.errors) {
      response.body.errors.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error.message}`)
      })
    } else {
      const responseBody = response.body.data
      const updateGroup = responseBody.updateGroup
      expect(updateGroup.id).to.equal(groupID)
      const member = updateGroup.members[0]
      expect(member.id).to.equal(memberId)
    }
  })
})
