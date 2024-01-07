import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { Marker } from '../../infrastructure/gmaps/gmaps.model';

@Component({
  selector: 'app-admin-review-list',
  templateUrl: './admin-review-list.component.html',
  styleUrl:
    '../hosts-accommodation-list/hosts-accommodation-list.component.css',
})
export class AdminReviewListComponent implements OnInit {
  accommodations: Accommodation[] = [];
  apiLoaded: boolean = false;

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.service
      .getPendingAccommodations()
      .subscribe((accommodations: Accommodation[]) => {
        this.accommodations = accommodations;
      });
  }

  onModifiedSuccessfully(id: number) {
    this.accommodations = this.accommodations.filter((acc) => acc.id !== id);
  }

  protected getMarkers(): Marker[] {
    return this.accommodations.map((accommodation) => {
      return {
        label: accommodation.title,
        latitude: accommodation.location.latitude,
        longitude: accommodation.location.longitude,
      };
    });
  }
}
