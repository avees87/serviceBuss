import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { SbxApiClient } from './SbxApiService';
import { LoggingService } from './logging.service';
import { AccountInfo } from '@azure/msal-browser';
import { UserInfoVm } from 'src/app/models/userinfovm';
import { UserWorkingCacheVm } from 'src/app/models/userworkingcachevm';

const _headers = new HttpHeaders()
  .set('content-type', 'application/json; charset=utf-8')
  .set('Access-Control-Allow-Origin', '*');


@Injectable({
  providedIn: 'root'
})
export class UserWorkingCacheService {
  private http: HttpClient;
  private baseUrl: string;

  constructor(@Inject(HttpClient) http: HttpClient,
    private loggingService: LoggingService) {
    this.http = http;
    this.baseUrl = SbxApiClient.GetValidBaseUrl(undefined);
  }

  setUserWorkingCache(loanNumber: string) {
    localStorage.setItem("loanNumber", loanNumber);
    this.apiSetUserWorkingCache(loanNumber)
      .pipe(
        catchError(error => {
          this.loggingService.logError(error);
          this.loggingService.logError(`Error SetUserWorkingCache for loan:${loanNumber}`);
          return of([]);
        })
      )
      .subscribe(res => {
        console.log(`Successfully SetUserWorkingCache to loan:${loanNumber}`);
        localStorage.setItem("loanNumber", loanNumber);
      });
  }

  loadUserWorkingCache(forceReload: boolean = false) {
    let loanNumber = String(localStorage.getItem("loanNumber"));
    this.loggingService.logTrace(`UserWorkingCacheService for LocalStorage LoanNumber:${loanNumber}`);

    if (UserWorkingCacheService.isValidString(loanNumber) &&
      forceReload === false) {
      return;
    }

    this.apiGetUserWorkingCache()
      .pipe(
        catchError(error => {
          this.loggingService.logError(`Error GetUserWorkingCache`);
          this.loggingService.logError(error);
          return of([]);
        })
      )
      .subscribe(res => {
        this.loggingService.logTrace('UserWorkingCache Found in UserWorkingCacheService');
        this.loggingService.logTrace(res);
        let userCacheInfoVm = res.data as UserWorkingCacheVm;
        this.loggingService.logTrace("", userCacheInfoVm);
        if (userCacheInfoVm !== null && userCacheInfoVm.loanNumber > 0) {
          localStorage.setItem("loanNumber", userCacheInfoVm.loanNumber.toString());
          localStorage.setItem("userCacheEmail", userCacheInfoVm.email);
        }
        return res;
      });
  }

  apiSetUserWorkingCache(loanNumber: string) {
    let url_ = this.baseUrl + "/api/LoanInformation/SetUserWorkingCache/{loanNumber}";
    if (loanNumber === undefined || loanNumber === null || loanNumber === 'null') {
      throw new Error("The parameter 'loanNumber' must be defined.");
    }

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        catchError(error => {
          this.loggingService.logError(`SetUserWorkingCache Error loanNumber:${loanNumber}`);
          this.loggingService.logError(error);
          return of(error);
        })
      );
  }

  apiGetUserWorkingCache() {
    let url_ = this.baseUrl + "/api/LoanInformation/GetUserWorkingCache";

    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <UserWorkingCacheVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          this.loggingService.logError(`GetUserWorkingCache Error ${error}`);
          this.loggingService.logError(error);
          return of(error);
        })
      );
  }

  //#region add region for user info
  public static isValidString(str: string): boolean {
    return str !== null && str !== undefined && str !== 'null' && str !== 'undefined';
  }

  public static isNullOrEmptyString(str: string): boolean {
    return !UserWorkingCacheService.isValidString(str) || str == '';
  }

  public static isUserActive(): boolean {
    let isUserActive = localStorage.getItem("userCacheActive") as string;
    //console.log(`isUserActive: ${isUserActive}`);
    //console.log(isUserActive);
    if (UserWorkingCacheService.isValidString(isUserActive) && isUserActive == "false") {
      return false;
    }
    return true;
  }

  setUserDbInfoFromAccountInfo(userAccountInfo: AccountInfo) {
    if (userAccountInfo === null || userAccountInfo === undefined) {
      return;
    }
    let userEmail = userAccountInfo.username;
    this.setUserDbInfo(userEmail);
  }

  setUserDbInfo(userEmail: string) {
    if (!UserWorkingCacheService.isValidString(userEmail)) {
      return;
    }

    localStorage.setItem("userCacheEmail", userEmail);
    this.apiGetUserInfo(userEmail)
      .pipe(
      catchError(error => {
        this.loggingService.logError(`setUserDbInfo Error loadUserInfo ${userEmail}`);
        this.loggingService.logError(error);
        localStorage.setItem("userCacheActive", false.toString());
        return of(error);
      })
    )
    .subscribe(res => {
        this.loggingService.logTrace(`GetUserInformation ${userEmail} apiGetUserInfo`);
        this.loggingService.logInfo(res);
        var jsonRes = JSON.stringify(res);
        var userInfoVm = JSON.parse(jsonRes).data as UserInfoVm;
        this.loggingService.logInfo(`UserInfoVm : `);
        this.loggingService.logInfo(userInfoVm);
        if (userInfoVm === null || userInfoVm === undefined || !userInfoVm.isActive) {
          this.loggingService.logInfo(`User ${userEmail} is not active`);
          localStorage.setItem("userCacheActive", false.toString());
        } else {
          localStorage.setItem("userCacheActive", true.toString());
        }
      });
    }


  //method to get user info
  apiGetUserInfo(userEmail: string) {
    if (!UserWorkingCacheService.isValidString(userEmail)) {
      throw new Error("The parameter 'userEmail' must be defined.");
    }
    userEmail = encodeURIComponent("" + userEmail);
    let url_ = `${this.baseUrl}/api/LoanInformation/GetUserInfo/${userEmail}`;


    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <UserInfoVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          this.loggingService.logError(`apiGetUserInfo Error`);
          this.loggingService.logError(error);
          return of(error);
        })
      );
  }

  apiIsValidSbxUser(userEmail: string){
    if (!UserWorkingCacheService.isValidString(userEmail)) {
      throw new Error("The parameter 'userEmail' must be defined.");
    }
    userEmail = encodeURIComponent("" + userEmail);
    let url_ = `${this.baseUrl}/api/LoanInformation/IsValidSbxUser/${userEmail}`;
    return this.http.get(url_, {headers: _headers})
  }
  //#endregion
}
