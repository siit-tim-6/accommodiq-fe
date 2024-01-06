import { Component, Input } from '@angular/core';
import { Reservation } from '../reservation.model';
import { environment } from '../../../env/env';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.css',
})
export class ReservationCardComponent {
  @Input() reservation!: Reservation;
  protected readonly Math = Math;
  protected readonly imageBase = environment.imageBase;

  constructor() {}
}
