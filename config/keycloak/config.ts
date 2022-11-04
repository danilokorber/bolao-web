import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';

export const KEYCLOAK_CONFIG_PROD: KeycloakConfig = {
  url: 'https://auth.easyware.io',
  realm: 'bolao',
  clientId: 'web',
};

export const KEYCLOAK_INIT_OPTIONS_PROD: KeycloakInitOptions = {
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.location.origin + '/assets/verify-sso.html',
  enableLogging: true,
};
