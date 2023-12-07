import { Component, EventEmitter, Output } from '@angular/core';
import { SearchParams } from '../search-params.model';

@Component({
  selector: 'app-accommodation-search',
  templateUrl: './accommodation-search.component.html',
  styleUrl: './accommodation-search.component.css',
})
export class AccommodationSearchComponent {
  location: string = '';
  title: string = '';
  rangeDates: Date[] | undefined;

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
}
