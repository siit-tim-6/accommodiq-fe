import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { Marker } from '../../infrastructure/gmaps/gmaps.model';

@Component({
  selector: 'app-hosts-accommodation-list',
  templateUrl: './hosts-accommodation-list.component.html',
  styleUrl: './hosts-accommodation-list.component.css',
})
export class HostsAccommodationListComponent implements OnInit {
  elements: Accommodation[] = [];
  apiLoaded: boolean = false;

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.service
      .getHostsAccommodations()
      .subscribe((accommodations: Accommodation[]) => {
        this.elements = accommodations;
      });
  }

  protected getMarkers(): Marker[] {
    return this.elements.map((el) => {
      return {
        label: el.title,
        latitude: el.location.latitude,
        longitude: el.location.longitude,
      };
    });
  }
}
