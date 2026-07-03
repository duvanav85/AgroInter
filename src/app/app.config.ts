import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { HttpClient,  provideHttpClient, withInterceptorsFromDi, } from '@angular/common/http';
import { routes } from './app.routes';
import { provideRouter, withInMemoryScrolling, withComponentInputBinding } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';
// material module not used in this config
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),
    //provideRouter(routes), provideClientHydration(withEventReplay()),
     provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      NgScrollbarModule,
    ),

  ]
};
