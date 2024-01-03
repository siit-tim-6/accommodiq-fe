import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';
import { NotificationDto, NotificationSettingDto } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getNotifications() {
    return this.http.get<NotificationDto[]>(
      environment.apiHost + 'users/notifications',
    );
  }

  markAsRead(id: number) {
    return this.http.put(
      environment.apiHost + `users/notifications/${id}/seen`,
      {},
    );
  }

  markAllAsRead() {
    return this.http.put(environment.apiHost + 'users/notifications/seen', {});
  }

  getNotificationSettings() {
    return this.http.get<NotificationSettingDto[]>(
      environment.apiHost + 'users/notification-settings',
    );
  }

  updateNotificationSettings(notificationSettings: NotificationSettingDto[]) {
    return this.http.put(
      environment.apiHost + 'users/notification-settings',
      notificationSettings,
    );
  }
}
