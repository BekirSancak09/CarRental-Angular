import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { tokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 user:User;
 decodedTokenKey:any;
 
 apiUrl="https://localhost:44388/api/";


  constructor(private httpClient:HttpClient,
   private localStorageService:LocalstorageService,
   private jwtHelper:JwtHelperService) { }



  register(register:Register):Observable<SingleResponseModel<tokenModel>>
  {
     let newUrl=this.apiUrl+'auth/register';
     return this.httpClient.post<SingleResponseModel<tokenModel>>(newUrl,register);
  }
   
  login(login:Login):Observable<SingleResponseModel<tokenModel>>
  {
     let newUrl=this.apiUrl+'auth/login';
     return this.httpClient.post<SingleResponseModel<tokenModel>>(newUrl,login);
  }

 decodedToken(token:any)
 {
    return this.jwtHelper.decodeToken(token);
 }

 isAuthenticated()
 {
    if(this.localStorageService.getToken())
    {
       return true;
    }
    else
    {
       return false;
    }
 }

 loggedIn()
 {
    if(this.localStorageService.getToken())
    {
       return this.jwtHelper.isTokenExpired();
    }
    else
    {
       return false;
    }
 }

 logout(){
  this.localStorageService.removeToken();
}

 isAdmin() {
   let isAdmin = false;
   if (this.loggedIn()) {
     this.user.roles?.map(role => {
       if (role.toLocaleLowerCase().indexOf("admin") !== -1) {
         isAdmin = true;
       }
     })
   }
   return isAdmin;
 }

 getUser() {
   let decodedToken = this.decodedToken(this.localStorageService.getToken())
   if (decodedToken) {
     if (this.loggedIn()) {
       let tokenInfonName = Object.keys(decodedToken).filter(x => x.endsWith('/name'))[0]
       let userName = String(decodedToken[tokenInfonName])

       let tokenInfoId = Object.keys(decodedToken).filter(x => x.endsWith('/nameidentifier'))[0]
       let userId = Number(decodedToken[tokenInfoId]);

       let claimInfo = Object.keys(decodedToken).filter(x => x.endsWith('/role'))[0]
       let roles = decodedToken[claimInfo];

       let emailInfo = decodedToken.email;

       this.user = {
         userId: userId,
         userName: userName,
         email: emailInfo,
         roles: roles
       }
     }
   }
   return this.user;
 }


































  }

