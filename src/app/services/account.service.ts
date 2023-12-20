import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../layout/account-info/account.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccountDetails(): Observable<AccountDetails> {
    return this.httpClient.get<AccountDetails>(
      `${environment.apiHost}users/personal`,
    );
  }
}
