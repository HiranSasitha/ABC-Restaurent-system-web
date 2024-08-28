import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {UserAuthService} from "../../../service/user-auth.service";
import {CategoryService} from "../../../service/admin/category.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {BranchService} from "../../../service/admin/branch.service";
import {Event} from "@angular/router";
import {ItemService} from "../../../service/admin/item.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss']
})
export class ItemUpdateComponent implements OnInit{

  isActive = false;
  userName:any
  item:any
  category:any
  branch:any
  itemForm: FormGroup;
  selectedCategoryId:any
  selectedBranchIds: number[] = [];
  constructor(private userAuth:UserAuthService,private categoryService:CategoryService,
              private branchService:BranchService,
              private dialog:MatDialog,
              private itemService:ItemService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              public dialogRef: MatDialogRef<ItemUpdateComponent>) {
    this.userName = userAuth.getUser()?.userName;
    this.item = { ...data };
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      originalPrice: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      categoryId: [null, Validators.required],
      branchIds: [[]],
      isActive: [false]
    });
    this.getAllBranchByItem();
  }

  ngOnInit(): void {
    this.itemForm.patchValue({
      name: this.item.name,
      description: this.item.description,
      originalPrice: this.item.originalPrice,
      sellingPrice: this.item.sellingPrice,
      isActive: this.item.isActive,
      //branchIds:this.selectedBranchIds
    });

    this.selectedCategoryId = this.item.category.id;
    this.getAllBranch()
    this.getAllCategory()
    this.loadBranchAndItem();

  }

  numberInput(event:any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }

  getAllCategory(){

    this.categoryService.getAll().subscribe(
      (data:any)=>{
        this.category = data;

      }
    )
  }
  async getAllBranch(){

    try {
      const data = await this.branchService.getAll().toPromise();
      this.branch = data;
    } catch (error) {
      console.error('Error', error);
    }

  }

  toggleActiveClass(event: any) {
    this.isActive = event.checked;
  }

  UpdateItem(form: NgForm) {

    if (form.valid) {
      const formData = form.value;

      const data = {
        name: this.item.name,
        description: this.item.description,
        isActive: this.item.isActive,
        createdUser: this.userName,
        originalPrice: this.item.originalPrice,
        sellingPrice: this.item.sellingPrice,
        categoryId:this.selectedCategoryId,
        branchId:this.selectedBranchIds

      };


      Swal.fire({
        title: 'Update Item',
        text: 'Are you sure, you want to Update this tem ?',
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
          this.updateItems(data);
        }
      })



    }

    }

  updateItems(data:any){
    this.itemService.updateItem(data,this.item.id).subscribe(
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


  async getAllBranchByItem(){

    try {
      const data = await this.itemService.getAllBranchByItem(this.item.id).toPromise();
      this.selectedBranchIds = data.map((item: any) => item.branch.id);
      console.info(this.selectedBranchIds);
    } catch (error) {
      console.error(error);
    }

    
  }


  private loadBranchAndItem() {
    this.getAllBranch().then(() => {

      this.getAllBranchByItem().then(() => {

        this.itemForm.patchValue({ branchIds: this.selectedBranchIds });
        this.cdr.detectChanges();
      });
    });
  }
}
