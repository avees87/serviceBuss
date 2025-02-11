export interface UserNotesVm {
    contactCodes: NotesContactCodesEntity[];
    reasonCodes: NotesReasonCodesEntity[];
    responseCodes: NotesResponseCodesEntity[];
    sBXUserNotes: SBXUserNotesEntity[];
}

export interface NotesContactCodesEntity {
    notesContactCodesID: number;
    notesContactCode: string;
    notesContactDesc: string;
    notesContactCodeAndDesc: string;
}

export interface NotesReasonCodesEntity {
    notesReasonCodesID: number;
    notesReasonCode: string;
    notesReasonDesc: string;
    notesReasonCodeAndDesc: string;
}

export interface NotesResponseCodesEntity {
    notesResponseCodesID: number;
    notesResponseCode: string;
    notesResponseDesc: string;
    notesResponseCodeAndDesc: string;
}

export interface SBXUserNotesEntity {
    servicingLoanNum: number;
    noteGroupID: number;
    sequenceNumber: number;
    contactCode: string;
    reasonCode: string;
    responseCode: string;
    noteText: string;
    fidelityUserID: string;
    extractedToMSP: boolean;
    createdBy: number;
    createdDate: string;
    updatedDate: string | null;
}