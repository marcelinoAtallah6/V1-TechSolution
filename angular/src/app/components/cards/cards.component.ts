import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {


  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() exportExcel: EventEmitter<any> = new EventEmitter<any>();
  @Output() exportPdf: EventEmitter<any> = new EventEmitter<any>();


  isSelected : Boolean  = false;
  cardSelection:   Boolean  = false;
  selectAll:   Boolean  = true;


  @Input() json :any ;

  cardArray : any = [];

  constructor(private renderer: Renderer2, private elementRef : ElementRef) { }

  ngOnInit(): void {
  }

  updateBtn(value : any){
  this.edit.emit(value);
  }
  
  deleteBtn(value : any){
    this.delete.emit(value);
    }

    exportExcelBtn(value : any){
      this.exportExcel.emit(value);
      }

      exportPdfBtn(value : any){
        this.exportPdf.emit(value);
        }
        


        select(){
          this.isSelected = true;
        }

        cancel(){
          this.isSelected = false;
          this.selectAll = true;
          this.setClassToDiv();

        }

        // checkAll(allCards : any){
          
        //   this.cardArray = [];
        //   console.log("allCards >> ", allCards)
        //   this.cardArray = allCards;
        //   console.log("allCards >> after   ", this.cardArray)
 
          // if(this.selectAll)
          // {

          //   this.setClassToDiv();

          //   this.selectAll = false;

          // }
          // else
          // {

          //   this.setClassToDiv();

          //   this.selectAll = true;

          // }

        // }

        selectCard(value : any){

          if(this.isSelected)
          {
            const exists =  this.cardArray.includes(value);
            const divElement = this.elementRef.nativeElement.querySelector(`#cardId${value}`);
  
            if (exists) {
  
              divElement.classList.remove('cardSelection');
              const index = this.cardArray.indexOf(value);
              if (index > -1) {
                this.cardArray.splice(index, 1);
              }
  
            } else {
  
              divElement.classList.add('cardSelection');
              this.cardArray.push(value);
  
            }
          }
          else
          {

          }

          


          console.log("this.cardArray on select >>>>>> ",this.cardArray);

        
        }

        setClassToDiv() {

          if(this.isSelected)
          {

            if(this.selectAll)
            {
              for (let i = 0; i < this.cardArray.length; i++) {
  
                const element = this.cardArray[i];
                const divElement = this.elementRef.nativeElement.querySelector(`#cardId${element}`);

                if(divElement)
                divElement.classList.add('cardSelection');

            }
            }
            else
            {
              for (let i = 0; i < this.cardArray.length; i++) {
  
                const element = this.cardArray[i];
                const divElement = this.elementRef.nativeElement.querySelector(`#cardId${element}`);

                if(divElement)
                divElement.classList.remove('cardSelection');
            }
           
            this.cardArray = [];

   
            }
            
          }else{

            console.log("this.cardArray.length; >>>>>> ",this.cardArray.length);

            for (let i = 0; i < this.cardArray.length; i++) {

              const element = this.cardArray[i];
              const divElement = this.elementRef.nativeElement.querySelector(`#cardId${element}`);
              divElement.classList.remove('cardSelection');

   
            }
            this.cardArray = [];
          }


          console.log("this.cardArray >>>>>> ",this.cardArray);
        }
}
