import {
  KEYCLOAK_INIT_OPTIONS_PROD,
  KEYCLOAK_CONFIG_PROD,
} from 'config/keycloak/config';

export const environment = {
  production: true,
  configs: {
    keycloak: {
      config: KEYCLOAK_CONFIG_PROD,
      initOptions: KEYCLOAK_INIT_OPTIONS_PROD,
    },
    paypal: {
      clientId:
        'AQH-zejMicjRKv3FVoo_SM7ww8LZyB-RzaZsdRfJ9Dy8Ye3XppbYHGExhex9a4kbLYidVUFmqYjy-5fb',
    },
  },
};
