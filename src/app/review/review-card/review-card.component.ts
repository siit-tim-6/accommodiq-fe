import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewBaseInfo } from '../review.model';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  @Input() review!: ReviewBaseInfo;
  @Input() canReport: boolean = true;
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() reportRequest = new EventEmitter<number>();

  constructor(private router: Router) {}

  deleteReview(review: ReviewBaseInfo) {
    this.deleteRequest.emit(review.id);
  }

  reportReview(review: ReviewBaseInfo) {
    this.reportRequest.emit(review.id);
  }

  redirectToAuthorProfile(authorId: number) {
    this.router
      .navigate(['/profile-account', authorId])
      .then((r) => console.log(r));
  }
}
