import { Component, OnInit } from '@angular/core';
import { Accommodation, SearchParams } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css',
})
export class AccommodationListComponent implements OnInit {
  elements: Accommodation[] = [];
  dateRangeSearched: Date[] | undefined;
  guestsSearched: string | number | undefined;

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((accommodations: Accommodation[]) => {
      this.elements = accommodations;
    });
  }

  search(searchParams: SearchParams) {
    this.dateRangeSearched = searchParams.rangeDates;
    this.guestsSearched = searchParams.guests;

    let fromDate: number =
      searchParams.rangeDates === undefined || searchParams.rangeDates === null
        ? 0
        : searchParams.rangeDates[0].valueOf() / 1000;
    let toDate: number =
      searchParams.rangeDates === undefined || searchParams.rangeDates === null
        ? 0
        : searchParams.rangeDates[1].valueOf() / 1000;

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
