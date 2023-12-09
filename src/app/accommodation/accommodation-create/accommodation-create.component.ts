import {Component} from '@angular/core';
import {AccommodationCreateDto, AvailabilityDto, PricingType} from "../accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {FormValidators, FormUtils} from '../../utils/form-utils';


@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrl: './accommodation-create.component.css'
})
export class AccommodationCreateComponent {
  apartmentTypes: string[] = ['Entire apartment', 'Private room', 'Shared room', 'Hotel room'];
  imageUrls: File[] = [];
  availabilityRanges: AvailabilityDto[] = [];
  formGroup!: FormGroup;

  constructor(private accommodationService: AccommodationService, private formBuilder: FormBuilder) {
    this.initializeFormGroup();
  }

  onSubmit(): void {
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
    } else {
      FormUtils.markAllAsTouched(this.formGroup);
      console.log("Invalid form");
    }
  }

  onUpload($event: any): void {
    console.log("onUpload");
  }

  addRange() : void {
    const formData = this.formGroup.value;

    const datesValid = FormValidators.areDatesValid(formData.pickedDates);
    const priceValid = FormValidators.isPriceValid(formData.price);

    if (!datesValid) {
      this.formGroup.get('pickedDates')?.markAsTouched();
      this.formGroup.get('pickedDates')?.setErrors({ invalidDates: true });
    }

    if (!priceValid) {
      this.formGroup.get('price')?.markAsTouched();
      this.formGroup.get('price')?.setErrors({ invalidPrice: true });
    }

    if (datesValid && priceValid) {
      const newRange: AvailabilityDto = {
        fromDate: formData.pickedDates[0].getTime(),
        toDate: formData.pickedDates[1].getTime(),
        price: formData.price
      };

      this.availabilityRanges.push(newRange);

      // Clear input fields
      this.formGroup.patchValue({
        pickedDates: null,
        price: null
      });

    }
  }

  removeRange(index: number) : void {
    this.availabilityRanges.splice(index, 1);
  }

  private initializeFormGroup() : void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      minGuests: ['', [Validators.required, Validators.min(1)]],
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
    }, {validators: FormValidators.compareMinMaxGuestsValidator()});
  }
}
