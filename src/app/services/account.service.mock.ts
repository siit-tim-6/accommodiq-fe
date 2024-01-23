import {
  AccountDetails,
  AccountRole,
} from '../account/account-info/account.model';

const validAccountDetails: AccountDetails = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'email123@example.com',
  address: 'Address 123',
  phoneNumber: '123456789',
  role: AccountRole.HOST,
};

export { validAccountDetails };
