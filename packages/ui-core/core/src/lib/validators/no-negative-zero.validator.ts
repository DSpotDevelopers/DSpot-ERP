import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noNegativeZero(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;
		if (Object.is(value, -0)) {
			return { negativeZero: true };
		}
		return null;
	};
}
