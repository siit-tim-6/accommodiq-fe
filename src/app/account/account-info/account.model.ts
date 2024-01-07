export enum AccountRole {
  HOST = 'HOST',
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
}

export interface AccountDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: AccountRole;
}

export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
}
