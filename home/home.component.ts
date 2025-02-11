import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { DataBindingDirective, GridComponent } from "@progress/kendo-angular-grid";
import { SVGIcon, filePdfIcon, fileExcelIcon } from "@progress/kendo-svg-icons";
import { process } from "@progress/kendo-data-query";
import { data } from './data';
import { images } from './images';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subscription, filter, catchError, of, finalize, take } from 'rxjs';
import { ComponetCommunicationService } from 'src/app/services/component-communication.service';
import { SbxDocumentsService } from 'src/app/services/sbx-documents.service';
import { UserWorkingCacheVm } from 'src/app/models/userworkingcachevm';
import { UserWorkingCacheService } from 'src/app/services/user-workingcache.service';
import { Exception } from '@microsoft/applicationinsights-web';
import { Router } from '@angular/router';

@Component({
  selector: 'sbx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //subscriptionhome!: Subscription;

  @ViewChild('homeGrid')
  public homeGrid!: GridComponent;

  public loading: boolean = false;
  public gridData: any[] = [];
  public toalLoanCount: number = 0;
  public totalUpb: number = 0;
  loginDisplay = false;
  hideUI = false;
  private subscription: Subscription;
  public userDetails: any;
  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService,
    private sbxdocservice: SbxDocumentsService,
    private userCachingService: UserWorkingCacheService,
    private componetCommunicationService: ComponetCommunicationService,
    private router: Router,
    private ngZone: NgZone) {
    this.subscription = this.componetCommunicationService.refreshUserDetails_events$.subscribe(event =>
      this.userDetails = event);
        this.componetCommunicationService.isVisibleSource.next(false);
  }

  ngOnInit(): void {
    this.loading = true;
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.componetCommunicationService.refreshborrowerTabEvent(false);
        if (UserWorkingCacheService.isUserActive()) {
          //console.log('HomeComponent: MsalBroadcastService inProgress UserActive true');
          this.getLoggedInUserPortfolios();
          this.userCachingService.loadUserWorkingCache();
          this.hideUI = false;
        } else {
          this.hideUI = true;
          //console.log('HomeComponent: MsalBroadcastService inProgress UserActive false');
        }
      })

      this.componetCommunicationService.isVisibleSource.next(false);
  }
  public onDataStateChange(): void {
    this.fitColumns();
  }
  private fitColumns(): void {
    this.ngZone.onStable
      .asObservable()
      .pipe(take(1))
      .subscribe(() => {
        this.homeGrid.autoFitColumns();
      });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    //this.subscriptionhome.unsubscribe();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    let userInfo = this.authService.instance.getAllAccounts()[0];
    //console.log(userInfo);
    let userEmail = userInfo.username;
    localStorage.setItem("userCacheEmail", userEmail);
    this.userCachingService.apiIsValidSbxUser(userEmail)
    .subscribe(res => {
      if (res == true) {
        this.componetCommunicationService.refreshUserDetailsEvent(userInfo.username);
      } else {
        //let errMsg = `User Email ${userInfo.username} not found in SBX`;
        //this.router.navigate(['ErrorPage'],{ queryParams: { errorCode: "404", errorMsg:  errMsg} });
        //throw new Error(errMsg);
      }
    });
  }

  getLoggedInUserPortfolios() {
    this.sbxdocservice.getLoggedInUserPortfolios()
      .pipe
      (
        finalize(() => this.loading = false),
        catchError(error => {
          this.loading = false;
          return of([]);
        })
      )
      .subscribe(res => {
        this.gridData = JSON.parse(JSON.stringify(res)).data.portViewDisplay;
        this.toalLoanCount = JSON.parse(JSON.stringify(res)).data.sumOfTotalLoans;
        this.totalUpb = JSON.parse(JSON.stringify(res)).data.sumOfTotalUpb;
        this.loading = false;
        this.fitColumns();
      }
      )
  }
}
