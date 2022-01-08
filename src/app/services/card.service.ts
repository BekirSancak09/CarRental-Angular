import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl="https://localhost:44388/api/";
  constructor(private httpClient:HttpClient) { }

 
  addCard(card:Card):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+'cards/add';
    return this.httpClient.post<ResponseModel>(newPath,card);
  }

  getCardsByCustomer(customerId:number):Observable<ListResponseModel<Card>>
  {
    let newPath=this.apiUrl+'cards/getcardsbycustomerId';
    return this.httpClient.get<ListResponseModel<Card>>(newPath)
  }
 
}
