import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponetCommunicationService implements OnDestroy  {

  
  isVisibleSource: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }
  ngOnDestroy(): void {
    console.log('service on destroy');
  }

  private refreshborrowerTab = new Subject<boolean>();
  private refreshselectedGridData = new Subject<any>;
  private refreshUserDetails = new Subject<any>;
  private toggleMenu = new Subject<boolean>();

  refreshborrowerTabEvent(event: any) {
    this.refreshborrowerTab.next(event);
  }
  get refreshborrowerTab_events$(){
    return this.refreshborrowerTab.asObservable();
  }

  //selected Grid View Data
  refreshselectedGridDataEvent(event: any) {
    this.refreshselectedGridData.next(event);
  }
  get refreshselectedGridData_events$(){
    return this.refreshselectedGridData.asObservable();
  }

  //Bind the userData
  refreshUserDetailsEvent(event: any) {
    this.refreshUserDetails.next(event);
  }
  get refreshUserDetails_events$(){
    return this.refreshUserDetails.asObservable();
  }

  // Toggle Main menu
  toggleMainMenuEvent(event: any) {
    this.toggleMenu.next(event);
  }
  get toggleMainMenu_event$(){
    return this.toggleMenu.asObservable();
  }

}
