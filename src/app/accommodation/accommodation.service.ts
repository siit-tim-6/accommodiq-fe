import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../env/env';
import {
  Accommodation,
  AccommodationBookingDetailFormDto,
  AccommodationBookingDetailsDto,
  AccommodationCreateDto,
  AccommodationDetailsDto,
  AccommodationFormData,
  Availability,
  AvailabilityDto,
  MessageDto,
  PricingType,
} from './accommodation.model';
import { AccommodationDetails } from './accommodation-details.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { useAnimation } from '@angular/animations';

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

  getAccommodation(id: number): Observable<AccommodationDetails> {
    return this.httpClient.get<AccommodationDetails>(
      environment.apiHost + 'accommodations/' + id,
    );
  }

  getHostsAccommodations(): Observable<Accommodation[]> {
    console.log('TU SAM');
    return this.httpClient.get<Accommodation[]>(
      environment.apiHost + 'hosts/accommodations',
    );
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

  createAccommodation(
    formData: AccommodationFormData,
    availabilityRanges: AvailabilityDto[],
    images: File[],
  ): Observable<AccommodationDetailsDto> {
    console.log(formData);
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
          type: formData.apartmentType,
          benefits: formData.benefits,
        };
        console.log(accommodationData.benefits);
        return this.httpClient.post<AccommodationDetailsDto>(
          environment.apiHost + 'hosts/' + 'accommodations',
          accommodationData,
        );
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
      environment.apiHost + 'images',
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
  ): Observable<AccommodationBookingDetailsDto> {
    return this.httpClient.put<AccommodationBookingDetailsDto>(
      environment.apiHost +
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
