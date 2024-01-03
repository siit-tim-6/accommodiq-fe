export interface NotificationDto {
  id: number;
  text: string;
  seen: boolean;
  time: number;
  type: NotificationType;
}

export enum NotificationType {
  RESERVATION_REQUEST = 'RESERVATION_REQUEST',
  RESERVATION_CANCEL = 'RESERVATION_CANCEL',
  HOST_RATING = 'HOST_RATING',
  ACCOMMODATION_RATING = 'ACCOMMODATION_RATING',
  HOST_REPLY_TO_REQUEST = 'HOST_REPLY_TO_REQUEST',
}
