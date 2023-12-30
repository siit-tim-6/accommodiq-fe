import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ReviewDto,
  ReviewRequest,
  ReviewStatus,
  ReviewStatusDto,
} from '../layout/profile-account/review.model';
import { HttpClient } from '@angular/common/http';
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
    const reviewStatusDto: ReviewStatusDto = {
      status: ReviewStatus.REPORTED,
    };
    return this.httpClient.put<MessageDto>(
      `${environment.apiHost}reviews/${reviewId}/status`,
      reviewStatusDto,
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
}