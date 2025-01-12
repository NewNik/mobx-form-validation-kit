import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import { ValidationEvent } from './validation-event';
import { ControlTypes } from './сontrol-types';
import { noop } from './utilites';
import { AbstractControl, UpdateValidValueHandler, ValidatorsFunction } from './abstract-control';

type Comparer<TEntity> = (prev: TEntity, current: TEntity) => boolean;

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

export class FormControl<TEntity = string> extends AbstractControl {
  private reactionOnValueGetterDisposer: IReactionDisposer | undefined;
  private reactionOnInternalValueDisposer: IReactionDisposer | undefined;
  private readonly reactionOnIsActiveDisposer: IReactionDisposer;
  private readonly reactionOnIsDirtyDisposer: IReactionDisposer;
  private readonly reactionOnIsFocusedDisposer: IReactionDisposer;
  private readonly validators: ValidatorsFunction<FormControl<TEntity>>[];
  private readonly setValidValue: UpdateValidValueHandler<TEntity>;
  private readonly onChangeValue: UpdateValidValueHandler<TEntity>;
  private readonly callSetterOnInitialize: boolean;
  private readonly callSetterOnReinitialize: boolean;

  private isInitializedValue: boolean = false;
  private isInitializedActived: boolean = false;
  private get isInitialized(): boolean {
    return this.isInitializedValue || this.isInitializedActived;
  }

  get processing(): boolean {
    return this.inProcessing;
  }

  // @ts-ignore: internalValue is always initialized in this.setInitialValue() call
  private internalValue: TEntity;

  public get value(): TEntity {
    return this.internalValue;
  }

  public set value(value: TEntity) {
    this.internalValue = value;
  }

  get invalid(): boolean {
    return this.active && (this.errors.length > 0 || this.serverErrors.length > 0);
  }

  private isDirty: boolean = false;

  get dirty(): boolean {
    return this.isDirty;
  }

  private isTouched: boolean = false;

  get touched(): boolean {
    return this.isTouched;
  }

  private isFocused: boolean = false;

  get focused(): boolean {
    return this.isFocused;
  }

  private get initialValueGettter(): () => TEntity {
    const valueOrGetter = this.valueOrGetter;
    return valueOrGetter instanceof Function ? valueOrGetter : () => valueOrGetter;
  }

  private comparer: Comparer<TEntity>;

  /**
   * Get Initializing value
   * / Получить инициализирующее значение
   */
  public get initialValue() {
    return this.initialValueGettter();
  }

  /**
   * Changed value is not equal to initializing value
   * / Измененное значение не равно инициализирующему значению
   */
  public get changed() {
    return !this.comparer(this.initialValue, this.internalValue);
  }

  constructor(
    /**
     * Initializing valueI
     * / Инициализирующие значение или его getter
     */
    private valueOrGetter: TEntity | (() => TEntity),
    /**
     * Options
     * / Опции
     */
    options: OptionsFormControl<TEntity> = {},
  ) {
    super(options.activate ?? null, options.additionalData, ControlTypes.Control);
    makeObservable<FormControl<TEntity>, 'internalValue' | 'isDirty' | 'isTouched' | 'isFocused' | 'checkInternalValue'>(this, {
      processing: computed,

      internalValue: observable,
      value: computed,

      invalid: computed,

      isDirty: observable,
      dirty: computed,

      isTouched: observable,
      touched: computed,

      isFocused: observable,
      focused: computed,

      setDirty: action,
      setTouched: action,
      setFocused: action,
      checkInternalValue: action,

      errorMessage: computed,
    });
    this.comparer = options.comparer || ((prev: TEntity, next: TEntity) => prev === next);

    this.validators = options.validators ?? [];
    this.setValidValue = options.onChangeValidValue ?? noop;
    this.onChangeValue = options.onChangeValue ?? noop;
    this.additionalData = options.additionalData ?? null;
    this.callSetterOnInitialize = options.callSetterOnInitialize ?? true;
    this.callSetterOnReinitialize = options.callSetterOnReinitialize ?? false;

    this.reactionOnIsActiveDisposer = reaction(
      () => this.active,
      active => {
        this.serverErrors = [];
        if (active) {
          this.checkInternalValue(this.isInitialized || this.callSetterOnInitialize);
        }
        this.isInitializedActived = true;
        this.onChange.call(this);
      },
    );

    this.reactionOnIsDirtyDisposer = reaction(
      () => this.dirty,
      (isDirty: boolean) => {
        if (isDirty) {
          this.serverErrors = [];
        }
      },
    );

    this.reactionOnIsFocusedDisposer = reaction(
      () => this.focused,
      (isFocused: boolean) => {
        if (!isFocused) {
          this.serverErrors = [];
        }
      },
    );

    this.setInitialValue(valueOrGetter);
  }

