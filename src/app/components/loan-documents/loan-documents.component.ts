import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlobOptions } from 'buffer';
import { catchError, throwError, of, finalize, pipe } from 'rxjs';
import { LoanDocUrlAuditVm } from 'src/app/models/loanDocUrlAuditVm';
import { ComponetCommunicationService } from 'src/app/components/services/component-communication.service';
import { LoanInformationService } from 'src/app/components/services/loan-information.service';
import { SbxDocumentsService } from 'src/app/components/services/sbx-documents.service';
import { UserWorkingCacheService } from 'src/app/components/services/user-workingcache.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'sbx-loan-documents',
  templateUrl: './loan-documents.component.html',
  styleUrls: ['./loan-documents.component.css']
})
export class LoanDocumentsComponent implements OnInit {
  private documemntUrl: string = "";
  public loading: boolean = false;
  public gridData: any[] = [];
  public aiqgridData: any[] = [];
  public totalCount: number = 0;
  public aiqtotalCount: number = 0;
  IsDisplayed: boolean = true;
  AiqIsDisplayed: boolean = true;
  panelOpenState = true;

  showAiqDocs: boolean = environment.showAiqDocs;

  constructor(
    private sbxdocservice: SbxDocumentsService,
    private userCachingService: UserWorkingCacheService,
    private router: Router,
    private componentService: ComponetCommunicationService,
    private loaninfoservice: LoanInformationService,
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  initialiseInvites() {
    this.getLoanNumberStorage();
    this.loading = true;
    this.getDocuments();
    console.log(this.showAiqDocs);

    if (this.showAiqDocs) {
      this.aiqDocumentOpen();
    }
  }
  loanNumber: string = "";
  docTypeEncoded: string = "";
  navigationSubscription: any;

  ngOnInit(): void {
    // this.getLoanNumberStorage();
    // this.loading = true;
    // this.getDocuments();

    this.GetLoanSummaryResults();

    this.componentService.isVisibleSource.next(true);
  }
  GetLoanSummaryResults() {
    this.loaninfoservice.apiGetLoanSummaryResults(this.loanNumber, "").subscribe(res => {
      this.componentService.refreshborrowerTabEvent(true);
      this.componentService.refreshselectedGridDataEvent(JSON.parse(JSON.stringify(res)).data);
    });
  }

  getLoanNumberStorage() {
    //call this to ensure we have a loanNumber in localstorage
    this.userCachingService.loadUserWorkingCache();
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.loanNumber = _loanNumber;
    if (_loanNumber !== null) {
      this.loanNumber = _loanNumber;
    }
    else {
      console.warn("Loan number not found from storage");
    }
  }

  getDocumentByType(documentByType: any) {
    this.loading = true;
    this.sbxdocservice.apiGetDocuments(this.loanNumber, documentByType)
      .pipe
      (
        finalize(() => this.loading = false)
      )
      .subscribe(res => {
        this.gridData = JSON.parse(JSON.stringify(res)).data;
        this.totalCount = JSON.parse(JSON.stringify(res)).data.length;
        if (JSON.parse(JSON.stringify(res)).data.length > 0) {
          this.IsDisplayed = false;
        }
        this.setUserCapsilonTicket();
      });
  }

  getDocuments() {
    this.sbxdocservice.apiGetDocuments(this.loanNumber, "")
      .pipe
      (
        finalize(() => this.loading = false)
      )
      .subscribe(res => {
        console.log(JSON.stringify(res));
        this.gridData = JSON.parse(JSON.stringify(res)).data;
        this.totalCount = JSON.parse(JSON.stringify(res)).data.length;
        if (JSON.parse(JSON.stringify(res)).data.length > 0) {
          this.IsDisplayed = true;
        }
        //set user Capsilon Ticket
        this.setUserCapsilonTicket();
      });
  };
  //, folderId: string, source: string , folderId, source
  getDocumentUrlOld(documentId: string, docType: string) {
    this.sbxdocservice.apiGetDocumentUrl(documentId, this.loanNumber, docType)
      .subscribe((data) => {
        this.documemntUrl = String(data);
        window.open(this.documemntUrl, "_blank");
      });
  }

  getDocumentUrl(dataItem: any) {
    let docId: string = dataItem.id;
    this.sbxdocservice.apiGetDocumentUrl(dataItem.id, this.loanNumber, dataItem.typeName, dataItem.parentId)
      .subscribe((data) => {
        this.documemntUrl = String(data);
        window.open(this.documemntUrl, "_blank");

        //Write the audit log to the database
        let docAuditUrl: LoanDocUrlAuditVm =
        {
          documentId: docId.toString(),
          loanNumber: this.loanNumber,
          docType: dataItem.typeName.toString(),
          vsiDocUrl: this.documemntUrl,
          folderId: dataItem.parentId.toString()
        };

        this.sbxdocservice.apiAuditDocUrl(docAuditUrl)
          .pipe(
            catchError(err => {
              console.error(err);
              return of(null);
            })
          )
          .subscribe((r) => {
            console.log(`success audit log for docid:${dataItem.id} loannum:${this.loanNumber} result:${r?.toString}`);
          });
      });
  }


  private setUserCapsilonTicket(): void {
    //this.userCachingService.setUserWorkingCache(this.loanNumber);
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  visDocumentOpen() {
    this.loading = true;
    this.getDocuments();
  }
  aiqDocumentOpen() {
    this.loading = true;
    this.sbxdocservice.apiAiqGetDocuments(this.loanNumber, "")
      .pipe
      (
        finalize(() => this.loading = false)
      )
      .subscribe(res => {
        console.log(JSON.stringify(res));
        this.aiqgridData = JSON.parse(JSON.stringify(res)).data;
        this.aiqtotalCount = JSON.parse(JSON.stringify(res)).data.length;
        if (JSON.parse(JSON.stringify(res)).data.length > 0) {
          this.AiqIsDisplayed = true;
        }
        //set user Capsilon Ticket
        this.setUserCapsilonTicket();
        this.loading = false;
      });
  }

  aiqgetDocumentUrl(documentId: string, folderId: string, source: string) {
    this.sbxdocservice.apiAiqGetDocumentUrl(documentId, folderId, source)
      .subscribe((data) => {
        this.documemntUrl = String(data);
        window.open(this.documemntUrl, "_blank");
      });
  }
  aiqgetDocumentByType(documentByType: any) {
    this.loading = true;
    this.sbxdocservice.apiAiqGetDocuments(this.loanNumber, documentByType)
      .pipe
      (
        finalize(() => this.loading = false)
      )
      .subscribe(res => {
        this.aiqgridData = JSON.parse(JSON.stringify(res)).data;
        this.aiqtotalCount = JSON.parse(JSON.stringify(res)).data.length;
        if (JSON.parse(JSON.stringify(res)).data.length > 0) {
          this.AiqIsDisplayed = false;
        }
        this.setUserCapsilonTicket();
      });
  }
}
