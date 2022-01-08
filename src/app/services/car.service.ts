import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

 
  apiUrl="https://localhost:44388/api/";
  
  constructor(private httpClient:HttpClient) { }


 

  getCarDetailsByCar(carId:number):Observable<ListResponseModel<CarDetail>>
  {

   let newUrl=this.apiUrl+ "cars/getcardetailsbycar?carId="+ carId;

    return this.httpClient.get<ListResponseModel<CarDetail>>(newUrl);
  }
  getCarDetails():Observable<ListResponseModel<CarDetail>>
  {
     let newUrl=this.apiUrl + "cars/getcardetails";
     return this.httpClient.get<ListResponseModel<CarDetail>>(newUrl);
  }

  getCarDetailsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>
  {
     let newUrl=this.apiUrl+ "cars/getcardetailsbybrand?brandId="+brandId;
     return this.httpClient.get<ListResponseModel<CarDetail>>(newUrl);
  }

  getCarDetailsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>
  {
     let newUrl=this.apiUrl+ "cars/getcardetailsbycolor?colorId="+colorId;
     return this.httpClient.get<ListResponseModel<CarDetail>>(newUrl);
  }

  getCarDetailsByColorAndBrand(colorId:number,brandId:number):Observable<ListResponseModel<CarDetail>>
  {
    let newUrl=this.apiUrl+ "cars/getcardetailsbycolorandbrand?colorId="+colorId+ "&brandId="+brandId;
     return this.httpClient.get<ListResponseModel<CarDetail>>(newUrl);
  }

  addCar(car:CarDetail):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'cars/add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }


  updateCar(car:CarDetail):Observable<ResponseModel>
  {
   let newUrl=this.apiUrl+ 'cars/update';
   return this.httpClient.post<ResponseModel>(newUrl,car);
  }
  
  deleteCar(car:CarDetail):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'cars/delete';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  
 

  
}
