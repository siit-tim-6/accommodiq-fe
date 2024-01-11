import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewBaseInfo, ReviewRequest } from '../review.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css',
})
export class ReviewListComponent {
  @Input()
  reviews: ReviewBaseInfo[] = [];
  @Input()
  canAddReview: boolean = true;
  @Input() canReport: boolean = true;
  @Output() reviewSubmitted: EventEmitter<ReviewRequest> =
    new EventEmitter<ReviewRequest>();
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter<number>();
  @Output() reportRequest: EventEmitter<number> = new EventEmitter<number>();

  handleReviewSubmission(review: ReviewRequest) {
    this.reviewSubmitted.emit(review);
  }

  handleDeleteReview(reviewId: number) {
    this.deleteRequest.emit(reviewId);
  }

  handleReportReview(reviewId: number) {
    this.reportRequest.emit(reviewId);
  }
}
