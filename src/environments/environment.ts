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
