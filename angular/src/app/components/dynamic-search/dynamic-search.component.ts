import { Component, Input, OnInit,Renderer2,ElementRef, ChangeDetectorRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {QueryBuilderClassNames, QueryBuilderComponent} from"angular2-query-builder";
import { QueryBuilderConfig } from 'angular2-query-builder';
import '@angular/compiler';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { PositiionType } from '../alert';
import { AlertService } from '../alert';
import { AlertComponent } from '../alert/alert.component';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'dynamic-search',
  templateUrl: './dynamic-search.component.html',
  styleUrls: ['./dynamic-search.component.css']
})

export class DynamicSearchComponent implements OnInit {

  @Output() dynamicSearchBtn: EventEmitter<any> = new EventEmitter<any>();
  @Output() AlertComponent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('middleAlert', { static: false }) middleAlert!: AlertComponent;
  Position = PositiionType;

  public condition : any = "";
  @Input() menuName : any = "";
  public query:any = {
    condition: 'and',
    rules: [
      // {field: 'product_desc', operator: 'like', value: 'CET60'}
    ]};
    @Input() config: QueryBuilderConfig =
  {
    
      fields: {
          // product_desc: {
          //     name: "Product Number",
          //     type: "string"
          // },
          // product_gram: {
          //     name: "Product Gram",
          //     type: "number"
          // },
          // product_stone: {
          //     name: "Product Stone",
          //     type: "string"
          // },
          // product_stone_weight: {
          //     name: "Product Stone Weight",
          //     type: "string"
          // },
          // product_size: {
          //     name: "Product Size",
          //     type: "number"
          // },
          // product_other2: {
          //     name: "Product Other2",
          //     type: "string"
          // },
          // product_other1: {
          //     name: "Product Other1 ",
          //     type: "string"
          // },
          // product_price: {
          //     name: "Product Price",
          //     type: "number"
          // }
      }
  
 } ;

  constructor(private alertService: AlertService,private modalService: NgbModal,private http: HttpClient, private cdr: ChangeDetectorRef, private elementRef : ElementRef) {

  }

  ngOnInit(): void {

  //   this.http.get<any>('http://localhost:8888/api/getDynamicSearchFilters/'+this.menuName).subscribe((res: any) => {
      
  //   const configFields: { [key: string]: any } = {};
  //   for (let i = 0; i < res.length; i++) {
  //   const fieldCol = res[i].name;
  //   const fieldName = res[i].attribute_name;

  //   const fieldType = res[i].type;
  //   configFields[fieldCol] = { name: fieldName, type: fieldType };
  // }

  // this.config.fields = configFields;
  //   this.cdr.detectChanges();

  //   // this.query = {
  //   //     condition: 'and',
  //   //     rules: [
  //   //       {field: 'product_desc', operator: 'like', value: 'CET60'},
  //   //     ]
  //   //   };
    
  // });

  // this.query = {
  //   condition: 'and',
  //   rules: [
  //     {field: 'product_desc', operator: 'like', value: 'CET60'}
  //   ]
  // };
  // this.query =  this.query.rules ? this.query.rules[0] : null;

// console.log("query dyn >>> ",this.query);
// console.log("config dyn >>> ",this.config);
  }

  ngAfterViewInit(): void {

    const divElement = this.elementRef.nativeElement.querySelector('.q-tree') as HTMLElement;
    
    if (divElement) {
        divElement.style.height = '0px'; // Apply the custom height
    }

  }

  addRule1(){
    // this.query.rules ? this.query.rules[0] : null;
    // this.query.rules[0].value = "CET60";

    console.log("query1>>> ",this.query);
    console.log("config 2>>> ",this.config);
    const divElement = this.elementRef.nativeElement.querySelector('.q-tree') as HTMLElement;
    if (divElement) {
        divElement.style.height = '250px'; // Apply the custom height
    }

  }
  removeRule1(rule:any){

    if(this.query.rules.length === 1)
    {
      const divElement = this.elementRef.nativeElement.querySelector('.q-tree') as HTMLElement;
    
      if (divElement) {
          divElement.style.height = '0px'; // Apply the custom height
      }
    }

  }

  search(){


    if(this.query.rules.length > 0)
    {
      this.condition = "where " ;
    }

    for (let i = 0; i < this.query.rules.length; i++) {
     if(this.query.rules[i].value!="" && this.query.rules[i].value!=undefined ){

      if(i==0)
      {
        this.condition += this.query.rules[i].field+" ";
        if(this.query.rules[i].operator == "contains")
        {
          this.condition += " like ";

        }
        else
        {
          this.condition += this.query.rules[i].operator;
        }
        if(typeof(this.query.rules[i].value) == 'string')
        {
          if(this.query.rules[i].operator =="contains"){
            this.condition += " '%"+this.query.rules[i].value +"%' ";
          }
          else
          {
            this.condition += "'"+this.query.rules[i].value +"' ";
          }

        }
        else if(typeof(this.query.rules[i].value) == 'number')
        {
          this.condition += " "+this.query.rules[i].value +" ";

        }
      }
      else
      {
        this.condition +=this.query.condition +" "+ this.query.rules[i].field+" ";
        if(this.query.rules[i].operator == "contains")
        {
          this.condition += " like ";

        }
        else
        {
          this.condition += this.query.rules[i].operator;
        }
        if(typeof(this.query.rules[i].value) == 'string')
        {
          if(this.query.rules[i].operator =="contains"){
            this.condition += " '%"+this.query.rules[i].value +"%' ";
          }
          else
          {
            this.condition += "'"+this.query.rules[i].value +"' ";
          }

        }
        else if(typeof(this.query.rules[i].value) == 'number')
        {
          this.condition += " "+this.query.rules[i].value +" ";

        }
      }

    }else
    {
      const alert = "Please Fill the Empty fields";
      this.middleAlert.info(alert,"Alert");
      return;
    }

     }

  this.dynamicSearchBtn.emit(this.condition);

}

clear() {
  this.alertService.clear();
}

resetCondition() {
  this.condition = '';
}

  classNames: QueryBuilderClassNames = {
    removeIcon: 'fa fa-minus',
    addIcon: 'fa fa-plus',
    arrowIcon: 'fa fa-chevron-right px-2',
    button: 'btn',
    buttonGroup: 'btn-group',
    rightAlign: 'order-12 ml-auto',
    switchRow: 'd-flex px-2',
    switchGroup: 'd-flex align-items-center',
    switchRadio: 'custom-control-input',
    switchLabel: 'custom-control-label',
    switchControl: 'custom-control custom-radio custom-control-inline',
    row: 'row p-2 m-1',
    rule: 'border',
    ruleSet: 'border',
    invalidRuleSet: 'alert alert-danger',
    emptyWarning: 'text-danger mx-auto',
    operatorControl: 'form-control',
    operatorControlSize: 'col-auto pr-0',
    fieldControl: 'form-control',
    fieldControlSize: 'col-auto pr-0',
    entityControl: 'form-control',
    entityControlSize: 'col-auto pr-0',
    inputControl: 'form-control',
    inputControlSize: 'col-auto'
  }
  
}
