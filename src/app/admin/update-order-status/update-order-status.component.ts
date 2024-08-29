import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../service/user.service";
import {UserAuthService} from "../../service/user-auth.service";
import Swal from "sweetalert2";
import {OrderService} from "../../service/admin/order.service";

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.scss']
})
export class UpdateOrderStatusComponent implements OnInit{

  displayedColumns: string[] = ['order id', 'date', 'branch','customer', "order type","payment type","status",'action'];
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  data:any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>


  sidebarVisible = false;
  selectedRow: any;
  branchId:any
  isBranchAdmin = false;
  data1:any

  constructor(private userService:UserService,private  authService:UserAuthService,private orderService:OrderService) {
  }
  ngOnInit(): void {
   if( this.userService.roleEqual(['ROLE_BRANCHADMIN'])){
     this.isBranchAdmin = true;
     this.branchId = this.authService.getUser()?.branch.id;
   }
    this.getAll()
  }
  sidebarShow(row: any): void {
    this.selectedRow = row;
    this.sidebarVisible = true;
    console.log('Selected Row:', row);
  }

  getAll(){

    this.orderService.getAllOrderStatus().subscribe(
      (data:any)=>{
        this.data1 = data;
        if(this.isBranchAdmin){
          this.data = this.data1.filter((element: any) => element.order.branch.id === this.branchId);
        }else {
          this.data = this.data1;
        }


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
    const isActive = element.isStatus;

    if (isActive === false) {
      Swal.fire({
        title: 'Update to the Order Status',
        text: 'Are you sure, you want to pending the Order Status?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, pending it!',
        reverseButtons: true,
        inputAttributes: {
          autocapitalize: 'off'
        },
        customClass: {
          container: 'alert-modal',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateStatus(isActive, element.id);
        } else {

          element.isStatus = true;
        }
      });
    }

    if (isActive === true) {
      Swal.fire({
        title: 'Update to the Order Status',
        text: 'Are you sure, you want to Complete the Order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Complete it!',
        reverseButtons: true,
        inputAttributes: {
          autocapitalize: 'off'
        },
        customClass: {
          container: 'alert-modal',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateStatus(isActive, element.id);
        } else {

          element.isStatus = false;
        }
      });
    }
  }

  private updateStatus(isActive: any, id:any) {
    this.orderService.updateOrderStatus( id,isActive).subscribe(
      (response: any) => {
        if (response.msg === "Success Update Order") {
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
