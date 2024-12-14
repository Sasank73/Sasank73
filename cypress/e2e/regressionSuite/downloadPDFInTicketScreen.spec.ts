import * as dataUtils from '../../utilities/dataUtils'
import env_creds from '../../utilities/environment'

describe('create new ticket and verify download the PDF',()=>{
   let ticket, user, userEmail, group 
   let Url, testData, token,locId,asetOneId,vendorOneId,customerOneId,issueId,spacId,usrId,gropId

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
   
  it('download the PDF File and verify it',()=>{
    const fileName=ticket.title;
    cy.selectCreatedTicket(fileName);
    cy.clickOnTcketBody();
    cy.clickOnPDFPreviewButton();
    cy.task('isFileDownloaded', fileName).then(fileExists =>{
      expect(fileExists).to.be.true;
    });
  })
})