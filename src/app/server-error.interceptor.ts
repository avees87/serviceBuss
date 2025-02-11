import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './components/services/notification.service';
import { ErrorService } from './components/services/error.service';
import { LoggingService } from './components/services/logging.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarService } from './components/services/snackbar.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private router: Router,
    private notifier : NotificationService,
    private loggingService : LoggingService,
    private errorSvc: ErrorService,
    private snackbarservice: SnackbarService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(request);
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.loggingService.logException(error);
        var errMsg = this.convertErrToSting(error);
        this.loggingService.logError(errMsg);
        errMsg = encodeURIComponent(errMsg);

        if(error.url?.split('/').includes('GetGraphUserByWorkEmail')){
          console.log(error.error);
          this.snackbarservice.error(this.convertErrToSting(error.error));
        }
        else if(error.url?.split('/').includes('UserAdmin')){
          console.log(error);
          this.snackbarservice.error(this.convertErrToSting(error));
        }
        else{
          switch (error?.status) {
            case 400: //{ //Unauthorized- Redirect to login
            case 401: //{ //Unauthorized- Redirect to login
            case 403: //{ //Forbidden- access to the requested resource is forbidden
            case 404: { //Unauthorized- Redirect to login
              let errorCode = error?.status.toString();
              this.loggingService.logInfo(`Interceptor got ${errorCode} error`);
              this.router.navigate(['ErrorPage'],{ queryParams: { errorCode: errorCode, errorMsg:  errMsg} });
            }
            return of();

            // case 401: { //Unauthorized- Redirect to login
            //   console.log(`Interceptor got 401 error`);
            //   console.log(error);
            //   this.router.navigate(['ErrorPage'],{ queryParams: { errorCode: '401' , errorMsg:  error.error.error} });
            // }
            // return of();

            // case 403: { //Forbidden- access to the requested resource is forbidden
            //   console.log(`Interceptor got 403 error`);
            //   console.log(error);
            //   this.router.navigate(['ErrorPage'],{ queryParams: { errorCode: '403' , errorMsg:  error.error.error} });
            // }
            // return of();

            // case 404: { //Unauthorized- Redirect to login
            //   console.log(`Interceptor got 404 error`);
            //   console.log(error);
            //   this.router.navigate(['ErrorPage'],{ queryParams: { errorCode: '404' , errorMsg:  error.error.error} });
            // }
            // return of();

            default: {
              // console.log(`Interceptor got ${error.status} error`);
              this.router.navigate(['ErrorPage'],{ queryParams: { errorCode: '500' , errorMsg:  errMsg} });
            }
            return of();
          }
        }
        return throwError(() => new Error(error.error ? error.error : error.message));
      })
    );
  }

  convertErrToSting(err: HttpErrorResponse): string {
    if (typeof err == 'string') {
      return this.formatErroMsg(err);
    }

    //If it's an Error Event, return the message
    if (err?.error instanceof ErrorEvent) {
      return this.formatErroMsg(err.error.message);
    }

    //If the error is a string, then return that
    if (typeof err?.error == 'string') {
      return this.formatErroMsg(err.error);
    }

    if (typeof err?.error?.error == 'string') {
       return this.formatErroMsg(err.error.error);
    }

    let msg = '';

    //Get all the errors from an error collection
    if (err?.error?.errors) {
      for (const key of Object.keys(err?.error?.errors)) {
        const value = err?.error?.errors[key];
        if (Array.isArray(value)) {
          value.forEach(function (item) {
            msg = `${msg} ${item ?? key},`;
          });
        } else {
          // formData.append(key, value);
        }
      }
    }

    //If no error was found, then return a standard message.
    if (msg == '') {
      msg = `Unexpected error. Please try again. ${JSON.stringify(err?.error)}`;
    }

    //return this.formatErroMsg(msg);
    return msg;
  }

  private formatErroMsg(errMsg: string): string {
    //let formatMsg = errMsg.replace('\\r\\n', '<br/>');
    //formatMsg = errMsg.replace('\\n', '<br/>');
    //return formatMsg;
    return errMsg;
  }
}
