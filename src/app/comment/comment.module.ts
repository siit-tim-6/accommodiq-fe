import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCommentFormComponent } from './add-comment-form/add-comment-form.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';
import { ReviewApprovalListComponent } from './review-approval-list/review-approval-list.component';
import { ReviewApprovalCardComponent } from './review-card/review-approval-card.component';

@NgModule({
  declarations: [
    AddCommentFormComponent,
    CommentCardComponent,
    ReviewListComponent,
    ReviewApprovalListComponent,
    ReviewApprovalCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
  ],
  exports: [AddCommentFormComponent, CommentCardComponent, ReviewListComponent],
})
export class CommentModule {}
