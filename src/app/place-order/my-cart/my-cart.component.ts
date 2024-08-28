import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {UserAuthService} from "../../service/user-auth.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdateCategoryComponent} from "../../admin/category-manage/update-category/update-category.component";
import {CardAddComponent} from "./card-add/card-add.component";
import {BranchService} from "../../service/admin/branch.service";
import Swal from "sweetalert2";
import {OrderService} from "../../service/admin/order.service";

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit{

  selectedBranch: any;
  item:any;
  itemWithQty:any
  paymentType ="Card Payment";

  total = 0;
  userName:any
  isLoadingData = false;

  constructor(private router: Router,private userService:UserAuthService,private dialog: MatDialog,private branchService:BranchService,private orderService:OrderService) {
  }
  ngOnInit(): void {
    this.selectedBranch = history.state.selectedBranch;
    const items= JSON.parse(localStorage.getItem('items') || '[]') as any[];

    this.item = items;

    this.userName = this.userService.getUser()?.userName;


    this.itemWithQty = items.map((item: any) => ({
      ...item,
      quantity: item.quantity !== undefined ? item.quantity : 1
    }));


    this.getTotal();

    console.info(this.itemWithQty);


  }

  getTotal(){
    this.total = 0;
    for (let itemQty of this.itemWithQty){

      this.total += itemQty.sellingPrice * itemQty.quantity;
    }
  }

  goBackToCategory() {
    this.router.navigate(['/order-category'], { state: { selectedBranch: this.selectedBranch } });
  }

  handleDecrease(id:any) {
    this.itemWithQty = this.itemWithQty.map((item:any) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1? item.quantity - 1 : item.quantity }
        : item
    );
    this.getTotal();

  }

  handleIncrease(id: any, maxQty: any) {
    this.itemWithQty = this.itemWithQty.map((item:any) =>
      item.id === id
        ? { ...item, quantity: item.quantity < 10 ? item.quantity + 1 : item.quantity }
        : item
    );

    this.getTotal();
  }


  clearCartItem(id:any) {
    const updatedItems = this.itemWithQty.filter((item:any) => item.id !== id);
    this.itemWithQty = updatedItems;
    localStorage.setItem('items', JSON.stringify(updatedItems));
  }

  clearCart() {
    localStorage.removeItem('items');
    this.itemWithQty = [];
  }

  saveOrder() {
    const orderItemDtos = this.itemWithQty.map((item: any) => ({
      itemId: item.id,
      qty: item.quantity,
    }));

    const data = {
      userName: this.userName,
      payOption: this.paymentType,
      branchId: this.selectedBranch.id,
      orderItemDtos: orderItemDtos,
    };





    if (this.paymentType === "Card Payment") {
      const dialogRef = this.dialog.open(CardAddComponent, {
        width: '50%', maxWidth: '100%', height: 'auto',
      });

      dialogRef.afterClosed().subscribe(() => {
        this.isLoadingData = true;
        setTimeout(() => {
          this.placeOrder(data);
        }, 4000);
      });
    } else {
      this.isLoadingData = true;
      setTimeout(() => {
        this.placeOrder(data);
      }, 4000);
    }
  }

  placeOrder(data: any) {
    this.orderService.placeOrder(data).subscribe(
      (response: any) => {
        this.isLoadingData = false;
        if (response.msg === "Successfully") {
          Swal.fire('Success', response.msg, 'success');
          this.clearCart();
        } else {
          Swal.fire("Failed", response.msg, 'warning');
        }
      },
      (error: any) => {
        this.isLoadingData = false;
        console.log(error);
        Swal.fire("Failed", "Something Wrong", 'warning');
      }
    );
  }

}
