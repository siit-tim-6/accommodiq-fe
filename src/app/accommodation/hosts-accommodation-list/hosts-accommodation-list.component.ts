import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { keys } from '../../../env/keys';

@Component({
  selector: 'app-hosts-accommodation-list',
  templateUrl: './hosts-accommodation-list.component.html',
  styleUrl: './hosts-accommodation-list.component.css',
})
export class HostsAccommodationListComponent implements OnInit {
  private httpClient: HttpClient;
  elements: Accommodation[] = [];
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
    this.service
      .getHostsAccommodations()
      .subscribe((accommodations: Accommodation[]) => {
        this.elements = accommodations;
      });
  }
}
