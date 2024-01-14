import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialReportEntry } from './financial-report.model';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class FinancialReportService {
  constructor(private httpClient: HttpClient) {}

  getAllEntries(
    fromDate: number,
    toDate: number,
  ): Observable<FinancialReportEntry[]> {
    let queryParams = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    return this.httpClient.get<FinancialReportEntry[]>(
      `
    ${environment.apiHost}hosts/financial-report`,
      { params: queryParams },
    );
  }
}
