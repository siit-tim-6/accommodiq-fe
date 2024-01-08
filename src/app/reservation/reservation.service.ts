import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './reservation.model';
import { environment } from '../../env/env';

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
}
