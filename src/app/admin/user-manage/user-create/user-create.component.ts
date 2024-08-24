import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {BranchService} from "../../../service/admin/branch.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit{

  roleId :any
  branches:any
  branchId = -1;

  constructor(private userService:UserService,private route:Router,
              private branchService:BranchService,
              public dialogRef: MatDialogRef<UserCreateComponent>) {
  }

  ngOnInit(): void {
       this.getAllBranch();
    }

  onContactNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }

  submit(form: NgForm): void {
    if (form.valid) {
      const formData = form.value;

      if(formData.roleId == 1 || formData.roleId == 3 ){
        this.branchId = -1;
      }

      const data = {
        userName: formData.userName,
        userFirstName: formData.userFirstName,
        userLastName: formData.userLastName,
        password: formData.password,
        email: formData.email,
        address: formData.address,
        contactNumb: formData.contactNumb,
        roleId:formData.roleId,
        branchId:this.branchId

      };

      //alert(this.roleId);

      this.userService.registers(data).subscribe(
        (response:any)=>{
          if(response.msg == "Success Register") {
            Swal.fire('Success', 'User  Register successfully', 'success');
            this.dialogRef.close('refresh');
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

  getAllBranch(){

    this.branchService.getAll().subscribe(
      (data:any)=>{
        this.branches = data;

      }
    )
  }

}
