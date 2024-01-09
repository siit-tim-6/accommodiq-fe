import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../comment.model';
import { ReviewRequest } from '../review.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {
  @Input()
  comments: Comment[] = [];
  @Input()
  canAddComment: boolean = true;
  @Input() canReport: boolean = true;
  @Output() reviewSubmitted: EventEmitter<ReviewRequest> =
    new EventEmitter<ReviewRequest>();
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter<number>();
  @Output() reportRequest: EventEmitter<number> = new EventEmitter<number>();

  handleReviewSubmission(review: ReviewRequest) {
    this.reviewSubmitted.emit(review);
  }

  handleDeleteComment(commentId: number) {
    this.deleteRequest.emit(commentId);
  }

  handleReportComment(commentId: number) {
    this.reportRequest.emit(commentId);
  }
}
