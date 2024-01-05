import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';
import { NotificationDto, NotificationType } from '../notification.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css',
})
export class NotificationListComponent {
  notifications: NotificationDto[] = [];
  notificationToShow: NotificationDto[] = [];
  isLoaded: boolean = false;
  showAll: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService,
  ) {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.setNotificationToShow(this.showAll);
        this.isLoaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.notificationService.notificationCreated.subscribe(
      (notification: NotificationDto) => {
        this.handleNotification(notification);
      },
    );
  }

  setNotificationToShow(showAll: boolean) {
    this.showAll = showAll;
    if (showAll) this.notificationToShow = this.notifications;
    else this.notificationToShow = this.notifications.filter((n) => !n.seen);
  }

  markAllAsSeen() {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.forEach((n) => (n.seen = true));
        this.setNotificationToShow(this.showAll);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error while marking all notifications as read',
        });
      },
    });
  }

  markAsSeen(id: number) {
    this.notificationService.markAsRead(id).subscribe({
      next: () => {
        this.notifications.find((n) => n.id == id)!.seen = true;
        this.setNotificationToShow(this.showAll);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error while marking notification as read',
        });
      },
    });
  }

  getStatusSeverity(type: NotificationType): string {
    switch (type) {
      case NotificationType.RESERVATION_REQUEST:
        return 'info';
      case NotificationType.RESERVATION_CANCEL:
        return 'danger';
      case NotificationType.HOST_RATING:
        return 'warning';
      case NotificationType.ACCOMMODATION_RATING:
        return 'success';
      case NotificationType.HOST_REPLY_TO_REQUEST:
        return 'success';
      default:
        return 'info';
    }
  }

  getType(type: NotificationType): string {
    switch (type) {
      case NotificationType.RESERVATION_REQUEST:
        return 'Reservation request';
      case NotificationType.RESERVATION_CANCEL:
        return 'Reservation cancel';
      case NotificationType.HOST_RATING:
        return 'Account rating';
      case NotificationType.ACCOMMODATION_RATING:
        return 'Accommodation rating';
      case NotificationType.HOST_REPLY_TO_REQUEST:
        return 'Host reply to request';
      default:
        return 'Unknown';
    }
  }

  isSeen(notification: NotificationDto) {
    return notification.seen;
  }

  handleNotification(notification: NotificationDto): void {
    this.notifications.push(notification);
    this.setNotificationToShow(this.showAll);
  }
}
