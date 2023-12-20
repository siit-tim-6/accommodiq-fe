import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormUtils, FormValidators } from '../../utils/form.utils';
import { Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { forkJoin, mergeMap, of } from 'rxjs';
import { AccommodationAdvancedDetails } from '../accommodation.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrl: './accommodation-create.component.css',
})
export class AccommodationCreateComponent implements OnInit {
  @Input() accommodationToUpdate: AccommodationAdvancedDetails | undefined;

  apartmentTypes: string[] = [
    'Entire apartment',
    'Private room',
    'Shared room',
    'Hotel room',
    'Apartment',
  ];

  benefitOptions = [
    {
      benefitName: 'Private Balcony',
      isChecked: false,
    },
    {
      benefitName: 'Fully Equipped Kitchen',
      isChecked: false,
    },
    {
      benefitName: 'Complimentary Breakfast',
      isChecked: false,
    },
    {
      benefitName: 'Air Conditioning',
      isChecked: false,
    },
  ];

  images: File[] = [];
  formGroup!: FormGroup;
  submitAttempted = false;

  @ViewChild('imageUpload') imageUpload!: FileUpload;

  constructor(
    private accommodationService: AccommodationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) {}

  onSubmit(): void {
    this.submitAttempted = true;

    if (this.isValidSubmission()) {
      if (this.accommodationToUpdate !== undefined) {
        this.accommodationService
          .updateAccommodation(
            this.formGroup.value,
            this.images,
            this.accommodationToUpdate.id,
          )
          .subscribe({
            next: (_) => {
              this.router.navigate(['my-accommodations']); // Add snackbar maybe?
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Accommodation updated successfully!',
              });
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error updating accommodation. Please try again later.',
              });
            },
          });
        return;
      }

      this.accommodationService
        .createAccommodation(this.formGroup.value, this.images)
        .subscribe({
          next: (_) => {
            this.router.navigate(['my-accommodations']);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error creating accommodation. Please try again later.',
            });
          },
        });
    } else {
      FormUtils.markAllAsTouched(this.formGroup);
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please check all fields before submitting.',
      });
    }
  }

  onFileSelect($event: any): void {
    if ($event.files && $event.files.length > 0) {
      for (let file of $event.files) {
        console.log(file);
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
        automaticallyAcceptIncomingReservations: [
          this.accommodationToUpdate?.automaticAcceptance,
        ],
        benefits: this.formBuilder.array([]),
        pickedDates: [null],
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

  private isValidSubmission(): boolean {
    return this.formGroup.valid && this.images.length > 0;
  }

  private fetchImages(imageFilenames: string[]) {
    return of(imageFilenames).pipe(
      mergeMap((filenames) =>
        forkJoin(
          ...filenames.map((filename) =>
            this.accommodationService.getImage(filename),
          ),
        ),
      ),
    );
  }

  ngOnInit() {
    this.fetchImages(this.accommodationToUpdate?.images ?? []).subscribe(
      (blobs) => {
        this.imageUpload.clear();
        blobs.forEach((blob, i) => {
          // mora any jer mu fali objectURL property da bi se prikazao
          const imageFile: any = new File(
            [blob],
            this.accommodationToUpdate?.images[i]!,
            { type: blob.type },
          );
          imageFile.objectURL = window.URL.createObjectURL(blob);
          this.imageUpload.files.push(imageFile);
        });
      },
    );
    this.initializeFormGroup();
  }
}
