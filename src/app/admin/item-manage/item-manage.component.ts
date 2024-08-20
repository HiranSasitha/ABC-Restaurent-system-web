import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryCreateComponent} from "../category-manage/category-create/category-create.component";
import {ItemCreateComponent} from "./item-create/item-create.component";

@Component({
  selector: 'app-item-manage',
  templateUrl: './item-manage.component.html',
  styleUrls: ['./item-manage.component.scss']
})
export class ItemManageComponent {

  constructor(private dialog: MatDialog) {
  }

  createItem() {
    const dialogRef = this.dialog.open(ItemCreateComponent, {
      width: '50%', maxWidth: '100%', height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
       // this.getAll();  // Reload the categories
      }
    });
  }
}
