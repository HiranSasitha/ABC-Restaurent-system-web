import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {CategoryService} from "../../../service/admin/category.service";
import {BranchService} from "../../../service/admin/branch.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ItemService} from "../../../service/admin/item.service";
import {UserAuthService} from "../../../service/user-auth.service";

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit{
  isActive = false;
  userName:any
  category:any
  selectedCategoryId:any
  branch:any
  selectedBranchIds: number[] = [];

  constructor(private categoryService:CategoryService,
              private branchService:BranchService,public dialogRef: MatDialogRef<ItemCreateComponent>,
              private itemService:ItemService,
              private userAuth:UserAuthService) {

    this.userName = userAuth.getUser()?.userName;
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllBranch();
  }

  toggleActiveClass(event: any) {
    this.isActive = event.checked;
  }

  numberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }

  createItem(form: NgForm) {
    if (form.valid) {
      const formData = form.value;

      console.log(this.selectedBranchIds);

      const data = {
        name: formData.name,
        description: formData.description,
        originalPrice:formData.originalPrice,
        sellingPrice:formData.sellingPrice,
        categoryId:this.selectedCategoryId,
        isActive: this.isActive,
        branchId:this.selectedBranchIds,
        createdUser: this.userName,

      };

      Swal.fire({
        title: 'Create Category',
        text: 'Are you sure, you want to Create this Item ?',
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
         this.saveItem(data);
        }
      })



    }
  }

  getAllCategory(){

    this.categoryService.getAll().subscribe(
      (data:any)=>{
        this.category = data;

      }
    )
  }
  getAllBranch(){

    this.branchService.getAll().subscribe(
      (data:any)=>{
        this.branch = data;

      }
    )
  }

  saveItem(data:any){
    this.itemService.createItem(data).subscribe(
      (response:any)=>{
        if(response.msg == "Success created") {
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
}
