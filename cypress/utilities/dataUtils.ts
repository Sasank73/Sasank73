import { faker } from '@faker-js/faker'

export function createMockLocation() {
  const name = faker.location.city() + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const longitude = faker.location.longitude()
  const latitude = faker.location.latitude()
  return { name, longitude, latitude }
}

export function createMockSurvey() {
  const name = 'surveyByQA_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const description = 'surveyDesc_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { name, description }
}

export function createMockSpace() {
  const name = faker.company.name()
  const description = 'spaceDesc_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { name, description }
}

export function createMockSurveyFieldData() {
  const fieldTitle =
    'surveyFieldTitle_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const defaultValue =
    'defaultValue-10_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'How-about-our-service_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldHelperText =
    'Rate-from-one-to-ten_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { fieldTitle, defaultValue, fieldDescription, fieldHelperText }
}

export function createMockIssue() {
  const name = 'issueName_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const description =
    'issueDescription_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { name, description }
}

export function createMockTextField() {
  const fieldTitle =
    'text_SurveyFieldTitle_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'text_How-about-our-service_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldHelperText =
    'text_Rate-from-one-to-ten_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const defaultValue =
    'text_defaultValue-10_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return {
    fieldTitle,
    fieldDescription,
    fieldHelperText,
    defaultValue,
  }
}

export function createMockNumberField() {
  const fieldTitle =
    'number_SurveyFieldTitle_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'number_How-about-our-service_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldHelperText =
    'number_Rate-from-one-to-ten_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const defaultValue = faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return {
    fieldTitle,
    fieldDescription,
    fieldHelperText,
    defaultValue,
  }
}

export function createMockMultiTextField() {
  const fieldTitle =
    'multiLineText_SurveyFieldTitle_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'multiLineText_How-about-our-service_' +
    faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldHelperText =
    'multiLineText_Rate-from-one-to-ten_' +
    faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const defaultValue = 'multiLineText_DefaultValue-10_' + faker.lorem.lines(3)
  return {
    fieldTitle,
    fieldDescription,
    fieldHelperText,
    defaultValue,
  }
}

export function createMockCheckBoxField() {
  const fieldTitle =
    'checkBox_SurveyFieldTitle_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'checkBox_How-about-our-service_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldHelperText =
    'checkBox_Rate-from-one-to-ten_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return {
    fieldTitle,
    fieldDescription,
    fieldHelperText,
  }
}

export function createMockDropDownField() {
  const fieldTitle =
    'dropDown_SurveyFieldTitle_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'dropDown_How-about-our-service_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldHelperText =
    'dropDown_Rate-from-one-to-ten_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return {
    fieldTitle,
    fieldDescription,
    fieldHelperText,
  }
}

export function generateContactDetails() {
  const yopEmail = faker.word.noun() + '@yopmail.com'
  const names = faker.word.words() + 'user'
  return [yopEmail, names]
}

export function createMockDropdownOptions() {
  const opt1 = faker.word.noun() + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const opt2 =
    faker.word.preposition() + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { opt1, opt2 }
}

export function createMockTicketData() {
  const ticketTitle =
    faker.word.noun() + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const ticketDescription =
    faker.word.preposition() + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { ticketTitle, ticketDescription }
}

export function createMockShortTextField() {
  const fieldTitle = 'shortText_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'shortTextDesc' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { fieldTitle, fieldDescription }
}

export function createMockLongTextField() {
  const fieldTitle = 'longText_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'longTextDesc' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { fieldTitle, fieldDescription }
}

export function createMockNumbersField() {
  const fieldTitle = 'numberField_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'numberFieldDesc' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { fieldTitle, fieldDescription }
}

export function createMockCheckboxField() {
  const fieldTitle = 'checkbox_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'checkboxDesc' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { fieldTitle, fieldDescription }
}

export function createMockDropdownField() {
  const fieldTitle = 'dropdown_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const fieldDescription =
    'dropdownDesc' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { fieldTitle, fieldDescription }
}

export function createMockAsset() {
  const name = 'asset_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const description = 'assetDesc' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { name, description }
}

