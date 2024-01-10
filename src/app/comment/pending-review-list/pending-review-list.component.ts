import { Component, OnInit } from '@angular/core';
import { PendingReviewDto, ReviewStatus } from '../review.model';
import { ReviewService } from '../review.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pending-review-list',
  templateUrl: './pending-review-list.component.html',
  styleUrl: './pending-review-list.component.css',
})
export class PendingReviewListComponent implements OnInit {
  pendingReviews: PendingReviewDto[] = [];
  reportedReviews: PendingReviewDto[] = [];
  isPendingShowed: boolean = true;
  reviewsToShow = this.pendingReviews;

  constructor(
    private reviewService: ReviewService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.reviewService.getPendingReviews().subscribe({
      next: (reviews) => {
        this.pendingReviews = reviews;
        this.refreshReviewsToShow();
      },
    });

    this.reviewService.getReportedReviews().subscribe({
      next: (reviews) => {
        this.reportedReviews = reviews;
      },
    });
  }

  approveReview($event: PendingReviewDto) {
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

  declineOrDeleteReview($event: PendingReviewDto) {
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
