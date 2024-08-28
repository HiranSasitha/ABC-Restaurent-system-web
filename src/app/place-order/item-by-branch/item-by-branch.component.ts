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
  item:any[] = [];
  showItem : any[] = [];
  keyword: any;
  isSearch = false;

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
    this.keyword = "";
    this.isSearch = false
    this.showItem = [];
    this.item = [];
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

  addCart(ite: any) {
    const updatedItems = JSON.parse(localStorage.getItem('items') || '[]') as any[];
    const newItem = { ...ite }; // new item
    const existingItem = updatedItems.find(item => item.id === newItem.id);

    if (!existingItem) {
      updatedItems.push(newItem);
      localStorage.setItem('items', JSON.stringify(updatedItems));
    }

  }

  onKeyDown(event: KeyboardEvent): void {

    if (event.key === 'Enter') {
      //alert(this.keyword)
      event.preventDefault();
      this.searchAll(this.keyword);
    }
  }

  private searchAll(keyword: any) {
     this. showItem = [];
    this.isSearch = true;
    const keywordLow = keyword.toLowerCase();

    this.showItem = this.item.filter(item =>
      item.item.name.toLowerCase().includes(keywordLow)
    );


  }
}
