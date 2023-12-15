import { Observable } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from "../../env/env";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private httpClient: HttpClient) {}

  getApiUrl(endpoint: string): string {
    return environment.apiHost + endpoint;
  }

  getObservable<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(this.getApiUrl(endpoint));
  }

  putObservable<T>(endpoint: string, body: any): Observable<HttpResponse<T>> {
    return this.httpClient.put<HttpResponse<T>>(this.getApiUrl(endpoint), body);
  }
}
