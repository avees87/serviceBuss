import { Component, OnInit } from '@angular/core';
import { LoanInformationService } from 'src/app/services/loan-information.service';


@Component({
  selector: 'sbx-borrower-info-display',
  templateUrl: './borrower-info-display.component.html',
  styleUrls: ['./borrower-info-display.component.scss']
})
export class BorrowerInfoDisplayComponent implements OnInit {
  public loading: boolean = false;
  public getloanNumber: string = "";

  // public BorrowerInfoDisplayData: BorrowerInfoDisplayVm = {} as BorrowerInfoDisplayVm;
  public BorrowerInfoDisplayData: any;
  constructor(private loaninfoservice: LoanInformationService
   ) { }

  ngOnInit(): void {
    this.loading = true;
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    if (_loanNumber !== null) {
      this.getloanNumber = _loanNumber;
      this.GetBorrowerInfoDisplayResults();
    }
    else {
      console.error("Loan number not found");
    }

  }
  GetBorrowerInfoDisplayResults() {
    this.loaninfoservice.apiBorrowerInfoDisplayResults(this.getloanNumber, "").subscribe(res => {
      this.BorrowerInfoDisplayData = JSON.parse(JSON.stringify(res)).data
    });
    this.loading = false;
  }

}
