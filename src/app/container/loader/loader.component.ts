import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() loadingFlag:boolean = true;
  
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = this.loadingFlag 
  }
}
