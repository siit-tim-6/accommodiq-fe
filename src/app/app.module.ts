import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationModule } from './accommodation/accommodation.module';
import { NotificationCardComponent } from './notification/notification-card/notification-card.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import {ButtonModule} from "primeng/button";
import {RatingModule} from "primeng/rating";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NotificationCardComponent, NotificationListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    AccommodationModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RatingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
