import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginRequest, LoginResponse} from './login.model';
import {Observable} from 'rxjs';
import {environment} from '../../../env/env';
import {AccountRole} from "../account-info/account.model";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  constructor(private httpClient: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      environment.apiHost + 'sessions',
      loginRequest,
      { headers: this.headers },
    );
  }

  getRole(token: string):AccountRole {
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    return decodedJwtData.sub.toUpperCase() as AccountRole;
  }
}
