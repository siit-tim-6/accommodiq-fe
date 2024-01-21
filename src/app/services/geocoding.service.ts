import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeocoderResponse } from '../models/geocoder.model';
import { Observable } from 'rxjs';
import { keys } from '../../env/keys';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private httpClient;

  constructor(private httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  getLocation(address: string): Observable<GeocoderResponse> {
    return this.httpClient.get<GeocoderResponse>(
      `https://maps.google.com/maps/api/geocode/json?address=${address}&sensor=false&key=${keys.googleMaps}`,
    );
  }
}
