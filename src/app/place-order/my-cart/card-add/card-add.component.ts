import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.scss']
})
export class CardAddComponent {

  constructor( public dialogRef: MatDialogRef<CardAddComponent>) {

  }

  submitCard() {
    Swal.fire('Success', "Card Details Added Successfully", 'success');
    this.dialogRef.close();
  }
}
