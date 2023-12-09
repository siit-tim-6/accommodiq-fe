import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { SearchParams } from '../search-params.model';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css',
})
export class AccommodationListComponent implements OnInit {
  elements: Accommodation[] = [];

  test: String = "adfsdkfhfjkfhasdjklfhasdjklfhasdjklfhasdfjklasdhsdfjklhfjkashfjklasdhfasdjfklasdhfjkldfhsdjklfhsdjklfhasdjklfhsd";

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((accommodations: Accommodation[]) => {
      this.elements = accommodations;
    });
  }

  search({ title, location, rangeDates }: SearchParams) {
    let fromDate: number =
      rangeDates === undefined ? 0 : rangeDates[0].valueOf();
    let toDate: number = rangeDates === undefined ? 0 : rangeDates[1].valueOf();

    this.service
      .findByFilter(location, fromDate, toDate, title)
      .subscribe((accommodations: Accommodation[]) => {
        this.elements = accommodations;
      });
  }

  clear() {
    this.service.getAll().subscribe((accommodations: any[]) => {
      this.elements = accommodations;
    });
  }
}
