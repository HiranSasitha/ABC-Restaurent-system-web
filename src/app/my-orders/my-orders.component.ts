import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../service/user.service";
import {UserAuthService} from "../service/user-auth.service";
import {OrderService} from "../service/admin/order.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit{
  displayedColumns: string[] = ['order id', 'date', 'branch', "order type","payment type","status"];
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  data:any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>


  sidebarVisible = false;
  selectedRow: any;
  userName:any

  constructor(private userService:UserService,private  authService:UserAuthService,private orderService:OrderService) {
    this.userName = this.authService.getUser()?.userName;
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.orderService.getAllOrderByUser(this.userName).subscribe(
      (data:any)=>{
        this.data = data;
        this.totalSize = data.length;
        this.iterator();
      }
    );
  }
  sidebarShow(row: any): void {
    this.selectedRow = row;
    this.sidebarVisible = true;
    console.log('Selected Row:', row);
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
}
