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
}

export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
}

export interface AccountInfoDetails extends AccountDetails {
  role: 'GUEST' | 'HOST';
}

export interface HostAccountDetails extends AccountInfoDetails {
  rating: number;
  reviewCount: number;
}

export interface GuestAccountDetails extends AccountInfoDetails {
  //IF NEEDED FOR GUEST ACCOUNT
}
