import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent {
  @Input() comment!: Comment;
  @Output() deleteRequest = new EventEmitter<number>();

  deleteComment(comment: Comment) {
    this.deleteRequest.emit(comment.id);
  }
}
