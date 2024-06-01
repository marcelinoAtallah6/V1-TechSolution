import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CardsComponent } from '../components/cards/cards.component';
import { CommonFunctions } from '../common/CommonFunctions';
import { Console } from 'console';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { DynamicSearchComponent } from '../components/dynamic-search/dynamic-search.component';
import { AlertComponent } from '../components/alert/alert.component';
import { PositiionType } from '../components/alert';
// import domtoimage from 'dom-to-image';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/alert/alert.dialog.component';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../components/alert/alert.confirmation.component';
// import * as jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; // Import html2canvas
// import * as html2pdf from 'html2pdf.js';
import { Notification } from "../components/c-notification/c-notification";

// ...



interface CardData {
  image: string;
  description: string;
}
interface MyObject {
  condition: string;
}
@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.component.html',
  styleUrls: ['./store-items.component.css']
})


export class StoreItemsComponent implements OnInit {
  isChecked: boolean = false;
  cardArray : any = [];
  modeType : any  ;
  modalRef: NgbModalRef | undefined;
  records: any[] = [];
  body : any = "";
  imageUrl : any = "";
  isSuccess : Boolean = false;
  isSelected : any;
  allProducts : any = [];
  public columnCount : number =0;

  public isDynamicSearch : Boolean = false;
  public currentPage : number = 0;
  public dynSearchCondition : any ="";
  public query: any;
  public wherecondition  : any ="";
  config: QueryBuilderConfig = {
    fields: {
      product_desc: {
        name: "Product Number",
        type: "string"
    },
    product_gram: {
        name: "Grams",
        type: "number"
    },
    product_stone: {
        name: "Stone Size",
        type: "string"
    },
    product_stone_weight: {
        name: "Stone Weight",
        type: "string"
    },
    product_size: {
        name: "Size",
        type: "number"
    },
    product_other2: {
        name: "Other2",
        type: "string"
    },
    product_other1: {
        name: "Other1 ",
        type: "string"
    },
    product_price: {
        name: "Price",
        type: "number"
    }
    }
    
  };
  
  cardDataList: CardData[] = [
    {
      image: 'https://example.com/image1.jpg',
      description: 'Card 1 Description'
    },
    {
      image: 'https://example.com/image2.jpg',
      description: 'Card 2 Description'
    }
    // Add more card data as needed
  ];

  //  query = {
//   condition: 'and',
//   rules: [
//     {field: 'product_desc', operator: '<=', value: 'cet60'},
//   ]
// };

  @ViewChild('myModalContent') myModalContent: ElementRef | undefined;
  @ViewChild('content') content!: ElementRef;
  @ViewChild(CardsComponent) cardsComponent: CardsComponent | undefined;
  @ViewChild(DynamicSearchComponent) dynamicSearchComponent: DynamicSearchComponent | undefined;
  @ViewChild('middleAlert', { static: false }) middleAlert!: AlertComponent;
  @ViewChild('checkItems', { static: false }) checkbox: ElementRef<HTMLInputElement> | undefined;
  @ViewChild(Notification) notif!:Notification  ;
  @ViewChild(Notification) notif1: Notification | undefined;

  Position = PositiionType;

  // dynamicSearchForm= new FormGroup({
  //   query: new FormControl(''),
  // });

  productForm = new FormGroup({
    product_id: new FormControl(''),
    product_gram: new FormControl(''),
    product_stone: new FormControl(''),
    product_stone_weight: new FormControl(''),
    product_price: new FormControl(''),
    product_size: new FormControl(''),
    product_other1: new FormControl(''),
    product_other2: new FormControl(''),
    product_desc: new FormControl('', Validators.compose([Validators.required])),
    product_image:new FormControl('')
  });

  productSearchForm = new FormGroup({
    product_id: new FormControl(''),
    product_gram: new FormControl(''),
    product_stone: new FormControl(''),
    product_stone_weight: new FormControl(''),
    product_price: new FormControl(''),
    product_size: new FormControl(''),
    product_other1: new FormControl(''),
    product_other2: new FormControl(''),
    product_desc: new FormControl(''),
  });
  
   ngOnInit(): void {


  
    this.dynSearchCondition = "";
    // this.http.get<any>('http://localhost:8888/api/getDynamicSearchFilters/storeItems').subscribe((res: any) => {
      
    //   const configFields: { [key: string]: any } = {};
    //   for (let i = 0; i < res.length; i++) {
    //   const fieldCol = res[i].name;
    //   const fieldName = res[i].attribute_name;

    //   const fieldType = res[i].type;
    //   configFields[fieldCol] = { name: fieldName, type: fieldType };
    // }

    // this.config.fields = configFields;
    //   this.cdr.detectChanges();
    // });

    this.imageUrl="assets/img/logo.jpg";

    // this.http.get<any>('http://localhost:8888/api/getAllRecords').subscribe((res:any)=>{




  //  this.http.get<any>('http://localhost:8888/api/getMoreRecords/'+this.currentPage+'/12').subscribe((res:any)=>{


  const myObject: MyObject = {
    condition: this.dynSearchCondition,
  };
  // this.http.get<any>('http://localhost:8888/api/getMoreRecords/'+this.currentPage+'/12').subscribe((res:any)=>{
    this.http.post<any>('http://localhost:8888/api/getAllProductsRecords/'+this.currentPage+'/100',myObject).subscribe((res:any)=>{

   this.currentPage = this.currentPage + 1;
   this.getProcutsRecords(res);

    })

  }
  

  moreRecordsV2()
  {
    // const myObject: MyObject = {
    //   condition: this.dynSearchCondition,
    // };
       const myObject: MyObject = {
      condition:     this.wherecondition,
    };
    // this.http.get<any>('http://localhost:8888/api/getMoreRecords/'+this.currentPage+'/12').subscribe((res:any)=>{
      this.http.post<any>('http://localhost:8888/api/getAllProductsRecords/'+this.currentPage+'/100',myObject).subscribe((res:any)=>{

    this.currentPage = this.currentPage + 1;

    if(res.length == 0){
      this.isDynamicSearch =true;
    }
    else{
      this.isDynamicSearch =false;
    }

    this.pushProcutsRecords(res);
 
     })
  }

