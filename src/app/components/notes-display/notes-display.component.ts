import { Component, OnInit } from '@angular/core';
import { NotesEntityVm } from 'src/app/models/notesentityvm';
import { NotesContactCodesEntity, NotesReasonCodesEntity, NotesResponseCodesEntity, SBXUserNotesEntity } from 'src/app/models/usernotesvm';
import { AssetResearchService } from 'src/app/components/services/asset-research.service';
import { ComponetCommunicationService } from 'src/app/components/services/component-communication.service';
import { ExcelService } from 'src/app/components/services/excel.service';
import { DropDownFilterSettings } from "@progress/kendo-angular-dropdowns";
import { LoanInformationService } from 'src/app/components/services/loan-information.service';
import { LoanNoteCommandVm } from 'src/app/models/loannotecommandvm';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserWorkingCacheService } from 'src/app/components/services/user-workingcache.service';
import { UserInfoVm } from 'src/app/models/userinfovm';
import { LoggingService } from 'src/app/components/services/logging.service';
import { catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

const NotesColNames: { title: string, name: string, Id: number }[] = [
  { title: 'Comment', name: 'comment', Id: 1 },
  { title: 'CreatedOn', name: 'createdOn', Id: 2 },
  { title: 'CreatedBy', name: 'createdBy', Id: 3 },
  { title: 'CategoryType', name: 'categoryType', Id: 4 },
];

@Component({
  selector: 'sbx-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.scss']
})
export class NotesDisplayComponent implements OnInit {
  [x: string]: any;
  public loading: boolean = false;
  public getloanNumber: string = "";
  public notesEntityVm: NotesEntityVm[] = [];
  public currentDate = new Date();
  public NotesDisplayExport: any[] = [];
  public notesContactCodesEntity: NotesContactCodesEntity[] = [];
  public notesReasonCodesEntity: NotesReasonCodesEntity[] = [];
  public notesResponseCodesEntity: NotesResponseCodesEntity[] = [];
  //PopUp Values
  public selectedNotesContactCode: any;
  public selectedNotesReasonCodes: any;
  public selectedNotesResponseCodes: any;
  public selectedNotes: string = "";
  public selectedFidelityUserID: string = "";
  public loanNoteCommandVm: LoanNoteCommandVm = {
    loanNumber: 0,
    note: '',
    contactCode: '',
    reasonCode: '',
    responseCode: '',
    sbxUserId: 0,
    fidelityUserId: ''
  };

  nextDueDate: any;
  uPBString: any;
  subscription: any;
  public opened = false;

  private sumbitted = false;
  public enableNewNote: boolean = false;
  userEmail: any;
  public maxlength: number = 150
  public charachtersCount: number | undefined;
  public counter: string | undefined;
  public value = "";

  private shouldValidate = (): boolean => {
    return this.sumbitted === true;
  };

