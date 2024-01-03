import { Component, Input } from '@angular/core';
import { NotificationDto, NotificationType } from '../notification.model';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css',
})
export class NotificationCardComponent {
  @Input() notification!: NotificationDto;

  getType(): string {
    if (this.notification.type === NotificationType.RESERVATION_REQUEST) {
      return 'New Reservation Request';
    }
    if (this.notification.type === NotificationType.RESERVATION_CANCEL) {
      return 'Reservation Canceled';
    }
    if (this.notification.type === NotificationType.HOST_RATING) {
      return 'New Account Rating';
    }
    if (this.notification.type === NotificationType.ACCOMMODATION_RATING) {
      return 'New Accommodation Rating';
    }
    if (this.notification.type === NotificationType.HOST_REPLY_TO_REQUEST) {
      return 'Host Replied To Your Request';
    }
    return '';
  }
}
