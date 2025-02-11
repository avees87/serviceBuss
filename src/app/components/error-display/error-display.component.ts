import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'sbx-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }
  ErrorMessage: any;
  errorCode: any;
  errorMeg : any;
  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params: any) => {
        this.errorMessageDisplay(params['errorCode'],params['errorMsg'])

      });
  }

  errorMessageDisplay(errorCode: any,errorMsg:any) {
    errorMsg = decodeURIComponent(errorMsg);
    switch (errorCode) {
      case "400": { //Bad Request
        this.ErrorMessage = errorMsg;
        break;
      }
      case "401": { //Unauthorized- Redirect to login
        this.ErrorMessage = errorMsg ;
        break;
      }
      case "403": { //Forbidden- access to the requested resource is forbidden
        this.ErrorMessage = errorMsg
        break;
      }
      case "404": { //Page Not Found
        this.ErrorMessage = errorMsg;
        break;
      }
      case "405": { //Method Not Allowed
        this.ErrorMessage = errorMsg;
        break;
      }
      case "406": { //Not Acceptable
        this.ErrorMessage = errorMsg;
        break;
      }
      case "500": { //Internal Server Error server
        this.ErrorMessage = errorMsg;
        break;
      }
      case "503": { //Service Unavailable
        this.ErrorMessage = "Service Unavailable";
        break;
      }

    }
  }
}
