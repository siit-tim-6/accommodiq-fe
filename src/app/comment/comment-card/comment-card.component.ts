import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent {
  @Input() comment!: Comment;
  @Input() canReport: boolean = true;
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() reportRequest = new EventEmitter<number>();

  constructor(private router: Router) {}

  deleteComment(comment: Comment) {
    this.deleteRequest.emit(comment.id);
  }

  reportComment(comment: Comment) {
    this.reportRequest.emit(comment.id);
  }

  redirectToAuthorProfile(authorId: number) {
    this.router
      .navigate(['/profile-account', authorId])
      .then((r) => console.log(r));
  }
}
