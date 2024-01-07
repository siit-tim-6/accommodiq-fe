import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationSearchParams } from '../reservation.model';
import { ReservationService } from '../reservation.service';
import { GmapsService } from '../../services/gmaps.service';
import { getTimestampSeconds } from '../../utils/date.utils';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  elements: Reservation[] = [];
  apiLoaded: boolean = false;

  constructor(
    private service: ReservationService,
    private gmaps: GmapsService,
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((reservations) => {
      this.elements = reservations;
    });
    this.gmaps.apiLoaded$.subscribe((loaded) => {
      if (!loaded) {
        this.gmaps.loadMaps();
      }
      this.apiLoaded = loaded;
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
        this.elements = reservations;
      });
  }

  clear() {
    this.service.getAll().subscribe((reservations) => {
      this.elements = reservations;
    });
  }
}
