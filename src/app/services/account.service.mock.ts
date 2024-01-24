import {
  AccountDetails,
  AccountRole,
} from '../account/account-info/account.model';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const validAccountDetails: AccountDetails = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'email123@example.com',
  address: 'Address 123',
  phoneNumber: '123456789',
  role: AccountRole.HOST,
};

@Injectable()
class AccountServiceMock {
  getAccountDetails() {
    return of(validAccountDetails);
  }

  updateAccountDetails() {
    return of(validAccountDetails);
  }

  updatePassword() {
    return of({});
  }
}

export { validAccountDetails, AccountServiceMock };
