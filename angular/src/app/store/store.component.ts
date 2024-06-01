import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor() { }

  @Input() collapsed : any = false;
  @Input() screenWidth : any = 0;

  ngOnInit(): void {
  }

  getBodyClass():any{

    let styleClass :any = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    }
    else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

}
