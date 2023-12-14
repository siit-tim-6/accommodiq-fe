import { catchError, Observable, switchMap, throwError } from 'rxjs';
import {
  Accommodation,
  AccommodationCreateDto,
  AccommodationDetailsDto,
  AccommodationFormData,
  AvailabilityDto,
  PricingType,
} from './accommodation.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';

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
    hostId: number,
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
          environment.apiHost + 'hosts/' + hostId + '/accommodations',
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
}
