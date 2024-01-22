import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { accountDetails } from './account.service.mock';
import { environment } from '../../env/env';
import {
  AccountDetails,
  AccountRole,
} from '../account/account-info/account.model';

describe('AccountService', () => {
  let service: AccountService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AccountService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAccountDetails and return account details', () => {
    // Act
    service.getAccountDetails().subscribe((res) => {
      // Assert
      expect(res).toEqual(accountDetails);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiHost}users/me`,
    });

    req.flush(accountDetails);
  });

  it('should call updateAccountDetails and return account details', () => {
    // Arrange
    const updatedAccountDetails: AccountDetails = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email123@example.com',
      address: 'Address 123',
      phoneNumber: '123456789',
      role: AccountRole.HOST,
    };

    service.updateAccountDetails(accountDetails).subscribe((res) => {
      // Assert
      expect(res).toEqual(updatedAccountDetails);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${environment.apiHost}users`,
    });

    req.flush(updatedAccountDetails);
  });

  it('should call deleteAccount and return account details', () => {
    // Act
    service.deleteAccount().subscribe((res) => {
      // Assert
      expect(res).toEqual(accountDetails);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${environment.apiHost}users`,
    });

    req.flush(accountDetails);
  });
});
