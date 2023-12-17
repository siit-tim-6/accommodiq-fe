import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse } from './login.model';
import { Observable } from 'rxjs';
import { environment } from '../../../env/env';
import { AccountRole } from '../account-info/account.model';
import { RoleService } from '../../services/role.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  constructor(
    private httpClient: HttpClient,
    private roleService: RoleService,
  ) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      environment.apiHost + 'sessions',
      loginRequest,
      { headers: this.headers },
    );
  }

  getRole(): AccountRole | null {
    let token = localStorage.getItem('user');
    if (token == null) return null;

    let decodedJwtData = this.extractToken(token);

    if (Date.now() >= decodedJwtData.exp * 1000) {
      localStorage.removeItem('user');
      return null;
    }

    return decodedJwtData.role.toUpperCase() as AccountRole;
  }

  private extractToken(token: string) {
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    return JSON.parse(decodedJwtJsonData);
  }

  signOut() {
    localStorage.removeItem('user');
    this.roleService.updateRole(this.getRole());
  }
}
