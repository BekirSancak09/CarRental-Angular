import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44388/api/";

  constructor(private httpClient:HttpClient) { }


  getColors():Observable<ListResponseModel<Color>>
  {
    let newUrl=this.apiUrl+"colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  addColor(color:Color):Observable<ResponseModel>
  {
    let newUrl=this.apiUrl+"colors/add";
    return this.httpClient.post<ResponseModel>(newUrl,color);
  }

  updateColor(color:Color):Observable<ResponseModel>
  {
    let newUrl=this.apiUrl+"colors/update";
    return this.httpClient.post<ResponseModel>(newUrl,color);
  }

  deleteColor(color:Color)
  {
    let newUrl=this.apiUrl+"colors/delete";
    return this.httpClient.post<ResponseModel>(newUrl,color);
  }
}


