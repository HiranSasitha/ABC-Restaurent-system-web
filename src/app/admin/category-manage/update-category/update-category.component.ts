import {Component, Inject, OnInit} from '@angular/core';
import {UserAuthService} from "../../../service/user-auth.service";
import {CategoryService} from "../../../service/admin/category.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit{

  isActive = false;
  userName:any
  category:any
  categoryForm: FormGroup;

  constructor(private userAuth:UserAuthService,private categoryService:CategoryService,
              private dialog:MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<UpdateCategoryComponent>) {
    this.userName = userAuth.getUser()?.userName;
    this.category = { ...data };
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isActive: [false]
    });
  }

  ngOnInit(): void {

    // alert(this.category.name)

    this.categoryForm.patchValue({
      name: this.category.name,
      description: this.category.description,
      isActive: this.category.isActive
    });
  }

  createCategory(form: NgForm) {
    if (form.valid) {
      const formData = form.value;

      const data = {
        name: this.category.name,
        description: this.category.description,
        isActivate: this.category.isActive,
        userName: this.userName,

      };

      Swal.fire({
        title: 'Create Category',
        text: 'Are you sure, you want to Update this Category ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Update it!',
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
    this.categoryService.updateCategory(data,this.category.id).subscribe(
      (response:any)=>{
        if(response.msg == "Success Updated") {
          Swal.fire('Success', response.msg, 'success');
          this.dialogRef.close('refresh');
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
    this.category.isActive = event.checked;
  }

}
