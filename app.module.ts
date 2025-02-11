import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { MSAL_INSTANCE, MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { BrowserCacheLocation, IPublicClientApplication, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { CdkColumnDef, CdkTableModule } from '@angular/cdk/table';
import {MatGridListModule} from '@angular/material/grid-list';



import { AccountComponent } from './components/account/account.component';
import { ContactComponent } from './components/contact/contact.component';
import { ActivityComponent } from './components/activity/activity.component';
import { RouterModule } from '@angular/router';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { GridLayoutModule, LayoutModule, TabStripModule } from '@progress/kendo-angular-layout';
import { SparklineModule } from '@progress/kendo-angular-charts';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { MatInputModule } from '@angular/material/input';




import { RatingComponent } from './components/home/rating.component';
import { GlobalErrorHandler } from './global-error-handler';
import { ServerErrorInterceptor } from './server-error.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoanDocumentsComponent } from './components/loan-documents/loan-documents.component';
import { LoanInformationComponent } from './components/loan-information/loan-information.component';
import { NotesDisplayComponent } from './components/notes-display/notes-display.component';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { StopsFlagsComponent } from './components/stops-flags/stops-flags.component';
import { LoanSummaryComponent } from './components/loan-summary/loan-summary.component';
import { FCBKLossMitComponent } from './components/fcbkloss-mit/fcbkloss-mit.component';
import { TransactionsDisplayComponent } from './components/transactions-display/transactions-display.component';
import { PayOffEstimateComponent } from './components/pay-off-estimate/pay-off-estimate.component';
import { PropertyInfoComponent } from './components/property-info/property-info.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { BorrowerInfoDisplayComponent } from './components/borrower-info-display/borrower-info-display.component';
import { LoanDisplayComponent } from './components/loan-display/loan-display.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { LoanSearchComponent } from './components/loan-search/loan-search.component';
import { AppConfiguration } from 'read-appsettings-json';
import { SbxApiSettings_BaseAddress, SbxApiClient } from './services/SbxApiService';
import { BreadCrumbModule } from '@progress/kendo-angular-navigation';
import { BorrowerCreditInformationComponent } from './components/borrower-credit-information/borrower-credit-information.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EdituserComponent } from './components/admin/edituser/edituser.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AdminComponent } from './components/admin/admin.component';
import { LoaderComponent } from './container/loader/loader.component';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ContactComponent,
    ActivityComponent,
    ThemeSwitchComponent,
    HomeComponent,
    RatingComponent,
    LoanDocumentsComponent,
    LoanInformationComponent,
    NotesDisplayComponent,
    StopsFlagsComponent,
    LoanSummaryComponent,
    FCBKLossMitComponent,
    TransactionsDisplayComponent,
    PayOffEstimateComponent,
    PropertyInfoComponent,
    PaymentInfoComponent,
    BorrowerInfoDisplayComponent,
    LoanDisplayComponent,
    LoanSearchComponent,
    SideNavComponent,
    HeaderComponent,
    BorrowerCreditInformationComponent,
    ErrorDisplayComponent,
    AdminComponent,
    EdituserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    GridModule,
    PDFModule,
    ExcelModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonsModule,
    IconsModule,
    LayoutModule,
    SparklineModule,
    MatDialogModule,
    DropDownsModule,
    WindowModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    BreadCrumbModule,
    TabStripModule,
    FontAwesomeModule,
    GridModule,
    MatExpansionModule,
    MatGridListModule,
    CdkTableModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.msalConfig.auth.clientId, // Application (client) ID from the app registration
          redirectUri: environment.msalConfig.auth.redirectUrl, // This is your redirect URI
          authority: environment.msalConfig.auth.authority, // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['User.Read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map(
          [
            ['https://graph.microsoft.com/v1.0/me', ['User.Read']],
            //['https://cwsbxapp01uv:8086/',['60e4aa16-473f-4938-977c-e744fdad634e/Users.Read']]
            //['https://localhost:7018/',['60e4aa16-473f-4938-977c-e744fdad634e/Users.Read']]
            [environment.msalConfig.auth.SbxApiUrl,['60e4aa16-473f-4938-977c-e744fdad634e/Users.Read']]
          ]
        ),
      }

    ),
  ],
  providers: [
    {
      provide: SbxApiSettings_BaseAddress,
      useValue: AppConfiguration.Setting().SbxApiSettings.BaseAddress
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass: LoadingInterceptor, multi: true
    // },
    CdkColumnDef,
    MsalGuard,
    SbxApiClient,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
