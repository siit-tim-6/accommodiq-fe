import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation, ReservationStatus } from './reservation.model';
import { environment } from '../../env/env';
import { MessageDto } from '../accommodation/accommodation.model';
import { AccountRole } from '../account/account-info/account.model';
import { JwtService } from '../infrastructure/auth/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService,
  ) {}

  getAll(role: AccountRole): Observable<Reservation[]> {
    let roleString;

    if (role === AccountRole.GUEST) roleString = 'guests';
    else if (role === AccountRole.HOST) roleString = 'hosts';

    return this.httpClient.get<Reservation[]>(
      `${environment.apiHost}${roleString}/reservations`,
    );
  }

  findByFilter(
    role: AccountRole,
    title: string,
    startDate: number,
    endDate: number,
    status: string,
  ): Observable<Reservation[]> {
    let roleString;

    if (role === AccountRole.GUEST) roleString = 'guests';
    else if (role === AccountRole.HOST) roleString = 'hosts';

    return this.httpClient.get<Reservation[]>(
      `${environment.apiHost}${roleString}/reservations?${
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

  changeReservationStatus(id: number, status: ReservationStatus) {
    return this.httpClient.put<Reservation>(
      `${environment.apiHost}reservations/${id}/status`,
      { status: status },
    );
  }
}
