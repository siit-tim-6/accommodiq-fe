import { Component, OnInit } from '@angular/core';
import { ReviewApprovalCardDto, ReviewStatus } from '../review.model';
import { ReviewService } from '../review.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-review-approval-list',
  templateUrl: './review-approval-list.component.html',
  styleUrl: './review-approval-list.component.css',
})
export class ReviewApprovalListComponent implements OnInit {
  pendingReviews: ReviewApprovalCardDto[] = [];
  reportedReviews: ReviewApprovalCardDto[] = [];
  isPendingShowed: boolean = true;
  reviewsToShow = this.pendingReviews;

  constructor(
    private reviewService: ReviewService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.reviewService.getReviewsByStatus(ReviewStatus.PENDING).subscribe({
      next: (reviews) => {
        this.pendingReviews = reviews;
        this.refreshReviewsToShow();
      },
    });

    this.reviewService.getReviewsByStatus(ReviewStatus.REPORTED).subscribe({
      next: (reviews) => {
        this.reportedReviews = reviews;
        this.refreshReviewsToShow();
      },
    });
  }

  approveReview($event: ReviewApprovalCardDto) {
    this.reviewService
      .changeAccommodationReviewStatus($event.review.id, ReviewStatus.ACCEPTED)
      .subscribe({
        next: () => {
          this.pendingReviews = this.pendingReviews.filter(
            (r) => r.review.id !== $event.review.id,
          );

          this.reportedReviews = this.pendingReviews.filter(
            (r) => r.review.id !== $event.review.id,
          );

          this.refreshReviewsToShow();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error while approving review',
          });
        },
      });
  }

  declineOrDeleteReview($event: ReviewApprovalCardDto) {
    if ($event.review.status === ReviewStatus.REPORTED) {
      this.reviewService.deleteReview($event.review.id).subscribe({
        next: () => {
          this.reportedReviews = this.reportedReviews.filter(
            (r) => r.review.id !== $event.review.id,
          );
          this.refreshReviewsToShow();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error while deleting review',
          });
        },
      });
    } else {
      this.reviewService
        .changeAccommodationReviewStatus(
          $event.review.id,
          ReviewStatus.DECLINED,
        )
        .subscribe({
          next: () => {
            this.pendingReviews = this.pendingReviews.filter(
              (r) => r.review.id !== $event.review.id,
            );

            this.refreshReviewsToShow();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error while declining review',
            });
          },
        });
    }
  }

  refreshReviewsToShow() {
    this.reviewsToShow = this.isPendingShowed
      ? this.pendingReviews
      : this.reportedReviews;
  }
}
