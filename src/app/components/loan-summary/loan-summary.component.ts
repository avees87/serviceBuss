import { Component, OnInit } from '@angular/core';
import { LoanInformationService } from '../services/loan-information.service';
import { ComponetCommunicationService } from '../services/component-communication.service';
import { LoanSummaryEntity } from '../../models/loansummaryentity';

@Component({
  selector: 'sbx-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.scss']
})
export class LoanSummaryComponent implements OnInit {
  public loading: boolean = false;
  public getloanNumber: string = "";
  public loanInfoData: LoanSummaryEntity = {} as LoanSummaryEntity;

  constructor(private loaninfoservice: LoanInformationService,
    private componetCommunicationService: ComponetCommunicationService) { }

  ngOnInit(): void {
    this.loading = true;
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    if (_loanNumber !== null) {
      this.getloanNumber = _loanNumber;
      this.GetLoanSummaryResults();
    }
    else {
      console.error("Loan number not found");
    }
  }

  GetLoanSummaryResults() {
    this.loaninfoservice.apiGetLoanSummaryResults(this.getloanNumber, "").subscribe(res => {
      this.loanInfoData = JSON.parse(JSON.stringify(res)).data
      this.componetCommunicationService.refreshborrowerTabEvent(true);
      this.componetCommunicationService.refreshselectedGridDataEvent(JSON.parse(JSON.stringify(res)).data);
    });
    this.loading = false;
  }
}
