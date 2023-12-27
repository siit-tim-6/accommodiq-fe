import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { RouterModule } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCommentFormComponent } from './add-comment-form/add-comment-form.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentListComponent } from './comment-list/comment-list.component';

@NgModule({
  declarations: [
    AddCommentFormComponent,
    CommentCardComponent,
    CommentListComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    RatingModule,
    RouterModule,
    GalleriaModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddCommentFormComponent,
    CommentCardComponent,
    CommentListComponent,
  ],
})
export class CommentModule {}
