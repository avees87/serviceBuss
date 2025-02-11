import { VERSION, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';
import { ComponetCommunicationService } from 'src/app/components/services/component-communication.service';
import { SideNavService } from 'src/app/components/services/side-nav.service';
import { UserWorkingCacheService } from 'src/app/components/services/user-workingcache.service';
import { environment } from 'src/environments/environment';
import { AdminService } from 'src/app/components/services/admin.service';

@Component({
  selector: 'sbx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  myDate = new Date();
  isExpanded = true;
  userEmail: any;
  borrowerTab: any;
  subscription: any;
  public selectedGridRow: any;
  public opened = false;
  isVisible = false;
  hideUI: boolean = false;
  appversion: any;
  logolink: string = '/';

  @Output() navbarEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private seideNavService: SideNavService,
    public componetCommunicationService: ComponetCommunicationService,
    private userCachingService: UserWorkingCacheService,
    private adminService: AdminService,
    private userCacheService: UserWorkingCacheService,
    private authService: MsalService, public dialog: MatDialog) {

    this.subscription = this.componetCommunicationService.refreshborrowerTab_events$.subscribe(event =>
      this.borrowerTab = event);

    this.subscription = this.componetCommunicationService.refreshselectedGridData_events$.subscribe(event =>
      this.selectedGridRow = event);

    this.subscription = this.componetCommunicationService.refreshUserDetails_events$.subscribe(event => {
      this.userEmail = event;
      console.log(event);
    });

  }

  ngOnInit(): void {
    this.appversion = VERSION.full;
    if (UserWorkingCacheService.isValidString(this.userEmail)) {
      this.userCachingService.setUserDbInfo(this.userEmail);
    } else {
      this.userEmail = localStorage.getItem("userCacheEmail");
    }

    this.hideUI = !UserWorkingCacheService.isUserActive();

    this.componetCommunicationService.isVisibleSource.subscribe(res => {
      this.isVisible = res;
      // console.log(res);
    });
    this.setSbxLogoLink();
  }

  toggleNav() {
    if (this.hideUI === true) {
      return;
    }
    this.seideNavService.setSideNav(this.isExpanded = !this.isExpanded);
  }

  setSbxLogoLink() {
    //set the SBX Logo Link to admin page if User has admin access and no SBX access
    this.adminService.accessAdminUI().subscribe(res => {
      console.log(res);
      let canAccessAdminUI = res;
      if (this.userEmail != null && this.userEmail != '') {
        this.userCachingService.apiIsValidSbxUser(this.userEmail).subscribe((res: any) => {
          if (res !== true && canAccessAdminUI == true) {
            this.logolink = "/admin";
          }
        })
      } else if (canAccessAdminUI == true) {
        this.logolink = "/admin";
      }
    })

  }

  public toggleNavbar() {
    if (this.hideUI === true) {
      return;
    }
    this.navbarEventEmitter.emit(null);
  }


  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
    this.userCachingService.setUserDbInfoFromAccountInfo(this.authService.instance.getAllAccounts()[0]);
  }

  logout() {
    this.authService.logoutRedirect({
      //postLogoutRedirectUri: 'http://localhost:4200'//postLogoutRedirectUri: 'https://cwsbxapp01uv:8082'
      postLogoutRedirectUri: environment.msalConfig.auth.redirectUrl//postLogoutRedirectUri: 'https://cwsbxapp01uv:8082'
    });
  }


  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

}

