import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('It verifies updating tickets by viewer login', () => {
  let testData, locId, issueId, spacId, token, Url
  let staffID, groupID, viewerId, procedureId, viewerEmailUpdated, newID, newViewerID

  const ticket = dataUtils.mockTicketDetails()
  const location = dataUtils.createMockLocation()
  const space = dataUtils.createMockSpace()
  const issue = dataUtils.createMockIssue()
  const locLat = location.longitude.toString()
  const locLong = location.latitude.toString()
  const orgDetails = dataUtils.createMockOrganization()
  const group = dataUtils.createMockeGroup()
  const user = dataUtils.createMockUser()
  const viewerName = user.name + 'viewer'
  const userEmail = 'viewer' + user.email
  const viewerMail = userEmail.toString()
  const procedure = dataUtils.mockProcedureDetails()

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

  it('It verifies viewer user without and with tickets assigned', () => {
    cy.issueCreation(token, issue.name, issue.description)
      .then((issueID) => {
        issueId = issueID
        return cy.locationCreation(token, location.name, locLat, locLong)
      })
      .then((locationId) => {
        locId = locationId
        return cy.spaceCreation(token, space.name, space.description, issueId, true, locationId)
      })
      .then((spaceId) => {
        spacId = spaceId

        return cy.createUser(token, user.name, user.email, user.mobileNumber, 'STAFF', locId)
      })
      .then((userId) => {
        staffID = userId
        return cy.createGroup(token, group.name, userId, spacId)
      })
      .then((groupId) => {
        groupID = groupId
        return cy.get('@groupId')
      })
      .then((newGroup) => {
        newID = newGroup
      })
      .then(() => {
        return cy.createUser(token, viewerName, viewerMail, user.mobileNumber, 'VIEWER', locId)
      })
      .then((viewerId) => {
        newViewerID = viewerId
      })
    cy.reload()
    cy.clcikOnCreateTicketBtn()
    cy.verifyTicketsPage()
    cy.enterTicketdetails(ticket.title, ticket.description, location.name, space.name, issue.name)
    cy.clickOnCreateTicketButton()
    cy.verifySuccessAlert('created')
    cy.login(testData.verifications.loginTxt, Url, viewerMail, env_creds.password)
    cy.verifyLoginIsSuccessful(viewerName)
    cy.verifyloggedInUserRole('viewer')
    cy.verifyAndValidateViewerUserScreenDetails(viewerName, viewerMail, testData.password)
    cy.clickOnProfileBtn()
    cy.verifyUpdatedDetials(viewerName, viewerMail)
    cy.get('@updatedViewerMail').then((updatedViewerMail) => {
      viewerEmailUpdated = updatedViewerMail
    })

    cy.verifyViewerUserPerimissions()
    cy.selectLocationInViewerScreen(location.name)
    cy.goToTicketMenu()
    cy.verifyPoPage('Tickets')
    cy.verifyTicketPresence(ticket.title)

    cy.createProcedure(token, procedure.internalTitle, procedure.procedureTitle).then((procId) => {
      procedureId = procId
    })
    cy.get('@groupId').then((newGroup) => {
      cy.get('@userId').then((userId) => {
        cy.updateGroup(token, newGroup, userId)
      })
    })
    cy.clearLocalStorage()
    cy.clearAllSessionStorage()
    cy.get('@updatedViewerMail').then((updatedViewerMail) => {
      cy.login(testData.verifications.loginTxt, Url, updatedViewerMail, testData.password)
    })
    cy.verifyloggedInUserRole('viewer')
    cy.goToTicketMenu()
    cy.verifyPoPage('Tickets')
    cy.clickOnCreatedTicket(ticket.title)
    cy.addProcedureInTicket(procedure.procedureTitle)
    cy.updateComments()
  })
})
