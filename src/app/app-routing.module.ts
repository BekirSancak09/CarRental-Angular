import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './components/brands/brand-list/brand-list.component';
import { CarListComponent } from './components/cars/car-list/car-list.component';
import { CardetailComponent } from './components/cars/cardetail/cardetail.component';
import { CarsComponent } from './components/cars/cars.component';
import { ColorListComponent } from './components/colors/color-list/color-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';



const routes: Routes = [
{path:"",pathMatch:"full",component:CarsComponent},
{path:"cars",component:CarsComponent},
{path:"brands",component:BrandListComponent},
{path:"colors",component:ColorListComponent},
{path:"carlist",component:CarListComponent},
{path:"cars/brand/:brandId",component:CarsComponent},
{path:"cars/color/:colorId",component:CarsComponent},
{path:"cardetail/:carId",component:CardetailComponent},
{path:"login",component:LoginComponent},
{path:"register",component:RegisterComponent},
{path:"user-update",component:UserUpdateComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
