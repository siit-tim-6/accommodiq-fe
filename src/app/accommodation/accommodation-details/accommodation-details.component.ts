import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import {
  AccommodationDetails,
  AccommodationTotalPrice,
} from '../accommodation.model';
import { getTimestampSeconds } from '../../utils/date.utils';
import { EMPTY, Subscription, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrl: './accommodation-details.component.css',
})
export class AccommodationDetailsComponent implements OnInit, OnDestroy {
  accommodationId: number;
  accommodationDetails: AccommodationDetails;
  subscription?: Subscription;

  images: string[] = [
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
  ];

  rangeDates: Date[] | undefined;
  guests: number | string | undefined;
  totalPrice: number | undefined;

  today: Date = new Date();
  positiveInteger: RegExp = /^[1-9]\d*$/;
  accommodationAvailable: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
  ) {
    this.accommodationId = 0;
    this.accommodationDetails = {
      id: 0,
      title: '',
      rating: 0,
      reviewCount: 0,
      location: '',
      host: {
        id: 0,
        name: '',
        rating: 0,
        reviewCount: 0,
      },
      image: '',
      minGuests: 0,
      maxGuests: 0,
      description: '',
      reviews: [],
      benefits: [],
      type: '',
      minPrice: 0,
      pricingType: '',
    };
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

  areFieldsValid() {
    return (
      this.isGuestsValid() &&
      this.isRangeDatesValid() &&
      this.accommodationAvailable
    );
  }

  private getPriceObservable() {
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
    console.log('a');
    // code to make a reservation (api call)
  }
}
