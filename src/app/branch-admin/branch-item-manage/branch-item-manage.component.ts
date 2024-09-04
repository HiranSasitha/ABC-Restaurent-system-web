import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../service/user-auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {BranchService} from "../../service/admin/branch.service";
import {ItemService} from "../../service/admin/item.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-branch-item-manage',
  templateUrl: './branch-item-manage.component.html',
  styleUrls: ['./branch-item-manage.component.scss']
})
export class BranchItemManageComponent implements OnInit{
  branchName:any
  branchId:any
  displayedColumns: string[] = ['name', 'description', 'status', 'action'];
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  data:any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>


  sidebarVisible = false;
  selectedRow: any;
  constructor(private userAuth:UserAuthService,private branchService:BranchService,private itemService:ItemService) {
  }
  ngOnInit(): void {

    this.branchName = this.userAuth.getUser()?.branch.name;
    this.branchId = this.userAuth.getUser()?.branch.id;
    this.getAll();

  }

  sidebarShow(row: any): void {
    this.selectedRow = row;
    this.sidebarVisible = true;
    console.log('Selected Row:', row);
  }

  getAll(){

    this.itemService.getAllItemByBranch(this.branchId).subscribe(
      (data:any)=>{
        this.data = data;
        this.totalSize = data.length;
        this.iterator()
      }
    )
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.data.slice(start, end);
    this.dataSource = part;
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  toggleActiveClass(event: any, element: any) {
    const isActive = element.isActive;

    if (isActive === false) {
      Swal.fire({
        title: 'Update to the Item Status',
        text: 'Are you sure, you want to Deactivate the Item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, deactivate it!',
        reverseButtons: true,
        inputAttributes: {
          autocapitalize: 'off'
        },
        customClass: {
          container: 'alert-modal',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateStatus(isActive, element.item.id);
        } else {

          element.isActive = true;
        }
      });
    }

    if (isActive === true) {
      Swal.fire({
        title: 'Update to the Item Status',
        text: 'Are you sure, you want to Activate the Itemr?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, activate it!',
        reverseButtons: true,
        inputAttributes: {
          autocapitalize: 'off'
        },
        customClass: {
          container: 'alert-modal',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateStatus(isActive, element.item.id);
        } else {

          element.isActive = false;
        }
      });
    }
  }

  private updateStatus(isActive: any, id:any) {
    this.itemService.updateBranchByItemStatus( this.branchId,id,isActive).subscribe(
      (response: any) => {
        if (response.msg === "Successfully update item status") {
          Swal.fire('Success', response.msg, 'success');
          this.getAll();

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
