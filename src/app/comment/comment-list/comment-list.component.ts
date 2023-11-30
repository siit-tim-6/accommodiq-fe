import { Component, OnInit } from '@angular/core';
import {IComment} from "../comment.model";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit{
  comments: IComment[] = [];
  canAddComment: boolean = true;

  ngOnInit() {
    for (let i = 1; i <= 5; i++) {
      const randomRating = Math.floor(Math.random() * 5) + 1;
      const comment: IComment = {
        author: `User ${i}`,
        content: `This apartment was a real discovery!
            We had a wonderful weekend in Novi Sad,
            and we couldn't be happier with the accommodation.
            The location is priceless, as we had access to
            all the main attractions of the city without the need for driving
            or long walks. I highly recommend this apartment to anyone
            looking for comfortable accommodation
            in the city center.`,
        rating: randomRating
      };
      this.comments.push(comment);
    }
  }
}
