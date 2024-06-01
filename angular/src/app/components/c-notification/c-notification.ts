import { Component, Input, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'c-notification',
  templateUrl: './c-notification.html',
  styleUrls: ['./c-notification.css']
})
export class Notification implements OnInit {

  constructor(private toastr:ToastrService) { }
  @Input() public type!: string;
  @Input() public message!: string;
  @Input() public loader!: boolean ;

  ngOnInit(): void {  
  }
  showtoast(){
    console.log(this.type); 
    console.log(this.message);
    this.toastr.clear();
    this.toastr.remove;
    if(this.type=='success'){
      this.toastr.success(this.message, this.type[0].toUpperCase()+this.type.substr(1),
      {progressBar:this.loader,timeOut:5000});
    }
   else if(this.type=='info'){
      this.toastr.info(this.message, this.type[0].toUpperCase()+this.type.substr(1),
      {progressBar:this.loader,timeOut:100000});
      
    }
  }
}