  public setInitialValue = (valueOrGetter: TEntity | (() => TEntity)) => {
    this.valueOrGetter = valueOrGetter;

    this.reactionOnValueGetterDisposer && this.reactionOnValueGetterDisposer();

    const reactionOnValueGetter = (initialValue: TEntity) => {
      this.reactionOnInternalValueDisposer && this.reactionOnInternalValueDisposer();
      this.internalValue = initialValue;
      this.reactionOnInternalValueDisposer = reaction(
        () => this.internalValue,
        () => {
          this.onChangeValue(this.internalValue);
          this.isDirty = true;
          this.serverErrors = [];
          this.onChange.call(this);
          this.checkInternalValue(true);
        },
      );
      this.onChange.call(this);
      this.checkInternalValue(this.isInitialized ? this.callSetterOnReinitialize : this.callSetterOnInitialize);
      this.isInitializedValue = true;
    };

    reactionOnValueGetter(this.initialValueGettter());

    this.reactionOnValueGetterDisposer = reaction(this.initialValueGettter, reactionOnValueGetter);

    return this;
  };

  public executeAsyncValidation = (validator: (control: this) => Promise<ValidationEvent[]>): Promise<ValidationEvent[]> =>
    this.baseExecuteAsyncValidation(validator, () => this.checkInternalValue(true));

  /**
   * Set marker "Value has changed"
   * / Установить маркер "Значение изменилось"
   */
  public setDirty = (dirty: boolean) => {
    this.isDirty = dirty;
    return this;
  };

  /**
   * Set marker "field was in focus"
   * / Установить маркер "Поле было в фокусе"
   */
  public setTouched = (touched: boolean) => {
    this.isTouched = touched;
    return this;
  };

  public setFocused = (focused: boolean) => {
    this.isFocused = focused;
    return this;
  };

  protected handleReset() {
    this.value = this.initialValue;
    this.wait().then(() => {
      runInAction(() => {
        this.setDirty(false);
        this.setFocused(false);
        this.setTouched(false);
      });
    });
    return this;
  }

  public dispose(): void {
    super.dispose();
    this.reactionOnValueGetterDisposer && this.reactionOnValueGetterDisposer();
    this.reactionOnInternalValueDisposer && this.reactionOnInternalValueDisposer();
    this.reactionOnIsActiveDisposer();
    this.reactionOnIsDirtyDisposer();
    this.reactionOnIsFocusedDisposer();
  }

  public runInAction(action: () => void): void {
    this.reactionOnValidatorDisposers.push(
      reaction(
        () => action(),
        () => this.checkInternalValue(true),
      ),
    );
  }

  private checkInternalValue = (shouldCallSetter: boolean) => {
    this.inProcessing = true;
    this.serverErrors = [];
    this.onValidation(
      this.validators,
      () => this.checkInternalValue(true),
      () => {
        if (shouldCallSetter && this.setValidValue && this.errors.length === 0) {
          this.setValidValue(this.internalValue);
        }
        this.inProcessing = false;
      },
    );
  };

  /**
   * First error message, server Errors in priority
   * / Сообщение первой ошибки, serverErrors в приоритете
   */
  get errorMessage() {
    return this.serverErrors.length > 0 ? this.serverErrors[0] : this.errors.length > 0 ? this.errors[0].message : '';
  }
}
