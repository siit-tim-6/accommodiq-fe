import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {Accommodation, AccommodationCreateDto, AccommodationDetailsDto} from "./accommodation.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accommodationList: Accommodation[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations')
  }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id)
  }

  getHostsAccommodations(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'hosts/' + 1 + "/accommodations") // change later with JWT
  }

  createNewAccommodation(hostId: number, data: AccommodationCreateDto): Observable<AccommodationDetailsDto> {
    return this.httpClient.post<AccommodationDetailsDto>(environment.apiHost + 'hosts/' + 1 + "/accommodations", data) // change later with JWT
  }
}
