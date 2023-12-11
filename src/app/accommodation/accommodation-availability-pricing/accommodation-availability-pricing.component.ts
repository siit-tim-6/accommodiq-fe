import { Component } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvailabilityDto } from '../accommodation.model';

@Component({
  selector: 'app-accommodation-availability-pricing',
  templateUrl: './accommodation-availability-pricing.component.html',
  styleUrl: './accommodation-availability-pricing.component.css',
})
export class AccommodationAvailabilityPricingComponent {
  formGroup!: FormGroup;
  submitAttempted: boolean = false;

  constructor(
    private accommodationService: AccommodationService,
    private formBuilder: FormBuilder,
  ) {
    this.initializeFormGroup();
    this.initializeAvailabilityRanges([]);
  }

  get availabilityRangesFormArray() {
    return this.formGroup.get('availabilityRanges') as FormArray;
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      cancellationDeadline: ['', Validators.required],
      pricePerGuest: [false],
      pickedDates: [null],
      price: [null],
      availabilityRanges: this.formBuilder.array([]),
    });
  }

  private initializeAvailabilityRanges(ranges: AvailabilityDto[]): void {
    const formGroups = ranges.map((range) =>
      this.formBuilder.group({
        fromDate: [new Date(range.fromDate), Validators.required],
        toDate: [new Date(range.toDate), Validators.required],
        price: [range.price, Validators.required],
      }),
    );
    this.availabilityRangesFormArray.clear();
    formGroups.forEach((fg) => this.availabilityRangesFormArray.push(fg));
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
    }
  }

  addRange(): void {
    const pickedDates: Date[] = this.formGroup.get('pickedDates')?.value;
    const price: number = this.formGroup.get('price')?.value;

    if (pickedDates && pickedDates.length === 2 && price) {
      const newRange = this.formBuilder.group({
        fromDate: [new Date(pickedDates[0]), Validators.required],
        toDate: [new Date(pickedDates[1]), Validators.required],
        price: [price, Validators.required],
      });
      this.availabilityRangesFormArray.push(newRange);
    } else {
      console.error('Invalid range or price');
    }
    console.log(this.formGroup.value);
    console.log(this.availabilityRangesFormArray.value);
    this.formGroup.patchValue({ pickedDates: null, price: null });
  }

  removeRange(index: number): void {
    this.availabilityRangesFormArray.removeAt(index);
  }
}
