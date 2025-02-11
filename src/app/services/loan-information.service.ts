import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { SearchResult } from '../../../models/searchresult';
import { catchError, map, of } from 'rxjs';
import { LoanSummaryEntity } from '../../../models/loansummaryentity';
import { AppConfiguration } from "read-appsettings-json";
import { SbxApiClient } from './SbxApiService';
import { LoanVm } from '../../../models/loanvm';
import { BorrowerInfoDisplayVm } from '../../../models/borrowerinfodisplayvm';
import { PaymentInforDisplayVm } from '../../../models/paymentinfodisplayvm';
import { PropertyInforDisplayVm } from '../../../models/propertyinfodisplayvm';
import { FCBKLossMitDisplayEntity } from '../../../models/fcbkLossmitdisplayentityvm';
import { PayOffEstimateDisplayEntityVm } from '../../../models/payoffestimatedisplayentityvm';
import { TransactionsDisplayEntityVm } from '../../../models/transactionsdisplayentityvm';
import { StopsAndFlagsEntityVm } from '../../../models/stopsandflagsentityvm';
import { CreditScoreEntity } from '../../../models/creditscoreentity';
import { UserWorkingCacheService } from './user-workingcache.service';

export const SbxApiSettings_BaseAddress = new InjectionToken<string>('SbxApiSettings.BaseAddress');
const _headers = new HttpHeaders()
  .set('content-type', 'application/json; charset=utf-8')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})
export class LoanInformationService {
  private http: HttpClient;
  private baseUrl: string;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(SbxApiSettings_BaseAddress) baseUrl?: string) {
    this.http = http;
    this.baseUrl = SbxApiClient.GetValidBaseUrl(baseUrl);
  }

  apiGetLoanSummaryResults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/LoanSummary/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    //if (!this.isValidString(loanNumber))       throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));
    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <LoanSummaryEntity><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("LoanSummaryEntity Error" + error);
          return of(error);
        })
      );
  }

  apiGetLoanResults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/LoanDisplay/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (!this.isValidString(loanNumber))
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));
    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <LoanVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("LoanVm Error" + error);
          return of(error);
        })
      );

  }

  apiBorrowerInfoDisplayResults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/BorrowersInfoDisplay/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (!this.isValidString(loanNumber))
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));

    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <BorrowerInfoDisplayVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("LoanVm Error" + error);
          return of(error);
        })
      );
  }

  apiPaymentInforDisplayResults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/PaymentInfoDisplay/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (!this.isValidString(loanNumber))
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));

    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <PaymentInforDisplayVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("PaymentInforDisplayVm Error" + error);
          return of(error);
        })
      );
  }

  apiPropertyInforDisplayResults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/PropertyInfoDisplay/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (!this.isValidString(loanNumber))
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));

    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <PropertyInforDisplayVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("PropertyInforDisplayVm Error" + error);
          return of(error);
        })
      );
  }



  apiFCBKLossMitDisplayResults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/FCBKLossMitDisplay/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (!this.isValidString(loanNumber))
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));

    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <FCBKLossMitDisplayEntity><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("FCBKLossMitDisplayEntity Error" + error);
          return of(error);
        })
      );
  }

  apiPayOffEstimateDisplayesults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/PayOffEstimateDisplay/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (!this.isValidString(loanNumber))
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));

    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <PayOffEstimateDisplayEntityVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("FCBKLossMitDisplayEntity Error" + error);
          return of(error);
        })
      );
  }

  apiTransactionsDisplayesults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/TransactionsDisplay/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (!this.isValidString(loanNumber))
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));

    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <TransactionsDisplayEntityVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("FCBKLossMitDisplayEntity Error" + error);
          return of(error);
        })
      );
  }


  apiStopsFlagsDisplayesults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/StopsAndFlagsDisplay/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (!this.isValidString(loanNumber))
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));

    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <StopsAndFlagsEntityVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("StopsAndFlagsEntityVm Error" + error);
          return of(error);
        })
      );
  }



  apiCreditInformationesults(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/CreditInformation/{loanNumber}/{userName}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (!this.isValidString(loanNumber))
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));

    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <CreditScoreEntity><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("StopsAndFlagsEntityVm Error" + error);
          return of(error);
        })
      );
  }

  public static ValidateLoanNumber(loanNumber: string) {
    if (!this.isValidString(loanNumber))
      throw new Error("Loan Number is blank. Please search or select a valid Loan Number.");
  }

  static isValidString(str: string): boolean {
    return str !== null && str !== undefined && str !== 'null' && str !== 'undefined' && str !== '';
  }
}
