import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// 1. Importe o provideAnimations
import { provideAnimations } from '@angular/platform-browser/animations';
import { PoHttpRequestModule } from '@po-ui/ng-components';
import { routes } from './pages/app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(PoHttpRequestModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations()
  ],
};
