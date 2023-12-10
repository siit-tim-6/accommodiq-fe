import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {environment} from "../../env/env";
import {
  Accommodation,
  AccommodationCreateDto,
  AccommodationDetailsDto,
  AccommodationFormData,
  AvailabilityDto, PricingType
} from "./accommodation.model";

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

  createAccommodationWithImages(hostId: number,
                                formData: AccommodationFormData,
                                availabilityRanges: AvailabilityDto[],
                                images: File[]): Observable<AccommodationDetailsDto> {
    return this.uploadImages(images).pipe(
      switchMap((uploadedImagePaths: string[]) => {
        const accommodationData: AccommodationCreateDto = {
          title: formData.name,
          description: formData.description,
          location: formData.location,
          minGuests: formData.minGuests,
          maxGuests: formData.maxGuests,
          available: availabilityRanges,
          pricingType: formData.pricePerGuest ? PricingType.PerGuest : PricingType.PerNight,
          automaticAcceptance: formData.automaticallyAcceptIncomingReservations,
          images: uploadedImagePaths
        };
        return this.createNewAccommodation(hostId, accommodationData);
      }),
      catchError(error => {
        // Handle errors here or rethrow to be handled in component
        console.error('Error in accommodation creation process:', error);
        return throwError(error);
      })
    );
  }


  createNewAccommodation(hostId: number, data: AccommodationCreateDto): Observable<AccommodationDetailsDto> {
    return this.httpClient.post<AccommodationDetailsDto>(environment.apiHost + 'hosts/' + 1 + "/accommodations", data) // change later with JWT
  }

  uploadImages(files: File[]): Observable<string[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return this.httpClient.post<string[]>(environment.apiHost + 'images/upload', formData);
  }
}
