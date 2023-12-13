import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequest, LoginResponse} from "./login.model";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(environment.apiHost + "sessions", loginRequest);
  }
}
