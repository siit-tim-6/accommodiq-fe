import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Accommodation, AccommodationStatus } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrl: './accommodation-card.component.css',
})
export class AccommodationCardComponent {
  @Input() showAcceptanceButtons: boolean = false;
  @Input() accommodation!: Accommodation;
  @Output() modifiedSuccessfully = new EventEmitter<number>();
  protected readonly Math = Math;
  protected readonly AccommodationStatus = AccommodationStatus;

  constructor(private accommodationService: AccommodationService) {}

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
}
