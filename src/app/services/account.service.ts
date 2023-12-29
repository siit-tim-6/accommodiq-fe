import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AccountDetails,
  PasswordChangeRequest,
} from '../layout/account-info/account.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccountDetails(): Observable<AccountDetails> {
    return this.httpClient.get<AccountDetails>(
      `${environment.apiHost}users/me`,
    );
  }

  updateAccountDetails(
    accountDetails: AccountDetails,
  ): Observable<AccountDetails> {
    return this.httpClient.put<AccountDetails>(
      `${environment.apiHost}users`,
      accountDetails,
    );
  }

  deleteAccount(): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiHost}users`);
  }

  updatePassword(passwordDto: PasswordChangeRequest): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.apiHost}users/password`,
      passwordDto,
    );
  }

  getAccountDetailsById(accountId: number): Observable<AccountDetails> {
    return this.httpClient.get<AccountDetails>(
      `${environment.apiHost}users/${accountId}/profile`,
    );
  }
}
