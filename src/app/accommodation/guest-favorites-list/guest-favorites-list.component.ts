import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guest-favorites-list',
  templateUrl: './guest-favorites-list.component.html',
  styleUrl: './guest-favorites-list.component.css',
})
export class GuestFavoritesListComponent implements OnInit {
  favoriteAccommodations: Accommodation[] = [];
  fetched = false;
  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.accommodationService
      .getGuestsFavoriteAccommodations()
      .subscribe((accommodations: Accommodation[]) => {
        this.favoriteAccommodations = accommodations;
        this.fetched = true;
      });
  }

  removeFromFavorites(id: number) {
    this.favoriteAccommodations = this.favoriteAccommodations.filter(
      (a) => a.id !== id,
    );
  }
}
