import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  apiUrl="https://localhost:44388/api/";
  constructor(private httpClient:HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>>
  {
     let newPath=this.apiUrl+'carimages/getall';
     return this.httpClient.get<ListResponseModel<CarImage>>(newPath);

  }

  getCarImagesByCar(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'carimages/getallbycarId?carId='+ carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
