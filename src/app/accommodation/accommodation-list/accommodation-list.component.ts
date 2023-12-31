import { Component, OnInit } from '@angular/core';
import { Accommodation, SearchParams } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { getTimestampSeconds } from '../../utils/date.utils';
import { JwtService } from '../../infrastructure/auth/jwt.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css',
})
export class AccommodationListComponent implements OnInit {
  elements: Accommodation[] = [];
  savedSearchTriggered: boolean = false;
  favorites: number[] = [];

  constructor(
    private service: AccommodationService,
    private jwtService: JwtService,
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((accommodations: Accommodation[]) => {
      if (!this.savedSearchTriggered) this.elements = accommodations;
      if (this.jwtService.getRole() === 'GUEST') {
        this.service
          .getGuestsFavoriteAccommodations()
          .subscribe((favorites: Accommodation[]) => {
            this.favorites = favorites.map((f) => f.id);
          });
      }
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

  isFavorite(el: Accommodation) {
    return this.favorites.includes(el.id);
  }
}
