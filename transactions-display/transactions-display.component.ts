import { Component, OnInit, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import { TransactionsDisplayEntityVm } from 'src/app/models/transactionsdisplayentityvm';
import { LoanInformationService } from 'src/app/services/loan-information.service';
import { formatNumber } from '@progress/kendo-intl';
import { ExcelService } from 'src/app/services/excel.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Subscription, take } from 'rxjs';
import { GridModule } from "@progress/kendo-angular-grid";


const TransactionHistroyColNames: { title: string, name: string, Id: number }[] = [
  { title: 'Transaction Date', name: 'transactionDate', Id: 1 },
  { title: 'Transaction Code', name: 'transactionCode', Id: 2 },
  { title: 'Transaction Group', name: 'transactionGroup', Id: 3 },
  { title: 'Transaction Amount', name: 'transactionAmount', Id: 4 },
  { title: 'Transaction Type', name: 'transactionType', Id: 5 },
  { title: 'Check Number', name: 'checkNumber', Id: 6 },
  { title: 'Suspense Balance', name: 'suspenseBalance', Id: 7 },
  { title: 'Escrow Balance', name: 'escrowBalance', Id: 8 },
  { title: 'Escrow Expanded Advance Balance', name: 'escrowExpandedAdvanceBalance', Id: 9 },
  { title: 'Recoverable Corp Advance Balance', name: 'recoverableCorpAdvanceBalance', Id: 10 },
  { title: 'Non  Rec Corp Advance Balance', name: 'nonRecCorpAdvanceBalance', Id: 11 },
  { title: 'First Principal Balance', name: 'firstPrincipalBalance', Id: 12 },
];

@Component({
  selector: 'sbx-transactions-display',
  templateUrl: './transactions-display.component.html',
  styleUrls: ['./transactions-display.component.scss']
})
export class TransactionsDisplayComponent implements OnInit {
  //subscription!: Subscription;

  // @ViewChild('transGrid')
  // public transGrid!: GridComponent;

  public loading: boolean = false;
  public getloanNumber: string = "";
  public transactionsDisplayEntityVm: TransactionsDisplayEntityVm[] = [];
  public currentDate = new Date();
  public TransactionsDisplayExport: any[] = [];

  constructor(private loaninfoservice: LoanInformationService, private excelService: ExcelService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.loading = true;
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    if (_loanNumber !== null) {
      this.getloanNumber = _loanNumber;
      this.GetTransactionsResults();
    }
    else {
      console.error("Loan number not found");
    }
  }

  // public onDataStateChange(): void {
  //   this.fitColumns();
  // }
  // private fitColumns(): void {
  //   this.ngZone.onStable
  //     .asObservable()
  //     .pipe(take(1))
  //     .subscribe(() => {
  //       this.transGrid.autoFitColumns();
  //     });
  // }
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
  //this.subscription =
  GetTransactionsResults() {
    this.loaninfoservice.apiTransactionsDisplayesults(this.getloanNumber, "").subscribe(res => {
      //this.transactionsDisplayEntityVm = JSON.parse(JSON.stringify(res)).data;
      this.transactionsDisplayEntityVm = res.data;
      //convert Transaction Date to Date object explicitily to be able to sort and filter as Date
      //other its Kendo treats it as string
      this.transactionsDisplayEntityVm.forEach((v, i) =>
      {
        v.transactionDate = new Date(v.transactionDateString);
      });
      this.loading = false;
      //this.fitColumns();
    });
  }

  ExportCsvTransactions() {
    let fileName = "TransactionReport_" + (this.currentDate.getMonth() + 1) + "_" + this.currentDate.getDate() + "_" + this.currentDate.getFullYear();
    this.loaninfoservice.apiTransactionsDisplayesults(this.getloanNumber, "").subscribe(res => {
      var exportData = this.filterTransactionHistories(res.data);
      this.excelService.exportAsCSVFile(exportData, fileName);
    });
  }

  filterTransactionHistories(histroyExtract: TransactionsDisplayEntityVm[]) {
    this.TransactionsDisplayExport = [];

    Object.entries(histroyExtract).forEach(x => {
      const orderedColumns: { title: string, value: string, id: number }[] = []
      Object.entries(x[1]).forEach(y => {
        var test = y[0].toUpperCase()
        const val: any = TransactionHistroyColNames.filter(k => k.name.toUpperCase() === y[0].toUpperCase())
        if (val.length > 0) {
          if (val[0].title.toUpperCase() === "Transaction Date".toUpperCase()) {
            var transactionDate = new Date(y[1]).toLocaleString();
            orderedColumns.push({ title: val[0].title, value: transactionDate, id: val[0].Id })
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
      this.TransactionsDisplayExport.push(_item);
    });

    return this.TransactionsDisplayExport;
  }

}
