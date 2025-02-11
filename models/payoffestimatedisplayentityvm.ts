export interface PayOffEstimateDisplayEntityVm {
    payoffEstimate_DisplayEntity: PayoffEstimateDisplayEntity
    adjustmentsHistoryEntities: AdjustmentsHistoryEntity[]
}
export interface PayoffEstimateDisplayEntity {
    loanID: number
    servicingLoanNum: number
    upb: number
    interestDue: number
    interestDueString: string
    escrowAdvances: number
    corporateAdvances: number
    lateFees: number
    propertyEvaluationFees: number
    titltUpdateRecording: number
    modFee: number
    otherClosingCost: number
    nsfCharges: number
    totalAmountOwed: number
    suspenseBalance: number
    escrowBalance: number
    restrictedEscrowBalance: number
    adjustments: number
    estimatedPayoffQuote: number
    perDiemInterestDue: number
  }
  
  export interface AdjustmentsHistoryEntity {
    srNo: number
    adjustments: number
    adjustmentsString: string
    description: string
    totalAdjustments: number
  }