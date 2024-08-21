import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../service/admin/category.service";
import {CategoryCreateComponent} from "../category-manage/category-create/category-create.component";
import {BranchCreateComponent} from "./branch-create/branch-create.component";

@Component({
  selector: 'app-branch-manage',
  templateUrl: './branch-manage.component.html',
  styleUrls: ['./branch-manage.component.scss']
})
export class BranchManageComponent {
  constructor(private dialog: MatDialog,private categoryService:CategoryService) {}
  createBranch() {
    const dialogRef = this.dialog.open(BranchCreateComponent, {
      width: '50%', maxWidth: '100%', height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        //this.getAll();  // Reload the categories
      }
    });
  }
}
