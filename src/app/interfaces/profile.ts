export interface Profile {
  attributes: ProfileAttributes;
  createdTimestamp: number;
  email: string;
  emailVerified: boolean;
  enabled: boolean;
  federatedIdentities: ProfileFederatedIdentity[];
  firstName?: string;
  id: string;
  lastName?: string;
  totp?: boolean;
  username?: string;
  picture?: string;
}

export interface ProfileAttributes {
  country: string[];
  data_privacy_accepted_on: Date[];
  first: string[];
  second: string[];
  third: string[];
  fourth: string[];
  locale: string[];
  payment_on: Date[];
  picture: string[];
  rules_accepted_on: Date[];
}

export interface ProfileFederatedIdentity {
  identityProvider: string;
  userId: string;
  userName: string;
}
