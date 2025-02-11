import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { PropertyInfoDisplayEntity, PropertyInforDisplayVm, PropertyValuationEntity } from 'src/app/models/propertyinfodisplayvm';
import { ExcelService } from 'src/app/services/excel.service';
import { LoanInformationService } from 'src/app/services/loan-information.service';


const propertyHistroyColNames: { title: string, name: string, Id: number }[] = [
  { title: 'Order Number', name: 'orderNumber', Id: 1 },
  { title: 'Date', name: 'datePVString', Id: 2 },
  { title: 'Type', name: 'type', Id: 3 },
  { title: 'As Is Value', name: 'AsIs', Id: 4 },
  { title: 'Previous As Is Value', name: 'previousAsIsString', Id: 5 },
  { title: '$ Change', name: 'asIsDollarChangeString', Id: 6 },
  { title: '% Change', name: 'asIsPercentChangeString', Id: 7 },
  { title: 'Published', name: 'published', Id: 8 },
  { title: 'Previously Published', name: 'publishedPreviously', Id: 9 }
];

@Component({
  selector: 'sbx-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.scss']
})
export class PropertyInfoComponent implements OnInit {
  public loading: boolean = false;
  public getloanNumber: string = "";
  public propertyInfoDisplay: PropertyInfoDisplayEntity = {} as PropertyInfoDisplayEntity;
  public propertyValuationData: PropertyValuationEntity[] = [];
  public currentDate = new Date();
  public PropertyHistoryExport: any[] = [];

  constructor(private loaninfoservice: LoanInformationService, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.loading = true;
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    if (_loanNumber !== null) {
      this.getloanNumber = _loanNumber;
      this.GetPropertyInfoisplayResults();
    }
    else {
      console.error("Loan number not found");
    }
  }

  GetPropertyInfoisplayResults() {
    this.loaninfoservice.apiPropertyInforDisplayResults(this.getloanNumber, "").subscribe(res => {
      this.propertyInfoDisplay = JSON.parse(JSON.stringify(res)).data.propertyInfo_DisplayEntity;
      this.propertyValuationData = JSON.parse(JSON.stringify(res)).data.propertyValuationEntities;
    });
    this.loading = false;
  }
  ExportCsvPropertyValuationHistory() {
    let fileName = "PropertyValuationHistory_" + (this.currentDate.getMonth() + 1) + "_" + this.currentDate.getDate() + "_" + this.currentDate.getFullYear();
    this.loaninfoservice.apiPropertyInforDisplayResults(this.getloanNumber, "").subscribe(res => {
      var exportData = this.filterTransactionHistories(res.data.propertyValuationEntities);
      this.excelService.exportAsCSVFile(exportData, fileName);
    });
    this.loading = false;
  }
  filterTransactionHistories(propertyHistroyExtract: PropertyValuationEntity[]) {
    this.PropertyHistoryExport = [];
    Object.entries(propertyHistroyExtract).forEach(x => {
      const orderedColumns: { title: string, value: string, id: number }[] = []
      Object.entries(x[1]).forEach(y => {
        const val: any = propertyHistroyColNames.filter(k => k.name.toUpperCase() === y[0].toUpperCase())
        if (val.length > 0) {
          if (val[0].title.toUpperCase() === "published".toUpperCase() || val[0].title.toUpperCase() === "Previously Published".toUpperCase()) {
            orderedColumns.push({ title: val[0].title, value: "", id: val[0].Id })
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
      this.PropertyHistoryExport.push(_item);
    });
    return this.PropertyHistoryExport;
  }
}
