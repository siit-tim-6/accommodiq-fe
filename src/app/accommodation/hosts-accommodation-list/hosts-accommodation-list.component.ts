import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../accommodation.model";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-hosts-accommodation-list',
  templateUrl: './hosts-accommodation-list.component.html',
  styleUrl: './hosts-accommodation-list.component.css'
})
export class HostsAccommodationListComponent implements OnInit{
  elements: Accommodation[] = [];

  constructor(private service: AccommodationService) {

  }

  ngOnInit(): void {
    this.service.getHostsAccommodations().subscribe((accommodations: any[])=>{
      this.elements = accommodations;
    })
  }
}
