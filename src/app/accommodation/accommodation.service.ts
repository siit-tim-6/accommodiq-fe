import {
  BehaviorSubject,
  catchError,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';
import {
  Accommodation,
  AccommodationCreateDto,
  AccommodationDetails,
  AccommodationDetailsDto,
  AccommodationFormData,
  AvailabilityDto,
  PricingType,
} from './accommodation.model';
import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { useAnimation } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private accommodationList: Accommodation[] = [];
  private rangeDatesSearchSubject$ = new BehaviorSubject<Date[] | undefined>(
    undefined,
  );
  private guestsSearchSubject$ = new BehaviorSubject<
    number | string | undefined
  >(undefined);

  rangeDatesSearch = this.rangeDatesSearchSubject$.asObservable();
  guestsSearch = this.guestsSearchSubject$.asObservable();

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
      environment.apiHost + 'images',
      formData,
    );
  }

  updateRangeDatesSearch(rangeDates: Date[] | undefined) {
    this.rangeDatesSearchSubject$.next(rangeDates);
  }

  updateGuestsSearch(guests: string | number | undefined) {
    this.guestsSearchSubject$.next(guests);
  }
}
