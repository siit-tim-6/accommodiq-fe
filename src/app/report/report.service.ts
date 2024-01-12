import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';
import { ReportCardDto } from './report.model';
import { MessageDto } from '../accommodation/accommodation.model';
import { AccountStatus } from '../account/account-info/account.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<ReportCardDto[]>(
      `${environment.apiHost}reports`,
    );
  }

  deleteReport(id: number) {
    return this.httpClient.delete<MessageDto>(
      `${environment.apiHost}reports/${id}`,
    );
  }

  changeUserStatus(id: number, status: AccountStatus) {
    return this.httpClient.put<MessageDto>(
      `${environment.apiHost}reports/users/${id}/status`,
      { status: status },
    );
  }
}
