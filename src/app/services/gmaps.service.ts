import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { keys } from '../../env/keys';

@Injectable({
  providedIn: 'root',
})
export class GmapsService {
  private apiLoadedSubject = new BehaviorSubject<boolean>(false);
  apiLoaded$ = this.apiLoadedSubject.asObservable();

  private httpClient: HttpClient;

  constructor(httpBackend: JsonpClientBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  loadMaps(): void {
    this.httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${keys.googleMaps}`,
        'callback',
      )
      .pipe(
        map(() => true),
        catchError((error) => {
          console.log(error);
          return of(false);
        }),
      )
      .subscribe((loaded) => {
        this.apiLoadedSubject.next(loaded);
      });
  }
}
