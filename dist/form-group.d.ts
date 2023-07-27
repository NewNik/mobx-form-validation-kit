import { AbstractControl, ControlsCollection, ValidatorsFunction } from './abstract-control';
import { ValidationEvent } from './validation-event';
import { FormAbstractGroup } from './form-abstract-group';
import { FormControl } from './form-control';
export interface IOptionsFormGroup<TControls extends ControlsCollection> {
    /**
     * Validations
     * Валидациии
     */
    validators?: ValidatorsFunction<FormGroup<TControls>>[];
    /**
     * Additional information
     * Блок с дополнительной информацией
     */
    additionalData?: any;
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | null;
}
type ControlsValueType<TControls extends ControlsCollection = ControlsCollection> = {
    [K in keyof TControls]: TControls[K] extends FormControl<any> ? TControls[K]['value'] : TControls[K] extends FormGroup ? ControlsValueType<TControls[K]['controls']> : never;
};
export declare class FormGroup<TControls extends ControlsCollection = ControlsCollection, TControlsValues extends ControlsValueType<TControls> = ControlsValueType<TControls>> extends FormAbstractGroup {
    private readonly reactionOnIsActiveDisposer;
    private readonly validators;
    controls: TControls;
    constructor(
    /**
     * Сontrols
     * / Контролы
     */
    controls: TControls, 
    /**
     * Options
     * / Опции
     */
    options?: IOptionsFormGroup<TControls>);
    dispose: () => void;
    executeAsyncValidation: (validator: (control: this) => Promise<ValidationEvent[]>) => Promise<ValidationEvent[]>;
    protected getControls(): IterableIterator<AbstractControl>;
    private checkGroupValidations;
    runInAction(action: () => void): void;
    get changed(): boolean;
    protected handleReset(): this;
    /**
     * An object with the values of all FormControls, in the form in which the FormGroup was initialized
     * / Объект со значениями всех FormControl-ов, в том виде, в которым был проинициализирован FormGroup
     */
    get formData(): TControlsValues;
    /**
     * An object with the values of the modified FormControls, in the form in which the FormGroup was initialized
     * / Объект со значений измененных FormControl-ов, в том виде, в которым был проинициализирован FormGroup
     */
    get chagedData(): Partial<TControlsValues>;
    updateFormData(data: Partial<TControlsValues>): void;
}
export {};
