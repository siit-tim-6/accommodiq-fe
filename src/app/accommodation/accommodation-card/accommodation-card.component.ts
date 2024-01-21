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
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService,
  ) {}

  onClick(status: AccommodationStatus, event: MouseEvent) {
    event.stopPropagation();
    this.accommodationService
      .changeAccommodationStatus(this.accommodation.id, status)
      .subscribe({
        next: (_) => {
          this.modifiedSuccessfully.emit(this.accommodation.id);
        },
        error: (error) => console.log(error), // Snackbar later
      });
  }

  modifyFavorite(event: MouseEvent) {
    event.stopPropagation();
    if (this.isFavorite) {
      this.accommodationService
        .removeGuestFavoriteAccommodation(this.accommodation.id)
        .subscribe({
          next: (_) => {
            this.isFavorite = !this.isFavorite;
            this.removedFromFavorites.emit(this.accommodation.id);
            this.messageService.add({
              severity: 'error',
              summary: 'Removed from favorites!',
            });
          },
          error: (error) => console.log(error), // Snackbar later
        });
    } else {
      this.accommodationService
        .addGuestFavoriteAccommodation({ favoriteId: this.accommodation.id })
        .subscribe({
          next: (_) => {
            this.isFavorite = !this.isFavorite;
            this.messageService.add({
              severity: 'success',
              summary: 'Added to favorites!',
            });
          },
          error: (error) => console.log(error), // Snackbar later
        });
    }
  }

  isUserGuest() {
    return this.jwtService.getRole() === AccountRole.GUEST;
  }

  toCommaSep(arr: string[]) {
    if (arr != undefined) return arr.join(', ');
    return '';
  }
}
