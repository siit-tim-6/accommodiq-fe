import {Component} from '@angular/core';

interface RentalRange {
  startDate: Date;
  endDate: Date;
  price: number;
}

@Component({
  selector: 'app-create-apartment',
  templateUrl: './create-apartment.component.html',
  styleUrl: './create-apartment.component.css'
})
export class CreateApartmentComponent {
  name: string | undefined;
  address: string | undefined;
  description: string | undefined;
  benefits: string[] | undefined;
  imageUrls: File[] = [];
  minGuests: number | undefined;
  maxGuests: number | undefined;
  apartmentType: string | undefined;
  apartmentTypes: string[] | undefined;
  pricePerGuest: boolean | undefined;
  automaticallyAcceptIncomingReservations: boolean | undefined;
  availabilityRanges: RentalRange[] = [];
  price: number | undefined;
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
