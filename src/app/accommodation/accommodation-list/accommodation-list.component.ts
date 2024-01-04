import { Component, OnInit } from '@angular/core';
import { Accommodation, SearchParams } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { getTimestampSeconds } from '../../utils/date.utils';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { keys } from '../../../env/keys';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css',
})
export class AccommodationListComponent implements OnInit {
  private httpClient: HttpClient;
  elements: Accommodation[] = [];
  savedSearchTriggered: boolean = false;
  apiLoaded: Observable<boolean>;

  constructor(
    private service: AccommodationService,
    private httpBackend: JsonpClientBackend,
  ) {
    this.httpClient = new HttpClient(httpBackend);
    this.apiLoaded = this.httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${keys.googleMaps}`,
        'callback',
      )
      .pipe(
        map(() => true),
        catchError((error) => {
          console.log(error);
          return of(false);
        }),
      );
  }

  ngOnInit(): void {
    this.service.getAll().subscribe((accommodations: Accommodation[]) => {
      if (!this.savedSearchTriggered) this.elements = accommodations;
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
