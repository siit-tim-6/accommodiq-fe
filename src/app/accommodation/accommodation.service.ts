import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../env/env';
import {
  Accommodation,
  AccommodationAvailabilityPricingDto,
  AccommodationBookingDetailFormDto,
  AccommodationBookingDetailsDto,
  AccommodationCreateDto,
  AccommodationDetailsDto,
  AccommodationFormData,
  Availability,
  AvailabilityDto,
  AvailabilityRangeReservationsStatusDto,
  MessageDto,
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

  getAccommodationBookingDetails(
    accommodationId: number,
  ): Observable<AccommodationBookingDetailFormDto> {
    return this.httpClient.get<AccommodationBookingDetailFormDto>(
      `${environment.apiHost}accommodations/${accommodationId}/booking-details`,
    );
  }

  updateAccommodationBookingDetails(
    accommodationId: number,
    accommodationData: AccommodationBookingDetailsDto,
  ): Observable<AccommodationDetailsDto> {
    return this.httpClient.put<AccommodationDetailsDto>(
      'environment.apiHost' +
        'accommodations/' +
        accommodationId +
        '/booking-details',
      accommodationData,
    );
  }

  addAccommodationAvailability(
    accommodationId: number,
    availabilityData: AvailabilityDto,
  ): Observable<Availability[]> {
    return this.httpClient.post<Availability[]>(
      `${environment.apiHost}accommodations/${accommodationId}/availabilities`,
      availabilityData,
    );
  }

  removeAccommodationAvailability(
    accommodationId: number,
    availabilityId: number,
  ): Observable<MessageDto> {
    return this.httpClient.delete<MessageDto>(
      `${environment.apiHost}accommodations/${accommodationId}/availabilities/${availabilityId}`,
    );
  }
}
