import { ChangeDetectorRef, Component } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvailabilityDto } from '../accommodation.model';
import { FormValidators } from '../../utils/form-utils';

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

  constructor(
    private accommodationService: AccommodationService,
    private formBuilder: FormBuilder,
  ) {
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      cancellationDeadline: ['', Validators.required],
      pricePerGuest: [false],
      pickedDates: [null],
      price: [null],
      availabilityRanges: [this.availabilityRanges],
    });
  }

  onSubmit(): void {}

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

  removeRange(index: number): void {
    this.availabilityRanges.splice(index, 1);
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
}
