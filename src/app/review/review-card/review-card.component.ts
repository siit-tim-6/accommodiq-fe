import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewBaseInfo } from '../review.model';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  @Input() comment!: ReviewBaseInfo;
  @Input() canReport: boolean = true;
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() reportRequest = new EventEmitter<number>();

  constructor(private router: Router) {}

  deleteComment(comment: ReviewBaseInfo) {
    this.deleteRequest.emit(comment.id);
  }

  reportComment(comment: ReviewBaseInfo) {
    this.reportRequest.emit(comment.id);
  }

  redirectToAuthorProfile(authorId: number) {
    this.router
      .navigate(['/profile-account', authorId])
      .then((r) => console.log(r));
  }
}
