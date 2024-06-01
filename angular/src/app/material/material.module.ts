import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from "@ng-select/ng-select";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { PdfmakeModule } from 'ng-pdf-make';
// import { FileSaverModule } from 'ngx-filesaver';
// import { enableRipple } from '@syncfusion/ej2-base';
// import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import {QueryBuilderModule} from"angular2-query-builder";
import { ToastrModule } from 'ngx-toastr';


// import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';

// enableRipple(true);

 const materialsArray = [
  ToastrModule.forRoot({timeOut: 5000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: false,
    //progressBar: true,
    closeButton:true,
  }),
  QueryBuilderModule,
  // QueryBuilderModule,
  MatDialogModule,
  BrowserModule,
  FormsModule,
  CdkStepperModule,
  MatStepperModule,
  BrowserAnimationsModule,
  MatCardModule,
  MatGridListModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSidenavModule,
  MatRadioModule,
  ReactiveFormsModule,
  MatTableModule,
  MatToolbarModule,
  MatListModule,
  MatSortModule,
  LayoutModule,
  MatAutocompleteModule,
  NgSelectModule,
  HttpClientModule,
  RouterModule,
  DragDropModule,
  MatSelectModule,
  MatTabsModule,
  NgbModule,
  MatSliderModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [],
  imports: [
    materialsArray,
    CommonModule
  ],
exports: [materialsArray]
})
export class MaterialModule { }
