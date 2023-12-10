import { Component, EventEmitter, Output } from '@angular/core';
import { SearchParams } from '../search-params.model';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-accommodation-search',
  templateUrl: './accommodation-search.component.html',
  styleUrl: './accommodation-search.component.css',
})
export class AccommodationSearchComponent {
  accommodationTypes: String[] = [
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
  benefits: String[] = [
    'Free Wi-Fi',
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
  title: string = '';
  rangeDates: Date[] | undefined;
  selectedAccommodationType: string = '';
  selectedBenefits!: string[];

  @Output()
  onSearch = new EventEmitter<SearchParams>();

  @Output()
  onClear = new EventEmitter<never>();

  search() {
    this.onSearch.emit({
      title: this.title,
      location: this.location,
      rangeDates: this.rangeDates,
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
