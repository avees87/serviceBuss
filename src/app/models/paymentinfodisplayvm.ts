export interface PaymentInforDisplayVm {
    transactionHistory_DisplayEntities: TransactionHistoryDisplayEntity[]
    paymentInfo_DisplayEntities: PaymentInfoDisplayEntity[]
    paymentInfo_DisplayEntity: PaymentInfoDisplayEntity
}

export interface TransactionHistoryDisplayEntity {
    loanId: any
    paymentId: number
    transactionDate: any
    transactionDateString: string
    dueDate: string
    dueDateString: string
    effectiveDateString: string
    transactionCode: string
    transactionDescription: string
    totalAmount: number
    principleAmount: number
    interestAmount: number
    suspenseAmount: number
    escrowAmount: number
    feeAmount: number
    suspenseBalance: number
    escrowBalance: number
    escrowExpandedAdvanceBalance: number
    recoverableCorpAdvanceBalance: number
    firstPrincipalBalance: number
  }

  export interface PaymentInfoDisplayEntity {
    loanID: number
    lastTransactionDate: any
    lastTransactionDateString: any
    forclosureStatus: any
    foreclosureBy: any
    nextDueDate: any
    bankruptcyStatus: any
    threeMonthPayment: any
    threeMonthPaymentString: any
    interestRate: any
    interestRateString: any
    delinquencyStatus: any
    priorThreeMonthAvg: any
    monthCurrent: any
    monthMinusOne: any
    monthMinusTwo: any
    monthMinusThree: any
    monthMinusFour: any
    monthMinusFive: any
    monthMinusSix: any
    monthMinuSeven: any
    monthMinusEight: any
    monthMinusNine: any
    monthMinusTen: number
    monthMinusEleven: any
    countyTax: any
    cityTax: any
    otherTax: any
    hazardInsurance: any
    mortgageInsurance: any
    overage_Shortage: any
    totalTIPaymentDue: any
    statusBankruptcy :any
  }