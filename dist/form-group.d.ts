import { AbstractControl, ControlsCollection, ValidatorsFunction } from './abstract-control';
import { ValidationEvent } from './validation-event';
import { FormAbstractGroup } from './form-abstract-group';
import { FormControl } from './form-control';
declare type Comparer = (prev: any, current: any) => boolean;
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
    comparer?: Comparer;
}
declare type ControlsValueType<TControls extends ControlsCollection = ControlsCollection> = {
    [K in keyof TControls]: TControls[K] extends FormControl<any> ? TControls[K]['value'] : TControls[K] extends FormGroup ? ControlsValueType<TControls[K]['controls']> : never;
};
export declare class FormGroup<TControls extends ControlsCollection = ControlsCollection, TControlsValues = ControlsValueType<TControls>> extends FormAbstractGroup {
    private readonly reactionOnIsActiveDisposer;
    private readonly validators;
    private comparer;
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
    get formData(): TControlsValues;
    updateFormData(data: Partial<TControlsValues>): void;
}
export {};
