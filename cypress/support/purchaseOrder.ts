import 'cypress-wait-until'
import timeOuts from '../utilities/dynamicTimeouts'
//locators
const PoBtn = '[data-testid="ReceiptIcon"]'
const searchBtn = '[data-testid="SearchIcon"]'
const downloadCSVButton = '[data-testid="CloudDownloadIcon"]'
const tableBody = 'tbody'
const viewColumnsButton = '[data-testid="ViewColumnIcon"]'
const filterTableButton = '[aria-label="Table Toolbar"] [data-testid="MoreVertIcon"]'
const createPoBtn = '[aria-label="Create new purchase order"]'
const closeBtn = '[title="Close ticket details"]'
const itemsList = '[data-testid="purhcase-orders-create-content-container"] th'
const createPurchaseOrderBtn = '[data-testid="purhcase-orders-create-submit-create-ticket-button"]'
const closeButon = 'button[class*=MUIDataTableSearch-clearIcon]'
const addItemBtn = '[data-testid="AddCircleOutlineOutlinedIcon"]'
const idInput = '#externalId'
const Idval = '#part'
const onePart = '[aria-invalid="true"]'
const closeButton = '.MuiSheet-root [data-testid="CloseIcon"]'
const option = '[role="option"]'
const selectOption = '[aria-selected="false"]'
const code = 'td  .MuiInput-input'
const quantity = '[type="number"]'
const header = '.MuiTypography-root'
const statusDropdwn = '#status'
const textField = '[type="text"]'
const selectPo = 'tbody.MuiTableBody-root td'
const onePartId = '#oneOffPartId'
const deleteBtn = '.MuiButton-colorDanger'
const popup = '[role="dialog"]'
const popupId = '[id="alert-dialog-title"]'
const deleteButton = '.MuiDialogActions-root .MuiButton-colorDanger'
const disabledPart = '[aria-label="can not modify an already attached part."]'
const partsInventoryBtn = '[data-testid="AllInboxRoundedIcon"]'
const availableQuantity = '#unitsInStock'
const backBtn = '[aria-label="Go back"]'
const addPartBtn = 'button[aria-label="Add part"]'
const partName = '#name'
const verifyPageCreation = '[role="alert"]'

//commands
Cypress.Commands.add('clickOnPO', () => {
  cy.waitUntil(() => cy.get(PoBtn).should('exist'))
  cy.get(PoBtn).should('exist').click()
})

Cypress.Commands.add('verifyPoPage', (homePageName) => {
  cy.contains(homePageName).should('exist')
  cy.get(searchBtn).should('be.visible')
  cy.get(tableBody).should('be.visible')
  cy.get(downloadCSVButton).should('be.visible')
  cy.get(viewColumnsButton).should('be.visible')
  cy.get(filterTableButton).should('be.visible')
})

