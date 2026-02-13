import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
export const DEFAULT_EN_DATE_FORMATS = ['MMM D, YYYY'] as const;
export interface DateInputOptions {
    formats?: readonly string[];
    locale?: string;
    errorKey?: string;
    markTouched?: boolean;
    normalizeToDate?: boolean;
    emitEvent?: boolean;
}
export function validateDateInput(
    formControl: AbstractControl | null,
    rawInputValue: string,
    options: DateInputOptions = {}
): void {
    if (!formControl) return;

    const {
        formats: allowedDateFormats = DEFAULT_EN_DATE_FORMATS,
        locale: parsingLocale = 'en',
        errorKey: validationErrorKey = 'invalidDate',
        markTouched: shouldMarkAsTouched = false,
        normalizeToDate: shouldNormalizeToDate = true,
        emitEvent: shouldEmitValueChanges = false
    } = options;
    if (shouldMarkAsTouched) {
        formControl.markAsTouched();
    }
    const trimmedInputText = (rawInputValue ?? '').trim();
    if (!trimmedInputText) {
        removeControlError(formControl, validationErrorKey);
        return;
    }
    const parsedMomentDate = moment(trimmedInputText, [...allowedDateFormats], parsingLocale, true);
    if (parsedMomentDate.isValid()) {
        if (shouldNormalizeToDate) {
            formControl.setValue(parsedMomentDate.toDate(), { emitEvent: shouldEmitValueChanges });
        }
        removeControlError(formControl, validationErrorKey);
        return;
    }
    addOrUpdateControlError(formControl, validationErrorKey, true);
}
function addOrUpdateControlError(formControl: AbstractControl, errorKey: string, errorValue: any): void {
    const existingErrors = (formControl.errors ?? {}) as Record<string, any>;
    formControl.setErrors({ ...existingErrors, [errorKey]: errorValue });
}
function removeControlError(formControl: AbstractControl, errorKey: string): void {
    const existingErrors = formControl.errors as Record<string, any> | null;
    if (!existingErrors || !(errorKey in existingErrors)) return;

    const { [errorKey]: _removedError, ...remainingErrors } = existingErrors;
    formControl.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
}
export interface DateOrderValidatorOptions {
    startControl?: string;
    endControl?: string;
    //true -> (>=), false -> (>)
    allowSameDay?: boolean;
    errorKey?: string;
}
export function createDateOrderValidator(options: DateOrderValidatorOptions = {}): ValidatorFn {
    const {
        startControl: startControlName = 'startDate',
        endControl: endControlName = 'endDate',
        allowSameDay: isSameDayAllowed = false,
        errorKey: groupValidationErrorKey = 'dateOrder'
    } = options;
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const startDateValue = formGroup.get(startControlName)?.value;
        const endDateValue = formGroup.get(endControlName)?.value;
        if (!(startDateValue instanceof Date) || isNaN(startDateValue.getTime())) return null;
        if (!(endDateValue instanceof Date) || isNaN(endDateValue.getTime())) return null;
        const isDateOrderValid = isSameDayAllowed
            ? endDateValue.getTime() >= startDateValue.getTime()
            : endDateValue.getTime() > startDateValue.getTime();
        return isDateOrderValid ? null : { [groupValidationErrorKey]: true };
    };
}

export const dateValidator: ValidatorFn = createDateOrderValidator();
export const dateOrderValidator: ValidatorFn = dateValidator;
