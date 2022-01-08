import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands:Brand []=[]
  brand:Brand;
  brandAddForm:FormGroup;
  brandUpdateForm:FormGroup;
  
  constructor(private brandService:BrandService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.createBrandAddForm();
    this.createBrandUpdateForm();
  }

  getBrands()
  {
     this.brandService.getBrands().subscribe(response=>{
       if(response.success)
       {
        this.brands=response.data;
       }
        
     })
  }

  createBrandAddForm()
  {
    this.brandAddForm=this.formBuilder.group({
         brandName:["",Validators.required]
    })

  }
  
  addBrand()
{
  if(this.brandAddForm.valid)
  {
    let brandModel=Object.assign({},this.brandAddForm.value)
    console.log(brandModel)
    this.brandService.addBrand(brandModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
      window.location.reload();
    },responseError=>{
      if(responseError.error.Errors.length>0)
      {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          
        }
       
      }
     
    
    })
   
  }
  else
  {
    this.toastrService.error("Formunuz eksik","Lütfen kontrol edin")
  }
 
}


getBrand(brand:Brand)
{
  this.brand=brand;
  console.log(brand);
  this.brandUpdateForm.patchValue({
     brandId:this.brand.brandId,
     brandName:this.brand.brandName
     
  })
}

createBrandUpdateForm()
{
  this.brandUpdateForm=this.formBuilder.group({
       brandId:[""],
       brandName:["",Validators.required]
  })
}

updateBrand()
{
  if (this.brandUpdateForm.valid) {
    let brandModel = Object.assign({}, this.brandUpdateForm.value)
    this.brandService.updateBrand(brandModel).subscribe(response => {
      this.toastrService.success(response.message, "Güncellendi")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, responseError => {
      this.toastrService.error("Güncellenemedi", "Dikkat")
    })
  }
  else
  {
    this.toastrService.error("Formunuz eksik","Lütfen kontrol edin")
  }
}


 

deleteBrand(brand:Brand)
{
  this.brandService.deleteBrand(brand).subscribe(response=>{
    this.toastrService.success(response.message,"Başarılı")
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  },responseError=>{
    this.toastrService.error(responseError.error,"Başarısız")
  })
}
}
