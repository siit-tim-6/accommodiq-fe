import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './registration.model';
import { environment } from '../../../env/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  registerUser(account: Account): Observable<Account> {
    console.log('Registering user', account);
    return this.http.post<Account>(environment.apiHost + 'users', account);
  }
}
