import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../accommodation.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccommodationDetails} from "../accommodation-details.model";

@Component({
  selector: 'app-accommodation-update',
  templateUrl: './accommodation-update.component.html',
  styleUrl: './accommodation-update.component.css'
})
export class AccommodationUpdateComponent{
  accommodation!: AccommodationDetails;
  accommodationLoaded!: Promise<boolean>;

  constructor(private accommodationService: AccommodationService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params: Params) => {
      const accommodationId = +params['accommodationId'];
      this.accommodationService
        .getAccommodation(accommodationId)
        .subscribe( {
          next: (accommodationDetails: AccommodationDetails) => {
            this.accommodation = accommodationDetails;
            this.accommodationLoaded = Promise.resolve(true)
            alert(true)
          },
          error: (_) => {
            this.router.navigate(["search"]);
          }
        });
    });
  }

  ngOnInit(): void {

  }


}
