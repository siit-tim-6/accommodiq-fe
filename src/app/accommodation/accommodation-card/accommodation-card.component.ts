import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Accommodation,
  AccommodationStatus,
  GuestFavorite,
} from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { environment } from '../../../env/env';
import { JwtService } from '../../infrastructure/auth/jwt.service';
import { AccountRole } from '../../account/account-info/account.model';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrl: './accommodation-card.component.css',
})
export class AccommodationCardComponent {
  @Input() showAcceptanceButtons: boolean = false;
  @Input() accommodation!: Accommodation;
  @Input() isFavorite: boolean = false;
  @Output() modifiedSuccessfully = new EventEmitter<number>();
  @Output() removedFromFavorites = new EventEmitter<number>();
  protected readonly Math = Math;
  protected readonly AccommodationStatus = AccommodationStatus;
  protected readonly imageBase = environment.imageBase;

  constructor(
    private accommodationService: AccommodationService,
    private jwtService: JwtService,
  ) {}

  onClick(status: AccommodationStatus) {
    this.accommodationService
      .changeAccommodationStatus(this.accommodation.id, status)
      .subscribe({
        next: (_) => {
          this.modifiedSuccessfully.emit(this.accommodation.id);
        },
        error: (error) => console.log(error), // Snackbar later
      });
  }

  modifyFavorite() {
    if (this.isFavorite) {
      this.accommodationService
        .removeGuestFavoriteAccommodation(this.accommodation.id)
        .subscribe({
          next: (_) => {
            this.isFavorite = !this.isFavorite;
            this.removedFromFavorites.emit(this.accommodation.id);
            alert('Removed from favorites');
          },
          error: (error) => console.log(error), // Snackbar later
        });
    } else {
      this.accommodationService
        .addGuestFavoriteAccommodation({ favoriteId: this.accommodation.id })
        .subscribe({
          next: (_) => {
            this.isFavorite = !this.isFavorite;
            alert('Added to favorites');
          },
          error: (error) => console.log(error), // Snackbar later
        });
    }
  }

  isUserGuest() {
    return this.jwtService.getRole() === AccountRole.GUEST;
  }
}
