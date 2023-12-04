import {Component} from '@angular/core';

interface RentalRange {
  startDate: Date;
  endDate: Date;
  price: number;
}

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrl: './accommodation-create.component.css'
})
export class AccommodationCreateComponent {
  name?: string;
  address?: string;
  description?: string;
  benefits?: string[];
  imageUrls: File[] = [];
  minGuests?: number;
  maxGuests?: number;
  apartmentType?: string;
  apartmentTypes?: string[];
  pricePerGuest?: boolean;
  automaticallyAcceptIncomingReservations?: boolean;
  availabilityRanges: RentalRange[] = [];
  price?: number;
  pickedDates?: Date[];

  ngOnInit(): void {
    this.apartmentTypes = ['Entire apartment', 'Private room', 'Shared room', 'Hotel room'];
    console.log(this.apartmentTypes);
  }

  onSubmit() {
    console.log(this.pickedDates);
  }

  onUpload($event: any) {
    console.log("onUpload");
  }

  addRange() {
    if (this.pickedDates && this.price) {
      const newRange : RentalRange = {
        startDate: this.pickedDates[0],
        endDate: this.pickedDates[1],
        price: this.price
      };

      this.availabilityRanges.push(newRange);

      // Clear input fields
      this.pickedDates = [];
      this.price = undefined;
    }
  }

  removeRange(index: number) {
    this.availabilityRanges.splice(index, 1);
  }
}
