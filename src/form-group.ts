import { action, computed, IReactionDisposer, makeObservable, reaction } from 'mobx';
import { AbstractControl, ControlsCollection, ValidatorsFunction } from './abstract-control';
import { ValidationEvent } from './validation-event';
import { FormAbstractGroup } from './form-abstract-group';
import { ControlTypes } from './сontrol-types';
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
  [K in keyof TControls]: TControls[K] extends FormControl<any>
    ? TControls[K]['value']
    : TControls[K] extends FormGroup
    ? ControlsValueType<TControls[K]['controls']>
    : never;
};

export class FormGroup<
  TControls extends ControlsCollection = ControlsCollection,
  TControlsValues extends ControlsValueType<TControls> = ControlsValueType<TControls>,
> extends FormAbstractGroup {
  private readonly reactionOnIsActiveDisposer: IReactionDisposer;

  private readonly validators: ValidatorsFunction<FormGroup<TControls>>[] = [];

  public controls: TControls;

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
    options: IOptionsFormGroup<TControls> = {},
  ) {
    super(options.activate ?? null, options.additionalData, ControlTypes.Group);
    makeObservable<FormGroup<TControls, TControlsValues>, 'checkGroupValidations'>(this, {
      checkGroupValidations: action,
      chagedData: computed.struct,
      formData: computed.struct,
      updateFormData: action,
    });

    this.controls = controls;
    this.validators = options.validators ?? [];

    this.reactionOnIsActiveDisposer = reaction(
      () => this.active,
      () => {
        this.serverErrors = [];
        this.checkGroupValidations();
        this.onChange.call(this);
      },
    );

    for (const control of this.getControls()) {
      control.onChange.addListen(() => {
        this.serverErrors = [];
        this.checkGroupValidations();
        this.onChange.call(this);
      });
    }

    this.checkGroupValidations();
  }

  public dispose = (): void => {
    super.dispose();
    this.reactionOnIsActiveDisposer();
    for (const control of this.getControls()) {
      control.dispose();
    }
  };

  public executeAsyncValidation = (validator: (control: this) => Promise<ValidationEvent[]>): Promise<ValidationEvent[]> =>
    this.baseExecuteAsyncValidation(validator, () => this.checkGroupValidations());

  protected *getControls(): IterableIterator<AbstractControl> {
    for (const keyName in this.controls) {
      yield this.controls[keyName];
    }
  }

  private checkGroupValidations = () => {
    this.inProcessing = true;
    this.serverErrors = [];
    this.onValidation(this.validators, this.checkGroupValidations, () => (this.inProcessing = false));
  };

  public runInAction(action: () => void): void {
    this.reactionOnValidatorDisposers.push(
      reaction(
        () => action(),
        () => this.checkGroupValidations(),
      ),
    );
  }

  public get changed() {
    for (const control of this.getControls()) {
      if (control.changed && control.active) {
        return true;
      }
    }
    return false;
  }

  protected handleReset() {
    for (const control of this.getControls()) {
      control.reset();
    }
    return this;
  }

  /**
   * An object with the values of all FormControls, in the form in which the FormGroup was initialized
   * / Объект со значениями всех FormControl-ов, в том виде, в которым был проинициализирован FormGroup
   */
  public get formData(): TControlsValues {
    const result: Record<string, any> = {};
    for (const key in this.controls) {
      const control = this.controls[key];
      if (control) {
        if (control instanceof FormGroup) {
          result[key] = control.formData;
        } else if (control instanceof FormControl) {
          result[key] = control.value;
        }
      }
    }
    return result as TControlsValues;
  }

  /**
   * An object with the values of the modified FormControls, in the form in which the FormGroup was initialized
   * / Объект со значений измененных FormControl-ов, в том виде, в которым был проинициализирован FormGroup
   */
  public get chagedData(): Partial<TControlsValues> {
    const result: Record<string, any> = {};
    for (const key in this.controls) {
      const control = this.controls[key];
      if (control && control.changed && control.active) {
        if (control instanceof FormGroup) {
          result[key] = control.formData;
        } else if (control instanceof FormControl) {
          result[key] = control.value;
        }
      }
    }
    return result as Partial<TControlsValues>;
  }

  public updateFormData(data: Partial<TControlsValues>) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const control = this.controls[key];
        if (control) {
          const value: Partial<TControlsValues>[keyof Partial<TControlsValues>] = data[key];
          if (value !== undefined) {
            if (control instanceof FormGroup && value !== null) {
              control.updateFormData(value);
            } else if (control instanceof FormControl) {
              if (value !== control.value) {
                control.value = value;
              }
            }
          }
        }
      }
    }
  }
}
