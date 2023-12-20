import { Component } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AccommodationBookingDetailFormDto,
  AccommodationBookingDetailsDto,
  AccommodationDetailsDto,
  Availability,
  AvailabilityDto,
  PricingType,
} from '../accommodation.model';
import { FormUtils, FormValidators } from '../../utils/form.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-accommodation-availability-pricing',
  templateUrl: './accommodation-availability-pricing.component.html',
  styleUrl: './accommodation-availability-pricing.component.css',
})
export class AccommodationAvailabilityPricingComponent {
  bookingDetailsForm!: FormGroup;
  availabilityForm!: FormGroup;
  availabilityRanges: Availability[] = [];
  submitAttempted: boolean = false;
  overlappingRanges: boolean = false;
  overlappingReservations: boolean = false;
  isNewRangeEmpty: boolean = false;
  accommodationId!: number;

  constructor(
    private accommodationService: AccommodationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.initializeBookingDetailsForm();
    this.initializeAvailabilityForm();

    this.route.paramMap.subscribe((params) => {
      const accommodationIdParam: string | null = params.get('accommodationId');
      if (accommodationIdParam) {
        const accommodationId: number = +accommodationIdParam;
        if (!isNaN(accommodationId) && accommodationId > 0) {
          this.accommodationId = accommodationId;
          this.loadAccommodationDetails(this.accommodationId);
        } else {
          this.handleInvalidAccommodationId();
        }
      } else {
        this.handleInvalidAccommodationId();
      }
    });
  }

  loadAccommodationDetails(accommodationId: number): void {
    this.accommodationService
      .getAccommodationBookingDetails(accommodationId)
      .subscribe({
        next: (details) => {
          this.updateForms(details);
        },
        error: (error) => {
          console.error('Error fetching accommodation booking details', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'Error fetching accommodation booking details. Please try again later.',
          });
        },
      });
  }

  onSubmit(): void {
    this.submitAttempted = true;

    if (this.bookingDetailsForm.valid) {
      const accommodationBookingDetailsData: AccommodationBookingDetailsDto = {
        cancellationDeadline:
          this.bookingDetailsForm.value.cancellationDeadline,
        pricingType: this.bookingDetailsForm.value.pricePerGuest
          ? PricingType.PerGuest
          : PricingType.PerNight,
      };
      console.log(
        'accommodationBookingDetailsData',
        accommodationBookingDetailsData,
      );
      this.accommodationService
        .updateAccommodationBookingDetails(
          this.accommodationId,
          accommodationBookingDetailsData,
        )
        .subscribe({
          next: (accommodationDetails: AccommodationBookingDetailsDto) => {
            console.log(
              'Accommodation booking details updated successfully.',
              accommodationDetails,
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Accommodation booking details updated successfully.',
            });
          },
          error: (error) => {
            console.error(
              'Error updating accommodation booking details',
              error,
            );
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Error updating accommodation booking details. Please try again later.',
            });
          },
        });
    } else {
      FormUtils.markAllAsTouched(this.bookingDetailsForm);
      console.error('Form is invalid. Please check the entered data.');
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Form is invalid. Please check the entered data.',
      });
    }
  }

  addRange(): void {
    this.overlappingRanges = false;
    this.isNewRangeEmpty = false;

    if (
      !this.validateDates(this.availabilityForm.value.pickedDates) ||
      !this.validatePrice(this.availabilityForm.value.price)
    ) {
      console.log('invalid');
      this.isNewRangeEmpty = true;
      return;
    }

    const pickedDates: Date[] = this.availabilityForm.get('pickedDates')?.value;
    const price: number = this.availabilityForm.get('price')?.value;
    const existingRanges: Date[][] = this.getExistingDateRanges();

    if (this.isOverlapping(pickedDates, existingRanges)) {
      this.overlappingRanges = true;
      console.error('New range overlaps with existing ranges');
      return;
    }

    this.addNewRange(pickedDates, price);
    this.availabilityForm.patchValue({ pickedDates: null, price: null });
  }

  private addNewRange(dates: Date[], price: number): void {
    const availabilityData: AvailabilityDto = {
      fromDate: this.availabilityForm.value.pickedDates[0].getTime(),
      toDate: this.availabilityForm.value.pickedDates[1].getTime(),
      price: this.availabilityForm.value.price,
    };

    this.accommodationService
      .addAccommodationAvailability(this.accommodationId, availabilityData)
      .subscribe({
        next: (updatedAvailabilities) => {
          console.log('Availability added successfully');
          this.availabilityRanges = updatedAvailabilities;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Availability added successfully',
          });
        },
        error: (error) => {
          if (error.status === 409) {
            // Handle the overlapping availability scenario
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'The specified availability period overlaps with an existing one. Please choose a different range.',
            });
          } else {
            // Handle other errors
            console.error('Error adding availability', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error adding availability. Please try again later.',
            });
          }
        },
      });
  }

  removeRange(rangeToRemove: Availability): void {
    this.overlappingReservations = false;
    const index: number = this.availabilityRanges.indexOf(rangeToRemove);

    if (index === -1) {
      console.error('Range not found');
      return;
    }

    this.accommodationService
      .removeAccommodationAvailability(this.accommodationId, rangeToRemove.id!)
      .subscribe({
        next: (response) => {
          this.availabilityRanges.splice(index, 1);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Availability range removed',
          });
        },
        error: (error) => {
          let errorMessage =
            'Error removing availability range. Please try again later.';
          let severity = 'error';

          if (error.status === 400) {
            console.error('Error removing availability range', error);
            errorMessage =
              'Cannot remove this availability range as there are active reservations.';
          } else if (error.status === 404) {
            console.error('Availability range not found', error);
            errorMessage = 'The availability range was not found.';
          }
          this.messageService.add({
            severity,
            summary: 'Error',
            detail: errorMessage,
          });
        },
      });
  }

  private updateForms(details: AccommodationBookingDetailFormDto): void {
    this.bookingDetailsForm.patchValue({
      cancellationDeadline: details.cancellationDeadline,
      pricePerGuest: details.pricingType == 'PER_GUEST',
    });

    this.availabilityRanges = details.available;
  }

  private initializeBookingDetailsForm() {
    this.bookingDetailsForm = this.formBuilder.group({
      cancellationDeadline: ['', [Validators.required, Validators.min(0)]],
      pricePerGuest: [false],
    });
  }

  private initializeAvailabilityForm() {
    this.availabilityForm = this.formBuilder.group({
      pickedDates: [null, Validators.required],
      price: [null, Validators.required],
      availabilityRanges: [this.availabilityRanges],
    });
  }

  private validateDates(dates: Date[]): boolean {
    if (!FormValidators.areDatesValid(dates)) {
      this.availabilityForm.get('pickedDates')?.markAsTouched();
      this.availabilityForm
        .get('pickedDates')
        ?.setErrors({ invalidDates: true });
      return false;
    }
    return true;
  }

  private validatePrice(price: number): boolean {
    if (!FormValidators.isPriceValid(price)) {
      this.availabilityForm.get('price')?.markAsTouched();
      this.availabilityForm.get('price')?.setErrors({ invalidPrice: true });
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

  private handleInvalidAccommodationId(): void {
    console.error('Invalid or missing accommodationId');
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid or missing accommodationId',
    });
    this.router.navigate(['/accommodation/' + this.accommodationId]);
  }
}
