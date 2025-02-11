import { Component, OnInit } from '@angular/core';
import { SelectEvent, TabCloseEvent } from "@progress/kendo-angular-layout";
import { error } from 'console';
import { catchError, of } from 'rxjs';
import { UserWorkingCacheVm } from 'src/app/models/userworkingcachevm';
import { ComponetCommunicationService } from 'src/app/components/services/component-communication.service';
import { LoanInformationService } from 'src/app/components/services/loan-information.service';
import { UserWorkingCacheService } from 'src/app/components/services/user-workingcache.service';

@Component({
  selector: 'sbx-loan-information',
  templateUrl: './loan-information.component.html',
  styleUrls: ['./loan-information.component.scss']
})
export class LoanInformationComponent implements OnInit {

  constructor(private loaninfoservice: LoanInformationService,
    private userCachingService: UserWorkingCacheService, private componentService: ComponetCommunicationService) { }

  ngOnInit(): void {
    //call this to ensure we have a loanNumber in localstorage
    this.userCachingService.loadUserWorkingCache();

    var loanNumber = String(localStorage.getItem("loanNumber"));
    console.log(`LoanInformation for LoanNumber:${loanNumber}`);

    //update user Working Cache LoanNumber
    // if (_loanNumber !== 'null' &&
    //   _loanNumber !== undefined &&
    //   _loanNumber != null &&
    //   _loanNumber !== 'undefined') {
    //   this.userCachingService.setUserWorkingCache(_loanNumber);
    // }
    this.componentService.isVisibleSource.next(true);
  }

  onClose(event: any) {
  }

  onSelect(event: any) {
  }
}
