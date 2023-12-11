import { Component } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AccommodationAvailabilityPricingDto,
  AvailabilityDto,
  AvailabilityRangeReservationsStatusDto,
} from '../accommodation.model';
import { FormUtils, FormValidators } from '../../utils/form-utils';

@Component({
  selector: 'app-accommodation-availability-pricing',
  templateUrl: './accommodation-availability-pricing.component.html',
  styleUrl: './accommodation-availability-pricing.component.css',
})
export class AccommodationAvailabilityPricingComponent {
  formGroup!: FormGroup;
  availabilityRanges: AvailabilityDto[] = [];
  submitAttempted: boolean = false;
  overlappingRanges: boolean = false;
  overlappingReservations: boolean = false;

  constructor(
    private accommodationService: AccommodationService,
    private formBuilder: FormBuilder,
  ) {
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      cancellationDeadline: ['', [Validators.required, Validators.min(0)]],
      pricePerGuest: [false],
      pickedDates: [null],
      price: [null],
      availabilityRanges: [this.availabilityRanges],
    });
  }

  onSubmit(): void {
    const accommodationId: number = 1; //will be changed later
    this.submitAttempted = true;

    if (this.isFormValid()) {
      const accommodationData: AccommodationAvailabilityPricingDto = {
        cancellationDeadline: this.formGroup.value.cancellationDeadline,
        pricePerGuest: this.formGroup.value.pricePerGuest,
        availabilityRanges: this.availabilityRanges,
      };

      this.accommodationService
        .updateAccommodationAvailabilityPricing(
          accommodationId,
          accommodationData,
        )
        .subscribe({
          next: (accommodationDetails) => {
            console.log(
              'Accommodation availability and pricing updated successfully.',
              accommodationDetails,
            );
            // You might want to navigate the user to another page or show a success message
          },
          error: (error) => {
            console.error(
              'Error updating accommodation availability and pricing',
              error,
            );
            // Show an error message to the user
          },
        });
    } else {
      FormUtils.markAllAsTouched(this.formGroup);
      console.error('Form is invalid. Please check the entered data.');
    }
  }

  addRange(): void {
    this.overlappingRanges = false;

    if (
      !this.validateDates(this.formGroup.value.pickedDates) ||
      !this.validatePrice(this.formGroup.value.price)
    ) {
      console.log('invalid');
      return;
    }

    const pickedDates: Date[] = this.formGroup.get('pickedDates')?.value;
    const price: number = this.formGroup.get('price')?.value;
    const existingRanges: Date[][] = this.getExistingDateRanges();

    if (this.isOverlapping(pickedDates, existingRanges)) {
      this.overlappingRanges = true;
      console.error('New range overlaps with existing ranges');
      return;
    }

    this.addNewRange(pickedDates, price);
    this.formGroup.patchValue({ pickedDates: null, price: null });
  }

  private addNewRange(dates: Date[], price: number): void {
    const newRange: AvailabilityDto = {
      fromDate: dates[0].getTime(),
      toDate: dates[1].getTime(),
      price: price,
    };
    this.availabilityRanges = [...this.availabilityRanges, newRange];
  }

  removeRange(rangeToRemove: AvailabilityDto): void {
    this.overlappingReservations = false;
    const index: number = this.availabilityRanges.indexOf(rangeToRemove);
    console.log('index', index);
    console.log('rangeToRemove', rangeToRemove);
    this.accommodationService
      .checkAvailabilityRange(1, rangeToRemove.fromDate, rangeToRemove.toDate)
      .subscribe({
        next: (response: AvailabilityRangeReservationsStatusDto) => {
          if (!response.hasReservations) {
            this.availabilityRanges.splice(index, 1);
          } else {
            this.overlappingReservations = true;
            console.error('Range has reservations. Cannot delete.');
          }
        },
        error: (error) => {
          console.error(
            'Error checking availability range for reservations:',
            error,
          );
          alert(
            'Error checking availability range for reservations. Please try again later.',
          );
        },
      });
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

  private isOverlapping(newRange: Date[], existingRanges: Date[][]): boolean {
    for (let range of existingRanges) {
      if (newRange[0] < range[1] && newRange[1] > range[0]) {
        return true;
      }
    }
    return false;
  }

  private getExistingDateRanges(): Date[][] {
    return this.availabilityRanges.map((range) => [
      new Date(range.fromDate),
      new Date(range.toDate),
    ]);
  }

  private isFormValid(): boolean {
    return this.formGroup.valid && this.availabilityRanges.length > 0;
  }
}
