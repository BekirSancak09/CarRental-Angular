import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private localStorageService:LocalstorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm()
  {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login()
  {
    if(this.loginForm.valid)
    {
      let loginModel=Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=> {
          console.log(response.data);
          this.localStorageService.saveToken(response.data.token);
          this.authService.decodedTokenKey=this.authService.decodedToken(response.data.token);
          this.authService.getUser();
          console.log(this.authService.getUser());
          this.router.navigate(["cars"]);
          this.toastrService.info("Login successful")
          console.log(this.authService.decodedTokenKey)

      }, responseError => {
        this.toastrService.error(responseError.errors, "password error");
      });
    }
    else
    {
      this.toastrService.error("Form invalid");
    }
  }

}
