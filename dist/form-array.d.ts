import { AbstractControl, ValidatorsFunction } from './abstract-control';
import { FormAbstractGroup } from './form-abstract-group';
import { ValidationEvent } from './validation-event';
export interface IOptionsFormArray<TAbstractControl extends AbstractControl> {
    /**
      * Validations
      * Валидациии
      */
    validators?: ValidatorsFunction<FormArray<TAbstractControl>>[];
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
export declare class FormArray<TAbstractControl extends AbstractControl> extends FormAbstractGroup {
    private readonly reactionOnIsActiveDisposer;
    private controls;
    get length(): number;
    private readonly validators;
    constructor(
    /**
      * Сontrols
      * / Контролы
      */
    controls: TAbstractControl[], 
    /**
     * Options
     * / Опции
     */
    options?: IOptionsFormArray<TAbstractControl>);
    get changed(): boolean;
    /**
     * Initial state handler function
     * / Функция отбработчик установки начального состояния
     */
    protected handleReset(): this;
    get(index: number): TAbstractControl;
    dispose: () => void;
    executeAsyncValidation: (validator: (control: this) => Promise<ValidationEvent[]>) => Promise<ValidationEvent[]>;
    private checkArrayValidations;
    runInAction(action: () => void): void;
    /**
     * Removes the last element from an array and returns it.
     */
    pop: () => TAbstractControl | undefined;
    /**
     * Appends new elements to an array, and returns the new length of the array.
     * @param items New elements of the Array.
     */
    push: (...items: TAbstractControl[]) => number;
    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    concat: (...items: (TAbstractControl | ConcatArray<TAbstractControl>)[]) => TAbstractControl[];
    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    clear: () => void;
    /**
     * Reverses the elements in an Array.
     */
    reverse: () => TAbstractControl[];
    /**
     * Removes the first element from an array and returns it.
     */
    shift: () => TAbstractControl | undefined;
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    slice: (start?: number, end?: number) => TAbstractControl[];
    /**
     * Sorts an array.
     * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
     */
    sort: (compareFn?: ((a: TAbstractControl, b: TAbstractControl) => number) | undefined) => TAbstractControl[];
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     */
    splice: (start: number, deleteCount?: number) => TAbstractControl[];
    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    unshift: (...items: TAbstractControl[]) => number;
    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    indexOf: (searchElement: TAbstractControl, fromIndex?: number) => number;
    /**
     * Returns the index of the last occurrence of a specified value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
     */
    lastIndexOf: (searchElement: TAbstractControl, fromIndex?: number) => number;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    every: (callbackfn: (value: TAbstractControl, index: number, array: TAbstractControl[]) => unknown, thisArg?: any) => boolean;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    some: (callbackfn: (value: TAbstractControl, index: number, array: TAbstractControl[]) => unknown, thisArg?: any) => boolean;
    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach: (callbackfn: (value: TAbstractControl, index: number, array: TAbstractControl[]) => void, thisArg?: any) => void;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    map: <U>(callbackfn: (value: TAbstractControl, index: number, array: TAbstractControl[]) => U, thisArg?: any) => U[];
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    filter: (callbackfn: (value: TAbstractControl, index: number, array: TAbstractControl[]) => unknown, thisArg?: any) => TAbstractControl[];
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce: <U = TAbstractControl>(callbackfn: (previousValue: U, currentValue: TAbstractControl, currentIndex: number, array: TAbstractControl[]) => U, initialValue: U) => U;
    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduceRight: <U>(callbackfn: (previousValue: U, currentValue: TAbstractControl, currentIndex: number, array: TAbstractControl[]) => U, initialValue: U) => U;
    protected getControls(): IterableIterator<AbstractControl>;
}
