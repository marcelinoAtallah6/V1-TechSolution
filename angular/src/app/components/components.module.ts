import { AGGridComponent } from './grid/grid.components';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonComponent } from './button/button.component';
import { DropDownComponent } from './dropdown/dropdown.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SideNavComponent } from  './side-nav/side-nav.component';
import { GroupTabsComponent } from './group-tabs/group-tabs.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { InputComponent } from './input/input.component';
import { LabelComponent } from './label/label.component';
import { FieldErrorComponent } from './field-error/field-error.component';
import { TabComponent } from './tabs/tab.components'
import { TabsComponent } from './tabs/tabs.component';
import { ModalSideNavComponent} from './modal-side-nav/modal-side-nav.component'
import { SliderComponent } from './slider/slider.component';
import { CardsComponent } from './cards/cards.component';
import { NotificationComponent } from './notification/notification.component';
import { Notification } from './c-notification/c-notification';
import { DynamicSearchComponent } from './dynamic-search/dynamic-search.component';
import { AlertComponent } from './alert/alert.component';
import {AlertDialogComponent }from './alert/alert.dialog.component';
import {ConfirmationDialogComponent} from './alert/alert.confirmation.component';

@NgModule({
  declarations: [
    Notification,
    ConfirmationDialogComponent,
    AlertDialogComponent,
    AlertComponent,
    ModalSideNavComponent,
    TabsComponent,
    TabComponent,
    DialogComponent,
    InputComponent,
    GroupTabsComponent,
    NavBarComponent,
    ButtonComponent,
    AGGridComponent,
    DropDownComponent,
    AutocompleteComponent,
    SideNavComponent,
    ButtonComponent,
    LabelComponent,
    FieldErrorComponent,
    SliderComponent,
    CardsComponent,
    NotificationComponent,
    DynamicSearchComponent
  ],
  imports: [
    MaterialModule,
    AgGridModule.withComponents([]),
  ],
  exports : [
    Notification,
    ConfirmationDialogComponent,
    AlertDialogComponent,
    AlertComponent,
    ModalSideNavComponent,
    TabsComponent,
    TabComponent,
    GroupTabsComponent,
    NavBarComponent,
    DialogComponent,
    ButtonComponent,
    AGGridComponent,
    DropDownComponent,
    AutocompleteComponent,
    SideNavComponent,
    InputComponent,
    LabelComponent,
    FieldErrorComponent,
    SliderComponent,
    CardsComponent,
    NotificationComponent,
    DynamicSearchComponent
  ],
  providers: [],
  bootstrap: [ComponentsModule]
})
export class ComponentsModule { }
