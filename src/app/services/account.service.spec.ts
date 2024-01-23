import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService],
    });

    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
