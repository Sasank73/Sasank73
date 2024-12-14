//locators
const timeCostButton = '[id="time-tracking"]'
const timeTrackPopUp = '.MuiPopover-paper'
const buttonInTimeTrack = '.MuiPopover-paper [type="button"]'
const partsNotes = '[id="part-input-with-icon-textfield"]'
const part = '#part'
const quantity = '[id="part-input-with-icon"]'
const circleIcon = '.MuiCircularProgress-track'
const partNames = '[role="option"] .MuiTypography-title-sm'
const partDesc = '#part-listbox [role="option"] .MuiTypography-body-sm'
const VerifyPart = '.MuiPopover-paper .MuiListItem-variantPlain .MuiChip-labelLg'
const verifyPrice = '.MuiPopover-paper .MuiListItem-variantPlain .MuiTypography-body-md'
const submitButton = '.MuiPopover-paper [type="submit"]'
const grandTotal = '.MuiPopover-paper .MuiTypography-title-lg'
const forwardButton = '[data-testid="ArrowForwardIosIcon"]'
const timeLogNotes = 'textarea[id="time-input-with-icon-textfield"]'
const timeInput = '[id="time-input-with-icon"]'
const hourlyRate = 'input[id="time-input-with-icon-textfield"]'
const amount = '[id="input-with-icon-input"]'
const extraNotes = '[id="input-with-icon-textfield"]'

//commands
Cypress.Commands.add('verifyTmeCostButton', () => {
  cy.waitUntil(() => cy.get(timeCostButton).should('be.visible'))
})

Cypress.Commands.add('clickOnTmeCostButton', () => {
  cy.get(timeCostButton).should('be.visible').click()
})

Cypress.Commands.add('verifyTimeTrackinPopUp', () => {
  cy.waitUntil(() => cy.get(timeTrackPopUp).should('be.visible'))
  cy.get(timeTrackPopUp).should('be.visible')
  cy.contains('Parts').should('exist')
  cy.contains('Time logs').should('exist')
  cy.contains('Other costs').should('exist')
  cy.contains('Total').should('exist')
  cy.contains('Add a part').should('exist')
  cy.contains('Log time').should('exist')
  cy.contains('Add another cost').should('exist')
  cy.get(buttonInTimeTrack).should('have.length', 3)
})

Cypress.Commands.add('clickOnButtonInPopUp', (button) => {
  cy.get(buttonInTimeTrack).should('be.visible').contains(button).click()
})

Cypress.Commands.add('clickOnSubmitButtonInPopUp', () => {
  cy.get(submitButton).should('be.visible').click()
})

Cypress.Commands.add('verifyAddPartPopUp', () => {
  cy.waitUntil(() => cy.get(buttonInTimeTrack).contains('Go back').should('be.visible'))
  cy.get(timeTrackPopUp).should('be.visible')
  cy.contains('Parts').should('exist')
  cy.contains('Quantity used').should('exist')
  cy.contains('Enter an optional note').should('exist')
  cy.get(partsNotes).should('be.visible')
  cy.get(buttonInTimeTrack).should('have.length', 2)
})

Cypress.Commands.add('verifyWarningMessages', (WarningMessages) => {
  cy.contains(WarningMessages).should('exist')
})

Cypress.Commands.add('enterPartsDetails', (partsName, partsDesc, quant, notes) => {
  cy.get(part).should('exist').type(partsName)
  cy.get(partNames).should('contain.text', partsName)
  cy.get(part).clear().type(partsDesc)
  cy.get(partDesc).should('contain.text', partsDesc).click()
  cy.get(quantity).should('exist').type(quant).should('have.value', quant)
  cy.get(partsNotes).should('exist').type(notes).should('have.value', notes)
})

Cypress.Commands.add('verifyAddedPartsDetails', (partName, quant, price) => {
  const partPrice = price / 100
  const totalPrice = (quant * partPrice).toFixed(2)
  cy.get(VerifyPart).should('contain.text', partName)
  cy.get(verifyPrice).should('contain.text', `${quant} x $${partPrice}`)
  cy.get(grandTotal).should('contain.text', `$${totalPrice}`)
})

Cypress.Commands.add('clickOnForwardButton', () => {
  cy.get(forwardButton).should('exist').click()
})

Cypress.Commands.add('verifyPartsNotes', (notes) => {
  cy.get(partsNotes).should('contain.text', notes)
})

Cypress.Commands.add('verifyTimeLogPopUp', () => {
  cy.waitUntil(() => cy.get(buttonInTimeTrack).contains('Go back').should('be.visible'))
  cy.get(timeTrackPopUp).should('be.visible')
  cy.contains('Add a new time log entry').should('exist')
  cy.contains('User').should('exist')
  cy.contains('Time spent').should('exist')
  cy.contains('Hourly rate').should('exist')
  cy.get(timeInput).should('be.visible')
  cy.get(timeLogNotes).should('be.visible')
  cy.get(hourlyRate).should('exist')
  cy.get(buttonInTimeTrack).should('have.length', 3)
})

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function getRandomDuration() {
  const hours = getRandomInteger(0, 8)
  const minutes = getRandomInteger(0, 59)
  return `${hours}h ${minutes}m`
}

Cypress.Commands.add('enterTimeLog', (rate, notes) => {
  const randomDuration = getRandomDuration()
  cy.get(timeInput).should('be.visible').type(randomDuration).should('have.value', randomDuration)
  cy.get(hourlyRate).should('exist').type(rate).should('have.value', rate)
  cy.get(timeLogNotes).type(notes).should('contain.text', notes)
})

Cypress.Commands.add('verifyTimeLogNotes', (notes) => {
  cy.get(timeLogNotes).should('contain.text', notes)
})

Cypress.Commands.add('verifyAddOtherPopUp', () => {
  cy.waitUntil(() => cy.get(buttonInTimeTrack).contains('Go back').should('be.visible'))
  cy.get(timeTrackPopUp).should('be.visible')
  cy.contains('Add another cost entry').should('exist')
  cy.contains('Amount').should('exist')
  cy.contains('Enter a note').should('exist')
  cy.get(amount).should('be.visible')
  cy.get(extraNotes).should('be.visible')
  cy.get(buttonInTimeTrack).should('be.visible')
})

Cypress.Commands.add('enterOtherCostEntry', (rate, notes) => {
  cy.get(amount).should('exist').type(rate).should('have.value', rate)
  cy.get(extraNotes).type(notes).should('contain.text', notes)
})

Cypress.Commands.add('verifyOtherCostEntryNotes', (notes) => {
  cy.get(extraNotes).should('contain.text', notes)
})