  moreRecords()
  {
    const myObject: MyObject = {
      condition: this.dynSearchCondition,
    };
    // this.http.get<any>('http://localhost:8888/api/getMoreRecords/'+this.currentPage+'/12').subscribe((res:any)=>{
      this.http.post<any>('http://localhost:8888/api/getAllProductsRecords/'+this.currentPage+'/100',myObject).subscribe((res:any)=>{

    this.currentPage = this.currentPage + 1;

    if(res.length == 0){
      this.isDynamicSearch =true;
    }
    else{
      this.isDynamicSearch =false;
    }

    this.pushProcutsRecords(res);
 
     })
  }

  dynamicSearchBtn(value:string){




    this.isDynamicSearch =false;
    this.dynSearchCondition = value;
    const myObject: MyObject = {
      condition: value,
    };
    this.currentPage = 0;

    if(value==""){
      this.records =[];
      this.moreRecords();
    }else{
      this.http.post<any>('http://localhost:8888/api/getAllProductsRecords/'+this.currentPage+'/100',myObject).subscribe((res:any)=>{
        this.currentPage = this.currentPage + 1;
        this.getProcutsRecords(res);
        this.dynamicSearchComponent?.resetCondition();

        if (this.checkbox && this.checkbox.nativeElement.checked) {
          this.allProducts = [];
          this.checkAll();

        }
    
      });
      // this.http.post<any>('http://localhost:8888/api/searchProducts',myObject).subscribe((res:any)=>{
      //   this.getProcutsRecords(res);
      //    this.dynamicSearchComponent?.resetCondition();
    
      // });
    }


  }
  async pushProcutsRecords(res: any) {
    for (const element of res) {
      this.imageUrl = "assets/img/" + element.product_desc + ".jpg";
  
      try {
        const exists = await this.checkImageExists(this.imageUrl);
        if (exists) {
          console.log('Image exists!');
          this.createCards(element, "assets/img/" + element.product_desc + ".jpg");
        } else {
          this.imageUrl = "assets/img/logo.jpg";
          this.createCards(element, "assets/img/logo.jpg");
          console.log('Image does not exist!');
        }
      } catch (error) {
        this.createCards(element, "assets/img/logo.jpg");
        console.error('Error occurred while checking image existence:', error);
      }
    }
  }
  
  
  // pushProcutsRecords(res : any){
  //   res.forEach(async (element : any)=> {
  
  //                   this.imageUrl ="assets/img/"+element.product_desc+".jpg";
  //                   this.checkImageExists(this.imageUrl)
  //                   .then(exists => {
  //                     if (exists) {
  //                       console.log('Image exists!');
  //                       this.createCards(element, "assets/img/"+element.product_desc+".jpg");

  //                     } else {
  //                       this.imageUrl = "assets/img/logo.jpg";
  //                       this.createCards(element, "assets/img/logo.jpg");
  //                       console.log('Image does not exist!');
  //                     }
  //                   })
  //                   .catch(error => {
  //                     this.createCards(element, "assets/img/logo.jpg");
  //                     console.error('Error occurred while checking image existence:', error);
  //                   });

  //               });



  // }

  private createCards(element: any, imageUrl: string) {

    const bodyArray  = [['<strong>Grams&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </strong>'+ element.product_gram + ''],
    ['<strong>Stone Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> '+ element.product_stone +''],
    ['<strong>Stone Weight&nbsp;:</strong> '+ element.product_stone_weight +''],
    ['<strong>Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> '+ element.product_size +''],
    ['<strong>Other 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </strong>'+ element.product_other1 +''],
    ['<strong>Other 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </strong>'+ element.product_other2 +''],
    [ '<strong>Price in USD&nbsp;&nbsp;&nbsp;: </strong>'+ element.product_price +'']];

    this.body =  `Grams       : ${element.product_gram}
    Stone Size  : ${element.product_stone}
    Stone Weight: ${element.product_stone_weight}
    Size        : ${element.product_size}
    Other 1     : ${element.product_other1}
    Other 2     : ${element.product_other2}
    Price in USD: ${element.product_price}`;


    const properties = [
      { label: 'Grams&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_gram' },
      { label: 'Stone Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_stone' },
      { label: 'Stone Weight&nbsp;:', key: 'product_stone_weight' },
      { label: 'Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_size' },
      { label: 'Other 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_other1' },
      { label: 'Other 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_other2' },
      { label: 'Price in USD&nbsp;&nbsp;&nbsp;:', key: 'product_price' }
    ];

    const bodyArray1 = properties.map(prop => {
      const value = element[prop.key].toString().replace(/\n/g, '<br>');
      const labelLength = prop.label.indexOf(':') + 1;

      const indent = '&nbsp;'.repeat(26); // Align with ':' character
      const indentedValue = value.replace(/<br>/g, `<br>${indent}`);
      return `<strong>${prop.label}</strong> ${indentedValue}`;
    });


    const record = {
      id: element.product_id,
      image: imageUrl,
      title: element.product_desc,
      body: bodyArray1,
      footer: 'test'
    };
  
    this.records.push(record);
  }

//   private createCards(element: any, imageUrl: string) {

//     const properties = [
//       { label: 'Grams&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_gram' },
//       { label: 'Stone Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_stone' },
//       { label: 'Stone Weight&nbsp;:', key: 'product_stone_weight' },
//       { label: 'Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_size' },
//       { label: 'Other 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_other1' },
//       { label: 'Other 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:', key: 'product_other2' },
//       { label: 'Price in USD&nbsp;&nbsp;&nbsp;:', key: 'product_price' }
//     ];

//     const bodyArray1 = properties.map(prop => {
//       const value = element[prop.key].toString().replace(/\n/g, '<br>');
//       const label = prop.label;

//       // Calculate label length without HTML tags
//       const labelLength = label.replace(/<\/?[^>]+(>|$)/g, '').length;

//       const indentedValue = value
//         .split('<br>')
//         .map((line: any, index: number) => {
//           if (index === 0) {
//             return line;
//           } else {
//             const indentation = '&nbsp;'.repeat(25); // Align with ':' character
//             return `${indentation}${line}`;
//           }
//         })
//         .join('<br>');

//       return `${label}${indentedValue}`;
//     });

//     // Rest of your code...

//     const record = {
//       id: element.product_id,
//       image: imageUrl,
//       title: element.product_desc,
//       body: bodyArray1,
//       footer: 'test'
//     };
  
//     this.records.push(record);
// }


