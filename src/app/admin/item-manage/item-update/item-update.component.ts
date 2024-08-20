import {Component, Inject, OnInit} from '@angular/core';
import {UserAuthService} from "../../../service/user-auth.service";
import {CategoryService} from "../../../service/admin/category.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {BranchService} from "../../../service/admin/branch.service";
import {Event} from "@angular/router";
import {ItemService} from "../../../service/admin/item.service";

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
      branchIds:this.selectedBranchIds
    });

    this.selectedCategoryId = this.item.category.id;
    this.getAllBranch()
    this.getAllCategory()

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
  getAllBranch(){

    this.branchService.getAll().subscribe(
      (data:any)=>{
        this.branch = data;


      }
    )
  }

  toggleActiveClass(event: any) {
    this.isActive = event.checked;
  }

  UpdateItem(itemForm: NgForm) {

  }

  getAllBranchByItem(){

    this.itemService.getAllBranchByItem(this.item.id).subscribe(
      (data:any)=>{
        let response = data;

        for (let item of response){
          this.selectedBranchIds.push(item.branch.id);
        }


        console.log(this.selectedBranchIds);

      }
    )
  }
}
