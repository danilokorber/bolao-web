// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {
  KEYCLOAK_INIT_OPTIONS_PROD,
  KEYCLOAK_CONFIG_PROD,
} from 'config/keycloak/config';

export const environment = {
  production: false,
  configs: {
    keycloak: {
      config: KEYCLOAK_CONFIG_PROD,
      initOptions: KEYCLOAK_INIT_OPTIONS_PROD,
      enableBearerInterceptor: false,
      bearerExcludedUrls: [],
      authorizationHeaderName: 'Authorization',
      bearerPrefix: 'Bearer',
      loadUserProfileAtStartUp: true,
    },
    paypal: {
      clientId:
        'AbfJHaE0lVMMjIDK_YsGwlquIYrshcKBLW6Sx3kyoMBACUQqY5YA1wllylOduO63pozwXPf7Uce3lP5V',
    },
    api: {
      baseUrl: '/api/v1',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
