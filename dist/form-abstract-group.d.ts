import { AbstractControl } from './abstract-control';
import { FormControl } from './form-control';
import { ControlTypes } from './сontrol-types';
export declare abstract class FormAbstractGroup extends AbstractControl {
    get processing(): boolean;
    get invalid(): boolean;
    get dirty(): boolean;
    get touched(): boolean;
    get focused(): boolean;
    constructor(
    /**
    * Function enable validation by condition (always enabled by default)
    * / Функция включение валидаций по условию (по умолчанию включено всегда)
    */
    activate: (() => boolean) | null | undefined, additionalData: any, type: ControlTypes);
    /**
    * Set marker "Value has changed"
    * / Установить маркер "Значение изменилось"
    */
    setDirty: (dirty: boolean) => this;
    /**
     * Set marker "field was in focus"
     * / Установить маркер "Поле было в фокусе"
     */
    setTouched: (touched: boolean) => this;
    /**
     * Returns a complete list of FormControls without attachments (terminal elements)
     * Возвращает полный список FormControl-ов без вложений (терминальных элементов)
     */
    allControls(): FormControl<any>[];
    protected abstract getControls(): IterableIterator<AbstractControl>;
    protected abbreviatedAND: (getData: (control: AbstractControl) => boolean) => boolean;
    protected abbreviatedOR: (getData: (control: AbstractControl) => boolean) => boolean;
}