  // getProcutsRecords(res : any){
  //   this.records =[];
  //   res.forEach(async (element : any)=> {
   
  //     this.imageUrl ="assets/img/"+element.product_desc+".jpg";
  //     this.checkImageExists(this.imageUrl)
  //     .then(exists => {
  //       if (exists) {
  //         this.createCards(element,"assets/img/"+element.product_desc+".jpg");

  //       } else {
  //         this.imageUrl = "assets/img/logo.jpg";
  //         this.createCards(element, "assets/img/logo.jpg");
  //       }
  //     })
  //     .catch(error => {
  //       this.createCards(element, "assets/img/logo.jpg");
  //       console.error('Error occurred while checking image existence:', error);
  //     });

  // });
  // }

  // async getProcutsRecords(res: any) {
  //   this.records = [];
  //   const promises = res.map(async (element: any) => {
  //     this.imageUrl = "assets/img/" + element.product_desc + ".jpg";
  //     try {
  //       const exists = await this.checkImageExists(this.imageUrl);
  //       if (exists) {
  //         this.createCards(element, "assets/img/" + element.product_desc + ".jpg");
  //       } else {
  //         this.imageUrl = "assets/img/logo.jpg";
  //         this.createCards(element, "assets/img/logo.jpg");
  //       }
  //     } catch (error) {
  //       this.createCards(element, "assets/img/logo.jpg");
  //       console.error('Error occurred while checking image existence:', error);
  //     }
  //   });
  
  //   await Promise.all(promises);
  // }
  
  async getProcutsRecords(res: any) {
    this.records = [];
  
    for (const element of res) {
      this.imageUrl = "assets/img/" + element.product_desc + ".jpg";
      
      try {
        const exists = await this.checkImageExists(this.imageUrl);
        if (exists) {
          this.createCards(element, "assets/img/" + element.product_desc + ".jpg");
        } else {
          this.imageUrl = "assets/img/logo.jpg";
          this.createCards(element, "assets/img/logo.jpg");
        }
      } catch (error) {
        this.createCards(element, "assets/img/logo.jpg");
        console.error('Error occurred while checking image existence:', error);
      }
    }
  }
  

  checkImageExists(imageUrl: string): Promise<boolean> {
    return this.http.head(imageUrl, { observe: 'response' })
      .toPromise()
      .then(response => {
        return response?.status === 200; // Return true if the status is 200 (OK)
      })
      .catch(() => {
        return false; // Return false if an error occurs or status is not 200
      });
    }

  select(){
    this.isChecked =  false;
    this.allProducts = [];

    this.cardsComponent?.select();
    this.isSelected = this.cardsComponent?.isSelected;
  }

  cancel(){
    this.cardsComponent?.cancel();
    this.isSelected = this.cardsComponent?.isSelected;
  }
  async checkAllV2() {
    this.allProducts = [];
    
    if (this.checkbox && this.checkbox.nativeElement.checked) {
      const myObject: MyObject = {
        condition: this.wherecondition,
      };
  
      try {
        const res = await this.http.post<any>('http://localhost:8888/api/searchProducts', myObject).toPromise();
  
        for (const element of res) {
          this.allProducts.push(element.product_id);
        }
        
      } catch (error) {
        console.error('Error occurred while making the API request:', error);
      }
    } else {
      this.allProducts = [];

      return;
    }
  }


  async checkAll() {
    this.allProducts = [];
    
    if (this.checkbox && this.checkbox.nativeElement.checked) {
      const myObject: MyObject = {
        condition: this.dynSearchCondition,
      };
  
      try {
        const res = await this.http.post<any>('http://localhost:8888/api/searchProducts', myObject).toPromise();
  
        for (const element of res) {
          this.allProducts.push(element.product_id);
        }
      } catch (error) {
        console.error('Error occurred while making the API request:', error);
      }
    } else {
      return;
    }
  }
  
  // checkAll(){
  //   this.allProducts = [];
  //   const allproductsarray: any[] = [];
  //   if (this.checkbox && this.checkbox.nativeElement.checked) {
      
  //     const myObject: MyObject = {
  //     condition: this.dynSearchCondition,
  //   };
  //     this.http.post<any>('http://localhost:8888/api/searchProducts',myObject).subscribe((res:any)=>{
  //         res.forEach(async (element : any)=> {
  //         // allproductsarray.push(element.product_id);

  //         });
  //     });
  //   } else {
  //     return;
  //   }

  //   // this.allProducts = allproductsarray;
  //   alert(this.allProducts)
  // }


  // exportPdf(cardsData: any[]) {
  //   const doc = new jsPDF();
  
  //   this.cardDataList.forEach((card, index) => {
  //     if (index > 0) {
  //       doc.addPage();
  //     }
      
  //     // Add image and description to the PDF
  //     doc.addImage('assets/img/CB001.jpg', 'JPEG', 10, 10, 50, 50);
  //     doc.text(card.description, 30,70);
  //   });
    
  //   doc.save('report.pdf');
  // }

  

