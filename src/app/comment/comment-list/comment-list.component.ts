import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {
  @Input()
  comments: Comment[] = [];
  canAddComment: boolean = true;
}
