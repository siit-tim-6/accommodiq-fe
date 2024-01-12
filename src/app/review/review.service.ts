import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ReviewApprovalCardDto,
  ReviewDto,
  ReviewRequest,
  ReviewStatus,
} from './review.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageDto } from '../accommodation/accommodation.model';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private httpClient: HttpClient) {}

  getHostReviews(hostId: number): Observable<ReviewDto[]> {
    return this.httpClient.get<ReviewDto[]>(
      `${environment.apiHost}hosts/${hostId}/reviews`,
    );
  }

  addHostReview(
    hostId: number,
    reviewData: ReviewRequest,
  ): Observable<ReviewDto> {
    return this.httpClient.post<ReviewDto>(
      `${environment.apiHost}hosts/${hostId}/reviews`,
      reviewData,
    );
  }

  deleteReview(reviewId: number): Observable<MessageDto> {
    return this.httpClient.delete<MessageDto>(
      `${environment.apiHost}reviews/${reviewId}`,
    );
  }

  reportReview(reviewId: number): Observable<MessageDto> {
    return this.httpClient.put<MessageDto>(
      `${environment.apiHost}reviews/${reviewId}/report`,
      {},
    );
  }

  addAccommodationReview(
    accommodationId: number,
    review: ReviewRequest,
  ): Observable<ReviewDto> {
    return this.httpClient.post<ReviewDto>(
      `${environment.apiHost}accommodations/${accommodationId}/reviews`,
      review,
    );
  }

  changeAccommodationReviewStatus(
    reviewId: number,
    status: ReviewStatus,
  ): Observable<MessageDto> {
    return this.httpClient.put<MessageDto>(
      `${environment.apiHost}accommodations/reviews/${reviewId}/status`,
      { status },
    );
  }

  getReviewsByStatus(
    status: ReviewStatus,
  ): Observable<ReviewApprovalCardDto[]> {
    const params = new HttpParams().set('status', status);
    return this.httpClient.get<ReviewApprovalCardDto[]>(
      `${environment.apiHost}accommodations/reviews`,
      { params },
    );
  }
}
