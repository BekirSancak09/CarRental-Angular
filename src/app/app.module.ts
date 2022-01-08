import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brands/brand.component';
import { ColorComponent } from './components/colors/color.component';
import { CarsComponent } from './components/cars/cars.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { PaymentComponent } from './components/payment/payment.component';

import { CardetailComponent } from './components/cars/cardetail/cardetail.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandListComponent } from './components/brands/brand-list/brand-list.component';
import { ColorListComponent } from './components/colors/color-list/color-list.component';
import { CarListComponent } from './components/cars/car-list/car-list.component';
import { ToastrModule } from 'ngx-toastr';
import {JwtModule} from '@auth0/angular-jwt';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';



export function tokenGetter(){
  return localStorage.getItem("access_token");
}



@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CarsComponent,
    CustomerComponent,
    NaviComponent,
    PaymentComponent,
   
    CardetailComponent,
    RentalComponent,
    CarFilterPipe,
    BrandListComponent,
    ColorListComponent,
    CarListComponent,
    RegisterComponent,
    LoginComponent,
    UserUpdateComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    JwtModule.forRoot({
        config:{
           tokenGetter:tokenGetter,
           allowedDomains:["http://localhost:4200/"]
        },
    })
   
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
