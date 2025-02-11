import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
  appInsights: ApplicationInsights;
    constructor() {
      this.appInsights = new ApplicationInsights({
        config: {
          connectionString: environment.appInsights.connectionString,
          enableAutoRouteTracking: true // option to log all route changes
        }
      });
      this.appInsights.loadAppInsights();
    }

    logError(message: string, stack?: string) {
        //debugger;
        // Send errors to server here
        let errMsg = `${message}\n${stack}`;
        console.error(errMsg);
        this.appInsights.trackException({ error: new Error(errMsg) });
    }

    logPageView(name?: string, url?: string) { // option to call manually
      this.appInsights.trackPageView({
        name: name,
        uri: url
      });
    }

    logEvent(name: string, properties?: { [key: string]: any }) {
      this.appInsights.trackEvent({ name: name}, properties);
    }

    logMetric(name: string, average: number, properties?: { [key: string]: any }) {
      this.appInsights.trackMetric({ name: name, average: average }, properties);
    }

    logException(exception: Error, severityLevel?: number) {
      console.error(exception);
      this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
    }

    logTrace(message: string, properties?: { [key: string]: any }) {
      console.log(message);
      this.appInsights.trackTrace({ message: message}, properties);
    }

    logInfo(info: any, properties?: { [key: string]: any }) {
      console.log(info);
      this.appInsights.trackTrace({ message: info}, properties);
    }
}
