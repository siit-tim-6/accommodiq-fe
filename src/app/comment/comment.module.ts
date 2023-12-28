import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddCommentFormComponent } from './add-comment-form/add-comment-form.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';

@NgModule({
  declarations: [
    AddCommentFormComponent,
    CommentCardComponent,
    CommentListComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, PrimengModule],
  exports: [
    AddCommentFormComponent,
    CommentCardComponent,
    CommentListComponent,
  ],
})
export class CommentModule {}
