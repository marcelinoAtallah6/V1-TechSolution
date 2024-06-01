import { Component,forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR,FormGroupDirective, NgForm, } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as $ from 'jquery';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'], 
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
    },
  ],
})

export class DropDownComponent implements ControlValueAccessor {

  public value: String[] = [];

  public changed!: (value: String[]) => void;
  public touched!: () => void;
  public isDisabled!: boolean;

  @Input() public multiple : any;
  @Input() public label : any;
  @Input() public required : any;
  @Input() public parentForm?: FormGroup;
  @Input() public fieldName: any;
  @Input() public comboDatasource: any;
  @Input() public placeholder: any;
  @Input() public matAppearance: any;
  @Input() public floatLabel: any;

  matcher = new MyErrorStateMatcher();

  public dropdownList : any[] = [];
  public selectedItems : any[] = [];

  get formField():FormControl {
    return this.parentForm?.get( this.fieldName ) as FormControl;
  }

  constructor() {}

  public writeValue(value: string): void {
    this.dropdownList = [];
    this.selectedItems = [];

    const obj = Object(value);
    for(let key in obj) {
      this.selectedItems.push(obj[key].roleName);
    }
    this.selectedItems = this.selectedItems.filter(value => value != '{}');

    for(let i = 0; i < this.comboDatasource.length; i++) {
      if(typeof(this.comboDatasource[i].id) !== "undefined") {
        this.dropdownList.push({id: this.comboDatasource[i].id, name: this.comboDatasource[i].name});
      }
    }
    this.dropdownList = this.dropdownList.filter(value => value != '{}');

    if(this.matAppearance == '') {
      this.matAppearance = 'fill';
    }
  }

  public registerOnChange(fn: any): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  public change(event: any):void {
    if(event.source.selected) {
      this.selectedItems.push(event.source.value);
    }

    let uniqueChars = this.selectedItems.filter((c, index) => {
        return this.selectedItems.indexOf(c) === index;
    });

    this.selectedItems = uniqueChars;
    this.changed(this.selectedItems);
  }
}