  exportPdfAll()
  {//assets/img/logo.jpg
   
    if(this.allProducts.length > 0)
    {
      this.exportPdf(this.allProducts);

    }else
    {
      this.cardArray  = this.cardsComponent?.cardArray;

      if(this.cardArray.length > 0)
      {
        this.exportPdf(this.cardArray);
      }
      else{
        this.openAlertDialog("No Data To Export");
      }
      
    }
  }

//   exportPdf1(value : any): void {
// const canvas = document.createElement('canvas');
// const ctx: any = canvas.getContext('2d');
// const scale = 4; // Adjust the scale factor as needed to improve resolution

// const imageWidth = 100; // Width of the original image
// const imageHeight = 200; // Height of the original image

// canvas.width = imageWidth * scale; // Adjusted width based on the scale factor
// canvas.height = imageHeight * scale; // Adjusted height based on the scale factor

// this.http.get('http://localhost:8888/api/getProductName/' + value, { responseType: 'text' }).subscribe((res: any) => {

//   const rows = [
//     {
//       title: 'Title 1',
//       description: 'Description 1',
//       imagePath: 'assets/img/logo.jpg'
//     },
//     {
//       title: 'Title 2',
//       description: 'Description 2',
//       imagePath: 'assets/img/CB001.jpg'
//     },
//     // Add more rows as needed
//   ];

//   const documentDefinition: any = {
//     pageSize: 'A4', // Use standard A4 size
//     pageOrientation: 'portrait',
//     content: [],
//     defaultStyle: {
//       font: 'Roboto' // Change the font to 'Roboto'
//     }
//   };

//   rows.forEach((row) => {
//     const image = new Image();
//     image.src = row.imagePath;

//     // Wait for the image to load
//     image.onload = () => {
//       // Draw the image onto the canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//       const imageData = canvas.toDataURL('image/png');

//       const rowContent = [
//         {
//           columns: [
//             {
//               image: imageData,
//               width: 100,
//               height: 200,
//               margin: [0, 0, 10, 0], // Add margin on the right
//             },
//             {
//               stack: [
//                 { text: row.title, fontSize: 18, bold: true },
//                 { text: row.description, fontSize: 12 },
//               ],
//             },
//           ],
//           margin: [0, 0, 0, 10], // Add margin at the bottom
//         }
//       ];

//       documentDefinition.content.push(rowContent);
//     };
//   });

//   // Generate and download the PDF outside the forEach loop
//   setTimeout(() => {
//     pdfMake.createPdf(documentDefinition).download(res + '.pdf');
//   }, 100);
// });

//   }

checkImageExistence(imageUrl: string): Promise<boolean> {
  const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }); // Add any required headers

  return this.http.head(imageUrl, { headers }).toPromise()
    .then(() => {
      console.log('Image exists');
      return true;
    })
    .catch(error => {
      if (error.status === 404) {
        console.log('Image not found');
        return false;
      } else {
        console.error('An error occurred while checking image existence:', error);
        return false;
      }
    });
}


exportPdf(value: any): void {
  const canvas = document.createElement('canvas');
  const ctx: any = canvas.getContext('2d');
  const scale = 4; // Adjust the scale factor as needed to improve resolution

  const imageWidth = 50; // Width of the original image
  const imageHeight = 100; // Height of the original image

  canvas.width = imageWidth * scale; // Adjusted width based on the scale factor
  canvas.height = imageHeight * scale; // Adjusted height based on the scale factor
  this.notif.type ='info' ;
  this.notif.message='Export Under Progress...';
  this.notif.loader=true;
  this.notif.showtoast();

  this.http.get<any>('http://localhost:8888/api/export/' + value).subscribe((res: any) => {
    const rows: any[] = [];
    const promiseActions: Promise<void>[] = [];

    console.log("this.res >> ",res)

    
    res.forEach((item: any) => {

        let body =  ``;

        if(item.product_gram != ''){
        body = body +`Grams            : ${item.product_gram}`;}
        if(item.product_stone != ''){
          body = body +` 
        Stone Size     : ${item.product_stone}`;} 
        if(item.product_stone_weight != ''){
            body = body +` 
        Stone Weight: ${item.product_stone_weight}`;} 
        if(item.product_size != ''){
        body = body +` 
        Size                : ${item.product_size}`;} 
        if(item.product_other1 != ''){
          body = body +` 
        Other 1          : ${item.product_other1}`;} 
        if(item.product_other2 != ''){
           body = body +` 
        Other 2          : ${item.product_other2}`;}
        if(item.product_price != ''){
          body = body +` 
        Price in USD : ${item.product_price}`;}

          let imagePath : String = "";
      
          const imagePromise = this.checkImageExistence('http://localhost:8888/assets/img/' + item.product_desc + '.jpg')
      .then((imageExists: any) => {
        if (imageExists) {
          imagePath = 'assets/img/' + item.product_desc + '.jpg';
        } else {
          imagePath = 'assets/img/logo.jpg';
        }

        const response = {
          title: item.product_desc,
          description: body,
          imagePath: imagePath,
        };

        rows.push(response); // Note: Pushing inside the promise callback
      });

    promiseActions.push(imagePromise); // Add the promise to the array

  
    });

    Promise.all(promiseActions)
    .then(() => {

    // let standardPageHeight = 842; // A4 page height in units
      this.getrowss(rows).then((documentDefinition: any) => {
        
      pdfMake.createPdf(documentDefinition).download('Cavalier.pdf');
      this.notif.type='success';
      this.notif.message='Export Completed.';
      this.notif.loader=true;
      this.notif.showtoast();
    });
    
  });

});

}

