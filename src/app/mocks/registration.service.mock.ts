import { Account } from '../layout/registration/registration.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export const accountMock1: Account = {
  email: 'joe.doe@example.com',
  password: 'password',
  role: 'HOST',
  user: {
    firstName: 'Joe',
    lastName: 'Doe',
    address: 'Some address',
    phoneNumber: '123456789',
  },
};

export const accountMock3: Account = {
  email: 'guest.bj@example.com',
  password: 'password',
  role: 'GUEST',
  user: {
    firstName: 'Guest',
    lastName: 'BJ',
    address: 'Some address',
    phoneNumber: '123456789',
  },
};

@Injectable()
export class RegistrationServiceMock {
  constructor() {}
  registerUser(account: Account): Observable<Account> {
    return of(account);
  }
}
