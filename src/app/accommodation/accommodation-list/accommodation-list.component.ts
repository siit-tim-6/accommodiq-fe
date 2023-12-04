import { Component, OnInit } from '@angular/core';
import {Accommodation} from "../accommodation.model";
import { AccommodationService } from "../accommodation.service";

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css',
})
export class AccommodationListComponent implements OnInit{
  elements: Accommodation[] = [];

  constructor(private service: AccommodationService) {

  }

  ngOnInit(): void {
    console.log("Pozivam")
    this.service.getAll().subscribe((accommodations: any[])=>{
      this.elements = accommodations;
    })
  }
}
