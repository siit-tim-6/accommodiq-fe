import {Component} from '@angular/core';

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
  availabilityPeriods: RentalPeriod[] = [];
  currentAvailabilityPeriod: RentalPeriod = {
    startDate: new Date(),
    endDate: new Date(),
    price: 0
  };
  pickedDates?: Date[];

  ngOnInit(): void {
    this.apartmentTypes = ['Entire apartment', 'Private room', 'Shared room', 'Hotel room'];
    console.log(this.apartmentTypes);
  }

  addRentalPeriod() {
    // Validate the input
    if (this.currentAvailabilityPeriod.startDate && this.currentAvailabilityPeriod.endDate && this.currentAvailabilityPeriod.price) {
      // Add the current period to the list
      this.availabilityPeriods.push({...this.currentAvailabilityPeriod});

      // Clear the current period
      this.currentAvailabilityPeriod = {
        startDate: new Date(),
        endDate: new Date(),
        price: 0
      };
    }
  }

  onSubmit() {
    console.log(this.pickedDates);
  }

  onUpload($event: any) {
    console.log("onUpload");
  }

  addRange() {
    if (this.pickedDates && this.currentAvailabilityPeriod.price) {
      const newPeriod : RentalPeriod = {
        startDate: this.pickedDates[0],
        endDate: this.pickedDates[1],
        price: this.currentAvailabilityPeriod.price
      };

      this.availabilityPeriods.push(newPeriod);

      // Clear input fields
      this.pickedDates = [];
      this.currentAvailabilityPeriod.price = 0;
    }
  }

  removeRange(index: number) {
    this.availabilityPeriods.splice(index, 1);
  }
}