export function getVendorDetails() {
  const name = 'vendor_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const desc = 'vendorDesc_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const userName = 'vendorUser_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const email =
    'testVendorAuto' + faker.number.float({ min: 1, max: 1000, precision: 0.001 }) + '@yopmail.com'
  const mobileNumber = faker.phone.number()
  return { name, desc, userName, email, mobileNumber }
}

export function getCustomerDetails() {
  const name = 'customer_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const desc = 'customerDesc' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const userName = 'customerUser_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const email =
    'testCustomerAuto' +
    faker.number.float({ min: 1, max: 1000, precision: 0.001 }) +
    '@yopmail.com'
  const mobileNumber = faker.phone.number()
  return { name, desc, userName, email, mobileNumber }
}

export function createPart() {
  const name = 'part_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const description = 'partDesc_' + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  const unitPrice = faker.number.int({ min: 1000, max: 9999 })
  const inStock = faker.number.int({ min: 100, max: 500 })
  const minStock = faker.number.int({ min: 10, max: 100 })
  return { name, description, unitPrice, inStock, minStock }
}

export function createMockPO() {
  const poId = faker.string.alphanumeric({ length: { min: 5, max: 10 } })
  const code = faker.string.alphanumeric(5)
  const quantity = faker.number.int({ min: 1, max: 30 })
  const unitPrice = faker.number.int({ min: 100, max: 1000 })
  const partName = 'partName_' + faker.number.float({ min: 1, max: 100, precision: 0.001 })
  return { poId, code, quantity, unitPrice, partName }
}

export function mockTicketDetails() {
  const title = 'ticket_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const description = 'ticketDesc_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  return { title, description }
}

export function scheduler() {
  const interval = faker.number.int({ min: 1, max: 5 })
  const dayOfMonth = faker.number.int({ min: 1, max: 31 })
  const futureDate = faker.number.int({ min: 1, max: 5 })
  return { interval, dayOfMonth, futureDate }
}

export function mockProcedureDetails() {
  const internalTitle = 'textField_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const procedureTitle = 'procName_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  return { internalTitle, procedureTitle }
}

export function createMockUser() {
  const name = 'testUserAuto_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const email =
    'testUserEmail_' + faker.number.float({ min: 1, max: 1000, precision: 0.1 }) + '@yopmail.com'
  const mobileNumber = faker.phone.number().toString()
  return { name, email, mobileNumber }
}

export function createMockeGroup() {
  const name = 'testGroupAuto_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  return { name }
}

export function createMockCustomTextFieldData() {
  const title = 'textField_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const displayText = 'textheader_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const helperText = 'textFooter_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const defaultText =
    faker.word.noun() + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  return { title, displayText, helperText, defaultText }
}

export function createMockCustomMultiTextFieldData() {
  const title = 'multiTextField_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const displayText =
    'multiTextheader_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const helperText =
    'multiTextFooter_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const defaultLongText = faker.lorem.words(10)
  return { title, displayText, helperText, defaultLongText }
}

export function createMockCustomNumberFieldData() {
  const title = 'numField_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const displayText = 'numheader_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const helperText = 'numFooter_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const defaultNumber = faker.number.int({ max: 100 })
  return { title, displayText, helperText, defaultNumber }
}

export function createMockCustomCheckboxFieldData() {
  const title = 'checkBoxField_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const displayText =
    'checkBoxheader_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const helperText = 'checkBoxFooter_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  return { title, displayText, helperText }
}

export function createMockCustomDropdownFieldData() {
  const title = 'dropdownField_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const displayText =
    'dropdownheader_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const helperText = 'dropdownFooter_' + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const firstOp =
    `${faker.word.noun()}_` + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  const secondOp =
    `${faker.word.noun()}_` + faker.number.float({ min: 1, max: 1000, precision: 0.001 })
  return { title, displayText, helperText, firstOp, secondOp }
}

export function createMockOrganization() {
  const subdomainName = faker.string.alphanumeric(6) + 'testorg'
  const locationName =
    faker.location.city() + faker.number.float({ min: 1, max: 1000, precision: 0.0001 })
  return { subdomainName, locationName }
}

export function generateNotes() {
  const notes = faker.lorem.lines(3)
  return { notes }
}
