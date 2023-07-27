import { IReactionDisposer } from 'mobx';
import { ControlTypes } from './сontrol-types';
import { ValidationEvent } from './validation-event';
import { ValidationEventTypes } from './validation-event-types';
import { IDictionary } from './idictionary';
import { Delegate } from './delegate';
export type UpdateValidValueHandler<TEntity> = (val: TEntity) => void;
export type ValidatorsFunction<TAbstractControl extends AbstractControl> = (control: TAbstractControl) => Promise<ValidationEvent[]>;
export type ControlsCollection = IDictionary<AbstractControl>;
export declare abstract class AbstractControl {
    /**
     * Type
     * / Тип контрола
     */
    readonly type: ControlTypes;
    protected inProcessing: boolean;
    /**
     * Validation in progress
     * / В процессе анализа
     */
    abstract processing: boolean;
    private isActiveFunc;
    /**
     * Error checking is disabled (control is always valid)
     * / Проверка ошибок отключена (контрол всегда валиден)
     */
    get disabled(): boolean;
    /**
     * Error checking enabled
     * / Проверка ошибок включена
     */
    get active(): boolean;
    /**
     * Valid
     * / Валидные данные
     */
    get valid(): boolean;
    /**
     * Invalid
     * / Невалидные данные
     */
    abstract invalid: boolean;
    /**
     * The value has not changed
     * / Значение не изменялось
     */
    get pristine(): boolean;
    /**
     * Value changed
     * / Значение изменялось
     */
    abstract dirty: boolean;
    /**
     * The field was out of focus
     * / Поле не было в фокусе
     */
    get untouched(): boolean;
    /**
     * The field was in focus
     * / Поле было в фокусе
     */
    abstract touched: boolean;
    /**
     * The field is now in focus
     * / Поле сейчас в фокусе
     */
    abstract focused: boolean;
    private _serverErrors;
    /**
     * Additional (server) errors
     * / Дополнительтные (серверные) ошибки
     */
    get serverErrors(): string[];
    /**
     * Additional (server) errors
     * / Дополнительтные (серверные) ошибки
     */
    set serverErrors(value: string[]);
    /**
     * Errors list
     * / Список ошибок
     */
    errors: ValidationEvent[];
    /**
     *  The field contains errors
     * / Присутствуют ошибки
     */
    hasErrors(): boolean;
    /**
     * Warnings messages list
     * / Список сообщений с типом "Внимание"
     */
    warnings: ValidationEvent[];
    /**
     *  The field contains warnings messages
     * / Присутствуют сообщения с типом "Внимание"
     */
    hasWarnings(): boolean;
    /**
     * Informations messages list
     * / Сообщения с типом "Информационные сообщения"
     */
    informationMessages: ValidationEvent[];
    /**
     *  The field contains informations messages
     * / Присутствуют сообщения с типом "Информационные сообщения"
     */
    hasInformationMessages(): boolean;
    /**
     * Successes messages list
     * / Сообщения с типом "успешная валидация"
     */
    successes: ValidationEvent[];
    /**
     *  The field contains successes
     * / Присутствуют сообщения с типом "успешная валидация"
     */
    hasSuccesses(): boolean;
    /**
     * Max message level
     * / Максимальный уровень сообщения
     */
    get maxEventLevel(): ValidationEventTypes;
    /**
     * Set marker "value changed"
     * / Изменяет состояния маркета "данные изменены"
     */
    abstract setDirty(dirty: boolean): this;
    /**
     * Set marker "field was out of focus"
     * / Изменяет состояния маркета "значение было в фокусе"
     */
    abstract setTouched(touched: boolean): this;
    /**
     * Changed value is not equal to initializing value
     * / Измененное значение не равно инициализирующему значению
     */
    abstract get changed(): boolean;
    /**
     * Set initial state
     * / Установить начальное состояние
     */
    reset: () => this;
    /**
     * Initial state handler function
     * / Функция отбработчик установки начального состояния
     */
    protected abstract handleReset(): this;
    /**
     * Field for transferring additional information
     * / Поле для передачи дополнительной информации (в логике не участвует)
     */
    additionalData: any;
    element: HTMLElement | null;
    /**
     * Callback function of on change
     * / Сообщает факт изменения данных
     */
    onChange: Delegate<AbstractControl>;
    constructor(
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate: (() => boolean) | null | undefined, additionalData: any, type: ControlTypes);
    /**
     * Dispose (call in unmount react control)
     * / Вызвать при удалении контрола
     */
    dispose(): void;
    /**
     * Get error by key
     * / Получить ошибку по ключу
     */
    error: (key: string) => ValidationEvent | undefined;
    private newRequestValidation;
    private lastValidators;
    private lastValidationFunction;
    protected reactionOnValidatorDisposers: IReactionDisposer[];
    protected onValidation: <TAbstractControl extends AbstractControl>(validators: ValidatorsFunction<TAbstractControl>[], onValidationFunction: () => void, afterCheck: () => void) => Promise<void>;
    /**
     * Waiting for end of validation
     * Ожидание окончания проверки
     */
    wait(): Promise<void>;
    abstract executeAsyncValidation(validator: (control: this) => Promise<ValidationEvent[]>): Promise<ValidationEvent[]>;
    abstract runInAction(action: () => void): void;
    protected baseExecuteAsyncValidation: (validator: (control: this) => Promise<ValidationEvent[]>, onValidationFunction: () => void) => Promise<ValidationEvent[]>;
}
