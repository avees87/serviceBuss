import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { routes } from 'src/app/menu';
import { HeaderComponent } from '../header/header.component';
import { SideNavService } from 'src/app/services/side-nav.service';
import { UserWorkingCacheService } from 'src/app/services/user-workingcache.service';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'sbx-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  isShowing = true;
  showSubmenu: boolean = true;
  showSubSubMenu: boolean = true;
  sidenavWidth = 15;
  routes = routes;
  accessAdminUI:any = false;
  loggedInUserEmail: any;
  canAccessSBX = true;

  constructor(private sideNavService: SideNavService, private adminService: AdminService,
    private apiIsValidSbxUser: UserWorkingCacheService
  ) { }

  ngOnInit() {
    this.sideNavService.getSideNav().subscribe(x => {
      this.isExpanded = x;
    });

    console.log(localStorage.getItem('userCacheEmail'));
    if(localStorage.getItem('userCacheEmail')){
      this.loggedInUserEmail = localStorage.getItem('userCacheEmail')
    }

    this.adminService.accessAdminUI().subscribe(res =>{
      console.log(res);
      this.accessAdminUI = res;
    })

    if(this.loggedInUserEmail != null && this.loggedInUserEmail != ''){
      this.apiIsValidSbxUser.apiIsValidSbxUser(this.loggedInUserEmail).subscribe((res:any) =>{
        console.log(res);
        this.canAccessSBX = res;
      })
    }
  }

  // Side nav-menu Start
  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 2;
    console.log('decrease sidenav width');
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  // Side nav-menu End

}
