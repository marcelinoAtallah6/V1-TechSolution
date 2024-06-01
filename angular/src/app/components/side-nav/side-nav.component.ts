import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { GlobalConstants } from 'src/app/common/GlobalConstants';
import * as $ from 'jquery';
import { CommonFunctions } from 'src/app/common/CommonFunctions';
import { navbarData } from './nav-data';

interface SideNavToggle{

  screenWidth:number;
  collapsed:boolean;

}

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {

@Output() onToggleSideNav :EventEmitter<SideNavToggle> = new EventEmitter();
collapsed :boolean = false;
screenWidth :any= 0;
navData :any = navbarData;

toggleCollapse():void{

  this.collapsed =!this.collapsed;
  this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})

}
closeSideNav(){
  this.collapsed=false;
  this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})

}

ngOnInit(): void {
  this.screenWidth = window.innerWidth;
}
}
