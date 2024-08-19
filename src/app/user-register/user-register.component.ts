import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../service/user.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {

  constructor(private userService:UserService,private route:Router) {
  }

  onContactNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }

  submit(form: NgForm): void {
    if (form.valid) {
      const formData = form.value;

      const data = {
        userName: formData.userName,
        userFirstName: formData.userFirstName,
        userLastName: formData.userLastName,
        password: formData.password,
        email: formData.email,
        address: formData.address,
        contactNumb: formData.contactNumb,
        branchId:-1,
        roleId:3

      };

      this.userService.registers(data).subscribe(
        (response:any)=>{
          if(response.msg == "Success Register") {
            Swal.fire('Success', 'User  Register successfully', 'success');
            this.route.navigate(["/login"])
          }else {
            Swal.fire("Failed", response.msg, 'warning');

          }
        },
        (error:any) => {
          Swal.fire(error.error.message, error.message, 'warning');
        }
      )

    }
  }
}
