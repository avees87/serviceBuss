import { AccountComponent } from "./components/account/account.component";
import { ActivityComponent } from "./components/activity/activity.component";
import { ContactComponent } from "./components/contact/contact.component";
import { LoanDocumentsComponent } from "./components/loan-documents/loan-documents.component";
import { LoanInformationComponent } from "./components/loan-information/loan-information.component";
import { NotesDisplayComponent } from "./components/notes-display/notes-display.component";

export const routes =  [
  { path: '', component: AccountComponent, label:'home' },
  // { path: 'accounts', component: AccountComponent, label:'accounts' },
  // { path: 'contacts', component: ContactComponent, label:'contacts' },
  // { path: 'activities', component: ActivityComponent, label:'activities' },
  { path: 'LoanInformation', component: ActivityComponent, label:'Asset Research', child:[
      {path: 'LoanInformation', component: LoanInformationComponent, label: 'loaninfo'},
      {path: 'LoanDocuments', component: LoanDocumentsComponent, label: 'loandoc'},
      {path: 'LoanNotes', component: NotesDisplayComponent, label: 'loandoc'}
    ] 
  },
  
 ];
