import { catchError, Observable, switchMap, throwError } from 'rxjs';
import {
  Accommodation,
  AccommodationBookingDetailFormDto,
  AccommodationBookingDetailsDto,
  AccommodationModifyDto,
  AccommodationDetailsDto,
  AccommodationFormData,
  Availability,
  AvailabilityDto,
  MessageDto,
  AccommodationStatus,
} from './accommodation.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../env/env';
import {
  AccommodationAdvancedDetails,
  AccommodationDetails,
} from './accommodation-details.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(
      `${environment.apiHost}accommodations`,
    );
  }

  getAccommodation(id: number): Observable<AccommodationDetails> {
    return this.httpClient.get<AccommodationDetails>(
      `${environment.apiHost}'accommodations/${id}`,
    );
  }

  getHostsAccommodations(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(
      `${environment.apiHost}hosts/accommodations`,
    );
  }

  getPendingAccommodations(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(
      `${environment.apiHost}accommodations/pending`,
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
    images: File[],
  ): Observable<AccommodationDetailsDto> {
    console.log(formData);
    return this.uploadImages(images).pipe(
      switchMap((uploadedImagePaths: string[]) => {
        const accommodationData: AccommodationModifyDto = {
          title: formData.name,
          description: formData.description,
          location: formData.location,
          minGuests: formData.minGuests,
          maxGuests: formData.maxGuests,
          automaticAcceptance: formData.automaticallyAcceptIncomingReservations,
          images: uploadedImagePaths,
          type: formData.apartmentType,
          benefits: formData.benefits,
        };
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

  updateAccommodation(
    formData: AccommodationFormData,
    images: File[],
    accommodationId: number,
  ): Observable<HttpResponse<AccommodationDetailsDto>> {
    return this.uploadImages(images).pipe(
      switchMap((uploadedImagePaths: string[]) => {
        const accommodationData: AccommodationModifyDto = {
          id: accommodationId,
          title: formData.name,
          description: formData.description,
          location: formData.location,
          minGuests: formData.minGuests,
          maxGuests: formData.maxGuests,
          automaticAcceptance: formData.automaticallyAcceptIncomingReservations,
          images: uploadedImagePaths,
          type: formData.apartmentType,
          benefits: formData.benefits,
        };

        return this.httpClient.put<HttpResponse<AccommodationDetailsDto>>(
          environment.apiHost + 'accommodations',
          accommodationData,
        );
      }),
      catchError((error) => {
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

  getImage(filename: string): Observable<Blob> {
    return this.httpClient.get(`${environment.apiHost}/images/${filename}`, {
      responseType: 'blob',
    });
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

  changeAccommodationStatus(
    id: number,
    status: AccommodationStatus,
  ): Observable<HttpResponse<AccommodationDetails>> {
    return this.httpClient.put<HttpResponse<AccommodationDetails>>(
      `${environment.apiHost}accommodations/${id}/status`,
      { status: status },
    );
  }

  getAccommodationAdvancedDetails(
    id: number,
  ): Observable<AccommodationAdvancedDetails> {
    return this.httpClient.get<AccommodationAdvancedDetails>(
      `${environment.apiHost}accommodations/${id}/advanced`,
    );
  }
}
