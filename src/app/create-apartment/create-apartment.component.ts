import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";

interface RentalPeriod {
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
  rentalPeriods: RentalPeriod[] = [];
  currentRentalPeriod: RentalPeriod = {
    startDate: new Date(),
    endDate: new Date(),
    price: 0
  };

  ngOnInit(): void {
    this.apartmentTypes = ['Entire apartment', 'Private room', 'Shared room', 'Hotel room'];
    console.log(this.apartmentTypes);
  }

  addRentalPeriod() {
    // Validate the input
    if (this.currentRentalPeriod.startDate && this.currentRentalPeriod.endDate && this.currentRentalPeriod.price) {
      // Add the current period to the list
      this.rentalPeriods.push({...this.currentRentalPeriod});

      // Clear the current period
      this.currentRentalPeriod = {
        startDate: new Date(),
        endDate: new Date(),
        price: 0
      };
    }
  }

  onSubmit() {
    console.log(this.name + " " + this.address  + " " + this.description + " " + this.benefits + " "
      + this.imageUrls + " " + this.minGuests + " " + this.maxGuests + " " + this.apartmentType + " " + this.pricePerGuest
      + " " + this.automaticallyAcceptIncomingReservations + " " + this.rentalPeriods);
  }

  onUpload($event: any) {
    console.log("onUpload");
  }
}
