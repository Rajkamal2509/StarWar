import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneFieldValidator(fields: string[]): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const isAtLeastOneFilled = fields.some(field => !!form.get(field)?.value);
    return isAtLeastOneFilled ? null : { atLeastOneRequired: true };
  };
}
