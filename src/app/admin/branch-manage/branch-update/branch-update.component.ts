import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {UserAuthService} from "../../../service/user-auth.service";
import {CategoryService} from "../../../service/admin/category.service";
import {BranchService} from "../../../service/admin/branch.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ItemService} from "../../../service/admin/item.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-branch-update',
  templateUrl: './branch-update.component.html',
  styleUrls: ['./branch-update.component.scss']
})
export class BranchUpdateComponent implements OnInit{
  isActive = false;
  userName:any
  item:any
  branch:any
  branchForm: FormGroup;
  selectedItemIds: number[] = [];
  constructor(private userAuth:UserAuthService,private categoryService:CategoryService,
              private branchService:BranchService,
              private dialog:MatDialog,
              private itemService:ItemService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<BranchUpdateComponent>) {
    this.userName = userAuth.getUser()?.userName;
    this.branch = { ...data };
    this.branchForm = this.fb.group({
      name: ['', Validators.required],
      location: [''],
      itemIds: [[]],
      isActive: [false]
    });
    this.getAllBranchByItem();
  }

  ngOnInit(): void {
       this.getAllItem();

    }

  getAllBranchByItem(){

    this.itemService.getAllItemByBranch(this.branch.id).subscribe(
      (data:any)=>{
        let response = data;

        for (let item of response){
          this.selectedItemIds.push(item.branch.id);
        }


        console.log(this.selectedItemIds);

      }
    )
  }

  getAllItem(){

    this.itemService.getAll().subscribe(
      (data:any)=>{
        this.item = data;

      }
    );
  }
  toggleActiveClass(event: any) {
    this.isActive = event.checked;
  }
  updateBranch(form: NgForm) {
    if (form.valid) {
      const formData = form.value;

      console.log(this.selectedItemIds);

      const data = {
        name: formData.name,
        location: formData.location,
        isActive: this.isActive,
        itemId:this.selectedItemIds,
        createdUser: this.userName,

      };

      Swal.fire({
        title: 'Update Branch',
        text: 'Are you sure, you want to Update this Item ?',
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

  save(data:any){
    this.branchService.updateItem(data,this.branch.id).subscribe(
      (response:any)=>{
        if(response.msg == "Success updated") {
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
