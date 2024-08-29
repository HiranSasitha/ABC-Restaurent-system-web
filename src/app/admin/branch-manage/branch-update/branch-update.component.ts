import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
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
export class BranchUpdateComponent implements OnInit {
  isActive = false;
  userName: any;
  item: any;
  branch: any;
  branchForm: FormGroup;
  selectedItemIds: number[] = [];
  seat = 10;

  constructor(private userAuth: UserAuthService,
              private categoryService: CategoryService,
              private branchService: BranchService,
              private dialog: MatDialog,
              private itemService: ItemService,
              private cdr: ChangeDetectorRef,
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

    this.isActive = this.branch.isActive;
    this.seat = this.branch.seat;
  }

  ngOnInit(): void {

    this.loadItemsAndSelectedItems();
  }

  loadItemsAndSelectedItems() {

    this.getAllItem().then(() => {

      this.getAllBranchByItem().then(() => {

        this.branchForm.patchValue({ itemIds: this.selectedItemIds });
        this.cdr.detectChanges();
      });
    });
  }

  async getAllBranchByItem(): Promise<any> {
    try {
      const data = await this.itemService.getAllItemByBranch(this.branch.id).toPromise();
      this.selectedItemIds = data.map((item: any) => item.item.id);
      console.info(this.selectedItemIds);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllItem(): Promise<any> {
    try {
      const data = await this.itemService.getAll().toPromise();
      this.item = data;
    } catch (error) {
      console.error('Error', error);
    }
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
        itemId: this.selectedItemIds,
        createdUser: this.userName,
        seat:this.seat
      };

      Swal.fire({
        title: 'Update Branch',
        text: 'Are you sure, you want to Update this Item?',
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
      }).then((result) => {
        if (result.isConfirmed) {
          this.save(data);
        }
      });
    }
  }

  save(data: any) {
    this.branchService.updateItem(data, this.branch.id).subscribe(
      (response: any) => {
        if (response.msg === "Success updated") {
          Swal.fire('Success', response.msg, 'success');
          this.dialogRef.close('refresh');
        } else {
          Swal.fire("Failed", response.msg, 'warning');
        }
      },
      (error: any) => {
        console.error(error);
        Swal.fire("Failed", "Something Wrong", 'warning');
      }
    );
  }
}
