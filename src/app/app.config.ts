import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { NgHttpCachingConfig, provideNgHttpCaching } from 'ng-http-caching';

const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 1000 * 60 * 5, // cache expire after 5 minute
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideNgHttpCaching(ngHttpCachingConfig),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
};
