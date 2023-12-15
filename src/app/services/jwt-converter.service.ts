import {Injectable} from '@angular/core';
import {AccountRole} from "../layout/account-info/account.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class JwtConverterService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  constructor(private httpClient: HttpClient) {}


  getRole(token: string):AccountRole {
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    return decodedJwtData.role;
  }
}
