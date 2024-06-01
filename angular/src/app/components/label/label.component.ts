import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'c-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  @Input() public text: any;
  @Input() public required: any;

  constructor() {}

  ngOnInit(): void {
  }

}
