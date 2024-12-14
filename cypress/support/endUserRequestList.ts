/// <reference types="cypress"/>
///<reference types="cypress-iframe" />
import { faker } from '@faker-js/faker'

//locators
const yopmailURl = 'https://yopmail.com/'
const emailField = '[title="Login"]'
const enterButton = 'button[title="Check Inbox @yopmail.com"]'
const viewTicket = '[name="ifmail"] '
const fetchData = '[id="mail"] a'
const acMenuBtn = '[aria-controls="account-menu"]'
const commentTab = '[role="tab"]'
const feedbackButton = '[title="Leave feedback"]'
const watcherButton = 'div+button'
const locationDetail = '.MuiTypography-root'
const ticketState = 'span+button '
const saveButton = '[aria-hidden="false"] [type="submit"]'
const body = '#root'
const emailInput = '[helpertext="[object Object]"] input'
const ticketMenuButton = '[data-testid="InboxRoundedIcon"]'
const ticketPage = '.MuiTypography-root'
const verifyTicketPage = 'Tickets'
const searchButton = '[data-testid="Search-iconButton"]'
const createTicketBtn = '[data-testid="tickets-landing-page-create-ticket-button"]'
const searchField = '[data-test-id="Search"]'
const selectTicket = 'td.MuiTableCell-root'
const ticketHelpertext = '[aria-describedby="title-helper-text"]'
const verifydrpdwntitle = '[id="ticket-status-field-label"]'
const dropdownButton = '[id="ticket-status-field"]'
const ticketStatus = '[role="option"] .MuiListItemContent-root'
const statusText = 'Acknowledged'
const verifyPageCreation = '[role="alert"]'

//commands
Cypress.Commands.add('fetchLinkInEmail', (mail) => {
  cy.origin('https://yopmail.com/', { args: { mail } }, (args) => {
    Cypress.require('cypress-iframe')

    const yopmailURl = 'https://yopmail.com/'
    const emailField = '[title="Login"]'
    const enterButton = 'button[title="Check Inbox @yopmail.com"]'
    const viewTicket = '[name="ifmail"] '
    const fetchData = '[id="mail"] a'

    cy.visit(yopmailURl)
    cy.get(emailField).should('exist')
    cy.get(emailField).clear().type(args.mail).should('have.value', args.mail)
    cy.get(enterButton).should('not.be.disabled').click()

    cy.iframe(viewTicket)
      .eq(0)
      .find(fetchData)
      .should('exist')
      .invoke('attr', 'href')
      .then((attributeValue) => {
        const link = attributeValue
        return link
      })
  })
})

Cypress.Commands.add('verifyEndUserRequest', (enduserUrl, locTitle) => {
  cy.visit(enduserUrl)
  cy.waitUntil(() =>  cy.get(acMenuBtn).should('be.visible'))
  cy.get(acMenuBtn).should('not.be.disabled')
  cy.get(commentTab).eq(1).should('not.be.disabled')
  cy.get(feedbackButton).should('not.be.disabled')
  cy.get(locationDetail).should('contain', locTitle)
  cy.get(ticketState).contains('Acknowledged')
})

Cypress.Commands.add('saveRequest', () => {
  cy.waitUntil(() => cy.get(saveButton).should('be.visible'))
  cy.get(saveButton).click({ force: true })
  cy.waitUntil(() => cy.url().should('include', '/form/request/success'))
  cy.url().should('include', '/form/request/success')
})

Cypress.Commands.add('clickOnBody', () => {
  cy.get(body).click()
})

Cypress.Commands.add('verifyEmailIsEntered', (mailEntered) => {
  cy.get(emailInput).eq(0).should('have.value', mailEntered)
})

Cypress.Commands.add('verifyNameIsEntered', (nameEntered) => {
  cy.get(emailInput).eq(1).should('have.value', nameEntered)
})

Cypress.Commands.add('changeTicketStatus', (titleName, isuName, helperText, status) => {
  cy.get(ticketMenuButton).should('be.visible').click({ multiple: true, force: true })
  cy.get(ticketPage).should('contain', verifyTicketPage)
  cy.get(createTicketBtn).should('not.be.disabled')
  cy.get(searchButton).should('not.be.disabled').click()
  cy.get(searchField).should('be.visible').clear().type(titleName)
  cy.get(selectTicket).contains(isuName).click('center')
  cy.get(verifydrpdwntitle).should('be.visible')
  cy.get(dropdownButton).should('be.visible').click()
  cy.get(ticketStatus).contains(statusText).click({ multiple: true })
  cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
  cy.get(verifyPageCreation).contains(status, { matchCase: false })
  cy.reload()
})

Cypress.Commands.add('generateAndSaveRandomEmail', () => {
  const yopEmail =
    faker.word.noun() + faker.number.float({ min: 1, max: 1000, precision: 0.01 }) + '@yopmail.com'
  cy.writeFile('cypress/fixtures/randomEmail.json', { email: yopEmail })
})
