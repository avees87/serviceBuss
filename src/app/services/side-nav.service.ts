import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor() { }

  public sideNav = new BehaviorSubject<boolean>(false);

  setSideNav(changeToggle: boolean) {
    this.sideNav.next(changeToggle);
  }

  getSideNav() {
    return this.sideNav.asObservable();
  }
}
