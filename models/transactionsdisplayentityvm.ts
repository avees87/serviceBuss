export interface TransactionsDisplayEntityVm {
    transactionId: number | null;
    transactionDate: Date | null;
    transactionCode: string;
    transactionAmount: number | null;
    transactionGroup: string;
    transactionType: string;
    checkNumber: string;
    transactionDateString: string;
    suspenseBalance: number | null;
    escrowBalance: number | null;
    escrowExpandedAdvanceBalance: number | null;
    recoverableCorpAdvanceBalance: number | null;
    firstPrincipalBalance: number | null;
    nonRecCorpAdvanceBalance: number | null;
}
