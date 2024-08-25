import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ItemService} from "../../service/admin/item.service";

@Component({
  selector: 'app-item-by-branch',
  templateUrl: './item-by-branch.component.html',
  styleUrls: ['./item-by-branch.component.scss']
})
export class ItemByBranchComponent implements OnInit{

  selectedBranch:any;
  selectedCategory:any
  item:any
  showItem : any[] = [];

  constructor(private router:Router,private itemService:ItemService) {
  }
  ngOnInit(): void {
    this.selectedBranch = history.state.selectedBranch;
    this.selectedCategory = history.state.selectedCategory;
    this.getAllItem();
  }

  goBackToCategory() {
    this.router.navigate(['/order-category'], { state: { selectedBranch: this.selectedBranch } });
  }

  getAllItem(){
    this.itemService.getAllItemByBranchByItemByCategory(this.selectedBranch.id,this.selectedCategory.id).subscribe(
      (data:any)=>{
        this.item = data;
        this.showItemOneByOne();
      }
    )
  }

  showItemOneByOne(): void {
    this.item.forEach((item:any, index:any) => {
      setTimeout(() => {
        this.showItem.push(item);
      }, index * 500);
    });
  }


  myCart() {

    this.router.navigate(['my-cart'], { state: { selectedBranch:this.selectedBranch } });

  }
}
