import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryCreateComponent} from "../category-manage/category-create/category-create.component";
import {ItemCreateComponent} from "./item-create/item-create.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ItemService} from "../../service/admin/item.service";
import {UpdateCategoryComponent} from "../category-manage/update-category/update-category.component";
import {ItemUpdateComponent} from "./item-update/item-update.component";

@Component({
  selector: 'app-item-manage',
  templateUrl: './item-manage.component.html',
  styleUrls: ['./item-manage.component.scss']
})
export class ItemManageComponent implements OnInit{

  displayedColumns: string[] = ['name', 'description', 'status', 'action'];
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource1: any;
  data:any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>


  sidebarVisible = false;
  selectedRow: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) set sort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  constructor(private dialog: MatDialog,private itemService:ItemService) {
  }

  ngOnInit(): void {
     this.getAll();
    }

  createItem() {
    const dialogRef = this.dialog.open(ItemCreateComponent, {
      width: '50%', maxWidth: '100%', height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAll();  // Reload the categories
      }
    });
  }

  sidebarShow(row: any): void {
    this.selectedRow = row;
    this.sidebarVisible = true;
    console.log('Selected Row:', row);
  }

  getAll(){

    this.itemService.getAll().subscribe(
      (data:any)=>{
        this.data = data;
        this.totalSize = data.length;
        this.iterator()
      }
    )
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
    const dialogRef = this.dialog.open(ItemUpdateComponent, {
      width: '50%', maxWidth: '100%', height: 'auto',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAll();
      }
    });
  }
}
