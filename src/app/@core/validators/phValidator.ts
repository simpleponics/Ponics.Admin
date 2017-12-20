import {AbstractControl} from '@angular/forms';

export function pHValidator (formControlName: string) {
  return function ValidatePh(control: AbstractControl) {
    if (!between(control.value , 0, 14) || isEmptyInputValue(control.value)) {
      return { [formControlName]: true };
    }
    return null;
  };
  function between(x, min, max) {
    return x >= min && x <= max;
  }
  function isEmptyInputValue(value) {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
  }
}


