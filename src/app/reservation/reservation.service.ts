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

  findByFilter(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(
      `${environment.apiHost}guests/reservations`,
    );
  }
}
