import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import {ButtonModule} from "primeng/button";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    NotificationCardComponent,
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule
  ],
  exports: [
    NotificationCardComponent,
    NotificationListComponent
  ]
})
export class NotificationModule { }
