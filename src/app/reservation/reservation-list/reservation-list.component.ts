import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationSearchParams } from '../reservation.model';
import { ReservationService } from '../reservation.service';
import { getTimestampMiliseconds } from '../../utils/date.utils';
import { Marker } from '../../infrastructure/gmaps/gmaps.model';
import { MessageService } from 'primeng/api';
import { JwtService } from '../../infrastructure/auth/jwt.service';
import { AccountRole } from '../../account/account-info/account.model';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  loggedInRole: AccountRole | null;

  constructor(
    private service: ReservationService,
    private messageService: MessageService,
    private jwtService: JwtService,
  ) {
    this.loggedInRole = jwtService.getRole();
  }

  ngOnInit(): void {
    if (this.loggedInRole != null) {
      this.service.getAll(this.loggedInRole).subscribe((reservations) => {
        this.reservations = reservations;
      });
    }
  }

  search(searchParams: ReservationSearchParams) {
    let startDate: number =
      searchParams.reservationDates.length != 2
        ? 0
        : getTimestampMiliseconds(searchParams.reservationDates[0]);
    let endDate: number =
      searchParams.reservationDates.length != 2
        ? 0
        : getTimestampMiliseconds(searchParams.reservationDates[1]);

    if (this.loggedInRole != null) {
      this.service
        .findByFilter(
          this.loggedInRole,
          searchParams.title,
          startDate,
          endDate,
          searchParams.status ?? '',
        )
        .subscribe((reservations) => {
          this.reservations = reservations;
        });
    }
  }

  clear() {
    if (this.loggedInRole != null) {
      this.service.getAll(this.loggedInRole).subscribe((reservations) => {
        this.reservations = reservations;
      });
    }
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
          detail: 'Reservation sucessfully deleted!',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to delete selected reservation.',
        });
      },
    });
  }
}
