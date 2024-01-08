import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';

@NgModule({
  declarations: [NotificationListComponent, NotificationSettingsComponent],
  imports: [CommonModule, ButtonModule, RouterModule, PrimengModule],
  exports: [NotificationListComponent],
})
export class NotificationModule {}
