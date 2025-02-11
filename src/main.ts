/// <reference types="@angular/localize" />
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBseUrl(){
  return document.getElementsByTagName('base')[0].href;
}


const providers:any[] = [
  { provider: 'BASE_URL', useFactory: getBseUrl, deps: [] }
]

if(environment.prod) {
  //enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch((err:any) => console.error(err));
