export interface NotesEntityVm {
    noteID: number | null;
    loanNumber: number;
    loanID: number;
    comment: string;
    createdBy: string;
    createdOn: string | null;
    categoryType: string;
    isUploaded: string;
    noteDate: string;
    isUploadedToFidelity: boolean;
    datePartCreatedDate: string;
    allowValidation: boolean;
    noteComment: string;
    lastestSummaryNote: string;
    lastAssetPlanNote: string;
    lastExecutionStrategyNote: string;
    createdDate: string;
    fidelityUserID: string;
    isDeleted: boolean;

  // loanSummaryDetails  data
    upbString: string | null;
    nextDueDate: string | null;
}