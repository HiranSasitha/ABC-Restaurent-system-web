import {Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryCreateComponent} from "./category-create/category-create.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent {
  displayedColumns: string[] = ['name', 'description', 'status', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([
    { name: 'Category 1', description: 'Description 1', status: 'Active' },
    { name: 'Category 2', description: 'Description 2', status: 'Inactive' },
  ]);

  sidebarVisible = false;
  selectedRow: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) set sort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createCategory() {
    this.dialog.open(CategoryCreateComponent, {
      width: '50%', maxWidth: '100%', height: 'auto',
    });
  }
}
