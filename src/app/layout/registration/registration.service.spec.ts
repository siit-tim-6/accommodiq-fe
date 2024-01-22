import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { accountMock1 } from '../../mocks/registration.service.mock';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RegistrationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new account', () => {
    service.registerUser(accountMock1).subscribe((account) => {
      expect(account).toEqual(accountMock1);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:8000/users',
    });
    req.flush(accountMock1);
  });
});
