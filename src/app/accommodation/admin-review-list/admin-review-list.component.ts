import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-admin-review-list',
  templateUrl: './admin-review-list.component.html',
  styleUrl:
    '../hosts-accommodation-list/hosts-accommodation-list.component.css',
})
export class AdminReviewListComponent implements OnInit {
  accommodations: Accommodation[] = [];

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.service
      .getPendingAccommodations()
      .subscribe((accommodations: Accommodation[]) => {
        this.accommodations = accommodations;
      });
  }

  onModifiedSuccessfully(id: number) {
    this.accommodations = this.accommodations.filter((acc) => acc.id !== id);
  }
}
