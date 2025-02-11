import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { SearchResult } from '../models/searchresult';
import { catchError, map, of } from 'rxjs';
import { AppConfiguration } from "read-appsettings-json";
import { SbxApiClient } from './SbxApiService';
import { NotesEntityVm } from '../models/notesentityvm';
import { UserNotesVm } from '../models/usernotesvm';
import { LoanNoteCommandVm } from '../models/loannotecommandvm';

export const SbxApiSettings_BaseAddress = new InjectionToken<string>('SbxApiSettings.BaseAddress');

const _headers = new HttpHeaders()
  .set('content-type', 'application/json; charset=utf-8')
  .set('Access-Control-Allow-Origin', '*');


@Injectable({
  providedIn: 'root'
})
export class AssetResearchService {
  private http: HttpClient;
  private baseUrl: string;
  
  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(SbxApiSettings_BaseAddress) baseUrl?: string) {
    this.http = http;
    this.baseUrl = SbxApiClient.GetValidBaseUrl(baseUrl);
  }

  apiGetSearchResults(searchText: string, userName: string,) {
    let url_ = this.baseUrl + "/api/Search/SearchResults/{searchText}/{userName}";
    if (searchText === undefined || searchText === null)
      throw new Error("The parameter 'searchText' must be defined.");
    url_ = url_.replace("{searchText}", encodeURIComponent("" + searchText));
    if (userName !== null && userName !== undefined)
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));

    let options_: any = {
      headers: _headers
    };    
    return this.http.get(url_, options_)
    .pipe(
      map(
        (response: any) =>
          <SearchResult><unknown>{          
            data: response
          }
      ),
      catchError(error => {
        console.log("SearchResult Error" + error);
        return of(error);   
      })
    );
  }


  apiGetAllNotesByLoanNumberResult(loanNumber: string, userName: string) {
    let url_ = this.baseUrl + "/api/Notes/NotesDisplay/{loanNumber}/{userName}";
    if (loanNumber === undefined || loanNumber === null)
      throw new Error("The parameter 'loanNumber' must be defined.");

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
          <NotesEntityVm><unknown>{          
            data: response
          }
      ),
      catchError(error => {
        console.log("apiGetAllNotesByLoanNumberResult Error" + error);
        return of(error);   
      })
    );
  }



  apiGetUserLoanNoteResult() {
    let url_ = this.baseUrl + "/api/Notes/UserLoanNote";
    let options_: any = {
      headers: _headers
    };    
    return this.http.get(url_,options_)
    .pipe(
      map(
        (response: any) =>
          <UserNotesVm><unknown>{          
            data: response
          }
      ),
      catchError(error => {
        console.log("apiGetUserLoanNoteesult Error" + error);
        return of(error);   
      })
    );
  }



  apiAddUserLoanNote(loanNoteCommandVm:LoanNoteCommandVm) {
    let url_ = this.baseUrl + "/api/Notes/AddUserLoanNote";
    let options_: any = {
      headers: _headers
    };
    const body=JSON.stringify(loanNoteCommandVm);  
    return this.http.post(url_,body,options_)
    .pipe(      
      catchError(error => {
        console.log("apiAddUserLoanNote Error" + error);
        return of(error);   
      })
    );
  }
}
