import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservationSearchParams } from '../reservation.model';

@Component({
  selector: 'app-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrl: './reservation-search.component.css',
})
export class ReservationSearchComponent {
  @Output()
  onSearch = new EventEmitter<ReservationSearchParams>();

  @Output()
  onClear = new EventEmitter<never>();

  @Input()
  reservationCount: number = 0;

  accommodationTitle: string = '';
  reservationDates: Date[] = [];
  reservationStatus: string[] = [
    'Accepted',
    'Declined',
    'Cancelled',
    'Pending',
  ];
  selectedReservationStatus: string | null = null;

  search() {
    let searchParams: ReservationSearchParams = {
      title: this.accommodationTitle,
      reservationDates: this.reservationDates,
      status: this.selectedReservationStatus,
    };
    this.onSearch.emit(searchParams);
  }

  clear() {
    this.accommodationTitle = '';
    this.reservationDates = [];
    this.selectedReservationStatus = null;
    this.onClear.emit();
  }
}
