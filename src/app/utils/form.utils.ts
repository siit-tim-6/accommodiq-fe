import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class FormUtils {
  static markAllAsTouched(group: FormGroup | FormArray): void {
    Object.values(group.controls).forEach((control) => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        FormUtils.markAllAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}

export class FormValidators {
  static compareMinMaxGuestsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const minGuests = group.get('minGuests')?.value;
      const maxGuests = group.get('maxGuests')?.value;
      return minGuests > 0 && maxGuests >= minGuests
        ? null
        : { guestsInvalid: true };
    };
  }

  static areDatesValid(dates: Date[]): boolean {
    if (!dates || dates.length !== 2) {
      return false;
    }
    const fromDate = new Date(dates[0]);
    const toDate = new Date(dates[1]);
    const now = new Date();
    return fromDate >= now && toDate >= now && fromDate < toDate;
  }

  static isPriceValid(price: number): boolean {
    return price !== null && !isNaN(price) && price >= 0;
  }
}
