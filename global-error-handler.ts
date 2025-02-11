import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from './services/logging.service';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector,
    private loggingService: LoggingService) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    logger.logException(error);

    let message;
    let stackTrace: string = '';
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      //notifier.showError(message);
      errorService.displayError(message);
    } else {
      // Client Error     
      message = errorService.getClientErrorMessage(error);      
      if (!message.includes("NG04002"))
        notifier.showError(message);
    }
    // Always log errors
    logger.logError(message, stackTrace);
    //console.error(error);
  }
}
