import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
const providers = [
  // { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'BASE_URL', useValue: environment.baseUrl, deps: [] },
  {
    provide: 'SNACK_BAR_OPTIONS',
    useValue: {
      duration: 2500,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    }
  },
  {
    provide: 'DIALOG_OPTIONS',
    useValue: {
      // hasBackdrop: false,
      width: '80%'
    }
  }
];
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
