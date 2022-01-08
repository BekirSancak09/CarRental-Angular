import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private authService:AuthService,private formBuilder:FormBuilder,private toastrService:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }


  createRegisterForm()
  {
   this.registerForm=this.formBuilder.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required]
   })
  }

  register()
  {
    if(this.registerForm.valid)
    {
      let registerModel=Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        this.registerForm.reset();
        this.router.navigate(['/login']);
        this.toastrService.success(response.message,"Registered")
      },responseError=>{
        this.toastrService.error("valdiation exception")
    
     })

    }
    else{
      this.toastrService.error("Form Invalid")
    }
  }
  

}
