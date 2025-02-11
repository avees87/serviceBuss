import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { SbxApiClient } from './SbxApiService';
import { environment } from 'src/environments/environment';


export const SbxApiSettings_BaseAddress = new InjectionToken<string>('SbxApiSettings.BaseAddress');

const _headers = new HttpHeaders()
  .set('content-type', 'application/json; charset=utf-8')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http: HttpClient;
  private baseUrl: string;
  private graphUserApi: string = environment.graphUserApi;
  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(SbxApiSettings_BaseAddress) baseUrl?: string) {
    this.http = http;
    this.baseUrl = SbxApiClient.GetValidBaseUrl(baseUrl);
  }
  graphSearchUser(email?: any,) {
    let url_ = `${this.graphUserApi}/api/user/GetGraphUserByWorkEmail/${email}`;
    return this.http.get(url_, {headers:_headers});
  }

  fetchDropdownValues(){
    // let url_ = this.baseUrl + `/api/UserAdmin/GetFromDbEmail/${email}`;
    let url_ = this.baseUrl + `/api/UserAdmin/GetDropDownValues`;
    return this.http.get(url_, {headers: _headers});
  }

  getUserDetailsByEmail(email:any, onlyActive:boolean = false){
    let url_ = this.baseUrl + `/api/UserAdmin/GetFromDbEmail/${email}/${onlyActive}`;
    return this.http.get(url_, {headers: _headers})
  }

  cloneUser(item:any){
    let url_ = this.baseUrl + `/api/UserAdmin/CloneUser`;
    const body=item;
    return this.http.post(url_, body, {headers: _headers})
  }

  accessAdminUI(){
    let url_ = this.baseUrl + `/api/UserAdmin/CanAccessAdminUi`;
    // let url_ = `https://localhost:7018/api/UserAdmin/CanAccessAdminUi`;
    return this.http.get(url_, {headers: _headers})
  }

  userEmailExists(email:any){
    let url_ = this.baseUrl + `/api/UserAdmin/UserEmailExists?email=${email}`;
    return this.http.get(url_);
  }

  addUser(userInfo:any){
    userInfo.createdDate = new Date(userInfo.createdDate);
    userInfo.modifiedDate = new Date(userInfo.modifiedDate);
    const body = {"userInfo":userInfo};
    let url_ = this.baseUrl + `/api/UserAdmin/AddUser`;
    return this.http.post(url_, body, {headers: _headers})
  }
  updateUser(userInfo:any){
    const body = userInfo;
    let url_ = this.baseUrl + `/api/UserAdmin/UpdateUser`;
    return this.http.put(url_, body, {headers: _headers})
  }
  deletUser(userId:any){
    let url_ = this.baseUrl + `/api/UserAdmin/DeleteUser/${userId}`;
    return this.http.delete(url_,{headers: _headers})
  }
}
