import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserAuthService} from "../../../service/user-auth.service";
import Swal from "sweetalert2";
import {CategoryService} from "../../../service/admin/category.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {
  isActive = false;
  userName:any

  constructor(private userAuth:UserAuthService,private categoryService:CategoryService,private dialog:MatDialog) {
    this.userName = userAuth.getUser()?.userName;
  }

  createCategory(form: NgForm) {
    if (form.valid) {
      const formData = form.value;

      const data = {
        name: formData.name,
        description: formData.description,
        isActivate: this.isActive,
        userName: this.userName,

      };

      Swal.fire({
        title: 'Create Category',
        text: 'Are you sure, you want to Create this Category ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, create it!',
        reverseButtons: true,
        inputAttributes: {
          autocapitalize: 'off'
        },

        customClass: {
          container: 'alert-modal',
        },

      }).then((result)=>{

        if(result.isConfirmed){
          this.saveCategory(data);
        }
      })



    }
  }

  saveCategory(data:any){
this.categoryService.createCategory(data).subscribe(
  (response:any)=>{
    if(response.msg == "Success created") {
      Swal.fire('Success', response.msg, 'success');
      this.dialog.closeAll();
    }else {
      Swal.fire("Failed", response.msg, 'warning');
    }
  },
  (error:any)=>{
    console.log(error);
    Swal.fire("Failed","Something Wrong", 'warning');
  }
)


  }

  toggleActiveClass(event: any) {
    this.isActive = event.checked;
  }
}