  constructor(
    private assetResearchService: AssetResearchService,
    private componetCommunicationService: ComponetCommunicationService,
    private excelService: ExcelService,
    private userCachingService: UserWorkingCacheService,
    private loaninfoservice: LoanInformationService,
    private loggingService: LoggingService
  ) {
    this.subscription = this.componetCommunicationService.refreshUserDetails_events$.subscribe(event => {
      this.userEmail = event;
      this.loggingService.logTrace(`NotesDisplayComponent refreshUserDetails_events$`);
      this.loggingService.logInfo(event);
      this.GetUserInformation();
    });
  }

  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: "startsWith",
  };

  ngOnInit(): void {

    this.loading = true;
    //call this to ensure we have a loanNumber & userEmail in localstorage
    this.userEmail = String(localStorage.getItem("userCacheEmail"));
    let forceReload = !UserWorkingCacheService.isValidString(this.userEmail)
    this.userCachingService.loadUserWorkingCache(forceReload);

    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    this.GetLoanSummaryResults();
    this.GetNotesDisplaysults();
    this.GetUserLoanNoteResult();
    this.GetUserInformation();
    this.componetCommunicationService.isVisibleSource.next(true);

    this.charachtersCount = this.value ? this.value.length : 0;
    this.counter = `${this.charachtersCount}/${this.maxlength}`;
  }
  public onValueChange(ev: string): void {
    this.charachtersCount = ev.length;
    this.counter = `${this.charachtersCount}/${this.maxlength}`;
  }

  GetUserInformation() {
    if (!UserWorkingCacheService.isValidString(this.userEmail)) {
      this.userEmail = String(localStorage.getItem("userCacheEmail"));
    }
    let userEmail = this.userEmail;
    this.loggingService.logTrace(`GetUserInformation fetching UserInfo for userEmail ${userEmail}`);

    this.userCachingService.apiGetUserInfo(userEmail)
      .pipe(
        catchError(error => {
          this.loggingService.logError(`GetUserInformation Error loadUserInfo ${userEmail}`);
          this.loggingService.logError(error);
          return of([]);
        })
      )
      .subscribe(res => {
        this.loggingService.logTrace(`GetUserInformation ${userEmail} apiGetUserInfo`);
        this.loggingService.logInfo(res);
        var jsonRes = JSON.stringify(res);
        var userInfoVm = JSON.parse(jsonRes).data as UserInfoVm;
        this.loggingService.logInfo(`UserInfoVm : `);
        this.loggingService.logInfo(userInfoVm);
        this.SetNewNoteButtonState(userInfoVm);
      });
  }

  SetNewNoteButtonState(userInfoVm: UserInfoVm) {
    if (userInfoVm === null || userInfoVm === undefined)
      return
    this.enableNewNote = !userInfoVm.isInvestor && userInfoVm.isActive;
  }

  GetLoanSummaryResults() {
    this.loaninfoservice.apiGetLoanSummaryResults(this.getloanNumber, "").subscribe(res => {
      this.componetCommunicationService.refreshborrowerTabEvent(true);
      this.componetCommunicationService.refreshselectedGridDataEvent(JSON.parse(JSON.stringify(res)).data);
    });
  }

  GetNotesDisplaysults() {
    this.assetResearchService.apiGetAllNotesByLoanNumberResult(this.getloanNumber, "").subscribe(res => {
      this.notesEntityVm = JSON.parse(JSON.stringify(res)).data;
      if (this.notesEntityVm.length > 0) {
        this.nextDueDate = this.notesEntityVm[0].nextDueDate;
        this.uPBString = this.notesEntityVm[0].upbString;
      }
    });
    this.loading = false;
  }

  GetUserLoanNoteResult() {
    this.assetResearchService.apiGetUserLoanNoteResult().subscribe(res => {
      this.notesContactCodesEntity = JSON.parse(JSON.stringify(res)).data.contactCodes;
      this.notesReasonCodesEntity = JSON.parse(JSON.stringify(res)).data.reasonCodes;
      this.notesResponseCodesEntity = JSON.parse(JSON.stringify(res)).data.responseCodes;
    });
  }

  getLocalDateString(gridDate: Date) {
    return new Date(gridDate).toLocaleString();
  }
  ExportCsvNotes() {
    let fileName = "Notes_" + (this.currentDate.getMonth() + 1) + "_" + this.currentDate.getDate() + "_" + this.currentDate.getFullYear();
    this.assetResearchService.apiGetAllNotesByLoanNumberResult(this.getloanNumber, "").subscribe(res => {
      var exportData = this.filterTransactionHistories(res.data);
      this.excelService.exportAsCSVFile(exportData, fileName);
    });
  }

  filterTransactionHistories(histroyExtract: NotesEntityVm[]) {
    this.NotesDisplayExport = [];
    Object.entries(histroyExtract).forEach(x => {
      const orderedColumns: { title: string, value: string, id: number }[] = []
      Object.entries(x[1]).forEach(y => {
        var test = y[0].toUpperCase()
        const val: any = NotesColNames.filter(k => k.name.toUpperCase() === y[0].toUpperCase())
        if (val.length > 0) {
          if (val[0].title.toUpperCase() === "CREATEDON".toUpperCase()) {
            orderedColumns.push({ title: val[0].title, value: this.getLocalDateString(y[1]), id: val[0].Id })
          }
          else {
            orderedColumns.push({ title: val[0].title, value: y[1], id: val[0].Id })
          }
        }
      });
      const _sort = orderedColumns.sort((a, b) => a.id - b.id);
      const _item: any[string] = []
      Object.entries(_sort).forEach(i => {
        _item[i[1].title] = i[1].value;
      });
      this.NotesDisplayExport.push(_item);
    });

    return this.NotesDisplayExport;
  }
  public dataSaved = false;

  public close(): void {
    this.opened = false;
    this.resetForm();
  }

  public open(): void {
    this.opened = true;
  }

  //const contactCode = new FormControl(null, { validators: [ Validators.required ] });
  public notesForm: FormGroup = new FormGroup({
    contactCode: new FormControl(),
    reasonCode: new FormControl(),
    responseCode: new FormControl(),
    notes: new FormControl(),
    FidelityUserId: new FormControl()
  });

  public submit(): void {
    this.sumbitted = true;
  }
  resetForm() {
    this.notesForm.reset();
    this.value = "";
    this.charachtersCount = this.value ? this.value.length : 0;
    this.counter = `${this.charachtersCount}/${this.maxlength}`;
  }
  isInvalid = true;
  showError = false;
  public submitForm(): void {
    this.notesForm.markAllAsTouched();

    this.notesForm.value.contactCode?.notesContactCodesID == 0 ? this.notesForm.get('contactCode')?.reset() : this.notesForm.value.contactCode;
    this.notesForm.value.reasonCode?.notesReasonCodesID == 0 ? this.notesForm.get('reasonCode')?.reset() : this.notesForm.value.reasonCode;
    this.notesForm.value.responseCode?.notesResponseCodesID == 0 ? this.notesForm.get('responseCode')?.reset() : this.notesForm.value.responseCode

    console.log(this.notesForm.value);

    if (this.notesForm.value.FidelityUserId === "" ||
        this.notesForm.value.FidelityUserId == null ||
        this.notesForm.value.FidelityUserId == undefined) {
      this.showError = true;
      return;
    }

    if(
      this.notesForm.value.contactCode != null  ||
      this.notesForm.value.reasonCode != null  ||
      this.notesForm.value.responseCode != null ||
      (this.notesForm.value.notes != "" && this.notesForm.value.notes != null)
    ){
      this.showError = false;
      this.loanNoteCommandVm.loanNumber = Number(this.getloanNumber);
      if (this.notesForm.value.contactCode != null)
        this.loanNoteCommandVm.contactCode = this.notesForm.value.contactCode.notesContactCode;

      if (this.notesForm.value.reasonCode != null)
        this.loanNoteCommandVm.reasonCode = this.notesForm.value.reasonCode.notesReasonCode;

      if (this.notesForm.value.responseCode != null)
        this.loanNoteCommandVm.responseCode = this.notesForm.value.responseCode.notesResponseCode;

      if (this.notesForm.value.notes != null)
        this.loanNoteCommandVm.note = this.notesForm.value.notes.trim().toUpperCase();

      this.loanNoteCommandVm.fidelityUserId = this.notesForm.value.FidelityUserId.toUpperCase();
      this.assetResearchService.apiAddUserLoanNote(this.loanNoteCommandVm).subscribe(res => {
        console.log("dataSaved :" + res);
        this.GetNotesDisplaysults();
        this.notesForm.reset();
        this.dataSaved = true;
        this.loanNoteCommandVm = {
          loanNumber: 0,
          note: '',
          contactCode: '',
          reasonCode: '',
          responseCode: '',
          sbxUserId: 0,
          fidelityUserId: ''
        };
        this.close();
      });
    }
    else{
      this.showError = true;
    }


    // if (this.notesForm.valid) {
    //   debugger;
    //   this.loanNoteCommandVm.loanNumber = Number(this.getloanNumber);
    //   if (this.notesForm.value.contactCode != null)
    //     this.loanNoteCommandVm.contactCode = this.notesForm.value.contactCode.notesContactCode;

    //   if (this.notesForm.value.reasonCode != null)
    //     this.loanNoteCommandVm.reasonCode = this.notesForm.value.reasonCode.notesReasonCode;

    //   if (this.notesForm.value.responseCode != null)
    //     this.loanNoteCommandVm.responseCode = this.notesForm.value.responseCode.notesResponseCode;

    //   if (this.notesForm.value.notes != null)
    //     this.loanNoteCommandVm.note = this.notesForm.value.notes.trim().toUpperCase();

    //   this.loanNoteCommandVm.fidelityUserId = this.notesForm.value.FidelityUserId.toUpperCase();
    //   this.assetResearchService.apiAddUserLoanNote(this.loanNoteCommandVm).subscribe(res => {
    //     console.log("dataSaved :" + res);
    //     this.GetNotesDisplaysults();
    //     this.notesForm.reset();
    //     this.dataSaved = true;
    //     this.loanNoteCommandVm = {
    //       loanNumber: 0,
    //       note: '',
    //       contactCode: '',
    //       reasonCode: '',
    //       responseCode: '',
    //       sbxUserId: 0,
    //       fidelityUserId: ''
    //     };
    //     this.close();
    //   });
    // }
  }

}
