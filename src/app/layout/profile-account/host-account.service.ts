import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HostReviewDto, HostReviewRequest } from './host-account.model';
import { environment } from '../../../env/env';
import { HttpClient } from '@angular/common/http';
import { MessageDto } from '../../accommodation/accommodation.model';

@Injectable({
  providedIn: 'root',
})
export class HostAccountService {
  constructor(private httpClient: HttpClient) {}

  getHostReviews(hostId: number): Observable<HostReviewDto[]> {
    return of(this.mockReviews);
    // return this.httpClient.get<HostReviewDto[]>(
    //   `${environment.apiHost}/hosts/${hostId}/reviews`,
    // );
  }

  addHostReview(
    hostId: number,
    reviewData: HostReviewRequest,
  ): Observable<HostReviewDto> {
    return of(this.mockReviews[0]);
    // return this.httpClient.post<HostReviewDto>(
    //   `${environment.apiHost}/hosts/${hostId}/reviews`,
    //   reviewData,
    // );
  }

  private mockReviews: HostReviewDto[] = [
    {
      id: 1,
      rating: 4,
      comment: 'Great host!',
      date: new Date().getTime(),
      author: 'Guest123',
      canDelete: true,
    },
    {
      id: 2,
      rating: 5,
      comment: 'Had a wonderful stay!',
      date: new Date().getTime(),
      author: 'Guest456',
      canDelete: false,
    },
    // ... more mock reviews
  ];

  deleteHostReview(reviewId: number): Observable<MessageDto> {
    return of({ message: 'Review deleted successfully' });
    //return this.httpClient.delete<MessageDto>(`${environment.apiHost}/reviews/${reviewId}`);
  }
}
