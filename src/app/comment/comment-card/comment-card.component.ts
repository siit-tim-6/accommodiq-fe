import { Component, Input } from '@angular/core';
import { IComment } from '../comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent {
  @Input() comment: IComment | undefined;
}