getrowss(rows: any[]): Promise<any> {
  return new Promise<any>((resolve) => {

    const documentDefinition: any = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      content: [],
      defaultStyle: {
        font: 'Roboto',
      },
    };
    
    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    const scale = 4;

    const imageWidth = 150;
    const imageHeight = 75;

    canvas.width = imageWidth * scale;
    canvas.height = imageHeight * scale;

    let standardPageHeight = 842;

    let rowarray: any[]  = [];
    const processRow = (index: number) => {
      // if (index >= rows.length) {console.log("def = ",rowContent)
      //   documentDefinition.content.push(rowContent);

      //   resolve(documentDefinition);
      //   return;
      // }

      const rowContent: any[] = [
        { columns: [] }
      ];

      if (index >= rows.length)
      {
        this.columnCount = 3;
      }
      if(this.columnCount < 3)
      {
        rowarray.push(index);
        this.columnCount = this.columnCount +  1;
        processRow(index + 1); // Process the next row
      } 
      if(this.columnCount >2 ){
        this.columnCount =0;
        // console.log("rowarray[3]",rowarray[3])

        let row1spaceNeeded =0;
        let row2spaceNeeded =0;
        let rowspaceNeeded =0;

       if(0 < rowarray.length)
       {
        const row = rows[rowarray[0]];

        const image = new Image();
        image.src = row.imagePath;

        image.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
           const imageData = canvas.toDataURL('image/jpeg');
  
           const stack = {stack: [
                      {
                        image: imageData,
                        width: imageWidth,
                        height: imageHeight,
                        margin: [0, 0, 0, 5], // Add margin to create space below the image
                      },
                      {
                        text: row.title,
                        fontSize: 12,
                        bold: true,
                        margin: [0, 10, 0, 0],
                      },
                      {
    
                        text: row.description,
                        fontSize: 8,
                        margin: [0, 0, 0, 10],
                        border: [false, false, false, true],
                      },
                    ],
                  };
  
           rowContent[0].columns.push(stack);
  
        };
  
        image.onerror = () => {
          // Handle image load error (if needed)
          console.error('Image load error:', row.imagePath);
          processRow(index + 1); // Proceed to the next row
        };



        // const divDesc = this.renderer.createElement('div');
        // divDesc.innerHTML = row.description; // Set the inner HTML content of the div

        // // Add the div to the document (you should specify a parent element to append it to)
        // document.body.appendChild(divDesc); 
        // const heightInPixels = divDesc.clientHeight;
        // // const totalDscrollHeight;
        //   console.log("totalDescHeight:", heightInPixels);
        
        //   // Remove the div from the document if no longer needed
        //   divDesc.remove();
       const numberOfCharacters = row.description.length;
       const heightInPixels = numberOfCharacters * 8;
       console.log("heightInPixels -------- ",heightInPixels)


        const canvas0 = document.createElement('canvas');
        const context = canvas0.getContext('2d');

        if (context) {
          const fontSize = 8; // Set the desired font size
          const titlefontSize = 12; // Set the desired font size

          const marginBottom =10;
          context.font = `${fontSize}px Arial`;

          const text = row.description; // Replace with your dynamic description text

          // Split the text into lines based on line breaks ('\n')
          const lines = text.split('\n');

          let totalTextHeight = 0;
          // Measure the height of each line and sum them up
          for (const line of lines) {
            const lineTextHeight =
            context.measureText(line).actualBoundingBoxAscent +
            context.measureText(line).actualBoundingBoxDescent;
            
            totalTextHeight += lineTextHeight + 2;
          }
        
          // Add extra space between lines (you can adjust this value as needed)
          // const lineSpacing = 2; // Adjust as needed
        
          // Calculate the total height considering line spacing
          // const totalHeight = totalTextHeight + (lines.length - 1) ;
          const totalHeight = totalTextHeight + marginBottom;
          rowspaceNeeded = this.estimateSpaceNeededForRow1(row, totalHeight,totalHeight);
        } else {
          console.error('Canvas context is null. Unable to measure text height.');
        }
       } 

       if(1 < rowarray.length)
       {
        const row1 = rows[rowarray[1]];

        const image1 = new Image();
        image1.src = row1.imagePath;

        image1.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  
           const imageData1 = canvas.toDataURL('image/jpeg');
  
           const stack1 = {stack: [
                      {
                        image: imageData1,
                        width: imageWidth,
                        height: imageHeight,
                        margin: [0, 0, 0, 5], // Add margin to create space below the image
                      },
                      {
                        text: row1.title,
                        fontSize: 12,
                        bold: true,
                        margin: [0, 10, 0, 0],
                      },
                      {
    
                        text: row1.description,
                        fontSize: 8,
                        margin: [0, 0, 0, 10],
                        border: [false, false, false, true],
                      },
                    ],
                  };
  
           rowContent[0].columns.push(stack1);
  
        };
  
        image1.onerror = () => {
          // Handle image load error (if needed)
          console.error('Image load error:', row1.imagePath);
          processRow(index + 1); // Proceed to the next row
        };
        const canvas1 = document.createElement('canvas');
        const context1 = canvas1.getContext('2d');

        if (context1) {
          const fontSize = 8; // Set the desired font size
          const titlefontSize = 12; // Set the desired font size

          const marginBottom =10;
          context1.font = `${fontSize}px Arial`;

          const text = row1.description; // Replace with your dynamic description text
          // Split the text into lines based on line breaks ('\n')
          const lines = text.split('\n');

          let totalTextHeight = 0;
          // Measure the height of each line and sum them up
          for (const line of lines) {
            const lineTextHeight =
            context1.measureText(line).actualBoundingBoxAscent +
            context1.measureText(line).actualBoundingBoxDescent;
            
            totalTextHeight += lineTextHeight + 2;
          }
        
          // Add extra space between lines (you can adjust this value as needed)
          // const lineSpacing = 2; // Adjust as needed
        
          // Calculate the total height considering line spacing
          // const totalHeight = totalTextHeight + (lines.length - 1) ;
          const totalHeight = totalTextHeight + marginBottom;
          row1spaceNeeded = this.estimateSpaceNeededForRow1(row1, totalHeight,totalHeight);
        } else {
          console.error('Canvas context is null. Unable to measure text height.');
        }
       } 

       if(2 < rowarray.length)
       {
        const row2 = rows[rowarray[2]];

        const image2 = new Image();
        image2.src = row2.imagePath;

        image2.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image2, 0, 0, canvas.width, canvas.height);
  
           const imageData2 = canvas.toDataURL('image/jpeg');
  
           const stack2 = {stack: [
                      {
                        image: imageData2,
                        width: imageWidth,
                        height: imageHeight,
                        margin: [0, 0, 0, 5], // Add margin to create space below the image
                      },
                      {
                        text: row2.title,
                        fontSize: 12,
                        bold: true,
                        margin: [0, 10, 0, 0],
                      },
                      {
    
                        text: row2.description,
                        fontSize: 8,
                        margin: [0, 0, 0, 10],
                        border: [false, false, false, true],
                      },
                    ],
                  };
  
           rowContent[0].columns.push(stack2);
  
        };
  
        image2.onerror = () => {
          // Handle image load error (if needed)
          console.error('Image load error:', row2.imagePath);
          processRow(index + 1); // Proceed to the next row
        };
        const canvas2 = document.createElement('canvas');
        const context2 = canvas2.getContext('2d');
        if (context2) {
          const fontSize = 8; // Set the desired font size
          const titlefontSize = 12; // Set the desired font size

          const marginBottom =10;
          context2.font = `${fontSize}px Arial`;

          const text = row2.description; // Replace with your dynamic description text
          const title = row2.title; // Replace with your dynamic description text

          // Split the text into lines based on line breaks ('\n')
          const lines = text.split('\n');

          let totalTextHeight = 0;
          let totalTitleHeight = 0;
          // Measure the height of each line and sum them up
          for (const line of lines) {
            const lineTextHeight =
            context2.measureText(line).actualBoundingBoxAscent +
            context2.measureText(line).actualBoundingBoxDescent;
            
            totalTextHeight += lineTextHeight + 2;
          }
        
          // Add extra space between lines (you can adjust this value as needed)
          // const lineSpacing = 2; // Adjust as needed

          // Calculate the total height considering line spacing
          // const totalHeight = totalTextHeight + (lines.length - 1) ;
          const totalHeight = totalTextHeight + marginBottom;
          row2spaceNeeded = this.estimateSpaceNeededForRow1(row2, totalHeight,totalHeight);
        } else {
          console.error('Canvas context is null. Unable to measure text height.');
        }
       } 
       

       const spaceNeeded = this.findLargest(rowspaceNeeded,row1spaceNeeded,row2spaceNeeded);
       standardPageHeight -= spaceNeeded;
       if (standardPageHeight <= spaceNeeded) {
         documentDefinition.content.push({ text: '', pageBreak: 'before' });
         standardPageHeight = 842 - spaceNeeded;
       }

       rowarray = [];
       
        
      if (index >= rows.length) {
        setTimeout(() => {
          documentDefinition.content.push(rowContent);
          resolve(documentDefinition);
        return;
      }, 5);
      }
      else
      {     
      setTimeout(() => {
      documentDefinition.content.push(rowContent);
      // rowContent;
        processRow(index);
      }, 1);

      }

   
    }


    };

    processRow(0); // Start processing rows from index 0
  });
}

