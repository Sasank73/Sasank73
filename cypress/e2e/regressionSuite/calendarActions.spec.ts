/* eslint-env node, mocha */
/// <reference types="cypress"/>

/*
 * This test examines calendar functionality for various frequencies with intervals
    a) Month
    b) Week
    c) Day
 */
import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('Calendar Actions with different frequencies', () => {
  let testData, locId, issueId, scheduler, ticket, token, Url

  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const orgDetails = dataUtils.createMockOrganization()
  ticket = dataUtils.mockTicketDetails()
  scheduler = dataUtils.scheduler()
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
    if (typeof window !== 'undefined' && window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }

    cy.login(testData.verifications.loginTxt, Url, env_creds.username, env_creds.password)
    cy.verifyLoginIsSuccessful(env_creds.username)
    cy.issueCreation(token, issue.name, issue.description).then((issueID) => {
      issueId = issueID
      cy.locationCreation(token, location.name, locLat, locLong).then((locationId) => {
        locId = locationId
        cy.spaceCreation(token, space.name, space.description, issueID, true, locationId)
      })
    })
    cy.clickOnTicketMenu()
    cy.verifyPoPage('Tickets')
    cy.verifyCreateTicketBtn()
    cy.clcikOnCreateTicketBtn()
    cy.verifyTicketCreationPage()
    cy.enterTicketdetails(ticket.title, ticket.description, location.name, space.name, issue.name)
    cy.verifySchedulePopup()
  })

  it('should create monthly ticket when using monthly interval', () => {
    cy.scheduleMonthTicket('month', scheduler.interval, scheduler.dayOfMonth)
    cy.saveSchedule()
    cy.verifyDueDate(
      testData.tikcetScheduleInfo.monthDueDateText,
      testData.tikcetScheduleInfo.monthDayValue,
    )
    cy.clickOnCreateTicketButton()
    cy.verifySuccessAlert('created')
    cy.clickOnCloseTicketButton()
    cy.clickOnCalendarBtn()
    cy.verifyMonth(scheduler.interval, scheduler.dayOfMonth, scheduler.futureDate)
    cy.verifyChildTicket(ticket.title)
  })

  it('should create weekly ticket when using weekly interval', () => {
    cy.scheduleWeekTicket('week', scheduler.interval)
    cy.verifyDueDate(
      testData.tikcetScheduleInfo.weekDueDateText,
      testData.tikcetScheduleInfo.weekDayValue,
    )
    cy.saveSchedule()
    cy.clickOnCreateTicketButton()
    cy.verifySuccessAlert('created')
    cy.clickOnCloseTicketButton()
    cy.clickOnCalendarBtn()
    cy.verifyWeek(ticket.title, scheduler.futureDate, scheduler.interval)
  })

  it('should create daily ticket when using daily interval', () => {
    cy.scheduleDay(scheduler.interval)
    cy.saveSchedule()
    cy.clickOnCreateTicketButton()
    cy.verifySuccessAlert('created')
    cy.clickOnCloseTicketButton()
    cy.clickOnCalendarBtn()
    cy.verifyDayIntervals(scheduler.interval, scheduler.futureDate, ticket.title)
  })
})
