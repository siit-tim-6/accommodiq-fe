import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';
import { NotificationDto } from './notification.model';

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
}
