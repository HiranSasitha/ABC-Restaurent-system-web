import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit{

  selectedBranch: any;

  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this.selectedBranch = history.state.selectedBranch;
  }

  goBackToCategory() {
    this.router.navigate(['/order-category'], { state: { selectedBranch: this.selectedBranch } });
  }
}
