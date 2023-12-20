import { Component } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccommodationAdvancedDetails } from '../accommodation-details.model';

@Component({
  selector: 'app-accommodation-update',
  templateUrl: './accommodation-update.component.html',
  styleUrl: './accommodation-update.component.css',
})
export class AccommodationUpdateComponent {
  accommodation!: AccommodationAdvancedDetails;
  accommodationLoaded!: Promise<boolean>;

  constructor(
    private accommodationService: AccommodationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe((params: Params) => {
      const accommodationId = +params['accommodationId'];
      this.accommodationService
        .getAccommodationAdvancedDetails(accommodationId)
        .subscribe({
          next: (accommodationDetails) => {
            this.accommodation = accommodationDetails;
            this.accommodationLoaded = Promise.resolve(true);
          },
          error: (_) => {
            this.router.navigate(['search']);
          },
        });
    });
  }

  ngOnInit(): void {}
}
