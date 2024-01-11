import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import {
  AccommodationDetails,
  AccommodationTotalPrice,
} from '../accommodation.model';
import { getTimestampSeconds } from '../../utils/date.utils';
import { Marker } from '../../infrastructure/gmaps/gmaps.model';
import {
  EMPTY,
  Subscription,
  of,
  switchMap,
  catchError,
  throwError,
} from 'rxjs';
import { AccountRole } from '../../account/account-info/account.model';
import { MessageService } from 'primeng/api';
import { environment } from '../../../env/env';
import { JwtService } from '../../infrastructure/auth/jwt.service';
import {
  ReviewBaseInfo,
  ReviewDto,
  ReviewRequest,
} from '../../review/review.model';
import { ReviewService } from '../../review/review.service';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrl: './accommodation-details.component.css',
})
export class AccommodationDetailsComponent implements OnInit, OnDestroy {
  apiLoaded: boolean = false;

  accommodationId: number;
  accommodationDetails: AccommodationDetails;
  subscription?: Subscription;
  accommodationImages: string[];
  canAddReview: boolean = true;
  canReport: boolean = false;

  rangeDates: Date[] | undefined;
  guests: number | string | undefined;
  totalPrice: number | undefined;

  today: Date = new Date();
  positiveInteger: RegExp = /^[1-9]\d*$/;
  accommodationAvailable: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private accommodationService: AccommodationService,
    private messageService: MessageService,
    private reviewService: ReviewService,
    private router: Router,
  ) {
    this.canAddReview = this.jwtService.getRole() === AccountRole.GUEST;
    this.accommodationId = 0;
    this.accommodationDetails = {
      id: 0,
      title: '',
      rating: 0,
      reviewCount: 0,
      location: {
        address: '',
        latitude: 0,
        longitude: 0,
      },
      host: {
        id: 0,
        name: '',
        rating: 0,
        reviewCount: 0,
      },
      images: [],
      minGuests: 0,
      maxGuests: 0,
      description: '',
      reviews: [],
      benefits: [],
      type: '',
      minPrice: 0,
      pricingType: '',
    };
    this.accommodationImages = [];
  }

  ngOnInit(): void {
    const observable = this.route.params.pipe(
      switchMap((params) => {
        return of(+params['accommodationId']);
      }),
      switchMap((id: number) => {
        this.accommodationId = id;
        return this.accommodationService.getAccommodation(this.accommodationId);
      }),
      switchMap((accommodation: AccommodationDetails) => {
        this.accommodationDetails = accommodation;
        console.log(this.accommodationDetails);
        if (
          this.jwtService.getRole() === AccountRole.HOST &&
          this.accommodationDetails.host.id === this.jwtService.getUserId()
        ) {
          this.canReport = true;
        }
        this.populateFullImagePaths();
        return this.accommodationService.rangeDatesSearch;
      }),
      switchMap((rangeDates: Date[] | undefined) => {
        this.rangeDates = rangeDates;
        return this.accommodationService.guestsSearch;
      }),
      switchMap((guests: string | number | undefined) => {
        this.guests = guests;
        if (
          this.rangeDates !== undefined &&
          this.accommodationDetails.pricingType === 'PER_NIGHT'
        )
          return this.accommodationService.getTotalPrice(
            this.accommodationDetails.id,
            getTimestampSeconds(this.rangeDates[0]),
            getTimestampSeconds(this.rangeDates[1]),
            0,
          );
        else if (
          this.rangeDates !== undefined &&
          this.guests !== undefined &&
          this.accommodationDetails.pricingType === 'PER_GUEST'
        ) {
          return this.accommodationService.getTotalPrice(
            this.accommodationDetails.id,
            getTimestampSeconds(this.rangeDates[0]),
            getTimestampSeconds(this.rangeDates[1]),
            this.guests,
          );
        } else {
          return of({
            totalPrice: -1,
          });
        }
      }),
    );

    this.subscription = observable.subscribe(
      (accommodationTotalPrice: AccommodationTotalPrice) => {
        if (accommodationTotalPrice.totalPrice != -1) {
          this.totalPrice = accommodationTotalPrice.totalPrice;
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  calendarBlur() {
    if (
      this.rangeDates !== undefined &&
      this.isRangeDatesValid() &&
      this.accommodationDetails.pricingType === 'PER_NIGHT'
    ) {
      this.getPriceObservable().subscribe((accommodationTotalPrice) => {
        if (accommodationTotalPrice !== undefined)
          this.totalPrice = accommodationTotalPrice.totalPrice;
      });
    } else if (
      this.rangeDates !== undefined &&
      this.isRangeDatesValid() &&
      this.accommodationDetails.pricingType === 'PER_GUEST' &&
      this.guests !== undefined &&
      this.isGuestsValid()
    ) {
      this.getPriceObservable().subscribe((accommodationTotalPrice) => {
        if (accommodationTotalPrice !== undefined)
          this.totalPrice = accommodationTotalPrice.totalPrice;
      });
    }
  }

  guestsChange() {
    if (
      this.rangeDates !== undefined &&
      this.isRangeDatesValid() &&
      this.guests !== undefined &&
      this.isGuestsValid()
    ) {
      this.getPriceObservable().subscribe((accommodationTotalPrice) => {
        if (accommodationTotalPrice !== undefined)
          this.totalPrice = accommodationTotalPrice.totalPrice;
      });
    }
  }

  private isGuestsValid() {
    if (this.guests !== undefined)
      return (
        +this.guests >= this.accommodationDetails.minGuests &&
        +this.guests <= this.accommodationDetails.maxGuests
      );
    return false;
  }

  private isRangeDatesValid() {
    if (this.rangeDates !== undefined)
      return (
        this.rangeDates.length === 2 &&
        this.rangeDates[0] != null &&
        this.rangeDates[1] !== null
      );
    return false;
  }

  getButtonError() {
    if (!this.isGuestsValid()) {
      return `Guests field is required and must be in range ${this.accommodationDetails.minGuests}-${this.accommodationDetails.maxGuests}.`;
    }

    if (!this.isRangeDatesValid()) {
      return 'Date range is required.';
    }

    if (!this.accommodationAvailable) {
      return 'Accommodation is not available within selected date range.';
    }

    if (
      this.jwtService.getRole() == null ||
      this.jwtService.getRole() !== 'GUEST'
    ) {
      return 'You must be a logged-in guest.';
    }

    return '';
  }

  canMakeReservation() {
    return (
      this.isGuestsValid() &&
      this.isRangeDatesValid() &&
      this.accommodationAvailable &&
      this.jwtService.getRole() !== null &&
      this.jwtService.getRole() === 'GUEST'
    );
  }

  private getPriceObservable() {
    this.accommodationAvailable = false;

    return this.accommodationService
      .getIsAvailable(
        this.accommodationDetails.id,
        getTimestampSeconds(
          this.rangeDates === undefined ? new Date() : this.rangeDates[0],
        ),
        getTimestampSeconds(
          this.rangeDates === undefined ? new Date() : this.rangeDates[1],
        ),
      )
      .pipe(
        switchMap((accommodationAvailability) => {
          this.accommodationAvailable = accommodationAvailability.available;
          if (this.accommodationAvailable) {
            return this.accommodationService.getTotalPrice(
              this.accommodationDetails.id,
              getTimestampSeconds(
                this.rangeDates === undefined ? new Date() : this.rangeDates[0],
              ),
              getTimestampSeconds(
                this.rangeDates === undefined ? new Date() : this.rangeDates[1],
              ),
              this.guests === undefined ? 0 : this.guests,
            );
          } else {
            return EMPTY;
          }
        }),
      );
  }

  makeReservation() {
    let userId = this.jwtService.getUserId();
    if (
      userId !== null &&
      this.rangeDates !== undefined &&
      this.guests !== undefined
    ) {
      this.accommodationService
        .createReservation(userId, {
          accommodationId: this.accommodationId,
          startDate: getTimestampSeconds(this.rangeDates[0]),
          endDate: getTimestampSeconds(this.rangeDates[1]),
          numberOfGuests: +this.guests,
        })
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Reservation Success',
              detail: 'Reservation created successfully.',
            });
            // Optional: Navigate to a confirmation or success page
            // this.router.navigate(['/reservation-success']);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Reservation Error',
              detail: 'You already have an overlapping reservation.',
            });
          },
        });
    }
  }

  private populateFullImagePaths() {
    this.accommodationImages = this.accommodationDetails.images.map(
      (imageName) => environment.imageBase + imageName,
    );
  }

  protected getMarkers(): Marker[] {
    return [
      {
        label: this.accommodationDetails.title,
        latitude: this.accommodationDetails.location.latitude,
        longitude: this.accommodationDetails.location.longitude,
      },
    ];
  }

  handleReviewSubmission(review: ReviewRequest) {
    this.reviewService
      .addAccommodationReview(this.accommodationId, review)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Error adding accommodation review';
          if (
            error.status === 403 &&
            error.error.message.includes('Guest cannot review')
          ) {
            errorMessage = error.error.message; // Specific error message
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });
          return throwError(error);
        }),
      )
      .subscribe((reviewDto) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Review added successfully',
        });
      });
  }

  handleDeleteReview(reviewId: number) {
    this.reviewService
      .deleteReview(reviewId)
      .pipe(
        catchError((error) => {
          console.error('Error deleting review', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error deleting review',
          });
          return throwError(error);
        }),
      )
      .subscribe((messageDto) => {
        this.accommodationDetails.reviews =
          this.accommodationDetails.reviews.filter(
            (review) => review.id !== reviewId,
          );
        this.accommodationDetails.reviewCount--;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Review deleted successfully',
        });
        this.calculateAverageRatingAndCount();
      });
  }

  handleReportReview(reviewId: number) {
    this.reviewService
      .reportReview(reviewId)
      .pipe(
        catchError((error) => {
          console.error('Error reporting review', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error reporting review',
          });
          return throwError(() => new Error('Error reporting review'));
        }),
      )
      .subscribe((messageDto) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Review reported successfully',
        });
      });
  }

  private calculateAverageRatingAndCount(): void {
    if (this.accommodationDetails.reviews.length > 0) {
      const totalRating = this.accommodationDetails.reviews.reduce(
        (acc: number, review: ReviewBaseInfo) => acc + review.rating,
        0,
      );
      // Calculate average and round to one decimal place
      this.accommodationDetails.rating = +(
        totalRating / this.accommodationDetails.reviews.length
      ).toFixed(1);
    } else {
      this.accommodationDetails.rating = 0;
    }
  }

  redirectToHostProfile(id: number) {
    this.router.navigate(['/profile-account', id]).then((r) => console.log(r));
  }
}
