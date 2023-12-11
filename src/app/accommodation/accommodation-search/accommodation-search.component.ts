import { Component, EventEmitter, Output } from '@angular/core';
import { SearchParams } from '../search-params.model';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-accommodation-search',
  templateUrl: './accommodation-search.component.html',
  styleUrl: './accommodation-search.component.css',
})
export class AccommodationSearchComponent {
  accommodationTypes: string[] = [
    'Luxurious Hotel Suite',
    'Cozy Mountain Cabin',
    'Beachfront Villa',
    'Trendy Urban Loft',
    'Quaint Bed and Breakfast',
    'Modern City Apartment',
    'Rustic Country Cottage',
    'Boutique Guesthouse',
    'Treehouse Retreat',
    'Floating Houseboat',
  ];
  benefits: string[] = [
    'Air Conditioning',
    'Fully Equipped Kitchen',
    'Complimentary Breakfast',
    'Private Balcony',
    'Spa Facilities',
    'On-site Gym',
    'Scenic Views',
    'Pet-friendly',
    '24/7 Concierge Service',
  ];

  location: string = '';
  rangeDates: Date[] | undefined;
  guests!: number;
  title: string = '';
  minPrice!: number;
  maxPrice!: number;
  selectedAccommodationType: string = '';
  selectedBenefits!: string[];

  @Output()
  onSearch = new EventEmitter<SearchParams>();

  @Output()
  onClear = new EventEmitter<never>();

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
  }

  clear() {
    this.location = '';
    this.title = '';
    this.rangeDates = undefined;
    this.onClear.emit();
  }

  clearDropdown(dropdown: Dropdown, event: Event) {
    this.selectedAccommodationType = '';
    dropdown.clear(event);
  }
}
