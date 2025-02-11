import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessage: string = '';
  isErrorMsgVisible = false;

  getClientErrorMessage(error: Error): string {
    return error.message ?
           error.message :
           error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?
           error.message :
           'No Internet Connection';
  }

  displayError(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.isErrorMsgVisible = true;
  }

  hideError() {
    this.errorMessage = '';
    this.isErrorMsgVisible = false;
  }
}
