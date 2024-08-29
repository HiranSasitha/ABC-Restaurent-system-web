import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../../service/user-auth.service";
import {CategoryService} from "../../../service/admin/category.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {ItemService} from "../../../service/admin/item.service";
import Swal from "sweetalert2";
import {BranchService} from "../../../service/admin/branch.service";

@Component({
  selector: 'app-branch-create',
  templateUrl: './branch-create.component.html',
  styleUrls: ['./branch-create.component.scss']
})
export class BranchCreateComponent implements OnInit{

  isActive = false;
  userName:any
  selectedItemIds: number[] = [];
  item:any
  seat = 10;
  constructor(private userAuth:UserAuthService,private categoryService:CategoryService,
              private dialog:MatDialog,
              private itemService:ItemService,
              private branchService:BranchService,
              public dialogRef: MatDialogRef<BranchCreateComponent>) {
    this.userName = userAuth.getUser()?.userName;
  }

  ngOnInit(): void {
        this.getAllItem();
    }

  toggleActiveClass(event: any) {
    this.isActive = event.checked;
  }

  createBranch(form: NgForm) {
    if (form.valid) {
      const formData = form.value;

      console.log(this.selectedItemIds);

      const data = {
        name: formData.name,
       location: formData.location,
        isActive: this.isActive,
        itemId:this.selectedItemIds,
        createdUser: this.userName,
        seat: this.seat

      };

      Swal.fire({
        title: 'Create Branch',
        text: 'Are you sure, you want to Create this Branch ?',
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
          this.save(data);
        }
      })



    }
  }

  getAllItem(){

    this.itemService.getAll().subscribe(
      (data:any)=>{
        this.item = data;

      }
    );
  }

  private save(data:any) {

    this.branchService.createBranch(data).subscribe(
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
