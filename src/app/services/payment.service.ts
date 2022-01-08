import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { AuthService } from './auth.service';
import { CardService } from './card.service';
import { RentalService } from './rental.service';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  
  apiUrl="https://localhost:44388/api/";

  rental:Rental;
  payment:Payment;
  totalPrice:number;
  cardSavedReguest:boolean;
  constructor(private httpClient:HttpClient,private cardService:CardService,private rentalService:RentalService,private toastrService:ToastrService,private authService:AuthService) { }

  addPayment(payment:Payment):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+'payments/add';
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  setPayment(card:Card)
  {
    this.payment=<Payment>{
      customerId: this.authService.user.userId,
      cardNumber:card.cardNumber,
      totalAmount:this.totalPrice

  }
  return this.payment;
  }

  setRental(rental:Rental)
  {
    this.rental=rental;
  }

  addRentalAndPaymentAndCard(card:Card)
  {
     if(this.cardSavedReguest===true)
     {
        this.cardService.addCard(card).subscribe(response=>{
          this.setPayment(card);
             this.addPayment(this.payment).subscribe(response=>{
                this.rentalService.addRental(this.rental).subscribe(response=>{
                  this.toastrService.success('Success.');
              },responseError=>{
                this.toastrService.error(responseError.errors,'');
                
              });
          });
        },responsEror=>{
          this.toastrService.error('');
        });
     }else
     {
       this.setPayment(card);
       this.addPayment(this.payment).subscribe(response=>{
            this.rentalService.addRental(this.rental).subscribe(response=>{
              this.toastrService.success('Success.');
            },responseError=>{
              this.toastrService.error(responseError.errors,'');
            });

       })
     }
  }
}
