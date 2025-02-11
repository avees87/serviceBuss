import { VERSION, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { routes } from './menu';
import { MatSidenav } from '@angular/material/sidenav';
import { DatePipe } from '@angular/common';

import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Router } from '@angular/router';
import { ComponetCommunicationService } from './app/components/services/component-communication.service';
import { Subject, catchError, filter, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { SideNavService } from './app/components/services/side-nav.service';
import { UserWorkingCacheService } from './app/components/services/user-workingcache.service';
import { LoggingService } from './app/components/services/logging.service';
import { UserInfoVm } from './models/userinfovm';


export interface SearchObj {
  searchText: string
}

@Component({
  selector: 'sbx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit, OnDestroy {

  @Output() overlayEventEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('sidenav') sidenav!: MatSidenav;
  myDate = new Date();
  title = 'sbx2';
  routes = routes;
  sidenavWidth = 15;
  ngStyle!: string;
  isShowing = true;
  userEmail: any;
  appYear: any;
  environmentName: any;
  appversion: any;
  BuildNumber: any;
  isLoggedIn: boolean = false;

  public searchObj: SearchObj = {
    searchText: ''
  }
  isIframe = false;
  subscription: any;
  borrowerTab: any;
  selectedGridRow: any;
  private readonly _destroying$ = new Subject<void>();
  loginDisplay = false;
  public searchText: string = "";
  showSubmenu: boolean = true;
  showSubSubMenu: boolean = false;
  EnvColor: string = "";
  hideUI = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
    private route: Router,
    private sideNavService: SideNavService,
    private userCachingService: UserWorkingCacheService,
    private loggingService: LoggingService
  ) { }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    if (environment.prod) {
      // for production
      this.environmentName = "Production"
      this.EnvColor = "divPRODEnvColor";
    } else if (environment.uat) {
      // for UAT
      this.environmentName = "UAT"
      this.EnvColor = "divUATEnvColor";
    }
    else if (environment.dev) {
      // for development
      this.environmentName = "Development"
      this.EnvColor = "divLocalDevEnvColor";
    }
    else {
      this.environmentName = "Local";
      this.EnvColor = "divLocalDevEnvColor";
    }
    //this.appversion = VERSION.full;
    this.BuildNumber = environment.buildNumber;
    console.warn("PipeLine Build number :" + this.BuildNumber);
    console.warn("environment Build number :" + environment.buildNumber);
    this.appYear = (new Date()).getFullYear();

    this.broadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    ).subscribe(() => {
      this.checkUserLogin();
      this.setLoadingDisplay();
    })

    

  }

  setLoadingDisplay() {
    return this.loginDisplay = this.authService.instance.getAllAccounts.length > 0;
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
    this.checkUserLogin();
  }

  logout() {
    this.authService.logoutRedirect({
      //postLogoutRedirectUri: 'http://localhost:4200'//postLogoutRedirectUri: 'https://cwsbxapp01uv:8082'
      postLogoutRedirectUri: environment.msalConfig.auth.redirectUrl//postLogoutRedirectUri: 'https://cwsbxapp01uv:8082'
    });
  }

  public searchForm: FormGroup = new FormGroup({
    searchText: new FormControl(),
  });


  getSearchTextInfo() {
    if (this.searchForm.valid) {
      this.searchObj.searchText = this.searchForm.value.searchText
    }
    localStorage.setItem("searchText", this.searchForm.value.searchText);
    //reset value from text box after adding localStorage
    console.log(this.searchForm.reset());

    this.searchForm.value.searchText = "";
    //this.route.navigate(['LoanSearch']);
    this.route
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.route.navigate(['LoanSearch']);
        this.searchForm.reset();
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  checkUserLogin() {
    let userInfo = this.authService.instance.getAllAccounts()[0];
    if (userInfo === null || userInfo === undefined) {
      return;
    }
    this.isLoggedIn = true;
    this.loggingService.logInfo(userInfo);
    let userEmail = userInfo.username;
    this.userCachingService.apiIsValidSbxUser(userEmail)
      .subscribe(res => {
        if (res == false ) {
          return;
        }
        this.userCachingService.setUserDbInfoFromAccountInfo(userInfo);
        this.userCachingService.apiGetUserInfo(userEmail)
          .pipe(
            catchError(error => {
              this.loggingService.logError(`GetUserInformation Error loadUserInfo ${userEmail}`);
              this.loggingService.logError(error);
              this.redirectInActiveUser();
              return error;
            }
            ))
          .subscribe(res => {
            this.redirectInActiveUser();
          });
      });
  }

  redirectInActiveUser() {
    this.hideUI = !UserWorkingCacheService.isUserActive();
    if (this.hideUI === true) {
      this.route.navigate(['ErrorPage'], { queryParams: { errorCode: '401' } });
    }
  }
}
