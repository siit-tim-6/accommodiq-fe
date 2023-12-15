import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import {Accommodation, AccommodationStatus} from './accommodation.model';
import { AccommodationDetails } from './accommodation-details.model';
import {TemplateService} from "../services/template.service";

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  constructor(private httpClient: HttpClient, private templateService: TemplateService) {}

  getAll(): Observable<Accommodation[]> {
    return this.templateService.getObservable<Accommodation[]>('accommodations');
  }

  getAccommodation(id: number): Observable<AccommodationDetails> {
    return this.templateService.getObservable<AccommodationDetails>('accommodations/' + id);
  }

  getHostsAccommodations(): Observable<Accommodation[]> {
    return this.templateService.getObservable<Accommodation[]>('hosts/accommodations');
  }

  getPendingAccommodations(): Observable<Accommodation[]> {
    return this.templateService.getObservable<Accommodation[]>('accommodations/pending');
  }

  findByFilter(
    location: string,
    fromDate: number,
    toDate: number,
    title: string,
    guests: number | string,
    minPrice: number,
    maxPrice: number,
    type: string,
    benefits: string[],
  ): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(
      `${environment.apiHost}accommodations?${
        location != '' ? `location=${location}` : ''
      }${fromDate != 0 ? `&availableFrom=${fromDate}` : ''}${
        toDate != 0 ? `&availableTo=${toDate}` : ''
      }${title != '' ? `&title=${title}` : ''}${
        +guests != -1 ? `&guests=${guests}` : ''
      }${minPrice != -1 ? `&priceFrom=${minPrice}` : ''}${
        maxPrice != -1 ? `&priceTo=${maxPrice}` : ''
      }${type != '' && type != null ? `&type=${type}` : ''}${
        benefits.length > 0 ? `&benefits=${benefits.join(',')}` : ''
      }`,
    );
  }

  changeAccommodationStatus(id: number, status: AccommodationStatus): Observable<HttpResponse<AccommodationDetails>> {
    return this.templateService.putObservable<AccommodationDetails>(`accommodations/${id}/status`, {"status": status});
  }
}
