import {FormControl} from '@angular/forms';

export function matchStringValidator (value: string) {
  return function matchStringValidate (control: FormControl) {
    if (!control.parent) {
      return null;
    }
    if (value !== control.value) {
      return {
        stringsMatch: true,
      };
    }
    return null;
  };
}
