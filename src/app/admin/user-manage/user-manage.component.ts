import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../service/admin/category.service";
import {BranchService} from "../../service/admin/branch.service";
import {BranchCreateComponent} from "../branch-manage/branch-create/branch-create.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../service/user.service";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit{

  isOtpToggleActive = false;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: any;
  sidebarVisible = false;
  selectedRow: any;
  data:any;
  displayedColumns: string[] = ['name', 'address','phoneNumber','branch','role','status'];
  dataSourceCustomer = new MatTableDataSource<any>;

  constructor(private dialog: MatDialog,private categoryService:CategoryService,private branchService:BranchService
  ,private userService:UserService) {}

  ngOnInit(): void {
    this.getAllUser();
  }
  createUser() {

    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '50%', maxWidth: '100%', height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
       this.getAllUser();  // Reload the categories
      }
    });

  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.data.slice(start, end);
    this.dataSource = part;
  }

  sidebarShow(row: any): void {
    this.selectedRow = row;
    this.sidebarVisible = true;
    console.log('Selected Row:', row);
  }

  getAllUser(){

    this.userService.getAll().subscribe(
      (data:any)=>{
        this.data = data;
        this.totalSize = data.length;
        this.iterator()

      }
    )
  }


  protected readonly elementAt = elementAt;
}
