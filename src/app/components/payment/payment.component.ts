import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/models/card';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
 
  paymentAddForm: FormGroup;
  totalPrice = this.paymentService.totalPrice;
  checked:boolean;
  savedCards:Card[];
  currentCard :Card;

  constructor(private formBuilder: FormBuilder,private paymentService:PaymentService,private cardService:CardService,private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.createPaymentAddForm();
    this.getCardsByCustomer();
   
  }
 
  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      customerId: [this.authService.user.userId],
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      dateMonth: ['', Validators.required],
      dateYear: ['', Validators.required],
      cvvCode: ['', Validators.required],
    });
  }
 
  
  

  completeThePayProcess()
  {
    if(this.paymentAddForm.valid)
    {
      let cardModel = Object.assign({}, this.paymentAddForm.value);
      this.paymentService.addRentalAndPaymentAndCard(cardModel);

    }
  }

 
  getCardInfos(e:any){
    this.currentCard = this.savedCards.filter(x=> x.cardId == e.target.value)[0]
    this.paymentAddForm.patchValue(this.currentCard)
  }

  getCardsByCustomer(){
    this.cardService.getCardsByCustomer(this.authService.user.userId).subscribe(response=>{
      this.savedCards = response.data
      console.log(response)
    })
  }

  changeEvent()
  {
    if(this.checked===true)
    {
      this.paymentService.cardSavedReguest=true;
    }
    else
    {
      this.paymentService.cardSavedReguest=false;
    }
    return this.paymentService.cardSavedReguest;
  }

}
