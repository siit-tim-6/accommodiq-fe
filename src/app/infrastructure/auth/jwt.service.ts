import { Injectable } from '@angular/core';
import { AccountRole } from '../../account/account-info/account.model';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken(): string | null {
    return localStorage.getItem('user');
  }

  removeToken() {
    localStorage.removeItem('user');
  }

  getTokenData() {
    const token = this.getToken();
    if (token == null) return null;

    const jwtDataRaw = token.split('.')[1];
    const decodedJwtData = window.atob(jwtDataRaw);
    const jwtData = JSON.parse(decodedJwtData);

    if (Date.now() >= jwtData.exp * 1000) {
      this.removeToken();
      return null;
    }

    return jwtData;
  }

  getRole(): AccountRole | null {
    const jwtData = this.getTokenData();
    if (jwtData == null) return null;

    return jwtData.role.toUpperCase() as AccountRole;
  }

  getUserId(): number | null {
    const jwtData = this.getTokenData();
    if (jwtData == null) return null;

    return jwtData.id;
  }

  getEmail(): string | null {
    const jwtData = this.getTokenData();
    if (jwtData == null) return null;

    return jwtData.sub;
  }
}
