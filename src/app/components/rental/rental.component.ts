import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

@Input() car:CarDetail;
 customerId:number;
 rentDate:Date;
 returnDate:Date;
 totalPrice:number;
 minDate:string="";
 state:number=1;
 firstDate:boolean=false;



  constructor(private paymentService:PaymentService,private toastrService:ToastrService,private authService:AuthService) { }

  ngOnInit(): void {
  
    this.minDate=new Date().toISOString().split("T")[0];
    this.rentDate=new Date(this.minDate);
  }

  addRental()
  {
    let customerId= this.authService.user.userId;
 
   let rental=<Rental>{
       customerId:customerId,
       carId:this.car.carId,
       rentDate:this.rentDate,
       returnDate:this.returnDate
   }
   this.paymentService.setRental(rental)
   this.toastrService.success("Kiralama islemi başarılı")
   this.state=2;
  }

  onChangeEvent(event: any)
  {
    this.minDate=event.target.value;
    this.firstDate=true;
  }

  checkReturnDate()
  {
    if(this.returnDate<this.rentDate)
    {
      this.returnDate=this.rentDate
    }
  }

  totalAmount(date:any)
  {
    let differance= new Date(this.returnDate).getTime()-new Date(this.rentDate).getTime();
    let amount = new Date(differance).getDate();
    this.paymentService.totalPrice=amount*this.car.dailyPrice
  }

}
