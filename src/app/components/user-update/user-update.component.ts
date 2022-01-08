import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userInfo=this.authService.getUser();
  userInfoForm:FormGroup;
  changePasswordForm:FormGroup
  constructor(private authService:AuthService,private userService:UserService,private formBuilder:FormBuilder,private toastrService:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.createUserInfoForm();
    this.createChangePasswordForm();

  }

  ngDoCheck()
  {
    if(!this.authService.loggedIn)
    {

    }
  }

  createUserInfoForm()
  {
    let userFullName:String[];
    userFullName=this.userInfo.userName.split(' ');
    this.userInfoForm=this.formBuilder.group({
      email: [this.userInfo.email],
      firstName: [userFullName.slice(0,userFullName.length-1).toString().replace(',', ' '), Validators.required],
      lastName: [userFullName[userFullName.length-1], Validators.required]
    })
  }

  createChangePasswordForm()
  {
    this.changePasswordForm=this.formBuilder.group({
      email: [this.userInfo.email],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    })
  }

  updateUserInfos()
  {
    if(this.userInfoForm.valid)
    {
      let userInfoModel=Object.assign({},this.userInfoForm.value);
      this.userService.updateUserInfos(userInfoModel).subscribe(response=>{
        this.toastrService.success(response.message, 'User Information Updated.')
        this.authService.logout();
        this.router.navigate(['/login'])
      }, responseError => {
        this.toastrService.error(responseError.errors, 'User Information Is Not Updated.')
      })
    }
    else
    {
      this.toastrService.error('Form Invalid.')
    }
  }

  updateUserPassword(){
    if (this.changePasswordForm.valid){
      let userPasswordModel= Object.assign({}, this.changePasswordForm.value);
      this.userService.changeUserPassword(userPasswordModel).subscribe(response=>{
        this.toastrService.success(response.message, 'Password Changed.')
        this.authService.logout();
        this.router.navigate(['/login'])
      }, responseError=>{
        this.toastrService.error(responseError.errors, 'Password Not Changed.')
      })
    }else{
      this.toastrService.error('Form Invalid.')
    }
  }
}
