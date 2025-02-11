export interface SearchResult {
    loanNumber: string;
    investorLoanNumber: string;
    investorNumber: string;
    investorName: string;
    borrowerName: string;
    propertyAddress: string;
    loanDefaultCampaign: string | null;
    searchTerm: string | null;
}