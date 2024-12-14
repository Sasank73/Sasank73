import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('update tickets with staff user', () => {
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
    const staffName = user.name + 'staff'
    const userEmail = 'staff' + user.email
    const staffMail = userEmail.toString()
    const procedure = dataUtils.mockProcedureDetails()
    const asset = dataUtils.createMockAsset()

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
        cy.issueCreation(token, issue.name, issue.description)
            .then((issueID) => {
                issueId = issueID;
                return cy.locationCreation(token, location.name, locLat, locLong);
            })
            .then((locationId) => {
                locId = locationId;
                return cy.spaceCreation(token, space.name, space.description, issueId, true, locationId);
            })
            .then((spaceId) => {
                spacId = spaceId;
                return cy.get('@locationId');
            })
            .then((loctnId) => {
                return cy.get('@spaceId').then((spcId) => ({ loctnId, spcId }));
            })
            .then(({ loctnId, spcId }) => {
                return cy.createUser(token, staffName, staffMail, user.mobileNumber, 'STAFF', loctnId)
                    .then((userId) => {
                        staffID = userId;
                        return cy.createGroup(token, group.name, userId, spcId);
                    });
            })
            .then((groupId) => {
                groupID = groupId;
                return cy.get('@groupId');
            })
            .then((newGroup) => {
                newID = newGroup;
                return cy.createAsset(token, asset.name, asset.description, locId);
            })
            .then(() => {
                return cy.get('@userId');
            })
            .then((userId) => {
                newViewerID = userId;
            })

        cy.reload()
        cy.clcikOnCreateTicketBtn()
        cy.verifyTicketsPage()
        cy.enterTicketdetails(ticket.title, ticket.description, location.name, space.name, issue.name)
        cy.clickOnCreateTicketButton()
        cy.verifySuccessAlert('created')
        cy.reload()
    })

    it('should verify staff permissions for creating users and updating tickets', () => {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.reload()
        cy.login(testData.verifications.loginTxt, Url, staffMail, env_creds.password)
        cy.verifyLoginIsSuccessful(staffName)
        cy.verifyloggedInUserRole('Staff')
        cy.clickOnPeople()
        cy.clickOnUsers()
        cy.clickOnAddUser()
        cy.verifyUserCreatePage()
        cy.verifyStaffAccessInUserCreation(user.email, staffName, testData.password, 'Staff', location.name, testData.warningMessaages.noAccess)
        cy.createProcedure(token, procedure.internalTitle, procedure.procedureTitle).then((procId) => {
            procedureId = procId
        })
        cy.get('@groupId').then((newGroup) => {
            cy.get('@userId').then((userId) => {
                cy.updateGroup(token, newGroup, userId)
            })
        })
        cy.goToTicketMenu()
        cy.verifyPoPage('Tickets')
        cy.selectCreatedTicket(ticket.title)
        cy.fillticketDeatils('Low', asset.name)
        cy.addProcedureInTicket(procedure.procedureTitle)
        cy.updateComments()
    })
})