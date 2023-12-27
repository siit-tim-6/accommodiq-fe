import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../comment.model';
import { HostReviewRequest } from '../../layout/profile-account/host-account.model';

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
  @Output() reviewSubmitted: EventEmitter<HostReviewRequest> =
    new EventEmitter<HostReviewRequest>();
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter<number>();
  @Output() reportRequest: EventEmitter<number> = new EventEmitter<number>();

  handleReviewSubmission(review: HostReviewRequest) {
    this.reviewSubmitted.emit(review);
  }

  handleDeleteComment(commentId: number) {
    this.deleteRequest.emit(commentId);
  }

  handleReportComment(commentId: number) {
    this.reportRequest.emit(commentId);
  }
}
