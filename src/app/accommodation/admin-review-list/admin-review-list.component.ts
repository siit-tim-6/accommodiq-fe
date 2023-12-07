import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../accommodation.model";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-admin-review-list',
  templateUrl: './admin-review-list.component.html',
  styleUrl: '../hosts-accommodation-list/hosts-accommodation-list.component.css'
})
export class AdminReviewListComponent implements OnInit{
  elements: Accommodation[] = [];

  constructor(private service: AccommodationService) {

  }

  ngOnInit(): void {
    this.service.getHostsAccommodations().subscribe((accommodations: any[])=>{
      this.elements = accommodations;
    })
  }
}
