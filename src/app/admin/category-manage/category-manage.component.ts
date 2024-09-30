import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryCreateComponent} from "./category-create/category-create.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CategoryService} from "../../service/admin/category.service";
import {UpdateCategoryComponent} from "./update-category/update-category.component";


@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit{
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

  constructor(private dialog: MatDialog,private categoryService:CategoryService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createCategory() {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
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

    this.categoryService.getAll().subscribe(
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

  ngOnInit(): void {
    this.getAll();
  }

  update(element:any) {

    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      width: '50%', maxWidth: '100%', height: 'auto',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAll();
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && event.key.toLowerCase() === 'c') {
      event.preventDefault();  // Optional: prevent default behavior
      this.createCategory();   // Call the method
    }
  }

}
