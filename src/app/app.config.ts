import { provideRouter } from '@angular/router';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { PoHttpRequestModule } from '@po-ui/ng-components';
import { routes } from './pages/app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([PoHttpRequestModule]),
  ],

};
