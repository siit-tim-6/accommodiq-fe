import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationSearchParams } from '../reservation.model';
import { ReservationService } from '../reservation.service';
import { getTimestampSeconds } from '../../utils/date.utils';
import { Marker } from '../../infrastructure/gmaps/gmaps.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  cancellableReservationIds: number[] = [];

  constructor(
    private service: ReservationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((reservations) => {
      this.reservations = reservations;
    });
    this.service.getCancellableReservationIds().subscribe((ids) => {
      this.cancellableReservationIds = ids;
    });
  }

  search(searchParams: ReservationSearchParams) {
    let startDate: number =
      searchParams.reservationDates.length != 2
        ? 0
        : getTimestampSeconds(searchParams.reservationDates[0]);
    let endDate: number =
      searchParams.reservationDates.length != 2
        ? 0
        : getTimestampSeconds(searchParams.reservationDates[1]);

    this.service
      .findByFilter(
        searchParams.title,
        startDate,
        endDate,
        searchParams.status ?? '',
      )
      .subscribe((reservations) => {
        this.reservations = reservations;
      });
  }

  clear() {
    this.service.getAll().subscribe((reservations) => {
      this.reservations = reservations;
    });
  }

  protected getMarkers(): Marker[] {
    return this.reservations.map((el) => {
      return {
        label: el.accommodationTitle,
        latitude: el.accommodationLocation.latitude,
        longitude: el.accommodationLocation.longitude,
      };
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: (_) => {
        this.reservations = this.reservations.filter((el) => el.id != id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Reservation successfully deleted!',
        });
      },
      error: (_) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to delete selected reservation.',
        });
      },
    });
  }

  cancel($event: number) {
    this.service.cancel($event).subscribe({
      next: (_) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Reservation successfully canceled!',
        });
      },
      error: (_) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to cancel selected reservation.',
        });
      },
    });
  }
}
