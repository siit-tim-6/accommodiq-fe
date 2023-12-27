import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HostAccountDetails } from '../account-info/account.model';
import { HostReviewDto } from './host-account.model';
import { environment } from '../../../env/env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HostAccountService {
  constructor(private httpClient: HttpClient) {}

  getHostDetails(accountId: number): Observable<HostAccountDetails> {
    // Replace with actual HTTP call to fetch host details
    return of({
      // Mocked data
      firstName: 'Teo',
      lastName: 'Vid',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, City, State, 12345',
      role: 'Host',
      rating: 3.5,
      reviewCount: 123,
      // ...other required properties
    });
  }

  getHostReviews(hostId: number): Observable<HostReviewDto[]> {
    return this.httpClient.get<HostReviewDto[]>(
      `${environment.apiHost}/hosts/${hostId}/reviews`,
    );
  }
}
