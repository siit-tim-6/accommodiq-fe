import {Component} from '@angular/core';
import {AccommodationCreateDto, AvailabilityDto, PricingType} from "../accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrl: './accommodation-create.component.css'
})
export class AccommodationCreateComponent {
  imageUrls: File[] = [];
  apartmentTypes?: string[];
  availabilityRanges: AvailabilityDto[] = [];
  formGroup: FormGroup;

  constructor(private accommodationService: AccommodationService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      minGuests: ['', Validators.required],
      maxGuests: ['', Validators.required],
      apartmentType: ['', Validators.required],
      pricePerGuest: [false],
      automaticallyAcceptIncomingReservations: [false],
      benefits: this.formBuilder.group({
        wifi: [false],
        kitchen: [false],
        parking: [false],
        ac: [false]
      }),
      pickedDates: [null],
      price: [null]
    })
  }

  ngOnInit(): void {
    this.apartmentTypes = ['Entire apartment', 'Private room', 'Shared room', 'Hotel room'];
    console.log(this.apartmentTypes);
  }

  onSubmit() {
    if (this.formGroup.valid) {

      const hostId = 1; // TODO: get from JWT

      const formData = this.formGroup.value;

      const accommodationData: AccommodationCreateDto = {
        title: formData.name,
        description: formData.description,
        location: formData.location,
        minGuests: formData.minGuests,
        maxGuests: formData.maxGuests,
        available: this.availabilityRanges,
        pricingType: formData.pricePerGuest ? PricingType.PerGuest : PricingType.PerNight,
        automaticAcceptance: formData.automaticallyAcceptIncomingReservations
      };

      console.log(accommodationData);

      this.accommodationService.createNewAccommodation(hostId, accommodationData)
        .subscribe({
          next: (accommodationDetails) => {
            console.log("Accommodation Created:" + accommodationDetails);
          },
          error: (error) => {
            console.log("Error creating accommodation:" + error);
          }
        })
    }else {
      console.log("Invalid form");
    }
  }

  onUpload($event: any) {
    console.log("onUpload");
  }

  addRange() {
    const formData = this.formGroup.value;

    if (formData.pickedDates && formData.price) {
      const newRange : AvailabilityDto = {
        fromDate: formData.pickedDates[0].getTime(),
        toDate: formData.pickedDates[1].getTime(),
        price: formData.price
      };

      this.availabilityRanges.push(newRange);

      // Clear input fields
      formData.pickedDates = [];
      formData.price = null;
    }
  }

  removeRange(index: number) {
    this.availabilityRanges.splice(index, 1);
  }
}
