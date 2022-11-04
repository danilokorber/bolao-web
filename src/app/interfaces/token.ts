export interface RealmAccess {
  roles: string[];
}

export interface RealmManagement {
  roles: string[];
}

export interface Account {
  roles: string[];
}

export interface ResourceAccess {
  'realm-management': RealmManagement;
  account: Account;
}

export interface Address {}

export interface Token {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  session_state: string;
  'allowed-origins': string[];
  realm_access: RealmAccess;
  resource_access: ResourceAccess;
  scope: string;
  sid: string;
  upn: string;
  email_verified: boolean;
  address: Address;
  name: string;
  groups: string[];
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
}
