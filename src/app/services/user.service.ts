import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword } from '../models/changePassword';
import { ResponseModel } from '../models/responseModel';
import { UserInfos } from '../models/userInfos';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44388/api/";
  constructor(private httpClient:HttpClient) { }

  updateUserInfos(userInfo:UserInfos):Observable<ResponseModel>
  {
    let newUrl=this.apiUrl+'users/updateuserinfos'
    return this.httpClient.post<ResponseModel>(newUrl,userInfo);

  }

  changeUserPassword(changeUserPassword:ChangePassword):Observable<ResponseModel>
  {
    let newUrl=this.apiUrl+'users/changeuserpassword'
    return this.httpClient.post<ResponseModel>(newUrl,changeUserPassword);
  }
}
