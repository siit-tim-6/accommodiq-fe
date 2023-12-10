import {Component} from '@angular/core';
import {AccommodationCreateDto, AvailabilityDto, PricingType} from "../accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {
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
  images: File[];
  availabilityRanges: AvailabilityDto[] = [];
  formGroup!: FormGroup;
  submitAttempted = false;

  constructor(private accommodationService: AccommodationService, private formBuilder: FormBuilder) {
    this.images = [];
    this.initializeFormGroup();
  }

  onSubmit(): void {
    //TODO: refactor this
    this.submitAttempted = true;
    console.log(this.formGroup.value.images)
    if (this.formGroup.valid && this.availabilityRanges.length > 0 && this.formGroup.value.images.length > 0) {
      const hostId = 1; // TODO: get from JWT
      const formData = this.formGroup.value;
      this.accommodationService.uploadImages(this.formGroup.value.images).subscribe(
        (uploadedImagePaths: string[]) => {
          const accommodationData: AccommodationCreateDto = {
            title: formData.name,
            description: formData.description,
            location: formData.location,
            minGuests: formData.minGuests,
            maxGuests: formData.maxGuests,
            available: this.availabilityRanges,
            pricingType: formData.pricePerGuest ? PricingType.PerGuest : PricingType.PerNight,
            automaticAcceptance: formData.automaticallyAcceptIncomingReservations,
            images: uploadedImagePaths
          };
          console.log("Accommodation Image:" + accommodationData);

          this.accommodationService.createNewAccommodation(hostId, accommodationData)
            .subscribe({
              next: (accommodationDetails) => {
                console.log("Accommodation Created:" + accommodationDetails);
              },
              error: (error) => {
                console.log("Error creating accommodation:" + error);
              }
            });
          }
      );
    } else {
      FormUtils.markAllAsTouched(this.formGroup);
      console.log("Invalid form");
    }
  }

  onFileSelect($event: any): void {
    if($event.files && $event.files.length > 0) {
      for(let file of $event.files) {
        this.formGroup.value.images.push(file);
      }
    }
  }

  onFileRemove(event: any): void {
    const fileToRemove: File = event.file;
    this.images = this.images.filter(file => file.name !== fileToRemove.name || file.size !== fileToRemove.size);
    this.formGroup.patchValue({ images: this.images });
  }

  addRange() : void {
    const formData = this.formGroup.value;

    if (!this.validateDates(formData.pickedDates) || !this.validatePrice(formData.price)) {
      return;
    }

    this.addNewRange(formData.pickedDates, formData.price);

    // Clear input fields
    this.formGroup.patchValue({ pickedDates: null, price: null });
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
      price: [null],
      images: [this.images]
    }, {validators: FormValidators.compareMinMaxGuestsValidator()});
  }



  private validateDates(dates: Date[]): boolean {
    if (!FormValidators.areDatesValid(dates)) {
      this.formGroup.get('pickedDates')?.markAsTouched();
      this.formGroup.get('pickedDates')?.setErrors({ invalidDates: true });
      return false;
    }
    return true;
  }

  private validatePrice(price: number): boolean {
    if (!FormValidators.isPriceValid(price)) {
      this.formGroup.get('price')?.markAsTouched();
      this.formGroup.get('price')?.setErrors({ invalidPrice: true });
      return false;
    }
    return true;
  }

  private addNewRange(dates: Date[], price: number): void {
    const newRange: AvailabilityDto = {
      fromDate: dates[0].getTime(),
      toDate: dates[1].getTime(),
      price: price
    };
    this.availabilityRanges = [...this.availabilityRanges, newRange];
  }
}
