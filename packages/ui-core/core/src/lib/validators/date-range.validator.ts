import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function dateRangeValidator(startControlName: string, endControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const start = group.get(startControlName)?.value;
        const end = group.get(endControlName)?.value;

        if (!start || !end) {
            return null;
        }

        const startMoment = moment(start);
        const endMoment = moment(end);

        if (startMoment.isAfter(endMoment)) {
            return { dateRangeInvalid: true };
        }

        return null;
    };
}
