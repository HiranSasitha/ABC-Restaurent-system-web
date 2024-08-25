import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../../service/admin/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  selectedBranch: any;
  category:any
  showCategory: any[] = [];

  constructor(private router: Router,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.selectedBranch = history.state.selectedBranch;
    this.getAllCategory()
  }

  getAllCategory(){
    this.categoryService.getAll().subscribe(
      (data:any)=>{
        this.category = data;
        this.showCategoryOneByOne();
      }
    )
  }

  showCategoryOneByOne(): void {
    this.category.forEach((category:any, index:any) => {
      setTimeout(() => {
        this.showCategory.push(category);
      }, index * 500);
    });
  }

  selectCategory(cat: any) {
    this.router.navigate(['order-item'], { state: { selectedBranch:this.selectedBranch,selectedCategory: cat } });
  }

  myCart() {

    this.router.navigate(['my-cart'], { state: { selectedBranch:this.selectedBranch } });

  }
}
