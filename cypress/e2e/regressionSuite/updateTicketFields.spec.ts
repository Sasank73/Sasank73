/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test validates the state of ticket fields in edit screen.
 */

import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('create & edit ticket fields', () => {
  let testData, asetTwoId, customerTwoId, procedureId, Url
  let locId, asetOneId, spacId, issueId, ticket, vendorOneId, customerOneId, vendorTwoId
  let user, group, usrId, gropId, userEmail, ticketTitle, token

  ticket = dataUtils.mockTicketDetails()
  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const orgDetails = dataUtils.createMockOrganization()
  user = dataUtils.createMockUser()
  userEmail = user.email.toString()
  group = dataUtils.createMockeGroup()

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

  beforeEach(() => {
    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.goToTicketMenu()
    cy.verifyPoPage('Tickets')
  })

  it('creating pre-requisite data with api', () => {
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
        cy.spaceCreation(token, space.name, space.description, issueID, true, locationId).then(
          (spaceId) => {
            spacId = spaceId
          },
        )
      })
    })

    cy.get('@locationId').then((loctnId) => {
      cy.get('@spaceId').then((spcId) => {
        cy.createUser(token, user.name, userEmail, user.phoneNumber, 'STAFF', loctnId).then(
          (userId) => {
            usrId = userId
            cy.createGroup(token, group.name, userId, spcId).then((groupId) => {
              gropId = groupId
            })
          },
        )
      })
    })
  })

  it('creating a new ticket through admin user', () => {
    const asset = dataUtils.createMockAsset()
    const vendor = dataUtils.getVendorDetails()
    const customer = dataUtils.getCustomerDetails()
    const scheduler = dataUtils.scheduler()
    cy.createAsset(token, asset.name, asset.description, locId).then((assetId) => {
      asetOneId = assetId
      cy.createVendor(
        token,
        vendor.name,
        vendor.desc,
        vendor.userName,
        vendor.email,
        vendor.mobileNumber,
        locId,
        asetOneId,
      ).then((vendorId) => {
        vendorOneId = vendorId
      })

      cy.createCustomer(
        token,
        customer.name,
        customer.desc,
        customer.userName,
        customer.email,
        customer.mobileNumber,
        locId,
        asetOneId,
      ).then((customerId) => {
        customerOneId = customerId
      })
    })
    cy.reload()
    cy.clcikOnCreateTicketBtn()
    cy.verifyTicketCreationPage()
    cy.enterTicketdetails(ticket.title, ticket.description, location.name, space.name, issue.name)
    cy.fillticketDeatils('Low', asset.name, vendor.name)
    cy.verifySchedulePopup()
    cy.scheduleDay(scheduler.interval)
    cy.saveSchedule()
    cy.clickOnCreateTicketButton()
    cy.verifySuccessAlert('created')
  })

  it('editing/updating ticket fields in the ticket screen', () => {
    const asset = dataUtils.createMockAsset()
    const vendor = dataUtils.getVendorDetails()
    const customer = dataUtils.getCustomerDetails()
    const scheduler = dataUtils.scheduler()
    const procedure = dataUtils.mockProcedureDetails()
    cy.createAsset(token, asset.name, asset.description, locId).then((assetId) => {
      asetTwoId = assetId
      cy.createVendor(
        token,
        vendor.name,
        vendor.desc,
        vendor.userName,
        vendor.email,
        vendor.mobileNumber,
        locId,
        asetTwoId,
      ).then((vendorId) => {
        vendorTwoId = vendorId
      })

      cy.createCustomer(
        token,
        customer.name,
        customer.desc,
        customer.userName,
        customer.email,
        customer.mobileNumber,
        locId,
        asetTwoId,
      ).then((customerId) => {
        customerTwoId = customerId
      })
    })

    cy.createProcedure(token, procedure.internalTitle, procedure.procedureTitle).then((procId) => {
      procedureId = procId
    })
    cy.selectCreatedTicket(ticket.title)
    cy.verifyAssignedGroupUser(group.name, user.name)
    cy.fillticketDeatils('High', asset.name, vendor.name)
    cy.clickOnTcketBody()
    cy.verifySchedulePopup()
    cy.clickOnScheduleToggleButton()
    cy.scheduleWeekTicket('week', scheduler.interval)
    cy.verifyDueDate(
      testData.tikcetScheduleInfo.weekDueDateText,
      testData.tikcetScheduleInfo.weekDayValue,
    )
    cy.saveSchedule()
    cy.selectTestWatcher(customer.email, ticket.title)
  })
})
