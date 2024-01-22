import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AccountDetails,
  PasswordChangeRequest,
} from '../account/account-info/account.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';
import { MessageDto } from '../accommodation/accommodation.model';
import { ReportRequestDto } from '../layout/report-form/report.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccountDetails(): Observable<AccountDetails> {
    // test
    return this.httpClient.get<AccountDetails>(
      `${environment.apiHost}users/me`,
    );
  }

  updateAccountDetails(
    // test
    accountDetails: AccountDetails,
  ): Observable<AccountDetails> {
    return this.httpClient.put<AccountDetails>(
      `${environment.apiHost}users`,
      accountDetails,
    );
  }

  deleteAccount(): Observable<any> {
    // test
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

  reportUser(
    accountId: number,
    reportRequest: ReportRequestDto,
  ): Observable<MessageDto> {
    return this.httpClient.post<any>(
      `${environment.apiHost}users/${accountId}/reports`,
      reportRequest,
    );
  }
}
