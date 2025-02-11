import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { LoanDocDetailsListVm } from '../models/loandocdetailslistvm';
import { catchError, map } from 'rxjs/operators';
import { PortfolioViewVm } from '../models/portfolioiewvm';
import { AppConfiguration } from "read-appsettings-json";
import { SbxApiClient } from './SbxApiService';
import { MsalService } from '@azure/msal-angular';
import { of, throwError } from 'rxjs';
import { LoanInformationService } from './loan-information.service';
import { VsiLoanDocDetailsListVm } from '../models/vsiloandocdetailslistvm';
import { LoanDocUrlAuditVm } from '../models/loanDocUrlAuditVm';


export const SbxApiSettings_BaseAddress = new InjectionToken<string>('SbxApiSettings.BaseAddress');

const _headers = new HttpHeaders()
  .set('content-type', 'application/json; charset=utf-8')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root',
})
export class SbxDocumentsService {
  private http: HttpClient;
  private baseUrl: string;

  constructor(private msalservice: MsalService,
    @Inject(HttpClient) http: HttpClient, @Optional() @Inject(SbxApiSettings_BaseAddress) baseUrl?: string) {
    this.http = http;
    this.baseUrl = SbxApiClient.GetValidBaseUrl(baseUrl);
  }

  getLoggedInUserPortfolios() {
    let url_ = this.baseUrl + "/api/Portfolio/AuthPortfolios";
    url_ = url_.replace(/[?&]$/, "");
    let options_: any = {
      headers: _headers
    };
    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <PortfolioViewVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("PortfolioViewVm Error" + error);
          return of(error);
        })
      );

  }
  ///{folderId}/{source} , folderId: string, source: string
  apiGetDocumentUrl(documentId: string, loanNumber: string,
    docType: string = "", folderId: string = "") {
    //let url_ = this.baseUrl + "/api/LoanDocuments/DocumentUrl/{documentId}/{loanNumber}";
    if (documentId === undefined || documentId === null)
      throw new Error("The parameter 'documentId' must be defined.");
    LoanInformationService.ValidateLoanNumber(loanNumber);
    //url_ = url_.replace("{documentId}", encodeURIComponent("" + documentId));
    let encodedDocId = encodeURIComponent("" + documentId);
    let encodedLoanNum = encodeURIComponent("" + loanNumber);
    let encodedDocType = LoanInformationService.isValidString(docType) ?
      `/${encodeURIComponent(docType)}` : "";
    let encodedFolderId = LoanInformationService.isValidString(folderId) ?
      `/${encodeURIComponent(folderId)}` : "";

    let url_ = `${this.baseUrl}/api/LoanDocuments/DocumentUrl/${encodedDocId}/${encodedLoanNum}${encodedDocType}${encodedFolderId}`;

    // if (folderId !== null && folderId !== undefined)
    //   url_ = url_.replace("{folderId}", encodeURIComponent("" + folderId));
    // if (source !== null && source !== undefined)
    //   url_ = url_.replace("{source}", encodeURIComponent("" + source));

    let options_: any = {
      headers: _headers
    };

    return this.http.get(url_, options_);
  }

  apiAuditDocUrl(item: LoanDocUrlAuditVm) {
    let url_ = this.baseUrl + `/api/LoanDocuments/AuditLoanDocument`;
    const body = item;
    return this.http.post(url_, body, { headers: _headers })
  }

  apiGetDocuments(loanNumber: string, docType: string | null | undefined) {
    let url_ = this.baseUrl + "/api/LoanDocuments/{loanNumber}/{docType}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (loanNumber === undefined || loanNumber === null)
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));
    if (docType !== null && docType !== undefined)
      url_ = url_.replace("{docType}", encodeURIComponent("" + docType));
    else
      url_ = url_.replace("/{docType}", "");
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      headers: _headers
    };

    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <VsiLoanDocDetailsListVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("LoanDocDetailsList Error" + error);
          return of(error);
          //return throwError(error);
        })
      );

  }

  ////AIQ
  apiAiqGetDocuments(loanNumber: string, docType: string | null | undefined) {
    let url_ = this.baseUrl + "/api/LoanDocuments/AIQ/{loanNumber}/{docType}";
    LoanInformationService.ValidateLoanNumber(loanNumber);
    // if (loanNumber === undefined || loanNumber === null)
    //   throw new Error("The parameter 'loanNumber' must be defined.");

    url_ = url_.replace("{loanNumber}", encodeURIComponent("" + loanNumber));
    if (docType !== null && docType !== undefined)
      url_ = url_.replace("{docType}", encodeURIComponent("" + docType));
    else
      url_ = url_.replace("/{docType}", "");
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      headers: _headers
    };

    return this.http.get(url_, options_)
      .pipe(
        map(
          (response: any) =>
            <LoanDocDetailsListVm><unknown>{
              data: response
            }
        ),
        catchError(error => {
          console.log("LoanDocDetailsList Error" + error);
          return of(error);
          //return throwError(error);
        })
      );
  }
  apiAiqGetDocumentUrl(documentId: string, folderId: string, source: string) {
    let url_ = this.baseUrl + "/api/LoanDocuments/AIQ/{documentId}/{folderId}/{source}";
    if (documentId === undefined || documentId === null)
      throw new Error("The parameter 'documentId' must be defined.");
    url_ = url_.replace("{documentId}", encodeURIComponent("" + documentId));
    if (folderId !== null && folderId !== undefined)
      url_ = url_.replace("{folderId}", encodeURIComponent("" + folderId));
    if (source !== null && source !== undefined)
      url_ = url_.replace("{source}", encodeURIComponent("" + source));

    let options_: any = {
      headers: _headers
    };

    return this.http.get(url_, options_);

  }

}
