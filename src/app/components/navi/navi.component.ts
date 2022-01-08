import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userInfo:User=this.authService.getUser();
  constructor(
    private authService:AuthService,
    private localStorageService:LocalstorageService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {

  }

  isAuthenticated()
  {
    return this.authService.loggedIn();
  }

  logout()
  {
    this.authService.logout();
  }

  ngDoCheck()
  {
    if(this.userInfo!==this.authService.user)
    {
      this.userInfo=this.authService.user;
    }
  }

  goToUserUpdate() {
    this.router.navigate(['user-update']);
  }

  
}
