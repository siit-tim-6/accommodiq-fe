import {Component} from '@angular/core';
import {AccommodationCreateDto, AvailabilityDto, PricingType} from "../accommodation.model";
import {AccommodationService} from "../accommodation.service";


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
  availabilityRanges: AvailabilityDto[] = [];
  price?: number;
  pickedDates?: Date[];

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.apartmentTypes = ['Entire apartment', 'Private room', 'Shared room', 'Hotel room'];
    console.log(this.apartmentTypes);
  }

  onSubmit() {
    const hostId = 1; // TODO: get from JWT

    const accommodationData: AccommodationCreateDto = {
      title: this.name || '',
      description: this.description || '',
      location: this.address || '',
      minGuests: this.minGuests || 1,
      maxGuests: this.maxGuests || 1,
      available: this.availabilityRanges,
      pricingType: this.pricePerGuest ? PricingType.PerGuest : PricingType.PerNight,
      automaticAcceptance: this.automaticallyAcceptIncomingReservations || false,
    };

    console.log(accommodationData);

    this.accommodationService.createNewAccommodation(hostId, accommodationData)
      .subscribe({
        next: (accommodationDetails) => {
          console.log(accommodationDetails);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  onUpload($event: any) {
    console.log("onUpload");
  }

  addRange() {
    if (this.pickedDates && this.price) {
      const newRange : AvailabilityDto = {
        fromDate: this.pickedDates[0].getTime(),
        toDate: this.pickedDates[1].getTime(),
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
