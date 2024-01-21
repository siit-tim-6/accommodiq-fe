import { Component, OnInit } from '@angular/core';
import {
  Reservation,
  ReservationSearchParams,
  ReservationStatus,
} from '../reservation.model';
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
  cancellableReservationIds: number[] = [];
  loggedInRole: AccountRole | null;

  constructor(
    private service: ReservationService,
    private messageService: MessageService,
    private jwtService: JwtService,
  ) {
    this.loggedInRole = jwtService.getRole();
  }

  ngOnInit(): void {
    this.refreshReservationList();
    this.refreshCancellableReservationIds();
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
      this.refreshReservationList();
      this.refreshCancellableReservationIds();
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

  cancel(reservationId: number) {
    this.service
      .changeReservationStatus(reservationId, ReservationStatus.CANCELLED)
      .subscribe({
        next: (reservation) => {
          this.handleChangeStatusResponse(reservation);
          this.refreshCancellableReservationIds();
        },
        error: (err) => this.handleChangeStatusError(err),
      });
  }

  accept(reservationId: number) {
    this.service
      .changeReservationStatus(reservationId, ReservationStatus.ACCEPTED)
      .subscribe({
        next: (reservation) => {
          this.handleChangeStatusResponse(reservation);
          this.refreshReservationList();
        },
        error: (err) => this.handleChangeStatusError(err),
      });
  }

  decline(reservationId: number) {
    this.service
      .changeReservationStatus(reservationId, ReservationStatus.DECLINED)
      .subscribe({
        next: (reservation) => {
          this.handleChangeStatusResponse(reservation);
          this.refreshReservationList();
        },
        error: (err) => this.handleChangeStatusError(err),
      });
  }

  isAcceptable(reservation: Reservation) {
    return reservation.status == 'PENDING' && this.loggedInRole == 'HOST';
  }

  isCancellable(reservation: Reservation) {
    return (
      this.jwtService.getRole() == 'GUEST' &&
      this.cancellableReservationIds.includes(reservation.accommodationId) &&
      reservation.status === 'ACCEPTED'
    );
  }

  isDeletable(res: Reservation) {
    return res.status == 'PENDING' && this.loggedInRole == 'GUEST';
  }

  handleChangeStatusResponse(reservation: Reservation) {
    this.reservations = this.reservations.map((el) =>
      el.id == reservation.id ? reservation : el,
    );

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Reservation successfully ${reservation.status.toLowerCase()}!`,
    });
  }

  handleChangeStatusError(err: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: err.error.message,
    });
  }

  refreshReservationList() {
    if (this.loggedInRole == null) return;
    this.service.getAll(this.loggedInRole).subscribe((reservations) => {
      this.reservations = reservations;
    });
  }

  refreshCancellableReservationIds() {
    if (this.loggedInRole != 'GUEST') return;
    this.service.getCancellableReservationIds().subscribe((ids) => {
      this.cancellableReservationIds = ids;
    });
  }
}
