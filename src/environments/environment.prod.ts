import {
  KEYCLOAK_INIT_OPTIONS_PROD,
  KEYCLOAK_CONFIG_PROD,
} from 'config/keycloak/config';

export const environment = {
  name: '',
  production: true,
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
        'AQH-zejMicjRKv3FVoo_SM7ww8LZyB-RzaZsdRfJ9Dy8Ye3XppbYHGExhex9a4kbLYidVUFmqYjy-5fb',
    },
    api: {
      baseUrl: '/api/v1',
    },
  },
};
