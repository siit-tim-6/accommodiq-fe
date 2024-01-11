import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation, ReservationStatus } from './reservation.model';
import { environment } from '../../env/env';
import { MessageDto } from '../accommodation/accommodation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(
      `${environment.apiHost}guests/reservations`,
    );
  }

  findByFilter(
    title: string,
    startDate: number,
    endDate: number,
    status: string,
  ): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(
      `${environment.apiHost}guests/reservations?${
        title != '' ? `title=${title}&` : ''
      }${startDate != 0 ? `startDate=${startDate}&` : ''}${
        endDate != 0 ? `endDate=${endDate}&` : ''
      }${
        status != null && status != '' ? `status=${status.toUpperCase()}` : ''
      }`,
    );
  }

  delete(id: number): Observable<MessageDto> {
    return this.httpClient.delete<MessageDto>(
      `${environment.apiHost}reservations/${id}`,
    );
  }

  getCancellableReservationIds(): Observable<number[]> {
    return this.httpClient.get<number[]>(
      `${environment.apiHost}guests/reservations/cancellable`,
    );
  }

  cancel(id: number) {
    return this.httpClient.put<Reservation>(
      `${environment.apiHost}reservations/${id}/status`,
      { status: ReservationStatus.CANCELLED },
    );
  }
}
