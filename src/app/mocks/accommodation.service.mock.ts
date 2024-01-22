import { Injectable } from '@angular/core';
import {
  AccommodationAvailability,
  AccommodationTotalPrice,
  ReservationRequest,
} from '../accommodation/accommodation.model';
import { Observable, of } from 'rxjs';

export const availabilityMock: AccommodationAvailability = {
  available: true,
};

export const totalPriceMock: AccommodationTotalPrice = {
  totalPrice: 200,
};

export const reservationMock: ReservationRequest = {
  accommodationId: 1,
  startDate: 1,
  endDate: 2,
  numberOfGuests: 1,
};

@Injectable()
export class AccommodationServiceMock {
  constructor() {}

  getIsAvailable(
    id: number,
    dateFrom: number,
    dateTo: number,
  ): Observable<AccommodationAvailability> {
    return of(availabilityMock);
  }

  getTotalPrice(
    id: number,
    dateFrom: number,
    dateTo: number,
    guests: number | string,
  ): Observable<AccommodationTotalPrice> {
    return of(totalPriceMock);
  }

  createReservation(
    reservation: ReservationRequest,
  ): Observable<ReservationRequest> {
    return of(reservation);
  }
}
