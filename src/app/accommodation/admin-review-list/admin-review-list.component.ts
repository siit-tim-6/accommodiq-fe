import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { GmapsService } from '../../services/gmaps.service';

@Component({
  selector: 'app-admin-review-list',
  templateUrl: './admin-review-list.component.html',
  styleUrl:
    '../hosts-accommodation-list/hosts-accommodation-list.component.css',
})
export class AdminReviewListComponent implements OnInit {
  accommodations: Accommodation[] = [];
  apiLoaded: boolean = false;

  constructor(
    private service: AccommodationService,
    private gmaps: GmapsService,
  ) {}

  ngOnInit(): void {
    this.service
      .getPendingAccommodations()
      .subscribe((accommodations: Accommodation[]) => {
        this.accommodations = accommodations;
      });
    this.gmaps.apiLoaded$.subscribe((loaded) => {
      if (!loaded) {
        this.gmaps.loadMaps();
      }
      this.apiLoaded = loaded;
    });
  }

  onModifiedSuccessfully(id: number) {
    this.accommodations = this.accommodations.filter((acc) => acc.id !== id);
  }
}
