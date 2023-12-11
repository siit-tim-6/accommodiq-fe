import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../env/env';
import {
  Accommodation,
  AccommodationAvailabilityPricingDto,
  AccommodationCreateDto,
  AccommodationDetailsDto,
  AccommodationFormData,
  AvailabilityDto,
  AvailabilityRangeReservationsStatusDto,
  PricingType,
} from './accommodation.model';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private accommodationList: Accommodation[] = [];

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(
      environment.apiHost + 'accommodations',
    );
  }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(
      environment.apiHost + 'accommodations/' + id,
    );
  }

  getHostsAccommodations(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(
      environment.apiHost + 'hosts/' + 1 + '/accommodations',
    ); // change later with JWT
  }

  findByFilter(
    location: string,
    fromDate: number,
    toDate: number,
    title: string,
  ): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(
      `${environment.apiHost}accommodations?${
        location != '' ? `location=${location}` : ''
      }${fromDate != 0 ? `&availableFrom=${fromDate}` : ''}${
        toDate != 0 ? `&availableTo=${toDate}` : ''
      }${title != '' ? `&title=${title}` : ''}`,
    );
  }

  createAccommodation(
    hostId: number,
    formData: AccommodationFormData,
    availabilityRanges: AvailabilityDto[],
    images: File[],
  ): Observable<AccommodationDetailsDto> {
    return this.uploadImages(images).pipe(
      switchMap((uploadedImagePaths: string[]) => {
        const accommodationData: AccommodationCreateDto = {
          title: formData.name,
          description: formData.description,
          location: formData.location,
          minGuests: formData.minGuests,
          maxGuests: formData.maxGuests,
          available: availabilityRanges,
          pricingType: formData.pricePerGuest
            ? PricingType.PerGuest
            : PricingType.PerNight,
          automaticAcceptance: formData.automaticallyAcceptIncomingReservations,
          images: uploadedImagePaths,
        };
        return this.httpClient.post<AccommodationDetailsDto>(
          environment.apiHost + 'hosts/' + 1 + '/accommodations',
          accommodationData,
        ); // change later with JWT
      }),
      catchError((error) => {
        console.error('Error in accommodation creation process:', error);
        return throwError(error);
      }),
    );
  }

  uploadImages(files: File[]): Observable<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return this.httpClient.post<string[]>(
      environment.apiHost + 'images/upload',
      formData,
    );
  }

  checkAvailabilityRange(
    accommodationId: number,
    fromDate: number,
    toDate: number,
  ): Observable<AvailabilityRangeReservationsStatusDto> {
    return this.httpClient.get<AvailabilityRangeReservationsStatusDto>(
      `${environment.apiHost}accommodations/${accommodationId}/availabilities?fromDate=${fromDate}&toDate=${toDate}`,
    );
  }

  updateAccommodationAvailabilityPricing(
    accommodationId: number,
    accommodationData: AccommodationAvailabilityPricingDto,
  ): Observable<AccommodationDetailsDto> {
    return this.httpClient.put<AccommodationDetailsDto>(
      'environment.apiHost' +
        'accommodations/' +
        accommodationId +
        '/availability-pricing',
      accommodationData,
    );
  }
}
