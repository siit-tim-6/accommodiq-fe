import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { HostReviewApprovalCardDto, ReviewStatus } from '../review.model';

@Component({
  selector: 'app-host-review-approval-list',
  templateUrl: './host-review-approval-list.component.html',
  styleUrl: './host-review-approval-list.component.css',
})
export class HostReviewApprovalListComponent implements OnInit {
  reviews: HostReviewApprovalCardDto[] = [];
  constructor(private service: ReviewService) {}

  ngOnInit(): void {
    this.service
      .getHostReviewsByStatus(ReviewStatus.REPORTED)
      .subscribe((reviews) => {
        this.reviews = reviews;
      });
  }

  accept(review: HostReviewApprovalCardDto) {
    this.service
      .changeHostReviewStatus(review.review.id, ReviewStatus.ACCEPTED)
      .subscribe(() => {
        this.reviews = this.reviews.filter(
          (r) => r.review.id !== review.review.id,
        );
      });
  }

  delete(review: HostReviewApprovalCardDto) {
    this.service.deleteReview(review.review.id).subscribe(() => {
      this.reviews = this.reviews.filter(
        (r) => r.review.id !== review.review.id,
      );
    });
  }
}
