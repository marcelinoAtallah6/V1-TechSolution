import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormGroupDirective, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'c-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})

// export class InputComponent {


//   @Input() public type: any;
// //   @Input() public placeholder: any;
//   @Input() public label: any;

// }

export class InputComponent implements ControlValueAccessor {

  public value!: string;
  public changed!: (value: string) => void;
  public touched!: () => void;
  public isDisabled!: boolean;

  @Input() public type: any;
  @Input() public placeholder: any;
  @Input() public label: any;
  @Input() public required: any;
  @Input() public parentForm?: FormGroup;
  @Input() public fieldName: any;
  @Input() public matAppearance: any;
  @Input() public textareaCols: any;
  @Input() public textareaRows: any;
  @Input() public floatLabel: any;

  get formField():FormControl {
    return this.parentForm?.get( this.fieldName ) as FormControl;
  }
  
  // Error value matcher for Angular Materials to handle catching errors
  matcher = new MyErrorStateMatcher();

//   constructor() {}

  public onChange(event: Event):void {
    let value = '';
    if(this.type == 'checkbox') {
      // Check if input type is checkbox to return if checked or no
      value = (<HTMLInputElement>event.target).checked.toString();
      this.changed(value);
    } else {
      // Check if input type is of text type to return value
      value = ( <HTMLInputElement>event.target ).value;
      this.changed(value);
    }
  }

  public writeValue(value: string): void {
    this.value = value;
    // Check if the component doesn't contain matAppearance then set it to fill statically 
    if(this.matAppearance == '') {
      this.matAppearance = 'fill';
    }
    // Check if the component doesn't contain required attribute then set it as none required by default
    if(typeof(this.required) == 'undefined') {
      this.required = false;
    }
  }

  public registerOnChange(fn: any): void {
    this.changed = fn;
  }
  
  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}