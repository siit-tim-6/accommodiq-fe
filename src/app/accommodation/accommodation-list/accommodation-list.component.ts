import { Component, OnInit } from '@angular/core';
import { Accommodation, SearchParams } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { getTimestampSeconds } from '../../utils/date.utils';
import { GmapsService } from '../../services/gmaps.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css',
})
export class AccommodationListComponent implements OnInit {
  elements: Accommodation[] = [];
  savedSearchTriggered: boolean = false;
  apiLoaded: boolean = false;

  constructor(
    private service: AccommodationService,
    private gmaps: GmapsService,
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((accommodations: Accommodation[]) => {
      if (!this.savedSearchTriggered) this.elements = accommodations;
    });
    this.gmaps.apiLoaded$.subscribe((loaded) => {
      if (!loaded) {
        this.gmaps.loadMaps();
      }
      this.apiLoaded = loaded;
    });
  }

  search(searchParams: SearchParams) {
    this.savedSearchTriggered = true;

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
    });
  }
}
