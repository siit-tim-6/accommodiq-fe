import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './registration.model';
import { environment } from '../../../env/env';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  registerUser(account: Account) {
    return this.http.post(environment.apiHost + 'users', account);
  }
}
