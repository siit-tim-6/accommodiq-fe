import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import {
  AccommodationDetails,
  AccommodationTotalPrice,
} from '../accommodation.model';
import { getTimestampSeconds } from '../../utils/date.utils';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrl: './accommodation-details.component.css',
})
export class AccommodationDetailsComponent implements OnInit {
  accommodationDetails: AccommodationDetails;

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

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
  ) {
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
    this.route.params.subscribe((params: Params) => {
      const accommodationId = +params['accommodationId'];
      this.accommodationService
        .getAccommodation(accommodationId)
        .subscribe((accommodationDetails: AccommodationDetails) => {
          this.accommodationDetails = accommodationDetails;
        });
    });

    this.accommodationService.rangeDatesSearch.subscribe((rangeDates) => {
      this.rangeDates = rangeDates;

      if (
        this.rangeDates !== undefined &&
        this.accommodationDetails.pricingType === 'PER_NIGHT'
      ) {
        this.updateTotalPrice(
          getTimestampSeconds(this.rangeDates[0]),
          getTimestampSeconds(this.rangeDates[1]),
          0,
        );
      } else if (
        this.rangeDates !== undefined &&
        this.guests !== undefined &&
        this.accommodationDetails.pricingType === 'PER_GUEST'
      ) {
        this.updateTotalPrice(
          getTimestampSeconds(this.rangeDates[0]),
          getTimestampSeconds(this.rangeDates[1]),
          this.guests,
        );
      }
    });

    this.accommodationService.guestsSearch.subscribe((guests) => {
      this.guests = guests;

      if (
        this.rangeDates !== undefined &&
        this.guests !== undefined &&
        this.accommodationDetails.pricingType === 'PER_GUEST'
      ) {
        this.updateTotalPrice(
          getTimestampSeconds(this.rangeDates[0]),
          getTimestampSeconds(this.rangeDates[1]),
          this.guests,
        );
      }
    });
  }

  private updateTotalPrice(
    fromDate: number,
    toDate: number,
    guests: number | string,
  ) {
    this.accommodationService
      .getTotalPrice(this.accommodationDetails.id, fromDate, toDate, guests)
      .subscribe((accommodationTotalPrice: AccommodationTotalPrice) => {
        this.totalPrice = accommodationTotalPrice.totalPrice;
      });
  }
}
