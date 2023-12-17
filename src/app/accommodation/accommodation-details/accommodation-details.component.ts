import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { AccommodationDetails } from '../accommodation.model';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrl: './accommodation-details.component.css',
})
export class AccommodationDetailsComponent implements OnInit {
  accommodationDetails!: AccommodationDetails;

  images: string[] = [
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
  ];

  rangeDates: Date[] | undefined;
  guests: number | string | undefined;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
  ) {
    accommodationService.rangeDatesSearch.subscribe((rangeDates) => {
      this.rangeDates = rangeDates;
    });

    accommodationService.guestsSearch.subscribe((guests) => {
      this.guests = guests;
    });
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
  }
}
