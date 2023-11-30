import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrl: './accommodation-details.component.css',
})
export class AccommodationDetailsComponent {
  images: string[] = [
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
    '../../../assets/images/accommodation-image.png',
  ];
}
