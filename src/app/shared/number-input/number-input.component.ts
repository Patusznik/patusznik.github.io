import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'chuck-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
  ],
})
export class NumberInputComponent implements ControlValueAccessor {
  private _value = 0;

  onChange = (val: number) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  get value(): number {
    return this._value;
  }

  set value(val) {
    this.markAsTouched();
    this._value = val;
    this.onChange(this._value);
  }

  increment(): void {
    this.value++;
  }

  decrement(): void {
    this.value--;
  }

  writeValue(val: number): void {
    if (val) {
      this.value = val;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  validate({ value }: FormControl) {
    const isNotValid = (value > 100 || value < 1) && this.touched;
    return (
      isNotValid && {
        invalid: true,
      }
    );
  }
}