findLargest(a: number, b: number, c: number): number {
  // Use the Math.max function to find the maximum of the three values
  return Math.max(a, b, c);
}

//wrong path
//  getrowss = (rows: any[]): Promise<any> => {
//   return new Promise<any>((resolve) => {
//     const documentDefinition: any = {
//       pageSize: 'A4',
//       pageOrientation: 'portrait',
//       content: [],
//       defaultStyle: {
//         font: 'Roboto',
//       },
//     };
//     // const transparentPixelDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8BA8AAgAB/wnkpAAAAABJRU5ErkJggg==';
//     const transparentPixelDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

//     const canvas = document.createElement('canvas');
//     const ctx: any = canvas.getContext('2d');
//     const scale = 4;
//     const imageWidth = 150;
//     const imageHeight = 75;

//     canvas.width = imageWidth * scale;
//     canvas.height = imageHeight * scale;

//     const processRow = (index: number) => {
//       if (index >= rows.length) {
//         resolve(documentDefinition);
//         return;
//       }

//       const row = rows[index];
//       const images: { stack: ({ image: string; width: number; height: number; margin: number[]; text?: undefined; fontSize?: undefined; bold?: undefined; border?: undefined; } | { text: any; fontSize: number; bold: boolean; margin: number[]; image?: undefined; width?: undefined; height?: undefined; border?: undefined; } | { text: any; fontSize: number; margin: number[]; border: boolean[]; image?: undefined; width?: undefined; height?: undefined; bold?: undefined; })[]; }[] = [];
//       let imagesLoaded = 0;

//       const handleImageLoad = (imageData: string) => {
//         imagesLoaded++;
//         images.push({
//           stack: [
//             {
//               image: imageData,
//               width: imageWidth,
//               height: imageHeight,
//               margin: [0, 0, 0, 5], // Add margin to create space below the image
//             },
//             {
//               text: row.title,
//               fontSize: 12,
//               bold: true,
//               margin: [0, 10, 0, 0],
//             },
//             {
//               text: row.description,
//               fontSize: 8,
//               margin: [0, 0, 0, 10],
//               border: [false, false, false, true],
//             },
//           ],
//         });

//         if (imagesLoaded === 3) {
//           const rowContent = {
//             columns: images,
//           };

//           documentDefinition.content.push(rowContent);

//           // Reset column count and proceed to the next row
//           processRow(index + 1);
//         }
//       };

//       const loadImage = (imagePath: string) => {
//         const image = new Image();
//         image.src = imagePath;

