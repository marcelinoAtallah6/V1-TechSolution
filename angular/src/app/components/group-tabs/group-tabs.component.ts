import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-tabs',
  templateUrl: './group-tabs.component.html',
  styleUrls: ['./group-tabs.component.css']
})
export class GroupTabsComponent implements OnInit {

  @Input() tabsName:any;

  constructor() { }

  ngOnInit(): void {
  }

}
