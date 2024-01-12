import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(`${environment.apiHost}/reports`);
  }
}
