import {AbstractControl, Validators} from '@angular/forms';

export function toleranceValidator (formControlName: string) {
  return function ValidateTolerance(control: AbstractControl) {
    return Validators.required(control);
  };
}


