export interface LoanNoteCommandVm {
    loanNumber: number;
    note: string;
    contactCode?: string;
    reasonCode?: string;
    responseCode?: string;
    sbxUserId: number;
    fidelityUserId: string;
}