//         image.onload = () => {
//           ctx.clearRect(0, 0, canvas.width, canvas.height);
//           ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
//           const imageData = canvas.toDataURL('image/jpeg');
//           handleImageLoad(imageData);
//         };

//         image.onerror = () => {
//           // Handle image load error (if needed)
//           console.error('Image load error:', imagePath);
//           // Use the transparent pixel data URL as a placeholder for the failed image
//           handleImageLoad(row.imagePath);
//         };
//       };

//       // Load all three images
//       loadImage(row.imagePath);
//       loadImage(row.titleImagePath);
//       loadImage(row.descriptionImagePath);
//     };

//     // Start processing rows from index 0
//     processRow(0);
//   });
// };


 estimateSpaceNeededForRow1(row: any, descHeight: number,imageHeightnum : number) {
  const titleHeight = 12 + 10; // Title font size + margin at the top
  const imageHeight = 75; // Assuming a fixed image height

  // const descriptionFontHeight = descHeight; // Description font size in points
  // const lineSpacing = 1; // Line spacing factor (adjust as needed)

  // Calculate the maximum number of characters that can fit in a row at the specified maxWidth
  // const maxCharsPerLine = Math.floor(maxWidth / (descriptionFontHeight * 0.65)); // Adjust the factor as needed

  // Split the description text into lines based on the maximum character count per line
  // const descriptionLines = [];
  // const descriptionText = row.description;
  // for (let i = 0; i < descriptionText.length; i += maxCharsPerLine) {
  //   descriptionLines.push(descriptionText.slice(i, i + maxCharsPerLine));
  // }

  // Calculate space needed for description text (using font size and line spacing)
  // const descriptionSpace = descriptionFontHeight * descriptionLines.length * lineSpacing;

  // Calculate the total height
  const totalHeight = titleHeight + imageHeight + descHeight;

  return totalHeight;
}


