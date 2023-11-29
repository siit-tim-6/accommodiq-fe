import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccommodationModule } from './accommodation/accommodation.module';
import { CommentCardComponent } from './comment/comment-card/comment-card.component';
import {RatingModule} from "primeng/rating";
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { AddCommentFormComponent } from './comment/add-comment-form/add-comment-form.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [AppComponent, CommentCardComponent, CommentListComponent, AddCommentFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    AccommodationModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
