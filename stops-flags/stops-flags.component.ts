import { Component, OnInit } from '@angular/core';
import { StopsAndFlagsEntityVm } from 'src/app/models/stopsandflagsentityvm';
import { ExcelService } from 'src/app/services/excel.service';
import { LoanInformationService } from 'src/app/services/loan-information.service';

const StopsFlagsColNames: { title: string, name: string, Id: number }[] = [
  { title: 'Stops & Flags', name: 'stopsAndFlags', Id: 1 },
  { title: 'Value', name: 'value', Id: 2 },
  { title: 'Description', name: 'description', Id: 3 },
  { title: 'Expires On', name: 'expiresOnString', Id: 4 },
  { title: 'Last Updated By', name: 'lastUpdatedBy', Id: 5 },
  { title: 'Last Updated Date', name: 'lastUpdatedDateString', Id: 6 },
];

@Component({
  selector: 'sbx-stops-flags',
  templateUrl: './stops-flags.component.html',
  styleUrls: ['./stops-flags.component.scss']
})
export class StopsFlagsComponent implements OnInit {
  public loading: boolean = false;
  public getloanNumber: string = "";
  public stopsAndFlagsEntityVm: StopsAndFlagsEntityVm[] = [];
  public currentDate = new Date();
  public StopsFlagsExport: any[] = [];
  constructor(private loaninfoservice: LoanInformationService, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.loading = true;
    var _loanNumber = String(localStorage.getItem("loanNumber"));
    this.getloanNumber = _loanNumber;
    if (_loanNumber !== null) {
      this.getloanNumber = _loanNumber;
      this.GetStopsFlagsResults();
    }
    else {
      console.error("Loan number not found");
    }
  }
  GetStopsFlagsResults() {
    this.loaninfoservice.apiStopsFlagsDisplayesults(this.getloanNumber, "").subscribe(res => {
      console.log("apiStopsFlagsDisplayesults " + res.data);
      this.stopsAndFlagsEntityVm = JSON.parse(JSON.stringify(res)).data;
    });
    this.loading = false;
  }
  ExportCsvstopsAndFlags(){
    let fileName = "StopsnFlags_" + (this.currentDate.getMonth() + 1) + "_" + this.currentDate.getDate() + "_" + this.currentDate.getFullYear();
    this.loaninfoservice.apiStopsFlagsDisplayesults(this.getloanNumber, "").subscribe(res => {
      var exportData = this.filterStopsnFlags(res.data);
      this.excelService.exportAsCSVFile(exportData, fileName);
    });
  }
  filterStopsnFlags(histroyExtract: StopsAndFlagsEntityVm[]) {
    this.StopsFlagsExport = [];
    Object.entries(histroyExtract).forEach(x => {
      const orderedColumns: { title: string, value: string, id: number }[] = []
      Object.entries(x[1]).forEach(y => {
        var test = y[0].toUpperCase()
        const val: any = StopsFlagsColNames.filter(k => k.name.toUpperCase() === y[0].toUpperCase())
        if (val.length > 0) {
            orderedColumns.push({ title: val[0].title, value: y[1], id: val[0].Id })
        }
      });
      const _sort = orderedColumns.sort((a, b) => a.id - b.id);
      const _item: any[string] = []
      Object.entries(_sort).forEach(i => {
        _item[i[1].title] = i[1].value;
      });
      this.StopsFlagsExport.push(_item);
    });
    return this.StopsFlagsExport;
  }
}
