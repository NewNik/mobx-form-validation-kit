import { ValidationEvent } from './validation-event';
import { AbstractControl, UpdateValidValueHandler, ValidatorsFunction } from './abstract-control';
declare type Comparer<TEntity> = (prev: TEntity, current: TEntity) => boolean;
export interface OptionsFormControl<TEntity> {
    /**
     * Validations
     * / Валидациии
     */
    validators?: ValidatorsFunction<FormControl<TEntity>>[];
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | null;
    /**
     * Additional information
     * / Блок с дополнительной информацией
     */
    additionalData?: any;
    /**
     * Callback always when value changes
     * / Срабатывает всегда при изменении значения
     */
    onChangeValue?: UpdateValidValueHandler<TEntity> | null;
    /**
     * Callback get last valid value
     * / Передает последние валидное значение
     */
    onChangeValidValue?: UpdateValidValueHandler<TEntity> | null;
    /**
     * Invoke `onChangeValidValue` when `FormControl` is created.
     * / Вызвать `onChangeValidValue` при создании `FormControl`.
     * @example
     * const model = observable({ value: 123 });
     * new FormControl(
     *   () => model.value,
     *   [],
     *   value => { console.log({ value }); },
     *   { callSetterOnInitialize: true }
     * ); // then we see { value: 123 } in console immediately
     */
    callSetterOnInitialize?: boolean;
    /**
     * Invoke `onChangeValidValue` when value-getter that passed as first argument changes its underlying value.
     * / Вызывать `onChangeValidValue` при каждом изменении результата функции-геттера из первого аргумента.
     * @default false
     * @example
     * const model = observable({ value: 123 });
     * new FormControl(
     *   () => model.value,
     *   [],
     *   value => { console.log({ value }); },
     *   { callSetterOnReinitialize: true }
     * );
     * model.value = 456; // then we see { value: 456 } in console
     */
    callSetterOnReinitialize?: boolean;
    comparer?: Comparer<TEntity>;
}
export declare class FormControl<TEntity = string> extends AbstractControl {
    /**
     * Initializing valueI
     * / Инициализирующие значение или его getter
     */
    private valueOrGetter;
    private reactionOnValueGetterDisposer;
    private reactionOnInternalValueDisposer;
    private readonly reactionOnIsActiveDisposer;
    private readonly reactionOnIsDirtyDisposer;
    private readonly reactionOnIsFocusedDisposer;
    private readonly validators;
    private readonly setValidValue;
    private readonly onChangeValue;
    private readonly callSetterOnInitialize;
    private readonly callSetterOnReinitialize;
    private isInitializedValue;
    private isInitializedActived;
    private get isInitialized();
    get processing(): boolean;
    private internalValue;
    get value(): TEntity;
    set value(value: TEntity);
    get invalid(): boolean;
    private isDirty;
    get dirty(): boolean;
    private isTouched;
    get touched(): boolean;
    private isFocused;
    get focused(): boolean;
    private get initialValueGettter();
    private comparer;
    /**
     * Get Initializing value
     * / Получить инициализирующее значение
     */
    get initialValue(): TEntity;
    /**
     * Changed value is not equal to initializing value
     * / Измененное значение не равно инициализирующему значению
     */
    get changed(): boolean;
    constructor(
    /**
     * Initializing valueI
     * / Инициализирующие значение или его getter
     */
    valueOrGetter: TEntity | (() => TEntity), 
    /**
     * Options
     * / Опции
     */
    options?: OptionsFormControl<TEntity>);
    setInitialValue: (valueOrGetter: TEntity | (() => TEntity)) => this;
    executeAsyncValidation: (validator: (control: this) => Promise<ValidationEvent[]>) => Promise<ValidationEvent[]>;
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
    setFocused: (focused: boolean) => this;
    protected handleReset(): this;
    dispose(): void;
    runInAction(action: () => void): void;
    private checkInternalValue;
}
export {};
