import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';

@NgModule({
  declarations: [NotificationListComponent],
  imports: [CommonModule, ButtonModule, RouterModule, PrimengModule],
  exports: [NotificationListComponent],
})
export class NotificationModule {}
