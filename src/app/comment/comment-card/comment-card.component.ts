import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent {
  @Input() comment: Comment | undefined;
}

interface Comment {
  rating: number;
  author: string;
  content: string;
}
