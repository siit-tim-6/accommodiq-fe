import { Component } from '@angular/core';

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
  price: number | undefined;
  description: string | undefined;
  benefits: string[] | undefined;
  imageUrls: string[] | undefined;
  minGuests: number | undefined;
  maxGuests: number | undefined;
  apartmentType: string | undefined;
  pricePerGuest: boolean | undefined;
  automaticallyAcceptIncomingReservations: boolean | undefined;
  rentalPeriods: RentalPeriod[] = [];
  currentRentalPeriod: RentalPeriod = {
    startDate: new Date(),
    endDate: new Date(),
    price: 0
  };

  addRentalPeriod() {
    // Validate the input
    if (this.currentRentalPeriod.startDate && this.currentRentalPeriod.endDate && this.currentRentalPeriod.price) {
      // Add the current period to the list
      this.rentalPeriods.push({ ...this.currentRentalPeriod });

      // Clear the current period
      this.currentRentalPeriod = {
        startDate: new Date(),
        endDate: new Date(),
        price: 0
      };
    }
  }
  onSubmit() {
    console.log(this.name + " " + this.address + " " + this.price + " " + this.description)
  }
}
