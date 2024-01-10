import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReviewFormComponent } from './add-review-form/add-review-form.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';
import { ReviewApprovalListComponent } from './review-approval-list/review-approval-list.component';
import { ReviewApprovalCardComponent } from './review-approval-card/review-approval-card.component';

@NgModule({
  declarations: [
    AddReviewFormComponent,
    ReviewCardComponent,
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
  exports: [AddReviewFormComponent, ReviewCardComponent, ReviewListComponent],
})
export class CommentModule {}
