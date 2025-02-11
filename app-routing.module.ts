import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { ActivityComponent } from './components/activity/activity.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MsalGuard } from "@azure/msal-angular";
import { LoanDocumentsComponent } from './components/loan-documents/loan-documents.component';
import { LoanInformationComponent } from './components/loan-information/loan-information.component';
import { NotesDisplayComponent } from './components/notes-display/notes-display.component';
import { LoanSearchComponent } from './components/loan-search/loan-search.component';
import { AssetResearchComponent } from './components/asset-research/asset-research.component';
import { BrowserUtils } from '@azure/msal-browser';
import { BorrowerCreditInformationComponent } from './components/borrower-credit-information/borrower-credit-information.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: 'ErrorPage',
    component: ErrorDisplayComponent   
  },
  {
    path: 'CreditInformation',
    component: BorrowerCreditInformationComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'Notes',
    component: NotesDisplayComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'LoanSearch',
    component: LoanSearchComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'AssetResearch',
    component: AssetResearchComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'LoanInformation',
    component: LoanInformationComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'LoanDocuments',
    component: LoanDocumentsComponent,
    canActivate: [MsalGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [MsalGuard],
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [MsalGuard],
    pathMatch: 'full'
  },
];


const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled", // Set to enabledBlocking to use Angular Universal
      onSameUrlNavigation: 'reload',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }
