import { Component, Input } from '@angular/core';
import { Accommodation } from '../accommodation.model';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrl: './accommodation-card.component.css',
})
export class AccommodationCardComponent {
  @Input() accommodation!: Accommodation;
  @Input() dateRange: Date[] | undefined;
  @Input() guests: number | string | undefined;
  protected readonly Math = Math;
}
