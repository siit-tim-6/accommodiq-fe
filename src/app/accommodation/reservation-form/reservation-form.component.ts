import { Component, Input } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { getTimestampMiliseconds } from '../../utils/date.utils';
import { ReservationRequest } from '../accommodation.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent {
  rangeDates: Date[] = [];
  guests: number | string = 0;
  totalPrice: number = 0;
  isAvailable: boolean = false;

  @Input()
  accommodationId!: number;

  @Input()
  minGuests!: number;

  @Input()
  maxGuests!: number;

  constructor(private service: AccommodationService) {}

  calendarBlur() {
    this.service
      .getIsAvailable(
        this.accommodationId,
        getTimestampMiliseconds(this.rangeDates![0]),
        getTimestampMiliseconds(this.rangeDates![1]),
      )
      .subscribe((available) => (this.isAvailable = available.available));
  }

  guestsChange() {
    this.service
      .getTotalPrice(
        this.accommodationId,
        getTimestampMiliseconds(this.rangeDates![0]),
        getTimestampMiliseconds(this.rangeDates![1]),
        this.guests!,
      )
      .subscribe((price) => (this.totalPrice = price.totalPrice));
  }

  canMakeReservation() {
    return (
      typeof this.guests == 'number' &&
      (this.guests as number) >= this.minGuests &&
      (this.guests as number) <= this.maxGuests &&
      this.rangeDates.length == 2 &&
      this.rangeDates[0] != null &&
      this.rangeDates[1] != null
    );
  }

  makeReservation() {
    let newReservation: ReservationRequest = {
      accommodationId: this.accommodationId,
      startDate: getTimestampMiliseconds(this.rangeDates![0]),
      endDate: getTimestampMiliseconds(this.rangeDates![1]),
      numberOfGuests: this.guests as number,
    };
    this.service.createReservation(newReservation).subscribe({
      next: (value) => alert('success reservation'),
      error: (error) => alert('error reservation'),
    });
  }
}
