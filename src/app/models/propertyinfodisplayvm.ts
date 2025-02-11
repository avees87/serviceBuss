export interface PropertyInforDisplayVm
 {
    propertyInfo_DisplayEntity: PropertyInfoDisplayEntity
    propertyValuationEntities: PropertyValuationEntity[]
  }
  export interface PropertyInfoDisplayEntity {
    loanID: number
    servicingLoanNum: number
    lien: string
    loanPurpose: string
    documentType: string
    piPayment: number
    tiPayment: number
    propertyType: string
    units: string
    propertyAddress: string
    city: string
    zip: string
    occupancyType: string
    currentOccupancyType: string
    propertyCondition: string
    state: string
    currentPropertyValue: number
    currentPropertyValueDate: any
    currentPropertyValueDateString: string
    currentPropertyValueType: string
    currentCLTV: number
    currentLTV: any
    currentCLTVString: string
    currentLTVString: string
    date: string
    type: string
    value: number
  }
  
  export interface PropertyValuationEntity {
    id: number
    orderNumber: string
    loanNumber: number
    typeId: number
    valuationType: any
    date: string
    dateToShort: any
    dateString: any
    asIs: number    
    parentId: number
    parentOrder: any
    vendor: string
    comments: string
    createdDate: string
    createdBy: string
    modifiedDate: string
    modifiedBy: string
    valuationPDF: string
    clientFee: any
    updateMSPComm_NewValue: string
    updateMSPComm_ReconOrder?: string
    updateMSPComm_ReconRcvd?: string
    previousAsIs: number
    asIsDollarChange: number
    asIsDollarChangeString?: string
    asIsPercentChangeString?: string
    previousAsIsString?: string
    asIsPercentChange: number
    datePV: any
    datePVString: string
    type: string
    value: any
    published: boolean
    publishedToMsp: boolean
    publishedPreviously: boolean
  }