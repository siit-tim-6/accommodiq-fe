import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrl: './reservation-search.component.css',
})
export class ReservationSearchComponent {
  accommodationTitle: string = '';
  reservationDates: Date[] = [];

  search() {}

  clear() {}
}
