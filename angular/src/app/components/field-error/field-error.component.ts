import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.css']
})
export class FieldErrorComponent implements OnInit {

  @Input() public errorMessage:any;

  constructor() {}

  ngOnInit(): void {
  }

}
