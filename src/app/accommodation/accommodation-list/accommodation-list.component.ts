import { Component, OnInit } from '@angular/core';
import { Accommodation, SearchParams } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { getTimestampSeconds } from '../../utils/date.utils';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css',
})
export class AccommodationListComponent implements OnInit {
  elements: Accommodation[] = [];
  dateRangeSearched: Date[] | undefined;
  guestsSearched: string | number | undefined;
  savedSearchTriggered: boolean = false;

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((accommodations: Accommodation[]) => {
      if (!this.savedSearchTriggered) this.elements = accommodations;
    });
  }

  search(searchParams: SearchParams) {
    this.savedSearchTriggered = true;
    this.dateRangeSearched = searchParams.rangeDates;
    this.guestsSearched = searchParams.guests;

    let fromDate: number =
      searchParams.rangeDates === undefined || searchParams.rangeDates === null
        ? 0
        : getTimestampSeconds(searchParams.rangeDates[0]);
    let toDate: number =
      searchParams.rangeDates === undefined || searchParams.rangeDates === null
        ? 0
        : getTimestampSeconds(searchParams.rangeDates[1]);

    this.service
      .findByFilter(
        searchParams.location,
        fromDate,
        toDate,
        searchParams.title,
        searchParams.guests ?? -1,
        searchParams.minPrice ?? -1,
        searchParams.maxPrice ?? -1,
        searchParams.type,
        searchParams.benefits,
      )
      .subscribe((accommodations: Accommodation[]) => {
        this.elements = accommodations;
      });
  }

  clear() {
    this.service.getAll().subscribe((accommodations: Accommodation[]) => {
      this.elements = accommodations;
      this.dateRangeSearched = undefined;
      this.guestsSearched = undefined;
    });
  }
}
