import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
interface SideNavToggle{

  screenWidth:number;
  collapsed:boolean;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
title :any= 'sidenav';
isSideNavCollapsed :boolean= false;
screenWidth :any= 0;

  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;

  }
  
}
