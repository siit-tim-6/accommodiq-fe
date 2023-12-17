import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(private accommodationService: AccommodationService) {}

  @Output()
  onSearch = new EventEmitter<SearchParams>();

  @Output()
  onClear = new EventEmitter<never>();

  ngOnInit(): void {
    this.accommodationService.updateRangeDatesSearch(this.rangeDates);
    this.accommodationService.updateGuestsSearch(this.guests);
  }

  search() {
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

    this.accommodationService.updateRangeDatesSearch(this.rangeDates);
    this.accommodationService.updateGuestsSearch(this.guests);
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
  }

  clearDropdown(dropdown: Dropdown, event: Event) {
    this.selectedAccommodationType = '';
    dropdown.clear(event);
  }
}
