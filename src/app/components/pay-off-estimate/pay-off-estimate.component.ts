import { Component, OnInit } from '@angular/core';
import { AdjustmentsHistoryEntity, PayoffEstimateDisplayEntity } from 'src/app/models/payoffestimatedisplayentityvm';
import { LoanInformationService } from 'src/app/components/services/loan-information.service';

@Component({
  selector: 'sbx-pay-off-estimate',
  templateUrl: './pay-off-estimate.component.html',
  styleUrls: ['./pay-off-estimate.component.scss']
})
export class PayOffEstimateComponent implements OnInit {
  public loading: boolean = false;
  public getloanNumber: string = "";
  public payoffEstimateDisplayEntity: PayoffEstimateDisplayEntity = {} as PayoffEstimateDisplayEntity;
  public adjustmentsHistoryEntity: AdjustmentsHistoryEntity[] = [];

  constructor(private loaninfoservice: LoanInformationService) { }

  ngOnInit(): void {
    this.loading = true;
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    if (_loanNumber !== null) {
      this.getloanNumber = _loanNumber;
      this.GetPayOffEstimateDisplayDetails();
    }
    else {
      console.error("Loan number not found");
    }
  }
  GetPayOffEstimateDisplayDetails() {
    this.loaninfoservice.apiPayOffEstimateDisplayesults(this.getloanNumber, "").subscribe(res => {
      //debugger;
      this.payoffEstimateDisplayEntity = res.data.payoffEstimate_DisplayEntity;
      this.adjustmentsHistoryEntity = res.data.adjustmentsHistoryEntities;
    });
    this.loading = false;
  }

}
