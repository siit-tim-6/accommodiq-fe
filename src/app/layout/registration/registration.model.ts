export interface Account {
  id: number;
  email: string;
  password: string;
  role: string;
  user: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

export enum AccountRole {
  roleGuest = 'GUEST',
  roleHost = 'HOST',
}
