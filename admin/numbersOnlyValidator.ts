import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined) {
      return null; // Allow empty values
    }

    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      return { 'numbersOnly': true };
    }

    return null;
  };
}