import { BehaviorSubject } from 'rxjs';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import {
  Accommodation,
  AccommodationBookingDetailFormDto,
  AccommodationAvailability,
  AccommodationBookingDetailsDto,
  AccommodationDetails,
  AccommodationModifyDto,
  AccommodationDetailsDto,
  AccommodationFormData,
  AccommodationTotalPrice,
  Availability,
  AvailabilityDto,
  MessageDto,
  AccommodationStatus,
  ReservationRequest,
  AccommodationAdvancedDetails,
  GuestFavorite,
} from './accommodation.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../env/env';
import { Injectable } from '@angular/core';
import { GeocodingService } from '../services/geocoding.service';
import { GeocoderResponse } from '../models/geocoder.model';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private rangeDatesSearchSubject$ = new BehaviorSubject<Date[] | undefined>(
    undefined,
  );
  private guestsSearchSubject$ = new BehaviorSubject<
    number | string | undefined
  >(undefined);

  rangeDatesSearch = this.rangeDatesSearchSubject$.asObservable();
  guestsSearch = this.guestsSearchSubject$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private geocodingService: GeocodingService,
  ) {}

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(
      `${environment.apiHost}accommodations`,
    );
  }

  getAccommodation(id: number): Observable<AccommodationDetails> {
    return this.httpClient.get<AccommodationDetails>(
      `${environment.apiHost}accommodations/${id}`,
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
    let uploadedImagePathsRes: string[];
    return this.uploadImages(images).pipe(
      switchMap((uploadedImagePaths: string[]) => {
        uploadedImagePathsRes = uploadedImagePaths;
        return this.geocodingService.getLocation(formData.location);
      }),
      switchMap((geocodingResults: GeocoderResponse) => {
        if (geocodingResults.results.length === 0) {
          return throwError('Invalid location.');
        }
        let coordinates = geocodingResults.results[0].geometry.location;
        const accommodationData: AccommodationModifyDto = {
          title: formData.name,
          description: formData.description,
          location: {
            address: geocodingResults.results[0].formatted_address,
            longitude: coordinates.lng as unknown as number,
            latitude: coordinates.lat as unknown as number,
          },
          minGuests: formData.minGuests,
          maxGuests: formData.maxGuests,
          automaticAcceptance: formData.automaticallyAcceptIncomingReservations,
          images: uploadedImagePathsRes,
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
    let uploadedImagePathsRes: string[];
    return this.uploadImages(images).pipe(
      switchMap((uploadedImagePaths: string[]) => {
        uploadedImagePathsRes = uploadedImagePaths;
        return this.geocodingService.getLocation(formData.location);
      }),
      switchMap((geocodingResults: GeocoderResponse) => {
        if (geocodingResults.results.length === 0) {
          return throwError('Invalid location.');
        }
        let coordinates = geocodingResults.results[0].geometry.location;
        const accommodationData: AccommodationModifyDto = {
          id: accommodationId,
          title: formData.name,
          description: formData.description,
          location: {
            address: geocodingResults.results[0].formatted_address,
            longitude: coordinates.lng as unknown as number,
            latitude: coordinates.lat as unknown as number,
          },
          minGuests: formData.minGuests,
          maxGuests: formData.maxGuests,
          automaticAcceptance: formData.automaticallyAcceptIncomingReservations,
          images: uploadedImagePathsRes,
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

  getTotalPrice(
    id: number,
    dateFrom: number,
    dateTo: number,
    guests: number | string,
  ): Observable<AccommodationTotalPrice> {
    return this.httpClient.get<AccommodationTotalPrice>(`
    ${environment.apiHost}accommodations/${id}/total-price?dateFrom=${dateFrom}&dateTo=${dateTo}&guests=${guests}
    `);
  }

  getIsAvailable(
    id: number,
    dateFrom: number,
    dateTo: number,
  ): Observable<AccommodationAvailability> {
    return this.httpClient.get<AccommodationAvailability>(
      `${environment.apiHost}accommodations/${id}/is-available?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );
  }

  updateRangeDatesSearch(rangeDates: Date[] | undefined) {
    this.rangeDatesSearchSubject$.next(rangeDates);
  }

  updateGuestsSearch(guests: string | number | undefined) {
    this.guestsSearchSubject$.next(guests);
  }
  getImage(filename: string): Observable<Blob> {
    return this.httpClient.get(`${environment.apiHost}images/${filename}`, {
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

  createReservation(
    reservation: ReservationRequest,
  ): Observable<ReservationRequest> {
    return this.httpClient.post<ReservationRequest>(
      `${environment.apiHost}guests/reservations`,
      reservation,
    );
  }

  getAccommodationAdvancedDetails(
    id: number,
  ): Observable<AccommodationAdvancedDetails> {
    return this.httpClient.get<AccommodationAdvancedDetails>(
      `${environment.apiHost}accommodations/${id}/advanced`,
    );
  }

  getGuestsFavoriteAccommodations(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(
      `${environment.apiHost}guests/favorites`,
    );
  }

  addGuestFavoriteAccommodation(
    favorite: GuestFavorite,
  ): Observable<Accommodation> {
    return this.httpClient.post<Accommodation>(
      `${environment.apiHost}guests/favorites`,
      favorite,
    );
  }

  removeGuestFavoriteAccommodation(id: number): Observable<MessageDto> {
    return this.httpClient.delete<MessageDto>(
      `${environment.apiHost}guests/favorites/${id}`,
    );
  }
}
