import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../registration/registration.model';

@Injectable({
  providedIn: 'root',
})
export class AccountInfoService {
  constructor(private http: HttpClient) {}

  getUserInfo(userId: number): Observable<User> {
    return this.http.get<User>(`/api/users/${userId}`);
  }
}
