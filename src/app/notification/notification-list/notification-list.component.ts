import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';
import { NotificationDto } from '../notification.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css',
})
export class NotificationListComponent {
  notifications: NotificationDto[] = [];
  isLoaded: boolean = false;

  constructor(private notificationService: NotificationService) {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.isLoaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
