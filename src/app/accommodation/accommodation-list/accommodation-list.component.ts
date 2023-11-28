import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css',
})
export class AccommodationListComponent {
  elements: any = [1, 2, 3, 4, 5];
}