Cypress.Commands.add('clickOnCreatePO', () => {
  cy.get(createPoBtn).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('verifySuccessAlert', (status) => {
  cy.waitUntil(() => cy.get(verifyPageCreation).should('exist'))
  cy.get(verifyPageCreation).contains(status, { matchCase: false })
})

Cypress.Commands.add('verifyCreatePoPage', (pageHeader) => {
  cy.contains(pageHeader).should('exist')
  cy.get(closeBtn).should('not.be.disabled').and('be.visible')
  cy.get(itemsList).contains('Name')
  cy.get(itemsList).contains('Code')
  cy.get(itemsList).contains('Quantity ordered')
  cy.get(itemsList).contains('Price per unit')
  cy.get(itemsList).contains('Actions')
  cy.get(addItemBtn).should('exist')
})

Cypress.Commands.add('verifyCreatePurchaseOrderBtn', () => {
  cy.get(createPurchaseOrderBtn).should('not.be.disabled').and('be.visible')
})

Cypress.Commands.add('verifyAddPartBtn', () => {
  cy.get(addPartBtn).should('not.be.disabled').and('be.visible')
})

Cypress.Commands.add('createPO', (idIp, partName, codeValue, quantValue, Price) => {
  cy.get(idInput).type(idIp).should('have.value', idIp)
  cy.get(Idval).type(partName)
  cy.get(option).contains(partName).click()
  cy.get(code).first().type(codeValue).should('have.value', codeValue)
  cy.get(quantity).first().clear().type(quantValue).should('have.value', quantValue)
  cy.get(quantity)
    .eq(1)
    .invoke('attr', 'value')
    .then((value) => {
      const number = parseFloat(value)
      const cost = Price / 100
      if (number === 0) {
        cy.get(Idval).type(partName)
        cy.get(option).contains(partName).click()
      } else {
        cy.wrap(number).should('eq', cost)
      }
    })
  cy.get(createPurchaseOrderBtn).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('closeSearchBar', () => {
  cy.waitUntil(() => cy.get(closeButon).should('exist'))
  cy.get(closeButon).should('exist').click()
})

Cypress.Commands.add('selectCreatedPo', (poName) => {
  cy.get(searchBtn).should('be.visible').click()
  cy.get(textField).type(poName)
  cy.get(selectPo).eq(0).contains(poName).click()
})

Cypress.Commands.add('editPo', (partName, codeValue, quantValue, price) => {
  cy.url().then((url) => {
    const parts = url.split('/')
    const desiredValue = parts[parts.length - 2]
    cy.wrap(desiredValue).as('poID')
  })
  cy.get(quantity)
    .first()
    .invoke('attr', 'value')
    .then((value) => {
      const number = parseInt(value, 10)
      if (!isNaN(number)) {
        const newValue = number - 1
        cy.wrap(newValue).as('newValue')
      } else {
        cy.log('Failed to convert the value to an integer.')
      }
      cy.get('@newValue').then((data) => {
        cy.get(quantity).eq(1).clear().type(data)
      })
    })
  cy.get(statusDropdwn).should('exist').click()
  cy.get(option).contains('Approved').click()
  cy.get(addItemBtn).should('exist').click()
  cy.get(onePart)
    .dblclick()
    .then(($element) => {
      $element.text(partName)
      cy.wrap($element).type(partName)
    })
  cy.get(onePartId).trigger('mouseover').contains(partName).click()
  cy.get(code).eq(4).type(codeValue).should('have.value', codeValue)
  cy.get(quantity).eq(3).clear().type(quantValue).should('have.value', quantValue)
  const unitPrice = parseFloat((price / 100).toFixed(2))
  cy.get(quantity).eq(5).clear().type(unitPrice)
  cy.get(header).contains('Edit purchase order').click()
  cy.get(quantity)
    .eq(5)
    .click()
    .invoke('attr', 'value')
    .then((value) => {
      const modifiedValue = parseFloat(value.replace(/\.?0*$/, ''))
      expect(modifiedValue).to.equal(unitPrice)
    })

  cy.get(createPurchaseOrderBtn).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('deletePart', (partName) => {
  cy.get(deleteBtn).eq(1).should('exist').click()
  cy.get(popupId).parent(popup).should('exist')
  cy.contains('Delete purchase order item?')
  cy.get(deleteButton).should('exist').click()
  cy.contains(partName).should('not.exist')
})

Cypress.Commands.add('completePo', () => {
  cy.get(statusDropdwn).should('exist').click()
  cy.waitUntil(() => cy.get(selectOption).contains('Complete'))
  cy.waitUntil(() => cy.get(selectOption).contains('Complete').click())
  cy.get(statusDropdwn)
    .invoke('text')
    .then((data) => {
      if (data !== 'Complete') {
        cy.get(statusDropdwn).should('exist').click()
        cy.waitUntil(() => cy.get(selectOption).contains('Complete'))
        cy.get(selectOption).contains('Complete').click({ force: true })
      }
    })
  cy.get(statusDropdwn)
    .invoke('text')
    .then((data) => {
      if (data !== 'Complete') {
        cy.get(statusDropdwn).should('exist').click()
        cy.waitUntil(() => cy.get(selectOption).contains('Complete'))
        cy.get(selectOption).contains('Complete').click({ force: true })
      }
    })
  cy.get(createPurchaseOrderBtn).should('not.be.disabled').and('be.visible').click()
})
Cypress.Commands.add('verifyCompletedPO', () => {
  cy.get(disabledPart).should('exist').click()
  cy.get(closeBtn).should('not.be.disabled').and('be.visible').click()
})

Cypress.Commands.add('clickOnPartsInventory', () => {
  cy.get(partsInventoryBtn).should('exist').click()
})

Cypress.Commands.add('verifyEditPartsPage', (pageHeader, partNam) => {
  cy.contains(pageHeader).should('exist')
  cy.get(partName)
    .click()
    .invoke('attr', 'value')
    .then((value) => {
      cy.wrap(value).should('eq', partNam)
    })
})

Cypress.Commands.add('verifyAddedParts', (quantityAdded) => {
  cy.get('@newValue').then((data) => {
    let newValue = parseInt(data, 10)
    cy.log(`Parsed newValue: ${newValue}`)

    cy.get(availableQuantity)
      .click()
      .invoke('attr', 'value')
      .then((value) => {
        const availquant = parseInt(value, 10)
        cy.log(`Parsed availableQuantity: ${availquant}`)

        if (!isNaN(newValue) && !isNaN(availquant)) {
          const addedParts = availquant - newValue
          const addedQuant = parseInt(quantityAdded, 10)
          cy.log(`Added Parts: ${addedParts}`)
          cy.log(`Expected Quantity Added: ${addedQuant}`)

          if (addedParts === addedQuant) {
            cy.get(backBtn).should('not.be.disabled').and('be.visible').click()
          } else {
            cy.log('Mismatch in added parts quantity.')
          }
        } else {
          cy.log('Failed to parse newValue or availquant to integers.')
        }
      })
  })
})
