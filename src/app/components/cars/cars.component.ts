import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars:CarDetail[]=[];
  dataLoaded=false;
  filterText:"";
 
  imageUrl:string="https://localhost:44388"
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carImageService:CarimageService) { }

  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe(params=> {
     if(params['colorId'] && params['brandId'])
      {
        this.getCarDetailsByColorAndBrand(params['colorId'],params['brandId']);
      }else if(params['brandId'])
      {
        this.getCarDetailsByBrand(params['brandId']);
      }
      else if(params['colorId'])
      {
        this.getCarDetailsByColor(params['colorId']);
      }
      else 
      {
        this.getCarDetails();
      }
   })
  }

  
  getCarDetails()
   {
     this.carService.getCarDetails()
     .subscribe(response=> {
         if(response.success)
         {
           this.cars=response.data;
           
           this.dataLoaded=true;
         }
     })
   }

   getCarDetailsByBrand(brandId:number)
   {
    this.carService.getCarDetailsByBrand(brandId)
    .subscribe(response=> {
        if(response.success)
        {
          this.cars=response.data;
          this.dataLoaded=true;
        }
    })
   }

   getCarDetailsByColor(colorId:number)
   {
    this.carService.getCarDetailsByColor(colorId)
    .subscribe(response=> {
        if(response.success)
        {
          this.cars=response.data;
          this.dataLoaded=true;
        }
    })
   }

   getCarDetailsByColorAndBrand(colorId:number,brandId:number)
   {
    this.carService.getCarDetailsByColorAndBrand(colorId,brandId)
    .subscribe(response=> {
        if(response.success)
        {
          this.cars=response.data;
          this.dataLoaded=true;
        }
    })
   }


}
