import { Component, OnInit } from '@angular/core';
import { PaymentInfoDisplayEntity, TransactionHistoryDisplayEntity } from '../../models/paymentinfodisplayvm';
import { LoanInformationService } from '../services/loan-information.service';
import { ExcelService } from '../services/excel.service';

const paymentHistroyColNames: { title: string, name: string }[] = [
  { title: 'Payment ID', name: 'paymentId' },
  { title: 'Transaction Date', name: 'transactionDateString' },
  { title: 'Due Date', name: 'dueDateString' },
  { title: 'Effective Date', name: 'effectiveDateString' },
  { title: 'Trans Code', name: 'transactionCode' },
  { title: 'Transaction Description', name: 'transactionDescription' },
  { title: 'Total Amount', name: 'totalAmount' },
  { title: 'Principal Amount', name: 'principleAmount' },
  { title: 'Interest Amount', name: 'interestAmount' },
  { title: 'Suspense Amount', name: 'suspenseAmount' },
  { title: 'Escrow Amount', name: 'escrowAmount' },
  { title: 'Fee Amount', name: 'feeAmount' },
  { title: 'Suspense Balance', name: 'suspenseBalance' },
  { title: 'Escrow Balance', name: 'escrowBalance' },
  { title: 'Escrow Expd Adv Balance', name: 'escrowExpandedAdvanceBalance' },
  { title: 'Recoverable Corp Advance Balance', name: 'recoverableCorpAdvanceBalance' },
  { title: 'First Principal Balance', name: 'firstPrincipalBalance' },
];

@Component({
  selector: 'sbx-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  public loading: boolean = false;
  public getloanNumber: string = "";
  // public paymentInfoData: PaymentInforDisplayVm = {} as PaymentInforDisplayVm;
  public paymentInfoDataHistroyData: TransactionHistoryDisplayEntity[] = [];
  public paymentInfoDisplay: PaymentInfoDisplayEntity = {} as PaymentInfoDisplayEntity;
  public paymentInfoD12month: PaymentInfoDisplayEntity = {} as PaymentInfoDisplayEntity;
  public currentDate = new Date();
  public PaymentHistoryExport: any[] = [];

  constructor(private loaninfoservice: LoanInformationService, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.loading = true;
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    if (_loanNumber !== null) {
      this.getloanNumber = _loanNumber;
      this.GetPaymentInfoDisplayResults();
    }
    else {
      console.error("Loan number not found");
    }
  }
  GetPaymentInfoDisplayResults() {
    this.loaninfoservice.apiPaymentInforDisplayResults(this.getloanNumber, "").subscribe(res => {
      console.log("apiPaymentInforDisplayResults " + res.data);
      this.paymentInfoDataHistroyData = JSON.parse(JSON.stringify(res)).data.transactionHistory_DisplayEntities;
      this.paymentInfoDisplay = JSON.parse(JSON.stringify(res)).data.paymentInfo_DisplayEntity;
      this.paymentInfoD12month = JSON.parse(JSON.stringify(res)).data.paymentInfo_DisplayEntities[0];
    });
    this.loading = false;
  }

  getMonth(month: number) {
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + month);
  }

  ExportCsvTransactionHistory() {
    let fileName = "TransactionHistory_" + (this.currentDate.getMonth() + 1) + "_" + this.currentDate.getDate() + "_" + this.currentDate.getFullYear();
    this.loaninfoservice.apiPaymentInforDisplayResults(this.getloanNumber, "").subscribe(res => {
      var exportData =this.filterTransactionHistories(JSON.parse(JSON.stringify(res)).data.transactionHistory_DisplayEntities);
      this.excelService.exportAsCSVFile(exportData, fileName);
    });
    this.loading = false;
  }
  filterTransactionHistories(histroyExtract: TransactionHistoryDisplayEntity[]){
    this.PaymentHistoryExport = [];
    Object.entries(histroyExtract).forEach(x => {
      const item: any[] = [];
      Object.entries(x[1]).forEach(y => {
        const val: any = paymentHistroyColNames.filter(k => k.name.toUpperCase() === y[0].toUpperCase());
        if (val.length > 0) {
          item[val[0].title] = y[1];
        }
      });
      this.PaymentHistoryExport.push(item);
    });
    return this.PaymentHistoryExport;
  }

}
