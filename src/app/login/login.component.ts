import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../service/user.service";
import {UserAuthService} from "../service/user-auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private userService:UserService,private userAuthService:UserAuthService,private router:Router) {
  }

  login(loginForm:NgForm):void{

    this.userService.logins(loginForm.value).subscribe(
      (response:any)=>{
        if(response.user.isActive == true) {
          console.log(response.jwtToken);
          console.log(response.user.roles);
          this.userAuthService.setRoles(response.user.roles);
          this.userAuthService.setUser(response.user);
          this.userAuthService.setToken(response.jwtToken);
          const role = response.user.roles[0].roleName;
          console.log(role);

          this.router.navigate(["/dashboard"])
        }else {
          Swal.fire("Failed", "Account is Deactivate", 'warning');
        }

      },(error)=>{
        console.log(error);
        Swal.fire("Failed", "User Name or Password Wrong", 'warning');
      }
    );
  }
}
