import { Component, OnInit } from '@angular/core';
import { FCBKLossMitDisplayEntity} from 'src/app/models/fcbkLossmitdisplayentityvm';
import { LoanInformationService } from 'src/app/components/services/loan-information.service';

@Component({
  selector: 'sbx-fcbkloss-mit',
  templateUrl: './fcbkloss-mit.component.html',
  styleUrls: ['./fcbkloss-mit.component.scss']
})
export class FCBKLossMitComponent implements OnInit {
  public loading: boolean = false;
  public getloanNumber: string = "";
  public fCBKLossMitDisplay : FCBKLossMitDisplayEntity = {} as FCBKLossMitDisplayEntity;
  constructor(private loaninfoservice: LoanInformationService) { }
  _foreclosureStatus :string ="";
  ngOnInit(): void {
    this.fCBKLossMitDisplay.foreclosureStatus = this._foreclosureStatus;
    this.loading = true;
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    if (_loanNumber !== null) {
      this.getloanNumber = _loanNumber;
      this.GetfCBKLossMitDisplayResults();
    }
    else {
      console.error("Loan number not found");
    }
  }
  GetfCBKLossMitDisplayResults() {
    this.loaninfoservice.apiFCBKLossMitDisplayResults(this.getloanNumber, "").subscribe(res => {
      console.log("apiFCBKLossMitDisplayResults " + res.data);    
      this.fCBKLossMitDisplay = JSON.parse(JSON.stringify(res)).data;
    });
    this.loading = false;
  }  
}
