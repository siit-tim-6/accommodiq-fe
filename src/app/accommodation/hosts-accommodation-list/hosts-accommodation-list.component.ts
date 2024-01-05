import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { GmapsService } from '../../services/gmaps.service';

@Component({
  selector: 'app-hosts-accommodation-list',
  templateUrl: './hosts-accommodation-list.component.html',
  styleUrl: './hosts-accommodation-list.component.css',
})
export class HostsAccommodationListComponent implements OnInit {
  elements: Accommodation[] = [];
  apiLoaded: boolean = false;

  constructor(
    private service: AccommodationService,
    private gmaps: GmapsService,
  ) {}

  ngOnInit(): void {
    this.service
      .getHostsAccommodations()
      .subscribe((accommodations: Accommodation[]) => {
        this.elements = accommodations;
      });
    this.gmaps.apiLoaded$.subscribe((loaded) => {
      if (!loaded) {
        this.gmaps.loadMaps();
      }
      this.apiLoaded = loaded;
    });
  }
}
