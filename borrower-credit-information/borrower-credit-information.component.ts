import { Component, OnInit } from '@angular/core';
import { CreditScoreEntity } from 'src/app/models/creditscoreentity';
import { AssetResearchService } from 'src/app/services/asset-research.service';
import { ComponetCommunicationService } from 'src/app/services/component-communication.service';
import { LoanInformationService } from 'src/app/services/loan-information.service';
import { UserWorkingCacheService } from 'src/app/services/user-workingcache.service';

@Component({
  selector: 'sbx-borrower-credit-information',
  templateUrl: './borrower-credit-information.component.html',
  styleUrls: ['./borrower-credit-information.component.scss']
})
export class BorrowerCreditInformationComponent implements OnInit {
  public loading: boolean = false;
  public getloanNumber: string = "";
  public ErrorMsgDiv : boolean =false;
  public CreditInformationData: CreditScoreEntity[] = [];

  constructor(private componetCommunicationService: ComponetCommunicationService,
    private loaninfoservice: LoanInformationService,
    private userCachingService: UserWorkingCacheService,
    assetResearchService: AssetResearchService) { }

  ngOnInit(): void {
    this.loading = true;
    //call this to ensure we have a loanNumber in localstorage
    this.userCachingService.loadUserWorkingCache();

    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    this.GetLoanSummaryResults();
    this.GetCreditScoreResult();
    // if (_loanNumber !== null) {
    //   this.getloanNumber = _loanNumber;
    //   this.GetLoanSummaryResults();
    //   this.GetCreditScoreResult();

    // }
    // else {
    //   console.error("Loan number not found");
    // }
    this.componetCommunicationService.isVisibleSource.next(true);
  }

  GetCreditScoreResult() {
    this.loaninfoservice.apiCreditInformationesults(this.getloanNumber, "").subscribe(res => {
      if(res.data.length>0){
        this.ErrorMsgDiv == false;
        this.CreditInformationData = res.data
      }
      else {
        this.ErrorMsgDiv = true;
      }

    });
  }

  getLocalDateString(gridDate: Date) {
    return new Date(gridDate).toLocaleString();
  }

  GetLoanSummaryResults() {
    this.loaninfoservice.apiGetLoanSummaryResults(this.getloanNumber, "").subscribe(res => {
      this.componetCommunicationService.refreshborrowerTabEvent(true);
      this.componetCommunicationService.refreshselectedGridDataEvent(JSON.parse(JSON.stringify(res)).data);
    });
  }

}
