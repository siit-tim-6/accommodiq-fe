import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservation } from '../reservation.model';
import { environment } from '../../../env/env';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.css',
})
export class ReservationCardComponent {
  @Output() onDelete = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<number>();
  @Input() reservation!: Reservation;
  protected readonly Math = Math;
  protected readonly imageBase = environment.imageBase;
  @Input() cancellable: boolean = false;

  constructor() {}

  protected formatTimestamp(timestampSeconds: number): string {
    const date = new Date(timestampSeconds * 1000);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${date.getUTCDate()} ${
      months[date.getUTCMonth()]
    } ${date.getUTCFullYear()}`;
  }

  delete() {
    this.onDelete.emit(this.reservation.id);
  }

  cancel() {
    this.onCancel.emit(this.reservation.id);
  }
}
