import { AbstractControl, ValidatorsFunction } from './abstract-control';
import { FormControl } from './form-control';
import { ValidationEventTypes } from './validation-event-types';
import { ValidationEvent } from './validation-event';
export declare const requiredValidatorKey = "required";
export declare const requiredValidator: <TEntity>(message?: string, eventType?: ValidationEventTypes) => ValidatorsFunction<FormControl<TEntity>>;
export declare const notEmptyOrSpacesValidatorKey = "notEmptyOrSpaces";
export declare const notEmptyOrSpacesValidator: (message?: string, eventType?: ValidationEventTypes) => ValidatorsFunction<FormControl<string>>;
export declare const notContainSpacesValidatorKey = "notContainSpaces";
/**
 * Not contain spaces
 * / Не содержит проблелов
 */
export declare const notContainSpacesValidator: (message?: string, eventType?: ValidationEventTypes) => (control: FormControl<string> | FormControl<string | null>) => Promise<ValidationEvent[]>;
export declare const patternValidatorKey = "pattern";
/**
 * Error if there is no pattern matching
 * / Ошибка, если нет соответствия паттерну
 */
export declare const patternValidator: <TAbstractControl extends FormControl<string> | FormControl<string | null>>(regExp: RegExp, message?: string, eventType?: ValidationEventTypes) => ValidatorsFunction<TAbstractControl>;
/**
 * Error if there is a pattern match
 * / Ошибка, если есть соответствие паттерну
 */
export declare const invertPatternValidator: <TAbstractControl extends FormControl<string> | FormControl<string | null>>(regExp: RegExp, message?: string, eventType?: ValidationEventTypes) => ValidatorsFunction<TAbstractControl>;
export declare const minLengthValidatorKey = "minlength";
export declare const minLengthValidator: (minlength: number, message?: string, eventType?: ValidationEventTypes) => ValidatorsFunction<FormControl>;
export declare const maxLengthValidatorKey = "maxlength";
export declare const maxLengthValidator: (maxlength: number, message?: string, eventType?: ValidationEventTypes) => ValidatorsFunction<FormControl>;
export declare const absoluteLengthValidatorKey = "absoluteLength";
export declare const absoluteLengthValidator: (length: number, message?: string, eventType?: ValidationEventTypes) => ValidatorsFunction<FormControl>;
export declare const minValueValidatorKey = "minValue";
export declare const minValueValidator: <TEntity extends string | number | Date | null>(min: TEntity | (() => TEntity), message?: string, eventType?: ValidationEventTypes) => (control: FormControl<TEntity>) => Promise<ValidationEvent[]>;
export declare const maxValueValidatorKey = "minValue";
export declare const maxValueValidator: <TEntity extends string | number | Date | null>(max: TEntity | (() => TEntity), message?: string, eventType?: ValidationEventTypes) => (control: FormControl<TEntity>) => Promise<ValidationEvent[]>;
export declare const compairValidatorKey = "compair";
/**
 * Wrapper for complex validation (error if validation returns false)
 * / Обёртка для сложной проверки (ошибка, если проверка вернула false)
 */
export declare const compareValidator: <TEntity>(expression: (value: TEntity) => boolean, message?: string, eventType?: ValidationEventTypes) => ValidatorsFunction<FormControl<TEntity>>;
export declare const isEqualValidatorKey = "isEqual";
/**
 * Equals to {value}
 * / Равно значению {value}
 */
export declare const isEqualValidator: <TEntity>(value: TEntity, message?: string, eventType?: ValidationEventTypes) => ValidatorsFunction<FormControl<TEntity>>;
/**
 * Runs validations only if activation conditions are met
 * / Запускает валидации только если условие активации выполнено
 */
export declare const wrapperActivateValidation: <TAbstractControl extends AbstractControl>(activate: (control: TAbstractControl) => boolean, validators: ValidatorsFunction<TAbstractControl>[], elseValidators?: ValidatorsFunction<TAbstractControl>[]) => ValidatorsFunction<TAbstractControl>;
/**
 * Wrapper for sequential validations (The next validation is launched only after the previous one passed without errors)
 * / Обертка для последовательных валидаций (Следующая валидация запускается, только после того, что предыдущая прошла без ошибок)
 */
export declare const wrapperSequentialCheck: <TAbstractControl extends AbstractControl>(validators: ValidatorsFunction<TAbstractControl>[]) => ValidatorsFunction<TAbstractControl>;
