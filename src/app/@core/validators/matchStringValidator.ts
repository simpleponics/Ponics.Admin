import {FormControl} from '@angular/forms';

export function matchStringValidator (value: string) {

  let thisControl: FormControl;

  return function matchStringValidate (control: FormControl) {

    if (!control.parent) {
      return null;
    }
    if (!thisControl) {
      thisControl = control;
    }
    if (value !== thisControl.value) {
      return {
        matchOther: true
      };
    }

    return null;

  }

}
