import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../service/admin/category.service";
import {CategoryCreateComponent} from "../category-manage/category-create/category-create.component";
import {BranchCreateComponent} from "./branch-create/branch-create.component";
import {BranchService} from "../../service/admin/branch.service";
import {MatTableDataSource} from "@angular/material/table";
import {ItemUpdateComponent} from "../item-manage/item-update/item-update.component";
import {BranchUpdateComponent} from "./branch-update/branch-update.component";

@Component({
  selector: 'app-branch-manage',
  templateUrl: './branch-manage.component.html',
  styleUrls: ['./branch-manage.component.scss']
})
export class BranchManageComponent implements OnInit{

  displayedColumns: string[] = ['name', 'location', 'status', 'action'];
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource1: any;
  data:any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>


  sidebarVisible = false;
  selectedRow: any;
  constructor(private dialog: MatDialog,private categoryService:CategoryService,private branchService:BranchService
  ) {}

  ngOnInit(): void {
    this.getAllBranch();
  }
  createBranch() {
    const dialogRef = this.dialog.open(BranchCreateComponent, {
      width: '50%', maxWidth: '100%', height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAllBranch();  // Reload the categories
      }
    });
  }

  getAllBranch(){

    this.branchService.getAll().subscribe(
      (data:any)=>{
        this.data = data;
        this.totalSize = data.length;
        this.iterator()

      }
    )
  }

  sidebarShow(row: any): void {
    this.selectedRow = row;
    this.sidebarVisible = true;
    console.log('Selected Row:', row);
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

  update(element:any) {
    const dialogRef = this.dialog.open(BranchUpdateComponent, {
      width: '50%', maxWidth: '100%', height: 'auto',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAllBranch();
      }
    });
  }
}
