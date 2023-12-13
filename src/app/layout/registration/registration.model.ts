export interface Account {
  email: string;
  password: string;
  role: string;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}
