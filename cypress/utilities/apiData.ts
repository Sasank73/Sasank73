const apiData = {
  endPointUrl: 'https://api.nodafi-staging.com/graphql',
  format: 'application/json',
  locationCreationqueryData: `
  fragment LocationPageUserInfo on User {
    id
    name
    email
    isActive
    __typename
  }
  
  fragment FileInfo on File {
    id
    contentType
    name
    size
    url
    __typename
  }
  
  fragment FieldEntryInfo on FieldEntry {
    id
    note
    files {
      ...FileInfo
      __typename
    }
    field {
      id
      type
      __typename
    }
    ... on TextFieldEntry {
      text
      __typename
    }
    ... on LongTextFieldEntry {
      longText
      __typename
    }
    ... on NumericFieldEntry {
      number
      __typename
    }
    ... on BinaryFieldEntry {
      boolean
      __typename
    }
    ... on PicklistFieldEntry {
      selectedOption {
        id
        internalTitle
        iconColor
        __typename
      }
      __typename
    }
    ... on LookupFieldEntry {
      resourceRecordId
      __typename
    }
    __typename
  }
  
  fragment LocationInfo on Location {
    id
    name
    lat
    long
    staff {
      ...LocationPageUserInfo
      __typename
    }
    files {
      ...FileInfo
      __typename
    }
    fieldEntries {
      ...FieldEntryInfo
      __typename
    }
    isActive
    createdAt
    updatedAt
    __typename
  }
          mutation createLocation($name: String!, $lat: String!, $long: String!, $staff: [ID!], $isActive: Boolean, $files: [Upload!], $fieldEntries: [CreateFieldEntryInput!]) {
            createLocation(
              data: { name: $name, lat: $lat, long: $long, staffIds: $staff, isActive: $isActive, files: $files, fieldEntries: $fieldEntries }
              files: $files
            ) {
              ...LocationInfo
              __typename
            }
          }
        `,
  locationUpdateQuery: `
        fragment PickerOptionInfo on PickerOption {
          id
          internalTitle
          externalTitle
          internalDescription
          externalDescription
          identifier
          iconName
          iconColor
          isStandard
          isActive
          position
          createdAt
          updatedAt
          __typename
        }

        fragment FieldInfo on Field {
          id
          internalTitle
          internalDescription
          externalTitle
          externalDescription
          type
          key
          __typename
          createdAt
          isActive
          ... on TextField {
            defaultText
            __typename
          }
          ... on LongTextField {
            defaultLongText
            __typename
          }
          ... on NumericField {
            defaultNumber
            __typename
          }
          ... on BinaryField {
            defaultBoolean
            __typename
          }
          ... on PicklistField {
            pickerOptions {
              ...PickerOptionInfo
              __typename
            }
            __typename
          }
        }

        fragment LocationPageUserInfo on User {
          id
          name
          email
          isActive
          __typename
        }

        fragment FileInfo on File {
          id
          contentType
          name
          size
          url
          __typename
        }

        fragment FieldEntryInfo on FieldEntry {
          id
          note
          files {
            ...FileInfo
            __typename
          }
          field {
            id
            type
            __typename
          }
          ... on TextFieldEntry {
            text
            __typename
          }
          ... on LongTextFieldEntry {
            longText
            __typename
          }
          ... on NumericFieldEntry {
            number
            __typename
          }
          ... on BinaryFieldEntry {
            boolean
            __typename
          }
          ... on PicklistFieldEntry {
            selectedOption {
              id
              internalTitle
              iconColor
              __typename
            }
            __typename
          }
          ... on LookupFieldEntry {
            resourceRecordId
            __typename
          }
          __typename
        }

        fragment LocationInfo on Location {
          id
          name
          lat
          long
          staff {
            ...LocationPageUserInfo
            __typename
          }
          files {
            ...FileInfo
            __typename
          }
          fieldEntries {
            ...FieldEntryInfo
            __typename
          }
          isActive
          createdAt
          updatedAt
          __typename
        }

        query UpdateLocationPageQuery($locationId: ID!) {
          staff(where: { isActive: true }) {
            ...LocationPageUserInfo
            __typename
          }
          fields(
            where: {
              resourceIdentifier: { equals: /"LOCATION/" }
              isStandard: false
              isActive: true
            }
          ) {
            ...FieldInfo
            __typename
          }
          location(id: $locationId) {
            ...LocationInfo
            __typename
          }
        }
      `,
  spaceCreationQuery: `fragment SpacePageIssueInfo on Issue {
    id
    name
    position
    description
    userCommentRequired
    isActive
    __typename
  }
  
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }
  
  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
  }
  
  fragment FieldSetInfo on FieldSet {
    id
    internalTitle
    internalDescription
    fieldItems {
      id
      field {
        ...FieldInfo
        __typename
      }
      isRequired
      position
      __typename
    }
    __typename
  }
  
  fragment SurveyInfo on Survey {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    isActive
    fieldSet {
      ...FieldSetInfo
      __typename
    }
    __typename
  }
  
  fragment FileInfo on File {
    id
    contentType
    name
    size
    url
    __typename
  }
  
  fragment FieldEntryInfo on FieldEntry {
    id
    note
    files {
      ...FileInfo
      __typename
    }
    field {
      id
      type
      __typename
    }
    ... on TextFieldEntry {
      text
      __typename
    }
    ... on LongTextFieldEntry {
      longText
      __typename
    }
    ... on NumericFieldEntry {
      number
      __typename
    }
    ... on BinaryFieldEntry {
      boolean
      __typename
    }
    ... on PicklistFieldEntry {
      selectedOption {
        id
        internalTitle
        iconColor
        __typename
      }
      __typename
    }
    ... on LookupFieldEntry {
      resourceRecordId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  fragment SpaceSubmissionSettingsInfo on SpaceSubmissionSettings {
    ticketSubmissionSettings {
      collectionName
      collectionDescription
      attributes {
        formData {
          collectionName
          collectionDescription
          attributes {
            comments {
              attributeName
              attributeDescription
              value
              __typename
            }
            images {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        isCaptchaRequired {
          value
          __typename
        }
        submitterConfiguration {
          collectionName
          collectionDescription
          attributes {
            userData {
              attributeName
              attributeDescription
              value {
                requirementType
                ... on SubmissionUserDataOptional {
                  userFieldSet {
                    id
                    isActive
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                ... on SubmissionUserDataRequired {
                  userFieldSet {
                    id
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            isAuthenticationRequired {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment SpaceOnLocationInfo on Space {
    id
    name
    isActive
    parentSpace {
      id
      name
      __typename
    }
    childSpaces {
      id
      name
      __typename
    }
    __typename
  }
  
  fragment SpacePageLocationInfo on Location {
    id
    name
    isActive
    spaces {
      ...SpaceOnLocationInfo
      __typename
    }
    __typename
  }
  
  fragment SpacePageSpaceInfo on Space {
    id
    name
    detail
    pin
    isActive
    isUserCommentEnabled
    location {
      ...SpacePageLocationInfo
      __typename
    }
    fieldEntries {
      ...FieldEntryInfo
      __typename
    }
    type {
      id
      name
      __typename
    }
    issues {
      ...SpacePageIssueInfo
      __typename
    }
    submissionSettings {
      ...SpaceSubmissionSettingsInfo
      __typename
    }
    survey {
      ...SurveyInfo
      __typename
    }
    childSpaces {
      id
      name
      isActive
      __typename
    }
    parentSpace {
      id
      name
      isActive
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  mutation createSpace($name: String!, $detail: String!, $issues: [ID!]!, $isUserCommentEnabled: Boolean!, $location: ID!, $survey: ID, $fieldEntries: [CreateFieldEntryInput!], $parentSpace: ID) {
    createSpace(
      data: {name: $name, detail: $detail, issueIds: $issues, isUserCommentEnabled: $isUserCommentEnabled, locationId: $location, surveyId: $survey, fieldEntries: $fieldEntries, parentSpaceId: $parentSpace}
    ) {
      ...SpacePageSpaceInfo
      __typename
    }
  }`,

  getUserfieldSetId: `fragment SpacePageIssueInfo on Issue {
    id
    name
    position
    description
    userCommentRequired
    isActive
    __typename
  }
  
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }
  
  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
    ... on LookupField {
      lookupOptionsResourceIdentifier
      __typename
    }
  }
  
  fragment FieldSetInfo on FieldSet {
    id
    internalTitle
    internalDescription
    fieldItems {
      id
      field {
        ...FieldInfo
        __typename
      }
      isRequired
      position
      __typename
    }
    __typename
  }
  
  fragment SurveyInfo on Survey {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    isActive
    fieldSet {
      ...FieldSetInfo
      __typename
    }
    __typename
  }
  
  fragment FileInfo on File {
    id
    contentType
    name
    size
    url
    __typename
  }
  
  fragment FieldEntryInfo on FieldEntry {
    id
    note
    files {
      ...FileInfo
      __typename
    }
    field {
      id
      type
      __typename
    }
    ... on TextFieldEntry {
      text
      __typename
    }
    ... on LongTextFieldEntry {
      longText
      __typename
    }
    ... on NumericFieldEntry {
      number
      __typename
    }
    ... on BinaryFieldEntry {
      boolean
      __typename
    }
    ... on PicklistFieldEntry {
      selectedOption {
        id
        internalTitle
        iconColor
        __typename
      }
      __typename
    }
    ... on LookupFieldEntry {
      resourceRecordId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  fragment SpaceSubmissionSettingsInfo on SpaceSubmissionSettings {
    ticketSubmissionSettings {
      collectionName
      collectionDescription
      attributes {
        formData {
          collectionName
          collectionDescription
          attributes {
            comments {
              attributeName
              attributeDescription
              value
              __typename
            }
            images {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        isCaptchaRequired {
          value
          __typename
        }
        submitterConfiguration {
          collectionName
          collectionDescription
          attributes {
            userData {
              attributeName
              attributeDescription
              value {
                requirementType
                ... on SubmissionUserDataOptional {
                  userFieldSet {
                    id
                    isActive
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                ... on SubmissionUserDataRequired {
                  userFieldSet {
                    id
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            isAuthenticationRequired {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment SpaceOnLocationInfo on Space {
    id
    name
    isActive
    parentSpace {
      id
      name
      __typename
    }
    childSpaces {
      id
      name
      __typename
    }
    __typename
  }
  
  fragment SpacePageLocationInfo on Location {
    id
    name
    isActive
    spaces {
      ...SpaceOnLocationInfo
      __typename
    }
    __typename
  }
  
  fragment SpacePageSpaceInfo on Space {
    id
    name
    detail
    pin
    isActive
    isUserCommentEnabled
    location {
      ...SpacePageLocationInfo
      __typename
    }
    fieldEntries {
      ...FieldEntryInfo
      __typename
    }
    type {
      id
      name
      __typename
    }
    issues {
      ...SpacePageIssueInfo
      __typename
    }
    submissionSettings {
      ...SpaceSubmissionSettingsInfo
      __typename
    }
    survey {
      ...SurveyInfo
      __typename
    }
    childSpaces {
      id
      name
      isActive
      __typename
    }
    parentSpace {
      id
      name
      isActive
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  query UpdateSpacePageQuery($id: ID!) {
    fields(
      where: {resourceIdentifier: {equals: "SPACE"}, isStandard: false, isActive: true}
    ) {
      ...FieldInfo
      __typename
    }
    space(id: $id) {
      ...SpacePageSpaceInfo
      __typename
    }
    surveys {
      ...SurveyInfo
      __typename
    }
    issues(where: {isActive: true}) {
      ...SpacePageIssueInfo
      __typename
    }
  }`,
  spaceUpdateQuery: `fragment SpacePageIssueInfo on Issue {
    id
    name
    position
    description
    userCommentRequired
    isActive
    __typename
  }
  
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }
  
  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
  }
  
  fragment FieldSetInfo on FieldSet {
    id
    internalTitle
    internalDescription
    fieldItems {
      id
      field {
        ...FieldInfo
        __typename
      }
      isRequired
      position
      __typename
    }
    __typename
  }
  
  fragment SurveyInfo on Survey {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    isActive
    fieldSet {
      ...FieldSetInfo
      __typename
    }
    __typename
  }
  
  fragment FileInfo on File {
    id
    contentType
    name
    size
    url
    __typename
  }
  
  fragment FieldEntryInfo on FieldEntry {
    id
    note
    files {
      ...FileInfo
      __typename
    }
    field {
      id
      type
      __typename
    }
    ... on TextFieldEntry {
      text
      __typename
    }
    ... on LongTextFieldEntry {
      longText
      __typename
    }
    ... on NumericFieldEntry {
      number
      __typename
    }
    ... on BinaryFieldEntry {
      boolean
      __typename
    }
    ... on PicklistFieldEntry {
      selectedOption {
        id
        internalTitle
        iconColor
        __typename
      }
      __typename
    }
    ... on LookupFieldEntry {
      resourceRecordId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  fragment SpaceSubmissionSettingsInfo on SpaceSubmissionSettings {
    ticketSubmissionSettings {
      collectionName
      collectionDescription
      attributes {
        formData {
          collectionName
          collectionDescription
          attributes {
            comments {
              attributeName
              attributeDescription
              value
              __typename
            }
            images {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        isCaptchaRequired {
          value
          __typename
        }
        submitterConfiguration {
          collectionName
          collectionDescription
          attributes {
            userData {
              attributeName
              attributeDescription
              value {
                requirementType
                ... on SubmissionUserDataOptional {
                  userFieldSet {
                    id
                    isActive
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                ... on SubmissionUserDataRequired {
                  userFieldSet {
                    id
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            isAuthenticationRequired {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment SpaceOnLocationInfo on Space {
    id
    name
    isActive
    parentSpace {
      id
      name
      __typename
    }
    childSpaces {
      id
      name
      __typename
    }
    __typename
  }
  
  fragment SpacePageLocationInfo on Location {
    id
    name
    isActive
    spaces {
      ...SpaceOnLocationInfo
      __typename
    }
    __typename
  }
  
  fragment SpacePageSpaceInfo on Space {
    id
    name
    detail
    pin
    isActive
    isUserCommentEnabled
    location {
      ...SpacePageLocationInfo
      __typename
    }
    fieldEntries {
      ...FieldEntryInfo
      __typename
    }
    type {
      id
      name
      __typename
    }
    issues {
      ...SpacePageIssueInfo
      __typename
    }
    submissionSettings {
      ...SpaceSubmissionSettingsInfo
      __typename
    }
    survey {
      ...SurveyInfo
      __typename
    }
    childSpaces {
      id
      name
      isActive
      __typename
    }
    parentSpace {
      id
      name
      isActive
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  mutation updateSpace($id: ID!, $name: String, $detail: String, $issues: [ID!], $survey: ID, $isUserCommentEnabled: Boolean, $isActive: Boolean, $submissionSettings: SpaceSubmissionSettingsInput, $fieldEntries: [CreateFieldEntryInput!], $parentSpace: ID) {
    updateSpace(
      id: $id
      data: {name: $name, detail: $detail, issueIds: $issues, surveyId: $survey, isUserCommentEnabled: $isUserCommentEnabled, isActive: $isActive, submissionSettings: $submissionSettings, fieldEntries: $fieldEntries, parentSpaceId: $parentSpace}
    ) {
      ...SpacePageSpaceInfo
      __typename
    }
  }`,

  issueCreationQuery: `
      fragment IssueInfo on Issue {
        id
        name
        description
        isActive
        position
        spaces {
          id
          name
          __typename
        }
        assets {
          id
          name
          __typename
        }
        visibilitySettings {
          isVisibleToPublic
          roles
          __typename
        }
        userCommentRequired
        useDescriptionAsTitle
        createdAt
        updatedAt
        __typename
      }
  
      mutation createIssue($name: String!, $description: String, $spaces: [ID!], $assets: [ID!], $userCommentRequired: Boolean, $useDescriptionAsTitle: Boolean, $position: Int, $visibilitySettings: VisibilitySettingsInput) {
        createIssue(
          data: {name: $name, description: $description, spaceIds: $spaces, assetIds: $assets, userCommentRequired: $userCommentRequired, useDescriptionAsTitle: $useDescriptionAsTitle, position: $position, visibilitySettings: $visibilitySettings}
        ) {
          ...IssueInfo
          __typename
        }
      }`,

  createSurveyQuery: `
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }

  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
  }

  fragment BaseSurveyInfo on Survey {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    isActive
    fieldSet {
      id
      fieldItems {
        id
        field {
          ...FieldInfo
          __typename
        }
        isRequired
        position
        __typename
      }
      __typename
    }
    __typename
  }

  mutation createSurvey(
    $internalTitle: String!
    $internalDescription: String!
    $externalTitle: String!
    $externalDescription: String!
    $fieldSetItems: [CreateFieldSetItemWithoutFieldSetInput!]!
  ) {
    createSurvey(
      data: {
        internalTitle: $internalTitle
        internalDescription: $internalDescription
        externalTitle: $externalTitle
        externalDescription: $externalDescription
        fieldSetItems: $fieldSetItems
        spaceIds: []
      }
    ) {
      ...BaseSurveyInfo
      __typename
    }
  }
`,

  createSurveywithTextFieldquery: `
      fragment PickerOptionInfo on PickerOption {
        id
        internalTitle
        externalTitle
        internalDescription
        externalDescription
        identifier
        iconName
        iconColor
        isStandard
        isActive
        position
        createdAt
        updatedAt
        __typename
      }
    
      fragment FieldInfo on Field {
        id
        internalTitle
        internalDescription
        externalTitle
        externalDescription
        type
        key
        __typename
        createdAt
        isActive
        ... on TextField {
          defaultText
          __typename
        }
        ... on LongTextField {
          defaultLongText
          __typename
        }
        ... on NumericField {
          defaultNumber
          __typename
        }
        ... on BinaryField {
          defaultBoolean
          __typename
        }
        ... on PicklistField {
          pickerOptions {
            ...PickerOptionInfo
            __typename
          }
          __typename
        }
      }
    
      mutation createField(
        $internalTitle: String!
        $externalTitle: String!
        $internalDescription: String!
        $externalDescription: String!
        $type: CustomFieldType!
        $defaultText: String
        $defaultLongText: String
        $defaultNumber: Float
        $defaultBoolean: Boolean
        $resourceIdentifier: String!
        $key: String
        $pickerOptions: [CreatePickerOptionWithoutFieldInput!]
      ) {
        createField(
          data: {
            internalTitle: $internalTitle
            externalTitle: $externalTitle
            internalDescription: $internalDescription
            externalDescription: $externalDescription
            type: $type
            defaultText: $defaultText
            defaultLongText: $defaultLongText
            defaultNumber: $defaultNumber
            defaultBoolean: $defaultBoolean
            resourceIdentifier: $resourceIdentifier
            key: $key
            pickerOptions: $pickerOptions
          }
        ) {
          ...FieldInfo
          __typename
        }
      }
    `,
  updateSurveyCustomFieldQuery: `
    fragment PickerOptionInfo on PickerOption {
      id
      internalTitle
      externalTitle
      internalDescription
      externalDescription
      identifier
      iconName
      iconColor
      isStandard
      isActive
      position
      createdAt
      updatedAt
      __typename
    }
  
    fragment FieldInfo on Field {
      id
      internalTitle
      internalDescription
      externalTitle
      externalDescription
      type
      key
      __typename
      createdAt
      isActive
      ... on TextField {
        defaultText
        __typename
      }
      ... on LongTextField {
        defaultLongText
        __typename
      }
      ... on NumericField {
        defaultNumber
        __typename
      }
      ... on BinaryField {
        defaultBoolean
        __typename
      }
      ... on PicklistField {
        pickerOptions {
          ...PickerOptionInfo
          __typename
        }
        __typename
      }
    }
  
    fragment BaseSurveyInfo on Survey {
      id
      internalTitle
      internalDescription
      externalTitle
      externalDescription
      isActive
      fieldSet {
        id
        fieldItems {
          id
          field {
            ...FieldInfo
            __typename
          }
          isRequired
          position
          __typename
        }
        __typename
      }
      __typename
    }
  
    mutation updateSurvey($id: ID!, $internalTitle: String, $internalDescription: String, $externalTitle: String, $externalDescription: String, $isActive: Boolean, $fieldSetItems: [CreateFieldSetItemWithoutFieldSetInput!]) {
      updateSurvey(
        id: $id
        data: {
          internalTitle: $internalTitle
          internalDescription: $internalDescription
          externalTitle: $externalTitle
          externalDescription: $externalDescription
          isActive: $isActive
          fieldSetItems: $fieldSetItems
        }
      ) {
        ...BaseSurveyInfo
        __typename
      }
    }
  `,
  createSurveyWithMultiTextFieldQuery: `
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }

  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
  }

  mutation createField(
    $internalTitle: String!
    $externalTitle: String!
    $internalDescription: String!
    $externalDescription: String!
    $type: CustomFieldType!
    $defaultText: String
    $defaultLongText: String
    $defaultNumber: Float
    $defaultBoolean: Boolean
    $resourceIdentifier: String!
    $key: String
    $pickerOptions: [CreatePickerOptionWithoutFieldInput!]
  ) {
    createField(
      data: {
        internalTitle: $internalTitle
        externalTitle: $externalTitle
        internalDescription: $internalDescription
        externalDescription: $externalDescription
        type: $type
        defaultText: $defaultText
        defaultLongText: $defaultLongText
        defaultNumber: $defaultNumber
        defaultBoolean: $defaultBoolean
        resourceIdentifier: $resourceIdentifier
        key: $key
        pickerOptions: $pickerOptions
      }
    ) {
      ...FieldInfo
      __typename
    }
  }
`,
  createSurveyWithNumberQuery: `
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }
  
  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
  }
  
  mutation createField(
    $internalTitle: String!
    $externalTitle: String!
    $internalDescription: String!
    $externalDescription: String!
    $type: CustomFieldType!
    $defaultText: String
    $defaultLongText: String
    $defaultNumber: Float
    $defaultBoolean: Boolean
    $resourceIdentifier: String!
    $key: String
    $pickerOptions: [CreatePickerOptionWithoutFieldInput!]
  ) {
    createField(
      data: {
        internalTitle: $internalTitle
        externalTitle: $externalTitle
        internalDescription: $internalDescription
        externalDescription: $externalDescription
        type: $type
        defaultText: $defaultText
        defaultLongText: $defaultLongText
        defaultNumber: $defaultNumber
        defaultBoolean: $defaultBoolean
        resourceIdentifier: $resourceIdentifier
        key: $key
        pickerOptions: $pickerOptions
      }
    ) {
      ...FieldInfo
      __typename
    }
  }
`,
  createSurveyWithCheckboxField: `
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }

  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
  }

  mutation createField(
    $internalTitle: String!
    $externalTitle: String!
    $internalDescription: String!
    $externalDescription: String!
    $type: CustomFieldType!
    $defaultText: String
    $defaultLongText: String
    $defaultNumber: Float
    $defaultBoolean: Boolean
    $resourceIdentifier: String!
    $key: String
    $pickerOptions: [CreatePickerOptionWithoutFieldInput!]
  ) {
    createField(
      data: {
        internalTitle: $internalTitle
        externalTitle: $externalTitle
        internalDescription: $internalDescription
        externalDescription: $externalDescription
        type: $type
        defaultText: $defaultText
        defaultLongText: $defaultLongText
        defaultNumber: $defaultNumber
        defaultBoolean: $defaultBoolean
        resourceIdentifier: $resourceIdentifier
        key: $key
        pickerOptions: $pickerOptions
      }
    ) {
      ...FieldInfo
      __typename
    }
  }
`,
  createSurveyWithDropdownQuery: `
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }

  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
  }

  mutation createField(
    $internalTitle: String!
    $externalTitle: String!
    $internalDescription: String!
    $externalDescription: String!
    $type: CustomFieldType!
    $defaultText: String
    $defaultLongText: String
    $defaultNumber: Float
    $defaultBoolean: Boolean
    $resourceIdentifier: String!
    $key: String
    $pickerOptions: [CreatePickerOptionWithoutFieldInput!]
  ) {
    createField(
      data: {
        internalTitle: $internalTitle
        externalTitle: $externalTitle
        internalDescription: $internalDescription
        externalDescription: $externalDescription
        type: $type
        defaultText: $defaultText
        defaultLongText: $defaultLongText
        defaultNumber: $defaultNumber
        defaultBoolean: $defaultBoolean
        resourceIdentifier: $resourceIdentifier
        key: $key
        pickerOptions: $pickerOptions
      }
    ) {
      ...FieldInfo
      __typename
    }
  }
`,
  addSurveyInSpaceQuery: `fragment SpacePageIssueInfo on Issue {
    id
    name
    position
    description
    userCommentRequired
    isActive
    __typename
  }
  
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }
  
  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
    ... on LookupField {
      lookupOptionsResourceIdentifier
      __typename
    }
  }
  
  fragment FieldSetInfo on FieldSet {
    id
    internalTitle
    internalDescription
    fieldItems {
      id
      field {
        ...FieldInfo
        __typename
      }
      isRequired
      position
      __typename
    }
    __typename
  }
  
  fragment SurveyInfo on Survey {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    isActive
    fieldSet {
      ...FieldSetInfo
      __typename
    }
    __typename
  }
  
  fragment FileInfo on File {
    id
    contentType
    name
    size
    url
    __typename
  }
  
  fragment FieldEntryInfo on FieldEntry {
    id
    note
    files {
      ...FileInfo
      __typename
    }
    field {
      id
      type
      __typename
    }
    ... on TextFieldEntry {
      text
      __typename
    }
    ... on LongTextFieldEntry {
      longText
      __typename
    }
    ... on NumericFieldEntry {
      number
      __typename
    }
    ... on BinaryFieldEntry {
      boolean
      __typename
    }
    ... on PicklistFieldEntry {
      selectedOption {
        id
        internalTitle
        iconColor
        __typename
      }
      __typename
    }
    ... on LookupFieldEntry {
      resourceRecordId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  fragment SpaceSubmissionSettingsInfo on SpaceSubmissionSettings {
    ticketSubmissionSettings {
      collectionName
      collectionDescription
      attributes {
        formData {
          collectionName
          collectionDescription
          attributes {
            comments {
              attributeName
              attributeDescription
              value
              __typename
            }
            images {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        isCaptchaRequired {
          value
          __typename
        }
        submitterConfiguration {
          collectionName
          collectionDescription
          attributes {
            userData {
              attributeName
              attributeDescription
              value {
                requirementType
                ... on SubmissionUserDataOptional {
                  userFieldSet {
                    id
                    isActive
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                ... on SubmissionUserDataRequired {
                  userFieldSet {
                    id
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            isAuthenticationRequired {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment SpaceOnLocationInfo on Space {
    id
    name
    isActive
    parentSpace {
      id
      name
      __typename
    }
    childSpaces {
      id
      name
      __typename
    }
    __typename
  }
  
  fragment SpacePageLocationInfo on Location {
    id
    name
    isActive
    spaces {
      ...SpaceOnLocationInfo
      __typename
    }
    __typename
  }
  
  fragment SpacePageSpaceInfo on Space {
    id
    name
    detail
    pin
    isActive
    isUserCommentEnabled
    location {
      ...SpacePageLocationInfo
      __typename
    }
    fieldEntries {
      ...FieldEntryInfo
      __typename
    }
    type {
      id
      name
      __typename
    }
    issues {
      ...SpacePageIssueInfo
      __typename
    }
    submissionSettings {
      ...SpaceSubmissionSettingsInfo
      __typename
    }
    survey {
      ...SurveyInfo
      __typename
    }
    childSpaces {
      id
      name
      isActive
      __typename
    }
    parentSpace {
      id
      name
      isActive
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  mutation createSpace($name: String!, $detail: String!, $issues: [ID!]!, $isUserCommentEnabled: Boolean!, $location: ID!, $survey: ID, $fieldEntries: [CreateFieldEntryInput!], $parentSpace: ID) {
    createSpace(
      data: {name: $name, detail: $detail, issueIds: $issues, isUserCommentEnabled: $isUserCommentEnabled, locationId: $location, surveyId: $survey, fieldEntries: $fieldEntries, parentSpaceId: $parentSpace}
    ) {
      ...SpacePageSpaceInfo
      __typename
    }
  }`,

  updateSurveyWithAllFieldsQuery: `fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }
  
  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
    ... on LookupField {
      lookupOptionsResourceIdentifier
      __typename
    }
  }
  
  fragment BaseSurveyInfo on Survey {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    isActive
    fieldSet {
      id
      fieldItems {
        id
        field {
          ...FieldInfo
          __typename
        }
        isRequired
        position
        __typename
      }
      __typename
    }
    __typename
  }
  
  mutation updateSurvey($id: ID!, $internalTitle: String, $internalDescription: String, $externalTitle: String, $externalDescription: String, $isActive: Boolean, $fieldSetItems: [CreateFieldSetItemWithoutFieldSetInput!]) {
    updateSurvey(
      id: $id
      data: {internalTitle: $internalTitle, internalDescription: $internalDescription, externalTitle: $externalTitle, externalDescription: $externalDescription, isActive: $isActive, fieldSetItems: $fieldSetItems}
    ) {
      ...BaseSurveyInfo
      __typename
    }
  }`,

  archiveLocationQuery: `fragment LocationInfo on Location {
    id
    isActive
  }
  
  mutation updateLocation($id: ID!, $name: String, $lat: String, $long: String, $staff: [ID!], $isActive: Boolean, $files: [Upload!], $fieldEntries: [CreateFieldEntryInput!]) {
    updateLocation(
      id: $id
      data: {name: $name, lat: $lat, long: $long, staffIds: $staff, isActive: $isActive, files: $files, fieldEntries: $fieldEntries}
      files: $files
    ) {
      ...LocationInfo
      __typename
    }
  }
  `,
  archiveIssueQuery: `fragment IssueInfo on Issue {
    id
    isActive
  }
  
  mutation updateIssue($id: ID!, $name: String, $description: String, $spaces: [ID!], $assets: [ID!], $userCommentRequired: Boolean, $useDescriptionAsTitle: Boolean, $isActive: Boolean, $position: Int, $visibilitySettings: VisibilitySettingsInput) {
    updateIssue(
      id: $id
      data: {name: $name, description: $description, spaceIds: $spaces, assetIds: $assets, userCommentRequired: $userCommentRequired, useDescriptionAsTitle: $useDescriptionAsTitle, isActive: $isActive, position: $position, visibilitySettings: $visibilitySettings}
    ) {
      ...IssueInfo
      __typename
    }
  }`,

  createAssetQuery: `fragment AssetInfo on Asset {
    id
    name
    description
    isActive
    location {
      id
      name
      isActive
      __typename
    }
    spaces {
      id
      name
      isActive
      location {
        id
        __typename
      }
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  mutation createAsset($name: String!, $description: String!, $location: ID!, $spaces: [ID!], $issues: [ID!], $vendors: [ID!], $customers: [ID!], $serialNumber: String, $model: String, $manufacturer: String, $year: Int, $code: String, $installDate: DateTime, $isActive: Boolean, $files: [Upload!], $fieldEntries: [CreateFieldEntryInput!]) {
    createAsset(
      data: {name: $name, description: $description, locationId: $location, spaceIds: $spaces, issueIds: $issues, vendorIds: $vendors, customerIds: $customers, serialNumber: $serialNumber, model: $model, manufacturer: $manufacturer, year: $year, code: $code, installDate: $installDate, isActive: $isActive, files: $files, fieldEntries: $fieldEntries}
      files: $files
    ) {
      ...AssetInfo
      __typename
    }
  }`,

  createSmartCodeQuery: `mutation ($data: CreateSmartCodeInput!) {
    createSmartCode(data: $data) {
      id
    }
  }
  `,
  archiveAssetQuery: `fragment AssetInfo on Asset {
    id
    name
    description
    isActive
  }
  mutation updateAsset($id: ID!, $name: String, $description: String, $isActive: Boolean) {
    updateAsset(
      id: $id
      data: {name: $name, description: $description,isActive: $isActive}) {
      ...AssetInfo
      __typename
    }
  }`,
  createPartQuery: `fragment PartsPageInfo on Part {
    id
    name
    description
    code
    pricePerUnit
    pricePerUnitFormatted
    unitsInStock
    minimumUnitsInStock
    availableQuantity
    space {
      id
      name
      isActive
      __typename
    }
    images {
      id
      contentType
      name
      size
      url
      __typename
    }
    files {
      id
      contentType
      name
      size
      url
      __typename
    }
    assets {
      id
      name
      isActive
      __typename
    }
    location {
      id
      name
      isActive
      __typename
    }
    defaultAssignedGroup {
      id
      name
      isActive
      __typename
    }
    isActive
    createdAt
    updatedAt
    __typename
  }
  
  mutation createPart($name: String!, $description: String, $code: String, $unitsInStock: Int!, $minimumUnitsInStock: Int!, $pricePerUnit: Int!, $location: ID, $space: ID, $defaultAssignedGroup: ID, $assets: [ID!], $files: [Upload!], $images: [Upload!], $isActive: Boolean) {
    createPart(
      data: {name: $name, description: $description, code: $code, unitsInStock: $unitsInStock, minimumUnitsInStock: $minimumUnitsInStock, pricePerUnit: $pricePerUnit, locationId: $location, spaceId: $space, defaultAssignedGroupId: $defaultAssignedGroup, assetIds: $assets, files: $files, images: $images, isActive: $isActive}
      files: $files
    ) {
      ...PartsPageInfo
      __typename
    }
  }`,

  archivePartQuery: `fragment PartsPageInfo on Part {
    id
    name
    description
    code
    pricePerUnit
    pricePerUnitFormatted
    unitsInStock
    minimumUnitsInStock
    availableQuantity
    isActive
    createdAt
    updatedAt
    __typename
  }
  
  mutation updatePart($id: ID!,$isActive: Boolean) {
    updatePart(
      id: $id
      data: {isActive: $isActive}
    ) {
      ...PartsPageInfo
      __typename
    }
  }`,

  archivePoQuery: `fragment PurchaseOrdersPageInfo on PurchaseOrder {
  id
  id
  note
  externalId
  status
  totalAmountFormatted
  isActive
}

mutation updatePurchaseOrder($id: ID!, $isActive: Boolean) {
  updatePurchaseOrder(
    id: $id
    data: {isActive: $isActive}
  ) {
    ...PurchaseOrdersPageInfo
    __typename
  }
}`,

  createVendorQuery: `fragment AddressInfo on Address {
  id
  name
  address1
  address2
  address3
  city
  stateCode
  countryCode
  postalCode
  createdAt
  updatedAt
  __typename
}

fragment FileInfo on File {
  id
  contentType
  name
  size
  url
  __typename
}

fragment FieldEntryInfo on FieldEntry {
  id
  note
  files {
    ...FileInfo
    __typename
  }
  field {
    id
    type
    __typename
  }
  ... on TextFieldEntry {
    text
    __typename
  }
  ... on LongTextFieldEntry {
    longText
    __typename
  }
  ... on NumericFieldEntry {
    number
    __typename
  }
  ... on BinaryFieldEntry {
    boolean
    __typename
  }
  ... on PicklistFieldEntry {
    selectedOption {
      id
      internalTitle
      iconColor
      __typename
    }
    __typename
  }
  ... on LookupFieldEntry {
    resourceRecordId
    __typename
  }
  createdAt
  updatedAt
  __typename
}

fragment UserCommonUserInfo on User {
  id
  name
  detail
  email
  role
  phone
  isActive
  locations(where: {isActive: true}) {
    id
    name
    isActive
    __typename
  }
  groups {
    id
    name
    isActive
    __typename
  }
  defaultGroup {
    id
    name
    __typename
  }
  fieldEntries {
    ...FieldEntryInfo
    __typename
  }
  createdAt
  updatedAt
  __typename
}

fragment ExternalOrganizationInfo on ExternalOrganization {
  id
  name
  description
  url
  createdAt
  updatedAt
  files {
    ...FileInfo
    __typename
  }
  memberships(where: $usersWhere) {
    id
    user {
      ...UserCommonUserInfo
      __typename
    }
    __typename
  }
  assets {
    id
    name
    isActive
    __typename
  }
  locations {
    id
    name
    isActive
    __typename
  }
  addresses {
    ...AddressInfo
    __typename
  }
  isActive
  fieldEntries {
    ...FieldEntryInfo
    __typename
  }
  type {
    id
    identifier
    internalTitle
    internalDescription
    __typename
  }
  __typename
}

mutation createExternalOrganization($name: String!, $description: String!, $typeIdentifier: String!, $url: String, $memberships: [CreateExternalOrganizationMembershipWithoutExternalOrganizationInput!]!, $createAddressInput: CreateAddressInput, $locations: [ID!], $assets: [ID!], $files: [Upload!], $usersWhere: UsersWhereInput, $fieldEntries: [CreateFieldEntryInput!]) {
  createExternalOrganization(
    data: {name: $name, description: $description, typeIdentifier: $typeIdentifier, url: $url, memberships: $memberships, createAddressInput: $createAddressInput, locationIds: $locations, assetIds: $assets, files: $files, fieldEntries: $fieldEntries}
    files: $files
  ) {
    ...ExternalOrganizationInfo
    __typename
  }
}`,

  archiveVendorQuery: `fragment UserCommonUserInfo on User {
  id
  name
  detail
  email
  role
  phone
  isActive
  locations(where: {isActive: true}) {
    id
    name
    isActive
    __typename
  }
  groups {
    id
    name
    isActive
    __typename
  }
  defaultGroup {
    id
    name
    __typename
  }
  createdAt
  updatedAt
  __typename
}

fragment ExternalOrganizationInfo on ExternalOrganization {
  id
  name
  description
  url
  createdAt
  updatedAt
  memberships(where: $usersWhere) {
    id
    user {
      ...UserCommonUserInfo
      __typename
    }
    __typename
  }
  assets {
    id
    name
    isActive
    __typename
  }
  locations {
    id
    name
    isActive
    __typename
  }
  type {
    id
    identifier
    internalTitle
    internalDescription
    __typename
  }
  __typename
}

mutation updateExternalOrganization($id: ID!, $name: String, $description: String, $url: String, $membershipUpdateInputs: [UpdateExternalOrganizationMembershipWithoutExternalOrganizationInput!], $updateAddressInput: UpdateNestedAddressInput, $locations: [ID!], $assets: [ID!], $isActive: Boolean, $usersWhere: UsersWhereInput,) {
  updateExternalOrganization(
    id: $id
    data: {name: $name, description: $description, url: $url, membershipUpdateInputs: $membershipUpdateInputs, updateAddressInput: $updateAddressInput, locationIds: $locations, assetIds: $assets, isActive: $isActive}
  ) {
    ...ExternalOrganizationInfo
    __typename
  }
}`,

  createCustomerQuery: `fragment FileInfo on File {
  id
  contentType
  name
  size
  url
  __typename
}

fragment UserCommonUserInfo on User {
  id
  name
  detail
  email
  role
  phone
  isActive
  locations(where: {isActive: true}) {
    id
    name
    isActive
    __typename
  }
  groups {
    id
    name
    isActive
    __typename
  }
  defaultGroup {
    id
    name
    __typename
  }
  createdAt
  updatedAt
  __typename
}

fragment ExternalOrganizationInfo on ExternalOrganization {
  id
  name
  description
  url
  createdAt
  updatedAt
  files {
    ...FileInfo
    __typename
  }
  memberships(where: $usersWhere) {
    id
    user {
      ...UserCommonUserInfo
      __typename
    }
    __typename
  }
  assets {
    id
    name
    isActive
    __typename
  }
  locations {
    id
    name
    isActive
    __typename
  }
  isActive
  type {
    id
    identifier
    internalTitle
    internalDescription
    __typename
  }
  __typename
}

mutation createExternalOrganization($name: String!, $description: String!, $typeIdentifier: String!, $url: String, $memberships: [CreateExternalOrganizationMembershipWithoutExternalOrganizationInput!]!, $createAddressInput: CreateAddressInput, $locations: [ID!], $assets: [ID!], $usersWhere: UsersWhereInput) {
  createExternalOrganization(
    data: {name: $name, description: $description, typeIdentifier: $typeIdentifier, url: $url, memberships: $memberships, createAddressInput: $createAddressInput, locationIds: $locations, assetIds: $assets}
  ) {
    ...ExternalOrganizationInfo
    __typename
  }
}`,

  archiveCustomerQuery: `fragment FileInfo on File {
  id
  contentType
  name
  size
  url
  __typename
}

fragment UserCommonUserInfo on User {
  id
  name
  detail
  email
  role
  phone
  isActive
  locations(where: {isActive: true}) {
    id
    name
    isActive
    __typename
  }
  groups {
    id
    name
    isActive
    __typename
  }
  defaultGroup {
    id
    name
    __typename
  }
  createdAt
  updatedAt
  __typename
}

fragment ExternalOrganizationInfo on ExternalOrganization {
  id
  name
  description
  url
  createdAt
  updatedAt
  files {
    ...FileInfo
    __typename
  }
  memberships(where: $usersWhere) {
    id
    user {
      ...UserCommonUserInfo
      __typename
    }
    __typename
  }
  assets {
    id
    name
    isActive
    __typename
  }
  locations {
    id
    name
    isActive
    __typename
  }
  isActive
  }

mutation updateExternalOrganization($id: ID!, $name: String, $description: String, $url: String, $membershipUpdateInputs: [UpdateExternalOrganizationMembershipWithoutExternalOrganizationInput!], $updateAddressInput: UpdateNestedAddressInput, $locations: [ID!], $assets: [ID!], $isActive: Boolean, $usersWhere: UsersWhereInput) {
  updateExternalOrganization(
    id: $id
    data: {name: $name, description: $description, url: $url, membershipUpdateInputs: $membershipUpdateInputs, updateAddressInput: $updateAddressInput, locationIds: $locations, assetIds: $assets, isActive: $isActive}
   
  ) {
    ...ExternalOrganizationInfo
    __typename
  }
}`,

  createProcedureQuery: `fragment BaseProcedureTemplateInfo on ProcedureTemplate {
  id
  internalTitle
  internalDescription
  assignedAssets {
    id
    name
    __typename
  }
  assignedLocations {
    id
    name
    __typename
  }
  assignedGroups {
    id
    name
    __typename
  }
  isActive
  __typename
}

mutation CreateProcedureTemplate($input: CreateProcedureTemplateArgsInput!) {
  createProcedureTemplate(input: $input) {
    ...BaseProcedureTemplateInfo
    __typename
  }
}`,

  archiveProcedureQuery: `fragment PickerOptionInfo on PickerOption {
  id
  internalTitle
  externalTitle
  internalDescription
  externalDescription
  identifier
  iconName
  iconColor
  isStandard
  isActive
  position
  createdAt
  updatedAt
  __typename
}

fragment FormFieldElementInfo on FormFieldElement {
  id
  isRequired
  field {
    id
    internalTitle
    internalDescription
    type
    key
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
    ... on LookupField {
      lookupOptionsResourceIdentifier
      __typename
    }
    __typename
  }
  __typename
}

fragment ProcedureTemplateFormElementInfo on FormElement {
  id
  position
  type
  ... on FormContentBlock {
    content
    __typename
  }
  ... on FormFieldElement {
    ...FormFieldElementInfo
    __typename
  }
  __typename
}

fragment ProcedureTemplateFormSectionInfo on FormSection {
  id
  internalTitle
  internalDescription
  elements {
    ...ProcedureTemplateFormElementInfo
    __typename
  }
  __typename
}

fragment FullProcedureTemplateInfo on ProcedureTemplate {
  id
  internalTitle
  internalDescription
  assignedAssets {
    id
    name
    description
    code
    serialNumber
    __typename
  }
  assignedLocations {
    id
    name
    description
    __typename
  }
  assignedGroups {
    id
    name
    description
    __typename
  }
  isActive
  form {
    id
    sections {
      ...ProcedureTemplateFormSectionInfo
      __typename
    }
    __typename
  }
  __typename
}

mutation UpdateProcedureTemplate($input: UpdateProcedureTemplateArgsInput!) {
  updateProcedureTemplate(input: $input) {
    ...FullProcedureTemplateInfo
    form {
      id
      sections {
        id
        internalTitle
        internalDescription
        elements {
          id
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}`,

  createUserQuery: `fragment UserCommonUserInfo on User {
  id
  name
  detail
  email
  role
  phone
  isActive
  locations(where: {isActive: true}) {
    id
    name
    isActive
    __typename
  }
  groups {
    id
    name
    isActive
    __typename
  }
  defaultGroup {
    id
    name
    __typename
  }
  createdAt
  updatedAt
  __typename
}

mutation createUser($name: String!, $email: String!, $password: String, $locations: [ID!]!, $phone: String, $detail: String, $defaultGroup: ID, $role: UserRole!) {
  createUser(
    data: {name: $name, email: $email, password: $password, locationIds: $locations, defaultGroupId: $defaultGroup, phone: $phone, detail: $detail, role: $role}
  ) {
    ...UserCommonUserInfo
    __typename
  }
}`,

  archiveUserQuery: `fragment UserCommonUserInfo on User {
  id
  name
  detail
  email
  role
  phone
  isActive
  locations(where: {isActive: true}) {
    id
    name
    isActive
    __typename
  }
  groups {
    id
    name
    isActive
    __typename
  }
  defaultGroup {
    id
    name
    __typename
  }
  createdAt
  updatedAt
  __typename
}

mutation updateUser($id: ID!, $name: String, $email: String, $password: String, $phone: String, $role: UserRole, $locations: [ID!], $defaultGroup: ID, $detail: String, $isActive: Boolean) {
  updateUser(
    id: $id
    data: {name: $name, email: $email, password: $password, phone: $phone, detail: $detail, isActive: $isActive, role: $role, locationIds: $locations, defaultGroupId: $defaultGroup}
  ) {
    ...UserCommonUserInfo
    __typename
  }
}`,

  createGroupQuery: `fragment GroupInfo on Group {
    id
    name
    description
    isActive
    members(where: {isActive: true, role: {in: [ADMIN, STAFF, VIEWER]}}) {
      id
      name
      __typename
    }
    defaultSpaces(where: {isActive: true, location: {isActive: true}}) {
      id
      name
      __typename
    }
    defaultSpaceTypes {
      id
      name
      __typename
    }
    defaultIssues {
      id
      name
      description
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  mutation createGroup($name: String!, $description: String!, $members: [ID!]!, $defaultSpaces: [ID!]!, $defaultSpaceTypes: [ID!]!, $defaultIssues: [ID!]!) {
    createGroup(
      data: {name: $name, description: $description, memberIds: $members, defaultSpaceIds: $defaultSpaces, defaultSpaceTypeIds: $defaultSpaceTypes, defaultIssueIds: $defaultIssues}
    ) {
      ...GroupInfo
      __typename
    }
  }`,

  archiveGroupQuery: `fragment GroupInfo on Group {
    id
    name
    description
    isActive
    members(where: {isActive: true, role: {in: [ADMIN, STAFF, VIEWER]}}) {
      id
      name
      __typename
    }
    defaultSpaces(where: {isActive: true, location: {isActive: true}}) {
      id
      name
      __typename
    }
    defaultSpaceTypes {
      id
      name
      __typename
    }
    defaultIssues {
      id
      name
      description
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  mutation updateGroup($id: ID!, $name: String, $description: String, $isActive: Boolean, $members: [ID!], $defaultSpaces: [ID!], $defaultSpaceTypes: [ID!], $defaultIssues: [ID!]) {
    updateGroup(
      id: $id
      data: {name: $name, description: $description, isActive: $isActive, memberIds: $members, defaultSpaceIds: $defaultSpaces, defaultSpaceTypeIds: $defaultSpaceTypes, defaultIssueIds: $defaultIssues}
    ) {
      ...GroupInfo
      __typename
    }
  }`,

  updateSpaceWithIssueQuery: `fragment SpacePageIssueInfo on Issue {
    id
    name
    position
    description
    userCommentRequired
    isActive
    __typename
  }
  
  fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }
  
  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
    ... on LookupField {
      lookupOptionsResourceIdentifier
      __typename
    }
  }
  
  fragment FieldSetInfo on FieldSet {
    id
    internalTitle
    internalDescription
    fieldItems {
      id
      field {
        ...FieldInfo
        __typename
      }
      isRequired
      position
      __typename
    }
    __typename
  }
  
  fragment SurveyInfo on Survey {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    isActive
    fieldSet {
      ...FieldSetInfo
      __typename
    }
    __typename
  }
  
  fragment FileInfo on File {
    id
    contentType
    name
    size
    url
    __typename
  }
  
  fragment FieldEntryInfo on FieldEntry {
    id
    note
    files {
      ...FileInfo
      __typename
    }
    field {
      id
      type
      __typename
    }
    ... on TextFieldEntry {
      text
      __typename
    }
    ... on LongTextFieldEntry {
      longText
      __typename
    }
    ... on NumericFieldEntry {
      number
      __typename
    }
    ... on BinaryFieldEntry {
      boolean
      __typename
    }
    ... on PicklistFieldEntry {
      selectedOption {
        id
        internalTitle
        iconColor
        __typename
      }
      __typename
    }
    ... on LookupFieldEntry {
      resourceRecordId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  fragment SpaceSubmissionSettingsInfo on SpaceSubmissionSettings {
    ticketSubmissionSettings {
      collectionName
      collectionDescription
      attributes {
        formData {
          collectionName
          collectionDescription
          attributes {
            comments {
              attributeName
              attributeDescription
              value
              __typename
            }
            images {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        isCaptchaRequired {
          value
          __typename
        }
        submitterConfiguration {
          collectionName
          collectionDescription
          attributes {
            userData {
              attributeName
              attributeDescription
              value {
                requirementType
                ... on SubmissionUserDataOptional {
                  userFieldSet {
                    id
                    isActive
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                ... on SubmissionUserDataRequired {
                  userFieldSet {
                    id
                    fieldItems {
                      id
                      position
                      isRequired
                      field {
                        ...FieldInfo
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            isAuthenticationRequired {
              attributeName
              attributeDescription
              value
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  
  fragment SpaceOnLocationInfo on Space {
    id
    name
    isActive
    parentSpace {
      id
      name
      __typename
    }
    childSpaces {
      id
      name
      __typename
    }
    __typename
  }
  
  fragment SpacePageLocationInfo on Location {
    id
    name
    isActive
    spaces {
      ...SpaceOnLocationInfo
      __typename
    }
    __typename
  }
  
  fragment SpacePageSpaceInfo on Space {
    id
    name
    detail
    pin
    isActive
    isUserCommentEnabled
    location {
      ...SpacePageLocationInfo
      __typename
    }
    fieldEntries {
      ...FieldEntryInfo
      __typename
    }
    type {
      id
      name
      __typename
    }
    issues {
      ...SpacePageIssueInfo
      __typename
    }
    submissionSettings {
      ...SpaceSubmissionSettingsInfo
      __typename
    }
    survey {
      ...SurveyInfo
      __typename
    }
    childSpaces {
      id
      name
      isActive
      __typename
    }
    parentSpace {
      id
      name
      isActive
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  mutation updateSpace($id: ID!, $name: String, $detail: String, $issues: [ID!], $survey: ID, $isUserCommentEnabled: Boolean, $isActive: Boolean, $submissionSettings: SpaceSubmissionSettingsInput, $fieldEntries: [CreateFieldEntryInput!], $parentSpace: ID) {
    updateSpace(
      id: $id
      data: {name: $name, detail: $detail, issueIds: $issues, surveyId: $survey, isUserCommentEnabled: $isUserCommentEnabled, isActive: $isActive, submissionSettings: $submissionSettings, fieldEntries: $fieldEntries, parentSpaceId: $parentSpace}
    ) {
      ...SpacePageSpaceInfo
      __typename
    }
  }`,

  createCustomTextFieldQuery: `fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }
  
  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
    ... on LookupField {
      lookupOptionsResourceIdentifier
      __typename
    }
  }
  
  mutation createField($internalTitle: String!, $externalTitle: String!, $internalDescription: String!, $externalDescription: String!, $type: CustomFieldType!, $defaultText: String, $defaultLongText: String, $defaultNumber: Float, $defaultBoolean: Boolean, $resourceIdentifier: String!, $key: String, $pickerOptions: [CreatePickerOptionWithoutFieldInput!]) {
    createField(
      data: {internalTitle: $internalTitle, externalTitle: $externalTitle, internalDescription: $internalDescription, externalDescription: $externalDescription, type: $type, defaultText: $defaultText, defaultLongText: $defaultLongText, defaultNumber: $defaultNumber, defaultBoolean: $defaultBoolean, resourceIdentifier: $resourceIdentifier, key: $key, pickerOptions: $pickerOptions}
    ) {
      ...FieldInfo
      __typename
    }
  }`,

  createCustomMultiTextFieldQuery: `fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on LongTextField {
      defaultLongText
      __typename
    }
  }
  
  mutation createField($internalTitle: String!, $externalTitle: String!, $internalDescription: String!, $externalDescription: String!, $type: CustomFieldType!,  $defaultLongText: String, $resourceIdentifier: String!, $key: String) {
    createField(
      data: {internalTitle: $internalTitle, externalTitle: $externalTitle, internalDescription: $internalDescription, externalDescription: $externalDescription, type: $type,defaultLongText: $defaultLongText, resourceIdentifier: $resourceIdentifier, key: $key}
    ) {
      ...FieldInfo
      __typename
    }
  }`,

  createCustomNumberFieldQuery: `fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on NumericField {
      defaultNumber
      __typename
    }
  }
  
  mutation createField($internalTitle: String!, $externalTitle: String!, $internalDescription: String!, $externalDescription: String!, $type: CustomFieldType!, $defaultText: String, $defaultLongText: String, $defaultNumber: Float, $defaultBoolean: Boolean, $resourceIdentifier: String!, $key: String, $pickerOptions: [CreatePickerOptionWithoutFieldInput!]) {
    createField(
      data: {internalTitle: $internalTitle, externalTitle: $externalTitle, internalDescription: $internalDescription, externalDescription: $externalDescription, type: $type, defaultText: $defaultText, defaultLongText: $defaultLongText, defaultNumber: $defaultNumber, defaultBoolean: $defaultBoolean, resourceIdentifier: $resourceIdentifier, key: $key, pickerOptions: $pickerOptions}
    ) {
      ...FieldInfo
      __typename
    }
  }`,

  createCustomCheckboxFieldQuery: `fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on BinaryField {
      defaultBoolean
      __typename
    }
  }
  
  mutation createField($internalTitle: String!, $externalTitle: String!, $internalDescription: String!, $externalDescription: String!, $type: CustomFieldType!, $defaultText: String, $defaultLongText: String, $defaultNumber: Float, $defaultBoolean: Boolean, $resourceIdentifier: String!, $key: String, $pickerOptions: [CreatePickerOptionWithoutFieldInput!]) {
    createField(
      data: {internalTitle: $internalTitle, externalTitle: $externalTitle, internalDescription: $internalDescription, externalDescription: $externalDescription, type: $type, defaultText: $defaultText, defaultLongText: $defaultLongText, defaultNumber: $defaultNumber, defaultBoolean: $defaultBoolean, resourceIdentifier: $resourceIdentifier, key: $key, pickerOptions: $pickerOptions}
    ) {
      ...FieldInfo
      __typename
    }
  }`,

  createCustomDropdownFieldQuery: `fragment PickerOptionInfo on PickerOption {
    id
    internalTitle
    externalTitle
    internalDescription
    externalDescription
    identifier
    iconName
    iconColor
    isStandard
    isActive
    position
    createdAt
    updatedAt
    __typename
  }
  
  fragment FieldInfo on Field {
    id
    internalTitle
    internalDescription
    externalTitle
    externalDescription
    type
    key
    __typename
    createdAt
    isActive
    ... on TextField {
      defaultText
      __typename
    }
    ... on LongTextField {
      defaultLongText
      __typename
    }
    ... on NumericField {
      defaultNumber
      __typename
    }
    ... on BinaryField {
      defaultBoolean
      __typename
    }
    ... on PicklistField {
      pickerOptions {
        ...PickerOptionInfo
        __typename
      }
      __typename
    }
    ... on LookupField {
      lookupOptionsResourceIdentifier
      __typename
    }
  }
  
  mutation createField($internalTitle: String!, $externalTitle: String!, $internalDescription: String!, $externalDescription: String!, $type: CustomFieldType!, $defaultText: String, $defaultLongText: String, $defaultNumber: Float, $defaultBoolean: Boolean, $resourceIdentifier: String!, $key: String, $pickerOptions: [CreatePickerOptionWithoutFieldInput!]) {
    createField(
      data: {internalTitle: $internalTitle, externalTitle: $externalTitle, internalDescription: $internalDescription, externalDescription: $externalDescription, type: $type, defaultText: $defaultText, defaultLongText: $defaultLongText, defaultNumber: $defaultNumber, defaultBoolean: $defaultBoolean, resourceIdentifier: $resourceIdentifier, key: $key, pickerOptions: $pickerOptions}
    ) {
      ...FieldInfo
      __typename
    }
  }`,

  createOrgQuery: `mutation($data: CreateOrganizationInput!) {
    createOrganization(data: $data) {
      token
    }
  }`,

  updateGroupQuery: `fragment GroupInfo on Group {
    id
    name
    description
    isActive
    members(where: {isActive: true, role: {in: [ADMIN, STAFF, VIEWER]}}) {
      id
      name
      __typename
    }
    defaultSpaces(where: {isActive: true, location: {isActive: true}}) {
      id
      name
      __typename
    }
    defaultSpaceTypes {
      id
      name
      __typename
    }
    defaultIssues {
      id
      name
      description
      __typename
    }
    fieldEntries {
      id
      field {
        internalTitle
        internalDescription
        externalTitle
        externalDescription
        __typename
      }
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
  
  mutation updateGroup($id: ID!, $name: String, $description: String, $isActive: Boolean, $members: [ID!], $defaultSpaces: [ID!], $defaultSpaceTypes: [ID!], $defaultIssues: [ID!]) {
    updateGroup(
      id: $id
      data: {name: $name, description: $description, isActive: $isActive, memberIds: $members, defaultSpaceIds: $defaultSpaces, defaultSpaceTypeIds: $defaultSpaceTypes, defaultIssueIds: $defaultIssues}
    ) {
      ...GroupInfo
      __typename
    }
  }`,
}

export default apiData
