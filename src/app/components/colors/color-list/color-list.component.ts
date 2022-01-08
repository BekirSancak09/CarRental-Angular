import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colorAddForm:FormGroup;
  colorUpdateForm:FormGroup;
  color:Color;
  colors:Color[]=[];

  constructor(private colorService:ColorService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
    this.createColorAddForm();
    this.createColorUpdateForm();
  }

  getColors()
  {
    this.colorService.getColors().subscribe(response=>{
      if(response.success)
      {
        this.colors=response.data;
      }
      
    })

  }

  createColorAddForm()
  {
     this.colorAddForm=this.formBuilder.group({
        colorName:["",Validators.required]
     })
  }

  addColor()
  {
    if(this.colorAddForm.valid)
    {
      let colorModel=Object.assign({},this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe(response=>{
          this.toastrService.success(response.message,"Başarılı")
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      },responseError=>{
        this.toastrService.error(responseError.error,"Başarısız")
      })

    }
    else
    {
      this.toastrService.error("Formunuz eksik","Lütfen kontrol edin")
    }
    
   
    
  }

  
   getColor(color:Color)
   {
     this.color=color;
     
     this.colorUpdateForm.patchValue({
        colorId:this.color.colorId,
        colorName:this.color.colorName
     })
   }

   createColorUpdateForm()
   {
     this.colorUpdateForm=this.formBuilder.group({
          colorId:[""],
          colorName:["",Validators.required]
     })
   }

  

   updateColor()
   {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value)
      this.colorService.updateColor(colorModel).subscribe(response => {
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
     
    
   


  deleteColor(color:Color)
  {
     this.colorService.deleteColor(color).subscribe(response=>
      {
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },responseError=>{
         
        this.toastrService.error(responseError.error,"Başarısız")
      })
  }

  
  

}
