import './loginCommands.ts'
import './contactInfo.ts'
import './issueWithAdditionalComment.ts'
import './surveyForm.ts'
import './spaceWithAdditonalCommentTurnedOff.ts'
import './autoCompleteAndRadioButton.ts'
import './crudSurvey.ts'
import './testAuthenticationForPortal.ts'
import './smartCodes.ts'
import './surveyFormWithAllFields.ts'
import './surveySpacePreview.ts'
import './spaceIssueRequestPreview.ts'
import './locationId.ts'
import './autoProgress.ts'
import './apiDataCreation.ts'
import './surveySubmission.ts'
import './endUserRequestList.ts'
import 'cypress-iframe'
import './procedureAdminFlow.ts'
import './purchaseOrder.ts'
import './calendarActions.ts'
import './updateTicketFields.ts'
import './timeCostTracking.ts'
require('cy-verify-downloads').addCustomCommand()

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.verifyNameIsEntered('greeting')
       */
      verifyNameIsEntered(value: string): Chainable<JQuery<HTMLElement>>
      createOrganization(
        subdomainName: string,
        locationName: string,
      ): Chainable<JQuery<HTMLElement>>
      getLoginToken(subdomainName: string): Chainable<JQuery<HTMLElement>>
      login(
        loginTxt: string,
        Url: string,
        username: any,
        password: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyLoginIsSuccessful(username: string): Chainable<JQuery<HTMLElement>>
      locationCreation(token: any, name: string, locLat: string, locLong: string)
      issueCreation(token: any, name: string, description: string)
      spaceCreation(
        token: any,
        name: string,
        description: string,
        issueID: string,
        boolean: boolean,
        locationId: any,
      ): Chainable<JQuery<HTMLElement>>
      goToLocationsMenu(): Chainable<JQuery<HTMLElement>>
      selectCreatedLocation(name: string): Chainable<JQuery<HTMLElement>>
      selectCreatedSpace(name: string): Chainable<JQuery<HTMLElement>>
      selectContactInfoOption(value: string): Chainable<JQuery<HTMLElement>>
      logout(username: string): Chainable<JQuery<HTMLElement>>
      selectLocationAndSpaceInPortal(
        locationName: string,
        spaceName: string,
        spacedescription: string,
      ): Chainable<JQuery<HTMLElement>>
      issueRequestWithComment(
        issueName: string,
        issueDescription: string,
        locationName: string,
      ): Chainable<JQuery<HTMLElement>>
      clickOnNextButton(): Chainable<JQuery<HTMLElement>>
      verifyContactInfoVisible(): Chainable<JQuery<HTMLElement>>
      verifyErrorMessageForEmail(
        locationName: string,
        email: string,
      ): Chainable<JQuery<HTMLElement>>
      inputIntoContactField(email: string, emailAddr: string): Chainable<JQuery<HTMLElement>>
      verifyErrorMessageForName(locationName: string, name: string): Chainable<JQuery<HTMLElement>>
      inputIntoContactField(name: string, fullName: string): Chainable<JQuery<HTMLElement>>
      checkSubscribe(): Chainable<JQuery<HTMLElement>>
      clickSubmitButton(): Chainable<JQuery<HTMLElement>>
      verifyIsRequestSubmitted(): Chainable<JQuery<HTMLElement>>
      verifyContactInfoNotVisible(): Chainable<JQuery<HTMLElement>>
      archiveLocation(
        token: string,
        locId: string,
        boolean: boolean,
      ): Chainable<JQuery<HTMLElement>>
      archiveIssue(token: string, issueId: string, boolean: boolean): Chainable<JQuery<HTMLElement>>
      surveyCreation(
        token: string,
        surveyName: string,
        surveyname: string,
        surveyDescription: string,
        surveydescription: string,
      )
      addSurveyInSpace(
        token: string,
        spaceName: string,
        spaceDescription: string,
        locationId: any,
        surveyId: string,
        issueID: string,
      ): Chainable<JQuery<HTMLElement>>
      createSurveyWithTextField(
        token: string,
        fieldTitle: string,
        fieldDescription: string,
        fieldHelperText: string,
        fieldHelpertext: string,
        defaultValue: string,
      )
      updateSurveyFields(
        token: string,
        surveyId: string,
        textFieldIdentity: string,
        boolean: boolean,
      ): Chainable<JQuery<HTMLElement>>
      createSurveyWithNumberField(
        token: string,
        fieldTitle: string,
        fieldDescription: string,
        fieldHelperText: string,
        fieldHelpertext: string,
        defaultValue: any,
      )
      createSurveyWithMultiLineTextField(
        token: string,
        fieldTitle: string,
        fieldDescription: string,
        fieldHelperText: string,
        fieldHelpertext: string,
        defaultValue: string,
      )
      createSurveyWithCheckboxField(
        token: string,
        fieldTitle: string,
        fieldDescription: string,
        fieldHelperText: string,
        fieldHelpertext: string,
        bool: boolean,
      )
      createSurveyWithDropdownField(
        token: string,
        fieldTitle: string,
        fieldDescription: string,
        fieldHelperText: string,
        fieldHelpertext: string,
      )
      verifyloggedInUserRole(value: string): Chainable<JQuery<HTMLElement>>
      goToSurveysMenu(): Chainable<JQuery<HTMLElement>>
      removeField(surveyName: string, fieldTitle: any): Chainable<JQuery<HTMLElement>>
      verifySuccessAlert(value: string): Chainable<JQuery<HTMLElement>>
      updateSurveyWithAllFieldsQuery(
        token: any,
        surveyId: any,
        surveyName: string,
        surveyname: string,
        surveyDescription: string,
        surveydescription: string,
        textFieldIdentity: any,
        numericFieldId: any,
        multiTextId: any,
        checkboxFieldId: any,
        dropdownFieldId: any,
      ): Chainable<JQuery<HTMLElement>>
      portalLogin(portalUrl: any): Chainable<JQuery<HTMLElement>>
      selectLocationAndSpaceInPortal(
        locationName: string,
        spaceName: string,
        spaceDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      clearSurveyFieldTextAndNumber(fieldDescription: string): Chainable<JQuery<HTMLElement>>
      clearSurveyFieldTextAndNumber(fieldDescription: string): Chainable<JQuery<HTMLElement>>
      clearSurveyFieldMultiLineText(fieldDescription: string): Chainable<JQuery<HTMLElement>>
      checkIsNumberFieldAllowingStringContainsText(
        fieldDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      uncheckTheCheckBox(fieldDescription: string): Chainable<JQuery<HTMLElement>>
      checkErrorMessageIfRequired(
        fieldDescription: string,
        fieldHelperText: string,
        locationName: string,
      ): Chainable<JQuery<HTMLElement>>
      checkErrorMessageIfRequired(
        fieldDescription: string,
        fieldHelperText: string,
        locationName: string,
      ): Chainable<JQuery<HTMLElement>>
      checkErrorMessageIfRequired(
        fieldDescription: string,
        fieldHelperText: string,
        locationName: string,
      ): Chainable<JQuery<HTMLElement>>
      checkErrorMessageIfRequiredForCheckbox(
        fieldDescription: string,
        fieldHelperText: string,
        locationName: string,
      ): Chainable<JQuery<HTMLElement>>
      checkErrorMessageIfRequiredForDropdown(
        fieldDescription: string,
        fieldHelperText: string,
        locationName: string,
      ): Chainable<JQuery<HTMLElement>>
      inputIntoSurveyFieldTextAndNumber(
        fieldDescription: string,
        inputs: any,
      ): Chainable<JQuery<HTMLElement>>
      inputIntoSurveyFieldTextAndNumber(
        fieldDescription: string,
        inputs: any,
      ): Chainable<JQuery<HTMLElement>>
      inputIntoSurveyFieldMultiLineText(
        fieldDescription: string,
        inputs: any,
      ): Chainable<JQuery<HTMLElement>>
      CheckTheCheckBox(fieldDescription: string): Chainable<JQuery<HTMLElement>>
      selectInputFromDropdown(fieldDescription: string, inputs: any): Chainable<JQuery<HTMLElement>>
      submitSurvey(): Chainable<JQuery<HTMLElement>>
      logoutFromPortal(): Chainable<JQuery<HTMLElement>>
      verifyIsSurveySubmitted(
        spaceName: string,
        spaceDescription: string,
        inputs: any,
        surveyName: string,
      ): Chainable<JQuery<HTMLElement>>
      createSpaceModeSpace(
        spaceTitle: any,
        detail: any,
        issueName: any,
        status: any,
      ): Chainable<JQuery<HTMLElement>>
      verifyRadioButtons(locationName: string): Chainable<JQuery<HTMLElement>>
      verifyDropDown(locationName: string): Chainable<JQuery<HTMLElement>>
      selectLocationInPortal(locationName: string): Chainable<JQuery<HTMLElement>>
      verifyAddCommentPage(locationName: string): Chainable<JQuery<HTMLElement>>
      clickOnTicketMenu(): Chainable<JQuery<HTMLElement>>
      verifyPoPage(tickets: any): Chainable<JQuery<HTMLElement>>
      verifyCreateTicketBtn(): Chainable<JQuery<HTMLElement>>
      clcikOnCreateTicketBtn(): Chainable<JQuery<HTMLElement>>
      verifyTicketCreationPage(): Chainable<JQuery<HTMLElement>>
      enterTicketdetails(
        ticketTitle: any,
        ticketDescription: string,
        locationName: string,
        spaceName: string,
        issueName: string,
      ): Chainable<JQuery<HTMLElement>>
      verifySchedulePopup(): Chainable<JQuery<HTMLElement>>
      scheduleMonthTicket(
        month: any,
        schedulerInterval: any,
        schedulerDayOfMonth: any,
      ): Chainable<JQuery<HTMLElement>>
      saveSchedule(): Chainable<JQuery<HTMLElement>>
      verifyDueDate(monthDueDateText: any, monthDayValue: any): Chainable<JQuery<HTMLElement>>
      clickOnCreateTicketButton(): Chainable<JQuery<HTMLElement>>
      verifySuccessAlert(value): Chainable<JQuery<HTMLElement>>
      clickOnCloseTicketButton(): Chainable<JQuery<HTMLElement>>
      clickOnCalendarBtn(): Chainable<JQuery<HTMLElement>>
      verifyMonth(
        schedulerInterval: any,
        schedulerDayOfMonth: any,
        schedulerFutureDate: any,
      ): Chainable<JQuery<HTMLElement>>
      verifyChildTicket(ticketTitle: any): Chainable<JQuery<HTMLElement>>
      scheduleWeekTicket(week: any, schedulerInterval: any): Chainable<JQuery<HTMLElement>>
      verifyWeek(
        ticketTitle: any,
        schedulerFutureDate: any,
        schedulerInterval: any,
      ): Chainable<JQuery<HTMLElement>>
      scheduleDay(schedulerInterval: any): Chainable<JQuery<HTMLElement>>
      verifyDayIntervals(
        schedulerInterval: any,
        schedulerFutureDate: any,
        ticketTitle: any,
      ): Chainable<JQuery<HTMLElement>>
      verifySurveyPage(): Chainable<JQuery<HTMLElement>>
      fillSurveyForm(surveyName: string, surveyDescription: string): Chainable<JQuery<HTMLElement>>
      verifyNewSection(): Chainable<JQuery<HTMLElement>>
      addHeaderName(sectionTitle: any): Chainable<JQuery<HTMLElement>>
      verifyAndAddshortTextField(
        fieldTitle: any,
        sectionTitle: any,
        fieldDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyAndAddNumberField(
        fieldTitle: any,
        fieldDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      saveSurvey(): Chainable<JQuery<HTMLElement>>
      selectCreatedSurvey(surveyName: string): Chainable<JQuery<HTMLElement>>
      verifyCreateProcedurePage(vrfySurveyEditPage: any): Chainable<JQuery<HTMLElement>>
      verifyAndAddLongTextField(
        fieldTitle: any,
        sectionTitle: any,
        fieldDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyAndAddcheckBoxField(
        fieldTitle: any,
        fieldDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyAndAddDropdownField(
        fieldTitle: any,
        fieldDescription: string,
        opt1: any,
        opt2: any,
      ): Chainable<JQuery<HTMLElement>>
      removeAField(fieldTitle: any): Chainable<JQuery<HTMLElement>>
      verifyDeletedField(fieldTitle: any): Chainable<JQuery<HTMLElement>>
      goToTicketMenu(): Chainable<JQuery<HTMLElement>>
      verifyTicketsPage(): Chainable<JQuery<HTMLElement>>
      createCustomTextField(
        token: any,
        title: any,
        displayText: string,
        helperText: string,
        defaultText: string,
      ): Chainable<JQuery<HTMLElement>>
      selectCreatedTicket(ticketTitle: any): Chainable<JQuery<HTMLElement>>
      verifyCustomFields(
        displayText: string,
        helperText: string,
        defaultText: string,
        updatedValue: any,
      ): Chainable<JQuery<HTMLElement>>
      updateCustomFields(
        displayText: string,
        spaceName: string,
        ticketTitle: any,
      ): Chainable<JQuery<HTMLElement>>
      createCustomMultiTextField(
        token: any,
        title: any,
        displayText: string,
        helperText: string,
        defaultLongText: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyMultiCustomField(
        displayText: string,
        helperText: string,
        defaultLongText: string,
        updatedValue: any,
      ): Chainable<JQuery<HTMLElement>>
      updateMultiCustomFields(
        displayText: string,
        spaceName: string,
        ticketTitle: any,
      ): Chainable<JQuery<HTMLElement>>
      createCustomNumberField(
        token: any,
        title: any,
        displayText: any,
        helperText: any,
        defaultNumber: any,
      ): Chainable<JQuery<HTMLElement>>
      verifyCustomFields(
        displayText: string,
        helperText: string,
        defaultNumber: any,
        updatedValue: any,
      ): Chainable<JQuery<HTMLElement>>
      createCustomCheckboxField(
        token: any,
        title: any,
        displayText: string,
        helperText: string,
        boblean,
      ): Chainable<JQuery<HTMLElement>>
      verifyCheckboxCustomField(
        displayText: string,
        helperText: string,
        title: any,
      ): Chainable<JQuery<HTMLElement>>
      updateCheckboxCustomField(displayText: string): Chainable<JQuery<HTMLElement>>
      createCustomDropdownField(
        token: any,
        title: any,
        displayText: string,
        helperText: string,
        firstOp: any,
        firstOpId: any,
        secondOp: any,
        secondOpId: any,
      ): Chainable<JQuery<HTMLElement>>
      verifyDropdownCustomField(
        displayText: string,
        secondOp: any,
        helperText: string,
      ): Chainable<JQuery<HTMLElement>>
      updateDropdownCustomField(displayText: string, firstOp: any): Chainable<JQuery<HTMLElement>>
      goToProcedure(): Chainable<JQuery<HTMLElement>>
      verifyProcedureHomePage(): Chainable<JQuery<HTMLElement>>
      clickOnProcedureBtn(): Chainable<JQuery<HTMLElement>>
      addProcedureName(procName: string): Chainable<JQuery<HTMLElement>>
      verifyConfigurePage(): Chainable<JQuery<HTMLElement>>
      addNewSection(): Chainable<JQuery<HTMLElement>>
      selectNewSection(sectionTitle: any): Chainable<JQuery<HTMLElement>>
      saveProcedure(): Chainable<JQuery<HTMLElement>>
      selectTheCreatedProcedure(procName: string): Chainable<JQuery<HTMLElement>>
      deleteSectionButton(): Chainable<JQuery<HTMLElement>>
      deletebuttonOnConfirmationPopup(): Chainable<JQuery<HTMLElement>>
      VerifySectionIsDeletedOrNot(sectionTitle: string): Chainable<JQuery<HTMLElement>>
      createUser(
        token: any,
        userName: any,
        userEmail: any,
        phoneNumber: any,
        UserRole: any,
        loctnId: any,
      ): Chainable<JQuery<HTMLElement>>
      createGroup(
        token: any,
        groupName: any,
        userId: any,
        spcId: any,
      ): Chainable<JQuery<HTMLElement>>
      createAsset(
        token: any,
        assetName: string,
        assetDescription: string,
        locId: any,
      ): Chainable<JQuery<HTMLElement>>
      createVendor(
        token: any,
        vendorName: string,
        vendorDesc: string,
        vendorUserName: string,
        vendorEmail: any,
        vendorMobileNumber: any,
        locId: any,
        asetOneId: any,
      ): Chainable<JQuery<HTMLElement>>
      createCustomer(
        token: any,
        customerName: string,
        customerDesc: string,
        customerUserName: string,
        customerEmail: any,
        customerMobileNumber: any,
        locId: any,
        asetOneId: any,
      ): Chainable<JQuery<HTMLElement>>
      fillticketDeatils(
        priorityState: any,
        assetName: string,
        vendorName: string,
      ): Chainable<JQuery<HTMLElement>>
      clickOnTcketBody(): Chainable<JQuery<HTMLElement>>
      clickOnPDFPreviewButton(): Chainable<JQuery<HTMLElement>>
      generateAndSaveRandomEmail(): Chainable<JQuery<HTMLElement>>
      clickOnBody(): Chainable<JQuery<HTMLElement>>
      verifyEmailIsEntered(yopEmail: any): Chainable<JQuery<HTMLElement>>
      saveRequest(): Chainable<JQuery<HTMLElement>>
      changeTicketStatus(
        issueName: string,
        issuename: string,
        IssueName: string,
        status: any,
      ): Chainable<JQuery<HTMLElement>>
      fetchLinkInEmail(yopEmail: any): Chainable<JQuery<HTMLElement>>
      verifyEndUserRequest(link: any, issueName: any): Chainable<JQuery<HTMLElement>>
      updateSpaceWithIssue(
        token: any,
        spacId: any,
        locId: any,
        boolean,
        issueId: any,
        secondIssueId: any,
        commentBoolean: any,
      )
      clickOnIssueCategories(): Chainable<JQuery<HTMLElement>>
      verifyCreatedIssue(vrfyIssuePage: any, issueOneName: any): Chainable<JQuery<HTMLElement>>
      requestSubmission(
        portalText: string,
        locationName: string,
        vrfyPortalSpcPage: any,
        spaceName: string,
        vrfyPortalIssuePage: any,
        issueOneName: string,
        issueTwoName: string,
        vrfyPortalCommnetPage: any,
      ): Chainable<JQuery<HTMLElement>>
      verifyVendorLoginIsSuccessful(portalText: string): Chainable<JQuery<HTMLElement>>
      requestSubmission(
        portalText: string,
        locationName: string,
        vrfyPortalSpcPage: any,
        spaceName: string,
        vrfyPortalIssuePage,
        issueOneName: string,
        issueTwoName: string,
        vrfyPortalCommnetPage: any,
      ): Chainable<JQuery<HTMLElement>>
      verifyEndUserRedirectedToPortal(portalText: string): Chainable<JQuery<HTMLElement>>
      requestSubmission(
        portalText: string,
        locationName: string,
        vrfyPortalSpcPage: any,
        spaceName: string,
        vrfyPortalIssuePage: any,
        issueOneName: string,
        issueTwoName: string,
        vrfyPortalCommnetPage: any,
      ): Chainable<JQuery<HTMLElement>>
      verifyEndUserRedirectedToPortal(
        portalUrl: any,
        portalText: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyAndValidateViewerUserScreenDetails(
        viewerName: string,
        viewerMail: any,
        testDataPassword: any,
      ): Chainable<JQuery<HTMLElement>>
      clickOnProfileBtn(): Chainable<JQuery<HTMLElement>>
      verifyUpdatedDetials(viewerName, viewerMail): Chainable<JQuery<HTMLElement>>
      verifyViewerUserPerimissions(): Chainable<JQuery<HTMLElement>>
      selectLocationInViewerScreen(locationNam: string): Chainable<JQuery<HTMLElement>>
      verifyTicketPresence(ticketTitle: any): Chainable<JQuery<HTMLElement>>
      createProcedure(
        token: any,
        internalTitle: any,
        procedureTitle: any,
      ): Chainable<JQuery<HTMLElement>>
      updateGroup(token: any, newGroup: any, userId: any): Chainable<JQuery<HTMLElement>>
      clickOnCreatedTicket(ticketTitle: any): Chainable<JQuery<HTMLElement>>
      addProcedureInTicket(procedureTitle: any): Chainable<JQuery<HTMLElement>>
      updateComments(): Chainable<JQuery<HTMLElement>>
      goToIssueCategoriesMenu(): Chainable<JQuery<HTMLElement>>
      createIssueWithOutSelectingSpace(
        issueName: string,
        issueDescription: string,
        status: any,
      ): Chainable<JQuery<HTMLElement>>
      verifySpacePickerAutoComplete(locationName: string): Chainable<JQuery<HTMLElement>>
      visitLocationIDURL(locationPortalURL: any): Chainable<JQuery<HTMLElement>>
      verifySpacePickerRadioButtons(locatioName: string): Chainable<JQuery<HTMLElement>>
      verifySpaceOfLocationInPortal(
        spaceName: any,
        spaceDescription: any,
      ): Chainable<JQuery<HTMLElement>>
      verifySpacePickerDropDown(locationName: string): Chainable<JQuery<HTMLElement>>
      verifyTicketHomePage(): Chainable<JQuery<HTMLElement>>
      goToProcedure(): Chainable<JQuery<HTMLElement>>
      clickOnProcedureBtn(): Chainable<JQuery<HTMLElement>>
      addProcedureName(procName: any)
      verifyConfigurePage(): Chainable<JQuery<HTMLElement>>
      saveProcedure(): Chainable<JQuery<HTMLElement>>
      addProcedureToTicket(tickeTicketTitle: string, procName: any): Chainable<JQuery<HTMLElement>>
      verifyProcedure(
        shortTextfieldTitle: string,
        numberFieldTitle: string,
      ): Chainable<JQuery<HTMLElement>>
      createTicket(
        ticketTicketTitle: string,
        ticketTicketDescription: string,
        locationName: string,
        spaceName: string,
        issueName: string,
      ): Chainable<JQuery<HTMLElement>>
      selectTheCreatedProcedure(procName: any): Chainable<JQuery<HTMLElement>>
      addNewSection(): Chainable<JQuery<HTMLElement>>
      selectNewSection(sectionTitle: any): Chainable<JQuery<HTMLElement>>
      updateProcedure(ticketTicketTitle: string): Chainable<JQuery<HTMLElement>>
      verifySecondSection(
        shortTextFieldTitle: string,
        numberFieldTitle: string,
        longTextFieldTitle: string,
        checkboxFieldTitle: string,
        dropdownFieldTitle: string,
      ): Chainable<JQuery<HTMLElement>>
      archiveProcedure(): Chainable<JQuery<HTMLElement>>
      createAPart(
        token: any,
        partName: any,
        partDescription: any,
        partUnitPrice: any,
        partInStock: any,
        partMinStock: any,
      ): Chainable<JQuery<HTMLElement>>
      clickOnPO(): Chainable<JQuery<HTMLElement>>
      clickOnCreatePO(): Chainable<JQuery<HTMLElement>>
      verifyCreatePurchaseOrderBtn(): Chainable<JQuery<HTMLElement>>
      createPO(
        mockPoPoId: any,
        partName: any,
        mockPoCode: any,
        mockPoQuantity: any,
        partUnitPrice: any,
      ): Chainable<JQuery<HTMLElement>>
      selectCreatedPo(mockPoPoId: any): Chainable<JQuery<HTMLElement>>
      editPo(
        newPartName: string,
        newMockPoPoId: string,
        newPartUnitPrice: number,
        newPartInStock: number,
      ): Chainable<JQuery<HTMLElement>>
      closeSearchBar(): Chainable<JQuery<HTMLElement>>
      deletePart(newPartName: string): Chainable<JQuery<HTMLElement>>
      completePo(): Chainable<JQuery<HTMLElement>>
      verifyCompletedPO(): Chainable<JQuery<HTMLElement>>
      clickOnPartsInventory(): Chainable<JQuery<HTMLElement>>
      verifyAddPartBtn(): Chainable<JQuery<HTMLElement>>
      verifyAddedParts(partInStock: any): Chainable<JQuery<HTMLElement>>
      verifyCreatePoPage(pageHeader: any): Chainable<JQuery<HTMLElement>>
      verifyEditPartsPage(pageHeader: any, partNam: any): Chainable<JQuery<HTMLElement>>
      archivePart(token: any, partId: any, boolean): Chainable<JQuery<HTMLElement>>
      archivePO(token: any, poId: any, boolean): Chainable<JQuery<HTMLElement>>
      createSmartCode(
        token: any,
        resourceName: any,
        locationId: any,
      ): Chainable<JQuery<HTMLElement>>
      createAsset(token: any, assetName: string, assetDescription: string, locationId: any)
      goToSpacesFromLocation(): Chainable<JQuery<HTMLElement>>
      verifySpacesOfLocation(createdSpace: any): Chainable<JQuery<HTMLElement>>
      verifySpacesOfLocationInPortalForm(
        locatioName: string,
        createdSpace: any,
      ): Chainable<JQuery<HTMLElement>>
      verifySpacesOfLocationInPortal(
        locationName: string,
        createdSpace: any,
      ): Chainable<JQuery<HTMLElement>>
      selectIssueFromDropdown(issueName: string): Chainable<JQuery<HTMLElement>>
      clickOnSubmitButton(): Chainable<JQuery<HTMLElement>>
      verifyIssuesOfSpaceInPortal(
        locationName: string,
        createdSpace: any,
        issueName: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyIssuesOfSpacesInPortal(
        locationName: string,
        createdSpace: any,
        issue1: string,
      ): Chainable<JQuery<HTMLElement>>
      goToAssetsMenu(): Chainable<JQuery<HTMLElement>>
      selectCreatedAsset(createdAsset: any): Chainable<JQuery<HTMLElement>>
      clickOnSaveAsset(): Chainable<JQuery<HTMLElement>>
      verifyAssetWithOutSpace(createdSpace: any): Chainable<JQuery<HTMLElement>>
      selectSpaceInAsset(locationName: string, createdSpace: any): Chainable<JQuery<HTMLElement>>
      removeIssue(issueName: any): Chainable<JQuery<HTMLElement>>
      verifyAssetWithOutIssue(createdSpace: any, issueName: string): Chainable<JQuery<HTMLElement>>
      selectIssueInAsset(issueName: string): Chainable<JQuery<HTMLElement>>
      verifyAutoCompleteInAsset(
        locationName: string,
        createdAsset: any,
      ): Chainable<JQuery<HTMLElement>>
      selectIssuesInAsset(issue1: string, issue2: string): Chainable<JQuery<HTMLElement>>
      verifyIssuesOfAssetsInPortal(
        locationName: string,
        createdAsset: any,
        issue1: string,
      ): Chainable<JQuery<HTMLElement>>
      goToSpaces(): Chainable<JQuery<HTMLElement>>
      spacePreviewWithOutData(locationName: string, spaceName: any): Chainable<JQuery<HTMLElement>>
      fillSpaceModeSpace(
        spaceName: any,
        spaceDescription: any,
        issueName: string,
      ): Chainable<JQuery<HTMLElement>>
      spacePreviewWithData(
        locationName: string,
        spaceName: any,
        spaceDescription: any,
      ): Chainable<JQuery<HTMLElement>>
      clickOnBackButton(): Chainable<JQuery<HTMLElement>>
      verifyTheSelectedIssue(issueName: string): Chainable<JQuery<HTMLElement>>
      fillSpaceModeSpace(spaceName: any, spaceDescription: any): Chainable<JQuery<HTMLElement>>
      uncheckCommentBox(
        locationName: string,
        spaceButton: any,
        spaceName: string,
        saveButton: any,
      ): Chainable<JQuery<HTMLElement>>
      spaceRequestSubmission(
        locationName: string,
        spaceName: string,
        issueName: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyEndusePortalPage(): Chainable<JQuery<HTMLElement>>
      createAPart(
        authToken: any,
        partName: string,
        partDescription: string,
        partUnitPrice: number,
        partInStock: number,
        partMinStock: number,
      ): Chainable<JQuery<HTMLElement>>
      verifyTmeCostButton(): Chainable<JQuery<HTMLElement>>
      clickOnTmeCostButton(): Chainable<JQuery<HTMLElement>>
      verifyTimeTrackinPopUp(): Chainable<JQuery<HTMLElement>>
      clickOnButtonInPopUp(addPart: string): Chainable<JQuery<HTMLElement>>
      verifyAddPartPopUp(): Chainable<JQuery<HTMLElement>>
      clickOnSubmitButtonInPopUp(): Chainable<JQuery<HTMLElement>>
      verifyWarningMessages(selectPart: string): Chainable<JQuery<HTMLElement>>
      verifyWarningMessages(enterQuantity: string): Chainable<JQuery<HTMLElement>>
      enterPartsDetails(
        partName: string,
        partDescription: string,
        partMinStock: number,
        notestextNotes: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyAddedPartsDetails(
        partName: string,
        partMinStock: number,
        partUnitPrice: number,
      ): Chainable<JQuery<HTMLElement>>
      clickOnForwardButton(): Chainable<JQuery<HTMLElement>>
      verifyPartsNotes(notestextNotes: string): Chainable<JQuery<HTMLElement>>
      verifyTimeLogPopUp(): Chainable<JQuery<HTMLElement>>
      enterTimeLog(partMinStock: number, notestextNotes: string): Chainable<JQuery<HTMLElement>>
      verifyTimeLogNotes(notestextNotes: string): Chainable<JQuery<HTMLElement>>
      verifyAddOtherPopUp(): Chainable<JQuery<HTMLElement>>
      enterOtherCostEntry(
        partMinStock: number,
        notestextNotes: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyOtherCostEntryNotes(notestextNotes: string): Chainable<JQuery<HTMLElement>>
      createGroup(
        token: any,
        groupName: any,
        userId: any,
        spcId: any,
      ): Chainable<JQuery<HTMLElement>>
      createAsset(
        token: any,
        assetName: string,
        assetDescription: string,
        locId: any,
      ): Chainable<JQuery<HTMLElement>>
      createVendor(
        token: any,
        vendorName: string,
        vendorDesc: string,
        vendorUserName: string,
        vendorEmail: string,
        vendorMobileNumber: string,
        locId: any,
        asetOneId: any,
      ): Chainable<JQuery<HTMLElement>>
      createCustomer(
        token: any,
        customerName: string,
        customerDesc: string,
        customerUserName: string,
        customerEmail: string,
        customerMobileNumber: string,
        locId: any,
        asetOneId: any,
      ): Chainable<JQuery<HTMLElement>>
      fillticketDeatils(
        priorityState: any,
        assetName: string,
        vendorName: string,
      ): Chainable<JQuery<HTMLElement>>
      createProcedure(
        token: any,
        procedureInternalTitle: string,
        procedureProcedureTitle: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyAssignedGroupUser(groupName: any, userName: any): Chainable<JQuery<HTMLElement>>
      clickOnTcketBody(): Chainable<JQuery<HTMLElement>>
      clickOnScheduleToggleButton(): Chainable<JQuery<HTMLElement>>
      selectTestWatcher(customerEmail: string, ticketTitle: any): Chainable<JQuery<HTMLElement>>
      updateSpaceWithIssue(
        token: any,
        spacId: any,
        locId: any,
        boolean: boolean,
        issueId: any,
        secondIssueId: any,
        commentBoolean: boolean,
      ): Chainable<JQuery<HTMLElement>>
      clickOnIssueCategories(): Chainable<JQuery<HTMLElement>>
      verifyCreatedIssue(vrfyIssuePage: any, issueOneName: string): Chainable<JQuery<HTMLElement>>
      requestSubmission(
        portalText: any,
        locationName: string,
        vrfyPortalSpcPage: any,
        spaceName: string,
        vrfyPortalIssuePage: any,
        issueOneName: string,
        issueTwoName: string,
        vrfyPortalCommnetPage: any,
      ): Chainable<JQuery<HTMLElement>>
      uploadFiles(filePath: string[], ImageLength: any): Chainable<JQuery<HTMLElement>>
      clickOnCommentsTab(): Chainable<JQuery<HTMLElement>>
      verifyUploadedImages(ImageLength: any): Chainable<JQuery<HTMLElement>>
      verifyVendorLoginIsSuccessful(portalText: any): Chainable<JQuery<HTMLElement>>
      verifyEndUserRedirectedToPortal(
        portalUrl: any,
        portalText: any,
      ): Chainable<JQuery<HTMLElement>>
      createUser(
        token: any,
        name: string,
        email: string,
        userPhoneNumber: any,
        role: string,
        locationId: any,
      ): Chainable<JQuery<HTMLElement>>
      getLoginToken(): Chainable<JQuery<HTMLElement>>
      clickOnCreateNewField(): Chainable<JQuery<HTMLElement>>
      createSpace(
        spaceDetails: any,
        spacedetails: any,
        surveyDetails: any,
        Status: any,
      ): Chainable<JQuery<HTMLElement>>
      createSurvey(status: any): Chainable<JQuery<HTMLElement>>
      //portalLogin(portalUrl: any): Chainable<JQuery<HTMLElement>>
      editSurvey(surveyName: any): Chainable<JQuery<HTMLElement>>
      allFieldsRequired(): Chainable<JQuery<HTMLElement>>
      createAndAddTextField(
        sFieldTitle: any,
        pdTitle: any,
        phTitle: any,
        dValue: any,
      ): Chainable<JQuery<HTMLElement>>
      surveyPage(name: string, description: string): Chainable<JQuery<HTMLElement>>
      createSurvey(status: string): Chainable<JQuery<HTMLElement>>
      createAndVerifySurevy(
        spaceName: string,
        spaceDescription: string,
        surveyName: string,
        locationName: string,
      ): Chainable<JQuery<HTMLElement>>
      goToSurvey(surveyName: string): Chainable<JQuery<HTMLElement>>
      createAndAddTextField(
        fieldTitle: string,
        defaultValue: string,
        fieldDescription: string,
        fieldHelperText: string,
      ): Chainable<JQuery<HTMLElement>>
      surveyPreviewWithOutData(locName: string, spacName: string): Chainable<JQuery<HTMLElement>>
      surveyPreviewWithData(
        locName: string,
        spacName: string,
        surveyName: string,
      ): Chainable<JQuery<HTMLElement>>
      goToCreatedSpace(spaceName: string, name: string): Chainable<JQuery<HTMLElement>>
      goToCreatedSpaces(spaceName: string, name: string): Chainable<JQuery<HTMLElement>>
      spacePreviewWithAllData(
        locationName: string,
        spaceName: string,
        surveyName: string,
      ): Chainable<JQuery<HTMLElement>>
      verifySpaceTextField(
        defaultValue: string,
        fieldDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      createAndAddMultiTextField(
        fieldTitle: string,
        defaultValue: string,
        fieldDescription: string,
        fieldHelperText: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyTextField(
        defaultValue: string,
        fieldDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      createAndAddNumberField(
        fieldTitle: string,
        defaultValue: string,
        fieldDescription: string,
        fieldHelperText: string,
      ): Chainable<JQuery<HTMLElement>>
      verifySpaceNumberField(
        defaultValue: string,
        fieldDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      createAndAddDropdownField(
        fieldTitle: string,
        defaultValue: string,
        fieldDescription: string,
        dropDownOptionsOpt1: string,
        dropDownOptionsOpt2: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyDropDownField(defaultValue: string, fieldDescription: string)
      createAndAddCheckboxField(
        fieldTitle: string,
        defaultValue: string,
        fieldDescription: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyDropDownField(surveyfieldDefaultValue: string, fieldDescription: string)
      verifyCheckBoxField(
        defaultValue: string,
        fieldDescription: string,
        surveyfieldDefaultValue: string,
      ): Chainable<JQuery<HTMLElement>>
      portalUrl(portal_url: any, portalText: any): Chainable<JQuery<HTMLElement>>
      authUrl(auth_Url: any, loginTxt: any): Chainable<JQuery<HTMLElement>>
      getLoginToken(): Chainable<JQuery<HTMLElement>>
      createAndAddTextField(
        sFieldTitle: any,
        pdTitle: any,
        phTitle: any,
        dValue: any,
      ): Chainable<JQuery<HTMLElement>>
      createAndAddNumberField(
        sFieldTitle: any,
        pdTitle: any,
        phTitle: any,
        dValue: any,
      ): Chainable<JQuery<HTMLElement>>
      createAndAddMultiTextField(
        sFieldTitle: any,
        pdTitle: any,
        phTitle: any,
        dValue: any,
      ): Chainable<JQuery<HTMLElement>>
      createAndAddCheckboxField(
        sFieldTitle: any,
        pdTitle: any,
        phTitle: any,
      ): Chainable<JQuery<HTMLElement>>
      createAndAddDropdownField(
        sFieldTitle: any,
        pdTitle: any,
        phTitle: any,
        opt1?: any,
        opt2?: any,
      ): Chainable<JQuery<HTMLElement>>
      createSpace(
        spaceTitle: any,
        detail: any,
        survey: any,
        status: any,
      ): Chainable<JQuery<HTMLElement>>
      createLocation(
        name: any,
        latitude: any,
        longitude: any,
        status: any,
      ): Chainable<JQuery<HTMLElement>>
      createSurvey(status: any): Chainable<JQuery<HTMLElement>>
      clearSurveyField(): Chainable<JQuery<HTMLElement>>
      checkIsNumberFieldAllowingString(): Chainable<JQuery<HTMLElement>>
      fieldRequired(): Chainable<JQuery<HTMLElement>>
      inputIntoSurveyField(
        input: any,
        surveyName: any,
        surveyDesc: any,
        pdTitle: any,
        phTitle: any,
      ): Chainable<JQuery<HTMLElement>>
      CheckTheCheckBox(pdTitle: string): Chainable<JQuery<HTMLElement>>
      createSurveyWithDropdownField(
        token: string,
        fieldTitle: string,
        fieldDescription: string,
        fieldHelperText: string,
        fieldHelpertext: string,
      ): Chainable<JQuery<HTMLElement>>
      verifyProcedureDialogueBox(): Chainable<JQuery<HTMLElement>>
      verifyProcedureUpdateDialogueBox(): Chainable<JQuery<HTMLElement>>
      typeAndWaitForFirstCharacter(titleName: string): Chainable<JQuery<HTMLElement>>
      waitForUpdateButton(): Chainable<JQuery<HTMLElement>>
      verifyloggedInUserRole(role: any): Chainable<JQuery<HTMLElement>>
      typeAndCheckValueWithRetry(typeName: any, name: any): Chainable<JQuery<HTMLElement>>
      verifyEditTicketCreationPage(): Chainable<JQuery<HTMLElement>>
      clickOnPeople(): Chainable<JQuery<HTMLElement>>
      verifyStaffAccessInUserCreation(): Chainable<JQuery<HTMLElement>>
      verifyUserCreatePage(): Chainable<JQuery<HTMLElement>>
      clickOnAddUser(): Chainable<JQuery<HTMLElement>>
      clickOnUsers(): Chainable<JQuery<HTMLElement>>
      verifyDropdownHelperText(fieldTitle: string, helpText: string): Chainable<JQuery<HTMLElement>>
      verifyCheckboxHelperText(fieldTitle: string, helpText: string): Chainable<JQuery<HTMLElement>>
      verifyMultiHelperText(fieldTitle: string, helpText: string): Chainable<JQuery<HTMLElement>>
      verifyHelperText(fieldTitle: string, helpText: string): Chainable<JQuery<HTMLElement>>
      fillCutomerDetails(customerName: any): Chainable<JQuery<HTMLElement>>
      verifyVendorDetails(email: any): Chainable<JQuery<HTMLElement>>
    }
  }
}
