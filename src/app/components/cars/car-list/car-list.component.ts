import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars:CarDetail[]=[];
  car:CarDetail;
  brands:Brand[]=[];
  
  colors:Color[]=[];
  carAddForm:FormGroup;
  carEditForm:FormGroup;

  constructor(private carService:CarService
    ,private brandService:BrandService,
    private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
   this.getCarDetails();
   this.getBrands();
   this.getColors();

   this.createCarAddForm();
   this.createCarEditForm();

  }

  getCarDetails()
  {
    
     this.carService.getCarDetails().subscribe(response=>{
           this.cars=response.data;
     })
  }

  getBrands()
  {
     this.brandService.getBrands().subscribe(response=>{
    
        this.brands=response.data;        
     })
  }

  getColors()
  {
    this.colorService.getColors()
    .subscribe(response=> {
      if(response.success)
      {
       this.colors=response.data;
   
      }
 
       
    })
  }


  createCarAddForm()
  {
    this.carAddForm=this.formBuilder.group({
      brandId:['',Validators.required],
      colorId:['',Validators.required],
      carName:['',Validators.required],
      modelYear:['',Validators.required],
      dailyPrice:['',Validators.required],
      minFindeksPoint:['',Validators.required],
      description:['']

    })
  }
  
  addCar()
  {
    if(this.carAddForm.valid){
      
   let carmodel=Object.assign({},this.carAddForm.value)
      this.carService.addCar(carmodel).subscribe(response=>{
        console.log(response)
        this.toastrService.success(response.message, "Eklendi")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },responseError=>{
        this.toastrService.error(responseError.error, "Dikkat")
      })
    }
   
  }

 
 getCar(car:CarDetail)
 {
   this.car=car;
    this.carEditForm.patchValue({
      carId:this.car.carId,
      brandId:this.car.brandId,
      colorId:this.car.colorId,
      carName:this.car.carName,
      modelYear:this.car.modelYear,
      dailyPrice:this.car.dailyPrice,
      minFindeksPoint:this.car.minFindeksPoint,
      description:this.car.description

    })
 }

 
 createCarEditForm()
 {
   this.carEditForm=this.formBuilder.group({
    carId:[''],
     brandId:['',Validators.required],
     colorId:['',Validators.required],
     carName:['',Validators.required],
     modelYear:['',Validators.required],
     dailyPrice:['',Validators.required],
     minFindeksPoint:['',Validators.required],
     description:['']

   })
 }
 

 editCar()
 {
   if(this.carEditForm.valid)
   {
     let carmodel=Object.assign({},this.carEditForm.value)
         this.carService.updateCar(carmodel).subscribe(response=> {
           this.toastrService.success(response.message,"Güncellendi")
           setTimeout(()=>{
            window.location.reload();
           },1000)
         },responseError=>{
           this.toastrService.error(responseError.error,"Başarısız")
         })
   }
 }

  deleteCar(car:CarDetail)
  {    
    this.carService.deleteCar(car).subscribe(response=>{
      this.toastrService.success(response.message, "Silindi")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },responseError=>{
      this.toastrService.error(responseError.error, "Başarısız")
    })

  }


 

}



