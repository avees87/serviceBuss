import { Component, OnInit } from '@angular/core';
import { LoanVm } from 'src/app/models/loanvm';
import { ComponetCommunicationService } from 'src/app/services/component-communication.service';
import { LoanInformationService } from 'src/app/services/loan-information.service';

@Component({
  selector: 'sbx-loan-display',
  templateUrl: './loan-display.component.html',
  styleUrls: ['./loan-display.component.scss']
})
export class LoanDisplayComponent implements OnInit {
  public loading: boolean = false;
  public getloanNumber: string = "";
  public loanData: LoanVm = {} as LoanVm;

  constructor(private loaninfoservice: LoanInformationService,
    private componetCommunicationService: ComponetCommunicationService) { }

  ngOnInit(): void {
    this.loading = true;
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    if (_loanNumber !== null) {
      this.getloanNumber = _loanNumber;
      this.GetLoanResults();
    }
    else {
      console.error("Loan number not found");
    }

  }
  GetLoanResults() {
    this.loaninfoservice.apiGetLoanResults(this.getloanNumber, "").subscribe(res => {
      this.loanData = JSON.parse(JSON.stringify(res)).data
    });
    this.loading = false;
  }

}
