import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCommentFormComponent } from './add-comment-form/add-comment-form.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';
import { PendingReviewListComponent } from './pending-review-list/pending-review-list.component';
import { PendingReviewCardComponent } from './pending-review-card/pending-review-card.component';

@NgModule({
  declarations: [
    AddCommentFormComponent,
    CommentCardComponent,
    CommentListComponent,
    PendingReviewListComponent,
    PendingReviewCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
  ],
  exports: [
    AddCommentFormComponent,
    CommentCardComponent,
    CommentListComponent,
  ],
})
export class CommentModule {}
