import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { AccommodationService } from '../accommodation.service';
import { SearchParams } from '../accommodation.model';

@Component({
  selector: 'app-accommodation-search',
  templateUrl: './accommodation-search.component.html',
  styleUrl: './accommodation-search.component.css',
})
export class AccommodationSearchComponent implements OnInit {
  accommodationTypes: string[] = [
    'Apartment',
    'House',
    'Loft',
    'Cabin',
    'Luxurious Hotel Suite',
    'Beachfront Villa',
    'Quaint Bed and Breakfast',
    'Rustic Country Cottage',
    'Treehouse Retreat',
    'Floating Houseboat',
  ];
  benefits: string[] = [
    'Air Conditioning',
    'Free Wi-Fi',
    'Fitness Center',
    'Free Parking',
    'Swimming Pool',
    'Private Balcony',
    'Spa Facilities',
    'Pet-friendly',
    '24/7 Concierge Service',
  ];
  positiveInteger: RegExp = /^[1-9]\d*$/;

  location: string = '';
  rangeDates: Date[] | undefined;
  guests: string | number | undefined;
  title: string = '';
  minPrice: number | undefined;
  maxPrice: number | undefined;
  selectedAccommodationType: string = '';
  selectedBenefits: string[] = [];

  today: Date = new Date();

  constructor(private accommodationService: AccommodationService) {}

  @Input() numberOfAccommodations!: number;

  @Output()
  onSearch = new EventEmitter<SearchParams>();

  @Output()
  onClear = new EventEmitter<never>();

  ngOnInit(): void {
    let sessionLastSearched = sessionStorage.getItem('lastSearched');

    if (sessionLastSearched) {
      let lastSearched = JSON.parse(sessionLastSearched);
      this.populateSearchParams(lastSearched);
    }

    this.accommodationService.updateRangeDatesSearch(this.rangeDates);
    this.accommodationService.updateGuestsSearch(this.guests);

    if (sessionLastSearched) {
      this.onSearch.emit({
        location: this.location,
        rangeDates: this.rangeDates,
        guests: this.guests,
        title: this.title,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        type: this.selectedAccommodationType,
        benefits: this.selectedBenefits,
      });
    }
  }

  search() {
    let searchParams: SearchParams = {
      location: this.location,
      rangeDates: this.rangeDates,
      guests: this.guests,
      title: this.title,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      type: this.selectedAccommodationType,
      benefits: this.selectedBenefits,
    };

    this.onSearch.emit(searchParams);

    this.accommodationService.updateRangeDatesSearch(this.rangeDates);
    this.accommodationService.updateGuestsSearch(this.guests);

    sessionStorage.setItem('lastSearched', JSON.stringify(searchParams));
  }

  clear() {
    this.location = '';
    this.rangeDates = undefined;
    this.title = '';
    this.guests = undefined;
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.selectedAccommodationType = '';
    this.selectedBenefits = [];
    this.onClear.emit();

    this.accommodationService.updateRangeDatesSearch(this.rangeDates);
    this.accommodationService.updateGuestsSearch(this.guests);

    if (sessionStorage.getItem('lastSearched')) {
      sessionStorage.removeItem('lastSearched');
    }
  }

  clearDropdown(dropdown: Dropdown, event: Event) {
    this.selectedAccommodationType = '';
    dropdown.clear(event);
  }

  private populateSearchParams(searchParams: SearchParams) {
    this.location = searchParams.location;
    if (searchParams.rangeDates)
      this.rangeDates = [
        new Date(searchParams.rangeDates[0]),
        new Date(searchParams.rangeDates[1]),
      ];
    else this.rangeDates = undefined;
    this.title = searchParams.title;
    this.guests = searchParams.guests;
    this.minPrice = searchParams.minPrice;
    this.maxPrice = searchParams.maxPrice;
    this.selectedAccommodationType = searchParams.type;
    this.selectedBenefits = searchParams.benefits;
  }
}
