import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from 'oidc-client';
import { finalize } from 'rxjs';
import { AssetResearchService } from 'src/app/services/asset-research.service';
import { ComponetCommunicationService } from 'src/app/services/component-communication.service';
import { UserWorkingCacheService } from 'src/app/services/user-workingcache.service';


@Component({
  selector: 'sbx-loan-search',
  templateUrl: './loan-search.component.html',
  styleUrls: ['./loan-search.component.css']
})
export class LoanSearchComponent implements OnInit, OnDestroy {
  public searchText: string = "";

  constructor(private assestSearchService: AssetResearchService,
    private route: Router,
    private userCachingService: UserWorkingCacheService,
    private componetCommunicationService: ComponetCommunicationService) { }

  public gridData: any[] = [];
  public loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    var _searchText = String(localStorage.getItem("searchText"));
    if (_searchText !== null) {
      this.searchText = _searchText;
    }
    this.GetSearchResults();
  }

  GetSearchResults() {
    this.assestSearchService.apiGetSearchResults(this.searchText, "")
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(res => {        
        let loansInfo = JSON.parse(JSON.stringify(res));
        if (loansInfo.data.length == 1) {
          let loanData = loansInfo.data[0];
          let loanNum = !isNaN(loanData.loanNumber) ? loanData.loanNumber : this.searchText;
          localStorage.setItem("loanNumber", loanNum);
          this.userCachingService.setUserWorkingCache(loanNum);
          this.route.navigate(['LoanInformation']);
        }
        else {
          this.componetCommunicationService.refreshborrowerTabEvent(false);
          this.gridData = JSON.parse(JSON.stringify(res)).data;
        }
      });
    //this.loading = false;
  }

  gridUserSelectionChange(selection: any) {
    const selectedData = selection.selectedRows[0].dataItem;
    console.log(selectedData);
    //localStorage.setItem("loanNumber", selectedData.loanNumber);
    this.userCachingService.setUserWorkingCache(selectedData.loanNumber);
    this.route.navigate(['LoanInformation']);
  }

  ngOnDestroy(): void {
    console.log('component on destroy');
  }
}
