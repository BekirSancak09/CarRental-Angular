import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';

import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  carImages:CarImage[]=[];
  carDetail:CarDetail;
  imageUrl:string="https://localhost:44388"
  constructor( private carImageService: CarimageService,private carService:CarService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { 
      
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
          if(params['carId'])
          {
            this.getCarDetailsByCar(params['carId'],)
            this.getCarImagesByCar(params['carId'])
          }
    })
  }

  
  getCarImagesByCar (carId:number)
{
  this.carImageService.getCarImagesByCar(carId).subscribe((response) => {
    this.carImages = response.data
    console.log(response.data)
  });
}
  getCarDetailsByCar(carId:number)
  {
    this.carService.getCarDetailsByCar(carId).subscribe(response=> {
      this.carDetail=response.data[0];
 
       
    })
  }

 
}