estimateSpaceNeededForRow(row : any) {
  const titleHeight = 12 + 10; // Title font size + margin at the top
  const descriptionHeight = 8 + 10; // Description font size + margin at the bottom
  const imageHeight = 75; // Assuming a fixed image height

  const descriptionFontHeight = 8; // Description font size in points
  const lineSpacing = 1; // Line spacing factor (adjust as needed)

  // Calculate space needed for description text (using font size and line spacing)
  const descriptionLines = row.description.split('\n');
  const descriptionSpace = descriptionFontHeight * descriptionLines.length * lineSpacing;


  return titleHeight + descriptionHeight + imageHeight + descriptionSpace;
}

  exportExcelAll()
  {//assets/img/logo.jpg
   
    if(this.allProducts.length > 0)
    {
      this.exportExcel(this.allProducts);

    }else
    {
      this.cardArray  = this.cardsComponent?.cardArray;

      if(this.cardArray.length > 0)
      {
        this.exportExcel(this.cardArray);
      }
      else{
        this.openAlertDialog("No Data To Export");
      }
      
    }
  }

  exportExcel(value : any): void {
    this.http.get<any>('http://localhost:8888/api/export/'+value).subscribe((res:any)=>{

    console.log("excel olumns = ",res);

    res.forEach((element : any,index : any)=>{
      element["Product Number"] = element["product_desc"];
      element["Gram"] = element["product_gram"];
      element["Stone"] = element["product_stone"];
      element["Stone Weight"] = element["product_stone_weight"];
      element["Size"] = element["product_size"];
      element["Other1"] = element["product_other1"];
      element["Other2"] = element["product_other2"];
      element["Price"] = element["product_price"];

      delete res[index].product_id;
      delete res[index].product_desc;
      delete res[index].product_gram;
      delete res[index].product_stone;
      delete res[index].product_stone_weight;
      delete res[index].product_size;
      delete res[index].product_other1;
      delete res[index].product_other2;
      delete res[index].product_price;

      delete res[index].product_image;
   });
   
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      res
    );
  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'excel.xlsx');

  });
  }
  
  constructor(private renderer: Renderer2,private modalService: NgbModal,private http: HttpClient,private router: Router,private commonFunctions:CommonFunctions, private cdr: ChangeDetectorRef,private dialog: MatDialog) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;

  }
  openFullScreen() {
    const imgElement = document.querySelector('.img-fluid');
    if (imgElement) {
      if (imgElement.requestFullscreen) {
        imgElement.requestFullscreen();
      } else if (imgElement.requestFullscreen) {
        imgElement.requestFullscreen();
      } else if (imgElement.requestFullscreen) {
        imgElement.requestFullscreen();
      } else if (imgElement.requestFullscreen) {
        imgElement.requestFullscreen();
      }
    }
  }
  submitForm(actionType: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if(this.modeType=="saveNew")
    {
      if(this.productForm.status != "INVALID") {

        
        const formValues = this.productForm.value;

        // Convert null values to empty strings
        Object.keys(formValues).forEach(key => {
          if (formValues[key] === null) {
            formValues[key] = ''; // Convert null to empty string
          }
        });
          
        this.productForm.controls['product_image'].setValue('assets/img/'+this.productForm.get('product_desc')?.value+'.jpg');
        this.http.post<any>('http://localhost:8888/api/insertProduct',formValues,httpOptions).subscribe((res:any)=>{

        if(res.status == "exists"){
          this.openAlertDialog("Product Already Exists");
          return;
        }
        else{
          this.commonFunctions.reloadPage(this.router.url);
          if (this.modalRef) {
            this.modalRef.dismiss('Cross click');
          }
        }


      })

      }else{
  
        // this.middleAlert.info("required fields","Alert");
        return;
      }
  
      this.isSuccess = true;

    }
    else
    {
      if(this.productForm.status != "INVALID") {
          
        this.productForm.controls['product_image'].setValue('assets/img/'+this.productForm.get('product_desc')?.value+'.jpg');
        this.http.post<any>('http://localhost:8888/api/updateProduct/'+this.productForm.get('product_id')?.value,this.productForm.value,httpOptions).subscribe((res:any)=>{

        if(res.status == "exists"){
          this.openAlertDialog("Product Already Exists");
          return;
        }

          this.commonFunctions.reloadPage(this.router.url);
          if (this.modalRef) {
            this.modalRef.dismiss('Cross click');
          }

      })
     }else{
      return;
     }
   
  }

}
submitSearchForm(){
  this.wherecondition="";
  const productSearchForm = this.productSearchForm.value;
  
  // Convert null values to empty strings
  Object.keys(productSearchForm).forEach((key : any,index :any)=> {
    if (productSearchForm[key] != null && productSearchForm[key] !== "" ) 
      {
        if(this.wherecondition == "")
        {
         this.wherecondition = "where upper("+key+") like upper('%"+productSearchForm[key]+"%') "
        }
        else{
          this.wherecondition = this.wherecondition + " And upper("+key+") like upper('%"+productSearchForm[key]+"%') "
        }
      }
      else
      {
      }
  });

  const conditionObject = {
    condition: this.wherecondition.trim(), // Trim to remove any trailing spaces
  };
  this.isDynamicSearch =false;
 
  this.currentPage = 0;

  if(this.wherecondition==""){
    this.records =[];
    this.moreRecordsV2();
  }else{
  this.http.post<any>('http://localhost:8888/api/getAllProductsRecords/'+this.currentPage+'/100',conditionObject).subscribe((res:any)=>{
    console.log(" res >>> ",res)
    this.currentPage = this.currentPage + 1;
    this.getProcutsRecords(res);
    // this.dynamicSearchComponent?.resetCondition();
    // this.wherecondition = "";


    if (this.checkbox && this.checkbox.nativeElement.checked) {
      this.allProducts = [];
      this.checkAllV2();

    }

    // this.commonFunctions.reloadPage(this.router.url);
    if (this.modalRef) {
      this.modalRef.dismiss('Cross click');
    }

  });
}

  // {
  //   "condition": "where product_desc  like  '%CR00%' and product_gram > 1 "
  // }

  console.log(" submitSearchForm === ",this.productSearchForm.value)
  console.log(" wherecondition === ",this.wherecondition)


}
  openModal(content : any) {
    this.modeType = "saveNew";
    this.productForm.reset();
    this.productSearchForm.reset();

    this.imageUrl = "assets/img/logo.jpg";
    this.modalRef = this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

  

  productDescOnChange(){
    this.imageUrl="assets/img/"+this.productForm.get('product_desc')?.value+".jpg";

    this.checkImageExists(this.imageUrl)
                    .then(exists => {
                      if (exists) {
                        // console.log('Image exists!');
                        // this.createCards(element, "assets/img/"+element.product_desc+".jpg");

                      } else {
                        this.imageUrl = "assets/img/logo.jpg";
                        // this.createCards(element, "assets/img/logo.jpg");
                        // console.log('Image does not exist!');
                      }
                    })
                    .catch(error => {
                      this.imageUrl = "assets/img/logo.jpg";
                      // console.error('Error occurred while checking image existence:', error);
                    });
  }

  edit(value : any){

    this.modeType = "update";

    this.productForm.controls['product_id'].setValue(value);
    this.http.get<any>('http://localhost:8888/api/getAllRecordsByProduct/'+value).subscribe((res:any)=>{



    this.productForm.controls['product_desc'].setValue(res.product_desc);
    this.productForm.controls['product_gram'].setValue(res.product_gram);
    this.productForm.controls['product_stone'].setValue(res.product_stone);
    this.productForm.controls['product_stone_weight'].setValue(res.product_stone_weight);
    this.productForm.controls['product_price'].setValue(res.product_price);
    this.productForm.controls['product_other1'].setValue(res.product_other1);
    this.productForm.controls['product_other2'].setValue(res.product_other2);
    this.productForm.controls['product_size'].setValue(res.product_size);

    const promiseActions: Promise<void>[] = [];
    const imagePromise = this.checkImageExistence('http://localhost:8888/assets/img/' + res.product_desc + '.jpg')
    .then((imageExists: any) => {
      if (imageExists) {
        this.imageUrl = 'assets/img/' + res.product_desc + '.jpg';
      } else {
        this.imageUrl = 'assets/img/logo.jpg';
      }
    });
    promiseActions.push(imagePromise); // Add the promise to the array
    // });
    // this.imageUrl="assets/img/"+res.product_desc+".jpg";
    // alert(this.imageUrl)

    // this.checkImageExists(this.imageUrl)
    // .then(exists => {
    //   if (exists) {
    //     this.imageUrl="assets/img/"+res.product_desc+".jpg";
    //     alert(" exists>> "+this.imageUrl)

    //   } else {    alert("not exists>> "+this.imageUrl)

    //     //this.imageUrl = "assets/img/logo.jpg";
    //   }
    // })
    // .catch(error => {    alert("error >> "+this.imageUrl)

    //     //this.imageUrl = "assets/img/logo.jpg";
    //   console.error('Error occurred while checking image existence:', error);
    // });

  });
  
    this.modalRef = this.modalService.open(this.myModalContent, { size: 'lg', backdrop: 'static' });

  }


  openAlertDialog(message: string): void {
  const dialogRef = this.dialog.open(AlertDialogComponent, {
    width: '300px',
    data: { message: message }
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle any actions after the dialog is closed
  });
}

openConfirmationDialog(message: string): Observable<boolean> {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '300px',
    data: { message: message }
  });

  return dialogRef.afterClosed();
}

  delete(value : any){


    this.openConfirmationDialog('Are you sure you want to delete this item?')
    .subscribe(result => {
      if (result) {
        this.http.get<any>('http://localhost:8888/api/deleteProduct/'+value).subscribe((res:any)=>{
          this.commonFunctions.reloadPage(this.router.url);
      
        });
      } else {
        return;
      }
    });
  

}

}

function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

