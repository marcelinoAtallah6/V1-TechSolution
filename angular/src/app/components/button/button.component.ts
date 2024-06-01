import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'c-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() class:any ;
  @Input() value :any;
  @Input() btnActionType:any;
  @Input() customStyle: any;
  @Input() btnType: any;
  @Input() parentForm: any;
  @Input() fontawesome: any;

  constructor() {}

  get formGroup():FormGroup {
    return this.parentForm as FormGroup;
  }

  ngOnInit(): void {
    if(typeof(this.btnActionType) == 'undefined') {
      this.btnActionType = 'button';
    }

    if(typeof(this.value) == 'undefined') {
      this.value = '';
    }
  }

  formValidation() {
    if(this.formGroup.status == "INVALID") {
      this.formGroup.markAsTouched();
      return;
    }
  }
}