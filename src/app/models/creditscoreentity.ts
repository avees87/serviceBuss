export interface CreditScoreEntity {
    loanId: number | null;
    customerID: number;
    customerFullName: string;
    borrowerID: number | null;
    score: number | null;
    lastUpdated: string | null;
    scoreID: number | null;
    scoreDate: string | null;
    scoreVendor: string;
    customerType: string;
    scoreDateString: string;
    scoreString: string;
    age: string;
    fidelityDataDate: string | null;
}