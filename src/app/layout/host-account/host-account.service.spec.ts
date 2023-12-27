import { TestBed } from '@angular/core/testing';

import { HostAccountService } from './host-account.service';

describe('HostAccountService', () => {
  let service: HostAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
