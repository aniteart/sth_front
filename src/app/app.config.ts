import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// 1. Importe o provideAnimations
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { PoHttpRequestModule } from '@po-ui/ng-components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(PoHttpRequestModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations()
  ],
};
