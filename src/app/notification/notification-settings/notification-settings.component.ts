import { Component } from '@angular/core';
import {
  NotificationSettingDto,
  NotificationType,
} from '../notification.model';
import { NotificationService } from '../notification.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrl: './notification-settings.component.css',
})
export class NotificationSettingsComponent {
  notificationSettings: NotificationSettingDto[] = [];
  isLoaded = false;

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService,
  ) {
    this.notificationService.getNotificationSettings().subscribe({
      next: (notificationSettings) => {
        this.notificationSettings = notificationSettings;
        this.isLoaded = true;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error while loading notification settings',
        });
      },
    });
  }

  updateNotificationSettings() {
    this.notificationService
      .updateNotificationSettings(this.notificationSettings)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Notification settings updated',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error while updating notification settings',
          });
        },
      });
  }

  getType(type: NotificationType) {
    switch (type) {
      case NotificationType.ACCOMMODATION_RATING:
        return 'Accommodation rating';
      case NotificationType.HOST_RATING:
        return 'Host rating';
      case NotificationType.HOST_REPLY_TO_REQUEST:
        return 'Host reply to request';
      case NotificationType.RESERVATION_CANCEL:
        return 'Reservation cancel';
      case NotificationType.RESERVATION_REQUEST:
        return 'Reservation request';
    }
  }
}
