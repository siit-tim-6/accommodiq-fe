import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';
import { ReportCardDto } from './report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<ReportCardDto[]>(
      `${environment.apiHost}/reports`,
    );
  }
}
