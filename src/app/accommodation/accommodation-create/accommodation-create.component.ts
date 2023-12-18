import { Component, Input, OnInit } from '@angular/core';
import { AvailabilityDto, PricingType } from '../accommodation.model';
import { AccommodationService } from '../accommodation.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormUtils, FormValidators } from '../../utils/form-utils';
import { AccommodationDetails } from '../accommodation-details.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrl: './accommodation-create.component.css',
})
export class AccommodationCreateComponent implements OnInit {
  @Input() accommodationToUpdate: AccommodationDetails | undefined;

  apartmentTypes: string[] = [
    'Entire apartment',
    'Private room',
    'Shared room',
    'Hotel room',
    'Apartment',
  ];

  benefitOptions = [
    {
      value: 'breakfast',
      label: 'Breakfast',
      benefitName: 'Private Balcony',
      isChecked: false,
    },
    {
      value: 'kitchen',
      label: 'Kitchen',
      benefitName: 'Fully Equipped Kitchen',
      isChecked: false,
    },
    {
      value: 'parking',
      label: 'Parking',
      benefitName: 'Complimentary Breakfast',
      isChecked: false,
    },
    {
      value: 'ac',
      label: 'AC',
      benefitName: 'Air Conditioning',
      isChecked: false,
    },
  ];

  images: File[] = [];
  availabilityRanges: AvailabilityDto[] = [];
  formGroup!: FormGroup;
  submitAttempted = false;

  constructor(
    private accommodationService: AccommodationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.submitAttempted = true;

    if (this.isValidSubmission()) {
      if (this.accommodationToUpdate !== undefined) {
        this.accommodationService
          .updateAccommodation(
            this.formGroup.value,
            this.availabilityRanges,
            this.images,
            this.accommodationToUpdate.id,
          )
          .subscribe({
            next: (accommodationDetails) => {
              this.router.navigate(['my-accommodations']); // Add snackbar maybe?
            },
          });
        return;
      }

      this.accommodationService
        .createAccommodation(
          this.formGroup.value,
          this.availabilityRanges,
          this.images,
        )
        .subscribe({
          next: (accommodationDetails) => {
            this.router.navigate(['my-accommodations']); // Add snackbar maybe?
          },
        });
    } else {
      FormUtils.markAllAsTouched(this.formGroup);
    }
  }

  onFileSelect($event: any): void {
    if ($event.files && $event.files.length > 0) {
      for (let file of $event.files) {
        this.formGroup.value.images.push(file);
      }
    }
  }

  onFileRemove(event: any): void {
    const fileToRemove: File = event.file;
    this.images = this.images.filter(
      (file) =>
        file.name !== fileToRemove.name || file.size !== fileToRemove.size,
    );
    this.formGroup.patchValue({ images: this.images });
  }

  addRange(): void {
    const formData = this.formGroup.value;

    if (
      !this.validateDates(formData.pickedDates) ||
      !this.validatePrice(formData.price)
    ) {
      return;
    }

    this.addNewRange(formData.pickedDates, formData.price);

    // Clear input fields
    this.formGroup.patchValue({ pickedDates: null, price: null });
  }

  removeRange(index: number): void {
    this.availabilityRanges.splice(index, 1);
  }

  onBenefitChange(checked: boolean, benefit: string): void {
    const benefitsArray = this.formGroup.get('benefits') as FormArray;

    if (checked) {
      benefitsArray.push(new FormControl(benefit));
    } else {
      const index = benefitsArray.controls.findIndex(
        (x) => x.value === benefit,
      );
      if (index !== -1) {
        benefitsArray.removeAt(index);
      }
    }

    this.benefitOptions.find((b) => b.benefitName === benefit)!.isChecked =
      checked;
  }

  private addNewRange(dates: Date[], price: number): void {
    const newRange: AvailabilityDto = {
      fromDate: dates[0].getTime(),
      toDate: dates[1].getTime(),
      price: price,
    };
    this.availabilityRanges = [...this.availabilityRanges, newRange];
  }

  private initializeFormGroup(): void {
    this.formGroup = this.formBuilder.group(
      {
        name: [this.accommodationToUpdate?.title, Validators.required],
        location: [this.accommodationToUpdate?.location, Validators.required],
        description: [
          this.accommodationToUpdate?.description,
          Validators.required,
        ],
        minGuests: [
          this.accommodationToUpdate?.minGuests,
          [Validators.required, Validators.min(1)],
        ],
        maxGuests: [this.accommodationToUpdate?.maxGuests, Validators.required],
        apartmentType: [this.accommodationToUpdate?.type, Validators.required],
        pricePerGuest: [
          this.accommodationToUpdate?.pricingType === PricingType.PerGuest,
        ],
        automaticallyAcceptIncomingReservations: [
          this.accommodationToUpdate?.automaticAcceptance,
        ],
        benefits: this.formBuilder.array([]),
        pickedDates: [null],
        price: [this.accommodationToUpdate?.price],
        images: [this.images], // TODO
      },
      { validators: FormValidators.compareMinMaxGuestsValidator() },
    );
    this.initializeBenefits();
  }

  private initializeBenefits() {
    if (this.accommodationToUpdate === undefined) return;
    this.accommodationToUpdate.benefits.forEach((accommodationBenefit) => {
      let benefitName = this.benefitOptions.find(
        (b) => b.benefitName === accommodationBenefit,
      )?.benefitName;
      if (benefitName !== undefined) {
        this.onBenefitChange(true, benefitName);
      }
    });
  }

  initializeRanges(): void {
    if (this.accommodationToUpdate === undefined) return;
    const formData = this.formGroup.value;
    this.accommodationToUpdate.available.forEach((availability) => {
      this.addNewRange(
        [new Date(availability.fromDate), new Date(availability.toDate)],
        availability.price,
      );
    });
  }

  private validateDates(dates: Date[]): boolean {
    if (!FormValidators.areDatesValid(dates)) {
      this.formGroup.get('pickedDates')?.markAsTouched();
      return false;
    }
    return true;
  }

  private validatePrice(price: number): boolean {
    if (!FormValidators.isPriceValid(price)) {
      this.formGroup.get('price')?.markAsTouched();
      return false;
    }
    return true;
  }

  private isValidSubmission(): boolean {
    return (
      this.formGroup.valid &&
      this.availabilityRanges.length > 0 &&
      this.images.length > 0
    );
  }

  ngOnInit() {
    this.images = [];
    this.initializeFormGroup();
    this.initializeRanges();
  }
}
