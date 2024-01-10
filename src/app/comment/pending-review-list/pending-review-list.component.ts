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
  reviews: PendingReviewDto[] = [];

  constructor(
    private reviewService: ReviewService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.reviewService.getPendingReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
    });
  }

  approveReview($event: PendingReviewDto) {
    this.reviewService
      .changeAccommodationReviewStatus($event.review.id, ReviewStatus.ACCEPTED)
      .subscribe({
        next: () => {
          this.reviews = this.reviews.filter(
            (r) => r.review.id !== $event.review.id,
          );
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

  declineReview($event: PendingReviewDto) {
    this.reviewService
      .changeAccommodationReviewStatus($event.review.id, ReviewStatus.DECLINED)
      .subscribe({
        next: () => {
          this.reviews = this.reviews.filter(
            (r) => r.review.id !== $event.review.id,
          );
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
